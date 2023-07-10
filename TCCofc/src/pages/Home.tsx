import { Link } from "react-router-dom";
import Category from "../components/Category";
import Header from '../components/Header';
import Footer from "../components/Footer";
import { Box, Flex, Spacer, Text, Image, Heading, Stack, Container } from '@chakra-ui/react';
import {BsCreditCard} from "react-icons/bs";
import {BiDonateHeart} from "react-icons/bi";
import {MdWheelchairPickup} from "react-icons/md";
import "../fonts/fonts.css"

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
                <Flex align='center' direction='column' ml={{base: "none", sm: '8%'}} w={{base: "inherit", sm :'50%'}}>
                    <Heading fontFamily="outfit"  color='#2D3748' as='h1' fontSize={{base: "36px", sm: "30px"}} _dark={{color:"#0D87d8"}}>O seu sonho acessível</Heading>
                    <Heading color='#1976D2' as='h1' fontSize={{base: "36px", sm: "30px"}} >perto de você!</Heading>
                    <Text fontFamily="kdamThmor" noOfLines={2} fontSize={{base: '22px',sm:'20px'}} mt='20px' align="center">
                        Compre, negocie ou anuncie equipamentos de acessibilidade
                    </Text>
                </Flex>
                <Image src={topImage} w='50%' h='100%' objectFit='contain' display={{base: "none", sm: "inherit"}}/>
            </Flex>

            <Flex w='100%' bg='#fff' h='fit-content' align='center' direction='column' _dark={{bg:'#4f4f4f'}} pb={{base:"5vh", sm:"none"}}>
                <Heading fontFamily="outfit" as='h1' noOfLines={{base: 2, sm: 1}} color='#2D3748' mt={{base:'10%', sm:'3%'}} _dark={{color:"#0D87d8"}} fontSize={{base: "32px", sm: "34px"}} align='center' w={{base:'98vw', sm:'fit-content'}}>
                    O que você pode encontrar por aqui
                </Heading>
                <Stack mt='8%' gap="50" direction={{base: "column", sm: "row"}} >
                    <Flex direction='column' align='center' w='30vh'  h={{base:'33%' , sm:'30vh'}}>
                        <Box w='fit-content'>
                            <Container borderRadius='100%' bg='#E8F1FA' p='20px' _dark={{bg: '#28616A'}}>
                                <BsCreditCard size='8vh'/>
                            </Container>
                        </Box>
                        <Text fontFamily="outfit" align='center' noOfLines={2} fontSize={{base:'19px', sm:'15px'}}>
                            Compras ou vendas de produtos
                        </Text>
                    </Flex>
                    <Spacer />
                    <Flex direction='column' align='center' w='30vh' h={{base:'33%' , sm:'30vh'}}>
                        <Box w='fit-content'>
                            <Container borderRadius='100%' bg='#E8F1FA' p='20px' _dark={{bg: '#28616A'}}>
                                <BiDonateHeart size='8vh'/>
                            </Container>
                        </Box>
                        <Text fontFamily="outfit" align='center' noOfLines={2} fontSize={{base:'19px', sm:'15px'}}>
                            Doações de equipamentos
                        </Text>
                    </Flex>
                    <Spacer />
                    <Flex direction='column' align='center' w='30vh'  h={{base:'33%' , sm:'30vh'}}>
                        <Box w='fit-content'>
                            <Container borderRadius='100%' bg='#E8F1FA' p='20px' _dark={{bg: '#28616A'}}>
                                <MdWheelchairPickup size='8vh'/>
                            </Container>
                        </Box>
                        <Text fontFamily="outfit" align='center' noOfLines={2} fontSize={{base:'19px', sm:'15px'}}>
                            Aluguéis por preços acessíveis
                        </Text>
                    </Flex>
                </Stack>
            </Flex>

            <Flex w='100%' h='fit-content' bg='#F7F9FC' align='center' direction='column' _dark={{bg:'#484A4D'}}>
                <Box h='20%' alignContent='center' mt={{base:'10%', sm:'3%'}}>
                <Heading fontFamily="outfit" as='h2' noOfLines={{base: 2, sm: 1}} color='#1963D2' _dark={{color:'#1983D2'}} fontSize={{base: "32px", sm: "34px"}} align='center' w={{base:'98vw', sm:'fit-content'}}>
                    Confira abaixo algumas de nossas categorias
                </Heading>
                </Box>
                
                <Flex h="80%" direction='row' align='center'>
                    <Image src={bottomImage} w="30%" h='100%' objectFit='contain' display={{base: "none", sm: "inherit"}}></Image>
                    <Flex direction={{base:'column', sm :'row'}} w='60%'>
                        <Category name='Cadeira de Rodas' icon={cadeiraRodas} path="/login"/>
                        <Spacer />
                        <Category name='Muleta' icon={muleta} path="/"/>
                        <Spacer />
                        <Category name='Andador' icon={andador} path="/"/>
                        <Spacer />
                        <Category name='Bengala' icon={bengala} path="/"/>
                        <Spacer />
                        <Category name='Outros' icon={diversos} path="/"/>
                    </Flex>
                </Flex>
            </Flex>
            <Footer/>
            
        </Box> 
    )
}

export default Home;
