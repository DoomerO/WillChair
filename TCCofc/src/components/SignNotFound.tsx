import { Flex, Text } from "@chakra-ui/react";
import {MdOutlineSearchOff} from "react-icons/md";

interface signProps {
    msg : string
}

const SignNotFound = ({msg} : signProps) => {
    return (
        <Flex align="center" h="40vh" direction="column" 
        bgGradient="linear(to-b, #1976D230, #1976D2)" 
        w="100%" pt="3%">
            <MdOutlineSearchOff size="45%"/>
            <Text fontSize="25px">{msg}</Text>
        </Flex>
    );
}

export default SignNotFound;