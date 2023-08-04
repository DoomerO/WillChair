import Footer from "../components/Footer";
import { Box, Flex, Spacer, Text, Heading, Stack, Container, Input, Select, FormLabel,
    InputGroup, InputLeftElement, Button, ButtonGroup, Textarea, Image } from '@chakra-ui/react';
import HeaderToggle from "../components/toggles/HeaderToggle";
import colors from "../colors/colors";
import { ChangeEvent, useState } from "react";
import axios from "axios";

const wcOffer = () => {
    const [formInputs, setInputs] = useState({
        name : "",
        desc : "",
        weight : 0,
        height : 0,
        type : "",
        photo : "",
        width : 0,
        widthseat : 0,
        price : 0

    });
    const [img, setImg] = useState("");

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({...prev, [e.target.name]:e.target.value }));
    }
    
    async function postOffer() {
        await axios.post(`http://localhost:3344/offers`, {
            ofr_name : formInputs.name,
            ofr_desc : formInputs.desc,
            ofr_type : formInputs.type,
            ofr_value : formInputs.price,
            ofr_status : "Livre",
            ofr_parcelas : formInputs
        }, {headers : {
            authorization : "Bearer " + localStorage.getItem("token");
        }})
    }

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
                        <Flex direction='column' align='center' w='60vw' fontSize={{base:"20px", sm:"18px"}} h={{base:'33%' , sm:'110vh'}}>
                            <Stack spacing={3}>
                            <FormLabel fontSize={{base:"20px", sm:"18px"}}>Nome do produto<Input type='text' fontSize={{base:"20px", sm:"18px"}} 
                            placeholder='Ex.: Cadeira de Rodas 101M - CDS' name='name' onChange={handleChange}/></FormLabel>
                            <FormLabel fontSize={{base:"20px", sm:"18px"}}>Descrição<Textarea size='lg' h="20vh" name='desc' fontSize={{base:"20px", sm:"18px"}} textAlign="left" verticalAlign="top" onChange={handleChange}/></FormLabel>    
                                    
                            <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction='column' _dark={{bg:'#4f4f4f'}}>
                                <Flex direction={{base:"column", sm:"row"}} align="center">
                                        <FormLabel fontSize={{base:"20px", sm:"18px"}}>Peso<Input name='weight' color="gray" fontSize={{base:"20px", sm:"18px"}} onChange={handleChange}/></FormLabel>
                                        <FormLabel fontSize={{base:"20px", sm:"18px"}}>Altura<Input name='height' color="gray" fontSize={{base:"20px", sm:"18px"}} onChange={handleChange}/></FormLabel>

                                        <FormLabel fontSize={{base:"20px", sm:"18px"}}>Tipo de cadeira<Select name='type' color="gray"
                                        fontSize={{base:"20px", sm:"18px"}} onChange={handleChange}>
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
                                <FormLabel fontSize={{base:"20px", sm:"18px"}}>Largura da cadeira<Input onChange={handleChange} name='width' borderColor='gray' color="gray" fontSize={{base:"20px", sm:"18px"}}/></FormLabel>
                                <Spacer/>
                                <FormLabel fontSize={{base:"20px", sm:"18px"}}>Largura do assento<Input onChange={handleChange} name='widthseat' color="gray" fontSize={{base:"20px", sm:"18px"}}/></FormLabel>
                            </Flex>

                             <Image src={img}/>   
                            <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction={{base:'column' ,sm:'row'}} _dark={{bg:'#4f4f4f'}}>
                            <Input type="file" id="myfile" name="photo" accept="gif, .jpg, .jpeg, .png" onChange={handleChange}/>
                            </Flex>

                            <Stack spacing={4}>
                                <InputGroup>
                                    <InputLeftElement pointerEvents='none' color='gray.440' fontSize='0.9em' children='R$'/>
                                    <Input onChange={handleChange} fontSize={{base:"20px", sm:"18px"}} name='price' placeholder='Preço' type='number' w="98.5%" />
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
