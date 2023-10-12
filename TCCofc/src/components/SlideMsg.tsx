import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import colors from "../colors/colors";

interface slideMsgProps {
    msg: string,
    icon: React.ReactElement,
    title: string
}

const SlideMsg = ({ msg, icon, title }: slideMsgProps) => {
    return (
        <Flex direction={{ base: "column-reverse", md: "row" }} bg={colors.slideMsgBg} h={{ base: "80vh", md: "40vh" }} align="center" borderRadius="30px" _dark={{ bg: colors.slideMsgBg_Dark }}
            pt={{ base: "5vh", md: "0" }}>
            <Flex direction="column" ml={{ base: "none", md: "3%" }} h="80%" w={{ base: "80%", md: "50%" }} align={{ base: "center", md: "normal" }}>
                <Heading as="h3" fontSize={{ base: "25px", md: "28px" }} color={colors.colorFontBlue}>{title}</Heading>
                <Spacer />
                <Text textAlign="justify" fontSize={{ base: "18px", md: "15px" }}>{msg}</Text>
                <Spacer />
            </Flex>
            <Spacer />
            {icon}
        </Flex>
    )
}

export default SlideMsg;