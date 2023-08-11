import {useState, useEffect, ChangeEvent} from "react";
import Footer from "../components/Footer";
import HeaderToggle from "../components/toggles/HeaderToggle";
import { Box, Input, Flex, Heading, Select, Button, ButtonGroup, Stack, VStack, Text, Collapse, Textarea, useToast, Image} from '@chakra-ui/react';
import axios from "axios";
import decode from "../components/decoderToken";
import { useParams, Link } from "react-router-dom";
import "../fonts/fonts.css"

const Report = () => {
    const offer = useParams();
    const toast = useToast();
    const [select, setSelect] = useState (false)
    const [user, setUser] = useState(decode(localStorage.getItem("token")));
    const [userQuery, setQuery] = useState([]);

    const [report, setReport] = useState({
        den_reason: "",
        den_content: "",
        User_user_id: 0,
        Offer_ofr_id: offer
    });

    async function getUser() {
        await axios.get(`http://localhost:3344/users/email/${user.email}`, {headers: {
            authorization : "Bearer " + localStorage.getItem("token")
        }}).then((res) => {
            setQuery(res.data);
            console.log(res);
            setReport(prev => ({...prev, User_user_id:res.data.user_id}))
        }).catch((error) => {
          console.log(error);
        })
    }

    useEffect(() => {
        setReport(prev => ({...prev,
            Offer_ofr_id: offer,
        }))
        getUser();
    }, [offer])

    async function postDenounce() {
        await axios.post(`http://localhost:3344/denounce`, {
            den_reason: report.den_reason,
            den_content: report.den_content,
            User_user_id: report.User_user_id,
            Offer_ofr_id: report.Offer_ofr_id.offer
        }, {headers : {authorization : "Bearer " + localStorage.getItem("token")}}).then((res) => {
            toast({
                title: 'Denuncia realiada',
                description: "Cadastramos sua denuncia em breve voce tera una resposta",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }).catch((error) => {
           console.log(error);
        })
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setReport(prev => ({...prev, [e.target.name] : e.target.value}));
    }

    const handleSelect = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.value != "4") {
            setSelect(false);
            setReport(prev => ({...prev, den_reason : e.target.value}));
        }
        else {
            setSelect(true);
        }
    }

    function checkInputs() {
        if(report.den_reason == "" || report.den_content == "") {
            toast({
                title: 'Erro nos dados',
                description: "Preencha todas os campos para realizar a denúncia.",
                status: 'error',
                duration: 9000,
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
            <Stack h="95vh"  direction="column" pt="5%" align="center">
            <Image w={"20vh"} h={"10vh"}  fallbackSrc='https://img.freepik.com/vetores-gratis/desenhos-animados-minusculos-gerentes-com-alto-falante-gigante-e-laptop-ilustracao-plana_74855-16816.jpg?w=740&t=st=1691106381~exp=1691106981~hmac=bfc84e55272efbc7542a8dce04e4d6c006250fb9ea22d91323d94cdf6f672d1a' />
                <Heading >Faça sua denúncia</Heading>
                <Text fontFamily="atkinson">Qual a sua denúncia?</Text>
                <Select w="90vh" onChange={handleSelect} placeholder="selecione o tipo da denuncia" fontFamily="outfit">
                    <option value="Fraudes e golpes">Fraudes e golpes</option>
                    <option value="Nudez e cnteúdo sexual">Nudez e conteúdo sexual</option>
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
                    <Input placeholder='Tipo de denúncia' w="90vh" onChange={handleChange} name="den_reason"></Input>
                </Collapse>
                <Heading fontSize={"25"} fontFamily="atkinson">Por que você está denunciando?</Heading>
                <Text fontFamily="outfit">Dê detalhes sobre o ocorrido</Text>
                <Textarea w="90vh" h="25vh" placeholder="Descreva" onChange={handleChange} name="den_content"/>
                <ButtonGroup>
                    <Button onClick={checkInputs} colorScheme="linkedin" fontFamily="outfit">Enviar</Button>
                    <Link to={`/offer/${offer.offer}`}><Button colorScheme="linkedin" fontFamily="outfit">Cancelar</Button></Link>
                </ButtonGroup>
            </Stack>
            <Footer/>
        </Box> 
    )
}

export default Report;
