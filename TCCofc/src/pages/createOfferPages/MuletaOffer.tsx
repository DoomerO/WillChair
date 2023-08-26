import Footer from "../../components/Footer";
import { Box, Flex, Spacer, Heading, Stack, Input, Select, FormLabel, Text, Button, ButtonGroup, Textarea, Image, useToast } from '@chakra-ui/react';
import HeaderToggle from "../../components/toggles/HeaderToggle";
import colors from "../../colors/colors";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import decode from "../../components/code/decoderToken";
import { useNavigate } from "react-router-dom";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import SignAdaptable from "../../components/signs/SignAdaptable";

const MuletaOffer = () => {
    const toast = useToast();
    const navigate = useNavigate();
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
        type : "Auxiliares",
        photo : prodOwn.prod_img,
        hasRegulator: 0,
        minHeight : 0,
        maxHeight : 0,
        maxWeight : 0,
        price : 0,
        composition : "",
        condition : "Boa",
        offerType : "Doação",
        parcelas : 0
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
            prod_composition : formInputs.composition,
            prod_status : formInputs.condition
        }, { headers : {authorization : "Bearer " + localStorage.getItem("token")}}).then((res) => {
            setSearch(true);
        }).catch((error) => {
            console.log(error);
            if(error.response.status == 413) {
                toast({
                    title: 'Imagem muito pesada!',
                    description: "Tente usar uma imagem mais leve.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            }
        })
    }

    async function postOffer() { 
        await axios.post(`http://localhost:3344/offers`, {
            ofr_name : formInputs.name,
            ofr_desc : formInputs.desc,
            ofr_value : formInputs.price,
            ofr_status : "Livre",
            ofr_type : formInputs.offerType,
            ofr_parcelas : formInputs.parcelas,
            User_user_id : user.user_id,
            Product_prod_id : prodOwn[0].prod_id
        }, {headers : {
            authorization : "Bearer " + localStorage.getItem("token")
        }}).then((res) => {
            toast({
                position: 'bottom',
                render: () => (
                    <Stack bg="green.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", sm:"20px"}}>Produto criado com sucesso!</Text>
                        <Button variant="outline" color="#fff" _hover={{bg:"#fff2"}} onClick={() => {navigate("/"); navigate(0)}}>Ir para home</Button>
                    </Stack>
                )
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    async function postChild() {
        await axios.post(`http://localhost:3344/products/muleta`, {
            id : prodOwn[0].prod_id,
            mul_maxHeight : formInputs.maxHeight,
            mul_maxWeight : formInputs.maxWeight,
            mul_minHeight : formInputs.minHeight,
            mul_type : formInputs.type,
            mul_regulator :  formInputs.hasRegulator,
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
        if(e.target.name == "weight" ||e.target.name == "height" ||e.target.name == "maxHeight" ||e.target.name == "minHeight" || e.target.name == "maxWeight" || e.target.name == "price") {
            setInputs(prev => ({...prev, [e.target.name]: e.target.value.replace(",", ".") }));
        }
        else {
            setInputs(prev => ({...prev, [e.target.name]:e.target.value }));
        }
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
                <Flex w='100%' h={{base:"23vh", sm:'20vh'}} pt={{base:"5%", sm:"3%"}} bg={colors.veryLightBlue} align='center' direction="column" justifyContent="center" _dark={{bg: colors.veryLightBlue_Dark}}>
                    <Heading color={colors.colorFontBlue} textAlign="center" as='h1' fontFamily="outfit" fontSize="35px">Descreva sua Muleta</Heading>
                </Flex>

                <Flex w='100%' bg={colors.veryLightBlue} h={{base:"190vh", sm:'173vh'}} align='center' direction='column' _dark={{bg:colors.veryLightBlue_Dark}} pb={{base:"5vh", sm:"none"}}>

                    <Stack gap="90" direction={{base: "column", sm: "row"}} >
                    <Flex direction='column' align='center' w={{base:"90vw" ,sm:'60vw'}} fontSize={{base:"20px", sm:"18px"}} h={{base:'33%' , sm:'110vh'}}>
                        
                        <Stack spacing={3} align="center">
                            <Flex w={{base:"30vh" ,sm:"40vh"}} align="center" justifyContent="center" h={{base:"30vh" ,sm:"40vh"}} direction="column" border="2px dashed #000" _dark={{border : "2px dashed #fff"}}>{(formInputs.photo) ? <Image w={{base:"98%", sm:"96%"}} h={{base:"98%", sm:"96%"}} objectFit="contain" src={formInputs.photo}></Image> : <SignAdaptable msg="Escolha uma foto para aparecer aqui!" icon={<MdOutlinePhotoSizeSelectActual size="50%"/>} bgType={"none"}/>}</Flex>    

                            <FormLabel w="100%" fontSize={{base:"20px", sm:"18px"}}>Imagem<Input type="file" id="myfile" name="photo" accept="gif, .jpg, .jpeg, .png" onChange={handleImage}/></FormLabel>
                            
                            <FormLabel w="100%" fontSize={{base:"20px", sm:"18px"}}>Título da oferta<Input type='text' fontSize={{base:"20px", sm:"18px"}} 
                            placeholder='Ex.: Muleta Canadense' name='name' onChange={handleChange}/></FormLabel>
                            
                            <FormLabel w="100%" fontSize={{base:"20px", sm:"18px"}}>Descrição<Textarea size='lg' h="20vh" name='desc' fontSize={{base:"20px", sm:"18px"}} textAlign="left" verticalAlign="top" onChange={handleChange}/></FormLabel>    

                            <Flex w='100%' h='fit-content' align='center' direction={{base:'column' ,sm:'row'}}>
                                <FormLabel w="100%" fontSize={{base:"20px", sm:"18px"}}>Tipo de Muleta<Select name='type' color="gray"
                                    fontSize={{base:"20px", sm:"18px"}} onChange={handleChange}>
                                            <option value='Auxiliares'>Muletas axilares</option>
                                            <option value='Canadenses'>{'Muletas de antebraço (ou canadenses)'}</option>
                                </Select></FormLabel>
                                <Spacer/>
                                <FormLabel w="100%" fontSize={{base:"20px", sm:"18px"}}>Condição do Equipamento<Select name='condition' color="gray"
                                                fontSize={{base:"20px", sm:"18px"}} onChange={handleChange} value={formInputs.condition}>
                                                    <option value='Boa'>Boa</option>
                                                    <option value='Rasoável'>Rasoável</option>
                                                    <option value='Ruim'>Ruim</option>                                        
                                </Select></FormLabel>
                                <Spacer/>
                                <FormLabel w="100%" fontSize={{base:"20px", sm:"18px"}}>{'Peso Máximo Suportado (kg)'}<Input name='maxWeight' type="number" color="gray" fontSize={{base:"20px", sm:"18px"}} onChange={handleChange}/></FormLabel>
                            </Flex>
                            
                            
                            <Flex w='100%' h='fit-content' align='center' direction={{base:'column' ,sm:'row'}}>
                                <FormLabel w="100%" fontSize={{base:"20px", sm:"18px"}}>{'Peso (kg)'}<Input name='weight' type="number" color="gray" fontSize={{base:"20px", sm:"18px"}} onChange={handleChange}/></FormLabel>
                                <Spacer/>
                                <FormLabel w="100%" fontSize={{base:"20px", sm:"18px"}}>{'Altura (m)'}<Input name='height' color="gray" type="number" fontSize={{base:"20px", sm:"18px"}} onChange={handleChange}/></FormLabel>
                                <Spacer/>
                                <FormLabel w="100%" fontSize={{base:"20px", sm:"18px"}}>{'Composição'}<Input name='composition' color="gray" type="text" fontSize={{base:"20px", sm:"18px"}} onChange={handleChange}/></FormLabel>
                            </Flex>

                            <Flex w='100%' h='fit-content' align='center' direction={{base:'column' ,sm:'row'}}>
                                <FormLabel w="100%" fontSize={{base:"20px", sm:"18px"}}>{'Possui Regulador de Altura?'}
                                    <Select color="gray" fontSize={{base:"20px", sm:"18px"}} name="hasRegulator" onChange={handleChange}>
                                        <option value={0}>Não</option>
                                        <option value={1}>Sim</option>
                                    </Select>
                                </FormLabel>
                                <Spacer/>
                                <FormLabel display={(formInputs.hasRegulator == 1) ? "block" : "none"} w="100%" fontSize={{base:"20px", sm:"18px"}}>{'Altura Mínima (m)'}<Input onChange={handleChange} name='minHeight' color="gray" type="number" fontSize={{base:"20px", sm:"18px"}}/></FormLabel>
                                <Spacer/>
                                <FormLabel display={(formInputs.hasRegulator == 1) ? "block" : "none"} w="100%" fontSize={{base:"20px", sm:"18px"}}>{'Altura Máxima (m)'}<Input onChange={handleChange} name='maxHeight' color="gray" type="number" fontSize={{base:"20px", sm:"18px"}}/></FormLabel>
                            </Flex>

                            <Flex w='100%' h='fit-content' align='center' direction={{base:'column' ,sm:'row'}} >
                                <FormLabel w="100%" fontSize={{base:"20px", sm:"18px"}}>Tipo de Oferta<Select name='offerType' color="gray"
                                                fontSize={{base:"20px", sm:"18px"}} onChange={handleChange} value={formInputs.offerType}>
                                                    <option value='Doação'>Doação</option>
                                                    <option value='Venda'>Venda</option>
                                                    <option value='Aluguél'>Aluguél</option>                              
                                </Select></FormLabel>
                                <Spacer/>
                                <FormLabel w={{base:"100%", sm:"fit-content"}} display={(formInputs.offerType != "Doação") ? "block" : "none"} fontSize={{base:"20px", sm:"18px"}}>{'Preço (R$)'}<Input onChange={handleChange} name='price' color="gray" type="number" fontSize={{base:"20px", sm:"18px"}}/></FormLabel>
                                <Spacer/> 
                                <FormLabel w={{base:"100%", sm:"fit-content"}} display={(formInputs.offerType == "Aluguél") ? "block" : "none"} fontSize={{base:"20px", sm:"18px"}}>{'Parcelas'}<Input onChange={handleChange} name='parcelas' color="gray" type="number" fontSize={{base:"20px", sm:"18px"}}/></FormLabel>  
                            </Flex>

                        </Stack>
                        <ButtonGroup variant="outline" spacing='6' mt="5vh">
                            <Button colorScheme='blue' onClick={() => {if(user.user_city) {
                                    postProduct();
                                }
                                else {
                                    toast({
                                        title: 'Perfil incompleto!',
                                        description: "Termine de configurar o seu perfil antes de postar uma oferta!",
                                        status: 'error',
                                        duration: 9000,
                                        isClosable: true,
                                    })
                                }}}>Salvar</Button>
                            <Button onClick={() => {navigate("/")}}>Cancelar</Button>
                        </ButtonGroup>
                    </Flex>
                    </Stack>
                </Flex>
            <Footer/>
        </Box> 
    )
}

export default MuletaOffer;
