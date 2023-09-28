import { Box, Button, FormLabel, Heading, Input, Spacer, Stack, Text, ToastPosition, UseToastOptions, useToast } from "@chakra-ui/react";
import colors from "../colors/colors";
import { ChangeEvent, useState } from "react";
import "../fonts/fonts.css";
import Password from "../components/Password";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loginInfo, setLogin] = useState({
        password: "",
        passwordMissmatch: false,
        email: "",
        emailMissmatch: false
    })
    const navigate = useNavigate();
    const toast = useToast();

    window.onkeydown = (e) => {
        switch (e.key) {
            case "Enter":
                verifyAdm();
                break;
        }
    }

    function callToast(title: string, desc: string, time?: number, type?: UseToastOptions["status"], pos?: ToastPosition, close?: boolean) {
        toast({
            title: title,
            description: desc,
            status: type,
            duration: time,
            position: pos,
            isClosable: close ? close : true
        })
    }

    async function verifyAdm() {
        if (loginInfo.email != "" && loginInfo.password != "" && !loginInfo.emailMissmatch && !loginInfo.passwordMissmatch) {
            await axios.get(`http://localhost:3344/adm/login/${loginInfo.email}/${loginInfo.password}`).then((res) => {
                localStorage.setItem("token", res.data.token);
                callToast("Login Realizado!", "Aguarde o reirecionamento...", 3000, "loading", "bottom");
                navigate("/");
            }).catch((error) => {
                if (error.response.status == 401) {
                    callToast("Informações Erradas!", "Ou o email de acesso ou a senha estão incorretos.", 3000, "error", "bottom")
                }
                console.log(error);
            })
        }
        else callToast("Campos não preenchidos corretamente!", "É necessário o preenchimento correto de todos os campos para a realização do login!", 3000, "warning", "bottom");
    }

    const handleValidity = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(prev => ({ ...prev, password: e.target.value, passwordMissmatch: e.target.validity.patternMismatch }))
    }

    const handleValidityEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setLogin(prev => ({ ...prev, email: e.target.value, emailMissmatch: e.target.validity.patternMismatch }))
    }

    return (
        <Box w="100%" h="100%">
            <Stack direction="column" align="center" spacing={25} h="100%" w="100%">
                <Stack direction="column" spacing={5} mt="3%">
                    <Heading as="h1" fontFamily="outfit" textAlign="center">Olá Administrador! </Heading>
                    <Text as="h3" fontWeight="semibold" fontSize="25px" fontFamily="outfit" textAlign="center">Realize seu login para acessar a aplicação!</Text>
                </Stack>
                <Spacer />
                <Stack direction="column" w="50%" spacing={3} borderRadius="10px" bg={colors.veryLightBlue} _dark={{ border: "2px solid #fff3", bg: "#0000" }} p="2%" align="center">
                    <FormLabel w="100%"> Email:
                        <Input type="text" pattern={`(.){1,64}@(.){1,}[.](.){2,}`} onChange={handleValidityEmail} isInvalid={loginInfo.emailMissmatch}></Input>
                    </FormLabel>

                    <FormLabel w="100%"> Senha:
                        <Password onChange={handleValidity} value={loginInfo.password} validity={loginInfo.passwordMissmatch}></Password>
                    </FormLabel>

                    <Button colorScheme="linkedin" w="fit-content" onClick={verifyAdm}>Acessar</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Login;