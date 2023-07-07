import Header from '../components/Header';
import Footer from "../components/Footer";
import { Box, Flex, Spacer, Text, Image, Heading, Stack, Container, Input } from '@chakra-ui/react';

const wcOffer = () => {
    return (
            <Box w="100%" h="100%">
                <Header/>
    
                <Flex w='100%' h='40vh' bg='#F7F9FC' align='center' _dark={{bg:'#484A4D'}}>
                    <Flex align='center' direction='column' w='100%'>
                        <Heading color='#1976D2' as='h1' fontSize="40px">Descreva seu produto</Heading>
                    </Flex>
                </Flex>

                <Flex w='100%' h='70vh' bg='#F7F9FC' align='center' _dark={{bg:'#484A4D'}}>
                <Stack spacing={3}>
                <Input placeholder='Basic usage' />
                <Input placeholder='small size' size='sm' />
                <Input placeholder='medium size' size='md' />
                <Input placeholder='large size' size='lg' />
                </Stack>
                
                </Flex>



                <Footer/>
            
            </Box> 
    )
}

export default wcOffer;