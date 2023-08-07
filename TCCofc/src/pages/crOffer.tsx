import Footer from "../components/Footer";
import { Box, Flex, Spacer, Heading, Stack, Input, Select, FormLabel, InputGroup, InputLeftElement, Button, ButtonGroup, Textarea, Image } from '@chakra-ui/react';
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
            authorization : "Bearer " + localStorage.getItem("token")
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
                            placeholder='Ex.: Muleta Canadense TakeCare' name='name' onChange={handleChange}/></FormLabel>
                            <FormLabel fontSize={{base:"20px", sm:"18px"}}>Descrição<Textarea size='lg' h="20vh" name='desc' fontSize={{base:"20px", sm:"18px"}} textAlign="left" verticalAlign="top" placeholder="...." onChange={handleChange} required/></FormLabel>    
                                    
                            <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction='column' _dark={{bg:'#4f4f4f'}}>
                                <Flex direction={{base:"column", sm:"row"}} align="center">
                                        <FormLabel fontSize={{base:"20px", sm:"18px"}}>Dimenções<Input name='weight' color="gray" fontSize={{base:"20px", sm:"18px"}} padding="0 100px" onChange={handleChange}/></FormLabel>

                                        <FormLabel fontSize={{base:"20px", sm:"18px"}}>Tipo de Muleta<Select name='type' color="gray"
                                        fontSize={{base:"20px", sm:"18px"}} onChange={handleChange}>
                                                <option value='option1'>Muletas axilares</option>
                                                <option value='option2'>Muletas de antebraço (ou canadenses)</option>
                                    </Select></FormLabel>
                                </Flex>
                            </Flex>

                            <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction={{base:'column' ,sm:'row'}} _dark={{bg:'#4f4f4f'}}>
                                <FormLabel fontSize={{base:"20px", sm:"18px"}}>Material da muleta<Input onChange={handleChange} name='width' borderColor='gray' color="gray" fontSize={{base:"20px", sm:"18px"}} placeholder="Ex: Alumínio"/></FormLabel>
                                <Spacer/>
                                <FormLabel fontSize={{base:"20px", sm:"18px"}}>Peso suportado<Input onChange={handleChange} name='widthseat' color="gray" fontSize={{base:"20px", sm:"18px"}}/></FormLabel>
                            </Flex>

                            <Image src={img}/>   
                            <FormLabel fontSize={{base:"20px", sm:"18px"}}>Foto do produto
                                <Input type="file" id="myfile" name="photo" accept="gif, .jpg, .jpeg, .png" border="hidden" padding="1vh" onChange={handleChange}/>
                            </FormLabel>
                            

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
