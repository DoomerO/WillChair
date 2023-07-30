
import Footer from "../components/Footer";
import { Box, Flex, Spacer, Text, Heading, Stack, Container, Input, Select } from '@chakra-ui/react';
import { InputGroup, InputLeftElement, InputRightElement, Button, ButtonGroup, Textarea } from '@chakra-ui/react';
import HeaderLoged from '../components/HeaderLoged';

const wcOffer = () => {
    return (
            <Box w="100%" h="100%">
                    <HeaderLoged/>
        
                    <Flex w='100%' h='30vh' bg='#F7F9FC' align='center' _dark={{bg:'#4f4f4f'}}>
                    <Flex mt='2%' align='center' direction='column' w='100%'>
                        <Heading color='#1976D2' as='h1' fontSize="35px">Descreva seu produto</Heading>
                    </Flex>
                    </Flex>

                    <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction='column' _dark={{bg:'#4f4f4f'}} pb={{base:"5vh", sm:"none"}}>
                    <Stack gap="90" direction={{base: "column", sm: "row"}} >
                    <Flex direction='column' align='center' w='30vh'  h={{base:'33%' , sm:'90vh'}}>
                        <Stack spacing={3}>
                        <label>Nome do produto<Input type='text' id='name' 
                        placeholder='Ex.: Cadeira de Rodas 101M - CDS' w='75vh'/></label>
                        <label>Descrição<Textarea size='lg' h="20vh" textAlign="left" verticalAlign="top"/></label>    
                                
                    <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction='block' _dark={{bg:'#4f4f4f'}}>
                        <label>Peso<Input w="23vh" color="gray"/></label>
                        <label>Altura<Input ml='3%' w="21vh" color="gray"/></label>

                        <label>Tipo de cadeira<Select w="27vh" ml='3%' color="gray">
                                <option value='option1'>Cadeira manual simples</option>
                                <option value='option2'>Cadeira dobrável em X</option>
                                <option value='option3'>Cadeira monobloco</option>
                                <option value='option4'>Cadeira motorizada</option>
                                <option value='option5'>Cadeira com elevação automática</option>
                                <option value='option6'>Cadeira de rodas reclinável</option>
                                <option value='option7'>Cadeira de rodas para banho</option>
                                <option value='option7'>Outro</option>
                    </Select></label>
                    </Flex>

                    <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction='block' _dark={{bg:'#4f4f4f'}}>
                        <label>Largura da cadeira<Input w="37vh" color="gray"/></label>
                        <label>Largura do assento<Input ml='3%' w="35vh" color="gray"/></label>
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


                <Footer/>
            
            </Box> 
    )
}

export default wcOffer;
