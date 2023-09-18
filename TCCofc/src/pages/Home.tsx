
import Category from "../components/Category";
import HeaderToggle from "../components/toggles/HeaderToggle";
import Footer from "../components/Footer";
import { Box, Flex, Spacer, Text, Image, Heading, Stack, Container, useColorModeValue } from '@chakra-ui/react';
import {BsCreditCard} from "react-icons/bs";
import {BiDonateHeart} from "react-icons/bi";
import {MdWheelchairPickup} from "react-icons/md";
import "../fonts/fonts.css"
import {tiltXY, reCenter} from "../components/code/tilt"
//images
import bottomImage from '../img/home/homeImgBottom.png';
import topImage from '../img/home/imgHomeTop.png';
import cadeiraRodas from '../img/categories/cadeira-de-rodas.png';
import muleta from '../img/categories/muleta.png';
import andador from '../img/categories/andador.png';
import bengala from '../img/categories/bengala.png';
import diversos from '../img/categories/diversidade.png';
import caderiaRodas_Dark from '../img/categories/cadeira-de-rodas claro.png';
import muleta_Dark from '../img/categories/muleta claro.png';
import andador_Dark from '../img/categories/andador claro.png';
import colors from "../colors/colors";

const Home = () => {
    const colorMode = useColorModeValue(true, false);

    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>

            <Flex w='100%' h='70vh' bg={colors.veryLightBlue} align='center' _dark={{bg:colors.veryLightBlue_Dark}}>
                <Flex align='center' direction='column' ml={{base: "none", md: '8%'}} w={{base: "inherit", md :'50%'}}>
                    <Heading fontFamily="outfit"  color='#2D3748' as='h1' fontSize={{base: "36px", md: "30px"}} _dark={{color:"#8f9bbc"}}>O seu sonho acessível</Heading>
                    <Heading color='#1976D2' as='h1' fontSize={{base: "36px", md: "30px"}} >perto de você!</Heading>
                    <Text fontFamily="atkinson" noOfLines={2} fontSize={{base: '22px',md:'20px'}} mt='20px' align="center">
                        Compre, negocie ou anuncie equipamentos de acessibilidade
                    </Text>
                </Flex>
                <Image src={topImage} w='50%' h='100%' objectFit='contain' display={{base: "none", md: "inherit"}}/>
            </Flex>

            <Flex w='100%' bg={colors.bgWhite} h='fit-content' align='center' direction='column' _dark={{bg:colors.bgWhite_Dark}} pb={{base:"5vh", md:"none"}}>
                <Heading fontFamily="outfit" as='h1' noOfLines={{base: 2, md: 1}} color='#2D3748' mt={{base:'10%', md:'3%'}} _dark={{color:"#0D87d8"}} fontSize={{base: "32px", md: "34px"}} w={{base:'98vw', md:'fit-content'}}>
                    O que você pode encontrar por aqui
                </Heading>
                <Stack mt='8%' gap="50" direction={{base: "column", md: "row"}} >
                    <Flex direction='column' align='center' w='30vh'  h={{base:'33%' , md:'30vh'}}>
                        <Box w='fit-content' pos="relative" onMouseMove={(e) => {tiltXY(e, 0.5, 0)}} onMouseLeave={(e) => {reCenter(e)}}>
                            <Container borderRadius='100%' bg='#E8F1FA' p='20px' _dark={{bg: '#28616A'}} pointerEvents="none">
                                <BsCreditCard size='8vh'/>
                            </Container>
                        </Box>
                        <Text fontFamily="outfit" align='center' noOfLines={2} fontSize={{base:'19px', md:'17px'}}>
                            Compras ou vendas de produtos
                        </Text>
                    </Flex>
                    <Spacer />
                    <Flex direction='column' align='center' w='30vh' h={{base:'33%' , md:'30vh'}}>
                        <Box w='fit-content' pos="relative" onMouseMove={(e) => {tiltXY(e, 0.5, 0)}} onMouseLeave={(e) => {reCenter(e)}}>
                            <Container borderRadius='100%' bg='#E8F1FA' p='20px' _dark={{bg: '#28616A'}} pointerEvents="none">
                                <BiDonateHeart size='8vh'/>
                            </Container>
                        </Box>
                        <Text fontFamily="outfit" align='center' noOfLines={2} fontSize={{base:'19px', md:'17px'}}>
                            Doações de equipamentos
                        </Text>
                    </Flex>
                    <Spacer />
                    <Flex direction='column' align='center' w='30vh'  h={{base:'33%' , md:'30vh'}}>
                        <Box w='fit-content' pos="relative" onMouseMove={(e) => {tiltXY(e, 0.5, 0)}} onMouseLeave={(e) => {reCenter(e)}}>
                            <Container borderRadius='100%' bg='#E8F1FA' p='20px' _dark={{bg: '#28616A'}} pointerEvents="none">
                                <MdWheelchairPickup size='8vh'/>
                            </Container>
                        </Box>
                        <Text fontFamily="outfit" align='center' noOfLines={2} fontSize={{base:'19px', md:'17px'}}>
                            Aluguéis por preços acessíveis
                        </Text>
                    </Flex>
                </Stack>
            </Flex>

            <Flex w='100%' h='fit-content' bg={colors.veryLightBlue} align='center' direction='column' _dark={{bg:colors.veryLightBlue_Dark}}>
                <Box h='20%' alignContent='center' mt={{base:'10%', md:'3%'}}>
                <Heading fontFamily="outfit" as='h2' noOfLines={{base: 2, md: 1}} color='#1963D2' _dark={{color:'#1983D2'}} fontSize={{base: "32px", md: "34px"}} w={{base:'98vw', md:'fit-content'}}>
                    Confira abaixo algumas de nossas categorias
                </Heading>
                </Box>
                
                <Flex h="80%" direction='row' align='center'>
                    <Image src={bottomImage} w="30%" h='100%' objectFit='contain' display={{base: "none", md: "inherit"}}></Image>
                    <Flex direction={{base:'column', md :'row'}} w='60%'>
                        <Category name='Cadeira de Rodas' icon={(colorMode) ? cadeiraRodas : caderiaRodas_Dark} path="/search/prod_type/Cadeira de Rodas"/>
                        <Spacer />
                        <Category name='Muleta' icon={(colorMode) ? muleta : muleta_Dark} path="/search/prod_type/Muleta"/>
                        <Spacer />
                        <Category name='Andador' icon={(colorMode) ? andador : andador_Dark} path="/search/prod_type/Andador"/>
                        <Spacer />
                        <Category name='Bengala' icon={bengala} path="/search/prod_type/Bengala"/>
                        <Spacer />
                        <Category name='Outros' icon={diversos} path="/search/prod_type/others"/>
                    </Flex>
                </Flex>
            </Flex>
            <Footer/>
        </Box> 
    )
}

export default Home;
