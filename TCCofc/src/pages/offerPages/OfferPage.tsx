import {Box, Flex, Avatar, Heading, Image, Stack, Text, SimpleGrid, Spacer, Divider, Button, useToast} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import HeaderToggle from "../../components/toggles/HeaderToggle";
import Footer from "../../components/Footer";
import colors from "../../colors/colors";
import ProdInfoTable from "../../components/ProdInfoTable";
import "../../fonts/fonts.css";

import {BsFillStarFill} from "react-icons/bs";
import {BiConfused} from "react-icons/bi";
import {GiUncertainty} from "react-icons/gi";
import {MdOutlineReport, MdOutlineReportProblem} from "react-icons/md";
import SignNotFoundButton from "../../components/signs/SignNotFoundButton";
import CardOffer from "../../components/offerCards/OfferCard";
import OfferList from "../../components/offerCards/OfferList";
import SignNotFound from "../../components/signs/SignNotFound";

const OfferPage = () => {
    const {id} = useParams();

    const navigate = useNavigate();
    const toast = useToast();
    const [offer, setOffer] = useState([""]);
    const [owner, setOwner] = useState([]);
    const [reports, setReports] = useState(false);
    const [recomended, setRecom] = useState([]);
    const [imgOwner, setImgOwner] = useState<any>();
    const [imgShow, setShow] = useState<any>();
    let renderTest = false;

    async function queryOffer() { 
        await axios.get(`http://localhost:3344/offers/id/${id}`).then(res => {
            setOffer(res.data[0]);
        }).catch(error => {
            console.log(error);
        })
    };

    async function getReports() {
        await axios.get(`http://localhost:3344/denounce/offer/${offer.ofr_id}`).then(res => {
            if(res.data.length > 0) setReports(true);
        }).catch(error => {
            console.log(error);
        })
    }

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

    async function getImgOwner() {
        await axios.get(`http://localhost:3344/users/profile/photo/${owner.user_img}`, {responseType : "arraybuffer"}).then(res => {
            const buffer = new Uint8Array(res.data);
            const blob = new Blob([buffer], { type: res.headers.contentType });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setImgOwner(reader.result);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getProdImg() {
        await axios.get(`http://localhost:3344/products/photo/${offer.prod_img}`, {responseType : "arraybuffer"}).then(res => {
            const buffer = new Uint8Array(res.data);
            const blob = new Blob([buffer], { type: res.headers.contentType });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setShow(reader.result);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        queryOffer();
    }, []);

    useEffect(() => {
        if (offer[0] != "") {
            queryOwner();
            queryOffersRecomended();
            getReports();
            getProdImg();
        }
    }, [offer]);

    useEffect(() => {
        if(owner.user_img) getImgOwner();
    }, [owner])

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

                    <Flex direction={{base:"column", md:"row"}} h={{base:"fit-content", md:"50vh"}} w="90%">
                        <Image src={(imgShow) ? imgShow : ""} 
                        objectFit="contain" h={{base:"40vh",md:"95%"}} w={{base:"100%", md:"30%"}}></Image>
                        <Divider orientation="vertical" ml="2.5" mr="2.5" display={{base:"none", md:"inherit"}}/>
                        <Stack w={{base:"100%", md:"65%"}} h="100%" spacing={8}>
                            <Heading as="h1" fontFamily="outfit" fontSize={{base: "32px", md: "34px"}} color={colors.colorFontBlue} noOfLines={{md:1}}>{offer.ofr_name}</Heading>
                            <Flex direction={{base:"column" , md:"row"}} w={{base:"100%", md:"70%"}}>
                                <SimpleGrid spacing={3} fontSize={{base:"20px", md:"18px"}}>
                                    <Flex direction="row">
                                        <Text fontFamily="atkinson" mr="5px">Tipo de Oferta:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{offer.ofr_type}</Text>
                                    </Flex>
                                    <Flex direction="row">
                                        <Text fontFamily="atkinson" mr="5px">Status da Oferta:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{offer.ofr_status}</Text>
                                    </Flex>
                                    <Flex direction="row">
                                        <Text fontFamily="atkinson" mr="5px">Cidade:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{offer.ofr_city}</Text>
                                    </Flex>
                                </SimpleGrid>
                                <Spacer/>
                                <SimpleGrid spacing={3} fontSize={{base:"20px", md:"18px"}}>
                                    <Flex direction="row">
                                        <Text fontFamily="atkinson" mr="5px">Valor:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{(offer.ofr_type == "Doação") ? "Grátis" : `R$${offer.ofr_value}`}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontFamily="atkinson" mr="5px">Data:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{offer.ofr_postDate}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontFamily="atkinson" mr="5px">Parcelas:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{offer.ofr_parcelas}</Text>
                                    </Flex>
                                </SimpleGrid>
                            </Flex>
                            {(reports) ? <Flex bg="red.400" color="#fff" direction={{base:"column",md:"row"}} maxW={{base:"100%", md:"68%"}} align="center" w="fit-content" p={{base:"1%", md:"0px 20px 0px 5px"}} borderRadius="10px">
                                    <MdOutlineReportProblem size="60%"/>
                                    <Spacer/>
                                    <Text textAlign={{base:"center", md:"justify"}} fontSize={{base: "22px", md: "18px"}}>Essa oferta possui denúncias! Estamos avaliando-a para evitar danos à comunidade. Não recomendamos interações...</Text>
                                </Flex> : ""}
                        </Stack>
                    </Flex>

                    <Divider/>

                    <Flex direction={{base:"column", md:"row"}} h={{base:"fit_content",md:"50vh"}} w="90%">
                        <Stack w={{base:"100%", md:"45%"}} h={{base:"50vh", md:"100%"}} mt="2vh">
                            <Heading as="h3" fontFamily="outfit" fontSize={{base: "32px", md: "30px"}} color={colors.colorFontBlue}>Descrição</Heading>
                            <Text textAlign="justify" fontSize={{base:"22px", md:"19px"}}>{offer.ofr_desc}</Text>
                        </Stack>

                        <Divider orientation="vertical" mr="5%" ml="5%" display={{base:"none", md:"inherit"}}/>

                        <Stack w={{base:"100%", md:"45%"}} h={{base:"20vh", md:"100%"}} mt="2vh" fontSize={{base:"20px", md:"18px"}}>
                            <Flex direction="row" align="center">
                            <Link to={`/profile/${owner.user_email}/view`}><Avatar name={owner.user_name} src={(owner.user_img) ? imgOwner : ""} _hover={{border : `2px solid ${colors.colorFontBlue}`, _dark : {border : "2px solid #fff"}}}></Avatar></Link>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue} fontSize={{base:"22px", md:"20px"}} mr="2%">{owner.user_name}</Text>
                                <BsFillStarFill fill={colors.colorFontBlue}/>
                                <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}} fontSize={{base:"22px", md:"20px"}}>{(owner.user_nota) ? owner.user_nota : 0.0}</Text>
                                <Spacer/>
                                <Button variant="ghost" w="fit-content" onClick={() => {
                                toast({
                                    position: 'bottom',
                                    render: () => (
                                        <Stack bg="red.500" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                                            <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", md:"20px"}}>Para denunciar a oferta é necessário estar logado...</Text>
                                            <Stack direction="row">
                                                <Button color="#fff" _hover={{bg:"#fff2"}} variant="outline" onClick={() => {navigate("/login"), toast.closeAll()}}>Realizar Login</Button>
                                                <Button color="#fff" _hover={{bg:"#fff2"}} variant="outline" onClick={() => {toast.closeAll()}}>Cancelar</Button>    
                                            </Stack>
                                        </Stack>
                                    )})
                            }}><MdOutlineReport size="5vh"/></Button>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">Email:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{owner.user_email}</Text>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">Telefone:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{owner.user_phone}</Text>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">CEP:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{owner.user_CEP}</Text>
                            </Flex>
                        </Stack>
                    </Flex>
                    <Divider/>
                    <Flex align="center" direction="column" h="fit-content" w="100%" mt="3%" mb="3%">
                        <ProdInfoTable ofr_id={parseInt(id)}/>
                    </Flex>
                    <Divider/>

                    <Flex w="100%" h="fit-content" mt="3%" mb="3%" align="center" direction="column">
                        <Heading noOfLines={1} mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{base: "36px", md: "30px"}} as="h1" fontFamily="outfit" _dark={{color: colors.colorFontDarkBlue_Dark}}>Chat com {owner.user_name}</Heading>
                        <SignNotFoundButton msg="Pelo visto você não pode acessar o chat sem uma conta... Que tal se cadastrar no sistema ou fazer login?" icon={<BiConfused size="45%"/>} btnText="Login" btnPath="/login/new"/>
                    </Flex>
                </Flex>

                <Flex w="100%" h="fit-content" align="center" direction="column" bg={colors.veryLightBlue} _dark={{bg : colors.veryLightBlue_Dark}}>
                    <Heading noOfLines={1} mt="3%" mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{base: "36px", md: "30px"}} as="h1" fontFamily="outfit" _dark={{color: colors.colorFontDarkBlue_Dark}}>Ofertas Recomendadas</Heading>
                    {(renderTest) ? <OfferList component={renderRecom}/> : <SignNotFound icon={<GiUncertainty size="45%"/>} msg="Parece que não há o que recomendar à partir dessa oferta...Considere realiazar uma pesquisa com mais detalhes!"/>}
                </Flex>
            <Footer/>
        </Box>
    )
}

export default OfferPage;