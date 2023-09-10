import { Box, Button, Flex, Heading, IconButton, Spacer, Stack, Text, useColorMode, useToast } from "@chakra-ui/react";
import decode from "../../components/code/decoderToken";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import Password from "../../components/Password";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSun, FiMoon } from "react-icons/fi";

const PasswordChange = () => {
    const [user, setUser] = useState(decode(localStorage.getItem("token")));
    const {toggleColorMode} = useColorMode();
    const [password, setPassword] = useState({
        passValue : "",
        passMiss : false,
    });
    const [subPass, setSubPass] = useState("")
    const toast = useToast();
    const navigate = useNavigate();
    const handlePass = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(prev => ({
        ...prev, passValue:e.target.value,
        passMiss:e.target.validity.patternMismatch}))
    }

    async function changePassword() {
        if(subPass != password.passValue){
            toast({title: 'Senhas diferentes',
            description: "As senhas não conferem",
            status: 'warning',
            duration: 2000,
            isClosable: true})
            return
        }
        if(password.passMiss){
            toast({title: "Senha inválida",
            description: "A senha deve conter Letras minúsculas e maiúsculas, número e no mínimo 8 caractéres",
            status: 'warning',
            duration: 5000,
            isClosable: true})
            return
        }
        await axios.put(`http://localhost:3344/users/password/${user.email}`, {
            password : password.passValue
        }, {headers : {authorization : "Bearer " + localStorage.getItem("token")}}).then((res) => {
            toast({
                position: 'bottom',
                render: () => (
                    <Stack bg="green.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", md:"20px"}}>Senha atualizada com sucesso!</Text>
                        <Button variant="outline" color="#fff" _hover={{bg:"#fff2"}} onClick={() => {navigate("/"); navigate(0)}}>Ir para a Home</Button>
                    </Stack>
                )
            })
        }).catch((error) => {
            console.log(error);
            if(error.response.status == 401) {
                toast({
                    title: 'Campos em branco',
                    description: "Todos os dados devem ser preenchidos",
                    status: 'error',
                    duration: 3000,
                    isClosable: true})
            }
        });
    }

    return (
        <Box w="100%" h="100%" justifyContent="center" align="center">
            <Flex direction="row" w="90%" mt="3%">
                    <Link to={`/profile/${user.email}/view`}><IconButton aria-label='Return to home' icon={<FiArrowLeft/>}></IconButton></Link>
                    <Spacer/>
                    <IconButton onClick={toggleColorMode} aria-label='switch lighting mode'
                    icon={localStorage.getItem("chakra-ui-color-mode") == 'light' ? <FiSun/> : <FiMoon/>}></IconButton>
            </Flex>
            <Flex align="center" border="3px" direction="column" h="inherit" mt={{base:"20%", md:"7%"}}>
                <Heading as='h1' textAlign="center">Indique a nova senha</Heading>
                <Spacer/>
                <Flex direction="column" align="center" mt="3%" mb="2%">
                    <Text fontSize={{base: "23px", md:"25px"}} mb="3%">Digite aqui sua nova senha.</Text>
                    <Password onChange={handlePass} placeholder="Senha" value={password.passValue}
                    validity={password.passMiss && password.passValue.length > 0}/>
                    <Password onChange={(e) => {setSubPass(e.target.value)}} placeholder="Confirmar Senha" value={subPass} validity={subPass != password.passValue}/>
                </Flex>
                <Button variant="solid" colorScheme="linkedin" mt="0.5%" onClick={() => {changePassword()}}>Salvar</Button>
            </Flex>
       </Box>
    )
}

export default PasswordChange;