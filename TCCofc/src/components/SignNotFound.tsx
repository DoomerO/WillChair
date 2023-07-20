import { Flex, Text } from "@chakra-ui/react";
import "../fonts/fonts.css";

interface signProps {
    msg : string,
    icon : React.ReactElement
}

const SignNotFound = ({msg, icon} : signProps) => {
    return (
        <Flex align="center" h="40vh" direction="column" 
        bgGradient="linear(to-b, #1976D230, #1976D2)" 
        w="100%" pt="3%">
           {icon}
            <Text fontSize="25px" fontFamily="atkinson" textAlign="center">{msg}</Text>
        </Flex>
    );
}

export default SignNotFound;