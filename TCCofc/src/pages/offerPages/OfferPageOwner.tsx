import { Box, Flex, Avatar, Heading, Image, Stack, Text, SimpleGrid, Spacer, Divider, Input, Textarea, ButtonGroup, Button, useToast, Select, InputGroup, InputLeftAddon, useDisclosure, UseToastOptions, ToastPosition } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import HeaderToggle from "../../components/toggles/HeaderToggle";
import Footer from "../../components/Footer";
import colors from "../../colors/colors";
import ProdInfoTableUpdt from "../../components/ProdInfoTableUpdt";
import SignNotFound from "../../components/signs/SignNotFound";
import ChatBox from "../../components/chats/ChatBox";
import "../../fonts/fonts.css";

import { BsFillStarFill } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineContactSupport, MdOutlinePhotoSizeSelectActual, MdOutlineReportProblem } from "react-icons/md";
import Avaliation from "../../components/Avaliation";
import dateDisplayer from "../../components/code/dataDisplayer";
import serverUrl from "../../components/code/serverUrl";
import { ChatProps, Offer, OtherInChat, User } from "../../components/code/interfaces";
import Loading from "../../components/toggles/Loading";
import ComponentLoading from "../../components/toggles/ComponentLoading";

interface OwnerPageprops {
    offer: Offer;
    user: User;
}

const OfferPageOwner = ({ offer, user }: OwnerPageprops) => {

    const [updateProduct, setUpdateProd] = useState(false);
    const [updateOffer, setUpdateOffer] = useState<Offer>({});
    const [clearProduct, setClearProd] = useState(false);
    const navigate = useNavigate();
    const toastRender = useToast();

    const [reports, setReports] = useState(false);

    const [chats, setChats] = useState<ChatProps[]>([]);
    const [others, setOthers] = useState<OtherInChat[]>([]);
    const [chatUser, setChatUser] = useState<OtherInChat>({});
    const [selected, setSelected] = useState(false);

    const [compUser, setCompUser] = useState<User>({});
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [imgOwner, setImgOwner] = useState<any>();
    const [imgIntrested, setImgIntrested] = useState<any>();
    const [imgShow, setShow] = useState<any>();
    const [defaultProdImg, setDefault] = useState<any>();
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        const canceltoken = axios.CancelToken.source();
        if (offer.ofr_id) {
            setUpdateOffer(prev => ({
                ...prev,
                prod_imgUpdt: null,
                ofr_name: offer.ofr_name,
                ofr_type: offer.ofr_type,
                ofr_status: offer.ofr_status,
                ofr_desc: offer.ofr_desc,
                ofr_value: offer.ofr_value,
                ofr_parcelas: offer.ofr_parcelas
            }));
            getReports();
            getChats();
            getImgOwner();
            getProdImg();
            if (offer.user_comp_id) {
                getUserIntrested(offer.user_comp_id);
            }
        }
        return () => {
            canceltoken.cancel();
        }
    }, [offer.ofr_id]);


    useEffect(() => {
        const canceltoken = axios.CancelToken.source();
        if (chats.length > 0) {
            for (const chat of chats) {
                getOther(chat.User_user_id ?? 0, chat.chat_id ?? 0);
            }
            return () => {
                canceltoken.cancel();
            }
        }
    }, [chats])

    useEffect(() => {
        if (compUser.user_img) {
            getImgInterested();
        }
    }, [compUser])

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

    function clearChanges() {
        setUpdateOffer(prev => ({
            ...prev,
            prod_imgUpdt: null,
            ofr_name: offer.ofr_name,
            ofr_type: offer.ofr_type,
            ofr_status: offer.ofr_status,
            ofr_desc: offer.ofr_desc,
            ofr_value: offer.ofr_value,
            ofr_parcelas: offer.ofr_parcelas
        }));
        setShow(defaultProdImg);
        setClearProd(!clearProduct);
        toast('Mudanças Revertidas!', "A oferta voltou a seu estado anterior.", 3000, 'success')
    }

    async function updateOfferOprt() {
        await axios.put(`${serverUrl}/offers/${offer.ofr_id}`, {
            ofr_name: updateOffer.ofr_name,
            ofr_type: updateOffer.ofr_type,
            ofr_status: updateOffer.ofr_status,
            ofr_desc: updateOffer.ofr_desc,
            ofr_value: updateOffer.ofr_value,
            ofr_parcelas: updateOffer.ofr_parcelas
        }, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then(() => {
            setUpdateProd(true);
            toast('Produto atualizado', '', 3000, "success")
            navigate(0)
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getReports() {
        await axios.get(`${serverUrl}/denounce/offer/${offer.ofr_id}`).then(res => {
            if (res.data.length > 0) setReports(true);
        }).catch(error => {
            console.log(error);
        })
    }

    async function updateProdimg() {
        const data = new FormData();
        data.append("photo", updateOffer.prod_imgUpdt ?? "none");
        await axios.put(`${serverUrl}/products/img/photo`, data,
            { headers: { authorization: "Bearer " + localStorage.getItem("token"), prod_id: offer.Product_prod_id } }).then(() => {
                toast("", "Imagem atualizada", 3000)
            }).catch(error => {
                console.log(error);
                if (error.response.status == 413) {
                    toast('Imagem muito grande!', "Tente usar uma imagem menor.", 3000, "error")
                }
            })
    }

    async function getProdImg() {
        await axios.get(`${serverUrl}/products/photo/${offer.prod_img}`, { responseType: "arraybuffer" }).then(res => {
            const buffer = new Uint8Array(res.data);
            const blob = new Blob([buffer], { type: res.headers.contentType });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setShow(reader.result);
                setDefault(reader.result);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    async function deleteOfferOprt() {
        await axios.delete(`${serverUrl}/offers/${offer.ofr_id}`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then(() => {
            toastRender.closeAll()
            navigate("../../")
        }).catch((error) => {
            console.log(error);
        })
    }

    async function deleteProductOffer() {
        await axios.delete(`${serverUrl}/products/${offer.Product_prod_id}`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then(() => {
            toast("Equipamento apagado!", "Sua oferta foi devidamente apagada!", 3000, "success")
            navigate("../../")
        }).catch((error) => {
            console.log(error);
        })
    }

    async function deleteChatsOffer() {
        await axios.delete(`${serverUrl}/chats/offer/${offer.ofr_id}`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then(() => {
        }).catch((error) => {
            console.log(error);
        })
    }

    async function endComprisse() {
        await axios.put(`${serverUrl}/offers/remove-intrest/${offer.ofr_id}`, {
        }, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(() => {
            toast("", "Compromisso revogado", 3000, "success")
            navigate(0);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function confirmEquipament() {
        await axios.put(`${serverUrl}/offers/confirm-equipament/${offer.ofr_id}/${"Env"}`, {
        }, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(() => {
            toast("Envio confirmado", "Equipament enviado", 3000, "success")
            navigate(0);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getUserIntrested(id: number) {
        await axios.get(`${serverUrl}/users/id/${id}`).then((res) => {
            setCompUser(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getOther(id: number, chat_id: number) {
        await axios.get(`${serverUrl}/users/id/${id}`).then((res) => {
            const chatId = chat_id;
            const data: User = res.data;

            setOthers(prev => ([...prev, { data, chatId }]));
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getChats() {
        await axios.get(`${serverUrl}/chats/offer/${offer.ofr_id}`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then((res) => {
            setChats(res.data);
            isLoading(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getImgOwner() {
        await axios.get(`${serverUrl}/users/profile/photo/${user.user_img}`, { responseType: "arraybuffer" }).then(res => {
            const buffer = new Uint8Array(res.data);
            const blob = new Blob([buffer], { type: res.headers.contentType });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setImgOwner(reader.result);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getImgInterested() {
        await axios.get(`${serverUrl}/users/profile/photo/${compUser.user_img}`, { responseType: "arraybuffer" }).then(res => {
            const buffer = new Uint8Array(res.data);
            const blob = new Blob([buffer], { type: res.headers.contentType });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setImgIntrested(reader.result);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const optionsChat = others.map(item => {
        return <option value={others.indexOf(item)} key={(item.data) ? item.data.user_id : 0}>{(item.data) ? item.data.user_name : ""}</option>
    });

    const handleChangeOffer = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateOffer(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSelectOffer = (e: ChangeEvent<HTMLSelectElement>) => {
        setUpdateOffer(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleAreaOffer = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setUpdateOffer(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value != "") {
            setChatUser(others[parseInt(e.target.value)] ?? {});
            setSelected(true);
        }
        else {
            setChatUser({})
            setSelected(false);
        }
    }

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            setUpdateOffer(prev => ({ ...prev, prod_imgUpdt: selectedFile }));
            let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
                setShow(reader.result);
            }
        }
    }

    function deleteOfferFunc() {
        if (reports) {
            toast('A oferta não pode ser alterada', "Essa oferta está sob avaliação de denúncia", 3000, 'error')
        }
        else {
            if (offer.ofr_status == "Livre" || offer.ofr_status == "Conclusão") {
                deleteChatsOffer();
                deleteProductOffer();
                deleteOfferOprt();
                useToast().closeAll();
            }
            else {
                toast('Em compromisso', "A oferta pussui um compromisso ativo", 3000, 'error')
            }
        }

    }

    function updateOfferFunc() {
        if (reports) {
            toast('A oferta não pode ser alterada', "Essa oferta está sob avaliação de denúncia", 3000, 'error')
        }
        else if (offer.ofr_status != "Livre") {
            toast('A oferta não pode ser alterada', "A oferta pussui um compromisso ativo", 3000, 'error')
        }
        else {
            updateOfferOprt();
            if (updateOffer.prod_imgUpdt) updateProdimg();
        }
    }

    return (
        (loading) ? <Loading/> : <Box w="100%" h="100%">
            <HeaderToggle />
            <Flex bg={colors.bgWhite} direction="column" align="center" h="fit-content" pt="10vh" _dark={{ bg: colors.bgWhite_Dark }}>

                <Flex direction={{ base: "column", md: "row" }} h={{ base: "fit-content", md: "50vh" }} w="90%">

                    <Flex direction="column" w={{ base: "100%", md: "30%" }}>
                        {(imgShow) ? <Image src={imgShow} objectFit="contain" h={{ base: "40vh", md: "95%" }}></Image> : <ComponentLoading type="skeleton" height={{ base: "40vh", md: "95%" }}/>}
                    </Flex>

                    <Divider orientation="vertical" ml="2.5" mr="2.5" display={{ base: "none", md: "inherit" }} />
                    <Stack w={{ base: "100%", md: "65%" }} h="100%" spacing={8}>
                        <Stack direction="row">
                            <Input type="text" placeholder={offer.ofr_name} name="ofr_name" _placeholder={{ color: colors.colorFontBlue }} value={updateOffer.ofr_name || ""}
                                variant={{ base: "outline", md: "flushed" }} fontFamily="outfit" fontSize={{ base: "32px", md: "34px" }} onChange={handleChangeOffer} />
                        </Stack>

                        <Flex direction={{ base: "column", md: "row" }} w={{ base: "100%", md: "70%" }}>
                            <SimpleGrid spacing={3} fontSize={{ base: "20px", md: "18px" }} mb="3%">
                                <Flex direction="row" align="center">
                                    <Text fontFamily="atkinson" mr="5px">Tipo de Oferta:</Text>
                                    <Select color={colors.colorFontDarkBlue} fontSize={{ base: "20px", md: "18px" }} onChange={handleSelectOffer} value={updateOffer.ofr_type} name="ofr_type" w={{ base: "50%", md: "60%" }} variant={{ base: "outline", md: "flushed" }} _dark={{ color: colors.colorFontDarkBlue_Dark }}>
                                        <option value='Doação'>Doação</option>
                                        <option value='Venda'>Venda</option>
                                        <option value='Aluguél'>Aluguél</option>
                                    </Select>
                                </Flex>
                                <Flex direction="row" align="center">
                                    <Text fontFamily="atkinson" mr="5px">Status da Oferta:</Text>
                                    <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{offer.ofr_status}</Text>
                                </Flex>
                                <Flex direction="row" align="center">
                                    <Text fontFamily="atkinson" mr="5px">Cidade:</Text>
                                    <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{offer.ofr_city}</Text>
                                </Flex>
                            </SimpleGrid>
                            <Spacer />
                            <SimpleGrid spacing={3} fontSize={{ base: "20px", md: "18px" }}>
                                <Flex direction="row" align="center">
                                    <Text fontFamily="atkinson" mr="5px">{'Valor (R$):'}</Text>
                                    <Input type="number" fontFamily="atkinson" fontSize={{ base: "20px", md: "18px" }} name="ofr_value" placeholder={(offer.ofr_type == "Doação") ? "Grátis" : offer.ofr_value?.toString()} value={updateOffer.ofr_value || ""}
                                        _placeholder={{ color: colors.colorFontDarkBlue }} variant={{ base: "outline", md: "flushed" }} onChange={handleChangeOffer} w={{ base: "50%", md: "24%" }} _dark={{ _placeholder: { color: colors.colorFontDarkBlue_Dark } }} />
                                </Flex>
                                <Flex direction="row" align="center">
                                    <Text fontFamily="atkinson" mr="5px">Data:</Text>
                                    <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{(offer.ofr_postDate) ? dateDisplayer(offer.ofr_postDate) : ""}</Text>
                                </Flex>
                                <Flex direction="row" align="center">
                                    <Text fontFamily="atkinson" mr="5px">Parcelas:</Text>
                                    <Input type="number" fontFamily="atkinson" fontSize={{ base: "20px", md: "18px" }} placeholder={offer.ofr_parcelas?.toString()} name="ofr_parcelas" value={updateOffer.ofr_parcelas || ""}
                                        _placeholder={{ color: colors.colorFontDarkBlue }} variant={{ base: "outline", md: "flushed" }} onChange={handleChangeOffer} w={{ base: "50%", md: "24%" }} _dark={{ _placeholder: { color: colors.colorFontDarkBlue_Dark } }} />
                                </Flex>
                            </SimpleGrid>
                        </Flex>
                        <Flex direction={{ base: "column", md: "row" }} align="center">
                            <InputGroup display="flex" zIndex={1} w="fit-content">
                                <InputLeftAddon children={<MdOutlinePhotoSizeSelectActual size="80%" />} />
                                <Input type="file" name="photo" display="none" onChange={handleImage} accept=".png,.jpg,.jpeg" fontFamily="outfit" />
                                <Button colorScheme="linkedin" onClick={() => { document.getElementsByName("photo")[0].click() }}>Alterar foto</Button>
                            </InputGroup>
                            <Spacer />
                            {(offer.ofr_status != "Livre") ? <Flex bg={colors.bgTableRow1} p="1%" direction="row" align="center" ml={{ base: 0, md: "2%" }} w={{ base: "100%", md: "68%" }} borderRadius="15px" mt={{ base: "3%", md: 0 }} _dark={{ bg: colors.bgTableRow1_Dark }}>
                                <Link to={`/profile/${compUser.user_email}/view`}><Avatar name={compUser.user_name} src={(compUser.user_img) ? imgIntrested : ""} _hover={{ border: `2px solid ${colors.colorFontBlue}`, _dark: { border: "2px solid #fff" } }} /></Link>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue} fontSize={{ base: "19px", md: "20px" }} mr="2%" ml="1%">{compUser.user_name}</Text>
                                <Text fontFamily="atkinson" fontSize={{ base: "19px", md: "20px" }}>fechou com essa oferta!</Text>
                            </Flex> : ""}
                        </Flex>
                    </Stack>
                </Flex>

                <Divider />

                <Flex direction={{ base: "column", md: "row" }} h={{ base: "fit_content", md: "50vh" }} w="90%">
                    <Stack w={{ base: "100%", md: "45%" }} h={{ base: "50vh", md: "100%" }} mt="2vh">
                        <Heading as="h3" fontFamily="outfit" fontSize={{ base: "25px", md: "34px" }} color={colors.colorFontBlue}>Descrição</Heading>
                        <Textarea placeholder={offer.ofr_desc} fontSize={{ base: "20px", md: "18px" }} value={updateOffer.ofr_desc || ""} name="ofr_desc" onChange={handleAreaOffer} fontFamily="atkinson" w="100%" resize="none" h={{ base: "80%", md: "70%" }}/>
                    </Stack>

                    <Divider orientation="vertical" mr="5%" ml="5%" display={{ base: "none", md: "inherit" }} />

                    <Stack w={{ base: "100%", md: "45%" }} h={{ base: "fit-content", md: "100%" }} fontSize={{ base: "20px", md: "18px" }} mt="2vh">
                        <Flex direction="row" align="center">
                            <Avatar name={user.user_name} src={(user.user_img) ? imgOwner : ""} mr="2%"></Avatar>
                            <Text fontFamily="atkinson" color={colors.colorFontBlue} fontSize={{ base: "22px", md: "20px" }} mr="2%">{user.user_name}</Text>
                            <BsFillStarFill fill={colors.colorFontBlue} />
                            <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }} fontSize={{ base: "22px", md: "20px" }}>{(user.user_nota) ? user.user_nota : "Novo"}</Text>
                        </Flex>
                        <Flex direction="row">
                            <Text fontFamily="atkinson" mr="5px">Email:</Text>
                            <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{user.user_email}</Text>
                        </Flex>
                        <Flex direction="row">
                            <Text fontFamily="atkinson" mr="5px">Telefone:</Text>
                            <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{user.user_phone}</Text>
                        </Flex>
                        <Flex direction="row">
                            <Text fontFamily="atkinson" mr="5px">CEP:</Text>
                            <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{user.user_CEP}</Text>
                        </Flex>
                        {(reports) ? <Flex zIndex="1" right="0" top="15vh" position={{ base: "absolute", md: "initial" }} bg="red.500" color="#fff" direction={{ base: "column", md: "row" }} maxW="100%" align="center" w="fit-content" p={{ base: "1%", md: "10px 20px 10px 5px" }} borderRadius="10px">
                            <MdOutlineReportProblem size="60%" />
                            <Spacer />
                            <Text textAlign={{ base: "center", md: "justify" }} fontSize={{ base: "22px", md: "18px" }}>Sua oferta possuí denúncias! A situação está sendo avaliada! Em breve uma atitude será tomada! Enquanto isso a oferta não poderá ser alterada ou apagada.</Text>
                        </Flex> : ""}
                    </Stack>
                </Flex>
                <Divider />
                <Flex align="center" direction="column" h="fit-content" w="100%" mt="3%" mb="3%">
                    <ProdInfoTableUpdt clear={clearProduct} update={updateProduct} ofr_id={offer.ofr_id ?? 0} />
                </Flex>
                <Divider />

                <Flex w="100%" h="fit-content" mt="3%" mb="3%" align="center" direction="column">
                    <Stack mb="3%" direction={{ base: "column", md: "row" }} align="center" spacing={2} fontSize={{ base: "25px", md: "30px" }}>
                        <Heading noOfLines={1} textAlign="center" color={colors.colorFontDarkBlue} fontSize={{base: "25px", md:"34px"}} fontFamily="outfit" _dark={{ color: colors.colorFontDarkBlue_Dark }}>Chat com </Heading>
                        <Select placeholder="usuário interessado" variant="flushed" w="fit-content" color={colors.colorFontDarkBlue}
                            fontFamily="outfit" fontSize={{ base: "32px", md: "32px" }} _dark={{ color: colors.colorFontDarkBlue_Dark }} fontWeight="bold" onChange={handleChangeSelect}>
                            {optionsChat}
                        </Select>
                    </Stack>
                    {(chats.length == 0) ? <SignNotFound msg="Parece que não há nenhum contato iniciado nessa oferta..." icon={<MdOutlineContactSupport size="45%" />} /> :
                        (selected) ? <ChatBox offer={offer} chat_id={chatUser.chatId ?? 0} other={chatUser.data ?? {}} user_id={offer.User_user_id ?? 0} /> : <SignNotFound msg="Selecione um usuário interessado para acessar o chat com ele!" icon={<HiOutlineUsers size="45%" />}></SignNotFound>}
                </Flex>

                <Flex w="100%" h="fit-content" align="center" direction="column" bg={colors.veryLightBlue} _dark={{ bg: colors.veryLightBlue_Dark }} pb="5vh">
                    <Heading mt="3%" mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{ base: "25px", md: "30px" }} noOfLines={{ base: 2, md: 1 }} as="h1" fontFamily="outfit" _dark={{ color: colors.colorFontDarkBlue_Dark }}>O que deseja fazer com a Oferta?</Heading>
                    <ButtonGroup gap={5} flexDirection={{ base: "column", md: "row" }}>
                        <Button colorScheme="linkedin" variant="solid" onClick={() => { updateOfferFunc() }}>Atualizar</Button>
                        <Button colorScheme="linkedin" variant="solid" onClick={() => { clearChanges() }}>Limpar Mudanças</Button>
                        <Button colorScheme="linkedin" variant="solid" onClick={() => {
                            toastRender({
                                position: 'bottom',
                                duration: 5000,
                                render: () => (
                                    <Stack bg="red.500" align="center" direction="column" p="2vh" borderRadius="10px" spacing={2} _dark={{ bg: "red.200" }}>
                                        <Text fontWeight="semibold" color="white" _dark={{ color: "black" }} noOfLines={2} fontSize={{ base: "22px", md: "20px" }}>Certeza que deseja apagar a oferta?</Text>
                                        <Stack direction="row">
                                            <Button onClick={deleteOfferFunc} variant="outline" _hover={{ bg: "#fff3" }} color="#fff" _dark={{ color: "#000" }}>Sim</Button>
                                            <Button onClick={() => { toastRender.closeAll() }} variant="outline" _hover={{ bg: "#fff3" }} color="#fff" _dark={{ color: "#000" }}>Não</Button>

                                        </Stack>
                                    </Stack>
                                )
                            })
                        }}>Apagar</Button>
                    </ButtonGroup>
                </Flex>
                {(offer.ofr_status != "Livre") ? <Flex w="100%" h="fit-content" align="center" direction="column" bg={colors.bgWhite} _dark={{ bg: colors.bgWhite_Dark }} pb="5vh">
                    <Heading mt="3%" mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{ base: "25px", md: "30px" }} noOfLines={{ base: 2, md: 1 }} as="h1" fontFamily="outfit" _dark={{ color: colors.colorFontDarkBlue_Dark }}>O que deseja fazer com o Compromisso?</Heading>
                    <ButtonGroup gap={5} flexDirection={{ base: "column", md: "row" }}>
                        <Button colorScheme="linkedin" variant="solid" onClick={() => {
                            toastRender({
                                position: 'bottom',
                                render: () => (
                                    <Stack bg="red.500" align="center" direction="column" p="2vh" borderRadius="10px" spacing={2} _dark={{ bg: "red.200" }}>
                                        <Text fontWeight="semibold" color="white" _dark={{ color: "black" }} noOfLines={2} fontSize={{ base: "22px", md: "20px" }}>Certeza que deseja encerrar esse compromisso?</Text>
                                        <Stack direction="row">
                                            <Button variant="outline" color="#fff" _dark={{ color: "#000" }} _hover={{ bg: "#fff2" }} onClick={() => { (offer.ofr_status == "Conclusão") ? toast('O compromisso não pode ser encerrado!', "O equipamento já foi enviado.", 3000, "error") : endComprisse() }}>Sim</Button>
                                            <Button variant="outline" color="#fff" _dark={{ color: "#000" }} _hover={{ bg: "#fff2" }} onClick={() => { toastRender.closeAll() }}>Não</Button>
                                        </Stack>
                                    </Stack>
                                )
                            })
                        }}>Encerrar Compromisso</Button>
                        <Button colorScheme="linkedin" variant="solid" onClick={() => {
                            (offer.ofr_env_conf) ? toast("Envio de equipamento já confirmado", "", 3000, "warning") : confirmEquipament();
                        }}>Equipamento Enviado</Button>
                        {(offer.ofr_env_conf && offer.ofr_rec_conf) ? <Button colorScheme="linkedin" variant="solid" onClick={() => {
                            onOpen();
                        }}>Avaliar</Button> : ""}
                    </ButtonGroup>
                    <Avaliation user_name={compUser.user_name ?? ""} isOpen={isOpen} setClose={onClose} recUserId={compUser.user_id ?? 0} envUserId={offer.User_user_id ?? 0} user_img={imgIntrested} />
                </Flex> : ""}
            </Flex>
            <Footer />
        </Box>
    )
}

export default OfferPageOwner;
