import {Box, Flex, Avatar, Heading, Image, Stack, Text, SimpleGrid, Spacer, Divider, Input, Textarea, ButtonGroup, Button, useToast} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import HeaderToggle from "../../components/toggles/HeaderToggle";
import Footer from "../../components/Footer";
import colors from "../../colors/colors";
import testImg from "../../img/home/imgHomeMiddle.png";
import ProdInfoTableUpdt from "../../components/ProdInfoTableUpdt";
import ChatBox from "../../components/ChatBox";
import "../../fonts/fonts.css";

import {BsFillStarFill} from "react-icons/bs";

interface OwnerPageprops {
    offer : object;
    user : object;
}

const OfferPageOwner = ({offer, user} : OwnerPageprops) => {

    const [ updateOffer, setUpdateOffer ] = useState({
        ofr_name : offer.ofr_name,
        ofr_type : offer.ofr_type,
        ofr_status : offer.ofr_status,
        ofr_desc : offer.ofr_desc,
        ofr_value : offer.ofr_value,
        ofr_parcelas : offer.ofr_parcelas
    });
    const [updateProduct, setUpdateProd] = useState(false)
    const navigate = useNavigate();
    const toast = useToast();

    const handleChangeOffer = (e:ChangeEvent<HTMLInputElement>) => {
        setUpdateOffer(prev => ({...prev, [e.target.name]:e.target.value}));
        console.log(updateOffer);
    }

    async function updateOfferOprt() {
        await axios.put(`http://localhost:3344/offers/${offer.ofr_id}`, {
            ofr_name: updateOffer.ofr_name,
            ofr_type: updateOffer.ofr_type,
            ofr_status: updateOffer.ofr_status,
            ofr_desc: updateOffer.ofr_desc,
            ofr_value: updateOffer.ofr_value,
            ofr_parcelas: updateOffer.ofr_parcelas
        }, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            toast({
                position: 'bottom',
                render: () => (
                    <Stack bg="green.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", sm:"20px"}}>Oferta atualizada com sucesso!</Text>
                        <Button onClick={() => {navigate(0)}}>Atualizar a página</Button>
                    </Stack>
                )
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    async function deleteOfferOprt() {
        await axios.delete(`http://localhost:3344/offers/${offer.ofr_id}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            toast({
                position: 'bottom',
                render: () => (
                    <Stack bg="green.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", sm:"20px"}}>Oferta apagada com sucesso!</Text>
                        <Button onClick={() => {navigate("/")}}>Voltar para a Home</Button>
                    </Stack>
                )
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    async function deleteChatsOffer() {
        await axios.delete(`http://localhost:3344/chats/ofr_id/${offer.ofr_id}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>
                <Flex bg={colors.bgWhite} direction="column" align="center" h="fit-content" pt="10vh" _dark={{bg : colors.bgWhite_Dark}}>

                    <Flex direction="row" h="50vh" w="90%">
                        <Image src={testImg} objectFit="contain" h="95%" w="30%" noOfLines={1}></Image>
                        <Divider orientation="vertical" ml="2.5" mr="2.5"/>
                        <Stack w="65%" h="100%" spacing={8}>
                            <Stack direction="row">
                                <Input type="text" placeholder={offer.ofr_name} name="ofr_name" _placeholder={{color : colors.colorFontBlue}}
                                variant="flushed" fontFamily="outfit" fontSize={{base: "36px", sm: "34px"}} onChange={handleChangeOffer}/>
                            </Stack>
                            
                            <Flex direction="row" w="70%">
                                <SimpleGrid spacing={3} fontSize={{base:"20px", sm:"18px"}}>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Tipo de Oferta:</Text>
                                        <Input type="text" fontFamily="atkinson" placeholder={offer.ofr_type} name="ofr_type"
                                        _placeholder={{color : colors.colorFontBlue}} variant="flushed" onChange={handleChangeOffer} w="24%"/>
                                    </Flex>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Status da Oferta:</Text>
                                        <Input type="text" fontFamily="atkinson" placeholder={offer.ofr_status} name="ofr_status"
                                        _placeholder={{color : colors.colorFontBlue}} variant="flushed" onChange={handleChangeOffer} w="24%"/>
                                    </Flex>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Cidade:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontBlue}>{offer.ofr_city}</Text>
                                    </Flex>
                                </SimpleGrid>
                                <Spacer/>
                                <SimpleGrid spacing={3} fontSize={{base:"20px", sm:"18px"}}>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Valor:</Text>
                                        <Input type="number" fontFamily="atkinson" name="ofr_value" placeholder={(offer.ofr_type == "Doação") ? "Grátis" : `R$${offer.ofr_value}`}
                                        _placeholder={{color : colors.colorFontBlue}} variant="flushed" onChange={handleChangeOffer} w="24%"/>
                                    </Flex>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Data:</Text>
                                        <Text fontFamily="atkinson" color={colors.colorFontBlue}>{offer.ofr_postDate}</Text>
                                    </Flex>
                                    <Flex direction="row" align="center">
                                        <Text fontFamily="atkinson" mr="5px">Parcelas:</Text>
                                        <Input type="number" fontFamily="atkinson" placeholder={offer.ofr_parcelas} name="ofr_parcelas"
                                        _placeholder={{color : colors.colorFontBlue}} variant="flushed" onChange={handleChangeOffer} w="24%"/>
                                    </Flex>
                                </SimpleGrid>
                            </Flex>
                        </Stack>
                    </Flex>

                    <Divider/>

                    <Flex direction="row" h="50vh" w="90%">
                        <Stack w="45%" h="100%" mt="2vh">
                            <Heading as="h3" fontFamily="outfit" fontSize={{base: "36px", sm: "30px"}} color={colors.colorFontBlue}>Descrição</Heading>
                            <Textarea placeholder={offer.ofr_desc} fontSize={{base:"20px", sm:"18px"}} name="ofr_desc" onChange={handleChangeOffer} fontFamily="atkinson" w="100%" resize="vertical" h="70%"/>
                        </Stack>

                        <Divider orientation="vertical" mr="5%" ml="5%"/>

                        <Stack w="45%" h="100%" mt="2vh">
                            <Flex direction="row" align="center">
                                <Avatar name={user.user_name} src={user.user_img} mr="2%"></Avatar>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue} fontSize={{base:"22px", sm:"20px"}} mr="2%">{user.user_name}</Text>
                                <BsFillStarFill fill={colors.colorFontBlue}/>
                                <Text fontFamily="atkinson" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}} fontSize={{base:"22px", sm:"20px"}}>{(user.user_nota) ? user.user_nota : 0.0}</Text>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">Email:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue}>{user.user_email}</Text>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">Telefone:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue}>{user.user_phone}</Text>
                            </Flex>
                            <Flex direction="row">
                                <Text fontFamily="atkinson" mr="5px">CEP:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue}>{user.user_CEP}</Text>
                            </Flex>
                        </Stack>
                    </Flex>
                    <Divider/>
                    <Flex align="center" direction="column" h="fit-content" w="100%" mt="3%" mb="3%">
                        <ProdInfoTableUpdt update={updateProduct} ofr_id={offer.ofr_id}/>
                    </Flex>
                    <Divider/>

                    <Flex w="100%" h="fit-content" mt="3%" mb="3%" align="center" direction="column">
                        <Heading noOfLines={1} mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{base: "36px", sm: "30px"}} as="h1" fontFamily="outfit" _dark={{color: colors.colorFontDarkBlue_Dark}}>Chat com </Heading>
                        
                    </Flex>
                    <Flex w="100%" h="fit-content" align="center" direction="column" bg={colors.veryLightBlue} _dark={{bg : colors.veryLightBlue_Dark}} pb="5vh">
                        <Heading noOfLines={1} mt="3%" mb="3%" textAlign="center" color={colors.colorFontDarkBlue} fontSize={{base: "36px", sm: "30px"}} as="h1" fontFamily="outfit" _dark={{color: colors.colorFontDarkBlue_Dark}}>O que deseja fazer com a Oferta?</Heading>
                        <ButtonGroup gap={5}>
                            <Button colorScheme="linkedin" variant="solid" onClick={() => {setUpdateProd(true); updateOfferOprt()}}>Atualizar</Button>
                            <Button colorScheme="linkedin" variant="solid">Limpar mudanças</Button>
                            <Button colorScheme="linkedin" variant="solid" onClick={() => {deleteChatsOffer(); deleteOfferOprt();}}>Apagar</Button>
                        </ButtonGroup>
                    </Flex>
                </Flex>
            <Footer/>
        </Box>
    )
}

export default OfferPageOwner;