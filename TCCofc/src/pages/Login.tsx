import '../styles/pages/Login.css';
import { useState, useEffect, ChangeEvent } from 'react';
import Password from '../components/Password';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Wrap, Button, IconButton, Collapse, Input, useBoolean, Container, useToast, Flex, useColorMode, ButtonGroup, Text } from '@chakra-ui/react'
import { FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi'

const Loginwip = () => {
    const [fields, setFields] = useState({
        name : "",
        nameMissMatch: false,
        email : "",
        emailMissMatch : false
    })
    const logOrSign = useParams()
    const [password, setPassword] = useState({
        password : "",
        missmatch : false
    })
    const [subPass, setSubPass] = useState("")
    const [screen, setScreen] = useBoolean(logOrSign.screen == "new" ? true : false)
    const toast = useToast()
    const route = useNavigate()

    const handleValidity = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(prev => ({...prev, password:e.target.value, missmatch:e.target.validity.patternMismatch}))
    }

    function clearFields(){
        setFields(prev => ({...prev,
            name : "",
            email : ""
        }))
        setPassword(prev => ({...prev,
            password : "",
            missmatch : false
        }))
        setSubPass("")
    }
    
    function callToast(title:string, desc:string, duration?:number, type?:any){
        toast({
            title: title,
            description: desc,
            status: type,
            duration: duration,
            position: 'bottom',
        })
    }

    function handleLogin(){ //Controla login
        axios.get(`http://localhost:3344/users/login/${fields.email}/${password}`, {
        }).then(res=> {
            localStorage.setItem("token", res.data.token);
            callToast("Usuário(a) encontrado(a)", "Finalizando login...", 2000, "success")
            route("../")
        }).catch(error => {
            if(error){
                let errorCode:Number = error.response ? error.response.status : 0
                let errorMsg:string
                console.log(error.response.status)
                switch(errorCode){
                    case 401: errorMsg = "Usuário(a) não encontrado(a)"
                    break;
                    case 404: errorMsg = "Todos os campos devem ser preenchidos"
                    break;
                    default: errorMsg = "Sem resposta do servidor"
                    break;
                }
                callToast("Erro.", errorMsg, 3000, "error")
        }});
        clearFields()
    }

    function handleSubmits () { //Controla cadastro
        if(fields.emailMissMatch){callToast("Email inválido", "Insira um email adequado", 2000, "warning"); return}
        if(password.missmatch){callToast("Senha inválida", "A senha deve conter Letras minúsculas e maiúsculas, número e no mínimo 8 caractéres", 5000, "warning"); return}
        if(subPass == password.password){
            axios.post('http://localhost:3344/users', {
                user_email: fields.email, 
                user_name: fields.name,
                password: password,
                user_level: 0}).then(res => {
                localStorage.setItem("token", res.data.token);
                callToast("Usuário(a) registrado(a).", "Você será redirecionado(a) em breve.", 2000, "loading")
                route("../")
                clearFields()
            }).catch(error => {
                if(error){
                    let errorCode:Number = error.response ? error.response.status : 0
                    let errorMsg:string
                    console.log(error.response.status)
                    switch(errorCode){
                        case 401: errorMsg = "Todos os campos devem ser preenchidos"
                        break;
                        default: errorMsg = "Sem resposta do servidor"
                        break;
                    }
                    callToast("Erro.", errorMsg, 3000, "error")
                }
                clearFields()
            }); 
        }
        else{
            callToast("Senhas diferentes.", "As senhas não conferem.", 2000, "warning")
            setSubPass("")
        }
    }

   useEffect(clearFields, [screen])

   window.onkeydown = (e) => {
    switch(e.key){
        case "Enter": screen ? handleSubmits() : handleLogin();break;
    }
   }

   const {toggleColorMode} = useColorMode();
    
    return (
        <Container borderRadius='10px' h="80vh" w="100vw" border="solid #DDD 0.4vh" _dark={{border:"solid #1976D2 0.4vh"}} marginTop='10vh'
            padding='2vh'  minH="80vh" minW="80%" maxW="fit-content">
                <ButtonGroup spacing="80%" w="100%" justifyContent="center" variant="ghost">
                <Link to="../"><IconButton aria-label='Return to home' icon={<FiArrowLeft/>}></IconButton></Link>
                <IconButton onClick={toggleColorMode} aria-label='switch lighting mode'
                icon={localStorage.getItem("chakra-ui-color-mode") == 'light' ? <FiSun/> : <FiMoon/>}></IconButton>
                </ButtonGroup>

                <Collapse in={!screen}>
                    <Text fontFamily="outfit" fontSize="200%" textAlign="center" w="50%" pb="3%" pt="3%">Login</Text>
                    <Wrap direction='row' spacing={0} id='log'>
                        <Flex alignContent="center" w="46%" h="100%" direction="column" m="2%">
                        <Input className='submit' placeholder='E-mail' pattern="(?=.){1,64}@([\w-]+\.)+[\w-]{2,4}" onChange={
                            (e) => {setFields(prev => ({...prev, email: e.target.value, emailMissMatch: e.target.validity.patternMismatch}))}
                        } value={fields.email} fontFamily="outfit"/>
                        <Password onChange={handleValidity} value={password.password} placeholder='Senha'/>
                        <Button type='submit' onClick={handleLogin} fontFamily="outfit">Enviar</Button>
                        </Flex>
                        <Flex alignContent="center" w="46%" h="100%" direction="column" m="2%">
                        <Button onClick={setScreen.toggle} fontFamily="outfit">Cadastro</Button>
                        </Flex>
                    </Wrap>
                </Collapse>

                <Collapse in={screen}>
                <Text fontFamily="outfit" fontSize="200%" textAlign="center" w="50%" ml="50%" pb="3%" pt="3%">Cadastro</Text>
                    <Wrap direction='row' spacing={0} id='sign'>
                        <Flex alignContent="center" w="46%" h="100%" m="2%" direction="column">
                        <Button onClick={setScreen.toggle} fontFamily="outfit">Login</Button>
                        </Flex>
                        <Flex alignContent="center" w="46%" h="100%" m="2%" direction="column">
                        <Input className='submit' placeholder='Nome de usuário' onChange={
                            (e) => {setFields(prev => ({...prev, name: e.target.value, nameMissMatch: e.target.validity.patternMismatch}))}
                        } name="name" value={fields.name} fontFamily="outfit"/>
                        <Input className='submit' placeholder='E-mail' pattern="(?=.){1,64}@([\w-]+\.)+[\w-]{2,4}" onChange={
                            (e) => {setFields(prev => ({...prev, email: e.target.value, emailMissMatch: e.target.validity.patternMismatch}))}
                        } value={fields.email} fontFamily="outfit"/>
                        <Password onChange={handleValidity} value={password.password} placeholder='Senha'/>
                        <Password onChange={(e) => {setSubPass(e.target.value)}} value={subPass} placeholder='Confirmar senha'/>
                        <Button type='submit' onClick={handleSubmits} fontFamily="outfit">Enviar</Button>
                        </Flex>
                    </Wrap>
                </Collapse>
        </Container>
    );
}

export default Loginwip;
