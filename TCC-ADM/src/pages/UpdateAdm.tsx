import {Box, Flex, Heading, Spacer, Stack, Text, Button, useToast, UseToastOptions, FormLabel, Select, Input} from "@chakra-ui/react";
import Header from "../components/Header";
import { ChangeEvent, useEffect, useState } from "react";
import decode from "../components/code/decode";
import colors from "../colors/colors";
import "../fonts/fonts.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dateDisplayer from "../components/code/dataDisplayer";
import SignAdaptable from "../components/SignAdaptable";
import Password from "../components/Password";

const UpdateAdm = () => {
    const [adm, setAdm] = useState(decode(localStorage.getItem("token")));
    const [adms, setAdms] = useState([]);
    const [admUpdt, setUpdt] = useState({type : "", value : "", renderAdm : 0, admId : 0, missMatch : false})
    const navigate = useNavigate();
    const toastRender = useToast();

    function toast(title:string, desc:string, time?:number, type?:UseToastOptions["status"], pos?:ToastPosition, close?:boolean){
        toastRender({
            title: title,
            description: desc,
            status: type,
            duration: time,
            position: pos,
            isClosable: close ? close : true
        })
    }

    async function getAdms() {
        await axios.get(`http://localhost:3344/adm`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setAdms(res.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    async function updateAdmOprt() {
        if (admUpdt.type && admUpdt.value && !admUpdt.missMatch) {
            let data;
            switch(admUpdt.type) {
                case "level":
                    data = {adm_level : admUpdt.value}
                break;
                case "name":
                    data = {adm_name : admUpdt.value}
                break;
                case "email":
                    data = {adm_email : admUpdt.value}
                break;
                case "password":
                    data = {password : admUpdt.value}
                break;
            }
            await axios.put(`http://localhost:3344/adm/update/${admUpdt.type}/${admUpdt.admId}`, data, { headers : {
                authorization : "Bearer " + localStorage.getItem("token")
            }}).then((res) => {
                toast("Administrador atualizado!", "O administrador foi atualizado com sucesso!", 3000, "success");
            }).catch((error) => {
                console.log(error)
                if (error.response.status == 406) {
                    toast("Nível Baixo", `Seu nível de administrador é muito baixo para executar essa ação!`, 3000, "error")         
                }
            });
        }
        else {
            toast("Campos vazios!", "Todos os campos (tipo de atualização, valor atualizado e id de admnistrador) devem ser preenchidos corretamente!", 3000, "error");
        }
    }

    useEffect(() => {
        getAdms();
    }, []);

    const renderAdms = adms.map(item => {
        return <option value={`${item.adm_id},${adms.indexOf(item)}`} key={item.adm_id}>{`${item.adm_name}--id:${item.adm_id}`}</option>
    });

    const handleSelects = (e:ChangeEvent<HTMLInputElement>) => {
        let values = e.target.value.split(",");
        setUpdt(prev => ({...prev, admId : parseInt(values[0])}));
        setUpdt(prev => ({...prev, renderAdm : parseInt(values[1])}));
    }

    const handleChanges = (e:ChangeEvent<HTMLInputElement>) => {
        setUpdt(prev => ({...prev, [e.target.name] : e.target.value}));
        if (admUpdt.type == "email" || admUpdt.type == "password") {
            if (admUpdt.type == "password") setUpdt(prev => ({...prev, value : e.target.value}));
            setUpdt(prev => ({...prev, missMatch : e.target.validity.patternMismatch}));
        }
    }

    return (
        <Box w="100%" h="100%">
            <Header adm={adm}/>
            <Flex w="100%" h="100vh" fontFamily="outfit" direction="row" bg={colors.bgWhite} _dark={{bg : colors.bgWhite_Dark}}>
                <Stack direction="column" pt="8vh" align="center" w="50%" spacing={5}>
                    <Heading color={colors.colorFontBlue} fontFamily="outfit" as="h1">Administradores</Heading>
                    <FormLabel w="80%">
                        Administradores:
                        <Select variant="outline" name="idAdm" placeholder="Selecione um administrador" onChange={handleSelects}>
                            {renderAdms}
                        </Select>
                    </FormLabel>

                    {(admUpdt.admId) ? <Stack direction="column" w="100%" pl="2%" fontSize="18px" spacing={4}> 
                        <Text>
                            Nome do administrador: {adms[admUpdt.renderAdm].adm_name}
                        </Text>
                        <Text>
                            ID: {adms[admUpdt.renderAdm].adm_id}
                        </Text>
                        <Text>
                            Email do administrador: {adms[admUpdt.renderAdm].adm_email}
                        </Text>
                        <Text textAlign="justify">
                            Nível do administrador: {adms[admUpdt.renderAdm].adm_level}
                        </Text>
                    </Stack>: <SignAdaptable msg="Selecione um administrador para atualizá-lo." icon={<div></div>} bgType="none"/>}
                    <Spacer/>
                </Stack>

                <Stack direction="column" pt="8vh" align="center" w="50%" spacing={5} bg={colors.veryLightBlue} _dark={{bg : colors.veryLightBlue_Dark}}>
                    <Heading color={colors.colorFontBlue} fontFamily="outfit" as="h1">Atualização</Heading>
                    <FormLabel w="80%">
                        Atributo a ser atualizado:
                        <Select variant="outline" name="type" placeholder="Selecione um atributo" onChange={handleChanges}>
                            <option value="level">Nível</option>
                            <option value="email">Email</option>
                            <option value="password">Senha</option>
                            <option value="name">Nome</option>
                        </Select>
                    </FormLabel>                   

                    {(admUpdt.type == "level") ? <FormLabel w="80%"> Novo Nível: <Select variant="outline" type="number" onChange={handleChanges} name="value">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </Select></FormLabel> : null }

                    {(admUpdt.type == "email") ? <FormLabel w="80%"> Novo Email: <Input variant="outline" type="text" onChange={handleChanges} name="value" pattern={`(.){1,64}@(.){1,}[.](.){2,}`} isInvalid={admUpdt.missMatch}/></FormLabel> : null }

                    {(admUpdt.type == "password") ? <FormLabel w="80%"> Nova Senha: <Password onChange={handleChanges} validity={admUpdt.missMatch}/></FormLabel> : null }

                    {(admUpdt.type == "name") ? <FormLabel w="80%"> Novo Nome: <Input variant="outline" type="text" onChange={handleChanges} name="value"/></FormLabel> : null }
                    
                    {(admUpdt.admId && admUpdt.type) ? 
                    <Flex direction='column' mt="5%" pb="5%" w="100%" align="center" justifyContent="center" h="20%">
                        <Text>Administrador {(admUpdt.admId) ? "id: " + admUpdt.admId : "Não selecionado"}</Text>
                        <Button mt="3%" colorScheme="linkedin" onClick={() => {
                             toastRender({
                                 position: 'bottom',
                                 render: () => (
                                    <Stack bg="orange.500" align="center" direction="column" p="2vh" borderRadius="10px" spacing={2} _dark={{bg : "orange.200"}}>
                                        <Text fontWeight="semibold" color="white" _dark={{color : "black"}} noOfLines={1} fontSize={{base:"22px", md:"20px"}}>Certeza que esse usuário deve ser atualizado</Text>
                                        <Stack direction="row">
                                            <Button variant="outline" color="#fff"  _dark={{color : "black"}} _hover={{bg:"#fff2"}} onClick={() => {updateAdmOprt()}}>Sim</Button>
                                            <Button variant="outline" color="#fff" _dark={{color : "black"}}  _hover={{bg:"#fff2"}} onClick={() => {toastRender.closeAll()}}>Não</Button>    
                                        </Stack>
                                    </Stack>
                                )
                            })
                        }}>Atualizar</Button>
                    </Flex>: null}
                </Stack>
            </Flex>
        </Box>
    )
}

export default UpdateAdm;