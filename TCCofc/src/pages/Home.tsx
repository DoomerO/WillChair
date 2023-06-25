import { Link } from "react-router-dom";
import Category from "../components/Category";
import Header from '../components/Header';
import Footer from "../components/Footer";
import { Box, Flex, Spacer, Text, Image, Heading, HStack, Container, useColorMode} from '@chakra-ui/react';
import {BsCreditCard} from "react-icons/bs";
import {BiDonateHeart} from "react-icons/bi";
import {MdWheelchairPickup} from "react-icons/md";

//images
import bottomImage from '../img/home/homeImgBottom.png';
import topImage from '../img/home/imgHomeTop.png';
import cadeiraRodas from '../img/categories/cadeira-de-rodas.png';
import muleta from '../img/categories/muleta.png';
import andador from '../img/categories/andador.png';
import bengala from '../img/categories/bengala.png';
import diversos from '../img/categories/diversidade.png';

const Home = () => {

    return (
        <Box w="100%" h="100%">
            <Header/>

            <Flex w='100%' h='70vh' bg='#F7F9FC' align='center' _dark={{bg:'#484A4D'}}>
                <Flex align='center' direction='column' ml='8%' w='50%'>
                    <Heading color='#2D3748' as='h1' fontSize="30px" _dark={{color:"#0D87d8"}}>O seu sonho acessível</Heading>
                    <Heading color='#1976D2' as='h1' fontSize="30px">perto de você!</Heading>
                    <Text noOfLines={[1, 2]} fontSize='20px' mt='20px'>
                        Compre, negocie ou anuncie equipamentos de acessibilidade
                    </Text>
                </Flex>
                <Image src={topImage} w='50%' h='100%' objectFit='contain'/>
            </Flex>

            <Flex w='100%' bg='#fff' h='60vh' align='center' direction='column' _dark={{bg:'#4f4f4f'}}>
                <Heading as='h1' noOfLines={1} color='#2D3748' mt='3%' _dark={{color:"#0D87d8"}}>
                    O que você pode encontrar por aqui
                </Heading>
                <HStack mt='8%' gap="50">
                    <Flex direction='column' align='center' w='30vh' h='30vh'>
                        <Box w='fit-content'>
                            <Container borderRadius='100%' bg='#E8F1FA' p='20px' _dark={{bg: '#28616A'}}>
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
                            <Container borderRadius='100%' bg='#E8F1FA' p='20px' _dark={{bg: '#28616A'}}>
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
                            <Container borderRadius='100%' bg='#E8F1FA' p='20px' _dark={{bg: '#28616A'}}>
                                <MdWheelchairPickup size='8vh'/>
                            </Container>
                        </Box>
                        <Text align='center' noOfLines={2}>
                            Aluguéis por preços acessíveis
                        </Text>
                    </Flex>
                </HStack>
            </Flex>

            <Flex w='100%' h='70vh' bg='#F7F9FC' align='center' direction='column' _dark={{bg:'#484A4D'}}>
                <Box h='20%' align='center' mt="3%">
                <Heading as='h2' noOfLines={1} color='#1963D2' _dark={{color:'#1983D2'}}>
                    Confira abaixo algumas de nossas categorias
                </Heading>
                </Box>
                
                <Flex h="80%" direction='row' align='center'>
                    <Image src={bottomImage} w="30%" h='100%' objectFit='contain'></Image>
                    <Flex direction='row' w='60%'>
                        <Category name='Cadeira de rodas' icon={cadeiraRodas}/>
                        <Spacer />
                        <Category name='Muleta' icon={muleta}/>
                        <Spacer />
                        <Category name='Andador' icon={andador}/>
                        <Spacer />
                        <Category name='bengala' icon={bengala}/>
                        <Spacer />
                        <Category name='outros' icon={diversos}/>
                    </Flex>
                </Flex>
            </Flex>
            <Footer/>
            
        </Box> 
    )
}

export default Home;