import {Text, Flex, Image, Stack, SimpleGrid, Spacer, Container} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import logo from '../img/home/logo.png';
import {BsWhatsapp} from 'react-icons/bs';
import {AiOutlineInstagram} from 'react-icons/ai';
import {CiFacebook} from 'react-icons/ci';
import {MdOutlineLanguage} from 'react-icons/md';
import {MdBusiness} from 'react-icons/md';
import colors from '../colors/colors';

const Footer = () => {
    return (
        <Flex w="100%" h="fit-content" bg={colors.footerBg} direction='column'>
            <Stack w='100%' mt='3%' direction={{base:'column', md:'row'}}>
                <Image src={logo} w={{base:'20vh', md:'18vw'}} h='16vh' objectFit='contain'></Image>
                <Spacer />
                <Stack align='center' w='30vw' direction={{base:'column', md:'row'}}>
                    <SimpleGrid columns={1} spacing={{base: 2, md :5}} h='20vh'>
                        <Text color='#BFBFBF' fontSize='20px'>Empresa</Text>
                        <Text color='#fff' _hover={{color: '#ddd'}}><Link to='/'>Sobre</Link></Text>
                        <Text color='#fff' _hover={{color: '#ddd'}}><Link to='/'>Marca</Link></Text>
                    </SimpleGrid>
                    <Spacer />
                    <SimpleGrid columns={1} spacing={5} h='20vh'>
                        <Text color='#BFBFBF' fontSize='20px'>Links Úteis</Text>
                    </SimpleGrid>
                    <Spacer />
                    <SimpleGrid columns={1} spacing={5} h='20vh'>
                        <Text color='#BFBFBF' fontSize='20px'>Contatos</Text>
                    </SimpleGrid>
                </Stack>
                <Spacer />
                <Stack direction={{base:"column", md:"row"}} w='fit-content' m={{base: "5%", md:'none'}}>
                    <Container borderRadius='100%' bg='#4A4A4A' p='15px' _hover={{bg : '#3a3a3a'}}>
                        <a href='https://web.whatsapp.com/'><BsWhatsapp color='#eee' size='5vh'/></a>
                    </Container>
                    <Container borderRadius='100%' bg='#4A4A4A' p='15px' _hover={{bg : '#3a3a3a'}}>
                        <a href='https://instagram.com/grupo_willchair?igshid=MzRIODBiNWFIZA=='><AiOutlineInstagram color='#eee' size='5vh'/></a>
                    </Container>
                    <Container borderRadius='100%' bg='#4A4A4A' p='15px' _hover={{bg : '#3a3a3a'}}>
                        <a href='https://www.facebook.com/profile.php?id=100093288588328&mibextid=/ZbWKwL'><CiFacebook color='#eee' size='5vh'/></a>
                    </Container>
                </Stack>
                <Spacer />
            </Stack>
            <Spacer />
            <Flex align='center' h='20vh' direction='row' ml='3%'>
                <Flex direction='column' h='8vh'>
                    <Flex><MdOutlineLanguage color='#BFBFBF' size='20px'/><Text color='#BFBFBF' fontSize='15px'>Português Brasil</Text></Flex>
                    <Spacer />
                    <Flex><MdBusiness color='#BFBFBF' size='20px'/><Text color='#BFBFBF' fontSize='15px'>Willchair 2023</Text></Flex>
                </Flex>
                
            </Flex>
        </Flex>
    )
}

export default Footer
