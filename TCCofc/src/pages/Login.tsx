import { useState, useEffect, ChangeEvent } from 'react';
import Password from '../components/Password';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Wrap, Button, IconButton, Collapse, Input, useBoolean, Container, useToast, Flex, useColorMode, ButtonGroup, Text, UseToastOptions, ToastPosition } from '@chakra-ui/react'
import { FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi'
import serverUrl from '../components/code/serverUrl';

const Login = () => {
    const [fields, setFields] = useState({
        name: "",
        nameMissMatch: false,
        email: "",
        emailMissMatch: false
    })
    const logOrSign = useParams();
    const toast = useToast();
    const [password, setPassword] = useState({
        password: "",
        missmatch: false
    })
    const [subPass, setSubPass] = useState("")
    const [screen, setScreen] = useBoolean(logOrSign.screen == "new" ? true : false)
    const route = useNavigate()

    const handleValidity = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(prev => ({ ...prev, password: e.target.value, missmatch: e.target.validity.patternMismatch }))
    }

    function clearFields() {
        setFields(prev => ({
            ...prev,
            name: "",
            email: "",
            nameMissMatch: false,
            emailMissMatch: false
        }))
        setPassword(prev => ({
            ...prev,
            password: "",
            missmatch: false
        }))
        setSubPass("")
    }

    window.onkeydown = (e) => {
        switch (e.key) {
            case "Enter":
                screen ? handleLogin() : handleSubmits()
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

    function handleLogin() { //Controla login
        axios.get(`${serverUrl}/users/login/${fields.email}/${password.password}`, {
        }).then(res => {
            localStorage.setItem("token", res.data.token);
            callToast("Usuário(a) encontrado(a)", "Finalizando login...", 2000, "success")
            route("/");
            route(0);
        }).catch(error => {
            if (error) {
                let errorCode: Number = error.response ? error.response.status : 0
                let errorMsg: string
                console.log(error.response.status)
                switch (errorCode) {
                    case 401: errorMsg = "Usuário(a) não encontrado(a)"
                        break;
                    case 404: errorMsg = "Todos os campos devem ser preenchidos"
                        break;
                    default: errorMsg = "Sem resposta do servidor"
                        break;
                }
                callToast("Erro.", errorMsg, 3000, "error")
            }
        });
        clearFields()
    }

    function handleSubmits() { //Controla cadastro
        if (fields.emailMissMatch) { callToast("Email inválido", "Insira um email adequado", 2000, "warning"); return }
        if (password.missmatch) { callToast("Senha inválida", "A senha deve conter Letras minúsculas e maiúsculas, número e no mínimo 8 caractéres", 5000, "warning"); return }
        if (subPass == password.password) {
            axios.post(`${serverUrl}/users`, {
                user_email: fields.email,
                user_name: fields.name,
                password: password.password
            }).then(res => {
                localStorage.setItem("token", res.data.token);
                callToast("Usuário(a) registrado(a)", "Você será redirecionado(a) em breve", 2000, "loading")
                route(`/preconfig`);
                route(0);
                clearFields()
            }).catch(error => {
                if (error) {
                    let errorMsg: string
                    console.log(error)
                    errorMsg = error.response.data.msg ? error.response.data.msg : "Sem conexão com o servidor"
                    callToast("Erro", errorMsg, 3000, "error")
                }
                clearFields()
            });
        }
        else {
            callToast("Senhas diferentes.", "As senhas não conferem.", 2000, "warning")
            setSubPass("")
        }
    }

    useEffect(clearFields, [screen])

    window.onkeydown = (e) => {
        switch (e.key) {
            case "Enter": screen ? handleSubmits() : handleLogin(); break;
        }
    }

    const { toggleColorMode } = useColorMode();

    return (
        <Container borderRadius='10px' h="fit-content" w="100vw" border="solid #DDD 0.4vh" _dark={{ border: "solid #1976D2 0.4vh" }}
            marginTop='10vh' padding='2vh' minW="80%" maxW="fit-content" bgPos={screen == false ? "right" : ""}
            bgSize="50%, 100%" bgRepeat="repeat-y" transition="0.2s">
            <ButtonGroup spacing="80%" w="100%" justifyContent="center" variant="ghost">
                <Link to="../"><IconButton aria-label='Return to home' icon={<FiArrowLeft />}></IconButton></Link>
                <IconButton onClick={toggleColorMode} aria-label='switch lighting mode'
                    icon={localStorage.getItem("chakra-ui-color-mode") == 'light' ? <FiSun /> : <FiMoon />}></IconButton>
            </ButtonGroup>

            <Collapse in={!screen}>
                <Wrap direction="row" spacing={0}>
                    <Text fontFamily="outfit" fontSize={(window.innerWidth + window.innerHeight) / 64} textAlign="center" w="50%" pb="2.5%" pt="3%">Login</Text>
                    <Text fontFamily="outfit" fontSize={(window.innerWidth + window.innerHeight) / 64} textAlign="center" w="50%" pb="2.5%" pt="3%">Ainda não fez cadastro?</Text>
                </Wrap>
                <Wrap direction='row' spacing={0} id='log'>
                    <Flex alignContent="center" w="46%" h="100%" direction="column" m="2%">
                        <Input className='submit' placeholder='E-mail' onChange={
                            (e) => { setFields(prev => ({ ...prev, email: e.target.value, emailMissMatch: e.target.validity.patternMismatch })) }
                        } value={fields.email} fontFamily="outfit" />
                        <Password onChange={handleValidity} value={password.password} placeholder='Senha' />
                        <Button mt="1%" type='submit' colorScheme='linkedin' onClick={handleLogin} fontFamily="outfit">Enviar</Button>
                    </Flex>
                    <Flex alignContent="center" w="46%" h="100%" direction="column" m="2%">
                        <Button onClick={setScreen.toggle} colorScheme='linkedin' fontFamily="outfit">Cadastro</Button>
                    </Flex>
                </Wrap>
            </Collapse>

            <Collapse in={screen}>
                <Wrap direction="row" spacing={0}>
                    <Text fontFamily="outfit" fontSize={(window.innerWidth + window.innerHeight) / 64} textAlign="center" w="50%" pb="3%" pt="3%">Já possui uma conta?</Text>
                    <Text fontFamily="outfit" fontSize={(window.innerWidth + window.innerHeight) / 64} textAlign="center" w="50%" pb="3%" pt="3%">Cadastro</Text>
                </Wrap>
                <Wrap direction='row' spacing={0} id='sign'>
                    <Flex alignContent="center" w="46%" h="100%" m="2%" direction="column">
                        <Button onClick={setScreen.toggle} colorScheme='linkedin' fontFamily="outfit">Login</Button>
                    </Flex>
                    <Flex alignContent="center" w="46%" h="100%" m="2%" direction="column">
                        <Input className='submit' placeholder='Nome de usuário' onChange={
                            (e) => { setFields(prev => ({ ...prev, name: e.target.value, nameMissMatch: e.target.validity.patternMismatch })) }
                        } name="name" value={fields.name} fontFamily="outfit" />
                        <Input mt="1%" className='submit' placeholder='E-mail' pattern={`(.){1,64}@(.){1,}[.](.){2,}`} onChange={
                            (e) => { setFields(prev => ({ ...prev, email: e.target.value, emailMissMatch: e.target.validity.patternMismatch })) }
                        } value={fields.email} fontFamily="outfit" isInvalid={fields.emailMissMatch} />
                        <Password onChange={handleValidity} value={password.password} placeholder='Senha' validity={password.missmatch} />
                        <Password onChange={(e) => { setSubPass(e.target.value) }} value={subPass} placeholder='Confirmar senha' validity={password.password != subPass} />
                        <Button mt="1%" type='submit' colorScheme='linkedin' onClick={handleSubmits} fontFamily="outfit">Enviar</Button>
                    </Flex>
                </Wrap>
            </Collapse>

        </Container>
    );
}

export default Login;
