import '../styles/pages/Login.css';
import { useState, useEffect } from 'react';
import Password from '../components/Password';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Wrap, Button, Collapse, Input, useBoolean, Container, useToast, Box } from '@chakra-ui/react'

const Loginwip = () => {
    const [fields, setFields] = useState({
        name : "",
        email : ""
    })
    const [password, setPassword] = useState("")
    const [subPass, setSubPass] = useState("")
    const [screen, setScreen] = useBoolean(false)
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
            duration: 4000,
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
                error ? callToast("Erro.", error.message, "error", true) : {}
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
        case "Enter": screen ? handleSubmits() : handleLogin()
    }
   }
    
    return (
        <Container borderRadius='10px' border="solid #000 0.4vh" marginTop='10vh'
            padding='2vh' centerContent minH="60vh" minW="0%" maxW="40%" paddingTop="5%">
                <Collapse in={!screen}>
                    <Wrap direction='row' spacing={5} paddingLeft="5%">
                        <Box textAlign="center" w="40%">
                        <Input className='submit' placeholder='E-mail' onChange={handleChange} name="email" value={fields.email}/>
                        <Password setTo={setPassword} value={password} placeholder='Senha'/>
                        <Button type='submit' onClick={handleLogin}>Enviar</Button>
                        </Box>
                        <Box textAlign="center" w="40%">
                        <Button onClick={setScreen.toggle}>Sign Up</Button>
                        </Box>
                    </Wrap>
                </Collapse>
                <Collapse in={screen}>
                    <Wrap direction='row' spacing={5} paddingLeft="5%">
                        <Box textAlign="center" w="40%">
                        <Input className='submit' placeholder='Nome de usuário' onChange={handleChange} name="name" value={fields.name}/>
                        <Input className='submit' placeholder='E-mail' onChange={handleChange} name="email" value={fields.email}/>
                        <Password setTo={setSubPass} value={subPass} placeholder='Senha'/>
                        <Password setTo={setPassword} value={password} placeholder='Confirmar senha'/>
                        <Button type='submit' onClick={handleSubmits}>Enviar</Button>
                        </Box>
                        <Box textAlign="center" w="40%">
                        <Button onClick={setScreen.toggle}>Login</Button>
                        </Box>
                    </Wrap>
                </Collapse>
        </Container>
    );
}

export default Loginwip;
