import {Divider, Flex, Spacer, Stack, Text, Image} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import colors from "../colors/colors";
import "../fonts/fonts.css";
import dateDisplayer from "./code/dataDisplayer";

interface offerFormprops {
    offer : object;
}

const OfferFrom = ({offer} : offerFormprops) => {
    const [img, setImg] = useState<any>();
    const [prodChild, setChild] = useState([]);

    useEffect(() => {
        if (offer.prod_img) getProdImg();
        if (offer.prod_type == "Cadeira de Rodas" || offer.prod_type == "Andador" || offer.prod_type == "Muleta" || offer.prod_type == "Bengala") getProductChild();
    }, [offer]);

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
            setChild(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

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
                            Id : {offer.ofr_id}
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
                            Id : {offer.Product_prod_id}
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
                            Largura : {prodChild[0].cad_width}cm
                        </Text>
                        <Text>
                            Largura do Acento : {prodChild[0].cad_widthSeat}cm
                        </Text>
                        <Text>
                            Tipo de Cadeira : {prodChild[0].cad_type}
                        </Text>
                        <Text>
                            Suporte máximo de peso : {prodChild[0].cad_maxWeight}kg
                        </Text>
                    </Stack> : null}
                    {(offer.prod_type == "Bengala") ? <Stack spacing={3} w="100%">
                        <Text>
                            Cor : {prodChild[0].ben_color}
                        </Text>
                        <Text>
                            Tipo de Bengala : {prodChild[0].ben_type}
                        </Text>
                        <Text>
                            Possui Regulador : {(prodChild[0].ben_regulator) ? "Sim" : "Não"}
                        </Text>
                        <Text display={(prodChild[0].ben_regulator) ? "normal" : "none"}>
                            Altura Máxima : {prodChild[0].ben_maxHeight}m
                        </Text>
                        <Text display={(prodChild[0].ben_regulator) ? "normal" : "none"}>
                            Altura Miníma : {prodChild[0].ben_minHeight}m
                        </Text>
                    </Stack> : null}
                    {(offer.prod_type == "Muleta") ? <Stack spacing={3} w="100%">
                        <Text>
                            Peso Máximo Suportado : {prodChild[0].mul_maxHeight}
                        </Text>
                        <Text>
                            Tipo de Muleta : {prodChild[0].mul_type}
                        </Text>
                        <Text>
                            Possui Regulador : {(prodChild[0].mul_regulator) ? "Sim" : "Não"}
                        </Text>
                        <Text display={(prodChild[0].mul_regulator) ? "normal" : "none"}>
                            Altura Máxima : {prodChild[0].mul_maxHeight}m
                        </Text>
                        <Text display={(prodChild[0].mul_regulator) ? "normal" : "none"}>
                            Altura Miníma : {prodChild[0].mul_minHeight}m
                        </Text>
                    </Stack>: null} 
                    {(offer.prod_type == "Andador") ? <Stack spacing={3} w="100%">
                        <Text>
                            Largura : {prodChild[0].and_width}
                        </Text>
                        <Text>
                            Comprimento : {prodChild[0].and_lenght}
                        </Text>
                        <Text>
                            Possui Regulador : {(prodChild[0].and_regulator) ? "Sim" : "Não"}
                        </Text>
                        <Text display={(prodChild[0].and_regulator) ? "normal" : "none"}>
                            Altura Máxima : {prodChild[0].and_maxHeight}m
                        </Text>
                        <Text display={(prodChild[0].and_regulator) ? "normal" : "none"}>
                            Altura Miníma : {prodChild[0].and_minHeight}m
                        </Text>
                    </Stack>: null}
                </Stack>
            </Flex>
            <Divider orientation="horizontal"/>
            <Flex direction="column" align="center" mt="1%">
                <Text fontSize="28px" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>
                    Chats
                </Text>
                
            </Flex>
        </Flex>
    )
}

export default OfferFrom;