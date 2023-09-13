import {Flex, Spacer, Text, Heading, Button, Box} from "@chakra-ui/react";
import "../../fonts/fonts.css";
import { Link } from "react-router-dom";
import {AiOutlineArrowDown} from "react-icons/ai"

const ErrorPage = () => {
    return (
       <Box w="100%" h="100%" justifyContent="center">
            <Flex align="center" border="3px" direction="column" h="inherit" mt="10%">
                <Heading as='h1' >Você não tem acesso à essa página!</Heading>
                <Spacer/>
                <Flex direction="column" align="center" mt="3%" mb="0.5%">
                    <Text textAlign="center" fontSize={{base: "23px", md:"25px"}}>Clique no botão abaixo para realizar o login como administrador</Text>    
                </Flex>
                <AiOutlineArrowDown size="5vh"/>
                <Link to="/login"><Button variant="solid" colorScheme="linkedin" mt="0.5%">Login</Button></Link>
            </Flex>
       </Box>
    )
}

export default ErrorPage;