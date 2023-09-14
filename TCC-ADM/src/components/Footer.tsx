import {Flex, Image, Stack} from '@chakra-ui/react';
import logo from "../img/logo.png"

const Footer = () => {
    return (
        <Flex w="100%" h="fit-content" bg="black" direction='column'>
            <Stack w='100%' mt='3%' direction='column'>
                <Image src={logo} align="center" w="40%" h="40%" ></Image>
            </Stack>  
        </Flex>
    )         
}
export default Footer