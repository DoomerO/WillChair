import { useState, useEffect } from 'react';
import { Divider, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import "../../fonts/fonts.css";
import colors from '../../colors/colors';

interface chatSignProps {
    offerId : number,
    click : React.MouseEventHandler<HTMLDivElement>
}

const ChatSign =  ({offerId, click} : chatSignProps) => {

    const [offer, setOffer] = useState([]);

    async function getOfferChat() {
        await axios.get(`http://localhost:3344/offers/id/${offerId}`).then((res) => {
            setOffer(res.data[0]);
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if(offerId) getOfferChat();
    }, [offerId])

    return (
        <Flex direction="column" onClick={click} bg="#0000" h="fit-content" p="5%" w="100%" fontFamily="outfit" _hover={{bg:"#ccc3", _dark:{bg:"#34344530"}}}>
            <Flex direction={"row"}><Text color={colors.colorFontBlue} mr="2%">Oferta :</Text><Text>{offer.ofr_name}</Text></Flex>
            <Divider orientation='horizontal'/>
            <Text>{offer.ofr_user_name}</Text>
        </Flex>
    )
}

export default ChatSign