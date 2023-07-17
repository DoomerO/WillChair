import { Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import colors from "../colors/colors";

interface slideMsgProps {
    msg: string,
    icon: React.ReactElement,
    title: string
}

const SlideMsg = ({msg, icon, title}: slideMsgProps) => {
    return (
        <Flex direction={{base:"column-reverse" ,sm:"row"}} bg={colors.slideMsgBg} h={{base:"80vh" ,sm:"40vh"}} align="center" borderRadius="30px" _dark={{bg : colors.slideMsgBg_Dark}} ml={{base:"none",sm:"40px"}}
        pt={{base:"5vh", sm:"0"}}>
            <Flex direction="column" ml={{base:"none" ,sm:"3%"}} h="80%" w={{base:"80%", sm:"50%"}} align={{base:"center", sm:"normal"}}>
                <Heading as="h3" fontSize={{base:"25px", sm:"28px"}} color={colors.colorFontBlue}>{title}</Heading>
                <Spacer/>
                <Text textAlign="justify" fontSize={{base:"18px", sm:"15px"}}>{msg}</Text>
                <Spacer/>
            </Flex>
            <Spacer/>
            {icon}
        </Flex>
    )
}

export default SlideMsg;