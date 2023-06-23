import { Link } from "react-router-dom";
import Category from "../components/Category";
import Header from '../components/Header'
import { Box, Center, Flex, Spacer, Text, Image, Heading, HStack, Container } from '@chakra-ui/react'
import {BsCreditCard} from "react-icons/bs";
import {BiDonateHeart} from "react-icons/bi";
import {MdWheelchairPickup} from "react-icons/md";

//images
import andador from '../img/categories/andador.png';
import muleta from '../img/categories/muleta.png';
import cadeira from '../img/categories/cadeira-de-rodas.png';
import bengala from '../img/categories/bengala.png';
import diversidade from '../img/categories/diversidade.png';
import logo from '../img/home/logo.png';
import middleImage from '../img/home/imgHomeMiddle.png';
import topImage from '../img/home/imgHomeTop.png';

const Home = () => {
    return (
        <Box w="100%" h="100%">
            <Header/> 
            <Flex w='100%' h='70vh' bg='#F7F9FC' align='center'>
                <Flex align='center' direction='column' ml='8%' w='50%'>
                    <Text color='#2D3748' fontSize="30px">O seu sonho acessível</Text>
                    <Text color='#1976D2' fontSize="30px">perto de você!</Text>
                    <Text noOfLines={[1, 2]} fontSize='20px' mt='20px'>
                        Compre, negocie ou anuncie equipamentos de acessibilidade
                    </Text>
                </Flex>
                <Image src={topImage} w='50%' h='100%' objectFit='contain'/>
            </Flex>
            <Flex w='100%' bg='#fff' h='60vh' align='center' direction='column'>
                <Heading as='h1' noOfLines={1} color='#2D3748' mt='3%'>
                    O que você pode encontrar por aqui
                </Heading>
                <HStack mt='8%' gap="50">
                    <Flex direction='column' align='center' w='30vh' h='30vh'>
                        <Box w='fit-content'>
                            <Container borderRadius='100%' bg='#E8F1FA' p='20px'>
                                <BsCreditCard size='8vh'/>
                            </Container>
                        </Box>
                        <Text align='center' noOfLines={2}>
                            Compras ou vendas de produtos
                        </Text>
                    </Flex>
                    <Spacer />
                    <Flex direction='column' align='center' w='30vh' h='30vh'>
                        <Box w='fit-content'>
                            <Container borderRadius='100%' bg='#E8F1FA' p='20px'>
                                <BiDonateHeart size='8vh'/>
                            </Container>
                        </Box>
                        <Text align='center' noOfLines={2}>
                            Doações de equipamentos
                        </Text>
                    </Flex>
                    <Spacer />
                    <Flex direction='column' align='center' w='30vh' h='30vh'>
                        <Box w='fit-content'>
                            <Container borderRadius='100%' bg='#E8F1FA' p='20px'>
                                <MdWheelchairPickup size='8vh'/>
                            </Container>
                        </Box>
                        <Text align='center' noOfLines={2}>
                            Aluguéis por preços acessíveis
                        </Text>
                    </Flex>
                </HStack>
            </Flex>
        </Box> 
    )
}

export default Home;