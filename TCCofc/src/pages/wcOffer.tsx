import Header from '../components/Header';
import Footer from "../components/Footer";
import { Box, Flex, Spacer, Text, Heading, Stack, Container, Input } from '@chakra-ui/react';

const wcOffer = () => {
    return (
            <Box w="100%" h="100%">
                <Header/>
    
                <Flex w='100%' h='30vh' bg='#F7F9FC' align='center' _dark={{bg:'#4f4f4f'}}>
                    <Flex mt='2%' align='center' direction='column' w='100%'>
                        <Heading color='#1976D2' as='h1' fontSize="40px">Descreva seu produto</Heading>
                    </Flex>
                </Flex>

                <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction='column' _dark={{bg:'#4f4f4f'}} pb={{base:"5vh", sm:"none"}}>
                <Stack gap="90" direction={{base: "column", sm: "row"}} >
                    <Flex direction='column' align='center' w='30vh'  h={{base:'33%' , sm:'30vh'}}>
                        <Stack spacing={3}>
                        <Input placeholder='Nome do produto' w='75vh'/>
                        <Input placeholder='Descrição' size='lg'/>
                        <Input placeholder='small size' size='sm'/>
                        <Input placeholder='medium size' size='md'/>
                        <Input placeholder='large size' size='lg'/>
                        </Stack>
                    </Flex>
                
                </Stack>
            </Flex>


                <Footer/>
            
            </Box> 
    )
}

export default wcOffer;

