import {Avatar, Box, Divider, Flex, Heading, SimpleGrid, Spacer, Stack, Text, Img} from "@chakra-ui/react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import decode from "../components/code/decode";
import colors from "../colors/colors";
import "../fonts/fonts.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BiSolidRightArrow } from "react-icons/bi";
import dateDisplayer from "../components/code/dataDisplayer";
import OfferFrom from "../components/OfferForm";

const ReportPage = () => {
    const {id} = useParams();
    const [adm, setAdm] = useState(decode(localStorage.getItem("token")));
    const [report, setReport] = useState([]);
    const [reportEnv, setReportEnv] = useState([]);
    const [offers, setOffers] = useState([]);
    const [recImg, setRecImg] = useState<any>();
    const [envImg, setEnvImg] = useState<any>();

    const colorsList = [
        "#8E1F96",
        "#3CA500",
        "#F9D400",
        "#E00300",
        "#7C0300"
    ]

    async function getReport() {
        await axios.get(`http://localhost:3344/denounce/id/${id}`, {headers :{
            authorization: "Bearer " + localStorage.getItem("token")
        }}).then((res) => {
            setReport(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function getUserEnv() {
        await axios.get(`http://localhost:3344/users/id/${report.User_user_idEnv}`).then((res) => {
            setReportEnv(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function getOffer() {
        await axios.get(`http://localhost:3344/offers/id/${report.Offer_ofr_id}`).then((res) => {
            setOffers(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getOffersUser() {
        await axios.get(`http://localhost:3344/offers/user/${report.user_email}`).then((res) => {
            setOffers(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    async function getRecImg() {
        await axios.get(`/users/profile/photo/${report.user_img}`, {responseType : "arraybuffer"}).then((res) => {
            const buffer = new Uint8Array(res.data);
            const blob = new Blob([buffer], { type: res.headers.contentType });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setRecImg(reader.result);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    async function getEnvImg() {
        await axios.get(`/users/profile/photo/${reportEnv.user_img}`, {responseType : "arraybuffer"}).then((res) => {
            const buffer = new Uint8Array(res.data);
            const blob = new Blob([buffer], { type: res.headers.contentType });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setEnvImg(reader.result);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (id) getReport();
    }, [id]);

    useEffect(() => {
        if (report.user_img) getRecImg();
        if (report.User_user_idEnv) getUserEnv();
        if(report.Offer_ofr_id)  getOffer()
        else{ if(report.user_email) getOffersUser();}
    }, [report])

    useEffect(() => {
        if (reportEnv.user_img) getEnvImg();
    }, [reportEnv])

    const renderOfferForms = offers.map(item => {
        return <OfferFrom offer={item} key={item.ofr_id}/>;
    })

    return (
        <Box w="100%" h="100%">
            <Header adm={adm}/>

            <Flex w="100%" bg={colors.bgWhite} _dark={{bg : colors.bgWhite_Dark}} pt="8vh" align="center" direction="column">
                <Flex direction="row" align="center" w="100%">
                    <BiSolidRightArrow size="20vh" color={colorsList[report.den_gravity - 1]}/>
                    <Heading as="h1" fontFamily="outfit">
                        {report.den_reason}
                    </Heading>
                    <Spacer/>
                    <Heading as="h1" mr="2vw" fontFamily="outfit">
                        Código(id) : {report.den_id}
                    </Heading>
                </Flex>

                <Divider orientation="horizontal"/>

                <Flex w="100%" direction="row" align="centers">
                    <Stack direction="column" fontFamily="outfit" p="2%" w="100%">
                        <SimpleGrid fontSize="20px" spacing={5}>
                            <Text>
                                Feita em: {(report.den_date) ? dateDisplayer(report.den_date) : ""};
                            </Text>
                            <Text color={colorsList[report.den_gravity - 1]}>
                                Gravidade: {report.den_gravity};
                            </Text>
                            {(report.Offer_ofr_id) ? <Text>
                                Id da oferta: {report.Offer_ofr_id};
                            </Text> : null}
                            <Flex direction="row" align="flex-start">
                                <Text mr="2%">
                                    Descrição: 
                                </Text>
                                <Text fontFamily="atkinson" textAlign="justify" border="1px solid #000" borderRadius="10px" p="2%" w="50%" h="25vh" _dark={{border : "1px solid #fff"}}>
                                    {report.den_content}
                                </Text>
                            </Flex>
                        </SimpleGrid>
                    </Stack>
                </Flex>

                <Divider orientation="horizontal"/>

                <Flex w="100%" direction="row" align="flex-start" mt="1%" mb="1%">
                    <Stack direction="row" spacing={4} w="50%" pl="1%">
                        <Stack direction="column" w="100%">
                            <Heading color={colors.colorFontBlue} as="h4">
                                Feita por:
                            </Heading>
                            <Text ml="1%" fontSize="20px" fontFamily="outfit">
                                Nome de Usuário: {reportEnv.user_name}; 
                            </Text>
                            <Text ml="1%" fontSize="20px" fontFamily="outfit">
                                Id do usuário: {reportEnv.user_id};
                            </Text>
                            <Text ml="1%" fontSize="20px" fontFamily="outfit">
                                Email: {reportEnv.user_email};
                            </Text>
                        </Stack>
                    </Stack>
                    
                    <Stack direction="row" w="50%" align="flex-start">
                        <Heading color={colors.colorFontDarkBlue} _dark={{color: colors.colorFontDarkBlue_Dark}} as="h5">
                            Avatar:
                        </Heading>
                        <Spacer/>
                        <Avatar size="2xl" w="30vh" h="30vh" name={reportEnv.user_name} src={(reportEnv.user_img) ? envImg : ""}/>
                        <Spacer/>
                    </Stack>
                </Flex>

                <Divider orientation="horizontal"/>

                <Flex w="100%" direction="row" align="center" mt="1%" mb="1%">
                    <Stack direction="row" spacing={4} w="50%" pl="1%">
                        <Stack direction="column" w="100%">
                            <Heading color={colors.colorFontBlue} as="h4">
                                Alvo:
                            </Heading>
                            <Text ml="1%" fontSize="20px" fontFamily="outfit">
                                Nome de Usuário: {report.user_name}; 
                            </Text>
                            <Text ml="1%" fontSize="20px" fontFamily="outfit">
                                Id do usuário: {report.user_id};
                            </Text>
                            <Text ml="1%" fontSize="20px" fontFamily="outfit">
                                Email: {report.user_email};
                            </Text>
                        </Stack>
                    </Stack>
                    
                    <Stack direction="row" w="50%" align="flex-start">
                        <Heading color={colors.colorFontDarkBlue} _dark={{color: colors.colorFontDarkBlue_Dark}} as="h5">
                            Avatar:
                        </Heading>
                        <Spacer/>
                        <Avatar size="2xl" w="30vh" h="30vh" name={report.user_name} src={(report.user_img) ? recImg : ""}/>
                        <Spacer/>
                    </Stack>
                </Flex>

                <Divider orientation="horizontal"/>

                <Stack direction="column" align="center" mt="1%" w="100%" spacing={8}>
                    <Heading as="h3" color={colors.colorFontBlue} mb="1%">{(report.Offer_ofr_id) ? "Informações sobre a Oferta" : "Ofertas do usuário"}</Heading>
                    {renderOfferForms}
                </Stack>
            </Flex>
        </Box>
    )
}

export default ReportPage;