import { Box, Flex, Spacer, Text, Heading, Stack, Container } from '@chakra-ui/react';
import HeaderToggle from '../components/toggles/HeaderToggle';
import Footer from "../components/Footer";
import {BsPeopleFill} from "react-icons/bs";
import {HiOutlineDesktopComputer} from "react-icons/hi";
import {BsGearFill} from "react-icons/bs";
import colors from '../colors/colors';

const About = () => {
    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>

            <Flex w='100%' h='70vh' bg={colors.veryLightBlue} align='center' _dark={{bg:colors.veryLightBlue_Dark}}>
                <Flex align='center' direction='column' w='100%'>
                    <Heading color='#1976D2' as='h1' fontSize="40px">WillChair</Heading>
                    <Heading color='#2D3748' as='h2' fontSize="35px" textAlign='center' noOfLines={{base: 6, md: 4}} w={{base: "98%", md:"37%"}} _dark={{color:"#8f9bbc"}}>O sonho de fornecer para todos a possibilidade de adquirir um esquipamento de acessibilidade!</Heading>
                </Flex>
            </Flex>

            <Flex w='100%' bg={colors.bgWhite} h='fit-content' align='center' direction='column' _dark={{bg:colors.bgWhite_Dark}} pb='5vh'>
            <Heading as='h1' color='#1976D2' w={{base:"100%",md:"38%"}} mt="3%" textAlign='center' fontSize="40px" _dark={{color:"#0D87d8"}}>Afinal, do que se trata o WillChair?</Heading>
                <Stack mt='3%' gap="50" direction={{base: "column", md: "row"}} >
                    
                    <Flex direction='column' align='center' w='35vh' h={{base:'fit-content' ,md:'55vh'}}>
                        <Box w='fit-content'>
                            <Container p='20px'>
                                <BsPeopleFill size='7vh'/>
                            </Container>
                        </Box>
                        <Text align='center' textAlign='justify' fontSize={{base: '19px', md: '16px'}}>
                        Somos uma equipe de progamadores que queriam solucionar um problema social através de 
                        nosso trabalho. Nos esforçamos para criar um sistema que ajudasse aos outros.
                        </Text>
                    </Flex>
                    <Spacer/>
                    
                    <Flex direction='column' align='center' w='35vh' h={{base:'fit-content' ,md:'55vh'}}>
                        <Box w='fit-content'>
                            <Container p='20px'>
                                <BsGearFill size='7vh'/>
                            </Container>
                        </Box>
                        <Text align='center'  textAlign='justify' fontSize={{base: '19px', md: '16px'}}>
                        Basta se cadastrar no WillChair para usá-lo. Assim você realiza o login, você pode navegar 
                        por inúmeras ofertas de equipamentos de acessibilidade e até mesmo fazer sua própria oferta.
                        </Text>
                    </Flex>
                    <Spacer/>
                    
                    <Flex direction='column' align='center' w='35vh' h={{base:'fit-content' ,md:'55vh'}}>
                        <Box w='fit-content'>
                            <Container p='20px'>
                                <HiOutlineDesktopComputer size='7vh'/>
                            </Container>
                        </Box>
                        <Text align='center' textAlign='justify' fontSize={{base: '19px', md: '16px'}}>
                        Nossa aplicação permite que quem precisa de itens de acessibilidade ache ofertantes  
                        destes produtos. Além disso, o WillChair apresenta três tipos de ofertas: doação, venda e 
                        empréstimo, se adequando situações financeiras diferentes.
                        </Text>
                    </Flex>
                </Stack>
            </Flex>

            <Flex w='100%' bg={colors.veryLightBlue} h='fit-content' align='center' direction='column' _dark={{bg:colors.veryLightBlue_Dark}} pb={{base:'5vh',md:'none'}}>
            <Heading as='h1' color='#1976D2' w={{base:"100%" ,md:"38%"}} mt="3%" textAlign='center' fontSize="40px"_dark={{color:"#0D87d8"}}>Nossa história</Heading>
                <Stack mt='3%' gap="50" direction={{base: "column", md: "row"}} align='center'>
                    
                    <Flex direction='column' w={{base:'80vw', md:'72vh'}} h={{base:'fit-content' , md:'50vh'}}>
                        <Text fontSize={{base:'19px', md:'18px'}} textAlign='justify'>
                        A ideia de desenvolver uma aplicação web que facilitaria a aquisição de
                        itens de acessibilidade surgiu da necessidade. Nós, da equipe, nos deparamos com uma 
                        situação em que uma conhecida precisava de uma cadeira de rodas rapidamente e não encontrava 
                        em lugar nenhum. Ela buscou por dias e não encontrou ninguém que vendesse ou doasse o equipamento. 
                        </Text>
                    </Flex>
                    <Spacer/>
                    
                    <Flex direction='column' w={{base:'80vw', md:'65vh'}} h={{base:'fit-content' , md:'50vh'}}>
                        <Text fontSize={{base:'19px', md:'18px'}}  textAlign='justify'>
                        Pensamos juntos em soluções para tal problema e o que surgiu foi o WillChair: uma aplicação 
                        web que permitiria que o usuário buscando um equipamento se comunicasse com um ofertante dele. 
                        Além disso, o WillChair aceitaria três tipos de ofertas: doação, aluguél e venda, para que 
                        todos consigam suprir sua necessidade de acordo com as circunstâncias em que se encontram. 
                        </Text>
                    </Flex>
                </Stack>
            </Flex>

            <Footer/>
        </Box>
    )
}

export default About;
