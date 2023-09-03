import { Link } from "react-router-dom";
import Category from "../../components/Category";
import Footer from "../../components/Footer";
import HeaderToggle from "../../components/toggles/HeaderToggle";
import { Box, Flex, Spacer, Text, Image, Heading, Stack, Container } from '@chakra-ui/react';

//images
import cadeiraRodas from '../../img/categories/cadeira-de-rodas.png';
import muleta from '../../img/categories/muleta.png';
import andador from '../../img/categories/andador.png';
import bengala from '../../img/categories/bengala.png';
import diversos from '../../img/categories/diversidade.png';

const CreateOffer = () => {

    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>

            <Flex w='100%' h='55vh' bg='#F7F9FC' align='center' _dark={{bg:'#484A4D'}}>
                <Flex align='center' direction='column' w='100%'>
                    <Heading color='#000' as='h1' fontSize="55px" _dark={{color:"#fff"}}>Faça aqui a sua oferta!</Heading>
                    <Heading color='#646E73' fontSize="25px" textAlign='center' w={{base: "98%", md:"37%"}} _dark={{color:"#8f9bbc"}}>Selecione a categoria 
                    em que seu equipamento melhor se encaixa</Heading>
                </Flex>
            </Flex>

                <Flex h="80%" direction='row' bg='#F7F9FC' align='center' _dark={{bg:'#484A4D'}}>
                    <Flex direction={{base:'column', md :'row'}} w='80%' ml='10%' mb='5%'>
                        <Category name='Cadeira de Rodas' icon={cadeiraRodas} path="/create-offer/cadeira-rodas"/>
                        <Spacer />
                        <Category name='Muleta' icon={muleta} path="/create-offer/muleta"/>
                        <Spacer />
                        <Category name='Andador' icon={andador} path="/create-offer/andador"/>
                        <Spacer />
                        <Category name='Bengala' icon={bengala} path="/create-offer/bengala"/>
                        <Spacer />
                        <Category name='Outros' icon={diversos} path="/create-offer/other"/>
                    </Flex>
            </Flex>
            <Footer/>
            
        </Box> 
    )
}

export default CreateOffer;
