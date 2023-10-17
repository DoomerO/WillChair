import { Box, Button, Flex, Heading, IconButton, Spacer, Text, useColorMode, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { FiArrowLeft, FiSun, FiMoon } from "react-icons/fi";

import Password from "../../components/Password";
import axios from "axios";
import serverUrl from "../../components/code/serverUrl";
import decode from "../../components/code/decoderToken";
import { UserToken } from "../../components/code/interfaces";

const PasswordChange = () => {
    const [user, setUser] = useState<UserToken>({});
    const { toggleColorMode } = useColorMode();
    const [password, setPassword] = useState({
        passValue: "",
        passMiss: false,
    });
    const [subPass, setSubPass] = useState("")
    const toast = useToast();
    const navigate = useNavigate();
    const handlePass = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(prev => ({
            ...prev, passValue: e.target.value,
            passMiss: e.target.validity.patternMismatch
        }))
    }

    async function changePassword() {
        if (subPass != password.passValue) {
            toast({
                title: 'Senhas diferentes',
                description: "As senhas não conferem",
                status: 'warning',
                duration: 2000,
                isClosable: true
            })
            return
        }
        if (password.passMiss) {
            toast({
                title: "Senha inválida",
                description: "A senha deve conter Letras minúsculas e maiúsculas, número e no mínimo 8 caractéres",
                status: 'warning',
                duration: 5000,
                isClosable: true
            })
            return
        }
        await axios.put(`${serverUrl}/users/password/${user.email}`, {
            password: password.passValue
        }, { headers: { authorization: "Bearer " + localStorage.getItem("token") } }).then(() => {
            toast({
                title: "Senha atualizada!",
                description: "Sua senha foi atualizada devidamente!",
                status: 'success',
                duration: 5000,
                isClosable: true
            })
            navigate("/")
        }).catch((error) => {
            console.log(error);
            if (error.response.status == 401) {
                toast({
                    title: 'Campos em branco',
                    description: "Todos os dados devem ser preenchidos",
                    status: 'error',
                    duration: 3000,
                    isClosable: true
                })
            }
        });
    }

    useEffect(() => {
        const test = localStorage.getItem("token");

        if (test) {
            const token = decode(test);
            setUser(token);
        }
    }, [])

    return (
        <Box w="100%" h="100%" justifyContent="center" alignContent="center">
            <Flex direction="row" w="90%" ml="5%" justifyContent="center" align={"center"} position={{ base: "absolute", md: "inherit" }}>
                <IconButton aria-label='Return to home' icon={<FiArrowLeft />} onClick={() => { navigate(`/profile/${user.email}/view`) }}></IconButton>
                <Spacer />
                <IconButton onClick={toggleColorMode} aria-label='switch lighting mode'
                    icon={localStorage.getItem("chakra-ui-color-mode") == 'light' ? <FiSun /> : <FiMoon />}></IconButton>
            </Flex>
            <Flex align="center" border="3px" direction="column" h="inherit" mt={{ base: "10%", md: "7%" }}>
                <Heading as='h1' textAlign="center" mt={{base: "18vh", md:"0"}}>Indique a nova senha</Heading>
                <Spacer />
                <Flex direction="column" align="center" mt="3%" mb="2%">
                    <Text fontSize={{ base: "23px", md: "25px" }} mb="3%">Digite aqui sua nova senha.</Text>
                    <Password onChange={handlePass} placeholder="Senha" value={password.passValue}
                        validity={password.passMiss && password.passValue.length > 0} />
                    <Password onChange={(e) => { setSubPass(e.target.value) }} placeholder="Confirmar Senha" value={subPass} validity={subPass != password.passValue} />
                </Flex>
                <Button variant="solid" colorScheme="linkedin" mt="0.5%" onClick={() => { changePassword() }}>Salvar</Button>
            </Flex>
        </Box>
    )
}

export default PasswordChange;