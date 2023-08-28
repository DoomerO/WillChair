import {Box, Flex, Text, Grid, Center, GridItem, Stack, Divider, Heading} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import decode from "../components/code/decoderToken";
import axios from "axios";

import HeaderToggle from "../components/toggles/HeaderToggle";
import Footer from "../components/Footer";
import SignAdaptable from "../components/signs/SignAdaptable";
import ChatSignList from "../components/chats/ChatSignList";
import ChatSign from "../components/chats/ChatSign";

import { TbMessageCircleSearch } from "react-icons/tb";
import '../fonts/fonts.css';
import colors from "../colors/colors";
import { MdOutlineBusinessCenter } from "react-icons/md";
import ChatBox from "../components/chats/ChatBox";
import ChatSquare from "../components/chats/ChatSquare";  


const CurrentChats = () => {

    const [userToken, setToken] = useState(decode(localStorage.getItem("token")));
    const [user, setUser] = useState([]);
    const [chatsOthers, setChatsOthers] = useState([]);
    const [selectedChat, setSlctChat] = useState(0)

    async function getUser() {
        await axios.get(`http://localhost:3344/users/email/${userToken.email}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setUser(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getChatsOthers() {
        await axios.get(`http://localhost:3344/chats/user/${user.user_id}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setChatsOthers(res.data);
        }).catch((error) => {
            console.log(error)
        });
    }

    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {
        if(user.user_id) {
            getChatsOthers();
        }
    }, [user])

    const renderChatsOthers = chatsOthers.map(item => {
        return <ChatSign offerId={item.Offer_ofr_id} click={() => {setSlctChat(item.chat_id)}} key={item.chat_id}/>
    }) 

    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>
                <Flex direction="row" w="100%" h="100vh">
                    <Stack w="25%" bg={colors.bgWhite} _dark={{bg : colors.bgWhite_Dark, borderRight : "1px solid #fff"}} h="100%" borderRight="1px solid #1972d6" align="center"> 
                        <Heading as="h2" pb="4%" pt="10vh" fontSize={{base: "32px", sm: "29px"}} fontFamily="outfit" w="100%" textAlign="center" bg="#1972d6" color="#fff">Suas conversas</Heading>
                        {(chatsOthers.length > 0) ? <ChatSignList component={renderChatsOthers}/> : <SignAdaptable msg="Aparentemente, você não possuí nenhuma conversa... Procure uma oferta interessante e comece alguma!" icon={<TbMessageCircleSearch size="45%"/>} bgType="none"/>}
                    </Stack>
                    
                    <Flex w="75%" align="center" justifyContent="center" bg={colors.bgWhite} _dark={{bg : colors.bgWhite_Dark}} h="100%" direction="column">
                        {(selectedChat === 0) ? <SignAdaptable msg="Escolha alguma das ofertas que você se interessou para poder negociar com seu dono. Assim você vai poder trocar suas mensagens aqui" icon={<MdOutlineBusinessCenter size="25%"/>} bgType="none" width="95%"/> : <ChatSquare chat_id={selectedChat} user_id={user.user_id} end={() => {setSlctChat(0)}}/>}
                    </Flex>
                </Flex>
            <Footer/>
        </Box>
    )
}

export default CurrentChats;

