import {Box, Heading, Flex, Input, InputGroup, InputRightAddon, Stack, TabPanel, Tabs, TabPanels} from '@chakra-ui/react';
import {useState, useEffect} from 'react';

import decode from '../components/decoderToken';
import HeaderLoged from '../components/HeaderLoged';
import Footer from '../components/Footer';
import CardOffer from '../components/OfferCard';
import OfferList from '../components/OfferList';
import axios from 'axios';

//icons
import {BiSearchAlt} from 'react-icons/bi';
import SignNotFound from '../components/SignNotFound';



const HomeProd = () => {

    const [closeOffers, setClose] = useState([]);
    const [user, setUser] = useState(decode(localStorage.getItem("token")));
    const [userQuery, setQuery] = useState([]);

    async function queryCloseOffers() {
        await axios.get(`http://localhost:3344/offers/query/${"user_city"}/${userQuery.user_city}`, {headers: {
            authorization : "Bearer " + localStorage.getItem("token")
        }}).then(res => {
            setClose(res.data);
            console.log(res)
        }).catch(error => {
            console.log(error);
        })
    }

    async function queryUser() {
        await axios.get(`http://localhost:3344/users/email/${user.email}`, {headers: {
            authorization : "Bearer " + localStorage.getItem("token")
        }}).then(res => {
            setQuery(res.data[0]);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        queryUser();
    }, []);

    useEffect(() => {
        queryCloseOffers();
    }, [userQuery]); 

    const renderOffers = closeOffers.map(item => {
        return <CardOffer 
        title={item.ofr_name} 
        composition={item.prod_composition} 
        condition={item.prod_status} 
        img={item.prod_img} 
        value={item.ofr_value} 
        type={item.prod_type}
        key={item.ofr_id}/>
    });

    const signNotFound = () => {
        return <p>Cu</p>
    }

    return (
        <Box w="100%" h="100%">
            <HeaderLoged name={user.name} img={""}/>

            <Flex bg="#F7F9FC" w='100%' h='70vh' align="center" _dark={{bg:'#484A4D'}}>
                <Flex w="100%" direction="column" align="center">
                    <Heading color='#2D3748' as='h1' fontSize={{base: "36px", sm: "30px"}} _dark={{color:"#0D87d8"}} mb="5%">O que deseja encontrar?</Heading>
                    <InputGroup display="flex" zIndex={1} w="50%">    
                        <Input placeholder='Busque as melhores ofertas aqui!' bg="#eee" borderRightColor="#000"/>
                        <InputRightAddon children={<BiSearchAlt/>} bg="#eee"/>
                    </InputGroup> 
                </Flex>
            </Flex>

            <Flex bg="#fff" h='fit-content' align="center" direction="column" _dark={{bg:'#4f4f4f'}} pb='5vh'>
                <Heading color='#2D3748' as='h1' fontSize={{base: "36px", sm: "30px"}} _dark={{color:"#0D87d8"}} mt="3%" mb="5%"
                onClick={() => {console.log(userQuery)}}>Confira as ofertas perto de você</Heading>
                {(closeOffers.length > 0) ? <OfferList component={renderOffers}/> : <SignNotFound msg="Parece que não há equipamentos registrados em sua cidade..."/>}

            </Flex>

            <Footer/>
            
        </Box>
    );
}

export default HomeProd;