import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import decode from "../components/code/decode";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
    const [adm, setAdm] = useState(decode(localStorage.getItem("token")));
    
    return (
        <Box w="100%" h="100%">
            <Header adm={adm}/>
            <Flex>
                Cu
            </Flex>
            <Footer/>
        </Box>
    )
}

export default Home;
