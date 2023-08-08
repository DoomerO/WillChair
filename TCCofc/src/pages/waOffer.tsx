import Footer from "../components/Footer";
import { Box, Flex, Spacer, Heading, Stack, Input, Select, FormLabel, InputGroup, InputLeftElement, Button, ButtonGroup, 
    Textarea, Image, Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor, } from '@chakra-ui/react';
import HeaderToggle from "../components/toggles/HeaderToggle";
import colors from "../colors/colors";
import { ChangeEvent, useState } from "react";
import axios from "axios";

const waOffer = () => {
    const [formInputs, setInputs] = useState({
        name : "",
        desc : "",
        weight : 0,
        height : 0,
        type : "",
        photo : [],
        width : 0,
        widthseat : 0,
        price : 0

    });

    const handleImage = (e:ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setInputs(prev => ({...prev, photo: reader.result}))
        }
    }

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
                            <Heading color='#1976D2' as='h1' fontSize="35px">Descreva sua Bengala</Heading>
                        </Flex>
                    </Flex>

                    <Flex w='100%' bg={colors.veryLightBlue} h='fit-content' align='center' direction='column' _dark={{bg:colors.bgWhite_Dark}} pb={{base:"5vh", sm:"none"}}>
                        
                        <Stack gap="90" direction={{base: "column", sm: "row"}} >
                        <Flex direction='column' align='center' w='60vw' fontSize={{base:"20px", sm:"18px"}} h={{base:'33%' , sm:'110vh'}}>
                            <Stack spacing={3}>
                            <FormLabel fontSize={{base:"20px", sm:"18px"}}>Nome do produto<Input type='text' fontSize={{base:"20px", sm:"18px"}} 
                            placeholder='Ex.: Bengala 4 Pontas D9 Dellamed' name='name' onChange={handleChange}/></FormLabel>
                            <FormLabel fontSize={{base:"20px", sm:"18px"}}>Descrição<Textarea size='lg' h="20vh" name='desc' fontSize={{base:"20px", sm:"18px"}} textAlign="left" verticalAlign="top" placeholder="...." onChange={handleChange} required/></FormLabel>    
                                    
                            <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction='column' _dark={{bg:'#4f4f4f'}}>
                                <Flex direction={{base:"column", sm:"row"}} align="center">
                                        <FormLabel fontSize={{base:"20px", sm:"18px"}}>Dimenções<Input name='weight' color="gray" fontSize={{base:"20px", sm:"18px"}} padding="0 100px" onChange={handleChange}/></FormLabel>

                                        <FormLabel fontSize={{base:"20px", sm:"18px"}}>Modelos<Select name='type' color="gray"
                                        fontSize={{base:"20px", sm:"18px"}} onChange={handleChange}>
                                                <option value='option1'>Bengala 4 pontas</option>
                                                <option value='option2'>Bengala Bastão tipo T</option>
                                                <option value='option3'>Bengala Dobrável</option>
                                    </Select></FormLabel>
                                </Flex>
                            </Flex>

                            <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction={{base:'column' ,sm:'row'}} _dark={{bg:'#4f4f4f'}}>
                                <FormLabel fontSize={{base:"20px", sm:"18px"}}>Material da bengala<Input onChange={handleChange} name='width' borderColor='gray' color="gray" fontSize={{base:"20px", sm:"18px"}} placeholder="Ex: Alumínio"/></FormLabel>
                                <Spacer/>

                                <FormLabel fontSize={{base:"20px", sm:"18px"}} _hover={{
                                
                                }}>Cores
                                <Popover placement='top-start'>
                                <PopoverTrigger><Button colorScheme='twitter' ml='65%' variant='link'>Saiba mais</Button></PopoverTrigger><PopoverContent w='50vw' bg='blue.800' color='white'>
                                <PopoverHeader fontWeight='semibold'>O que as cores sinalizam?</PopoverHeader>
                                <PopoverArrow /><PopoverCloseButton />
                                <PopoverBody >Branca: pessoa cega, perca total da visão. <br/><br/>
                                Verde: pessoas com baixa visão. Enxergam com maior dificuldade, mas possuem visão parcial.<br/><br/>
                                Branca e Vermelha: pessoa surda e cega. Normalmente pode ser sinalizado apenas com um adesivo vermelho sobre a bengala branca.
                                </PopoverBody>
                                </PopoverContent>
                                </Popover> 
                                <Input onChange={handleChange} name='widthseat' color="gray" fontSize={{base:"20px", sm:"18px"}}/></FormLabel>
                            </Flex>

                            <Image src={String.fromCharCode(...new Uint8Array(formInputs.photo))}/>   
                            <FormLabel fontSize={{base:"20px", sm:"18px"}}>Foto do produto
                                <Input type="file" id="myfile" name="photo" accept="gif, .jpg, .jpeg, .png" border="hidden" padding="1vh" onChange={handleImage}/>
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

export default waOffer;
