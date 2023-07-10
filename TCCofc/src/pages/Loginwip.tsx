import '../styles/pages/Login.css';
import { useState, useEffect } from 'react';
import Password from '../components/Password';
import axios from 'axios';
import { Wrap, Button, Toast, Collapse, Input, useBoolean, Container } from '@chakra-ui/react'

const Loginwip = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [subPass, setSubPass] = useState('');
    const [passMatch, setPassMatch] = useBoolean(false);
    const [password, setPassword] = useState('');

    function handleSubmits () { //Controla Envios de Formulários
        if(passMatch){
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
    }

    const [screen, setScreen] = useBoolean(false)

   useEffect(() => {
    setEmail('');
    setName('');
    setPassword('');
   }, [screen])

   useEffect(() => {
    password == subPass ? setPassMatch.on : setPassMatch.off;
   }, [password])

    return (
        <Container borderRadius='10px' marginTop='10vh' maxW='container.md'
            padding='2vh' height='fit-content' centerContent>
                <Collapse in={!screen}>
                    <Wrap justify='center'>
                        <Input className='submit' placeholder='E-mail ou nome de usuário' onChange={e => setName(e.target.value)} value={name}/>
                        <Password setTo={setPassword} placeholder='Senha'/>
                    </Wrap>
                    <Wrap justify='center' spacing={8}>
                        <Button onClick={setScreen.toggle}>Sign Up</Button>
                        <Button type='submit' onClick={handleSubmits}>Enviar</Button>
                    </Wrap>
                </Collapse>
                <Collapse in={screen}>
                    <Wrap justify='center'>
                        <Input className='submit' placeholder='Nome de usuário' onChange={e => setName(e.target.value)} value={name}/>
                        <Input className='submit' placeholder='E-mail' onChange={e => setEmail(e.target.value)} value={email}/>
                        <Password setTo={setSubPass} placeholder='Senha'/>
                        <Password setTo={setPassword} placeholder='Confirmar senha'/>
                    </Wrap>
                    <Wrap justify='center' spacing={8}>
                        <Button onClick={setScreen.toggle}>Login</Button>
                        <Button type='submit' onClick={handleSubmits}>Enviar</Button>
                    </Wrap>
                </Collapse>
        </Container>
    );
}

export default Loginwip;