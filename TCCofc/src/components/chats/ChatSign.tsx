import { useState, useEffect } from 'react';
import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import "../../fonts/fonts.css";
import colors from '../../colors/colors';

interface chatSignProps {
    offerId? : number,
    chat? : object,
    click : React.MouseEventHandler<HTMLDivElement>
}

const ChatSign =  ({offerId, chat, click} : chatSignProps) => {

    const [offer, setOffer] = useState([]);
    const [user, setUser] = useState([]);

    async function getOfferChat() {
        await axios.get(`http://localhost:3344/offers/id/${offerId}`).then((res) => {
            setOffer(res.data[0]);
        }).catch((error) => {
            console.log(error)
        })
    }

    async function getUser(id : number) {
        await axios.get(`http://localhost:3344/users/id/${id}`).then((res) => {
            setUser(res.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if(offerId) getOfferChat();
    }, [offerId])

    useEffect(() => {
        if(offer.ofr_id) getUser(offer.User_user_id);
    }, [offer])

    useEffect(() => {
        if(chat.chat_id) getUser(chat.User_user_id);
    }, [chat])

    return (
        <Flex direction="column" onClick={click} bg="#0000" h="fit-content" p="5%" w="100%" fontFamily="outfit" _hover={{bg:"#ccc3", _dark:{bg:"#34344530"}}}>
            <Flex direction={"row"} align="center"><Text color={colors.colorFontBlue} w={(offerId) ? "38%" : "100%"}>{(offerId) ? "Oferta:" : "Falando com:"}</Text><Text noOfLines={1} w="100%">{(offerId) ? offer.ofr_name : ""}</Text></Flex>
            <Divider orientation='horizontal'/>
            <Flex direction="row" align="center" mt="2%">
                <Avatar size="sm" src={(user.user_img) ? String.fromCharCode(...new Uint8Array(user.user_img.data)) : ""} name={user.user_name}></Avatar>
                <Text ml="2%">{user.user_name}</Text>
            </Flex>  
        </Flex>
    )
}

export default ChatSign