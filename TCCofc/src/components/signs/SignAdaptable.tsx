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
        bgGradient={(bgType == "gradient") ? "#1976D290" : ""} w={width}>
           {icon}
            <Text fontSize={{base:"18px" ,md:"25px"}} fontFamily="atkinson" textAlign="center">{msg}</Text>
        </Flex>
    )
}

export default SignAdaptable;