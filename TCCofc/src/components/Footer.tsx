import {Text, Flex, Image, HStack, SimpleGrid, Spacer, Container, Box} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import logo from '../img/home/logo.png';
import {BsWhatsapp} from 'react-icons/bs';
import {AiOutlineInstagram} from 'react-icons/ai';
import {CiFacebook} from 'react-icons/ci';
import {MdOutlineLanguage} from 'react-icons/md';
import {MdBusiness} from 'react-icons/md';

const Footer = () => {
    return (
        <Flex w="100%" h="60vh" bg='#131313' direction='column'>
            <HStack w='100%' mt='3%'>
                <Image src={logo} w='18vw' h='16vh' objectFit='contain'></Image>
                <Spacer />
                <HStack align='center' w='30vw'>
                    <SimpleGrid columns={1} spacing={5} h='20vh'>
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
                </HStack>
                <Spacer />
                <HStack>
                    <Container borderRadius='100%' bg='#4A4A4A' p='15px' _hover={{bg : '#3a3a3a'}}>
                        <Link to='/'><BsWhatsapp color='#eee' size='5vh'/></Link>
                    </Container>
                    <Container borderRadius='100%' bg='#4A4A4A' p='15px' _hover={{bg : '#3a3a3a'}}>
                        <Link to='/'><AiOutlineInstagram color='#eee' size='5vh'/></Link>
                    </Container>
                    <Container borderRadius='100%' bg='#4A4A4A' p='15px' _hover={{bg : '#3a3a3a'}}>
                        <Link to='/'><CiFacebook color='#eee' size='5vh'/></Link>
                    </Container>
                </HStack>
                <Spacer />
            </HStack>
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