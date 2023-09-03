import { Flex, Heading, Spacer, Button, Box, Text } from "@chakra-ui/react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const EmailConfirmation = () => {
    const {path, email} = useParams();
    const navigate = useNavigate();
    const [resp, setResp] = useState<string>();

    async function getUser() {
        await axios.get(`http://localhost:3344/users/profile/${email}`).then(res => {
            setResp("Email confirmado");
        }).catch(error => {
            console.log(error);
            setResp("Esse email não existe no sistema");
        });
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Box w="100%" h="100%" justifyContent="center">
            <Flex align="center" border="3px" direction="column" h="inherit" mt={{base:"25%", md:"10%"}}>
                <Heading as='h1' >Confirmação de Email</Heading>
                <Spacer/>
                <Flex direction="column" align="center" mt="3%" mb="0.5%">
                    <Text fontSize={{base: "23px", md:"25px"}}>{resp}</Text>
                </Flex>
                <Button variant="solid" colorScheme="linkedin" mt="0.5%" onClick={() => {navigate("/")}}>Seguir</Button>
            </Flex>
        </Box>
    )
}

export default EmailConfirmation;