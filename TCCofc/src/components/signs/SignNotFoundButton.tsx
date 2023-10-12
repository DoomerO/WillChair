import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../../fonts/fonts.css";

interface signProps {
    msg: string,
    btnPath: string,
    btnText: string,
    icon: React.ReactElement
}

const SignNotFoundButton = ({ msg, icon, btnPath, btnText }: signProps) => {
    return (
        <Flex align="center" h="40vh" direction="column" bg="#1976D290" w="100%" pt="3%">
            {icon}
            <Text fontSize={{base:"18px", md:"25px"}} fontFamily="atkinson" textAlign="center">{msg}</Text>
            <Link to={btnPath}><Button variant="outline" _hover={{ bg: "#fff3" }} bgColor="#0000" mt="1.5%">{btnText}</Button></Link>
        </Flex>
    );
}

export default SignNotFoundButton;