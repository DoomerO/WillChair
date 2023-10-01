import { Box, Flex, Spacer, Heading, Stack, Input, Select, FormLabel, Text, Button, ButtonGroup, Textarea, Image, useToast } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderToggle from "../../components/toggles/HeaderToggle";
import colors from "../../colors/colors";
import SignAdaptable from "../../components/signs/SignAdaptable";
import axios from "axios";
import decode from "../../components/code/decoderToken";

import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

const MuletaOffer = () => {
    const toastRender = useToast();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [prodOwn, setProdOwn] = useState([]);
    const [user, setUser] = useState([]);
    const [searchOwn, setSearch] = useState(false);
    const [userToken, setToken] = useState(decode(localStorage.getItem("token")));
    const [imgShow, setShow] = useState<any>();

    const [formInputs, setInputs] = useState({
        name: "",
        desc: "",
        weight: 0,
        height: 0,
        key: "",
        type: "Auxiliares",
        photo: "",
        hasRegulator: 0,
        minHeight: 0,
        maxHeight: 0,
        maxWeight: 0,
        price: 0,
        composition: "",
        condition: "Boa",
        offerType: "Doação",
        parcelas: 0
    });

    function toast(title: string, desc: string, time?: number, type?: UseToastOptions["status"], pos?: ToastPosition, close?: boolean) {
        toastRender({
            title: title,
            description: desc,
            status: type,
            duration: time,
            position: pos,
            isClosable: close ? close : true
        })
    }

    function generateKey() {
        let bits = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        let blank = "";

        for (let i = 0; i < 10; i++) {
            let rand = Math.floor(Math.random() * bits.length + 1);
            blank = blank + bits[rand];
        }
        setInputs(prev => ({ ...prev, key: blank }));
    }

    async function getProducts() {
        await axios.get("http://localhost:3344/products/keys", {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then((res) => {
            setProducts(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function getUser() {
        await axios.get(`http://localhost:3344/users/email/${userToken.email}`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then((res) => {
            setUser(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getProductKey(key: string) {
        await axios.get(`http://localhost:3344/products/key/${key}`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then((res) => {
            setProdOwn(res.data[0]);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function postProduct() {
        if (formInputs.name != "" && formInputs.desc != "" && formInputs.offerType != "") {
            await axios.post('http://localhost:3344/products', {
                prod_weight: formInputs.weight,
                prod_height: formInputs.height,
                prod_type: "Muleta",
                prod_key: formInputs.key,
                prod_composition: formInputs.composition,
                prod_status: formInputs.condition
            }, { headers: { authorization: "Bearer " + localStorage.getItem("token") } }).then((res) => {
                setSearch(true);
            }).catch((error) => {
                console.log(error);
                if (error.response.status == 413) {
                    toast("Imagem muito Pesada", "Tente usar uma mais leve!", 3000, "error")
                }
            })
        }
        else {
            toast("Informações não preenchidas", "Preencha todas as informações necessárias", 3000, "error")
        }
    }

    async function postImage() {
        const data = new FormData();
        data.append("photo", formInputs.photo);
        await axios.put('http://localhost:3344/products/img/photo', data,
            { headers: { authorization: "Bearer " + localStorage.getItem("token"), prod_id: prodOwn.prod_id } }).catch((error) => {
                console.log(error);
            });
    }

    async function postOffer() {
        await axios.post(`http://localhost:3344/offers`, {
            ofr_name: formInputs.name,
            ofr_desc: formInputs.desc,
            ofr_value: formInputs.price,
            ofr_status: "Livre",
            ofr_type: formInputs.offerType,
            ofr_parcelas: formInputs.parcelas,
            User_user_id: user.user_id,
            Product_prod_id: prodOwn.prod_id
        }, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            toast("Oferta criada com sucesso", "Você criou sua oferta", 3000, "success")
            navigate("/")
        }).catch((error) => {
            console.log(error)
        })
    }

    async function postChild() {
        await axios.post(`http://localhost:3344/products/muleta`, {
            id: prodOwn.prod_id,
            mul_maxHeight: formInputs.maxHeight,
            mul_maxWeight: formInputs.maxWeight,
            mul_minHeight: formInputs.minHeight,
            mul_type: formInputs.type,
            mul_regulator: formInputs.hasRegulator,
        }, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
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
        if (products.length > 0) {
            for (const prod of products) {
                if (prod.prod_key == formInputs.key) generateKey();
            }
        }
    }, [products])

    useEffect(() => {
        getProductKey(formInputs.key);
    }, [searchOwn])

    useEffect(() => {
        if (searchOwn) {
            postImage();
            postChild();
            postOffer();
        }
    }, [prodOwn])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name == "weight" || e.target.name == "height" || e.target.name == "maxHeight" || e.target.name == "minHeight" || e.target.name == "maxWeight" || e.target.name == "price") {
            setInputs(prev => ({ ...prev, [e.target.name]: e.target.value.replace(",", ".") }));
        }
        else {
            setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    }

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, photo: e.target.files[0] }));
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setShow(reader.result);
        }
    }

    return (
        <Box w="100%" h="100%">
            <HeaderToggle />
            <Flex w='100%' h={{ base: "23vh", md: '20vh' }} pt={{ base: "5%", md: "3%" }} bg={colors.veryLightBlue} align='center' direction="column" justifyContent="center" _dark={{ bg: colors.veryLightBlue_Dark }}>
                <Heading color={colors.colorFontBlue} textAlign="center" as='h1' fontFamily="outfit" fontSize="35px">Descreva sua Muleta</Heading>
            </Flex>

            <Flex w='100%' bg={colors.veryLightBlue} h={{ base: "190vh", md: '173vh' }} align='center' direction='column' _dark={{ bg: colors.veryLightBlue_Dark }} pb={{ base: "5vh", md: "none" }}>

                <Stack gap="90" direction={{ base: "column", md: "row" }} >
                    <Flex direction='column' align='center' w={{ base: "90vw", md: '60vw' }} fontSize={{ base: "20px", md: "18px" }} h={{ base: '33%', md: '110vh' }}>

                        <Stack spacing={3} align="center">
                            <Input type="file" display="none" id="myfile" name="photo" accept="gif, .jpg, .jpeg, .png" onChange={handleImage} />
                            <Flex cursor="pointer" w={{ base: "30vh", md: "40vh" }} align="center" justifyContent="center" h={{ base: "30vh", md: "40vh" }} direction="column" border="2px dashed #000" _dark={{ border: "2px dashed #fff" }} _hover={{ bg: "#0001", _dark: { bg: "#fff1" } }} onClick={() => {
                                document.getElementsByName("photo")[0].click()
                            }}>{(imgShow) ? <Image w={{ base: "98%", md: "96%" }} h={{ base: "98%", md: "96%" }} objectFit="contain" src={imgShow}></Image> : <SignAdaptable msg="Escolha uma foto para aparecer aqui!" icon={<MdOutlinePhotoSizeSelectActual size="50%" />} bgType={"none"} />}</Flex>

                            <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>Título da oferta<Input type='text' fontSize={{ base: "20px", md: "18px" }} maxLength={100}
                                placeholder='Ex.: Muleta Canadense' name='name' onChange={handleChange} /></FormLabel>

                            <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>Descrição<Textarea size='lg' h="20vh" name='desc' fontSize={{ base: "20px", md: "18px" }} textAlign="left" verticalAlign="top" onChange={handleChange} /></FormLabel>

                            <Flex w='100%' h='fit-content' align='center' direction={{ base: 'column', md: 'row' }}>
                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>Tipo de Muleta<Select name='type' color="gray"
                                    fontSize={{ base: "20px", md: "18px" }} onChange={handleChange}>
                                    <option value='Auxiliares'>Muletas axilares</option>
                                    <option value='Canadenses'>{'Muletas de antebraço (ou canadenses)'}</option>
                                    <option value='Outro'>Outro</option>
                                </Select></FormLabel>
                                <Spacer />
                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>Condição do Equipamento<Select name='condition' color="gray"
                                    fontSize={{ base: "20px", md: "18px" }} onChange={handleChange} value={formInputs.condition}>
                                    <option value='Boa'>Boa</option>
                                    <option value='Rasoável'>Rasoável</option>
                                    <option value='Ruim'>Ruim</option>
                                </Select></FormLabel>
                                <Spacer />
                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>{'Peso Máximo Suportado (kg)'}<Input name='maxWeight' type="number" color="gray" fontSize={{ base: "20px", md: "18px" }} onChange={handleChange} /></FormLabel>
                            </Flex>


                            <Flex w='100%' h='fit-content' align='center' direction={{ base: 'column', md: 'row' }}>
                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>{'Peso (kg)'}<Input name='weight' type="number" color="gray" fontSize={{ base: "20px", md: "18px" }} onChange={handleChange} /></FormLabel>
                                <Spacer />
                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>{'Altura (m)'}<Input name='height' color="gray" type="number" fontSize={{ base: "20px", md: "18px" }} onChange={handleChange} /></FormLabel>
                                <Spacer />
                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>{'Composição'}<Input name='composition' color="gray" type="text" fontSize={{ base: "20px", md: "18px" }} onChange={handleChange} maxLength={20} /></FormLabel>
                            </Flex>

                            <Flex w='100%' h='fit-content' align='center' direction={{ base: 'column', md: 'row' }}>
                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>{'Possui Regulador de Altura?'}
                                    <Select color="gray" fontSize={{ base: "20px", md: "18px" }} name="hasRegulator" onChange={handleChange}>
                                        <option value={0}>Não</option>
                                        <option value={1}>Sim</option>
                                    </Select>
                                </FormLabel>
                                <Spacer />
                                <FormLabel display={(formInputs.hasRegulator == 1) ? "block" : "none"} w="100%" fontSize={{ base: "20px", md: "18px" }}>{'Altura Mínima (m)'}<Input onChange={handleChange} name='minHeight' color="gray" type="number" fontSize={{ base: "20px", md: "18px" }} /></FormLabel>
                                <Spacer />
                                <FormLabel display={(formInputs.hasRegulator == 1) ? "block" : "none"} w="100%" fontSize={{ base: "20px", md: "18px" }}>{'Altura Máxima (m)'}<Input onChange={handleChange} name='maxHeight' color="gray" type="number" fontSize={{ base: "20px", md: "18px" }} /></FormLabel>
                            </Flex>

                            <Flex w='100%' h='fit-content' align='center' direction={{ base: 'column', md: 'row' }} >
                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>Tipo de Oferta<Select name='offerType' color="gray"
                                    fontSize={{ base: "20px", md: "18px" }} onChange={handleChange} value={formInputs.offerType}>
                                    <option value='Doação'>Doação</option>
                                    <option value='Venda'>Venda</option>
                                    <option value='Aluguél'>Aluguél</option>
                                </Select></FormLabel>
                                <Spacer />
                                <FormLabel w={{ base: "100%", md: "fit-content" }} display={(formInputs.offerType != "Doação") ? "block" : "none"} fontSize={{ base: "20px", md: "18px" }}>{'Preço (R$)'}<Input onChange={handleChange} name='price' color="gray" type="number" fontSize={{ base: "20px", md: "18px" }} /></FormLabel>
                                <Spacer />
                                <FormLabel w={{ base: "100%", md: "fit-content" }} display={(formInputs.offerType == "Aluguél") ? "block" : "none"} fontSize={{ base: "20px", md: "18px" }}>{'Parcelas'}<Input onChange={handleChange} name='parcelas' color="gray" type="number" fontSize={{ base: "20px", md: "18px" }} /></FormLabel>
                            </Flex>

                        </Stack>
                        <ButtonGroup variant="outline" spacing='6' mt="5vh">
                            <Button colorScheme='blue' onClick={() => {
                                if (user.user_city) {
                                    postProduct();
                                }
                                else {
                                    toast("Perfil Incompleto!", "Complete seu perfil antes de tentar criar uma oferta!", 3000, "warning");
                                }
                            }}>Salvar</Button>
                            <Button onClick={() => { navigate("/") }}>Cancelar</Button>
                        </ButtonGroup>
                    </Flex>
                </Stack>
            </Flex>
            <Footer />
        </Box>
    )
}

export default MuletaOffer;
