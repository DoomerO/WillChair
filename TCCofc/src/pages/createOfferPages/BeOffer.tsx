import Footer from "../../components/Footer";
import { Box, Flex, Spacer, Heading, Stack, Input, Select } from '@chakra-ui/react';
import { InputGroup, InputLeftElement, Button, ButtonGroup, Textarea } from '@chakra-ui/react';
import {FormControl, FormLabel, FormErrorMessage, FormHelperText} from '@chakra-ui/react';
import HeaderToggle from "../../components/toggles/HeaderToggle";
import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";
import decode from "../../components/decoderToken";


const BeOffer = () => {
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
        if(prodOwn.length > 0) postOffer(); postChild();
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