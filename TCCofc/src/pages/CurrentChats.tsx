import { Box, Flex, Stack, Select, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, UnorderedList, ListItem } from "@chakra-ui/react"
import { ChangeEvent, useEffect, useState } from "react";
import decode from "../components/code/decoderToken";
import axios from "axios";

import HeaderToggle from "../components/toggles/HeaderToggle";
import Footer from "../components/Footer";
import SignAdaptable from "../components/signs/SignAdaptable";
import ChatSignList from "../components/chats/ChatSignList";
import ChatSign from "../components/chats/ChatSign";
import Loading from "../components/toggles/Loading";

import { TbMessageCircleSearch } from "react-icons/tb";
import '../fonts/fonts.css';
import colors from "../colors/colors";
import { MdOutlineBusinessCenter, MdOutlineContactSupport } from "react-icons/md";
import ChatSquare from "../components/chats/ChatSquare";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {User, Offer, UserToken, ChatProps} from '../components/code/interfaces';
import serverUrl from "../components/code/serverUrl";

const CurrentChats = () => {

    const [userToken, setToken] = useState<UserToken>({});
    const [user, setUser] = useState<User>({});
    const [userOffer, setOffers] = useState<Offer[]>([]);
    const [chatsOthers, setChatsOthers] = useState<ChatProps[]>([]);
    const [chatsOwn, setChatsOwn] = useState<ChatProps[]>([]);
    const [erase, setErase] = useState(false);
    const [selectedChat, setSlctChat] = useState(0);
    const [selectedOffer, setSlctOffer] = useState(0);
    const [loading, isLoading] = useState(true);

    async function getUser() {
        await axios.get(`${serverUrl}/users/email/${userToken.email}`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then((res) => {
            setUser(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getOffers() {
        await axios.get(`${serverUrl}/offers/user/${userToken.email}`).then((res) => {
            setOffers(res.data);
            isLoading(false);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getChatsOthers() {
        await axios.get(`${serverUrl}/chats/user/${user.user_id}`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then((res) => {
            setChatsOthers(res.data);
        }).catch((error) => {
            console.log(error)
        });
    }

    async function getChatsOwn(id: number) {
        await axios.get(`${serverUrl}/chats/offer/${id}`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then((res) => {
            setChatsOwn(res.data);
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        const test = localStorage.getItem("token");
        if (test) {
            const token = decode(test)
            setToken(token);
        }
    }, [])
    
    useEffect(() => {
        if(userToken.email) getUser();
    }, [userToken])

    useEffect(() => {
        if (user.user_id) {
            getChatsOthers();
            getOffers();
        }
    }, [user]);

    useEffect(() => {
        if (selectedOffer != 0) {
            getChatsOwn(selectedOffer);
        }
        setSlctChat(0);
    }, [selectedOffer]);

    const handleSlctChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSlctOffer(parseInt(e.target.value));
    }

    useEffect(() => {
        if (erase) setErase(false);
    }, [erase])

    const renderChatsOthers = chatsOthers.map(item => {
        return <ChatSign offerId={item.Offer_ofr_id} click={() => { setSlctChat(item.chat_id ?? 0); setErase(!erase) }} key={item.chat_id} />
    })

    const renderChatsOwner = chatsOwn.map(item => {
        return <ChatSign chat={item} click={() => { setSlctChat(item.chat_id ?? 0); setErase(!erase) }} key={item.chat_id} />
    })

    const renderOfferOptions = userOffer.map(item => {
        return <option key={item.ofr_id} value={item.ofr_id}>{item.ofr_name}</option>
    })

    return (
        (loading) ? <Loading/> : <Box w="100%" h="100%">
            <HeaderToggle />
            <Flex direction="row" w="100%" h="100vh">
                <Stack w={{base:"100%" , md:"25%"}} bg={colors.bgWhite} _dark={{ bg: colors.bgWhite_Dark, borderRight: {base:"none", md:"1px solid #fff"} }} h="100%" borderRight={{base:"none", md:"1px solid #1972d6"}} align="center" display={{base: (selectedChat) ? "none" : "flex", md:"flex"}}>
                    <Flex pb="4%" direction="row" justifyContent="center" align="center" pt="10vh" w="100%" textAlign="center" bg="#1972d6">
                        <Select onChange={handleSlctChange} w="80%" variant="flushed" fontSize={{ base: "26px", md: "29px" }} fontFamily="outfit" color="#fff" _focus={{ color: colors.colorFontDarkBlue, _dark: { color: "#fff" } }}>
                            <option value={0}>Suas Conversas</option>
                            {renderOfferOptions}
                        </Select>
                        <Popover placement='top-start'>
                            <PopoverTrigger><Flex p="1%" _hover={{ bg: "#fff3" }} borderRadius="20px"><AiOutlineQuestionCircle size="5vh" color="#fff" /></Flex></PopoverTrigger>
                            <PopoverContent w={{ base: "100vw", md: '50vw' }} bg={colors.bgWhite} _dark={{ bg: colors.bgWhite_Dark, border: "2px solid #fff" }} border="2px solid #000">
                                <PopoverHeader fontWeight='semibold' bg={colors.colorFontBlue} color="#fff" borderBottom="2px solid #000" _dark={{ borderBottom: "2px solid #fff" }}><Flex direction="row" align="center">
                                    <Box borderRadius="100%" w="1px" h="1px" p="1.5%" bg="#fff" mr="1.5%" />
                                    Como usar a página de chat?
                                </Flex></PopoverHeader>
                                <PopoverArrow bg={colors.colorFontBlue} borderTop="2px solid #000" borderLeft="2px solid #000" /><PopoverCloseButton color="#fff" />
                                <PopoverBody color="#000" _dark={{ color: "#fff" }}>
                                    <Flex textAlign="justify">
                                        <UnorderedList>
                                            <ListItem>Clique na esquerda deste botão e você poderá selecionar uma de suas ofertas para acompanhar as conversas iniciadas nela.</ListItem>
                                            <ListItem>Caso deseje ver as conversas iniciadas por você em demais ofertas selecione "Suas Conversas", e você as verá! </ListItem>
                                            <ListItem>Clique em uma das caixas geradas abaixo para abrir uma tela de chat. Lá você poderá enviar mensagens!</ListItem>
                                        </UnorderedList>
                                    </Flex>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Flex>
                    {(selectedOffer == 0) ?
                        (chatsOthers.length > 0) ? <ChatSignList component={renderChatsOthers} /> : <SignAdaptable msg="Aparentemente, você não possuí nenhuma conversa... Procure uma oferta interessante e comece alguma!" icon={<TbMessageCircleSearch size="45%" />} bgType="none" /> :
                        (chatsOwn.length > 0) ? <ChatSignList component={renderChatsOwner} /> : <SignAdaptable msg="Parece que ninguém se interessou ainda pela sua oferta. Espere um tempo! Garantimos que alguém vai te contatar!" icon={<MdOutlineContactSupport size="45%" />} bgType="none" />}
                </Stack>

                <Flex w={{base:"100%", md:"75%"}} display={{base:(selectedChat) ? "flex" : "none", md:"flex"}} align="center" justifyContent="center" bg={colors.bgWhite} _dark={{ bg: colors.bgWhite_Dark }} h="100%" direction="column">
                    {(selectedChat === 0) ? <SignAdaptable msg="Escolha alguma das ofertas que você se interessou para poder negociar com seu dono. Assim você vai poder trocar suas mensagens aqui" icon={<MdOutlineBusinessCenter size="25%" />} bgType="none" width="95%" />
                        : (erase) ? null : <ChatSquare chat_id={selectedChat} user_id={user.user_id ?? 0} isOwner={(selectedOffer == 0) ? false : true} end={() => { setSlctChat(0) }} />}
                </Flex>
            </Flex>
            <Footer />
        </Box>
    )
}

export default CurrentChats;

