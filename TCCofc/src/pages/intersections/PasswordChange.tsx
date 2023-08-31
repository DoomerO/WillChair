import { Box, Button, Flex, Heading, Spacer, Stack, Text, useToast } from "@chakra-ui/react";
import decode from "../../components/code/decoderToken";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import Password from "../../components/Password";
import { useNavigate } from "react-router-dom";

const PasswordChange = () => {
    const [user, setUser] = useState(decode(localStorage.getItem("token")));
    const [password, setPassword] = useState("");
    const toast = useToast();
    const navigate = useNavigate();

    async function changePassword() {
        await axios.put(`http://localhost:3344/users/password/${user.email}`, {
            password : password
        }, {headers : {authorization : "Bearer " + localStorage.getItem("token")}}).then((res) => {
            toast({
                position: 'bottom',
                render: () => (
                    <Stack bg="green.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", sm:"20px"}}>Senha atualizada com sucesso!</Text>
                        <Button variant="outline" color="#fff" _hover={{bg:"#fff2"}} onClick={() => {navigate("/"); navigate(0)}}>Ir para a Home</Button>
                    </Stack>
                )
            })
        }).catch((error) => {
            console.log(error);
            if(error.response.status == 401) {
                toast({
                    title: 'Seu usuário não existe no banco de dados!',
                    description: "Se certifique de que está logado corretamente!",
                    status: 'error',
                    duration: 9000,
                    isClosable: true})
            }
        });
    }

    const handleChange  = (e:ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <Box w="100%" h="100%" justifyContent="center">
            <Flex align="center" border="3px" direction="column" h="inherit" mt={{base:"25%", sm:"10%"}}>
                <Heading as='h1' textAlign="center">Indique a nova senha</Heading>
                <Spacer/>
                <Flex direction="column" align="center" mt="3%" mb="2%">
                    <Text fontSize={{base: "23px", sm:"25px"}} mb="3%">Digite aqui sua nova senha.</Text>
                    <Password onChange={handleChange} placeholder="Senha" value={password}></Password>
                </Flex>
                <Button variant="solid" colorScheme="linkedin" mt="0.5%" onClick={() => {changePassword()}}>Salvar</Button>
            </Flex>
       </Box>
    )
}

export default PasswordChange;