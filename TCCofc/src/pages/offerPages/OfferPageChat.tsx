import {Box, Flex, Avatar, Heading, Image, Stack, Text, SimpleGrid, Spacer, Divider, Button, useToast} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

import HeaderToggle from "../../components/toggles/HeaderToggle";
import Footer from "../../components/Footer";
import colors from "../../colors/colors";
import testImg from "../../img/home/imgHomeMiddle.png";
import ProdInfoTable from "../../components/ProdInfoTable";
import ChatBox from "../../components/chats/ChatBox";
import "../../fonts/fonts.css";

import {BsFillStarFill} from "react-icons/bs";
import {BsChatLeftText} from "react-icons/bs";
import {GiUncertainty} from "react-icons/gi";

import CardOffer from "../../components/offerCards/OfferCard";
import OfferList from "../../components/offerCards/OfferList";
import SignNotFound from "../../components/signs/SignNotFound";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineReport } from "react-icons/md";

interface ChatPage {
    offer : object;
    user : object;
}

const OfferPageChat = ({offer, user} : ChatPage) => {
    
    const [owner, setOwner] = useState([]);
    const [recomended, setRecom] = useState([]);
    const [chat, setChat] = useState([]);
    const [chatBool, setChatBool] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    let renderTest = false;

    async function createChat() {
        await axios.post(`http://localhost:3344/chats`, {
            Offer_ofr_id : offer.ofr_id,
            User_user_id : user.user_id
        }, {headers : {authorization : "Bearer " + localStorage.getItem("token")}}).then(res => {
            console.log(res);
            setChatBool(true);
        }).catch(error => {
            console.log("Bitch")
            console.log(error);
        });
    }

    async function getChat() {
        await axios.get(`http://localhost:3344/chats/user/offer/${user.user_id}/${offer.ofr_id}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then(res => {
            setChat(res.data[0]);
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

    useEffect(() => {
        const canceltoken = axios.CancelToken.source();
       
        if(offer.ofr_id){
            queryOffersRecomended();
            queryOwner();
            getChat();
        }
        
        return () => {
            canceltoken.cancel();
        }
    }, [offer, user]);

    useEffect(() => {
        const canceltoken = axios.CancelToken.source();
        (chatBool) ? getChat(): "";
        return () => {
            canceltoken.cancel();
        }
    }, [chatBool])

    const renderRecom = recomended.map(item => {
        if(item.ofr_city != offer.ofr_city || item.ofr_id == offer.ofr_id) return <div key={item.ofr_id}></div>
        renderTest = true;
        return <CardOffer 
            key={item.ofr_id}
            title={item.ofr_name} 
            composition={item.prod_composition} 
            condition={item.prod_status} 
            img={String.fromCharCode(...new Uint8Array(item.prod_img.data))} 
            value={item.ofr_value} 
            type={item.prod_type}
            id={item.ofr_id}/>
    });

    const SignButton = () => {
        return (
            <Flex align="center" h="40vh" direction="column" 
            bgGradient="linear(to-b, #1976D230, #1976D2)" 
            w="100%" pt="3%">
                <BsChatLeftText size="45%"/>
                <Text fontSize="25px" fontFamily="atkinson" textAlign="center">Você ainda não falou com {owner.user_name}, que tal iniciar uma conversa?</Text>
                <Button variant="outline" bgColor="#0000" mt="1.5%" onClick={() => {createChat()}}>Criar um chat</Button>
            </Flex>
        )
    }

    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>
                <Flex bg={colors.bgWhite} direction="column" align="center" h="fit-content" pt="10vh" _dark={{bg : colors.bgWhite_Dark}}>

                <Flex direction={{base:"column", sm:"row"}} h={{base:"fit-content", sm:"50vh"}} w="90%">
                        <Image src={(offer.prod_img) ? String.fromCharCode(...new Uint8Array(offer.prod_img.data)) : null} 
                        objectFit="contain" h={{base:"40vh",sm:"95%"}} w={{base:"100%", sm:"30%"}}></Image>
                        <Divider orientation="vertical" ml="2.5" mr="2.5" display={{base:"none", sm:"inherit"}}/>
                        <Stack w={{base:"100%", sm:"65%"}} h="100%" spacing={8}>
                            <Heading as="h1" fontFamily="outfit" fontSize={{base: "32px", sm: "34px"}} color={colors.colorFontBlue} noOfLines={{sm:1}}>{offer.ofr_name}</Heading>
                            <Flex direction={{base:"column" , sm:"row"}} w={{base:"100%", sm:"70%"}}>
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

                    <Flex direction={{base:"column", sm:"row"}} h={{base:"fit_content",sm:"50vh"}} w="90%">
                        <Stack w={{base:"100%", sm:"45%"}} h={{base:"50vh", sm:"100%"}} mt="2vh">
                            <Heading as="h3" fontFamily="outfit" fontSize={{base: "32px", sm: "30px"}} color={colors.colorFontBlue}>Descrição</Heading>
                            <Text textAlign="justify" fontSize={{base:"22px", sm:"19px"}}>{offer.ofr_desc}</Text>
                        </Stack>

                        <Divider orientation="vertical" mr="5%" ml="5%" display={{base:"none", sm:"inherit"}}/>

                        <Stack w={{base:"100%", sm:"45%"}} h={{base:"20vh", sm:"100%"}} mt="2vh" fontSize={{base:"20px", sm:"18px"}}>
                            <Flex direction="row" align="center">
                            <Link to={`/profile/${owner.user_email}/view`}><Avatar name={owner.user_name} src={owner.user_img} _hover={{border : `2px solid ${colors.colorFontBlue}`, _dark : {border : "2px solid #fff"}}}></Avatar></Link>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue} fontSize={{base:"22px", sm:"20px"}} ml="2%" mr="2%">{owner.user_name}</Text>
                                <BsFillStarFill fill={colors.colorFontBlue}/>
                                <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}} fontSize={{base:"22px", sm:"20px"}}>{(owner.user_nota) ? owner.user_nota : 0.0}</Text>
                                <Spacer/>
                                <Button variant="ghost" w="fit-content" onClick={() => {
                                toast({
                                    position: 'bottom',
                                    render: () => (
                                        <Stack bg="red.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                                            <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", sm:"20px"}}>Certeza que deseja denunciar essa oferta?</Text>
                                            <Stack direction="row">
                                                <Button color="#fff" _hover={{bg:"#fff2"}} variant="outline" onClick={() => {navigate(`/report/${offer.ofr_id}`), toast.closeAll()}}>Sim</Button>
                                                <Button color="#fff" _hover={{bg:"#fff2"}} variant="outline" onClick={() => {toast.closeAll()}}>Não</Button>    
                                            </Stack>
                                        </Stack>
                                    )})
                            }}><MdOutlineReport size="5vh"/></Button>
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
                        <ProdInfoTable ofr_id={offer.ofr_id}/>
                    </Flex>
                    <Divider/>

                    <Flex w="100%" h="fit-content" mt="3%" mb="3%" align="center" direction="column">
                        <Heading noOfLines={1} mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{base: "36px", sm: "30px"}} as="h1" fontFamily="outfit" _dark={{color: colors.colorFontDarkBlue_Dark}}>Chat com {owner.user_name}</Heading>
                        {(chat) ? <ChatBox other={owner} user_id={user.user_id} chat_id={chat.chat_id}/> : <SignButton/>}
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

export default OfferPageChat;