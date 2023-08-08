import { Flex, Box, Heading, Input, InputGroup, InputRightAddon, Stack, Spacer, Select, FormLabel } from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import HeaderToggle from "../components/toggles/HeaderToggle";
import Footer from "../components/Footer";
import OfferCardHorizontal from "../components/offerCards/OfferCardHorizontal";

import { BiSearchAlt } from "react-icons/bi";
import colors from "../colors/colors";
import "../fonts/fonts.css";
import { MdOutlineSearchOff } from "react-icons/md";
import SignNotFound from "../components/SignNotFound";

const Search = () => {
    const {query} = useParams();
    const {value} = useParams();

    const [newQuery, setQuery] = useState("name");
    const [search, setSearch] = useState("");
    const [reload, setReload] = useState(false);
    
    let numOptRender = 0;
    let optionsRenderList: string[] = [];

    const [consult, setConsult] = useState([]);
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();

    const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => { //evento de input de enter na barra de pesquisa
        if (e.key == "Enter") {
            navigate(`/search/${newQuery}/${search}`);
            setReload(true);
        }
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => { //evento de change no input de pesquisa
        e.preventDefault();
        setSearch(e.target.value);
    }

    const handleChangeSelect = (e:ChangeEvent<HTMLInputElement>) => { //evento de change para select
        e.preventDefault();
        setQuery(e.target.value);
        if(!newQuery) setQuery("name");
      console.log(optionsRenderList);
    }

    async function queryConsult() { 
        if(value == "all" && query == "all") {
            await axios.get(`http://localhost:3344/offers`).then(res => {
            setConsult(res.data);
            }).catch(error => {
                console.log(error);
            })
            return
        }
        if(value == "any" || query == "any") {
            return
        }
        await axios.get(`http://localhost:3344/offers/query/${query}/${value}`).then(res => {
            setConsult(res.data);
        }).catch(error => {
            console.log(error);
        })
    }

    async function getOffers() {
        await axios.get(`http://localhost:3344/offers`).then(res => {
            setOffers(res.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        queryConsult();
        getOffers();
    }, []);

    useEffect(() => {
        if (reload) navigate(0)
    }, [reload])

    offers.map(item => { //lista de opções criada
        switch (newQuery) {
            case "name":
                for (let i = 0; i < optionsRenderList.length; i++) {
                    if (item.ofr_name == optionsRenderList[i]) return <div key={item.ofr_id}></div>;
                }
                optionsRenderList.push(item.ofr_name);
            break;
            case "user_city":
                for (let i = 0; i < optionsRenderList.length; i++) {
                    if (item.ofr_city == optionsRenderList[i]) return <div key={item.ofr_id}></div>;
                }
                optionsRenderList.push(item.ofr_city);
            break;
            case "prod_type": 
                for (let i = 0; i < optionsRenderList.length; i++) {
                    if (item.prod_type == optionsRenderList[i]) return <div key={item.ofr_id}></div>;
                }
                optionsRenderList.push(item.prod_type);
            break;
            case "prod_composition": 
                for (let i = 0; i < optionsRenderList.length; i++) {
                    if (item.prod_composition == optionsRenderList[i]) return <div key={item.ofr_id}></div>;
                }
                optionsRenderList.push(item.prod_composition);
            break;
            case "user_name": 
                for (let i = 0; i < optionsRenderList.length; i++) {
                    if (item.ofr_user_name == optionsRenderList[i]) return <div key={item.ofr_id}></div>;
                }
                optionsRenderList.push(item.ofr_user_name);
            break;
            case "ofr_type": 
                for (let i = 0; i < optionsRenderList.length; i++) {
                    if (item.ofr_type == optionsRenderList[i]) return <div key={item.ofr_id}></div>;
                }
                optionsRenderList.push(item.ofr_type);
            break;
        }
    });

    const renderSearchOptions = optionsRenderList.map(item => { //lista de opções renderizada
        if(search == ""){
            return <div key={optionsRenderList.indexOf(item)}></div>
        }
        if (item.match(search) && numOptRender < 6) {
                numOptRender += 1;
                return <Flex key={optionsRenderList.indexOf(item)} bg="#eee" w={{base:"80%", sm:"30%"}} p={2.5} color={colors.colorFontBlue}
                _hover={{bg: "#bfbfbf"}} _dark={{bg:"#4f4f4f", _hover:{bg:"#444"}}}>
                <Link to={`/search/${(newQuery) ? newQuery : "any"}/${item}`} onClick={() => {setReload(true)}}>{item}</Link>
            </Flex>
        }
    })

    const renderQueryOffers = consult.map(item => {
        return <OfferCardHorizontal
        title={item.ofr_name} 
        desc={item.ofr_desc}
        img={(item.prod_img) ? String.fromCharCode(...new Uint8Array(item.prod_img.data)) : ""} 
        value={item.ofr_value} 
        key={item.ofr_id}
        id={item.ofr_id}/>
    });

    return (
       <Box w="100%" h="100%">
            <HeaderToggle/>

            <Flex bg={colors.veryLightBlue} w='100%' h='70vh' align="center" _dark={{bg:colors.veryLightBlue_Dark}} direction="column">
                <Spacer/>
                <Heading color={colors.colorFontDarkBlue} as='h1' textAlign="center" fontSize={{base: "36px", sm: "30px"}} fontFamily="outfit" _dark={{color:colors.colorFontDarkBlue_Dark}} mb="5%">Não achou o que estava procurando?</Heading>

                <Flex w="90%" direction={{base:"column-reverse", sm:"row"}} align={{base: "normal", sm:"center"}}>
                    <InputGroup display="flex" zIndex={1} w={{base:"80%", sm:"30%"}}>    
                        <Input placeholder='Pesquise aqui' bg="#eee" borderRightColor="#000" _dark={{bg:"#0000", borderRightColor:"#fff", color: "#fff", _placeholder : {color: "#dfdfdf"}}}
                        onChange={handleChange} onKeyUp={handleKeyPress}/>
                        <Link to={`/search/${(newQuery) ? newQuery : "any"}/${(search) ? search : "any"}`} onClick={() => {setReload(true)}}>
                            <InputRightAddon children={<BiSearchAlt/>} bg="#eee" _dark={{bg:"#0000"}} _hover={{bg:"#aaa", _dark:{bg:"#555"}}}/>
                        </Link>
                    </InputGroup>

                    <Stack position="absolute" top={{base:"47vh", sm:"45vh"}} w="inherit" align="center" spacing={0} left={{base:"-4vw" , sm:"-26.2vw"}}>
                        {renderSearchOptions}
                    </Stack>
                    <Spacer/>
                    <Flex direction="row" align="center">
                    <FormLabel fontFamily="outfit">Por onde procurar:</FormLabel>
                    <Select variant="flushed" w={{base:"54vw" ,sm:"fit-content"}} color={colors.colorFontBlue} onChange={handleChangeSelect} mb={{base: "5%", sm:"0"}}>
                        <option value="name">Titúlos</option>
                        <option value="user_city">Cidades</option>
                        <option value="prod_type">Equipamentos</option>
                        <option value="prod_composition">Composição dos Equipamentos</option>
                        <option value="user_name">Nomes de Usuário</option>
                        <option value="ofr_type">Tipos de Ofertas</option>
                    </Select>
                    </Flex>
                    <Spacer/>
                </Flex>
                <Spacer/>
            </Flex>

            <Flex bg={colors.bgWhite} w="100%" h='fit-content' align="center" direction="column" _dark={{bg: colors.bgWhite_Dark}} pb="5vh">
                <Heading as="h1" fontSize={{base: "36px", sm: "30px"}} fontFamily="outfit" color={colors.colorFontBlue} mb="3%" mt="3%" textAlign="center">Seus Resultados da Pesquisa "{(value == "others") ? "Outros" : value}"</Heading>
                <Stack align="center" spacing={4} w="100%">
                    {(consult.length > 0) ? renderQueryOffers : <SignNotFound msg="Pelo visto não há registro de sua pesquisa no banco de dados..." icon={<MdOutlineSearchOff size="45%"/>}/>}
                </Stack>
            </Flex>
           
            <Footer/>
       </Box> 
    )
}

export default Search;