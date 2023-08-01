import Footer from "../components/Footer";
import { Box, Flex, Spacer, Heading, Stack, Input, Select } from '@chakra-ui/react';
import { InputGroup, InputLeftElement, Button, ButtonGroup, Textarea } from '@chakra-ui/react';
import {FormControl, FormLabel, FormErrorMessage, FormHelperText} from '@chakra-ui/react';
import HeaderLoged from '../components/HeaderLoged';


const BeOffer = () => {
    return (
            <Box w="100%" h="100%">
                <HeaderLoged/>
                <FormControl>
                <Flex w='100%' h='30vh' bg='#F7F9FC' align='center' _dark={{bg:'#4f4f4f'}}>
                    <Flex mt='2%' align='center' direction='column' w='100%'>
                    <Heading color='#1976D2' as='h1' fontSize="35px">Descreva seu produto</Heading></Flex>
                </Flex>
                    
                <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction='column' _dark={{bg:'#4f4f4f'}} pb={{base:"5vh", sm:"none"}}>
                    <Stack gap="90" direction={{base: "column", sm: "row"}} >
                    <Flex direction='column' align='center' w='30vh'  h={{base:'33%' , sm:'90vh'}}>
                        <Stack spacing={3}>
                        
                        <FormLabel>Nome do produto<Input type='text' id='name' placeholder='Ex.: Cadeira de Rodas 101M - C' w='75vh'/></FormLabel>

                        <FormLabel>Descrição<Textarea size='lg' h="20vh" textAlign="left" verticalAlign="top"/></FormLabel>    
                                
                    <Flex w='100%' bg='#F7F9FC' _dark={{bg:'#4f4f4f'}}>
                        <FormLabel>Peso<Input w="23vh" color="gray"/></FormLabel>
                        <FormLabel>Altura<Input w="23vh" color="gray"/></FormLabel>
                        

                    </Flex>

                    <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction='block' _dark={{bg:'#4f4f4f'}}>
                        
                        <label><Input ml='3%' w="35vh" color="gray"/></label>
                    </Flex>

                    <Stack spacing={4}>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none' color='gray.440' fontSize='1.2em' children='$'/>
                            <Input placeholder='Preço' type='number' />
                        </InputGroup>
                    </Stack>

                    </Stack>
                        <ButtonGroup variant="outline" spacing='6' margin="5vh">
                            <Button colorScheme='blue'>Salvar</Button>
                            <Button>Cancelar</Button>
                        </ButtonGroup>
                    </Flex>
                    </Stack>
                </Flex>
                </FormControl>
            
                <Footer/>
            </Box> 
    )
}

export default BeOffer;