import {Divider, Flex, Spacer, Stack, Text, Image, Button, useToast, ToastPosition, UseToastOptions} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import colors from "../colors/colors";
import "../fonts/fonts.css";
import dateDisplayer from "./code/dataDisplayer";
import Messages from "./Messages";
import SignAdaptable from "./SignAdaptable";
import {BsChatText} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

interface offerFormprops {
    offer : object;
    admAssigned : number;
    admId : number;
}

const OfferFrom = ({offer, admAssigned, admId} : offerFormprops) => {
    const [img, setImg] = useState<any>();
    const toastRender = useToast();
    const navigate = useNavigate();
    const [prodChild, setChild] = useState([]);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (offer.prod_img) getProdImg();
        if (offer.ofr_id) getChatsOffer();
        if (offer.prod_type == "Cadeira de Rodas" || offer.prod_type == "Andador" || offer.prod_type == "Muleta" || offer.prod_type == "Bengala") getProductChild();
    }, [offer]);

    function toast(title:string, desc:string, time?:number, type?:UseToastOptions["status"], pos?:ToastPosition, close?:boolean){
        toastRender({
            title: title,
            description: desc,
            status: type,
            duration: time,
            position: pos,
            isClosable: close ? close : true
        })
    }

    async function getProdImg() {
        await axios.get(`http://localhost:3344/products/photo/${offer.prod_img}`, {responseType : "arraybuffer"}).then((res) => {
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

    async function getProductChild() {
        await axios.get(`http://localhost:3344/products/typeQuery/${offer.prod_type}/${offer.Product_prod_id}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setChild(res.data[0]);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getChatsOffer() {
        await axios.get(`http://localhost:3344/chats/offer/adm/${offer.ofr_id}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setChats(res.data);
        }).catch((error) => {
            console.log(error)
        });
    }

    async function deleteOffer() {
        if (admId == admAssigned) {
            await axios.delete(`http://localhost:3344/chats/offer/adm/${offer.ofr_id}`, {
                headers : {authorization : "Bearer " + localStorage.getItem("token")}
            }).catch((error) => {
                console.log(error);
            })
            await axios.delete(`http://localhost:3344/products/adm/${offer.Product_prod_id}`, {
                headers : {authorization : "Bearer " + localStorage.getItem("token")}
            }).catch((error) => {
                console.log(error);
            })
            await axios.delete(`http://localhost:3344/offers/adm/${offer.ofr_id}`, {
                headers : {authorization : "Bearer " + localStorage.getItem("token")}
            }).then((res) => {
                toast("Oferta apagada", "Você apagou a oferta com sucesso", 5000, "success")
                navigate(0)
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            toast("Você não é o responsável por essa denúncia!", "Não execute ações em denúncias das quais você não é responsável!", 3000, "error")
        }   
    }

    const renderChats = chats.map(item => {
        return <Flex w="100%" direction="column" align="center" mt="1%" key={item.chat_id}>
            <Divider orientation="horizontal" mb="1%"/>
            <Text fontSize="24px" mb="1%" textAlign="left">
                Chat(ID): {item.chat_id}
            </Text>
            <Divider orientation="horizontal" mb="1%"/>
            <Messages chatId={item.chat_id} targetId={offer.User_user_id}/>
            <Divider orientation="horizontal" mt="1%"/>
        </Flex>
    });

    return (
        <Flex w="100%" p="2%" direction="column" bg={colors.veryLightBlue} _dark={{bg : colors.veryLightBlue_Dark}}>
            <Flex w="100%" direction="row">
                <Stack w="50%" direction="column" fontFamily="outfit" spacing={3} fontSize="20px" borderRight="1px solid #0001" _dark={{borderRight : "1px solid #fff2"}}>
                    <Flex direction="row" w="95%" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>
                        <Text fontSize="24px">
                            Título: {offer.ofr_name}
                        </Text>
                        <Spacer/>
                        <Text fontSize="24px">
                            ID : {offer.ofr_id}
                        </Text>
                    </Flex>
                    
                    <Text>
                        Tipo de Oferta: {offer.ofr_type}
                    </Text>
                    <Text>
                        Status : {offer.ofr_status}
                    </Text>
                    <Text>
                        Valor : {(offer.ofr_type != "Doação") ? offer.ofr_value + "R$" : "Grátis"}
                    </Text>
                    <Text>
                        Parcelas : {offer.ofr_parcelas}
                    </Text>
                    <Text>
                        Data de Envio : {(offer.ofr_postDate) ? dateDisplayer(offer.ofr_postDate) : ""}
                    </Text>
                    <Text>
                        Cidade : {offer.ofr_city}
                    </Text>
                    <Flex direction="column" align="flex-start">
                        <Text mr="2%">
                            Descrição: 
                        </Text>
                        <Text fontFamily="atkinson" textAlign="justify" border="1px solid #000" borderRadius="10px" p="2%" w="95%" h="25vh" _dark={{border : "1px solid #fff"}}>
                            {offer.ofr_desc}
                        </Text>
                    </Flex>
                </Stack>

                <Stack w="50%" direction="column" fontFamily="outfit" spacing={3} ml="2%" fontSize="20px">
                    <Flex direction="row" w="95%" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>
                        <Text fontSize="24px">
                            Equipamento
                        </Text>
                        <Spacer/>
                        <Text fontSize="24px">
                            ID : {offer.Product_prod_id}
                        </Text>
                    </Flex>
                    <Flex direction="row" align="flex-start" w="100%">
                        <Text>
                            Foto:
                        </Text>  
                        <Image src={(offer.prod_img) ? img : null} w="60%" h="30vh" objectFit="contain"></Image>
                    </Flex>
                    <Text>
                        Tipo de Equipamento : {offer.prod_type}
                    </Text>
                    <Text>
                        Chave de identificação : {offer.prod_key}
                    </Text>
                    <Text>
                        Condição : {offer.prod_status}
                    </Text>
                    <Text>
                        Composição : {offer.prod_composition}
                    </Text>
                    <Text>
                        Altura : {offer.prod_height}m
                    </Text>
                    <Text>
                        Peso : {offer.prod_weight}kg
                    </Text>
                    {(offer.prod_type == "Cadeira de Rodas") ? <Stack spacing={3} w="100%">
                        <Text>
                            Largura : {prodChild.cad_width}cm
                        </Text>
                        <Text>
                            Largura do Acento : {prodChild.cad_widthSeat}cm
                        </Text>
                        <Text>
                            Tipo de Cadeira : {prodChild.cad_type}
                        </Text>
                        <Text>
                            Suporte máximo de peso : {prodChild.cad_maxWeight}kg
                        </Text>
                    </Stack> : null}
                    {(offer.prod_type == "Bengala") ? <Stack spacing={3} w="100%">
                        <Text>
                            Cor : {prodChild.ben_color}
                        </Text>
                        <Text>
                            Tipo de Bengala : {prodChild.ben_type}
                        </Text>
                        <Text>
                            Possui Regulador : {(prodChild.ben_regulator) ? "Sim" : "Não"}
                        </Text>
                        <Text display={(prodChild.ben_regulator) ? "normal" : "none"}>
                            Altura Máxima : {prodChild[0].ben_maxHeight}m
                        </Text>
                        <Text display={(prodChild.ben_regulator) ? "normal" : "none"}>
                            Altura Miníma : {prodChild.ben_minHeight}m
                        </Text>
                    </Stack> : null}
                    {(offer.prod_type == "Muleta") ? <Stack spacing={3} w="100%">
                        <Text>
                            Peso Máximo Suportado : {prodChild.mul_maxHeight}
                        </Text>
                        <Text>
                            Tipo de Muleta : {prodChild.mul_type}
                        </Text>
                        <Text>
                            Possui Regulador : {(prodChild.mul_regulator) ? "Sim" : "Não"}
                        </Text>
                        <Text display={(prodChild.mul_regulator) ? "normal" : "none"}>
                            Altura Máxima : {prodChild[0].mul_maxHeight}m
                        </Text>
                        <Text display={(prodChild.mul_regulator) ? "normal" : "none"}>
                            Altura Miníma : {prodChild.mul_minHeight}m
                        </Text>
                    </Stack>: null} 
                    {(offer.prod_type == "Andador") ? <Stack spacing={3} w="100%">
                        <Text>
                            Largura : {prodChild.and_width}
                        </Text>
                        <Text>
                            Comprimento : {prodChild.and_lenght}
                        </Text>
                        <Text>
                            Possui Regulador : {(prodChild.and_regulator) ? "Sim" : "Não"}
                        </Text>
                        <Text display={(prodChild.and_regulator) ? "normal" : "none"}>
                            Altura Máxima : {prodChild.and_maxHeight}m
                        </Text>
                        <Text display={(prodChild.and_regulator) ? "normal" : "none"}>
                            Altura Miníma : {prodChild.and_minHeight}m
                        </Text>
                    </Stack>: null}
                </Stack>
            </Flex>
            <Divider orientation="horizontal"/>
            <Flex direction="column" align="center" mt="1%">
                <Text fontSize="28px" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>
                    Chats
                </Text>
                {(chats.length > 0) ? renderChats : <SignAdaptable msg="Essa oferta não possuí Chats Iniciados" icon={<BsChatText size="20vh" />} bgType="none"/>}
            </Flex>
            <Divider orientation="horizontal"/>
            <Flex direction="column" align="center" mt="1%">
                <Text fontSize="28px" mb="2%" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>
                    Ações
                </Text>
                <Button colorScheme="linkedin" onClick={() => {
                    toastRender({
                        position: 'bottom',
                        render: () => (
                            <Stack bg="orange.500" align="center" direction="column" p="2vh" borderRadius="10px" spacing={2} _dark={{bg : "orange.200"}}>
                                <Text fontWeight="semibold" color="white" _dark={{color : "black"}} noOfLines={1} fontSize={{base:"22px", md:"20px"}}>Certeza que a oferta deve ser deletada?</Text>
                                <Stack direction="row">
                                    <Button variant="outline" color="#fff"  _dark={{color : "black"}} _hover={{bg:"#fff2"}} onClick={() => {deleteOffer();}}>Sim</Button>
                                    <Button variant="outline" color="#fff" _dark={{color : "black"}}  _hover={{bg:"#fff2"}} onClick={() => {toastRender.closeAll()}}>Não</Button>    
                                </Stack>
                            </Stack>
                        )
                    })
                }}>
                    Apagar oferta
                </Button>
            </Flex>
        </Flex>
    )
}

export default OfferFrom;