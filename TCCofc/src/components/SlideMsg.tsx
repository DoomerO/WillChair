import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import colors from "../colors/colors";

interface slideMsgProps {
    msg: string,
    icon: React.ReactElement,
    title: string
}

const SlideMsg = ({msg, icon, title}: slideMsgProps) => {
    return (
        <Flex direction="row" bg={colors.slideMsgBg} h="40vh" align="center" borderRadius="30px" _dark={{bg : colors.slideMsgBg_Dark}} ml="40px">
            <Flex direction="column" ml="3%" h="80%" w="50%">
                <Heading as="h3" fontSize={{base:"25px", sm:"28px"}} color={colors.colorFontBlue}>{title}</Heading>
                <Spacer/>
                <Text textAlign="justify">{msg}</Text>
                <Spacer/>
            </Flex>
            <Spacer/>
            {icon}
        </Flex>
    )
}

export default SlideMsg;