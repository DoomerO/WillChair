import Footer from "../components/Footer";
import { Box, Flex, Spacer, Text, Heading, Stack, Container, Input, Select, FormLabel,
    InputGroup, InputLeftElement, Button, ButtonGroup, Textarea } from '@chakra-ui/react';
import HeaderToggle from "../components/toggles/HeaderToggle";
import colors from "../colors/colors";

const wcOffer = () => {
    return (
            <Box w="100%" h="100%">
                    <HeaderToggle/>
        
                    <Flex w='100%' h='30vh' bg='#F7F9FC' align='center' _dark={{bg:'#4f4f4f'}}>
                        <Flex mt='2%' align='center' direction='column' w='100%'>
                            <Heading color='#1976D2' as='h1' fontSize="35px">Descreva seu produto</Heading>
                        </Flex>
                    </Flex>

                    <Flex w='100%' bg={colors.veryLightBlue} h='fit-content' align='center' direction='column' _dark={{bg:colors.bgWhite_Dark}} pb={{base:"5vh", sm:"none"}}>
                        
                        <Stack gap="90" direction={{base: "column", sm: "row"}} >
                        <Flex direction='column' align='center' w='60vw' fontSize={{base:"20px", sm:"18px"}} h={{base:'33%' , sm:'90vh'}}>
                            <Stack spacing={3}>
                            <FormLabel fontSize={{base:"20px", sm:"18px"}}>Nome do produto<Input type='text' fontSize={{base:"20px", sm:"18px"}} 
                            placeholder='Ex.: Cadeira de Rodas 101M - CDS'/></FormLabel>
                            <FormLabel fontSize={{base:"20px", sm:"18px"}}>Descrição<Textarea size='lg' h="20vh" fontSize={{base:"20px", sm:"18px"}} textAlign="left" verticalAlign="top"/></FormLabel>    
                                    
                            <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction='column' _dark={{bg:'#4f4f4f'}}>
                                <Flex direction={{base:"column", sm:"row"}} align="center">
                                        <FormLabel fontSize={{base:"20px", sm:"18px"}}>Peso<Input color="gray" fontSize={{base:"20px", sm:"18px"}}/></FormLabel>
                                        <FormLabel fontSize={{base:"20px", sm:"18px"}}>Altura<Input color="gray" fontSize={{base:"20px", sm:"18px"}}/></FormLabel>

                                        <FormLabel fontSize={{base:"20px", sm:"18px"}}>Tipo de cadeira<Select color="gray"
                                        fontSize={{base:"20px", sm:"18px"}}>
                                                <option value='option1'>Cadeira manual simples</option>
                                                <option value='option2'>Cadeira dobrável em X</option>
                                                <option value='option3'>Cadeira monobloco</option>
                                                <option value='option4'>Cadeira motorizada</option>
                                                <option value='option5'>Cadeira com elevação automática</option>
                                                <option value='option6'>Cadeira de rodas reclinável</option>
                                                <option value='option7'>Cadeira de rodas para banho</option>
                                                <option value='option7'>Outro</option>
                                    </Select></FormLabel>
                                </Flex>
                            </Flex>

                            <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction={{base:'column' ,sm:'row'}} _dark={{bg:'#4f4f4f'}}>
                                <FormLabel fontSize={{base:"20px", sm:"18px"}}>Largura da cadeira<Input borderColor='gray' color="gray" fontSize={{base:"20px", sm:"18px"}}/></FormLabel>
                                <Spacer/>
                                <FormLabel fontSize={{base:"20px", sm:"18px"}}>Largura do assento<Input color="gray" fontSize={{base:"20px", sm:"18px"}}/></FormLabel>
                            </Flex>

                            <Stack spacing={4}>
                                <InputGroup>
                                    <InputLeftElement pointerEvents='none' color='gray.440' fontSize='1.2em' children='$'/>
                                    <Input fontSize={{base:"20px", sm:"18px"}} placeholder='Preço' type='number' w="98.5%" />
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

