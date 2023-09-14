import {useState, useEffect, ChangeEvent} from "react";
import Footer from "../components/Footer";
import HeaderToggle from "../components/toggles/HeaderToggle";
import { Box, Input, Flex, Heading, Select, Button, ButtonGroup, Stack, Text, Collapse, Textarea, useToast, Image} from '@chakra-ui/react';
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../fonts/fonts.css"
import image from "../img/report/reportImg.png";
import colors from "../colors/colors";

const Report = () => {
    const {id} = useParams();
    const {type} = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const [select, setSelect] = useState(false);

    const [report, setReport] = useState({
        den_reason: "",
        den_content: "",
        email : "",
        den_gravity: 0,
        User_user_id: 0,
        Offer_ofr_id: 0
    });

    async function getOffer() {
        await axios.get(`http://localhost:3344/offers/id/${id}`).then((res) => {
            setReport(prev => ({...prev, User_user_id : res.data[0].User_user_id}));
        }).catch((error) => {
          console.log(error);
        })
    }

    async function getUser() {
        await axios.get(`http://localhost:3344/users/id/${id}`).then((res) => {
            setReport(prev => ({...prev, email : res.data.user_email}));
        }).catch((error) => {
          console.log(error);
        })
    }

    useEffect(() => {
        if (id) {
            switch(type) {
                case "offer" :
                    setReport(prev => ({...prev, Offer_ofr_id : parseInt(id)}));
                    getOffer();
                break;
                case "user" :
                    setReport(prev => ({...prev, User_user_id : parseInt(id)}));
                    getUser();
                break;
              }
        }
    }, [type])

    async function postDenounce() {
        await axios.post(`http://localhost:3344/denounce`, {
            den_reason: report.den_reason,
            den_content: report.den_content,
            den_gravity: report.den_gravity,
            User_user_id: report.User_user_id,
            Offer_ofr_id: report.Offer_ofr_id
        }, {headers : {authorization : "Bearer " + localStorage.getItem("token")}}).then((res) => {
            toast({
                title: 'Denuncia realiada',
                description: "Cadastramos sua denuncia em breve você terá uma resposta!",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
            navigate((type == "offer") ? `/offer/${id}` : `/profile/${report.email}/view`);
        }).catch((error) => {
           console.log(error);
        })
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setReport(prev => ({...prev, [e.target.name] : e.target.value}));
    }

    const handleSelect = (e:ChangeEvent<HTMLInputElement>) => {
        switch(e.target.value) {
            case "4" :
                setSelect(true);
            break;
            case "Fraudes e golpes":
                setReport(prev => ({...prev, den_reason : e.target.value ,den_gravity : 3}));
                setSelect(false);
            break;
            case "Nudez e conteúdo sexual":
                setReport(prev => ({...prev, den_reason : e.target.value ,den_gravity : 4}));
                setSelect(false);
            break;
            case "Informações incorretas":
                setReport(prev => ({...prev, den_reason : e.target.value ,den_gravity : 2}));
                setSelect(false);
            break;
            case "Comportamento enganoso":
                setReport(prev => ({...prev, den_reason : e.target.value ,den_gravity : 3}));
                setSelect(false);
            break;
            case "Discurso de ódio":
                setReport(prev => ({...prev, den_reason : e.target.value ,den_gravity : 4}));
                setSelect(false);
            break;
            case "Conteúdo violento":
                setReport(prev => ({...prev, den_reason : e.target.value ,den_gravity : 5}));
                setSelect(false);
            break;
            case "Falsificação":
                setReport(prev => ({...prev, den_reason : e.target.value ,den_gravity : 4}));
                setSelect(false);
            break;
            case "Assédio sexual":
                setReport(prev => ({...prev, den_reason : e.target.value ,den_gravity : 5}));
                setSelect(false);
            break;
            case "Assédio moral":
                setReport(prev => ({...prev, den_reason : e.target.value ,den_gravity : 4}));
                setSelect(false);
            break;
        }
    }

    function checkInputs() {
        if(report.den_reason == "" || report.den_content == "") {
            toast({
                title: 'Erro nos dados',
                description: "Preencha todas os campos para realizar a denúncia.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        else {
            postDenounce()
        }
    }


    return (
        <Box w="100%" h="100%" onClick={() => {console.log(report)}} >
            <HeaderToggle/>
            <Flex w="100%" h="100%" direction={{base:"column-reverse" ,md:"row"}} align="center" _dark={{bg: colors.bgWhite_Dark}} bg={colors.bgWhite}>
                <Stack h={{base:"70vh", md:"95vh"}} w={{base:"100%", md:"fit-content"}} direction="column" pt="5%" align="center" pl="2vw" pr="2vw" bg={colors.veryLightBlue} _dark={{bg : colors.veryLightBlue_Dark}}>
                    <Heading fontFamily="outfit" as="h1" fontSize={{base:"34px", md:"32"}}>Faça sua denúncia</Heading>
                    <Text fontFamily="atkinson" fontSize={{base:"20px", md:"18px"}}>Qual o motivo de sua denúncia?</Text>
                    <Select w={{base:"90%", md:"47vw"}} fontSize={{base:"20px", md:"18px"}} onChange={handleSelect} placeholder="selecione o tipo da denuncia" fontFamily="outfit">
                        <option value="Fraudes e golpes">Fraudes e golpes</option>
                        <option value="Nudez e conteúdo sexual">Nudez e conteúdo sexual</option>
                        <option value="Informações incorretas">Informações incorretas</option>
                        <option value="Comportamento enganoso">Comportamento enganoso</option>
                        <option value="Discurso de ódio">Discurso de ódio</option>
                        <option value="Conteúdo violento">Conteúdo violento</option>
                        <option value="Falsificação">Falsificação</option>
                        <option value="Assédio sexual">Assédio sexual</option>
                        <option value="Assédio moral">Assédio moral</option>
                        <option value="4">Outro</option>
                    </Select>
                    <Collapse in={select}>
                        <Input placeholder='Tipo de denúncia' w={{base:"90%", md:"47vw"}} onChange={handleChange} name="den_reason"></Input>
                    </Collapse>
                    <Heading textAlign="center" fontSize={{base:"30px", md:"25"}} fontFamily="atkinson">Por que você está denunciando?</Heading>
                    <Text fontFamily="outfit" fontSize={{base:"20px", md:"18px"}}>Dê detalhes sobre o ocorrido</Text>
                    <Textarea w={{base:"90%", md:"47vw"}} fontSize={{base:"20px", md:"18px"}} h="25vh" placeholder="Descreva aqui" onChange={handleChange} name="den_content"/>
                    <ButtonGroup >
                        <Button fontSize={{base:"20px", md:"15px"}} onClick={checkInputs} colorScheme="linkedin" fontFamily="outfit">Enviar</Button>
                        <Link to={(type == "offer") ? `/offer/${id}` : `/profile/${report.email}/view`}><Button fontSize={{base:"20px", md:"15px"}} colorScheme="linkedin" fontFamily="outfit">Cancelar</Button></Link>
                    </ButtonGroup>
                </Stack>
                <Image w={{base:"100%", md:"48%"}} h="100%" src={image}/>
            </Flex>
            <Footer/>
        </Box> 
    )
}

export default Report;
