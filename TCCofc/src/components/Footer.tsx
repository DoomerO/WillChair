import {Text, Flex, Image, Stack, SimpleGrid, Spacer, Container, HStack} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import logo from '../img/home/logo.png';
import {BsWhatsapp} from 'react-icons/bs';
import {AiOutlineInstagram} from 'react-icons/ai';
import {CiFacebook} from 'react-icons/ci';
import {MdOutlineLanguage} from 'react-icons/md';
import {MdBusiness} from 'react-icons/md';

const Footer = () => {
    return (
        <Flex w="100%" h="fit-content" bg='#131313' direction='column'>
            <Stack w='100%' mt='3%' direction={{base:'column', sm:'row'}}>
                <Image src={logo} w={{base:'20vh', sm:'18vw'}} h='16vh' objectFit='contain'></Image>
                <Spacer />
                <Stack align='center' w='30vw' direction={{base:'column', sm:'row'}}>
                    <SimpleGrid columns={1} spacing={{base: 2, sm :5}} h='20vh'>
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
                <Stack direction={{base:"column", sm:"row"}} w='fit-content' m={{base: "5%", sm:'none'}}>
                    <Container borderRadius='100%' bg='#4A4A4A' p='15px' _hover={{bg : '#3a3a3a'}}>
                        <Link to='/'><BsWhatsapp color='#eee' size='5vh'/></Link>
                    </Container>
                    <Container borderRadius='100%' bg='#4A4A4A' p='15px' _hover={{bg : '#3a3a3a'}}>
                        <Link to='/'><AiOutlineInstagram color='#eee' size='5vh'/></Link>
                    </Container>
                    <Container borderRadius='100%' bg='#4A4A4A' p='15px' _hover={{bg : '#3a3a3a'}}>
                        <Link to='/'><CiFacebook color='#eee' size='5vh'/></Link>
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