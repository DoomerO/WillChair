import { Flex, Heading, Stack, FormLabel, Input, Text, Textarea, Select, Image, Spacer, ButtonGroup, Button, Box, useToast, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, UseToastOptions, ToastPosition } from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md/index";

import Footer from "../../components/Footer";
import SignAdaptable from "../../components/signs/SignAdaptable";
import HeaderToggle from "../../components/toggles/HeaderToggle";

import colors from "../../colors/colors";
import axios from "axios";
import decode from "../../components/code/decoderToken";
import serverUrl from "../../components/code/serverUrl";
import { FormInputsProps, User, UserToken, ProductProps } from "../../components/code/interfaces";
import Loading from "../../components/toggles/Loading";

const BengalaOffer = () => {

    const toastRender = useToast();
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [prodOwn, setProdOwn] = useState<ProductProps>({});
    const [user, setUser] = useState<User>({});
    const [searchOwn, setSearch] = useState(false);
    const [userToken, setToken] = useState<UserToken>({});
    const [imgShow, setShow] = useState<any>();
    const [loading, isLoading] = useState(true);

    const [formInputs, setInputs] = useState<FormInputsProps>({
        name: "",
        desc: "",
        weight: 0,
        height: 0,
        key: "",
        type: "Simples",
        photo: "",
        hasRegulator: 0,
        minHeight: 0,
        color: "",
        maxHeight: 0,
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
            let rand = Math.floor(Math.random() * bits.length);
            blank = blank + bits[rand];
        }
        setInputs(prev => ({ ...prev, key: blank }));
    }

    async function getProducts() {
        await axios.get(`${serverUrl}/products/keys`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then((res) => {
            setProducts(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function getUser() {
        await axios.get(`${serverUrl}/users/email/${userToken.email}`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then((res) => {
            setUser(res.data);
            isLoading(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getProductKey(key: string) {
        await axios.get(`${serverUrl}/products/key/${key}`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then((res) => {
            setProdOwn(res.data[0]);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function postProduct() {
        if (formInputs.name != "" && formInputs.desc != "" && formInputs.offerType != "") {
            await axios.post(`${serverUrl}/products`, {
                prod_weight: formInputs.weight,
                prod_height: formInputs.height,
                prod_type: "Bengala",
                prod_key: formInputs.key,
                prod_composition: formInputs.composition,
                prod_status: formInputs.condition
            }, { headers: { authorization: "Bearer " + localStorage.getItem("token") } }).then(() => {
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
        await axios.put(`${serverUrl}/products/img/photo`, data,
            { headers: { authorization: "Bearer " + localStorage.getItem("token"), prod_id: prodOwn.prod_id } }).catch((error) => {
                console.log(error);
            });
    }

    async function postOffer() {
        await axios.post(`${serverUrl}/offers`, {
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
        }).then(() => {
            toast("Oferta criada com sucesso", "Você criou sua oferta", 3000, "success")
            navigate("/")
        }).catch((error) => {
            console.log(error)
        })
    }

    async function postChild() {
        await axios.post(`${serverUrl}/products/bengala`, {
            id: prodOwn.prod_id,
            ben_regulator: formInputs.hasRegulator,
            ben_minHeight: formInputs.minHeight,
            ben_maxHeight: formInputs.maxHeight,
            ben_color: formInputs.color,
            ben_type: formInputs.type
        }, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        const test = localStorage.getItem("token");
        if (test) {
            const token = decode(test);
            setToken(token);
        }
    }, [])

    useEffect(() => {
        if (userToken.email) {
            getProducts();
            generateKey();
            getUser();
        }
    }, [userToken]);

    useEffect(() => {
        if (products.length > 0) {
            for (const prod of products) {
                if (prod.prod_key == formInputs.key) generateKey();
            }
        }
    }, [products])

    useEffect(() => {
        if(searchOwn) getProductKey(formInputs.key ?? "");
    }, [searchOwn])

    useEffect(() => {
        if (prodOwn.prod_id) {
            postImage();
            postChild();
            postOffer();
        }
    }, [prodOwn])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name != "name") e.target.value = e.target.value.replace(",", ".");
        
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.validity.patternMismatch) { return }
        if ((e.target.name == "weight" || e.target.name == "parcelas" || e.target.name == "width" || e.target.name == "height" || e.target.name == "maxHeight" || e.target.name == "minHeight" || e.target.name == "length" || e.target.name == "price") && e.target.value[0] == "0") { e.target.value = e.target.value.replace("0", "") }
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleChangeArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.validity.patternMismatch) { return }
        if ((e.target.name == "weight" || e.target.name == "parcelas" || e.target.name == "width" || e.target.name == "height" || e.target.name == "maxHeight" || e.target.name == "minHeight" || e.target.name == "length" || e.target.name == "price") && e.target.value[0] == "0") { e.target.value = e.target.value.replace("0", "") }
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            setInputs(prev => ({ ...prev, photo: selectedFile ?? "none" }));
            let reader = new FileReader();
            reader.readAsDataURL(selectedFile ?? "none");
            reader.onload = () => {
                setShow(reader.result);
            }
        }
    }

    return (
        (loading) ? <Loading/> : <Box w="100%" h="100%">
            <HeaderToggle />
            <Flex w='100%' h={{ base: "23vh", md: '20vh' }} pt={{ base: "5vh", md: "3%" }} bg={colors.veryLightBlue} align='center' direction="column" justifyContent="center" _dark={{ bg: colors.veryLightBlue_Dark }}>
                <Heading color={colors.colorFontBlue} textAlign="center" as='h1' fontFamily="outfit" fontSize="35px">Descreva sua Bengala</Heading>
            </Flex>

            <Flex w='100%' bg={colors.veryLightBlue} h={{ base: "195vh", md: '173vh' }} align='center' direction='column' _dark={{ bg: colors.veryLightBlue_Dark }} pb={{ base: "5vh", md: "none" }}>

                <Stack gap="90" direction={{ base: "column", md: "row" }} >
                    <Flex direction='column' align='center' w={{ base: "90vw", md: '60vw' }} fontSize={{ base: "20px", md: "18px" }} h={{ base: '33%', md: '110vh' }}>

                        <Stack spacing={3} align="center">
                            <Input type="file" id="myfile" display="none" name="photo" accept="gif, .jpg, .jpeg, .png" onChange={handleImage} />
                            <Flex cursor="pointer" w={{ base: "30vh", md: "40vh" }} align="center" justifyContent="center" h={{ base: "30vh", md: "40vh" }} direction="column" border="2px dashed #000" _dark={{ border: "2px dashed #fff" }} _hover={{ bg: "#0001", _dark: { bg: "#fff1" } }} onClick={() => {
                                document.getElementsByName("photo")[0].click()
                            }}>{(imgShow) ? <Image w={{ base: "98%", md: "96%" }} h={{ base: "98%", md: "96%" }} objectFit="contain" src={imgShow}></Image> : <SignAdaptable msg="Escolha uma foto para aparecer aqui!" icon={<MdOutlinePhotoSizeSelectActual size="50%" />} bgType={"none"} />}</Flex>

                            <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>Título da oferta<Input type='text' fontSize={{ base: "17px", md: "18px" }} maxLength={100}
                                placeholder='Ex.: Bengala de 4 pontas' name='name' onChange={handleChange} /></FormLabel>

                            <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>Descrição<Textarea size='lg' h="20vh" name='desc' fontSize={{ base: "17px", md: "18px" }} textAlign="left" verticalAlign="top" onChange={handleChangeArea} resize="none" /></FormLabel>

                            <Flex w='100%' h='fit-content' align='center' direction={{ base: 'column', md: 'row' }}>

                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>Modelos<Select name='type' color="gray" fontSize={{ base: "17px", md: "18px" }} onChange={handleChangeSelect}>
                                    <option value="Simples">Bengala Simples</option>
                                    <option value='4 pontas'>Bengala 4 pontas</option>
                                    <option value='Tipo T'>Bengala Bastão tipo T</option>
                                    <option value='Dobrável'>Bengala Dobrável</option>
                                    <option value='Outro'>Outro</option>
                                </Select></FormLabel>
                                <Spacer />
                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>Condição do Equipamento<Select name='condition' color="gray"
                                    fontSize={{ base: "17px", md: "18px" }} onChange={handleChangeSelect} value={formInputs.condition}>
                                    <option value='Boa'>Boa</option>
                                    <option value='Rasoável'>Rasoável</option>
                                    <option value='Ruim'>Ruim</option>
                                </Select></FormLabel>

                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>Cores
                                    <Popover placement='top-start'>
                                        <PopoverTrigger><Input onChange={handleChange} name='color' color="gray" fontSize={{ base: "17px", md: "18px" }} /></PopoverTrigger>
                                        <PopoverContent w={{ base: "100vw", md: '50vw' }} bg={colors.bgWhite} _dark={{ bg: colors.bgWhite_Dark, border: "2px solid #fff" }} border="2px solid #000">
                                            <PopoverHeader bg={colors.colorFontBlue} color="#fff" fontWeight='semibold' borderBottom="2px solid #000" _dark={{ borderBottom: "2px solid #fff" }}>
                                                <Flex direction="row" align="center">
                                                    <Box borderRadius="100%" w="1px" h="1px" p="1.5%" bg="#fff" mr="1.5%" />
                                                    O que as cores sinalizam?
                                                </Flex>
                                            </PopoverHeader>
                                            <PopoverArrow bg={colors.bgWhite} borderBottom="2px solid #000" borderRight="2px solid #000" _dark={{ borderBottom: "2px solid #fff", borderRight: "2px solid #fff" }} /><PopoverCloseButton color="#fff" />
                                            <PopoverBody >
                                                <Flex direction="column" align="center">
                                                    <Text bg="#fff" h="fit-content" color="#000" p="1%" m="1" borderRadius="10px">Branca</Text><Text textAlign="justify">{"Pessoa completamente cega, indica perca total da visão."}</Text>
                                                </Flex>
                                                <Flex direction="column" align="center" mt="3%" mb="3%">
                                                    <Text bg="green.300" h="fit-content" color="#fff" p="1%" m="1" borderRadius="10px">Verde</Text><Text w="70%" textAlign="justify">{"Pessoas com baixa visão. Enxergam com maior dificuldade, mas possuem visão parcial."}</Text>
                                                </Flex>
                                                <Flex direction="column" align="center" mb="3%">
                                                    <Flex direction="row" w="50vw" justifyContent="center">
                                                        <Text bg="red.300" h="fit-content" pt="1%" pb="1%" borderLeftRadius="10px" pl="1%" mt="1" mb="1" ml="1">Branc</Text>
                                                        <Text bg="white" color="#000" pt="1%" pb="1%" mt="1" mb="1">a e Ver</Text>
                                                        <Text bg="red.300" pt="1%" pb="1%" pr="1%" h="fit-content" borderRightRadius="10px" mt="1" mb="1" mr="1">merlha</Text>
                                                    </Flex>
                                                    <Text textAlign="justify" w="70%">{"Pessoa surda e cega. Normalmente pode ser sinalizado apenas com um adesivo vermelho sobre a bengala branca."}</Text>
                                                </Flex>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </FormLabel>

                            </Flex>


                            <Flex w='100%' h='fit-content' align='center' direction={{ base: 'column', md: 'row' }}>
                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>{'Peso (kg)'}<Input name='weight' type="number" color="gray" fontSize={{ base: "17px", md: "18px" }} onChange={handleChange} pattern='[0-9]{1,3}([.][0-9]{0,2})?'/></FormLabel>
                                <Spacer />
                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>{'Altura (m)'}<Input name='height' color="gray" type="number" fontSize={{ base: "17px", md: "18px" }} onChange={handleChange} pattern='[0-9]{1,3}([.][0-9]{0,2})?'/></FormLabel>
                                <Spacer />
                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>{'Composição'}<Input name='composition' color="gray" type="text" fontSize={{ base: "17px", md: "18px" }} onChange={handleChange} maxLength={20} /></FormLabel>
                            </Flex>

                            <Flex w='100%' h='fit-content' align='center' direction={{ base: 'column', md: 'row' }}>
                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>{'Possui Regulador de Altura?'}
                                    <Select color="gray" fontSize={{ base: "17px", md: "18px" }} name="hasRegulator" onChange={handleChangeSelect}>
                                        <option value={0}>Não</option>
                                        <option value={1}>Sim</option>
                                    </Select></FormLabel>
                                <Spacer />
                                <FormLabel display={(formInputs.hasRegulator == 1) ? "block" : "none"} w="100%" fontSize={{ base: "17px", md: "18px" }}>{'Altura Mínima (m)'}<Input onChange={handleChange} name='minHeight' color="gray" type="number" pattern='[0-9]{1,3}([.][0-9]{0,2})?' fontSize={{ base: "20px", md: "18px" }} /></FormLabel>
                                <Spacer />
                                <FormLabel display={(formInputs.hasRegulator == 1) ? "block" : "none"} w="100%" fontSize={{ base: "17px", md: "18px" }}>{'Altura Máxima (m)'}<Input onChange={handleChange} name='maxHeight' color="gray" type="number" pattern='[0-9]{1,3}([.][0-9]{0,2})?' fontSize={{ base: "20px", md: "18px" }} /></FormLabel>
                            </Flex>

                            <Flex w='100%' h='fit-content' align='center' direction={{ base: 'column', md: 'row' }} >
                                <FormLabel w="100%" fontSize={{ base: "20px", md: "18px" }}>Tipo de Oferta<Select name='offerType' color="gray"
                                    fontSize={{ base: "17px", md: "18px" }} onChange={handleChangeSelect} value={formInputs.offerType}>
                                    <option value='Doação'>Doação</option>
                                    <option value='Venda'>Venda</option>
                                    <option value='Aluguél'>Aluguél</option>
                                </Select></FormLabel>
                                <Spacer />
                                <FormLabel w={{ base: "100%", md: "fit-content" }} display={(formInputs.offerType != "Doação") ? "block" : "none"} fontSize={{ base: "17px", md: "18px" }}>{'Preço (R$)'}<Input onChange={handleChange} name='price' color="gray" type="number" pattern='[0-9]{1,3}([.][0-9]{0,2})?' fontSize={{ base: "20px", md: "18px" }} /></FormLabel>
                                <Spacer />
                                <FormLabel w={{ base: "100%", md: "fit-content" }} display={(formInputs.offerType == "Aluguél") ? "block" : "none"} fontSize={{ base: "17px", md: "18px" }}>{'Parcelas'}<Input onChange={handleChange} name='parcelas' color="gray" type="number" fontSize={{ base: "20px", md: "18px" }} /></FormLabel>
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

export default BengalaOffer;