import {Flex, Spacer, Text, Heading, Button, Box} from "@chakra-ui/react";
import "../fonts/fonts.css";
import { Link } from "react-router-dom";
import {AiOutlineArrowDown} from "react-icons/ai"

const TokenErrorPage = () => {
    return (
       <Box w="100%" h="100%" justifyContent="center">
            <Flex align="center" border="3px" direction="column" h="inherit" mt="10%">
                <Heading as='h1' >Ops...Aconteceu um Erro!</Heading>
                <Spacer/>
                <Flex direction="column" align="center" mt="3%" mb="0.5%">
                    <Text fontSize={{base: "23px", sm:"25px"}}>Parece que seu acessou acabou!</Text>
                    <Text fontSize={{base: "23px", sm:"25px"}}>Clique no botão abaixo para renová-lo</Text>    
                </Flex>
                <AiOutlineArrowDown size="5vh"/>
                <Button variant="solid" colorScheme="linkedin" mt="0.5%"><Link to="/loginw">Login</Link></Button>
            </Flex>
       </Box>
    )
}

export default TokenErrorPage;