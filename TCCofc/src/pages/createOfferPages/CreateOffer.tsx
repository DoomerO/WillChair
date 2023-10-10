import Category from "../../components/Category";
import Footer from "../../components/Footer";
import HeaderToggle from "../../components/toggles/HeaderToggle";
import { Box, Flex, Spacer, Heading, useColorModeValue } from '@chakra-ui/react';

//images
import cadeiraRodas from '../../img/categories/cadeira-de-rodas.png';
import muleta from '../../img/categories/muleta.png';
import andador from '../../img/categories/andador.png';
import bengala from '../../img/categories/bengala.png';
import diversos from '../../img/categories/diversidade.png';
import caderiaRodas_Dark from '../../img/categories/cadeira-de-rodas claro.png';
import muleta_Dark from '../../img/categories/muleta claro.png';
import andador_Dark from '../../img/categories/andador claro.png';
import bengala_Dark from '../../img/categories/bengala claro.png';
import diversos_Dark from '../../img/categories/diversidade claro.png';
import colors from "../../colors/colors";

const CreateOffer = () => {
    const colorMode = useColorModeValue(true, false);

    return (
        <Box w="100%" h="100%">
            <HeaderToggle />

            <Flex w='100%' h='55vh' bg={colors.veryLightBlue} align='center' _dark={{ bg: colors.veryLightBlue_Dark }}>
                <Flex align='center' direction='column' w='100%'>
                    <Heading color='#000' as='h1' textAlign="center" fontSize="55px" _dark={{ color: "#fff" }}>Faça aqui a sua oferta!</Heading>
                    <Heading color='#646E73' fontSize="25px" textAlign='center' w={{ base: "98%", md: "37%" }} _dark={{ color: "#8f9bbc" }}>Selecione a categoria
                        em que seu equipamento melhor se encaixa</Heading>
                </Flex>
            </Flex>

            <Flex h="80%" direction='row' bg={colors.veryLightBlue} align='center' _dark={{ bg: colors.veryLightBlue_Dark }}>
                <Flex direction={{ base: 'column', md: 'row' }} w={{base:"100%", md:'80%'}} ml={{base: 0 ,md:'10%'}} mb='5%' justifyContent="center" align="center">
                    <Category name='Cadeira de Rodas' icon={(colorMode) ? cadeiraRodas : caderiaRodas_Dark} path="/create-offer/cadeira-rodas" />
                    <Spacer />
                    <Category name='Muleta' icon={(colorMode) ? muleta : muleta_Dark} path="/create-offer/muleta" />
                    <Spacer />
                    <Category name='Andador' icon={(colorMode) ? andador : andador_Dark} path="/create-offer/andador" />
                    <Spacer />
                    <Category name='Bengala' icon={(colorMode) ? bengala : bengala_Dark} path="/create-offer/bengala" />
                    <Spacer />
                    <Category name='Outros' icon={(colorMode) ? diversos : diversos_Dark} path="/create-offer/other" />
                </Flex>
            </Flex>
            <Footer />

        </Box>
    )
}

export default CreateOffer;
