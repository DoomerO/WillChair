import { Flex, Heading, Spacer, Button, Box, Text } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import serverUrl from "../../components/code/serverUrl";
import Loading from "../../components/toggles/Loading";

const EmailConfirmation = () => {
    const {path, email} = useParams();
    const navigate = useNavigate();
    const [resp, setResp] = useState<string>();
    const [loading, isLoading] = useState(true);

    async function getUser() {
        await axios.get(`${serverUrl}/users/profile/${email}`).then(() => {
            setResp("Email confirmado");
            isLoading(false);
        }).catch(error => {
            console.log(error);
            setResp("Esse email não existe no sistema");
            isLoading(false);
        });
    }

    useEffect(() => {
        if(email) getUser();
    }, [email]);

    return (
        (loading) ? <Loading/> : <Box w="100%" h="100%" justifyContent="center">
            <Flex align="center" border="3px" direction="column" h="inherit" mt={{base:"25%", md:"10%"}}>
                <Heading as='h1' >Confirmação de Email</Heading>
                <Spacer/>
                <Flex direction="column" align="center" mt="3%" mb="0.5%">
                    <Text fontSize={{base: "23px", md:"25px"}}>{resp}</Text>
                </Flex>
                <Button variant="solid" colorScheme="linkedin" mt="0.5%" onClick={() => {navigate(path ?? "")}}>Seguir</Button>
            </Flex>
        </Box>
    )
}

export default EmailConfirmation;