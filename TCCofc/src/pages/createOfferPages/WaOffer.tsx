import Footer from "../../components/Footer";
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
import HeaderToggle from "../../components/toggles/HeaderToggle";
import colors from "../../colors/colors";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import decode from "../../components/code/decoderToken";

const WaOffer = () => {
    const [products, setProducts] = useState([]);
    const [prodOwn, setProdOwn] = useState([]);
    const [user, setUser] = useState([]);
    const [searchOwn, setSearch] = useState(false);
    const [userToken, setToken] = useState(decode(localStorage.getItem("token")));

    const [formInputs, setInputs] = useState({
        name : "",
        desc : "",
        weight : 0,
        height : 0,
        key : "",
        type : "",
        photo : prodOwn.prod_img,
        width : 0,
        widthseat : 0,
        price : 0

    });

    function generateKey() {
        let bits = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        let blank = "";

        for (let i = 0; i < 10; i++) {
            let rand = Math.floor(Math.random() * bits.length + 1);
            blank = blank + bits[rand];
        }
        setInputs(prev => ({...prev, key : blank}));
    }

    async function getProducts() {
        await axios.get("http://localhost:3344/products/keys", {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setProducts(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function getUser() {
        await axios.get(`http://localhost:3344/users/email/${userToken.email}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setUser(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getProductKey(key : string) {
        await axios.get(`http://localhost:3344/products/key/${key}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setProdOwn(res.data);
        }).catch((error) => {
            console.log(error);
        })        
    }

    async function postProduct() {
        await axios.post('http://localhost:3344/products', {
            prod_img : formInputs.photo,
            prod_weight : formInputs.weight,
            prod_height : formInputs.height,
            prod_type : "Cadeira de Rodas",
            prod_key : formInputs.key,
        }, { headers : {authorization : "Bearer " + localStorage.getItem("token")}}).then((res) => {
            setSearch(true);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function postOffer() { 
        await axios.post(`http://localhost:3344/offers`, {
            ofr_name : formInputs.name,
            ofr_desc : formInputs.desc,
            ofr_value : formInputs.price,
            ofr_status : "Livre",
            User_user_id : user.user_id,
            Product_prod_id : prodOwn[0].prod_id
        }, {headers : {
            authorization : "Bearer " + localStorage.getItem("token")
        }}).then((res) => {

        }).catch((error) => {
            console.log(error)
        })
    }

    async function postChild() {
        await axios.post(`http://localhost:3344/products/cadeira-rodas`, {
            id : prodOwn[0].prod_id,
            cad_width : formInputs.width,
            cad_widthSeat : formInputs.widthseat,
            cad_type : formInputs.type,
        }, {headers : {
            authorization : "Bearer " + localStorage.getItem("token")
        }}).then((res) => {

        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getProducts();
        generateKey();
        getUser();
    }, []);

    useEffect(() => {
        if(products.length > 0) {
            for (const prod of products) {
                if (prod.prod_key == formInputs.key) generateKey();
            }
        }
    }, [products])

    useEffect(() => {
        if(searchOwn) getProductKey(formInputs.key);
    }, [searchOwn])

    useEffect(() => {
        if(prodOwn.length > 0){
            postOffer(); 
            postChild();
        }
    }, [prodOwn])

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({...prev, [e.target.name]:e.target.value }));
    }

    const handleImage = (e:ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setInputs(prev => ({...prev, photo: reader.result}))
        }
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

export default WaOffer;


