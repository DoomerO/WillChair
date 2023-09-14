import {Box, Flex, Avatar, Heading, Image, Stack, Text, SimpleGrid, Spacer, Divider, Input, Textarea, ButtonGroup, Button, useToast, Select, InputGroup, InputLeftAddon, useDisclosure, UseToastOptions, ToastPosition} from "@chakra-ui/react";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import HeaderToggle from "../../components/toggles/HeaderToggle";
import Footer from "../../components/Footer";
import colors from "../../colors/colors";
import ProdInfoTableUpdt from "../../components/ProdInfoTableUpdt";
import SignNotFound from "../../components/signs/SignNotFound";
import ChatBox from "../../components/chats/ChatBox";
import "../../fonts/fonts.css";

import {BsFillStarFill} from "react-icons/bs";
import {HiOutlineUsers} from "react-icons/hi";
import {MdOutlineContactSupport, MdOutlinePhotoSizeSelectActual, MdOutlineReportProblem} from "react-icons/md";
import Avaliation from "../../components/Avaliation";

interface OwnerPageprops {
    offer : object;
    user : object;
}

const OfferPageOwner = ({offer, user} : OwnerPageprops) => {
    
    const [updateProduct, setUpdateProd] = useState(false);
    const [clearProduct, setClearProd] = useState(false)
    const navigate = useNavigate();
    const toastRender = useToast();
    const [chats, setChats] = useState([]);
    const [others, setOthers] = useState([]);
    const [reports, setReports] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ updateOffer, setUpdateOffer ] = useState({});
    const [chatUser, setChatUser] = useState([]);
    const [selected, setSelected] = useState(false);
    const [compUser, setCompUser] = useState([]);
    const [imgOwner, setImgOwner] = useState<any>();
    const [imgIntrested, setImgIntrested] = useState<any>();
    const [imgShow, setShow] = useState<any>();
    const [defaultProdImg, setDefault] = useState<any>();
    
    useEffect(() => {
        const canceltoken = axios.CancelToken.source();
        if(offer.ofr_id) {
            setUpdateOffer(prev => ({...prev,
                prod_img: null,
                ofr_name : offer.ofr_name,
                ofr_type : offer.ofr_type,
                ofr_status : offer.ofr_status,
                ofr_desc : offer.ofr_desc,
                ofr_value : offer.ofr_value,
                ofr_parcelas : offer.ofr_parcelas
            }));
            getReports();
            getChats();
            getImgOwner();
            getProdImg();
            if (offer.user_comp_id){
                getUserIntrested(offer.user_comp_id);
            }   
        }
        return () => {
            canceltoken.cancel();
        }
    }, [offer.ofr_id]);
    
    
    useEffect(() => {
        const canceltoken = axios.CancelToken.source();
        if(chats.length > 0) {
            for (const chat of chats) {
                getOther(chat.User_user_id, chat.chat_id);
            }
            return () => {
                canceltoken.cancel();
            }
        }
    }, [chats])
    
    useEffect(() => {
        if(compUser.user_img) {
            getImgInterested();
        }
    }, [compUser])

    function toast(title:string, desc:string, time?:number, type?:UseToastOptions["status"], pos?:ToastPosition, close?:boolean){
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
        setUpdateOffer(prev => ({...prev,
            prod_img : null,
            ofr_name : offer.ofr_name,
            ofr_type : offer.ofr_type,
            ofr_status : offer.ofr_status,
            ofr_desc : offer.ofr_desc,
            ofr_value : offer.ofr_value,
            ofr_parcelas : offer.ofr_parcelas
        }));
        setShow(defaultProdImg);
        setClearProd(!clearProduct);
        toast('Mudanças Revertidas!', "A oferta voltou a seu estado anterior.", 3000, 'success')
    }
    
    async function updateOfferOprt() {
        await axios.put(`http://localhost:3344/offers/${offer.ofr_id}`, {
            ofr_name: updateOffer.ofr_name,
            ofr_type: updateOffer.ofr_type,
            ofr_status: updateOffer.ofr_status,
            ofr_desc: updateOffer.ofr_desc,
            ofr_value: updateOffer.ofr_value,
            ofr_parcelas: updateOffer.ofr_parcelas
        }, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setUpdateProd(true);
            toast('Produto atualisadsdsdszado', 'Atualizado com sucesso', 3000, "success")
            navigate(0)
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getReports() {
        await axios.get(`http://localhost:3344/denounce/offer/${offer.ofr_id}`).then(res => {
            if(res.data.length > 0) setReports(true);
        }).catch(error => {
            console.log(error);
        })
    }

    async function updateProdimg() {
        const data = new FormData();
        data.append("photo", updateOffer.prod_img);  
        await axios.put('http://localhost:3344/products/img/photo', data,
        {headers : {authorization : "Bearer " + localStorage.getItem("token"), prod_id : offer.Product_prod_id}}).then((res) => {
            toast("", "Imagem atualizada", 3000)
        }).catch(error => {
            console.log(error);
            if(error.response.status == 413) {
                toast('Imagem muito grande!', "Tente usar uma imagem menor.", 3000, "error")
            }
        })
    }

    async function getProdImg() {
        await axios.get(`http://localhost:3344/products/photo/${offer.prod_img}`, {responseType : "arraybuffer"}).then(res => {
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
        await axios.delete(`http://localhost:3344/offers/${offer.ofr_id}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            useToast()({
                position: 'bottom',
                render: () => (
                    <Stack bg="green.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", md:"20px"}}>Oferta apagada com sucesso!</Text>
                        <Button variant="outline" color="#fff" _hover={{bg:"#fff2"}} onClick={() => {navigate("/"); navigate(0)}}>Voltar para a Home</Button>
                    </Stack>
                )
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    async function deleteProductOffer() {
        await axios.delete(`http://localhost:3344/products/${offer.Product_prod_id}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            toast("", "Produto deletado", 3000, "success")
        }).catch((error) => {
            console.log(error);
        })
    }

    async function deleteChatsOffer() {
        await axios.delete(`http://localhost:3344/chats/offer/${offer.ofr_id}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
        }).catch((error) => {
            console.log(error);
        })
    }

    async function endComprisse() {
        await axios.put(`http://localhost:3344/offers/remove-intrest/${offer.ofr_id}`,{
        }, {headers : {
            authorization : "Bearer " + localStorage.getItem("token")
        }}).then((res) => {
            toast("", "Compromisso revogado", 3000, "success")
            navigate(0);
        }).catch((error) => {
            console.log(error);
        }) 
    }

    async function confirmEquipament() {
        await axios.put(`http://localhost:3344/offers/confirm-equipament/${offer.ofr_id}/${"Env"}`,{
        }, {headers : {
            authorization : "Bearer " + localStorage.getItem("token")
        }}).then((res) => {
            toast("Envio confirmado", "Equipament enviado", 3000, "success")
            navigate(0);
        }).catch((error) => {
            console.log(error);
        }) 
    }

    async function getUserIntrested(id : number) {
        await axios.get(`http://localhost:3344/users/id/${id}`).then((res) => {
            setCompUser(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getOther(id:number, chat_id:number) {
        await axios.get(`http://localhost:3344/users/id/${id}`).then((res) => {
            const chatId = {chatId : chat_id};
            const data = res.data;
            const result = {data, chatId};
            setOthers(prev => ([...prev, result]));
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getChats() {
        await axios.get(`http://localhost:3344/chats/offer/${offer.ofr_id}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setChats(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getImgOwner() {
        await axios.get(`http://localhost:3344/users/profile/photo/${user.user_img}`, {responseType : "arraybuffer"}).then(res => {
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
        await axios.get(`http://localhost:3344/users/profile/photo/${compUser.user_img}`, {responseType : "arraybuffer"}).then(res => {
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
        return <option value={others.indexOf(item)} key={item.data.user_id}>{item.data.user_name}</option>
    });

    const handleChangeOffer = (e:ChangeEvent<HTMLInputElement>) => {
        setUpdateOffer(prev => ({...prev, [e.target.name]:e.target.value}));
    }

    const handleChangeSelect = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.value != "") {
            setChatUser(others[parseInt(e.target.value)]);
            setSelected(true);
        }
        else {
            setChatUser([])
            setSelected(false);
        }
    }

    const handleImage = (e:ChangeEvent<HTMLInputElement>) => {
        setUpdateOffer(prev => ({...prev, prod_img : e.target.files[0]}));
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setShow(reader.result);
        }
    }

    function deleteOfferFunc() {
        if(reports) { 
            toast('A oferta não pode ser alterada', "Essa oferta está sob avaliação de denúncia", 3000,'error')
        }
        else if(offer.ofr_status != "Livre") {
            toast('Em compromisso',
            "A oferta pussui um compromisso ativo", 3000, 'error')
        }
        else {
            deleteChatsOffer();
            deleteProductOffer();
            deleteOfferOprt();
            useToast().closeAll();
        }
       
    }

    function updateOfferFunc() {
        if(reports) {
            toast('A oferta não pode ser alterada', "Essa oferta está sob avaliação de denúncia", 3000,'error')
        }
        else if(offer.ofr_status != "Livre") {
            toast('A oferta não pode ser alterada', "A oferta pussui um compromisso ativo", 3000,'error')
        }
        else {
            updateOfferOprt();
            if(updateOffer.prod_img) updateProdimg();
        }
    }

    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>
                <Flex bg={colors.bgWhite} direction="column" align="center" h="fit-content" pt="10vh" _dark={{bg : colors.bgWhite_Dark}}>

                    <Flex direction={{base:"column", md:"row"}} h={{base:"fit-content", md:"50vh"}} w="90%">

                    <Flex direction="column" w={{base:"100%", md:"30%"}}>
                        <Image src={(imgShow) ? imgShow : ""} objectFit="contain" h={{base:"40vh",md:"95%"}}
                            onClick={() => {console.log(updateOffer.prod_img)}}></Image>
                    </Flex>
                    
                    <Divider orientation="vertical" ml="2.5" mr="2.5" display={{base:"none", md:"inherit"}}/>
                        <Stack w={{base:"100%", md:"65%"}} h="100%" spacing={8}>
                            <Stack direction="row">
                                <Input type="text" placeholder={offer.ofr_name} name="ofr_name" _placeholder={{color : colors.colorFontBlue}} value={updateOffer.ofr_name || ""}
                                variant={{base:"outline", md:"flushed"}} fontFamily="outfit" fontSize={{base: "32px", md: "34px"}} onChange={handleChangeOffer}/>
                            </Stack>
                            
                            <Flex direction={{base:"column", md:"row"}} w={{base:"100%", md:"70%"}}>
                                <SimpleGrid spacing={3} fontSize={{base:"20px", md:"18px"}} mb="3%">
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Tipo de Oferta:</Text>
                                        <Select color={colors.colorFontDarkBlue} fontSize={{base:"20px", md:"18px"}} onChange={handleChangeOffer} value={updateOffer.ofr_type} name="ofr_type" w={{base:"50%" ,md:"60%"}} variant={{base:"outline", md:"flushed"}} _dark={{color : colors.colorFontDarkBlue_Dark}}>
                                            <option value='Doação'>Doação</option>
                                            <option value='Venda'>Venda</option>
                                            <option value='Aluguél'>Aluguél</option>                                        
                                        </Select>
                                    </Flex>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Status da Oferta:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{offer.ofr_status}</Text>
                                    </Flex>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Cidade:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{offer.ofr_city}</Text>
                                    </Flex>
                                </SimpleGrid>
                                <Spacer/>
                                <SimpleGrid spacing={3} fontSize={{base:"20px", md:"18px"}}>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">{'Valor (R$):'}</Text>
                                        <Input type="number" fontFamily="atkinson" fontSize={{base:"20px", md:"18px"}} name="ofr_value" placeholder={(offer.ofr_type == "Doação") ? "Grátis" : offer.ofr_value} value={updateOffer.ofr_value || ""}
                                        _placeholder={{color : colors.colorFontDarkBlue}} variant={{base:"outline", md:"flushed"}} onChange={handleChangeOffer} w={{base:"50%", md:"24%"}} _dark={{_placeholder : {color : colors.colorFontDarkBlue_Dark}}}/>
                                    </Flex>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Data:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{offer.ofr_postDate}</Text>
                                    </Flex>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Parcelas:</Text>
                                        <Input type="number" fontFamily="atkinson" fontSize={{base:"20px", md:"18px"}} placeholder={offer.ofr_parcelas} name="ofr_parcelas" value={updateOffer.parcelas || ""}
                                        _placeholder={{color : colors.colorFontDarkBlue}} variant={{base:"outline", md:"flushed"}} onChange={handleChangeOffer} w={{base:"50%" ,md:"24%"}} _dark={{_placeholder : {color : colors.colorFontDarkBlue_Dark}}}/>
                                    </Flex>
                                </SimpleGrid>                                
                            </Flex>
                            <Flex direction={{base: "column", md: "row"}} align="center">
                                <InputGroup display="flex" zIndex={1} w="fit-content">
                                    <InputLeftAddon children={<MdOutlinePhotoSizeSelectActual size="80%"/>}/>
                                    <Input type="file" display="inline-block" onChange={handleImage} accept=".png,.jpg,.jpeg" fontFamily="outfit"/>
                                </InputGroup>
                                <Spacer/>
                                {(offer.ofr_status != "Livre") ? <Flex bg={colors.bgTableRow1} p="1%" direction="row" align="center" ml={{base:0, md:"2%"}} w={{base:"100%", md:"68%"}} borderRadius="15px" mt={{base:"3%" , md:0}} _dark={{bg : colors.bgTableRow1_Dark}}>
                                    <Link to={`/profile/${compUser.user_email}/view`}><Avatar name={compUser.user_name} src={(compUser.user_img) ? imgIntrested : ""} _hover={{border : `2px solid ${colors.colorFontBlue}`, _dark : {border : "2px solid #fff"}}}/></Link>
                                    <Text fontFamily="atkinson" color={colors.colorFontBlue} fontSize={{base:"19px", md:"20px"}} mr="2%" ml="1%">{compUser.user_name}</Text>
                                    <Text fontFamily="atkinson" fontSize={{base:"19px", md:"20px"}}>fechou com essa oferta!</Text>
                                </Flex> : ""}
                            </Flex>
                        </Stack>
                    </Flex>

                    <Divider/>

                    <Flex direction={{base:"column", md:"row"}} h={{base:"fit_content",md:"50vh"}} w="90%">
                        <Stack w={{base:"100%", md:"45%"}} h={{base:"50vh", md:"100%"}} mt="2vh">
                            <Heading as="h3" fontFamily="outfit" fontSize={{base: "32px", md: "34px"}} color={colors.colorFontBlue}>Descrição</Heading>
                            <Textarea placeholder={offer.ofr_desc} fontSize={{base:"20px", md:"18px"}} value={updateOffer.ofr_desc || ""} name="ofr_desc" onChange={handleChangeOffer} fontFamily="atkinson" w="100%" resize="vertical" h={{base:"80%",md:"70%"}}/>
                        </Stack>

                        <Divider orientation="vertical" mr="5%" ml="5%" display={{base:"none", md:"inherit"}}/>

                        <Stack w={{base:"100%", md:"45%"}} h={{base:"20vh", md:"100%"}} fontSize={{base:"20px", md:"18px"}} mt="2vh">
                            <Flex direction="row" align="center">
                                <Avatar name={user.user_name} src={(user.user_img) ? imgOwner : ""} mr="2%"></Avatar>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue} fontSize={{base:"22px", md:"20px"}} mr="2%">{user.user_name}</Text>
                                <BsFillStarFill fill={colors.colorFontBlue}/>
                                <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}} fontSize={{base:"22px", md:"20px"}}>{(user.user_nota) ? user.user_nota : 0.0}</Text>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">Email:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{user.user_email}</Text>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">Telefone:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{user.user_phone}</Text>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">CEP:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{user.user_CEP}</Text>
                            </Flex>
                            {(reports) ? <Flex zIndex="1" right="0" top="15vh" position={{base:"absolute", md:"initial"}} bg="red.500" color="#fff" direction={{base:"column",md:"row"}} maxW="100%" align="center" w="fit-content" p={{base:"1%", md:"10px 20px 10px 5px"}} borderRadius="10px">
                                    <MdOutlineReportProblem size="60%"/>
                                    <Spacer/>
                                    <Text textAlign={{base:"center", md:"justify"}} fontSize={{base: "22px", md: "18px"}}>Sua oferta possuí denúncias! A situação está sendo avaliada! Em breve uma atitude será tomada! Enquanto isso a oferta não poderá ser alterada ou apagada.</Text>
                                </Flex> : ""}
                        </Stack>
                    </Flex>
                    <Divider/>
                    <Flex align="center" direction="column" h="fit-content" w="100%" mt="3%" mb="3%">
                        <ProdInfoTableUpdt clear={clearProduct} update={updateProduct} ofr_id={offer.ofr_id}/>
                    </Flex>
                    <Divider/>

                    <Flex w="100%" h="fit-content" mt="3%" mb="3%" align="center" direction="column">
                        <Stack mb="3%" direction={{base:"column", md:"row"}} align="center" spacing={2} fontSize={{base:"32px", md:"30px"}}>
                            <Heading noOfLines={1} textAlign="center" color={colors.colorFontDarkBlue}  as="h1" fontFamily="outfit" _dark={{color: colors.colorFontDarkBlue_Dark}}>Chat com </Heading>
                            <Select placeholder="usuário interessado" variant="flushed" w="fit-content" color={colors.colorFontDarkBlue}  
                            fontFamily="outfit" fontSize={{base:"32px", md:"32px"}} _dark={{color: colors.colorFontDarkBlue_Dark}} fontWeight="bold" onChange={handleChangeSelect}>
                                {optionsChat}
                            </Select>
                        </Stack>
                        {(chats.length == 0) ? <SignNotFound msg="Parece que não há nenhum contato iniciado nessa oferta..." icon={<MdOutlineContactSupport size="45%"/>}/> :
                        (selected) ? <ChatBox offer={offer} chat_id={chatUser.chatId.chatId} other={chatUser.data} user_id={offer.User_user_id}/> : <SignNotFound msg="Selecione um usuário interessado para acessar o chat com ele!" icon={<HiOutlineUsers size="45%"/>}></SignNotFound>}
                    </Flex>

                    <Flex w="100%" h="fit-content" align="center" direction="column" bg={colors.veryLightBlue} _dark={{bg : colors.veryLightBlue_Dark}} pb="5vh">
                        <Heading mt="3%" mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{base: "32px", md: "30px"}} noOfLines={{base:2, md:1}} as="h1" fontFamily="outfit" _dark={{color: colors.colorFontDarkBlue_Dark}}>O que deseja fazer com a Oferta?</Heading>
                        <ButtonGroup gap={5} flexDirection={{base:"column", md:"row"}}>
                            <Button colorScheme="linkedin" variant="solid" onClick={() => {updateOfferFunc()}}>Atualizar</Button>
                            <Button colorScheme="linkedin" variant="solid" onClick={() => {clearChanges()}}>Limpar Mudanças</Button>
                            <Button colorScheme="linkedin" variant="solid" onClick={() => { toastRender({
                                position: 'bottom',
                                render: () => (
                                    <Stack bg="red.500" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", md:"20px"}}>Certeza que deseja apagar sua Oferta?</Text>
                                        <Stack direction="row">
                                            <Button variant="outline" color="#fff" _hover={{bg:"#fff2"}} onClick={() => {deleteOfferFunc()}}>Sim</Button>
                                            <Button variant="outline" color="#fff" _hover={{bg:"#fff2"}} onClick={() => {toastRender.closeAll()}}>Não</Button>    
                                        </Stack>
                                    </Stack>
                                )
                            })}}>Apagar</Button>
                        </ButtonGroup>
                    </Flex>
                    {(offer.ofr_status != "Livre") ? <Flex w="100%" h="fit-content" align="center" direction="column" bg={colors.bgWhite} _dark={{bg : colors.bgWhite_Dark}} pb="5vh">
                        <Heading mt="3%" mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{base: "32px", md: "30px"}} noOfLines={{base:2, md:1}} as="h1" fontFamily="outfit" _dark={{color: colors.colorFontDarkBlue_Dark}}>O que deseja fazer com o Compromisso?</Heading>
                        <ButtonGroup gap={5} flexDirection={{base:"column", md:"row"}}>
                            <Button colorScheme="linkedin" variant="solid" onClick={() => { toastRender({
                                position: 'bottom',
                                render: () => (
                                    <Stack bg="red.500" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", md:"20px"}}>Certeza que deseja apagar esse compromisso?</Text>
                                        <Stack direction="row">
                                            <Button variant="outline" color="#fff" _hover={{bg:"#fff2"}} onClick={() => {(offer.ofr_status == "Conclusão") ? toastRender({
                                                title: 'O compromisso não pode ser encerrado!',
                                                description: "O equipamento já foi enviado.",
                                                status: 'error',
                                                duration: 9000,
                                                isClosable: true})
                                             : endComprisse()}}>Sim</Button>
                                            <Button variant="outline" color="#fff" _hover={{bg:"#fff2"}} onClick={() => {toastRender.closeAll()}}>Não</Button>    
                                        </Stack>
                                    </Stack>
                                )
                            })}}>Encerrar Compromisso</Button>
                            <Button colorScheme="linkedin" variant="solid" onClick={() => {(offer.ofr_env_conf) ? toastRender({
                                title: 'Você já confirmou o envio do equipamento!',
                                description: "Não é necessário confirmar mais de uma vez!",
                                status: 'error',
                                duration: 9000,
                                isClosable: true}) : confirmEquipament();
                            }}>Equipamento Enviado</Button>
                            {(offer.ofr_env_conf && offer.ofr_rec_conf) ? <Button colorScheme="linkedin" variant="solid" onClick={() => {
                                onOpen();
                            }}>Avaliar</Button>: ""}
                        </ButtonGroup> 
                        <Avaliation user_name={compUser.user_name} isOpen={isOpen} setClose={onClose} recUserId={compUser.user_id} envUserId={offer.User_user_id} user_img={imgIntrested}/>
                    </Flex>: ""}
                </Flex>
            <Footer/>
        </Box>
    )
}

export default OfferPageOwner;
