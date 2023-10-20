//Componentes externos e React
import { Box, Heading, Flex, Input, InputGroup, InputRightAddon, Stack } from '@chakra-ui/react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../styles/alice-carousel.css';
import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//componentes Willchair
import decode from '../components/code/decoderToken';
import HeaderToggle from '../components/toggles/HeaderToggle';
import Footer from '../components/Footer';
import CardOffer from '../components/offerCards/OfferCard';
import OfferList from '../components/offerCards/OfferList';
import SignNotFound from '../components/signs/SignNotFound';
import SignNotFoundButton from '../components/signs/SignNotFoundButton';
import SlideMsg from '../components/SlideMsg';
import Loading from '../components/toggles/Loading';

//icons
import { BiSearchAlt, BiAccessibility } from 'react-icons/bi';
import { MdOutlineSearchOff } from "react-icons/md";
import { BsPencil } from "react-icons/bs";
import { RiEmpathizeLine } from "react-icons/ri";
import { GiBrokenBone } from "react-icons/gi";
import { TbMessageCircleSearch } from "react-icons/tb";

//outros
import "../fonts/fonts.css";
import colors from "../colors/colors";
import { User, Offer, UserToken, ChatProps } from "../components/code/interfaces";
import { Link } from 'react-router-dom';
import { PiHandshake } from 'react-icons/pi';
import serverUrl from '../components/code/serverUrl';

const HomeProd = () => {

    const [user, setUser] = useState<UserToken>({}); //usuário do token decodificado
    const [userQuery, setQuery] = useState<User>({}); //usuário logado pelo banco de dados, pegar cidade
    const [offerQuery, setOffer] = useState<Offer[]>([]); //lista de ofertas no banco de dados, pesquisa por nome
    const [search, setSearch] = useState(""); //valor input de barra de pesquisa
    const [chats, setChats] = useState<ChatProps[]>([])//chats criados pelo usuários
    const [loading, isLoading] = useState(true);
    const navigate = useNavigate();
    let numOptRender = 0; //número de opções renderizadas
    let optionsRenderList: string[] = [];
    let renderTest = false;
    let renderTestUser = false;
    let renderTestComp = false;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { //evento de change no input de pesquisa
        e.preventDefault();
        setSearch(e.target.value);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => { //evento de input de enter na barra de pesquisa
        if (e.key == "Enter") {
            navigate(`/search/name/${search}`);
        }
    }

    async function queryChats() { //get de ofertas próximas no banco de dados
        await axios.get(`${serverUrl}/chats/user/${userQuery.user_id}`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then(res => {
            setChats(res.data);
            isLoading(false);
        }).catch(error => {
            console.log(error);
        })
    };

    async function queryUser() { //get do usuário à partir do token
        await axios.get(`${serverUrl}/users/email/${user.email}`, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setQuery(res.data);
        }).catch(error => {
            console.log(error);
        })
    };

    async function queryOffers() { //get de todas as ofertas
        await axios.get(`${serverUrl}/offers`).then(res => {
            setOffer(res.data);
        }).catch(error => {
            console.log(error);
        })
    };

    useEffect(() => {
        const test = localStorage.getItem("token");
        if (test) {
            const token = decode(test);
            setUser(token);
        }
    }, [])

    useEffect(() => { //useEffect para inicialização da página
        if (user.email) {
            queryUser();
            queryOffers();
        }
    }, [user]);

    useEffect(() => { //useEffect após get do usuário
        if (userQuery.user_id) queryChats();
    }, [userQuery]);

    const renderCloseOffers = offerQuery.map(item => { //lista de ofertas próximas renderizadas
        if (item.User_user_id === userQuery.user_id || item.ofr_status != "Livre") return <div key={item.ofr_id}></div>
        if (item.ofr_city == userQuery.user_city) {
            renderTest = true;
            return <CardOffer
                title={item.ofr_name ?? ""}
                composition={item.prod_composition ?? ""}
                condition={item.prod_status ?? ""}
                img={item.prod_img ?? ""}
                value={item.ofr_value ?? 0}
                type={item.prod_type ?? ""}
                key={item.ofr_id}
                id={item.ofr_id ?? 0} />
        }
        return <div key={item.ofr_id}></div>
    });

    const renderUserOffers = offerQuery.map(item => { //lista de ofertas do usuário renderizadas
        if (item.User_user_id === userQuery.user_id) {
            renderTestUser = true;
            return <CardOffer
                title={item.ofr_name ?? ""}
                composition={item.prod_composition ?? ""}
                condition={item.prod_status ?? ""}
                img={item.prod_img ?? ""}
                value={item.ofr_value ?? 0}
                type={item.prod_type ?? ""}
                key={item.ofr_id}
                id={item.ofr_id ?? 0} />
        }
        return <div key={item.ofr_id}></div>
    });

    const renderCompromissedOffers = offerQuery.map(item => { //lista de ofertas das quais o usuário se compromissou
        if (item.user_comp_id === userQuery.user_id) {
            renderTestComp = true;
            return <CardOffer
                title={item.ofr_name ?? ""}
                composition={item.prod_composition ?? ""}
                condition={item.prod_status ?? ""}
                img={item.prod_img ?? ""}
                value={item.ofr_value ?? 0}
                type={item.prod_type ?? ""}
                key={item.ofr_id}
                id={item.ofr_id ?? 0} />
        }
        return <div key={item.ofr_id}></div>
    });

    const renderChatsOffers = offerQuery.map(item => { //lista de ofertas com chats do usuário renderizadas
        for (const chat of chats) {
            if (chat.Offer_ofr_id == item.ofr_id) {
                return <CardOffer
                    title={item.ofr_name ?? ""}
                    composition={item.prod_composition ?? ""}
                    condition={item.prod_status ?? ""}
                    img={item.prod_img ?? ""}
                    value={item.ofr_value ?? 0}
                    type={item.prod_type ?? ""}
                    key={item.ofr_id}
                    id={item.ofr_id ?? 0} />
            }
        }
        return <div key={item.ofr_id}></div>
    });

    offerQuery.map(item => {
        for (let i = 0; i < optionsRenderList.length; i++) {
            if (item.ofr_name == optionsRenderList[i]) return <div key={item.ofr_id}></div>;
        }
        optionsRenderList.push(item.ofr_name ?? "");
    })

    const renderSearchOptions = optionsRenderList.map(item => { //lista de opções de pesquiza renderizada
        if (search == "") {
            return <div key={optionsRenderList.indexOf(item)}></div>
        }
        if (item.toUpperCase().match(search.toUpperCase()) && numOptRender < 6) {
            numOptRender += 1;
            return <Flex key={optionsRenderList.indexOf(item)} bg="#eee" w={{ base: "80%", md: "50%" }} p={2.5} color={colors.colorFontBlue}
                _hover={{ bg: "#dfdfdf" }} _dark={{ bg: "#2f2f2f", _hover: { bg: "#444" } }} onClick={() => { navigate(`/search/${"name"}/${item}`) }}>
                {item}
            </Flex>
        }
    })

    const slideItems = [ //itens para renderização no slide
        <SlideMsg msg="Caso precise de equipamentos de acessibilidade e, não os acha em lugar algum,
        procurar em um centro de assistência social pode ser de grande ajuda! Mas lembre, o Willchair está aqui para te ajudar
        nestes momentos! ♥"
            icon={<BiAccessibility size="30vw" />} title="Fique atento!" />,

        <SlideMsg msg="Muitas vezes, é muito complicado cuidar de pessoas especiais. Principalmente para quem
        não está acostumado. Sabemos desses desafios. Então saiba que nós do Willchair te apoiamos como cuidador e,
        estamos aqui para facilitar à você. Quando estiver cansativo, veja os momentos incríveis que você vive com aquele 
        que você cuida. Garantimos que eles fazem valer a pena!"
            icon={<RiEmpathizeLine size="30vw" />} title="Ás vezes é difícil..." />,

        <SlideMsg msg="Muitos que procuram equipamentos de acessibilidade não possuem necessáriamente uma deficiência física.
        Então, para vocês que sofreram um acidente ou necessitam dos equipamentos por causa de uma doença, sempre se lembrem que, em breve,
        sua dor vai passar. E, você vai poder novamente aproveitar a vida como antes. Só não esquece de colocar seu equipamento no Willchair para
        poder ajudar outras pessoas! ☺"
            icon={<GiBrokenBone size="30vw" />} title="Acidentes acontecem..." />
    ]

    return (
        (loading) ? <Loading/> : <Box w="100%" h="100%">
            <HeaderToggle />

            <Flex bg={colors.veryLightBlue} w='100%' h='70vh' align="center" _dark={{ bg: colors.veryLightBlue_Dark }}>
                <Flex w="100%" direction="column" align="center">
                    <Heading color={colors.colorFontDarkBlue} textAlign="center" as='h1' fontSize={{ base: "28px", md: "30px" }} fontFamily="outfit" _dark={{ color: colors.colorFontDarkBlue_Dark }} mb="5%">O que deseja encontrar?</Heading>

                    <InputGroup display="flex" zIndex={1} w={{ base: "80%", md: "50%" }}>
                        <Input placeholder='Busque as melhores ofertas aqui!' bg="#eee" borderRightColor="#000" _dark={{ bg: "#0000", borderRightColor: "#fff", color: "#fff", _placeholder: { color: "#dfdfdf" } }}
                            onChange={handleChange} onKeyUp={handleKeyPress} value={search} />
                        <Link to={`/search/${"name"}/${(search) ? search : "any"}`}>
                            <InputRightAddon children={<BiSearchAlt />} bg="#eee" _dark={{ bg: "#0000" }} _hover={{ bg: "#aaa", _dark: { bg: "#555" } }} />
                        </Link>
                    </InputGroup>

                    <Stack position="absolute" top={{ base: "41vh", md: "45vh" }} w="inherit" align="center" spacing={0}>
                        {renderSearchOptions}
                    </Stack>
                </Flex>
            </Flex>

            <Flex bg={colors.bgWhite} h='fit-content' align="center" direction="column" _dark={{ bg: colors.bgWhite_Dark }}>
                <Heading color={colors.colorFontDarkBlue} as='h1' fontSize={{ base: "26px", md: "30px" }} _dark={{ color: colors.colorFontDarkBlue_Dark }} mt={{base:"3vh", md:"3%"}} mb={{base:"3vh", md:"3%"}}
                    fontFamily="outfit" textAlign="center">Confira as ofertas perto de você</Heading>
                {(renderTest) ? <OfferList component={renderCloseOffers} /> : <SignNotFound msg="Parece que não há equipamentos registrados em sua cidade..." icon={<MdOutlineSearchOff size="45%" />} />}
            </Flex>

            <Flex bg={colors.veryLightBlue} w='100%' h='fit-content' align="center" _dark={{ bg: colors.veryLightBlue_Dark }} direction="column">
                <Heading textAlign="center" color={colors.colorFontDarkBlue} as='h1' fontFamily="outfit" fontSize={{ base: "26px", md: "30px" }} _dark={{ color: colors.colorFontDarkBlue_Dark }} mt={{base:"3vh", md:"3%"}} mb={{base:"3vh", md:"3%"}}>
                    Ofertas criadas por você
                </Heading>
                {(renderTestUser) ? <OfferList component={renderUserOffers} canMdNew /> : <SignNotFoundButton msg="Parece que você não possui ofertas registradas...Que tal criar alguma?!" icon={<BsPencil size="45%" />} btnText='Criar Oferta' btnPath='/create-offer/any' />}
            </Flex>

            <Flex bg={colors.bgWhite} w='100%' h='fit-content' align="center" _dark={{ bg: colors.bgWhite_Dark }} direction="column">
                <Heading textAlign="center" color={colors.colorFontDarkBlue} as='h1' fontFamily="outfit" fontSize={{ base: "26px", md: "30px" }} _dark={{ color: colors.colorFontDarkBlue_Dark }} mt={{base:"3vh", md:"3%"}} mb={{base:"3vh", md:"3%"}}>
                    Ofertas que você se interessou
                </Heading>
                {(chats.length > 0) ? <OfferList component={renderChatsOffers} /> : <SignNotFoundButton msg="Acho que você não iniciou uma negociação ainda...Vamos lá! Basta pesquisar uma oferta interessante!" icon={<TbMessageCircleSearch size="45%" />} btnText='Pesquisar' btnPath='/search/all/all' />}
            </Flex>

            <Flex bg={colors.veryLightBlue} w='100%' h='fit-content' align="center" _dark={{ bg: colors.veryLightBlue_Dark }} direction="column">
                <Heading textAlign="center" color={colors.colorFontDarkBlue} as='h1' fontFamily="outfit" fontSize={{ base: "26px", md: "30px" }} _dark={{ color: colors.colorFontDarkBlue_Dark }} mt={{base:"3vh", md:"3%"}} mb={{base:"3vh", md:"3%"}}>
                    Ofertas que você se compromissou
                </Heading>
                {(renderTestComp) ? <OfferList component={renderCompromissedOffers} /> : <SignNotFound msg="Parece que você não iniciou um compromisso em nenhuma oferta...É simples! Só combinar com o dono de uma oferta que você se interessar!" icon={<PiHandshake size="45%" />} />}
            </Flex>

            <Flex bg={colors.bgWhite} h="fit-content" align="center" direction="column" _dark={{ bg: colors.bgWhite_Dark }}>
                <Heading color={colors.colorFontBlue} textAlign="center" as="h1" fontSize={{ base: "26px", md: "30px" }} mt={{base:"3vh", md:"3%"}} mb={{base:"3vh", md:"3%"}} fontFamily="outfit">
                    Dicas para você
                </Heading>
                <Flex w="80%" mb="3%">
                    <AliceCarousel mouseTracking items={slideItems} autoPlay infinite
                        autoPlayInterval={4000} autoPlayStrategy='all' disableButtonsControls />
                </Flex>
            </Flex>

            <Footer />
        </Box>
    );
}

export default HomeProd;