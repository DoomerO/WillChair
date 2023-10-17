import { Flex, Box, Heading, Input, InputGroup, InputRightAddon, Stack, Spacer, Select, FormLabel, Collapse, Button } from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import HeaderToggle from "../components/toggles/HeaderToggle";
import Footer from "../components/Footer";
import OfferCardHorizontal from "../components/offerCards/OfferCardHorizontal";
import SignNotFound from "../components/signs/SignNotFound";
import Loading from "../components/toggles/Loading";

import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineSearchOff, MdAdd } from "react-icons/md";
import { BiMinus } from "react-icons/bi";

import { Offer } from "../components/code/interfaces";
import colors from "../colors/colors";
import "../fonts/fonts.css";
import serverUrl from "../components/code/serverUrl";

const Search = () => {
    const { query } = useParams();
    const { value } = useParams();

    const [newQuery, setQuery] = useState("name");
    const [search, setSearch] = useState("");
    const [showFilters, setShow] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [loading, isLoading] = useState(true);

    let numOptRender = 0;
    let optionsRenderList: string[] = [];

    const [consult, setConsult] = useState<Offer[]>([]);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [filters, setFilters] = useState({
        city: "",
        type: "",
        composition: "",
        equipament: ""
    })
    const navigate = useNavigate();

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => { //evento de input de enter na barra de pesquisa
        if (e.key == "Enter") {
            navigate(`/search/${newQuery}/${search}`);
            navigate(0)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { //evento de change no input de pesquisa
        e.preventDefault();
        setSearch(e.target.value);
    }

    const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => { //evento de change para select
        e.preventDefault();
        setQuery(e.target.value);
        if (!newQuery) setQuery("name");
        console.log(optionsRenderList);
    }

    const handleFilters = (e: ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleFiltersSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleChangeShow = (e: ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value == "Pesquisadas") {
            setShowAll(false);
        }
        else {
            setShowAll(true);
        }
    }

    async function queryConsult() {
        if (value == "all" && query == "all") {
            await axios.get(`${serverUrl}/offers`).then(res => {
                setConsult(res.data);
            }).catch(error => {
                console.log(error);
            })
            return
        }
        if (value == "any" || query == "any") {
            return
        }
        await axios.get(`${serverUrl}/offers/query/${query}/${value}`).then(res => {
            setConsult(res.data);
        }).catch(error => {
            console.log(error);
        })
    }

    async function getOffers() {
        await axios.get(`${serverUrl}/offers`).then(res => {
            setOffers(res.data);
            isLoading(false);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        queryConsult();
        getOffers();
    }, []);

    useEffect(() => {
        if (showFilters) {
            setFilters(prev => ({
                ...prev, city: "",
                type: "",
                composition: "",
                equipament: ""
            }));
        }
    }, [showFilters])

    offers.map(item => { //lista de opções criada
        switch (newQuery) {
            case "name":
                for (let i = 0; i < optionsRenderList.length; i++) {
                    if (item.ofr_name == optionsRenderList[i]) return <div key={item.ofr_id}></div>;
                }
                optionsRenderList.push(item.ofr_name ?? "");
                break;
            case "user_city":
                for (let i = 0; i < optionsRenderList.length; i++) {
                    if (item.ofr_city == optionsRenderList[i]) return <div key={item.ofr_id}></div>;
                }
                optionsRenderList.push(item.ofr_city ?? "");
                break;
            case "prod_type":
                for (let i = 0; i < optionsRenderList.length; i++) {
                    if (item.prod_type == optionsRenderList[i]) return <div key={item.ofr_id}></div>;
                }
                optionsRenderList.push(item.prod_type ?? "");
                break;
            case "prod_composition":
                for (let i = 0; i < optionsRenderList.length; i++) {
                    if (item.prod_composition == optionsRenderList[i]) return <div key={item.ofr_id}></div>;
                }
                optionsRenderList.push(item.prod_composition ?? "");
                break;
            case "user_name":
                for (let i = 0; i < optionsRenderList.length; i++) {
                    if (item.ofr_user_name == optionsRenderList[i]) return <div key={item.ofr_id}></div>;
                }
                optionsRenderList.push(item.ofr_user_name ?? "");
                break;
            case "ofr_type":
                for (let i = 0; i < optionsRenderList.length; i++) {
                    if (item.ofr_type == optionsRenderList[i]) return <div key={item.ofr_id}></div>;
                }
                optionsRenderList.push(item.ofr_type ?? "");
                break;
        }
    });

    const renderSearchOptions = optionsRenderList.map(item => { //lista de opções renderizada
        if (search == "") {
            return <div key={optionsRenderList.indexOf(item)}></div>
        }
        if (item.toUpperCase().match(search.toUpperCase()) && numOptRender < 6) {
            numOptRender += 1;
            return <Flex key={optionsRenderList.indexOf(item)} bg="#eee" w={{ base: "80%", md: "30%" }} p={2.5} color={colors.colorFontBlue}
                _hover={{ bg: "#dfdfdf" }} _dark={{ bg: "#2f2f2f", _hover: { bg: "#444" } }} onClick={() => { navigate(`/search/${(newQuery) ? newQuery : "any"}/${item}`); navigate(0) }}>
                {item}
            </Flex>
        }
    })

    const renderQueryOffers = consult.map(item => {
        if ((item.ofr_city) ? !item.ofr_city.toUpperCase().match(filters.city.toUpperCase()) : false && filters.city != "" ) {
            return <div key={item.ofr_id}></div>
        }
        if ((item.ofr_type) ? !item.ofr_type.toUpperCase().match(filters.type.toUpperCase()) : false && filters.type != "") {
            return <div key={item.ofr_id}></div>
        }
        if ((item.prod_composition) ? !item.prod_composition.toUpperCase().match(filters.composition.toUpperCase()) : false && filters.composition != "") {
            return <div key={item.ofr_id}></div>
        }
        if ((item.prod_type) ? !item.prod_type.toUpperCase().match(filters.equipament.toUpperCase()) : false && filters.equipament != "") {
            return <div key={item.ofr_id}></div>
        }
        return <OfferCardHorizontal
            title={item.ofr_name ?? ""}
            desc={item.ofr_desc ?? ""}
            img={item.prod_img ?? ""}
            value={item.ofr_value ?? 0}
            key={item.ofr_id}
            id={item.ofr_id ?? 0} />
    });

    const renderAllOffers = offers.map(item => {
        if ((item.ofr_city) ? !item.ofr_city.toUpperCase().match(filters.city.toUpperCase()) : false && filters.city != "" ) {
            return <div key={item.ofr_id}></div>
        }
        if ((item.ofr_type) ? !item.ofr_type.toUpperCase().match(filters.type.toUpperCase()) : false && filters.type != "") {
            return <div key={item.ofr_id}></div>
        }
        if ((item.prod_composition) ? !item.prod_composition.toUpperCase().match(filters.composition.toUpperCase()) : false && filters.composition != "") {
            return <div key={item.ofr_id}></div>
        }
        if ((item.prod_type) ? !item.prod_type.toUpperCase().match(filters.equipament.toUpperCase()) : false && filters.equipament != "") {
            return <div key={item.ofr_id}></div>
        }
        return <OfferCardHorizontal
            title={item.ofr_name ?? ""}
            desc={item.ofr_desc ?? ""}
            img={item.prod_img ?? ""}
            value={item.ofr_value ?? 0}
            key={item.ofr_id}
            id={item.ofr_id ?? 0} />
    });

    return (
        (loading) ? <Loading/> :<Box w="100%" h="100%">
            <HeaderToggle />

            <Flex bg={colors.veryLightBlue} w='100%' h='70vh' align="center" _dark={{ bg: colors.veryLightBlue_Dark }} direction="column">
                <Spacer />
                <Heading color={colors.colorFontDarkBlue} as='h1' textAlign="center" fontSize={{ base: "28px", md: "30px" }} fontFamily="outfit" _dark={{ color: colors.colorFontDarkBlue_Dark }} mb="5%">Não achou o que estava procurando?</Heading>

                <Flex w="90%" direction={{ base: "column-reverse", md: "row" }} align={{ base: "normal", md: "center" }}>
                    <InputGroup display="flex" zIndex={1} w={{ base: "80%", md: "30%" }}>
                        <Input placeholder='Pesquise aqui' bg="#eee" borderRightColor="#000" _dark={{ bg: "#0000", borderRightColor: "#fff", color: "#fff", _placeholder: { color: "#dfdfdf" } }}
                            onChange={handleChange} onKeyUp={handleKeyPress} />
                        <InputRightAddon children={<BiSearchAlt />} bg="#eee" _dark={{ bg: "#0000" }} _hover={{ bg: "#aaa", _dark: { bg: "#555" } }} onClick={() => { navigate(`/search/${(newQuery) ? newQuery : "any"}/${(search) ? search : "any"}`); navigate(0) }} />
                    </InputGroup>

                    <Stack position="absolute" top={{ base: "47vh", md: "45vh" }} w="inherit" align="center" spacing={0} left={{ base: "-4vw", md: "-26.2vw" }}>
                        {renderSearchOptions}
                    </Stack>
                    <Spacer />
                    <Flex direction="row" align="center">
                        <FormLabel fontFamily="outfit">Por onde procurar:</FormLabel>
                        <Select variant="flushed" w={{ base: "54vw", md: "fit-content" }} color={colors.colorFontBlue} onChange={handleChangeSelect} mb={{ base: "5%", md: "0" }}>
                            <option value="name">Titúlos</option>
                            <option value="user_city">Cidades</option>
                            <option value="prod_type">Equipamentos</option>
                            <option value="prod_composition">Composição dos Equipamentos</option>
                            <option value="user_name">Nomes de Usuário</option>
                            <option value="ofr_type">Tipos de Ofertas</option>
                        </Select>
                    </Flex>
                    <Spacer />
                </Flex>
                <Spacer />
            </Flex>

            <Flex bg={colors.bgWhite} w="100%" h='fit-content' align="center" direction="column" _dark={{ bg: colors.bgWhite_Dark }} pb="5vh">
                <Heading as="h1" fontSize={{ base: "25px", md: "30px" }} fontFamily="outfit" color={colors.colorFontBlue} mb="3%" mt="3%" textAlign="center">Seus Resultados da Pesquisa "{(value == "others") ? "Outros" : value}"</Heading>
                <Stack direction="row" align="center" w="95%" mb="3%" spacing={4}>
                    <Button colorScheme="linkedin" variant="outline" onClick={() => { setShow(!showFilters) }} >{(showFilters) ? <BiMinus size="100%" /> : <MdAdd size="100%" />}Filtros</Button>
                    <Collapse in={showFilters}>
                        <Stack direction={{base:"column", md:"row"}} w="100%" spacing={5}>
                            <FormLabel display="flex" flexDirection="row" alignItems="center">
                                Cidade:
                                <Input name="city" onChange={handleFilters} ml="5px" type="text" variant="flushed"></Input>
                            </FormLabel>

                            <FormLabel display="flex" flexDirection="row" alignItems="center">
                                Tipo de Oferta:
                                <Select ml="5px" name="type" variant="flushed" onChange={handleFiltersSelect}>
                                    <option value="Doação">Doação</option>
                                    <option value="Venda">Venda</option>
                                    <option value="Aluguél">Aluguél</option>
                                </Select>
                            </FormLabel>

                            <FormLabel display="flex" flexDirection="row" alignItems="center">
                                Composição:
                                <Input name="composition" onChange={handleFilters} ml="5px" type="text" variant="flushed"></Input>
                            </FormLabel>

                            <FormLabel display="flex" flexDirection="row" alignItems="center">
                                Equipamento:
                                <Input name="equipament" onChange={handleFilters} ml="5px" type="text" variant="flushed"></Input>
                            </FormLabel>

                            <FormLabel display="flex" flexDirection="row" alignItems="center">
                                Mostrar:
                                <Select ml="5px" variant="flushed" onChange={handleChangeShow}>
                                    <option value="Pesquisadas">Pesquisadas</option>
                                    <option value="Todas">Todas</option>
                                </Select>
                            </FormLabel>
                        </Stack>
                    </Collapse>
                </Stack>

                <Stack align="center" spacing={4} w="100%">
                    {(consult.length > 0) ? (showAll) ? renderAllOffers : renderQueryOffers : <SignNotFound msg="Pelo visto não há registro de sua pesquisa no banco de dados..." icon={<MdOutlineSearchOff size="45%" />} />}
                </Stack>
            </Flex>

            <Footer />
        </Box>
    )
}

export default Search;