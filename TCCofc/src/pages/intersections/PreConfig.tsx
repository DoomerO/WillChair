import {Flex, Box, Heading, Stack, Text, Input, FormLabel, Button, Spacer, useToast, IconButton, useColorMode} from "@chakra-ui/react";
import "../../fonts/fonts.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import colors from "../../colors/colors";
import { ChangeEvent, useState } from "react";
import decode from "../../components/code/decoderToken";
import {AiOutlineArrowRight} from "react-icons/ai";
import cep from "cep-promise";
import { FiArrowLeft, FiSun, FiMoon } from "react-icons/fi";

const PreConfig = () => {
    const toast = useToast();
    const {toggleColorMode} = useColorMode();
    const navigate = useNavigate();
    const [user, setUser] = useState(decode(localStorage.getItem("token")));
    const [inputs, setInputs] = useState({
        phone : "",
        houseNum : NaN,
        complement : "",
        UF : "",
        CEP : "",
        city : "",
        street : "",
        district : ""
    })

    async function getEndereco(CEP : string) {
        setInputs(prev => ({...prev, 
            UF : "",
            street : "",
            district : "",
            city : ""
        }))
        cep(CEP, { timeout: 5000}).then((res) => {
            setInputs(prev => ({...prev, 
                UF : res.state,
                street : res.street,
                district : res.neighborhood,
                city : res.city
            }))
        })
    }

    async function postInfo() {
        if (inputs.phone && inputs.city) {
            await axios.put(`http://localhost:3344/users/${user.email}`, {
                user_phone : inputs.phone,
                user_houseNum : inputs.houseNum,
                user_comp : inputs.complement,
                user_CEP : inputs.CEP,
                user_UF : inputs.UF,
                user_city : inputs.city,
                user_street : inputs.street,
                user_district : inputs.district
            }, {headers : {authorization : "Bearer " + localStorage.getItem("token")}}).then((res) => {
                toast({
                    title: 'Informações Enviadas!',
                    description: "Seu perfil foi configurado adequadamente!",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                })
                navigate("/")    
            }).catch((error) => {
                console.log(error);
            });
        }
        else {
            toast({
                title: 'Preencha os campos necessários!',
                description: "Para serem enviadas as informações é necessário o CEP e telefone!",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.name == "CEP") {
            if(e.target.value.length >= 7){
                getEndereco(e.target.value);
            }
            else{
                setInputs(prev => ({...prev, 
                    UF : "",
                    street : "",
                    district : "",
                    city : ""
                }))
            }
        }
        if(e.target.name == "phone"){
            if(e.target.validity.patternMismatch){e.target.value = ""; return}
            let val = e.target.value.replace("(", "")
            setInputs(prev => ({...prev, [e.target.name] : val.replace(")", "")}));
            return
        }
        if(!e.target.validity.patternMismatch){
            setInputs(prev => ({...prev, [e.target.name] : e.target.value}));}
        else{e.target.value = ""}
    }

    return (
        <Box w="100%" h="100%" justifyContent="center" align="center">
            <Flex align="center" direction="column" h="inherit" mt="3%" w="95%" fontFamily="outfit">
                <Flex direction="row" w="100%" position={{base:"absolute", md:"inherit"}}>
                    <Link to="/login"><IconButton aria-label='Return to home' icon={<FiArrowLeft/>}></IconButton></Link>
                    <Spacer/>
                    <IconButton onClick={toggleColorMode} aria-label='switch lighting mode'
                    icon={localStorage.getItem("chakra-ui-color-mode") == 'light' ? <FiSun/> : <FiMoon/>}></IconButton>
                </Flex>

                <Heading as='h1' color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>Configuração de Perfil</Heading>

                <Text mt="1%" mb="2%">Diga algumas informações importantes para configurar seu perfil!</Text>
                <Stack direction={{base:"column", md:"row"}} maxW="90%" spacing={{base: 3, md: 10}}>
                    <Stack direction="column" w={{base:"100%", md:"50%"}}>
                        <FormLabel>Telefone<Input onChange={handleChange} type="text" fontFamily="atkinson" value={inputs.phone ? `(${inputs.phone.slice(0,2)})${inputs.phone.slice(2,15)}` : ""} name="phone" maxLength={15} _placeholder={{color : colors.colorFontDarkBlue}} _dark={{_placeholder : {color : colors.colorFontDarkBlue_Dark}}} placeholder={"Digite apenas números"} pattern="[(]?[0]?[0-9]{0,2}[)]?[0-9]{0,}">
                        </Input></FormLabel>
                        <FormLabel>Número de sua Casa<Input onChange={handleChange} type="number" value={inputs.houseNum} fontFamily="atkinson" name="houseNum" _placeholder={{color : colors.colorFontDarkBlue}} _dark={{_placeholder : {color : colors.colorFontDarkBlue_Dark}}} placeholder={"Opcional"}>
                        </Input></FormLabel>
                        <FormLabel>Complemento<Input onChange={handleChange} type="text" value={inputs.complement} fontFamily="atkinson" name="complement" _placeholder={{color : colors.colorFontDarkBlue}} _dark={{_placeholder : {color : colors.colorFontDarkBlue_Dark}}} placeholder={"Opcional"}>
                        </Input></FormLabel>
                        <FormLabel>UF<Input type="text" value={inputs.UF} fontFamily="atkinson" readOnly>
                        </Input></FormLabel>
                    </Stack>
                    <Stack direction="column" w={{base:"100%", md:"50%"}}>
                        <FormLabel>CEP<Input onChange={handleChange} type="text" value={inputs.CEP} fontFamily="atkinson" name="CEP" maxLength={9} _placeholder={{color : colors.colorFontDarkBlue}} _dark={{_placeholder : {color : colors.colorFontDarkBlue_Dark}}} placeholder={"Digite apenas números"} pattern="[0-9]{0,}">
                        </Input></FormLabel>
                        <FormLabel>Cidade<Input onChange={handleChange} value={inputs.city} type="text" fontFamily="atkinson" readOnly>
                        </Input></FormLabel>
                        <FormLabel>Rua<Input onChange={handleChange} value={inputs.street} type="text" fontFamily="atkinson" readOnly>
                        </Input></FormLabel>
                        <FormLabel>Bairro<Input onChange={handleChange} value={inputs.district} type="text" fontFamily="atkinson" readOnly>
                        </Input></FormLabel>
                    </Stack>
                </Stack>
                <Spacer/>
                <Flex w="100%" direction={{base:"column-reverse", md:"row"}} align="center" justifyContent="center" mt="8%" h={{base:"15vh", md:"fit-content"}}>
                    <Flex w="100%" justifyContent={{base:"center", md:"left"}}><Button colorScheme="linkedin" variant="link" onClick={() => {navigate("/policy")}}>Por que dessas informações?</Button></Flex>
                    <Spacer/>
                    <Flex w="100%" justifyContent="center"><Button colorScheme="linkedin" variant="solid" onClick={postInfo}>Confirmar</Button></Flex>
                    <Spacer/>
                    <Flex w="100%" justifyContent={{base:"center", md:"right"}}><Button colorScheme="linkedin" variant="link" onClick={() => {navigate("/")}}>Continuar depois <AiOutlineArrowRight size="3vh"/></Button></Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

export default PreConfig;