import HeaderToggle from "../components/toggles/HeaderToggle";
import Footer from "../components/Footer";
import {Box, Flex, Text, Grid, Center} from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
import decode from "../components/decoderToken";

const CurrentChats = () => {

    const [userToken, setToken] = useState(decode(localStorage.getItem("token")));
    const [user, setUser] = useState([]);
    const [chatsOthers, setChatsOthers] = useState([]);
    const [offersIntrest, setIntrest] = useState([]);

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
        await axios.get(`http://localhost:3344/id/${id}`).then((res) => {
            setIntrest(prev => ([...prev, res.data]))
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

    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>
            <Center h="20vh"   pt="1%" bg="black" >aaaaaaaaaaaaa</Center>
            <Grid  w="50vh" h="70vh"  pt="10%">
                
            </Grid>
            <Footer/>
        </Box>
    )
}

export default CurrentChats;

