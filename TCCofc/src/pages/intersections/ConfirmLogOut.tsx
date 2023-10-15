import {Flex, Spacer, Text, Heading, Button, Box} from "@chakra-ui/react";
import "../../fonts/fonts.css";
import logOutFunc from "../../components/code/logout";
import { Link } from "react-router-dom";
import {AiOutlineArrowDown} from "react-icons/ai"

const ConfirmLogOut = () => {
    return (
       <Box w="100%" h="100%" justifyContent="center">
            <Flex align="center" border="3px" direction="column" h="inherit" mt={{base:"25%", md:"10%"}}>
                <Heading as='h1' textAlign="center">Tchau...então...</Heading>
                <Spacer/>
                <Flex direction="column" align="center" mt="3%" mb="0.5%">
                    <Text fontSize={{base: "23px", md:"25px"}}>Certeza que deseja realizar o Log Out?</Text>
                    <Text fontSize={{base: "23px", md:"25px"}}>Se sim, clique no botão abaixo...</Text>    
                </Flex>
                <AiOutlineArrowDown size="5vh"/>
                <Link to="/"><Button variant="solid" colorScheme="linkedin" mt="0.5%" onClick={logOutFunc}>Logout</Button></Link>
                <Link to="/"><Button variant="link" colorScheme="linkedin" mt="2.5%">Não, mudei de ideia!</Button></Link>
            </Flex>
       </Box>
    )
}

export default ConfirmLogOut;