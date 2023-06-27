import '../styles/pages/Login.css';
import { useState, useEffect } from 'react';
import Password from '../components/Password';
import axios from 'axios';
import { Wrap, Stack, Button, Toast, Collapse, Input, Center, useBoolean } from '@chakra-ui/react'

const Loginwip = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
 
    useEffect(() => { //controla acesso ao banco de dados
        axios.get("http://localhost:3344/users", {}).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    function handleSubmits () { //Controla Envios de Formulários
        axios.post('http://localhost:3344/users', {
            user_email: email, 
            user_name: name,
            password: password,
            user_level: 0}).then(res => {
            console.log("User Posted")
        }).catch(error => {
            console.log(error)
        });
    }

    const [screen, setScreen] = useBoolean(false)

    return (
        <Center>
            <Stack id='mainDiv' direction={'row'}>
                <Collapse in={!screen} >
                    <Wrap>
                        <Input className='submit' placeholder='E-mail ou nome de usuário'/>
                        <Password setTo={setPassword}/>
                    </Wrap>
                    <Wrap justify='center' spacing={8}>
                        <Button onClick={setScreen.toggle}>Sign Up</Button>
                        <Button>Enviar</Button>
                    </Wrap>
                </Collapse>
                <Collapse in={screen}>
                    <Wrap>
                        <Input className='submit' placeholder='Nome de usuário' onChange={e => setName(e.target.value)}/>
                        <Input className='submit' placeholder='E-mail' onChange={e => setEmail(e.target.value)}/>
                        <Password setTo={setPassword} placeHolder='Senha'/>
                        <Password setTo={setPassword} placeHolder='Confirmar senha'/>
                    </Wrap>
                    <Wrap justify='center' spacing={8}>
                        <Button onClick={setScreen.toggle}>Login</Button>
                        <Button type='submit' onClick={() => {handleSubmits()}}>Enviar</Button>
                    </Wrap>
                </Collapse>
            </Stack>
        </Center>
    );
}

export default Loginwip;