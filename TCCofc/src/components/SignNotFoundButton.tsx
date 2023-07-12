import { Button, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../fonts/fonts.css";

interface signProps {
    msg : string,
    btnPath : string,
    btnText : string,
    icon : React.ReactElement
}

const SignNotFoundButton = ({msg, icon, btnPath, btnText} : signProps) => {
    return (
        <Flex align="center" h="40vh" direction="column" 
        bgGradient="linear(to-b, #1976D230, #1976D2)" 
        w="100%" pt="3%">
           {icon}
            <Text fontSize="25px" fontFamily="atkinson">{msg}</Text>
            <Button variant="outline" bgColor="#0000" mt="1.5%"><Link to={btnPath}>{btnText}</Link></Button>
        </Flex>
    );
}

export default SignNotFoundButton;