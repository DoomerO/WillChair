import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import colors from "../../colors/colors";
import "../../fonts/fonts.css";

const Loading = () => {
    return (
        <Box w="100%" h="100%">
            <Flex h="100%" mt="44vh" direction="column" justifyContent="center" align="center">
                <Spinner size="xl" mb="5vh" thickness='4px' speed='0.75s' emptyColor={colors.slideMsgBg} color={colors.colorFontBlue}/>
                <Text textAlign="center" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }} fontSize={{ base: "23px", md: "20px" }} fontFamily="outfit">Carregando...Espere um momento...</Text>
            </Flex>
        </Box>
    )
}

export default Loading;