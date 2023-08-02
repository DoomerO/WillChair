import {Box, Flex, Avatar, Heading, Image, Stack, Text, SimpleGrid, Spacer, Divider, Input, Textarea, ButtonGroup, Button, useToast, Select} from "@chakra-ui/react";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import HeaderToggle from "../../components/toggles/HeaderToggle";
import Footer from "../../components/Footer";
import colors from "../../colors/colors";
import testImg from "../../img/home/imgHomeMiddle.png";
import ProdInfoTableUpdt from "../../components/ProdInfoTableUpdt";
import SignNotFound from "../../components/SignNotFound";
import ChatBox from "../../components/ChatBox";
import "../../fonts/fonts.css";

import {BsFillStarFill} from "react-icons/bs";
import {HiOutlineUsers} from "react-icons/hi";
import {MdOutlineContactSupport} from "react-icons/md";

interface OwnerPageprops {
    offer : object;
    user : object;
}

const OfferPageOwner = ({offer, user} : OwnerPageprops) => {

    const [updateProduct, setUpdateProd] = useState(false)
    const navigate = useNavigate();
    const toast = useToast();
    const [chats, setChats] = useState([]);
    const [others, setOthers] = useState([]);
    const [ updateOffer, setUpdateOffer ] = useState({
        ofr_name : offer.ofr_name,
        ofr_type : offer.ofr_type,
        ofr_status : offer.ofr_status,
        ofr_desc : offer.ofr_desc,
        ofr_value : offer.ofr_value,
        ofr_parcelas : offer.ofr_parcelas
    });
    const [chatUser, setChatUser] = useState([]);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        const canceltoken = axios.CancelToken.source();
        setUpdateOffer(prev => ({...prev, 
            ofr_name : offer.ofr_name,
            ofr_type : offer.ofr_type,
            ofr_status : offer.ofr_status,
            ofr_desc : offer.ofr_desc,
            ofr_value : offer.ofr_value,
            ofr_parcelas : offer.ofr_parcelas
        }));

        if(offer)getChats();
        return () => {
            canceltoken.cancel();
        }
    }, [offer]);

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

    const handleChangeOffer = (e:ChangeEvent<HTMLInputElement>) => {
        setUpdateOffer(prev => ({...prev, [e.target.name]:e.target.value}));
        console.log(updateOffer);
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
            toast({
                position: 'bottom',
                render: () => (
                    <Stack bg="green.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", sm:"20px"}}>Oferta atualizada com sucesso!</Text>
                        <Button onClick={() => {navigate(0)}}>Atualizar a página</Button>
                    </Stack>
                )
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    async function deleteOfferOprt() {
        await axios.delete(`http://localhost:3344/offers/${offer.ofr_id}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            toast({
                position: 'bottom',
                render: () => (
                    <Stack bg="green.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", sm:"20px"}}>Oferta apagada com sucesso!</Text>
                        <Button onClick={() => {navigate("/")}}>Voltar para a Home</Button>
                    </Stack>
                )
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    async function deleteChatsOffer() {
        await axios.delete(`http://localhost:3344/chats/ofr_id/${offer.ofr_id}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            console.log(res);
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

    const optionsChat = others.map(item => {
        return <option value={others.indexOf(item)} key={item.data.user_id}>{item.data.user_name}</option>
    });

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

    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>
                <Flex bg={colors.bgWhite} direction="column" align="center" h="fit-content" pt="10vh" _dark={{bg : colors.bgWhite_Dark}}>

                    <Flex direction={{base:"column", sm:"row"}} h={{base:"fit-content", sm:"50vh"}} w="90%">
                    <Image src={testImg} objectFit="contain" h={{base:"40vh",sm:"95%"}} w={{base:"100%", sm:"30%"}}></Image>
                    <Divider orientation="vertical" ml="2.5" mr="2.5" display={{base:"none", sm:"inherit"}}/>
                        <Stack w={{base:"100%", sm:"65%"}} h="100%" spacing={8}>
                            <Stack direction="row">
                                <Input type="text" placeholder={offer.ofr_name} name="ofr_name" _placeholder={{color : colors.colorFontBlue}}
                                variant={{base:"outline", sm:"flushed"}} fontFamily="outfit" fontSize={{base: "32px", sm: "34px"}} onChange={handleChangeOffer}/>
                            </Stack>
                            
                            <Flex direction={{base:"column", sm:"row"}} w={{base:"100%", sm:"70%"}}>
                                <SimpleGrid spacing={3} fontSize={{base:"20px", sm:"18px"}} mb="3%">
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Tipo de Oferta:</Text>
                                        <Input type="text" fontFamily="atkinson" fontSize={{base:"20px", sm:"18px"}} placeholder={offer.ofr_type} name="ofr_type"
                                        _placeholder={{color : colors.colorFontBlue}} variant={{base:"outline", sm:"flushed"}} onChange={handleChangeOffer} w={{base:"50%" ,sm:"24%"}}/>
                                    </Flex>
                                    <Flex direction="row" align="center">
                                         <Text fontFamily="atkinson" mr="5px">Status da Oferta:</Text>
                                        <Input type="text" fontFamily="atkinson" fontSize={{base:"20px", sm:"18px"}} placeholder={offer.ofr_status} name="ofr_status"
                                        _placeholder={{color : colors.colorFontBlue}} variant={{base:"outline", sm:"flushed"}} onChange={handleChangeOffer} w={{base:"50%" ,sm:"24%"}}/>
                                    </Flex>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Cidade:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontBlue}>{offer.ofr_city}</Text>
                                    </Flex>
                                </SimpleGrid>
                                <Spacer/>
                                <SimpleGrid spacing={3} fontSize={{base:"20px", sm:"18px"}}>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Valor:</Text>
                                        <Input type="number" fontFamily="atkinson" fontSize={{base:"20px", sm:"18px"}} name="ofr_value" placeholder={(offer.ofr_type == "Doação") ? "Grátis" : `R$${offer.ofr_value}`}
                                        _placeholder={{color : colors.colorFontBlue}} variant={{base:"outline", sm:"flushed"}} onChange={handleChangeOffer} w={{base:"50%", sm:"24%"}}/>
                                    </Flex>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Data:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontBlue}>{offer.ofr_postDate}</Text>
                                    </Flex>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Parcelas:</Text>
                                        <Input type="number" fontFamily="atkinson" fontSize={{base:"20px", sm:"18px"}} placeholder={offer.ofr_parcelas} name="ofr_parcelas"
                                        _placeholder={{color : colors.colorFontBlue}} variant={{base:"outline", sm:"flushed"}} onChange={handleChangeOffer} w={{base:"50%" ,sm:"24%"}}/>
                                    </Flex>
                                </SimpleGrid>
                            </Flex>
                        </Stack>
                    </Flex>

                    <Divider/>

                    <Flex direction={{base:"column", sm:"row"}} h={{base:"fit_content",sm:"50vh"}} w="90%">
                        <Stack w={{base:"100%", sm:"45%"}} h={{base:"50vh", sm:"100%"}} mt="2vh">
                            <Heading as="h3" fontFamily="outfit" fontSize={{base: "32px", sm: "34px"}} color={colors.colorFontBlue}>Descrição</Heading>
                            <Textarea placeholder={offer.ofr_desc} fontSize={{base:"20px", sm:"18px"}} name="ofr_desc" onChange={handleChangeOffer} fontFamily="atkinson" w="100%" resize="vertical" h={{base:"80%",sm:"70%"}}/>
                        </Stack>

                        <Divider orientation="vertical" mr="5%" ml="5%" display={{base:"none", sm:"inherit"}}/>

                        <Stack w={{base:"100%", sm:"45%"}} h={{base:"20vh", sm:"100%"}} fontSize={{base:"20px", sm:"18px"}} mt="2vh">
                            <Flex direction="row" align="center">
                                <Avatar name={user.user_name} src={user.user_img} mr="2%"></Avatar>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue} fontSize={{base:"22px", sm:"20px"}} mr="2%">{user.user_name}</Text>
                                <BsFillStarFill fill={colors.colorFontBlue}/>
                                <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}} fontSize={{base:"22px", sm:"20px"}}>{(user.user_nota) ? user.user_nota : 0.0}</Text>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">Email:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue}>{user.user_email}</Text>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">Telefone:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue}>{user.user_phone}</Text>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">CEP:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue}>{user.user_CEP}</Text>
                            </Flex>
                        </Stack>
                    </Flex>
                    <Divider/>
                    <Flex align="center" direction="column" h="fit-content" w="100%" mt="3%" mb="3%">
                        <ProdInfoTableUpdt update={updateProduct} ofr_id={offer.ofr_id}/>
                    </Flex>
                    <Divider/>

                    <Flex w="100%" h="fit-content" mt="3%" mb="3%" align="center" direction="column"
                    onClick={console.log(chatUser)}>
                        <Stack mb="3%" direction={{base:"column", sm:"row"}} align="center" spacing={2} fontSize={{base:"32px", sm:"30px"}}>
                            <Heading noOfLines={1} textAlign="center" color={colors.colorFontDarkBlue}  as="h1" fontFamily="outfit" _dark={{color: colors.colorFontDarkBlue_Dark}}>Chat com </Heading>
                            <Select placeholder="usuário interessado" variant="flushed" w="fit-content" color={colors.colorFontDarkBlue}  
                            fontFamily="outfit" fontSize={{base:"32px", sm:"30px"}} _dark={{color: colors.colorFontDarkBlue_Dark}} fontWeight="bold" onChange={handleChangeSelect}>
                                {optionsChat}
                            </Select>
                        </Stack>
                        {(chats.length == 0) ? <SignNotFound msg="Parece que não há nenhum contato iniciado nessa oferta..." icon={<MdOutlineContactSupport size="45%"/>}/> :
                        (selected) ? <ChatBox chat_id={chatUser.chatId.chatId} other={chatUser.data} user_id={offer.User_user_id}/> : <SignNotFound msg="Selecione um usuário interessado para acessar o chat com ele!" icon={<HiOutlineUsers size="45%"/>}></SignNotFound>}
                    </Flex>

                    <Flex w="100%" h="fit-content" align="center" direction="column" bg={colors.veryLightBlue} _dark={{bg : colors.veryLightBlue_Dark}} pb="5vh">
                        <Heading noOfLines={1} mt="3%" mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{base: "32px", sm: "30px"}} noOfLines={{base:2, sm:1}} as="h1" fontFamily="outfit" _dark={{color: colors.colorFontDarkBlue_Dark}}>O que deseja fazer com a Oferta?</Heading>
                        <ButtonGroup gap={5}>
                            <Button colorScheme="linkedin" variant="solid" onClick={() => {updateOfferOprt()}}>Atualizar</Button>
                            <Button colorScheme="linkedin" variant="solid" onClick={() => { toast({
                                position: 'bottom',
                                render: () => (
                                    <Stack bg="red.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", sm:"20px"}}>Certeza que deseja apagar sua Oferta?</Text>
                                        <Stack direction="row">
                                            <Button onClick={() => {deleteChatsOffer(); deleteOfferOprt(); toast.closeAll()}}>Sim</Button>
                                            <Button onClick={() => {toast.closeAll()}}>Não</Button>    
                                        </Stack>
                                    </Stack>
                                )
                            })}}>Apagar</Button>
                        </ButtonGroup>
                    </Flex>
                </Flex>
            <Footer/>
        </Box>
    )
}

export default OfferPageOwner;