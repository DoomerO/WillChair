import { Box, Flex, Spacer, Text, Image, Heading, HStack, Container } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from "../components/Footer";

const About = () => {
    return (
        <Box w="100%" h="100%">
            <Header/>
            <Flex w='100%' h='70vh' bg='#F7F9FC' align='center' _dark={{bg:'#484A4D'}}>
                <Flex align='center' direction='column' w='35%' ml="34%">
                    <Heading color='#1976D2' as='h1' fontSize="40px" _dark={{color:"#0D87d8"}}>WillChair</Heading>
                    <Heading color='#2D3748' as='h1' fontSize="35px" align='center'>O sonho de fornecer para todos a 
                    possibilidade de adquirir um esquipamento de acessibilidade</Heading>
                </Flex>
            </Flex>
            <Flex w='100%' bg='#fff' h='60vh' align='center' direction='column' _dark={{bg:'#4f4f4f'}}>
                <Heading as='h1' color='#1976D2' w="38%" mt="3%" align='center' fontSize="35px" _dark={{color:"#0D87d8"}}>Afinal, 
                do que se trata o WillChair?</Heading>
            </Flex>    




            <Footer/>
        </Box>
    )
}

export default About;