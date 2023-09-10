import { useToast, Stack, Button, Flex, Heading, Spacer, Text, Box, Input, IconButton, useColorMode } from "@chakra-ui/react";
import axios from "axios";
import { useState, ChangeEvent } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FiSun, FiMoon, FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import decode from "../../components/code/decoderToken";

const EmailChange = () => {
    const {id} = useParams();
    const [user, setUser] = useState(decode(localStorage.getItem("token")))
    const {toggleColorMode} = useColorMode();
    const [email, setEmail] = useState({
        emailValue : "",
        emailMissMatch: false,
    });
    const toast = useToast();
    const navigate = useNavigate();

    const handleEmail = (e:ChangeEvent<HTMLInputElement>) => {
        setEmail(prev => ({...prev, emailValue:e.target.value, emailMissMatch:e.target.validity.patternMismatch}));
    }

    
    const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            changeEmail();
        }
    }

    async function changeEmail() {
        
        await axios.put(`http://localhost:3344/users/email/${id}`, {
            email : email.emailValue
        }, {headers : {authorization : "Bearer " + localStorage.getItem("token")}}).then((res) => {
            localStorage.setItem("token", res.data.token);
            toast({
                position: 'bottom',
                render: () => (
                    <Stack bg="green.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", md:"20px"}}>Email atualizado com sucesso!</Text>
                        <Button variant="outline" color="#fff" _hover={{bg:"#fff2"}} onClick={() => {navigate("/"); navigate(0)}}>Ir para a Home</Button>
                    </Stack>
                )
            })
        }).catch((error) => {
            if(error.response.data.msg == "There is a user with this email alredy.") {
                toast({
                    title: 'Email já registrado!',
                    description: "Este email já está registrado no sistema, utilize outro!",
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
                <Heading as='h1' textAlign="center">Indique o novo email</Heading>
                <Spacer/>
                <Flex direction="column" align="center" mt="3%" mb="2%">
                    <Text fontSize={{base: "23px", md:"25px"}} mb="3%">Digite aqui seu novo email.</Text>
                    <Input type="text" pattern={`(.){1,64}@(.){1,}[.](.){2,}`} onKeyUp={handleKeyPress} onChange={handleEmail} fontFamily="outfit" isInvalid={email.emailMissMatch}/>
                </Flex>
                <Button variant="solid" colorScheme="linkedin" mt="0.5%" onClick={() => {changeEmail()}}>Salvar</Button>
            </Flex>
       </Box>
    )
}

export default EmailChange;