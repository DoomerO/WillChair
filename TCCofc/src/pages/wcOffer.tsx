import Header from '../components/Header';
import Footer from "../components/Footer";
import { Box, Flex, Spacer, Text, Heading, Stack, Container, Input } from '@chakra-ui/react';

const wcOffer = () => {
    return (
            <Box w="100%" h="100%">
                <Header/>
    
                <Flex w='100%' h='40vh' bg='#F7F9FC' align='center' _dark={{bg:'#484A4D'}}>
                    <Flex align='center' direction='column' w='100%'>
                        <Heading color='#1976D2' as='h1' fontSize="40px">Descreva seu produto</Heading>
                    </Flex>
                </Flex>

                <Flex w='100%' bg='#fff' h='fit-content' align='center' direction='column' _dark={{bg:'#4f4f4f'}} pb={{base:"5vh", sm:"none"}}>
                <Stack mt='8%' gap="50" direction={{base: "column", sm: "row"}} >
                    <Flex direction='column' align='center' w='30vh'  h={{base:'33%' , sm:'30vh'}}>
                        <Stack spacing={3}>
                        <Input placeholder='extra small size' size='xs' />
                        <Input placeholder='small size' size='sm' />
                        <Input placeholder='medium size' size='md' />
                        <Input placeholder='large size' size='lg' />
                        </Stack>
                    </Flex>
                
                </Stack>
            </Flex>


                <Footer/>
            
            </Box> 
    )
}

export default wcOffer;
