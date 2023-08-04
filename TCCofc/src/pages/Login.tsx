import '../styles/pages/Login.css';
import { useState, useEffect, ChangeEvent } from 'react';
import Password from '../components/Password';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Wrap, Button, Collapse, Input, useBoolean, Container, useToast, Flex, useColorMode, ButtonGroup, Text } from '@chakra-ui/react'
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
    
    function callToast(title:string, desc:string, type:any, close:boolean){
        toast({
            title: title,
            description: desc,
            status: type,
            duration: 3000,
            position: 'bottom',
            isClosable: close
        })
    }

    function handleLogin(){ //Controla login
        axios.get(`http://localhost:3344/users/login/${fields.email}/${password}`, {
        }).then(res=> {
            localStorage.setItem("token", res.data.token);
            callToast("Usuário encontrado", "Finalizando login...", "success", false)
            route("../")
        }).catch(error => {
            error ? callToast("Erro." ,error.message ? error.message : "Campos não preenchidos", "error", true) : {}
        });
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
                callToast("Usuário/a registrado/a.", "Você será redirecionado/a em breve.", "loading", false)
                route("../")
                clearFields()
            }).catch(error => {
                if(error){
                    let errorCode:Number = error.response ? error.response.status : 0
                    let errorMsg:string
                    switch(errorCode){
                        case 401: errorMsg = "Todos os campos devem ser preenchidos"
                        break;
                        default: errorMsg = "Sem resposta do servidor"
                        break;
                    }
                    callToast("Erro.", errorMsg, "error", true)
                }
                clearFields()
            }); 
        }
        else{
            callToast("Senhas diferentes.", "As senhas não conferem.", "warning", true)
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
        <Container borderRadius='10px' border="solid #000 0.4vh" _dark={{border:"solid #1976D2 0.4vh"}} marginTop='10vh'
            padding='2vh'  minH="80vh" minW="80%" maxW="fit-content">
                <ButtonGroup spacing="80%" w="100%" justifyContent="center">
                <Button><Link to="../"><FiArrowLeft/></Link></Button>
                <Button onClick={toggleColorMode}>{
                    localStorage.getItem("chakra-ui-color-mode") == 'light' ? <FiSun/> : <FiMoon/>
                }</Button>
                </ButtonGroup>
                <Collapse in={!screen}>
                    <Wrap direction='row' spacing={0}>
                        <Flex alignContent="center" w="50%" h="100%" direction="column">
                        <Input className='submit' placeholder='E-mail' onChange={handleChange} name="email" value={fields.email} fontFamily="outfit"/>
                        <Password setTo={setPassword} value={password} placeholder='Senha'/>
                        <Button type='submit' onClick={handleLogin} fontFamily="outfit">Enviar</Button>
                        </Flex>
                        <Flex alignContent="center" w="50%" h="100%" direction="column">
                        <Button onClick={setScreen.toggle} fontFamily="outfit">Cadastro</Button>
                        </Flex>
                    </Wrap>
                </Collapse>
                <Collapse in={screen}>
                    <Wrap direction='row' spacing={0}>
                        <Flex alignContent="center" w="50%" h="100%" direction="column">
                        <Button onClick={setScreen.toggle} fontFamily="outfit">Login</Button>
                        </Flex>
                        <Flex alignContent="center" w="50%" h="100%" direction="column">
                        <Input className='submit' placeholder='Nome de usuário' onChange={handleChange} name="name" value={fields.name} fontFamily="outfit"/>
                        <Input className='submit' placeholder='E-mail' onChange={handleChange} name="email" value={fields.email} fontFamily="outfit"/>
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
