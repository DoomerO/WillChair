import { Box, Flex, Spacer, Text, Image, Heading, HStack, Container } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from "../components/Footer";
import {BsPeopleFill} from "react-icons/bs";
import {HiOutlineDesktopComputer} from "react-icons/hi";
import {BsGearFill} from "react-icons/bs";

const About = () => {
    return (
        <Box w="100%" h="100%">
            <Header/>
            <Flex w='100%' h='70vh' bg='#F7F9FC' align='center' _dark={{bg:'#484A4D'}}>
                <Flex align='center' direction='column' w='100%'>
                    <Heading color='#1976D2' as='h1' fontSize="40px" _dark={{color:"#0D87d8"}}>WillChair</Heading>
                    <Heading color='#2D3748' as='h2' fontSize="35px" textAlign='center' noOfLines={4} w="37%">O sonho de fornecer para todos a 
                    possibilidade de adquirir um esquipamento de acessibilidade</Heading>
                </Flex>
            </Flex>

            <Flex w='100%' bg='#fff' h='fit-content' align='center' direction='column' _dark={{bg:'#4f4f4f'}}>
            <Heading as='h1' color='#1976D2' w="38%" mt="3%" align='center' fontSize="40px" _dark={{color:"#0D87d8"}}>Afinal, 
                do que se trata o WillChair?</Heading>
                <HStack mt='2%' gap="50" direction={{base: "column", sm: "row"}} >
                    
                    <Flex direction='column' align='center' w='35vh' h='55vh'>
                        <Box w='fit-content'>
                            <Container p='20px'>
                                <BsPeopleFill size='7vh'/>
                            </Container>
                        </Box>
                        <Text align='center'>
                        Somos uma equipe de progamadores que queriam solucionar um problema social através de 
                        nosso trabalho. Nos esforçamos para criar um sistema que ajudasse aos outros.
                        </Text>
                    </Flex>
                    <Spacer/>
                    
                    <Flex direction='column' align='center' w='35vh' h='55vh'>
                        <Box w='fit-content'>
                            <Container p='20px'>
                                <BsGearFill size='7vh'/>
                            </Container>
                        </Box>
                        <Text align='center'>
                        Basta se cadastrar no WillChair para usá-lo. Assim você realiza o login, você pode navegar 
                        por inúmeras ofertas de equipamentos de acessibilidade e até mesmo fazer sua própria oferta.
                        </Text>
                    </Flex>
                    <Spacer/>
                    
                    <Flex direction='column' align='center' w='38vh' h='55vh'>
                        <Box w='fit-content'>
                            <Container p='20px'>
                                <HiOutlineDesktopComputer size='7vh'/>
                            </Container>
                        </Box>
                        <Text align='center'>
                        Nossa aplicação permite que quem precisa de itens de acessibilidade ache ofertantes  
                        destes produtos. Além disso, o WillChair apresenta três tipos de oferta: doação, venda e 
                        emprésticmo, se adequando situações financeiras diferentes 
                        </Text>
                    </Flex>
                </HStack>
            </Flex>

            <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction='column' _dark={{bg:'#4f4f4f'}}>
            <Heading as='h1' color='#1976D2' w="38%" mt="3%" align='center' fontSize="40px"
             _dark={{color:"#0D87d8"}}>Nossa história</Heading>
                <HStack mt='2%' gap="50" direction={{base: "column", sm: "row"}} >
                    
                    <Flex direction='column' w='72vh' h='50vh'>
                        <Text align='left' fontSize='18px'>
                        A ideia de desenvolver uma aplicação web que facilitaria a aquisição de
                        itens de acessibilidade surgiu da necessidade. Nós, da equipe, nos depararmos com uma 
                        situação em que uma conhecida precisava de uma cadeira de rodas rapidamente e não encontrava 
                        em lugar nenhum. Ela buscou por dias e não encontrou ninguém que vendesse ou doasse o produto. 
                        </Text>
                    </Flex>
                    <Spacer/>
                    
                    <Flex direction='column' w='65vh' h='50vh'>
                        <Text align='left' fontSize='18px'>
                        Pensamos juntos em soluções para tal problema e o que surgiu foi o WillChair: uma aplicação 
                        web que permitiria que o usuário buscando um produto se comunicasse com um ofertante dele. 
                        Além disso, o WillChair aceitaria três tipos de ofertas: doação, aluguél e venda, para que 
                        todos consigam suprir sua necessidade de acordo com as circunstâncias em que se encontram. 
                        </Text>
                    </Flex>
                </HStack>
            </Flex>




            <Footer/>
        </Box>
    )
}

export default About;
