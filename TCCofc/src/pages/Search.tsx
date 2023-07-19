import { Flex, Box, Heading, Input, InputGroup, InputRightAddon, Stack, Spacer, Select } from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import HeaderToggle from "../components/toggles/HeaderToggle";
import Footer from "../components/Footer";
import OfferList from "../components/offerCards/OfferList";
import CardOffer from "../components/offerCards/OfferCard";

import { BiSearchAlt } from "react-icons/bi";
import colors from "../colors/colors";
import { MdOutlineSearchOff } from "react-icons/md";
import SignNotFound from "../components/SignNotFound";

const Search = () => {
    const {query} = useParams();
    const {value} = useParams();

    const[newQuery, setQuery] = useState("");
    const[newValue, setValue] = useState("");
    const [search, setSearch] = useState("");
    let numOptRender = 0;

    const [consult, setConsult] = useState([]);
    const [offers, setOffers] = useState([]);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => { //evento de change no input de pesquisa
        e.preventDefault();
        setSearch(e.target.value);
    }

    const handleChangeSelect = (e:ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setQuery(e.target.value);
        console.log(newQuery)
    }

    async function queryConsult() {
        await axios.get(`http://localhost:3344/offers/query/${query}/${value}`).then(res => {
            setConsult(res.data);
            console.log(res.data)
        }).catch(error => {
            console.log(error);
        })
    }

    async function getOffers() {
        await axios.get(`http://localhost:3344/offers`).then(res => {
            setOffers(res.data);
            console.log(res.data)
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        queryConsult();
        getOffers();
    }, []);

    const renderSearchOptions = offers.map(item => { //lista de opções de pesquiza renderizada
        if(search == ""){
            return <div key={item.ofr_id}></div>
        }
        switch (newQuery) {
            case "name":
                if (item.ofr_name.match(search) && numOptRender < 6) {
                    numOptRender += 1;
                    
                    return <Flex key={item.ofr_id} bg="#eee" w={{base:"80%", sm:"30%"}} p={2.5} color={colors.colorFontBlue}
                    _hover={{bg: "#bfbfbf"}}>
                        {item.ofr_name}
                    </Flex>
                }
            break;
            case "user_city":
                if (item.ofr_city.match(search) && numOptRender < 6) {
                    numOptRender += 1;
                    
                    return <Flex key={item.ofr_id} bg="#eee" w={{base:"80%", sm:"30%"}} p={2.5} color={colors.colorFontBlue}
                    _hover={{bg: "#bfbfbf"}}>
                        {item.ofr_city}
                    </Flex>
                }
            break;
            case "prod_type": 
                if (item.prod_type.match(search) && numOptRender < 6) {
                    numOptRender += 1;

                    return <Flex key={item.ofr_id} bg="#eee" w={{base:"80%", sm:"30%"}} p={2.5} color={colors.colorFontBlue}
                    _hover={{bg: "#bfbfbf"}}>
                        {item.prod_type}
                    </Flex>
                }
            break;
            case "prod_composition": 
                if (item.prod_composition.match(search) && numOptRender < 6) {
                    numOptRender += 1;

                    return <Flex key={item.ofr_id} bg="#eee" w={{base:"80%", sm:"30%"}} p={2.5} color={colors.colorFontBlue}
                    _hover={{bg: "#bfbfbf"}}>
                        {item.prod_composition}
                    </Flex>
                }
            break;
            case "user_name": 
                if (item.ofr_user_name.match(search) && numOptRender < 6) {
                    numOptRender += 1;

                    return <Flex key={item.ofr_id} bg="#eee" w={{base:"80%", sm:"30%"}} p={2.5} color={colors.colorFontBlue}
                    _hover={{bg: "#bfbfbf"}}>
                        {item.ofr_user_name}
                    </Flex>
                }
            break;
            case "ofr_type": 
                if (item.ofr_type.match(search) && numOptRender < 6) {
                    numOptRender += 1;

                    return <Flex key={item.ofr_id} bg="#eee" w={{base:"80%", sm:"30%"}} p={2.5} color={colors.colorFontBlue}
                    _hover={{bg: "#bfbfbf"}}>
                        {item.ofr_type}
                    </Flex>
                }
            break;
        }
    });

    const renderQueryOffers = consult.map(item => {
        return <CardOffer
        title={item.ofr_name} 
        composition={item.prod_composition} 
        condition={item.prod_status} 
        img={item.prod_img} 
        value={item.ofr_value} 
        type={item.prod_type}
        key={item.ofr_id}/>
    });

    return (
       <Box w="100%" h="100%">
            <HeaderToggle/>

            <Flex bg={colors.veryLightBlue} w='100%' h='70vh' align="center" _dark={{bg:colors.veryLightBlue_Dark}} direction="column">
                <Spacer/>
                <Heading color={colors.colorFontDarkBlue} as='h1' fontSize={{base: "36px", sm: "30px"}} fontFamily="outfit" _dark={{color:colors.colorFontDarkBlue_Dark}} mb="5%">Não achou o que estava procurando?</Heading>
                <Flex w="90%" direction="row" align="center">
                    <InputGroup display="flex" zIndex={1} w={{base:"80%", sm:"30%"}}>    
                        <Input placeholder='Pesquise aqui' bg="#eee" borderRightColor="#000" _dark={{bg:"#0000", borderRightColor:"#fff", color: "#fff", _placeholder : {color: "#dfdfdf"}}} onChange={handleChange}/>
                        <InputRightAddon children={<BiSearchAlt/>} bg="#eee" _dark={{bg:"#0000"}}/>
                    </InputGroup>
                    <Stack position="absolute" top={{base:"41vh", sm:"45vh"}} w="inherit" align="center" spacing={0} left="-26.2vw">
                        {renderSearchOptions}
                    </Stack>
                    <Spacer/>
                    <Select placeholder="Por onde procurar?" variant="flushed" w="17%" color={colors.colorFontBlue} onChange={handleChangeSelect}>
                        <option value="user_city">Cidades</option>
                        <option value="name">Titúlos</option>
                        <option value="prod_type">Equipamentos</option>
                        <option value="prod_composition">Composição dos Equipamentos</option>
                        <option value="user_name">Nomes de Usuário</option>
                        <option value="ofr_type">Tipos de Ofertas</option>
                    </Select>
                    <Spacer/>
                </Flex>
                <Spacer/>
            </Flex>
            
            <Flex w="100%" h="fit-content">
            {(consult.length > 0) ? <OfferList component={renderQueryOffers}/> : <SignNotFound msg="Parece que não há equipamentos registrados em sua cidade..." icon={<MdOutlineSearchOff size="45%"/>}/>}
            </Flex>
            
            <Footer/>
       </Box> 
    )
}

export default Search;