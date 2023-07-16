import {Box, Heading, Flex, Input, InputGroup, InputRightAddon} from '@chakra-ui/react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../styles/alice-carousel.css';
import {useState, useEffect} from 'react';

import decode from '../components/decoderToken';
import HeaderToggle from '../components/toggles/HeaderToggle';
import Footer from '../components/Footer';
import CardOffer from '../components/offerCards/OfferCard';
import OfferList from '../components/offerCards/OfferList';
import SignNotFound from '../components/SignNotFound';
import SignNotFoundButton from '../components/SignNotFoundButton';
import SlideMsg from '../components/SlideMsg';
import axios from 'axios';

//icons
import {BiSearchAlt, BiAccessibility} from 'react-icons/bi';
import {MdOutlineSearchOff} from "react-icons/md";
import {BsPencil} from "react-icons/bs";
import {RiEmpathizeLine} from "react-icons/ri";
import {GiBrokenBone} from "react-icons/gi";

import "../fonts/fonts.css";
import colors from "../colors/colors";

const HomeProd = () => {

    const [closeOffers, setClose] = useState([]);
    const [userOffers, setUserOffers] = useState([]);
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
    };

    async function queryUserOffers() {
        await axios.get(`http://localhost:3344/offers/user/${user.email}`, {headers: {
            authorization : "Bearer " + localStorage.getItem("token")
        }}).then(res => {
            setUserOffers(res.data);
            console.log(res)
        }).catch(error => {
            console.log(error);
        })
    };

    async function queryUser() {
        await axios.get(`http://localhost:3344/users/email/${user.email}`, {headers: {
            authorization : "Bearer " + localStorage.getItem("token")
        }}).then(res => {
            setQuery(res.data[0]);
        }).catch(error => {
            console.log(error);
        })
    };

    useEffect(() => {
        queryUser();
    }, []);

    useEffect(() => {
        queryCloseOffers();
        queryUserOffers();
    }, [userQuery]); 

    const renderCloseOffers = closeOffers.map(item => {
        return <CardOffer 
        title={item.ofr_name} 
        composition={item.prod_composition} 
        condition={item.prod_status} 
        img={item.prod_img} 
        value={item.ofr_value} 
        type={item.prod_type}
        key={item.ofr_id}/>
    });

    const renderUserOffers = userOffers.map(item => {
        return <CardOffer 
        title={item.ofr_name} 
        composition={item.prod_composition} 
        condition={item.prod_status} 
        img={item.prod_img} 
        value={item.ofr_value} 
        type={item.prod_type}
        key={item.ofr_id}/>
    });

    const slideItems = [
        <SlideMsg msg="Caso precise de equipamentos de acessibilidade e, não os acha em lugar algum,
        procurar em um centro de assistência social pode ser de grande ajuda! Mas lembre, o Willchair está aqui para te ajudar
        nestes momentos! ♥" 
        icon={<BiAccessibility size="30vw"/>} title="Fique atento!"/>,

        <SlideMsg msg="Muitas vezes, é muito complicado cuidar de pessoas especiais. Principalmente para quem
        não está acostumado. Sabemos desses desafios. Então saiba que nós do Willchair te apoiamos como cuidador e,
        estamos aqui para facilitar à você. Quando estiver cansativo, veja os momentos incríveis que você vive com aquele 
        que você cuida. Garantimos que eles fazem valer a pena!"
        icon={<RiEmpathizeLine size="30vw"/>} title="Ás vezes é difícil..."/>,

        <SlideMsg msg="Muitos que procuram equipamentos de acessibilidade não possuem necessáriamente uma deficiência física.
        Então, para vocês que sofreram um acidente ou necessitam dos equipamentos por causa de uma doença, sempre se lembrem que, em breve,
        sua dor vai passar. E, você vai poder novamente aproveitar a vida como antes. Só não esquece de colocar seu equipamento no Willchair para
        poder ajudar outras pessoas! ☺"
        icon={<GiBrokenBone size="30vw"/>} title="Acidentes acontecem..."/>
    ]

    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>

            <Flex bg={colors.veryLightBlue} w='100%' h='70vh' align="center" _dark={{bg:colors.veryLightBlue_Dark}}>
                <Flex w="100%" direction="column" align="center">
                    <Heading color={colors.colorFontDarkBlue} as='h1' fontSize={{base: "36px", sm: "30px"}} fontFamily="outfit" _dark={{color:colors.colorFontDarkBlue_Dark}} mb="5%">O que deseja encontrar?</Heading>
                    <InputGroup display="flex" zIndex={1} w="50%">    
                        <Input placeholder='Busque as melhores ofertas aqui!' bg="#eee" borderRightColor="#000" _dark={{bg:"#0000", borderRightColor:"#fff", color: "#fff", _placeholder : {color: "#dfdfdf"}}}/>
                        <InputRightAddon children={<BiSearchAlt/>} bg="#eee" _dark={{bg:"#0000"}}/>
                    </InputGroup> 
                </Flex>
            </Flex>

            <Flex bg={colors.bgWhite} h='fit-content' align="center" direction="column" _dark={{bg:colors.bgWhite_Dark}}>
                <Heading color={colors.colorFontDarkBlue} as='h1' fontSize={{base: "36px", sm: "30px"}} _dark={{color:colors.colorFontDarkBlue_Dark}} mt="3%" mb="5%"
                onClick={() => {console.log(userQuery)}} fontFamily="outfit">Confira as ofertas perto de você</Heading>
                {(closeOffers.length > 0) ? <OfferList component={renderCloseOffers}/> : <SignNotFound msg="Parece que não há equipamentos registrados em sua cidade..." icon={<MdOutlineSearchOff size="45%"/>}/>}
            </Flex>

            <Flex bg={colors.veryLightBlue} w='100%' h='fit-content' align="center" _dark={{bg:colors.veryLightBlue_Dark}} direction="column">
                <Heading color={colors.colorFontDarkBlue} as='h1' fontFamily="outfit" fontSize={{base: "36px", sm: "30px"}} _dark={{color: colors.colorFontDarkBlue_Dark}} mt="3%" mb="5%">
                    Ofertas criadas por você
                </Heading>
                {(userOffers.length > 0) ? <OfferList component={renderUserOffers}/> : <SignNotFoundButton msg="Parece que você não possui ofertas registradas...Que tal criar alguma?!" icon={<BsPencil size="45%"/>} btnText='Criar Oferta' btnPath='/createoffer'/>} 
            </Flex>

            <Flex bg={colors.veryLightBlue} h="fit-content" align="center" direction="column" _dark={{bg:colors.veryLightBlue_Dark}}>
                <Heading color={colors.colorFontBlue} as="h1" fontSize={{base: "36px", sm:"30px"}} mt="3%" mb="5%" fontFamily="outfit">
                    Dicas para você
                </Heading>
                <Flex w="80%" mb="3%">
                    <AliceCarousel mouseTracking items={slideItems} autoPlay infinite
                    autoPlayInterval={4000} autoPlayStrategy='all' disableButtonsControls/>
                </Flex>  
            </Flex>

            <Footer/>           
        </Box>
    );
}

export default HomeProd;