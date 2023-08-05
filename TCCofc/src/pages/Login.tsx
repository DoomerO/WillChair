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
        email : ""
    })
    const logOrSign = useParams()
    const [password, setPassword] = useState("")
    const [subPass, setSubPass] = useState("")
    const [screen, setScreen] = useBoolean(logOrSign.screen == "new" ? true : false)
    const toast = useToast()
    const route = useNavigate()
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFields(prev => ({...prev, [e.target.name]:e.target.value}))
    }
    
    function clearFields(){
        setFields(prev => ({...prev,
            name : "",
            email : ""
        }))
        setPassword("")
        setSubPass("")
    }
    
    function callToast(title:string, desc:string, duration:number, type?:any){
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
        if(subPass == password){
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
            setPassword("")
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
                    <Wrap direction='row' spacing={0}>
                        <Flex alignContent="center" w="46%" h="100%" direction="column" m="2%">
                        <Input className='submit' placeholder='E-mail' pattern="(?=.){1,64}@([\w-]+\.)+[\w-]{2,4}" onChange={handleChange} name="email" value={fields.email} fontFamily="outfit"/>
                        <Password setTo={setPassword} value={password} placeholder='Senha'/>
                        <Button type='submit' onClick={handleLogin} fontFamily="outfit">Enviar</Button>
                        </Flex>
                        <Flex alignContent="center" w="46%" h="100%" direction="column" m="2%">
                        <Button onClick={setScreen.toggle} fontFamily="outfit">Cadastro</Button>
                        </Flex>
                    </Wrap>
                </Collapse>
                <Collapse in={screen}>
                <Text fontFamily="outfit" fontSize="200%" textAlign="center" w="50%" ml="50%" pb="3%" pt="3%">Cadastro</Text>
                    <Wrap direction='row' spacing={0}>
                        <Flex alignContent="center" w="46%" h="100%" m="2%" direction="column">
                        <Button onClick={setScreen.toggle} fontFamily="outfit">Login</Button>
                        </Flex>
                        <Flex alignContent="center" w="46%" h="100%" m="2%" direction="column">
                        <Input className='submit' placeholder='Nome de usuário' onChange={handleChange} name="name" value={fields.name} fontFamily="outfit"/>
                        <Input className='submit' placeholder='E-mail' pattern="(?=.){1,64}@([\w-]+\.)+[\w-]{2,4}" onChange={handleChange} name="email" value={fields.email} fontFamily="outfit"/>
                        <Password setTo={setSubPass} value={subPass} placeholder='Senha'/>
                        <Password setTo={setPassword} value={password} placeholder='Confirmar senha'/>
                        <Button type='submit' onClick={handleSubmits} fontFamily="outfit">Enviar</Button>
                        </Flex>
                    </Wrap>
                </Collapse>
        </Container>
    );
}

export default Loginwip;
