import {Box, Flex, Avatar, Heading, Image, Stack, Text, SimpleGrid, Spacer, Divider} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import HeaderToggle from "../../components/toggles/HeaderToggle";
import Footer from "../../components/Footer";
import colors from "../../colors/colors";
import testImg from "../../img/home/imgHomeMiddle.png";
import ProdInfoTable from "../../components/ProdInfoTable";
import "../../fonts/fonts.css";

import {BsFillStarFill} from "react-icons/bs";
import {BiConfused} from "react-icons/bi";
import {GiUncertainty} from "react-icons/gi";
import SignNotFoundButton from "../../components/SignNotFoundButton";
import CardOffer from "../../components/offerCards/OfferCard";
import OfferList from "../../components/offerCards/OfferList";
import SignNotFound from "../../components/SignNotFound";

const OfferPage = () => {
    const {id} = useParams();

    const [offer, setOffer] = useState([""]);
    const [owner, setOwner] = useState([]);
    const [recomended, setRecom] = useState([]);
    let renderTest = false;

    async function queryOffer() { 
        await axios.get(`http://localhost:3344/offers/id/${id}`).then(res => {
            setOffer(res.data[0]);
        }).catch(error => {
            console.log(error);
        })
    };

    async function queryOffersRecomended() {
        await axios.get(`http://localhost:3344/offers/query/${"prod_type"}/${offer.prod_type}`).then(res => {
            setRecom(res.data);
        }).catch(error => {
            console.log(error);
        })
    };

    async function queryOwner() { 
        await axios.get(`http://localhost:3344/users/id/${offer.User_user_id}`).then(res => {
            setOwner(res.data);
        }).catch(error => {
            console.log(error);
        })
    };

    useEffect(() => {
        queryOffer();
    }, []);

    useEffect(() => {
        if (offer[0] != "") {
            queryOwner();
            queryOffersRecomended();
        }
    }, [offer]);

    const renderRecom = recomended.map(item => {
        if(item.ofr_city != offer.ofr_city || item.ofr_id == offer.ofr_id) return <div key={item.ofr_id}></div>
        renderTest = true;
        return <CardOffer 
            key={item.ofr_id}
            title={item.ofr_name} 
            composition={item.prod_composition} 
            condition={item.prod_status} 
            img={item.prod_img} 
            value={item.ofr_value} 
            type={item.prod_type}
            id={item.ofr_id}/>
    })

    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>
                <Flex bg={colors.bgWhite} direction="column" align="center" h="fit-content" pt="10vh" _dark={{bg : colors.bgWhite_Dark}}>

                    <Flex direction="row" h="50vh" w="90%">
                        <Image src={testImg} objectFit="contain" h="95%" w="30%" noOfLines={1}></Image>
                        <Divider orientation="vertical" ml="2.5" mr="2.5"/>
                        <Stack w="65%" h="100%" spacing={8}>
                            <Heading as="h1" fontFamily="outfit" fontSize={{base: "36px", sm: "34px"}} color={colors.colorFontBlue}>{offer.ofr_name}</Heading>
                            <Flex direction="row" w="70%">
                                <SimpleGrid spacing={3} fontSize={{base:"20px", sm:"18px"}}>
                                    <Flex direction="row">
                                        <Text fontFamily="atkinson" mr="5px">Tipo de Oferta:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontBlue}>{offer.ofr_type}</Text>
                                    </Flex>
                                    <Flex direction="row">
                                        <Text fontFamily="atkinson" mr="5px">Status da Oferta:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontBlue}>{offer.ofr_status}</Text>
                                    </Flex>
                                    <Flex direction="row">
                                        <Text fontFamily="atkinson" mr="5px">Cidade:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontBlue}>{offer.ofr_city}</Text>
                                    </Flex>
                                </SimpleGrid>
                                <Spacer/>
                                <SimpleGrid spacing={3} fontSize={{base:"20px", sm:"18px"}}>
                                    <Flex direction="row">
                                        <Text fontFamily="atkinson" mr="5px">Valor:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontBlue}>{(offer.ofr_type == "Doação") ? "Grátis" : `R$${offer.ofr_value}`}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontFamily="atkinson" mr="5px">Data:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontBlue}>{offer.ofr_postDate}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontFamily="atkinson" mr="5px">Parcelas:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontBlue}>{offer.ofr_parcelas}</Text>
                                    </Flex>
                                </SimpleGrid>
                            </Flex>
                        </Stack>
                    </Flex>

                    <Divider/>

                    <Flex direction="row" h="50vh" w="90%">
                        <Stack w="45%" h="100%" mt="2vh">
                            <Heading as="h3" fontFamily="outfit" fontSize={{base: "36px", sm: "30px"}} color={colors.colorFontBlue}>Descrição</Heading>
                            <Text textAlign="justify" fontSize={{base:"22px", sm:"19px"}}>{offer.ofr_desc}</Text>
                        </Stack>

                        <Divider orientation="vertical" mr="5%" ml="5%"/>

                        <Stack w="45%" h="100%" mt="2vh">
                            <Flex direction="row" align="center">
                                <Avatar name={owner.user_name} src={owner.user_img} mr="2%"></Avatar>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue} fontSize={{base:"22px", sm:"20px"}} mr="2%">{owner.user_name}</Text>
                                <BsFillStarFill fill={colors.colorFontBlue}/>
                                <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}} fontSize={{base:"22px", sm:"20px"}}>{(owner.user_nota) ? owner.user_nota : 0.0}</Text>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">Email:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue}>{owner.user_email}</Text>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">Telefone:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue}>{owner.user_phone}</Text>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">CEP:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue}>{owner.user_CEP}</Text>
                            </Flex>
                        </Stack>
                    </Flex>
                    <Divider/>
                    <Flex align="center" direction="column" h="fit-content" w="100%" mt="3%" mb="3%">
                        <ProdInfoTable ofr_id={parseInt(id)}/>
                    </Flex>
                    <Divider/>

                    <Flex w="100%" h="fit-content" mt="3%" mb="3%" align="center" direction="column">
                        <Heading noOfLines={1} mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{base: "36px", sm: "30px"}} as="h1" fontFamily="outfit" _dark={{color: colors.colorFontDarkBlue_Dark}}>Chat com {owner.user_name}</Heading>
                        <SignNotFoundButton msg="Pelo visto você não pode acessar o chat sem uma conta... Que tal se cadastrar no sistema ou fazer login?" icon={<BiConfused size="45%"/>} btnText="Login" btnPath="/loginw"/>
                    </Flex>
                </Flex>

                <Flex w="100%" h="fit-content" align="center" direction="column" bg={colors.veryLightBlue} _dark={{bg : colors.veryLightBlue_Dark}}>
                    <Heading noOfLines={1} mt="3%" mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{base: "36px", sm: "30px"}} as="h1" fontFamily="outfit" _dark={{color: colors.colorFontDarkBlue_Dark}}>Ofertas Recomendadas</Heading>
                    {(renderTest) ? <OfferList component={renderRecom}/> : <SignNotFound icon={<GiUncertainty size="45%"/>} msg="Parece que não há o que recomendar à partir dessa oferta...Considere realiazar uma pesquisa com mais detalhes!"/>}
                </Flex>
            <Footer/>
        </Box>
    )
}

export default OfferPage;