import Header from '../components/Header';
import Footer from "../components/Footer";
import { Box, Flex, Spacer, Text, Heading, Stack, Container, Input } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { InputGroup, InputLeftElement, InputRightElement} from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react'

const wcOffer = () => {
    return (
            <Box w="100%" h="100%">
                    <Header/>
        
                    <Flex w='100%' h='30vh' bg='#F7F9FC' align='center' _dark={{bg:'#4f4f4f'}}>
                        <Flex mt='2%' align='center' direction='column' w='100%'>
                            <Heading color='#1976D2' as='h1' fontSize="35px">Descreva seu produto</Heading>
                        </Flex>
                    </Flex>

                    <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction='column' _dark={{bg:'#4f4f4f'}} pb={{base:"5vh", sm:"none"}}>
                    <Stack gap="90" direction={{base: "column", sm: "row"}} >
                        <Flex direction='column' align='center' w='30vh'  h={{base:'33%' , sm:'60vh'}}>
                            <Stack spacing={3}>
                                <Input placeholder='Nome do produto' w='75vh'/>
                                <Input placeholder='Descrição' size='lg' h="20vh" textAlign="left" verticalAlign="top"/>                        
                                <Select placeholder='Peso' w="20vh" color="gray">
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                </Select>

                                <Stack spacing={4}>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            color='gray.440'
                                            fontSize='1.2em'
                                            children='$'
                                        />
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


                <Footer/>
            
            </Box> 
    )
}

export default wcOffer;

