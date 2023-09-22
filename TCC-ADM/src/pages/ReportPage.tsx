import {Avatar, Box, Divider, Flex, Heading, SimpleGrid, Spacer, Stack, Text, Img, Button, useToast, UseToastOptions} from "@chakra-ui/react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import decode from "../components/code/decode";
import colors from "../colors/colors";
import "../fonts/fonts.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BiSolidRightArrow } from "react-icons/bi";
import dateDisplayer from "../components/code/dataDisplayer";
import OfferFrom from "../components/OfferForm";

const ReportPage = () => {
    const {id} = useParams();
    const toastRender = useToast();
    const navigate = useNavigate();
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

    async function getReport() {
        await axios.get(`http://localhost:3344/denounce/id/${id}`, {headers :{
            authorization: "Bearer " + localStorage.getItem("token")
        }}).then((res) => {
            setReport(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function getAdm() {
        await axios.get(`http://localhost:3344/adm/id/${adm.email}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")
        }}).then((res) => {
            setAdm(prev => ({...prev, adm_id : res.data[0].adm_id}));
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
        await axios.get(`http://localhost:3344/users/profile/photo/${report.user_img}`, {responseType : "arraybuffer"}).then((res) => {
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
        await axios.get(`http://localhost:3344/users/profile/photo/${reportEnv.user_img}`, {responseType : "arraybuffer"}).then((res) => {
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

    async function deleteUser(userId : number) {    
        if (adm.adm_id == report.adm_assigned) {
            await axios.delete(`http://localhost:3344/users/adm/${userId}`, {
                headers : { authorization : "Bearer " + localStorage.getItem("token")}
            }).then((res) => {
                toast("Usuário apagado", "O usuário foi apagado com sucesso!", 3000 , "success")
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            toast("Você não é o responsável por essa denúncia!", "Não execute ações em denúncias das quais você não é responsável!", 3000, "error")
        }    
    }

    async function reducePointsUser(userId : number) {
        if (adm.adm_id == report.adm_assigned) {
            await axios.put(`http://localhost:3344/adm/reduce/points/${userId}`, {}, {
                headers : { authorization : "Bearer " + localStorage.getItem("token")}
            }).then((res) => {
                toast("Nota Reduzida!", "O usuário perdeu 1 ponto de nota", 3000 , "success");
                navigate(0);
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            toast("Você não é o responsável por essa denúncia!", "Não execute ações em denúncias das quais você não é responsável!", 3000, "error")
        }   
    }

    async function endReport() {
        if (adm.adm_id == report.adm_assigned) {
            await axios.delete(`http://localhost:3344/denounce/${report.den_id}`, {
                headers : { authorization : "Bearer " + localStorage.getItem("token")}
            }).then((res) => {
                toast("Denúncia apagada", "A denúncia foi finalizada", 3000 , "success");
                navigate("/");
            }).catch((error) => {
                console.log(error);
            })
        }
        else {
            toast("Você não é o responsável por essa denúncia!", "Não execute ações em denúncias das quais você não é responsável!", 3000, "error")
        }   
    }

    useEffect(() => {
        if (id) getReport();
        getAdm();
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
        return <OfferFrom offer={item} admAssigned={report.adm_assigned} admId={adm.adm_id} key={item.ofr_id}/>;
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
                            <Text>
                                Status: {report.den_status};
                            </Text>
                            {(report.Offer_ofr_id) ? <Text>
                                Id da oferta: {report.Offer_ofr_id};
                            </Text> : null}
                            <Flex direction="row" align="flex-start">
                                <Text mr="2%">
                                    Descrição: 
                                </Text>
                                <Text fontFamily="atkinson" textAlign="justify" border="1px solid #000" borderRadius="10px" p="1%" w="50%" h="25vh" _dark={{border : "1px solid #fff"}}>
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
                                Nota do Usuário: {reportEnv.user_nota}; 
                            </Text>
                            <Text ml="1%" fontSize="20px" fontFamily="outfit">
                                Id do usuário: {reportEnv.user_id};
                            </Text>
                            <Text ml="1%" fontSize="20px" fontFamily="outfit">
                                Email: {reportEnv.user_email};
                            </Text>
                            <Stack direction="row" spacing={3} align="center">
                                <Text ml="1%" fontSize="20px" fontFamily="outfit">
                                    Ações: 
                                </Text>
                                <Button variant="solid" colorScheme="linkedin" onClick={() => {
                                    toastRender({
                                        position: 'bottom',
                                        render: () => (
                                            <Stack bg="orange.500" align="center" direction="column" p="2vh" borderRadius="10px" spacing={2} _dark={{bg : "orange.200"}}>
                                                <Text fontWeight="semibold" color="white" _dark={{color : "black"}} noOfLines={1} fontSize={{base:"22px", md:"20px"}}>Certeza que esse usuário deve ser apagado?</Text>
                                                <Stack direction="row">
                                                    <Button variant="outline" color="#fff"  _dark={{color : "black"}} _hover={{bg:"#fff2"}} onClick={() => {deleteUser(reportEnv.user_id);}}>Sim</Button>
                                                    <Button variant="outline" color="#fff" _dark={{color : "black"}}  _hover={{bg:"#fff2"}} onClick={() => {toastRender.closeAll()}}>Não</Button>    
                                                </Stack>
                                            </Stack>
                                        )
                                    })
                                }}>
                                    Apagar perfil
                                </Button>
                                <Button variant="solid" colorScheme="linkedin"  onClick={() => {
                                    toastRender({
                                        position: 'bottom',
                                        render: () => (
                                            <Stack bg="orange.500" h="fit-content" align="center" direction="column" p="2vh" borderRadius="10px" spacing={2} _dark={{bg : "orange.200"}}>
                                                <Text fontWeight="semibold" color="white" _dark={{color : "black"}} noOfLines={2} fontSize={{base:"22px", md:"20px"}}>Certeza que esse usuário deve ser penalizado?</Text>
                                                <Text fontWeight="semibold" color="white" _dark={{color : "black"}} noOfLines={2} fontSize={{base:"22px", md:"20px"}}>Perdendo um(1) ponto em sua nota?</Text>
                                                <Stack direction="row">
                                                    <Button variant="outline" color="#fff"  _dark={{color : "black"}} _hover={{bg:"#fff2"}} onClick={() => {reducePointsUser(reportEnv.user_id);}}>Sim</Button>
                                                    <Button variant="outline" color="#fff" _dark={{color : "black"}}  _hover={{bg:"#fff2"}} onClick={() => {toastRender.closeAll()}}>Não</Button>    
                                                </Stack>
                                            </Stack>
                                        )
                                    })
                                    }}>
                                    Reduzir Avaliação
                                </Button>
                            </Stack>
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
                                Nota do Usuário: {report.user_nota}; 
                            </Text>
                            <Text ml="1%" fontSize="20px" fontFamily="outfit">
                                Id do usuário: {report.user_id};
                            </Text>
                            <Text ml="1%" fontSize="20px" fontFamily="outfit">
                                Email: {report.user_email};
                            </Text>
                            <Stack direction="row" spacing={3} align="center">
                                <Text ml="1%" fontSize="20px" fontFamily="outfit">
                                    Ações: 
                                </Text>
                                <Button variant="solid" colorScheme="linkedin"  onClick={() => {
                                    toastRender({
                                        position: 'bottom',
                                        render: () => (
                                            <Stack bg="orange.500" align="center" direction="column" p="2vh" borderRadius="10px" spacing={2} _dark={{bg : "orange.200"}}>
                                                <Text fontWeight="semibold" color="white" _dark={{color : "black"}} noOfLines={1} fontSize={{base:"22px", md:"20px"}}>Certeza que esse usuário deve ser apagado?</Text>
                                                <Stack direction="row">
                                                    <Button variant="outline" color="#fff"  _dark={{color : "black"}} _hover={{bg:"#fff2"}} onClick={() => {deleteUser(report.user_id);}}>Sim</Button>
                                                    <Button variant="outline" color="#fff" _dark={{color : "black"}}  _hover={{bg:"#fff2"}} onClick={() => {toastRender.closeAll()}}>Não</Button>    
                                                </Stack>
                                            </Stack>
                                        )
                                    })
                                }}>
                                    Apagar perfil
                                </Button>
                                <Button variant="solid" colorScheme="linkedin" onClick={() => {
                                    toastRender({
                                        position: 'bottom',
                                        render: () => (
                                            <Stack bg="orange.500" align="center" direction="column" p="2vh" borderRadius="10px" spacing={2} _dark={{bg : "orange.200"}}>
                                                 <Text fontWeight="semibold" color="white" _dark={{color : "black"}} noOfLines={2} fontSize={{base:"22px", md:"20px"}}>Certeza que esse usuário deve ser penalizado?</Text>
                                                <Text fontWeight="semibold" color="white" _dark={{color : "black"}} noOfLines={2} fontSize={{base:"22px", md:"20px"}}>Perdendo um(1) ponto em sua nota?</Text>
                                                <Stack direction="row">
                                                    <Button variant="outline" color="#fff"  _dark={{color : "black"}} _hover={{bg:"#fff2"}} onClick={() => {reducePointsUser(report.user_id);}}>Sim</Button>
                                                    <Button variant="outline" color="#fff" _dark={{color : "black"}}  _hover={{bg:"#fff2"}} onClick={() => {toastRender.closeAll()}}>Não</Button>    
                                                </Stack>
                                            </Stack>
                                        )
                                    })
                                }}>
                                    Reduzir Avaliação
                                </Button>
                            </Stack>
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
                
                <Divider orientation="horizontal"/>

                <Stack direction="column" align="center" mt="1%" w="100%" spacing={8} pb="5%">
                    <Heading as="h3" color={colors.colorFontBlue} mb="1%">Ações sobre a Denúncia</Heading>
                    <Stack spacing={4} direction="row">
                        <Button colorScheme="linkedin" onClick={() => {
                                    toastRender({
                                        position: 'bottom',
                                        render: () => (
                                            <Stack bg="orange.500" align="center" direction="column" p="2vh" borderRadius="10px" spacing={2} _dark={{bg : "orange.200"}}>
                                                <Text fontWeight="semibold" color="white" _dark={{color : "black"}} noOfLines={1} fontSize={{base:"22px", md:"20px"}}>Certeza que deseja finalizar a denúncia?</Text>
                                                <Stack direction="row">
                                                    <Button variant="outline" color="#fff"  _dark={{color : "black"}} _hover={{bg:"#fff2"}} onClick={() => {endReport()}}>Sim</Button>
                                                    <Button variant="outline" color="#fff" _dark={{color : "black"}}  _hover={{bg:"#fff2"}} onClick={() => {toastRender.closeAll()}}>Não</Button>    
                                                </Stack>
                                            </Stack>
                                        )
                                    })
                            }}>Finalizar denúncia</Button>
                    </Stack>
                </Stack>
            </Flex>
        </Box>
    )
}

export default ReportPage;