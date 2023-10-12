import { useState, useEffect } from 'react';
import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import "../../fonts/fonts.css";
import colors from '../../colors/colors';
import serverUrl from '../code/serverUrl';
import { ChatProps, Offer, User } from '../code/interfaces';

interface chatSignProps {
    offerId? : number,
    chat? : ChatProps,
    click : React.MouseEventHandler<HTMLDivElement>
}

const ChatSign =  ({offerId, chat, click} : chatSignProps) => {

    const [offer, setOffer] = useState<Offer>({});
    const [user, setUser] = useState<User>({});
    const [img, setImg] = useState<any>();

    async function getOfferChat() {
        await axios.get(`${serverUrl}/offers/id/${offerId}`).then((res) => {
            setOffer(res.data[0]);
        }).catch((error) => {
            console.log(error)
        })
    }

    async function getUser(id : number) {
        await axios.get(`${serverUrl}/users/id/${id}`).then((res) => {
            setUser(res.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    async function getImg() {
        await axios.get(`${serverUrl}/users/profile/photo/${user.user_img}`, {responseType : "arraybuffer"}).then(res => {
            const buffer = new Uint8Array(res.data);
            const blob = new Blob([buffer], { type: res.headers.contentType });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setImg(reader.result);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        if(offerId) getOfferChat();
    }, [offerId])

    useEffect(() => {
        if(offer.ofr_id) getUser(offer.User_user_id ?? 0);
    }, [offer])

    useEffect(() => {
        if(chat) getUser(chat.User_user_id ?? 0);
    }, [chat])

    useEffect(() => {
        if(user.user_img) getImg();
    }, [user])

    return (
        <Flex direction="column" onClick={click} bg="#0000" h="fit-content" p="5%" w="100%" fontFamily="outfit" _hover={{bg:"#ccc3", _dark:{bg:"#34344530"}}}>
            <Flex direction={"row"} align="center"><Text color={colors.colorFontBlue} w={(offerId) ? "38%" : "100%"}>{(offerId) ? "Oferta:" : "Falando com:"}</Text><Text noOfLines={1} w="100%">{(offerId) ? offer.ofr_name : ""}</Text></Flex>
            <Divider orientation='horizontal'/>
            <Flex direction="row" align="center" mt="2%">
                <Avatar size="sm" src={(user.user_img) ? img : ""} name={user.user_name}></Avatar>
                <Text ml="2%">{user.user_name}</Text>
            </Flex>  
        </Flex>
    )
}

export default ChatSign