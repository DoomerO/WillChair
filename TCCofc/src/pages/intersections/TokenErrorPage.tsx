import {Flex, Spacer, Text, Heading, Button, Box} from "@chakra-ui/react";
import "../../fonts/fonts.css";
import { Link } from "react-router-dom";
import {AiOutlineArrowDown} from "react-icons/ai/index"

const TokenErrorPage = () => {
    return (
       <Box w="100%" h="100%" justifyContent="center">
            <Flex align="center" border="3px" direction="column" h="inherit" mt={{base:"23vh" , md:"10%"}}>
                <Heading as='h1' >Sua conexão expirou!</Heading>
                <Spacer/>
                <Flex direction="column" align="center" mt="3%" mb="0.5%">
                    <Text fontSize={{base: "23px", md:"25px"}} textAlign="center">Clique no botão abaixo para renová-la</Text>    
                </Flex>
                <AiOutlineArrowDown size="5vh"/>
                <Link to="/login"><Button variant="solid" colorScheme="linkedin" mt="0.5%">Login</Button></Link>
                <Flex direction="column" align="center" mt="3%" mb="0.5%">
                    <Text fontSize={{base: "23px", md:"25px"}}>Ou desconecte</Text>   
                </Flex>
                <AiOutlineArrowDown size="5vh"/>
                <Link to="/logout"><Button variant="solid" colorScheme="linkedin" mt="0.5%">Logout</Button></Link>
            </Flex>
       </Box>
    )
}

export default TokenErrorPage;
