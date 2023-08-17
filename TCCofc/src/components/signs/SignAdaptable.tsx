import { Flex, Text } from "@chakra-ui/react";
import "../../fonts/fonts.css";

interface signProps {
    msg : string,
    icon : React.ReactElement,
    bgType : string,
    width?: string,
    height? : string
}

const SignAdaptable = ({msg, icon, bgType, width ="100%", height="100%" } : signProps) => {
    return (
        <Flex align="center" h={height} direction="column" justifyContent="center" 
        bgGradient={(bgType == "gradient") ? "linear(to-b, #1976D230, #1976D2)" : ""} w={width}>
           {icon}
            <Text fontSize="25px" fontFamily="atkinson" textAlign="center">{msg}</Text>
        </Flex>
    )
}

export default SignAdaptable;