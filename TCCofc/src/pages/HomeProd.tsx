//Componentes externos e React
import {Box, Heading, Flex, Input, InputGroup, InputRightAddon, Stack} from '@chakra-ui/react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../styles/alice-carousel.css';
import {useState, useEffect, ChangeEvent} from 'react';
import axios from 'axios';

//componentes Willchair
import decode from '../components/decoderToken';
import HeaderToggle from '../components/toggles/HeaderToggle';
import Footer from '../components/Footer';
import CardOffer from '../components/offerCards/OfferCard';
import OfferList from '../components/offerCards/OfferList';
import SignNotFound from '../components/SignNotFound';
import SignNotFoundButton from '../components/SignNotFoundButton';
import SlideMsg from '../components/SlideMsg';

//icons
import {BiSearchAlt, BiAccessibility} from 'react-icons/bi';
import {MdOutlineSearchOff} from "react-icons/md";
import {BsPencil} from "react-icons/bs";
import {RiEmpathizeLine} from "react-icons/ri";
import {GiBrokenBone} from "react-icons/gi";

//outros
import "../fonts/fonts.css";
import colors from "../colors/colors";

const HomeProd = () => {

    const [closeOffers, setClose] = useState([]); //Lista de ofertas próxiams por cidade
    const [userOffers, setUserOffers] = useState([]); //Lista de ofertas do usuário logado
    const [user, setUser] = useState(decode(localStorage.getItem("token"))); //usuário do token decodificado
    const [userQuery, setQuery] = useState([]); //usuário logado pelo banco de dados, pegar cidade
    const [offerQuery, setOffer] = useState([]); //lista de ofertas no banco de dados, pesquisa por nome
    const [search, setSearch] = useState(""); //valor input de barra de pesquisa
    let numOptRender = 0; //número de opções renderizadas

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => { //evento de change no input de pesquisa
        e.preventDefault();
        setSearch(e.target.value);
    }

    async function queryCloseOffers() { //get de ofertas próximas no banco de dados
        await axios.get(`http://localhost:3344/offers/query/${"user_city"}/${userQuery.user_city}`).then(res => {
            setClose(res.data);
        }).catch(error => {
            console.log(error);
        })
    };

    async function queryUserOffers() { //get de ofertas do usuário no banco de dados
        await axios.get(`http://localhost:3344/offers/user/${user.email}`, {headers: {
            authorization : "Bearer " + localStorage.getItem("token")
        }}).then(res => {
            setUserOffers(res.data);
        }).catch(error => {
            console.log(error);
        })
    };

    async function queryUser() { //get do usuário à partir do token
        await axios.get(`http://localhost:3344/users/email/${user.email}`, {headers: {
            authorization : "Bearer " + localStorage.getItem("token")
        }}).then(res => {
            setQuery(res.data[0]);
        }).catch(error => {
            console.log(error);
        })
    };

    async function queryOffers() { //get de todas as ofertas
        await axios.get(`http://localhost:3344/offers`).then(res => {
            setOffer(res.data);
            console.log(res)
        }).catch(error => {
            console.log(error);
        })
    };

    useEffect(() => { //useEffect para inicialização da pégina
        queryUser();
        queryOffers();
    }, []);

    useEffect(() => { //useEffect após get do usuário
        queryCloseOffers();
        queryUserOffers();
        
    }, [userQuery]);

    const renderCloseOffers = closeOffers.map(item => { //lista de ofertas próximas renderizadas
        return <CardOffer 
        title={item.ofr_name} 
        composition={item.prod_composition} 
        condition={item.prod_status} 
        img={item.prod_img} 
        value={item.ofr_value} 
        type={item.prod_type}
        key={item.ofr_id}/>
    });

    const renderUserOffers = userOffers.map(item => { //lista de ofertas do usuário renderizadas
        return <CardOffer 
        title={item.ofr_name} 
        composition={item.prod_composition} 
        condition={item.prod_status} 
        img={item.prod_img} 
        value={item.ofr_value} 
        type={item.prod_type}
        key={item.ofr_id}/>
    });

    const renderSearchOptions = offerQuery.map(item => { //lista de opções de pesquiza renderizada
        if(search == ""){
            return <div key={item.ofr_id}></div>
        }
        if (item.ofr_name.match(search) && numOptRender < 6) {
            numOptRender += 1;
            return <Flex key={item.ofr_id} bg="#eee" w={{base:"80%", sm:"50%"}} p={2.5} color={colors.colorFontBlue}
            _hover={{bg: "#bfbfbf"}}>
                {item.ofr_name}
            </Flex>
        }
    })

    const slideItems = [ //itens para renderização no slide
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
                    <InputGroup display="flex" zIndex={1} w={{base:"80%", sm:"50%"}}>    
                        <Input placeholder='Busque as melhores ofertas aqui!' bg="#eee" borderRightColor="#000" _dark={{bg:"#0000", borderRightColor:"#fff", color: "#fff", _placeholder : {color: "#dfdfdf"}}} onChange={handleChange}/>
                        <InputRightAddon children={<BiSearchAlt/>} bg="#eee" _dark={{bg:"#0000"}}/>
                    </InputGroup>
                    <Stack position="absolute" top={{base:"41vh", sm:"45vh"}} w="inherit" align="center" spacing={0}>
                        {renderSearchOptions}
                    </Stack> 
                </Flex>
            </Flex>

            <Flex bg={colors.bgWhite} h='fit-content' align="center" direction="column" _dark={{bg:colors.bgWhite_Dark}}>
                <Heading color={colors.colorFontDarkBlue} as='h1' fontSize={{base: "36px", sm: "30px"}} _dark={{color:colors.colorFontDarkBlue_Dark}} mt="3%" mb="5%"
                fontFamily="outfit" textAlign="center">Confira as ofertas perto de você</Heading>
                {(closeOffers.length > 0) ? <OfferList component={renderCloseOffers}/> : <SignNotFound msg="Parece que não há equipamentos registrados em sua cidade..." icon={<MdOutlineSearchOff size="45%"/>}/>}
            </Flex>

            <Flex bg={colors.veryLightBlue} w='100%' h='fit-content' align="center" _dark={{bg:colors.veryLightBlue_Dark}} direction="column">
                <Heading color={colors.colorFontDarkBlue} as='h1' fontFamily="outfit" fontSize={{base: "36px", sm: "30px"}} _dark={{color: colors.colorFontDarkBlue_Dark}} mt="3%" mb="5%">
                    Ofertas criadas por você
                </Heading>
                {(userOffers.length > 0) ? <OfferList component={renderUserOffers}/> : <SignNotFoundButton msg="Parece que você não possui ofertas registradas...Que tal criar alguma?!" icon={<BsPencil size="45%"/>} btnText='Criar Oferta' btnPath='/createoffer'/>} 
            </Flex>

            <Flex bg={colors.bgWhite} h="fit-content" align="center" direction="column" _dark={{bg:colors.bgWhite_Dark}}>
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