import HeaderToggle from "../components/toggles/HeaderToggle";
import Footer from "../components/Footer";
import {Box, Flex, Text, Grid, Center, GridItem, Stack, Divider, Heading} from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import decode from "../components/decoderToken";
import colors from "../colors/colors";
import '../fonts/fonts.css';
import SignNotFound from "../components/SignNotFound";

const CurrentChats = () => {

    const [userToken, setToken] = useState(decode(localStorage.getItem("token")));
    const [user, setUser] = useState([]);
    const [chatsOthers, setChatsOthers] = useState([]);
    const [offersInterest, setInterest] = useState([]);

    async function getUser() {
        await axios.get(`http://localhost:3344/user/email/${userToken.email}`, {
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

    async function getOffersOthers(id : number) {
        await axios.get(`http://localhost:3344/offer/id/${id}`).then((res) => {
            setInterest(prev => ([...prev, res.data]))
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

    useEffect(() => {
        if(chatsOthers) {
            for (const chat of chatsOthers) {
                getOffersOthers(chat.Offer_ofr_id)
            }
        }
    }, [chatsOthers])

    const renderOfferOthers = offersInterest.map(item => {
        return <div key={item.ofr_id}>
            {item.ofr_name}
        </div>
    }) 

    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>
                <Flex direction="row" w="100%" h="100vh">
                    <Stack w="25%" bg={colors.bgWhite} pt="5%" _dark={{bg : colors.bgWhite_Dark}} h="100%" borderRight="1px solid #000" align="center" >
                        <Heading as="h2" fontSize={{base: "32px", sm: "29px"}} fontFamily="outfit" borderBottom="1px solid #000" w="100%" textAlign="center">Suas conversas</Heading>
                        {(offersInterest.length > 0) ? renderOfferOthers : <SignNotFound msg="Você é anti-social, vai tomar no cu" icon={<div></div>}/>}
                    </Stack>
                    
                    <Flex w="75%" bg={colors.bgWhite} _dark={{bg : colors.bgWhite_Dark}} h="100%">

                    d</Flex>
                </Flex>
            <Footer/>
        </Box>
    )
}

export default CurrentChats;

