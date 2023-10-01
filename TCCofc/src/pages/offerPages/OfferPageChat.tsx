import { Box, Flex, Avatar, Heading, Image, Stack, Text, SimpleGrid, Spacer, Divider, Button, useToast, ButtonGroup, useDisclosure, others } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

import HeaderToggle from "../../components/toggles/HeaderToggle";
import Footer from "../../components/Footer";
import colors from "../../colors/colors";
import testImg from "../../img/home/imgHomeMiddle.png";
import ProdInfoTable from "../../components/ProdInfoTable";
import ChatBox from "../../components/chats/ChatBox";
import "../../fonts/fonts.css";

import { BsFillStarFill } from "react-icons/bs";
import { BsChatLeftText } from "react-icons/bs";
import { GiUncertainty } from "react-icons/gi";

import CardOffer from "../../components/offerCards/OfferCard";
import OfferList from "../../components/offerCards/OfferList";
import SignNotFound from "../../components/signs/SignNotFound";
import Avaliation from "../../components/Avaliation";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineReport, MdOutlineReportProblem } from "react-icons/md";
import dateDisplayer from "../../components/code/dataDisplayer";

interface ChatPage {
    offer: object;
    user: object;
}

const OfferPageChat = ({ offer, user }: ChatPage) => {

    const [owner, setOwner] = useState([]);
    const [recomended, setRecom] = useState([]);
    const [chat, setChat] = useState([]);
    const [reports, setReports] = useState(false);
    const [chatBool, setChatBool] = useState(false);
    const [compUser, setCompUser] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [imgShow, setShow] = useState<any>();
    const [img, setImg] = useState<any>();

    const toast = useToast();
    const navigate = useNavigate();
    let renderTest = false;

    async function createChat() {
        await axios.post(`http://localhost:3344/chats`, {
            Offer_ofr_id: offer.ofr_id,
            User_user_id: user.user_id
        }, { headers: { authorization: "Bearer " + localStorage.getItem("token") } }).then(res => {
            console.log(res);
            setChatBool(true);
        }).catch(error => {
            console.log("Bitch")
            console.log(error);
        });
    }

    async function getChat() {
        await axios.get(`http://localhost:3344/chats/user/offer/${user.user_id}/${offer.ofr_id}`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then(res => {
            setChat(res.data[0]);
        }).catch(error => {
            console.log(error);
        })
    }

    async function getUserIntrested(id: number) {
        await axios.get(`http://localhost:3344/users/id/${id}`).then((res) => {
            setCompUser(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getReports() {
        await axios.get(`http://localhost:3344/denounce/offer/${offer.ofr_id}`).then(res => {
            if (res.data.length > 0) setReports(true);
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

    async function endComprisse() {
        await axios.put(`http://localhost:3344/offers/remove-intrest/${offer.ofr_id}`, {
        }, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            toast({
                position: 'bottom',
                render: () => (
                    <Stack bg="green.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{ base: "22px", md: "20px" }}>Compromisso apagado com sucesso!</Text>
                    </Stack>
                )
            })
            navigate(0);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function confirmEquipament() {
        await axios.put(`http://localhost:3344/offers/confirm-equipament/${offer.ofr_id}/${"Rec"}`, {
        }, {
            headers: {
                authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            toast({
                position: 'bottom',
                render: () => (
                    <Stack bg="green.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{ base: "22px", md: "20px" }}>Recebimento do equipamento confirmado!</Text>
                    </Stack>
                )
            })
            navigate(0);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function queryOwner() {
        await axios.get(`http://localhost:3344/users/id/${offer.User_user_id}`).then(res => {
            setOwner(res.data);
        }).catch(error => {
            console.log(error);
        })
    };

    async function getImg() {
        await axios.get(`http://localhost:3344/users/profile/photo/${owner.user_img}`, { responseType: "arraybuffer" }).then(res => {
            const buffer = new Uint8Array(res.data);
            const blob = new Blob([buffer], { type: res.headers.contentType });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setImg(reader.result);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getProdImg() {
        await axios.get(`http://localhost:3344/products/photo/${offer.prod_img}`, { responseType: "arraybuffer" }).then(res => {
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
        if (owner.user_img) getImg();
    }, [owner])

    useEffect(() => {
        const canceltoken = axios.CancelToken.source();

        if (offer.ofr_id) {
            queryOffersRecomended();
            queryOwner();
            getProdImg();
            if (offer.user_comp_id == user.user_id) getUserIntrested(offer.user_comp_id);
            if (user.user_id) getChat();
            getReports();
        }

        return () => {
            canceltoken.cancel();
        }
    }, [offer, user]);

    useEffect(() => {
        const canceltoken = axios.CancelToken.source();
        (chatBool) ? getChat() : "";
        return () => {
            canceltoken.cancel();
        }
    }, [chatBool])

    const renderRecom = recomended.map(item => {
        if (item.ofr_city != offer.ofr_city || item.ofr_id == offer.ofr_id) return <div key={item.ofr_id}></div>
        renderTest = true;
        return <CardOffer
            key={item.ofr_id}
            title={item.ofr_name}
            composition={item.prod_composition}
            condition={item.prod_status}
            img={item.prod_img}
            value={item.ofr_value}
            type={item.prod_type}
            id={item.ofr_id} />
    });

    const SignButton = () => {
        return (
            <Flex align="center" h="40vh" direction="column"
                bgGradient="linear(to-b, #1976D230, #1976D2)"
                w="100%" pt="3%">
                <BsChatLeftText size="45%" />
                <Text fontSize="25px" fontFamily="atkinson" textAlign="center">Você ainda não falou com {owner.user_name}, que tal iniciar uma conversa?</Text>
                <Button variant="outline" bgColor="#0000" _hover={{bg : "#fff3"}} mt="1.5%" onClick={() => { createChat() }}>Criar um chat</Button>
            </Flex>
        )
    }

    return (
        <Box w="100%" h="100%">
            <HeaderToggle />
            <Flex bg={colors.bgWhite} direction="column" align="center" h="fit-content" pt="10vh" _dark={{ bg: colors.bgWhite_Dark }}>

                <Flex direction={{ base: "column", md: "row" }} h={{ base: "fit-content", md: "50vh" }} w="90%">
                    <Image src={(imgShow) ? imgShow : ""} objectFit="contain" h={{ base: "40vh", md: "95%" }} w={{ base: "100%", md: "30%" }}></Image>
                    <Divider orientation="vertical" ml="2.5" mr="2.5" display={{ base: "none", md: "inherit" }} />
                    <Stack w={{ base: "100%", md: "65%" }} h="100%" spacing={8}>
                        <Heading as="h1" fontFamily="outfit" fontSize={{ base: "32px", md: "34px" }} color={colors.colorFontBlue} noOfLines={{ md: 1 }}>{offer.ofr_name}</Heading>
                        <Flex direction={{ base: "column", md: "row" }} w="100%">
                            <SimpleGrid spacing={3} fontSize={{ base: "20px", md: "18px" }}>
                                <Flex direction="row">
                                    <Text fontFamily="atkinson" mr="5px">Tipo de Oferta:</Text>
                                    <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{offer.ofr_type}</Text>
                                </Flex>
                                <Flex direction="row">
                                    <Text fontFamily="atkinson" mr="5px">Status da Oferta:</Text>
                                    <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{offer.ofr_status}</Text>
                                </Flex>
                                <Flex direction="row">
                                    <Text fontFamily="atkinson" mr="5px">Cidade:</Text>
                                    <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{offer.ofr_city}</Text>
                                </Flex>
                            </SimpleGrid>
                            <Spacer />
                            <SimpleGrid spacing={3} fontSize={{ base: "20px", md: "18px" }}>
                                <Flex direction="row">
                                    <Text fontFamily="atkinson" mr="5px">Valor:</Text>
                                    <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{(offer.ofr_type == "Doação") ? "Grátis" : `R$${offer.ofr_value}`}</Text>
                                </Flex>
                                <Flex>
                                    <Text fontFamily="atkinson" mr="5px">Data:</Text>
                                    <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{(offer.ofr_postDate) ? dateDisplayer(offer.ofr_postDate) : ""}</Text>
                                </Flex>
                                <Flex>
                                    <Text fontFamily="atkinson" mr="5px">Parcelas:</Text>
                                    <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{(offer.ofr_parcelas) ? offer.ofr_parcelas : "Nenhuma"}</Text>
                                </Flex>
                            </SimpleGrid>
                            <Spacer />
                            {(compUser.user_id) ? <Flex bg={colors.bgTableRow1} p="1%" justifyContent="center" direction="row" align="center" ml={{ base: 0, md: "2%" }} w="fit-content" borderRadius="15px" mt={{ base: "3%", md: 0 }} _dark={{ bg: colors.bgTableRow1_Dark }}>
                                <Text fontFamily="atkinson" fontSize={{ base: "19px", md: "20px" }}>Você fechou com essa oferta!</Text>
                            </Flex> : ""}
                        </Flex>
                        {(reports) ? <Flex bg="red.500" color="#fff" direction={{ base: "column", md: "row" }} maxW={{ base: "100%", md: "68%" }} align="center" w="fit-content" p={{ base: "1%", md: "0px 20px 0px 5px" }} borderRadius="10px">
                            <MdOutlineReportProblem size="60%" />
                            <Spacer />
                            <Text textAlign={{ base: "center", md: "justify" }} fontSize={{ base: "22px", md: "18px" }}>Essa oferta possui denúncias! Estamos avaliando-a para evitar danos à comunidade. Não recomendamos interações...</Text>
                        </Flex> : ""}
                    </Stack>
                </Flex>

                <Divider />

                <Flex direction={{ base: "column", md: "row" }} h={{ base: "fit_content", md: "50vh" }} w="90%">
                    <Stack w={{ base: "100%", md: "45%" }} h={{ base: "50vh", md: "100%" }} mt="2vh">
                        <Heading as="h3" fontFamily="outfit" fontSize={{ base: "32px", md: "30px" }} color={colors.colorFontBlue}>Descrição</Heading>
                        <Text textAlign="justify" fontSize={{ base: "22px", md: "19px" }}>{offer.ofr_desc}</Text>
                    </Stack>

                    <Divider orientation="vertical" mr="5%" ml="5%" display={{ base: "none", md: "inherit" }} />

                    <Stack w={{ base: "100%", md: "45%" }} h={{ base: "20vh", md: "100%" }} mt="2vh" fontSize={{ base: "20px", md: "18px" }}>
                        <Flex direction="row" align="center">
                            <Link to={`/profile/${owner.user_email}/view`}><Avatar name={owner.user_name} src={(owner.user_img) ? img : ""} _hover={{ border: `2px solid ${colors.colorFontBlue}`, _dark: { border: "2px solid #fff" } }}></Avatar></Link>
                            <Text fontFamily="atkinson" color={colors.colorFontBlue} fontSize={{ base: "22px", md: "20px" }} ml="2%" mr="2%">{owner.user_name}</Text>
                            <BsFillStarFill fill={colors.colorFontBlue} />
                            <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }} fontSize={{ base: "22px", md: "20px" }}>{(owner.user_nota) ? owner.user_nota : "Novo"}</Text>
                            <Spacer />
                            <Button variant="ghost" w="fit-content" onClick={() => {
                                toast({
                                    position: 'bottom',
                                    render: () => (
                                        <Stack bg="red.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                                            <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{ base: "22px", md: "20px" }}>Certeza que deseja denunciar essa oferta?</Text>
                                            <Stack direction="row">
                                                <Button color="#fff" _hover={{ bg: "#fff2" }} variant="outline" onClick={() => { navigate(`/report/offer/${offer.ofr_id}`), toast.closeAll() }}>Sim</Button>
                                                <Button color="#fff" _hover={{ bg: "#fff2" }} variant="outline" onClick={() => { toast.closeAll() }}>Não</Button>
                                            </Stack>
                                        </Stack>
                                    )
                                })
                            }}><MdOutlineReport size="5vh" /></Button>
                        </Flex>
                        <Flex direction="row">
                            <Text fontFamily="atkinson" mr="5px">Email:</Text>
                            <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{owner.user_email}</Text>
                        </Flex>
                        <Flex direction="row">
                            <Text fontFamily="atkinson" mr="5px">Telefone:</Text>
                            <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{owner.user_phone}</Text>
                        </Flex>
                        <Flex direction="row">
                            <Text fontFamily="atkinson" mr="5px">CEP:</Text>
                            <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{owner.user_CEP}</Text>
                        </Flex>
                    </Stack>
                </Flex>
                <Divider />
                <Flex align="center" direction="column" h="fit-content" w="100%" mt="3%" mb="3%">
                    <ProdInfoTable ofr_id={offer.ofr_id} />
                </Flex>
                <Divider />

                <Flex w="100%" h="fit-content" mt="3%" mb="3%" align="center" direction="column">
                    <Heading noOfLines={1} mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{ base: "36px", md: "30px" }} as="h1" fontFamily="outfit" _dark={{ color: colors.colorFontDarkBlue_Dark }}>Negocie com {owner.user_name}</Heading>
                    {(chat) ? <ChatBox other={owner} user_id={user.user_id} chat_id={chat.chat_id} offer={offer} /> : <SignButton />}
                </Flex>
            </Flex>

            <Flex w="100%" h="fit-content" align="center" direction="column" bg={colors.veryLightBlue} _dark={{ bg: colors.veryLightBlue_Dark }}>
                <Heading noOfLines={1} mt="3%" mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{ base: "36px", md: "30px" }} as="h1" fontFamily="outfit" _dark={{ color: colors.colorFontDarkBlue_Dark }}>Ofertas Recomendadas</Heading>
                {(renderTest) ? <OfferList component={renderRecom} /> : <SignNotFound icon={<GiUncertainty size="45%" />} msg="Parece que não há o que recomendar à partir dessa oferta...Considere realiazar uma pesquisa com mais detalhes!" />}
            </Flex>
            {(compUser.user_id) ? <Flex w="100%" h="fit-content" align="center" direction="column" bg={colors.bgWhite} _dark={{ bg: colors.bgWhite_Dark }} pb="5vh">
                <Heading mt="3%" mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{ base: "32px", md: "30px" }} noOfLines={{ base: 2, md: 1 }} as="h1" fontFamily="outfit" _dark={{ color: colors.colorFontDarkBlue_Dark }}>O que deseja fazer com o Compromisso?</Heading>
                <ButtonGroup gap={5} flexDirection={{ base: "column", md: "row" }}>
                    <Button colorScheme="linkedin" variant="solid" onClick={() => {
                        toast({
                            position: 'bottom',
                            render: () => (
                                <Stack bg="red.500" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                                    <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{ base: "22px", md: "20px" }}>Certeza que deseja apagar esse compromisso?</Text>
                                    <Stack direction="row">
                                        <Button variant="outline" color="#fff" _hover={{ bg: "#fff2" }} onClick={() => {
                                            (offer.ofr_status == "Conclusão") ? toast({
                                                title: 'O compromisso não pode ser encerrado!',
                                                description: "O equipamento já foi enviado.",
                                                status: 'error',
                                                duration: 9000,
                                                isClosable: true
                                            })
                                            : endComprisse()
                                        }}>Sim</Button>
                                        <Button variant="outline" color="#fff" _hover={{ bg: "#fff2" }} onClick={() => { toast.closeAll() }}>Não</Button>
                                    </Stack>
                                </Stack>
                            )
                        })
                    }}>Encerrar Compromisso</Button>
                    <Button colorScheme="linkedin" variant="solid" onClick={() => {
                        (offer.ofr_rec_conf) ? toast({
                            title: 'Você já confirmou o recebimento do equipamento!',
                            description: "Não é necessário confirmar mais de uma vez!",
                            status: 'error',
                            duration: 9000,
                            isClosable: true
                        }) : (offer.ofr_env_conf) ? confirmEquipament() :
                        toast({
                            title: 'O envio do equipamento não foi confirmado!',
                            description: "Não é possível confirmar a chegada do produto sem ele ter sido enviado.",
                            status: 'error',
                            duration: 9000,
                            isClosable: true
                        });
                    }}>Equipamento Recebido</Button>
                    {(offer.ofr_env_conf && offer.ofr_rec_conf) ? <Button colorScheme="linkedin" variant="solid" onClick={() => {
                        onOpen();
                    }}>Avaliar</Button> : ""}
                </ButtonGroup>
                <Avaliation user_name={owner.user_name} isOpen={isOpen} setClose={onClose} recUserId={offer.User_user_id} envUserId={compUser.user_id} user_img={img} />
            </Flex> : ""}
            <Footer />
        </Box>
    )
}

export default OfferPageChat;