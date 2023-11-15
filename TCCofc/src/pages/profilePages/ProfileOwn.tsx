import { Flex, Box, Stack, Input, Avatar, Heading, SimpleGrid, Spacer, Text, Divider, Button, InputGroup, InputLeftAddon, useToast, UseToastOptions, ToastPosition } from "@chakra-ui/react"
import { ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderToggle from "../../components/toggles/HeaderToggle";
import SignNotFound from "../../components/signs/SignNotFound";
import CommentList from "../../components/comments/CommentList";
import Comment from "../../components/comments/Comment";
import CardOffer from "../../components/offerCards/OfferCard";
import OfferList from "../../components/offerCards/OfferList";
import SignNotFoundButton from "../../components/signs/SignNotFoundButton";
import colors from "../../colors/colors";
import axios from "axios";
import cep from "cep-promise";

import { BsFillStarFill, BsPencil } from "react-icons/bs/index";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md/index";
import { TbMoodSilence } from "react-icons/tb/index";
import serverUrl from "../../components/code/serverUrl";

import {Offer, Comments, User } from "../../components/code/interfaces";
import Loading from "../../components/toggles/Loading";

interface ProfileOwnProps {
    user: User
}

const ProfileOwn = ({ user }: ProfileOwnProps) => {

    const navigate = useNavigate();
    const toastRender = useToast();
    const [avaliations, setAvaliations] = useState<Comments[]>([]);
    const [userOffers, setUserOffers] = useState<Offer[]>([]);
    const [userUpdate, setUpdate] = useState<User>({});
    const [imgChange, setImgChange] = useState(false)
    const [showImg, setImg] = useState<any>();
    const [loading, isLoading] = useState(true);

    function toast(title: string, desc: string, time?: number, type?: UseToastOptions["status"], pos?: ToastPosition, close?: boolean) {
        toastRender({
            title: title,
            description: desc,
            status: type,
            duration: time,
            position: pos,
            isClosable: close ? close : true
        })
    }

    async function getComments() {
        await axios.get(`${serverUrl}/avaliation/receiver/${user.user_id ?? null}`).then((res) => {
            setAvaliations(res.data);
        }).catch((error) => {
            console.log(error);
        })
    };

    function checkChange() {
        let check = false
        check = user?.user_name == userUpdate?.user_name ? check : true
        check = !imgChange ? check : true
        check = user.user_phone == userUpdate.user_phone ? check : true
        check = user.user_city == userUpdate.user_city ? check : true
        check = user.user_houseNum == userUpdate.user_houseNum ? check : true
        check = user.user_comp == userUpdate.user_comp ? check : true
        return check
    }

    async function getOffers() {
        await axios.get(`${serverUrl}/offers/user/${user?.user_email ?? null}`).then((res) => {
            setUserOffers(res.data);
            isLoading(false);
        }).catch((error) => {
            console.log(error);
        })
    };

    async function getEndereco(CEP: string) {
        setUpdate(prev => ({
            ...prev,
            user_FU: "",
            user_street: "",
            user_district: "",
            user_city: ""
        }))
        cep(CEP, { timeout: 5000 }).then((res) => {
            setUpdate(prev => ({
                ...prev,
                user_FU: res.state,
                user_street: res.street,
                user_district: res.neighborhood,
                user_city: res.city
            }))
        })
    }

    async function updateProfile() {
        if (userUpdate.user_city && userUpdate.user_name && userUpdate.user_phone) {
            if (checkChange()) await axios.put(`${serverUrl}/users/${user?.user_email ?? null}`, {
                user_name: userUpdate.user_name ?? null,
                user_phone: userUpdate.user_phone ?? null,
                user_street: userUpdate.user_street ?? null,
                user_district: userUpdate.user_district ?? null,
                user_FU: userUpdate.user_FU ?? null,
                user_city: userUpdate.user_city ?? null,
                user_CEP: userUpdate.user_CEP ?? null,
                user_houseNum: userUpdate.user_houseNum ?? null,
                user_comp: userUpdate.user_comp ?? null
            }, { headers: { authorization: "Bearer " + localStorage.getItem("token") } }).then((res) => {
                localStorage.setItem("token", res.data.token);
                if (userUpdate.user_img != "") postImage();
                else navigate(0)
            }).catch((error) => {
                console.log(error);
            })

            else toast('Sem informações à serem atualizadas!', 'Você não alterou nenhuma de suas informações ainda!', 3000, "warning");
        }
        else {
            toastRender.closeAll()
            toast('Informações Erradas', 'Certifique-se de informar um número de telefone, nome de usuário e CEP!', 3000, 'error');
        }
    }

    async function postImage() {
        const data = new FormData();
        data.append("avatar", userUpdate.user_img);
        await axios.put(`${serverUrl}/users/profile/photo`, data,
            { headers: { authorization: "Bearer " + localStorage.getItem("token"), user_id: user.user_id } }).then(() => {
                navigate(0);
            }).catch((error) => {
                console.log(error);
            });
    }

    function updtProfileOpr() {
        updateProfile();
    }

    function discartChanges() {
        if (!checkChange()) {
            useToast().closeAll()
            setImgChange(false)
            toast('', 'Não há mudanças para reverter', 3000, 'warning')
            return
        }
        setUpdate(prev => ({
            ...prev,
            user_name: user.user_name,
            user_phone: user.user_phone,
            user_img: "",
            user_street: user.user_street,
            user_district: user.user_district,
            user_FU: user.user_FU,
            user_city: user.user_city,
            user_CEP: user.user_CEP,
            user_houseNum: user.user_houseNum,
            user_comp: user.user_comp
        }))
        toast('', 'Mudanças revertidas', 3000, 'success')
        setImgChange(false)
    }

    useEffect(() => {
        if (user.user_id) {
            setUpdate(prev => ({
                ...prev,
                user_name: user.user_name,
                user_phone: user.user_phone,
                user_img: "",
                user_street: user.user_street,
                user_district: user.user_district,
                user_FU: user.user_FU,
                user_city: user.user_city,
                user_CEP: user.user_CEP,
                user_houseNum: user.user_houseNum,
                user_comp: user.user_comp
            }))
            getComments();
            getOffers();

            if (!user.user_city || !user.user_phone) {
                toast('Termine seu perfil', 'Preencha seu telefone e cidade para concluir seu perfil', 5000, 'warning')
            }
        }
    }, [user]);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name == "user_CEP") {
            if (e.target.value.length >= 7) {
                getEndereco(e.target.value);
            }
            else {
                setUpdate(prev => ({
                    ...prev,
                    user_FU: "",
                    user_street: "",
                    user_district: "",
                    user_city: ""
                }))
            }
        }
        if (e.target.name == "user_phone") {
            if (e.target.validity.patternMismatch) { e.target.value = ""; return }
            let val = e.target.value.replace("(", "")
            setUpdate(prev => ({ ...prev, [e.target.name]: val.replace(")", "") }));
            return
        }
        if (!e.target.validity.patternMismatch) {
            setUpdate(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
        else { e.target.value = "" }
    }

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            setUpdate(prev => ({ ...prev, user_img: selectedFile ?? "none" }));
            let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = () => {
                setImg(reader.result);
            }
            setImgChange(true)
        }
    }

    const renderUserOffers = userOffers.map(item => { //lista de ofertas do usuário renderizadas
        return <CardOffer
            title={item.ofr_name ?? ""}
            composition={item.prod_composition ?? ""}
            condition={item.prod_status ?? ""}
            img={item.prod_img ?? ""}
            value={item.ofr_value ?? 0}
            type={item.prod_type ?? ""}
            key={item.ofr_id}
            id={item.ofr_id ?? 0} />
    });

    const renderComments = avaliations.map(item => {
        return <Comment
            user_email={item.user_email ?? ""}
            user_img={item.user_img ?? ""}
            user_name={item.user_name ?? ""}
            content={item.ava_content ?? ""}
            date={item.ava_date ?? ""}
            points={item.ava_value ?? 0}
            key={item.ava_id ?? 0} />
    })

    return (
        (loading) ? <Loading /> : <Box w="100%" h="100%">
            <HeaderToggle />
            <Flex direction="column" align="center" w="100%" bg={colors.bgWhite} h="fit-content" pt={{ base: "0", sm: "4.6%" }} _dark={{ bg: colors.bgWhite_Dark }}>
                <Flex direction={{ base: "column", sm: "row" }} w="100%" h="fit-content">

                    <Stack w={{ base: "100%", sm: "22%" }} align="center" bg={colors.bgProfileImg} spacing={4} _dark={{ bg: colors.bgProfileImg_Dark }} mr={{ base: "0", sm: "2%" }} pt={{ base: "11vh", sm: "0" }} pb={{ base: "5vh", sm: "0" }}>
                        <Avatar src={(userUpdate.user_img != "") ? showImg : (user.user_img) ? user.user_img : ""} name={user.user_name} size="2xl" w="30vh" h="30vh" />
                        <InputGroup display="flex" zIndex={1} w="77.5%">
                            <InputLeftAddon children={<MdOutlinePhotoSizeSelectActual size="80%" />} />
                            <Button borderLeftRadius="0" borderRightRadius="6px" w="100%" colorScheme="linkedin" onClick={() => { document.getElementsByName("image")[0].click() }}>Mudar foto de perfil</Button>
                            <Input type="file" name="image" onChange={handleImage} display="none" accept=".png,.jpg,.jpeg" />
                        </InputGroup>
                        <Button w="77.5%" colorScheme="green" onClick={updtProfileOpr}>Salvar Mudanças</Button>
                        <Button w="77.5%" colorScheme="red" onClick={discartChanges}>Descartar Mudanças</Button>
                        <Divider orientation="horizontal" />
                        <Heading as="h4" fontFamily="outfit" fontSize={{ base: "24px", sm: "26px" }}>Segurança</Heading>
                        <Divider orientation="horizontal" />
                        <Text textAlign="center" w="90%">Caso necessário, <Button variant="link" colorScheme="linkedin" onClick={() => {
                            toastRender({
                                position: 'bottom',
                                render: () => (
                                    <Stack bg="orange.500" align="center" direction="column" p="2vh" borderRadius="10px" spacing={2} _dark={{ bg: "orange.200" }}>
                                        <Text fontWeight="semibold" color="white" _dark={{ color: "black" }} noOfLines={2} fontSize={{ base: "22px", md: "20px" }}>Certeza que deseja alterar sua senha?</Text>
                                        <Stack direction="row">
                                            <Button variant="outline" color="#fff" _hover={{ bg: "#fff3" }} _dark={{ color: "#000" }} onClick={() => { navigate(`/pass-change`); navigate(0) }}>Sim</Button>
                                            <Button variant="outline" color="#fff" _hover={{ bg: "#fff2" }} _dark={{ color: "#000" }} onClick={() => { toastRender.closeAll() }}>Não</Button>
                                        </Stack>
                                    </Stack>
                                )
                            })
                        }}>clique aqui</Button> para mudar sua senha...</Text>
                    </Stack>

                    <Stack w={{ base: "100%", sm: "72%" }} pb="5vh" pt="5vh">
                        <SimpleGrid spacing={3} w="100%" fontSize={{ base: "19px", sm: "20px" }} justifyContent={{ base: "center", sm: "normal" }}>

                            <Heading as="h4" fontFamily="outfit" textAlign="center" fontSize={{ base: "24px", sm: "28px" }}>Informações da Conta e Contato</Heading>
                            <Divider orientation="horizontal" />

                            <Flex direction="row" align="center">
                                <Text fontFamily="atkinson" mr="5px">Nome:</Text>
                                <Spacer />
                                <Input type="text" fontFamily="atkinson" value={userUpdate.user_name || ""} name="user_name" onChange={handleChange} w={{ base: "60%", sm: "85%" }} _placeholder={{ color: colors.colorFontBlue }} placeholder={user.user_name} />
                            </Flex>
                            <Flex direction="row" align="center">
                                <Text fontFamily="atkinson" mr="5px">Email:</Text>
                                <Text fontFamily="atkinson" color={colors.colorFontBlue}>{user.user_email}</Text>
                                <Spacer />
                                <Button variant="solid" colorScheme="linkedin" onClick={() => {
                                    toastRender({
                                        position: 'bottom',
                                        render: () => (
                                            <Stack bg="orange.500" align="center" direction="column" p="2vh" borderRadius="10px" spacing={2} _dark={{ bg: "orange.200" }}>
                                                <Text fontWeight="semibold" color="white" _dark={{ color: "black" }} noOfLines={2} fontSize={{ base: "22px", md: "20px" }}>Certeza que deseja alterar seu email?</Text>
                                                <Stack direction="row">
                                                    <Button variant="outline" color="#fff" _hover={{ bg: "#fff2" }} _dark={{ color: "#000" }} onClick={() => { navigate(`/email-update/${user.user_id}`); navigate(0) }}>Sim</Button>
                                                    <Button variant="outline" color="#fff" _hover={{ bg: "#fff2" }} _dark={{ color: "#000" }} onClick={() => { toastRender.closeAll() }}>Não</Button>
                                                </Stack>
                                            </Stack>
                                        )
                                    })
                                }}>Alterar</Button>
                            </Flex>
                            <Flex direction="row" align="center">
                                <Text fontFamily="atkinson" mr="5px">Avaliação:</Text>
                                <Text fontFamily="atkinson" fontSize={{ base: "24px", sm: "22px" }} color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }}>{(user.user_nota) ? user.user_nota : "Novo"}</Text>
                                <BsFillStarFill fill={colors.colorFontBlue} size="3vh" />
                            </Flex>
                            <Flex direction="row" align="center">
                                <Text fontFamily="atkinson" mr="5px">Telefone:</Text>
                                <Spacer />
                                <Input type="text" fontFamily="atkinson" value={userUpdate.user_phone ? `(${userUpdate.user_phone.slice(0, 2)})${userUpdate.user_phone.slice(2, 15)}` : ""} name="user_phone" onChange={handleChange} maxLength={15} w={{ base: "60%", sm: "85%" }} _placeholder={{ color: colors.colorFontBlue }} placeholder={user.user_phone ? user.user_phone : "Digite seu número de telefone"} pattern="[\u0028]?[0]?[0-9]{0,2}[\u0029]?[0-9]{0,}" />
                            </Flex>


                            <Divider orientation="horizontal" />
                            <Heading as="h4" fontFamily="outfit" fontSize={{ base: "24px", sm: "28px" }} textAlign="center">Informações de Endereço</Heading>
                            <Divider orientation="horizontal" />

                            <Flex direction="row" align="center">
                                <Text fontFamily="atkinson" mr="5px">CEP:</Text>
                                <Spacer />
                                <Input type="text" fontFamily="atkinson" value={userUpdate.user_CEP || ""} name="user_CEP" maxLength={9} onChange={handleChange} w={{ base: "60%", sm: "85%" }} _placeholder={{ color: colors.colorFontBlue }} placeholder={(user.user_CEP) ? user.user_CEP : "Digite seu CEP aqui para preencher o endereço."} pattern="[0-9]{0,}" />
                            </Flex>
                            <Flex direction="row" align="center">
                                <Text fontFamily="atkinson" mr="5px">Cidade:</Text>
                                <Spacer />
                                <Input type="text" readOnly fontFamily="atkinson" value={userUpdate.user_city || ""} name="user_city" onChange={handleChange} w={{ base: "60%", sm: "85%" }} _placeholder={{ color: colors.colorFontBlue }} placeholder={user.user_city} />
                            </Flex>
                            <Flex direction="row" align="center">
                                <Text fontFamily="atkinson" mr="5px">Rua:</Text>
                                <Spacer />
                                <Input type="text" readOnly fontFamily="atkinson" value={userUpdate.user_street || ""} name="user_street" onChange={handleChange} w={{ base: "60%", sm: "85%" }} _placeholder={{ color: colors.colorFontBlue }} placeholder={user.user_street} />
                            </Flex>
                            <Flex direction="row" align="center">
                                <Text fontFamily="atkinson" mr="5px">Bairro:</Text>
                                <Spacer />
                                <Input type="text" readOnly fontFamily="atkinson" value={userUpdate.user_district || ""} name="user_district" onChange={handleChange} w={{ base: "60%", sm: "85%" }} _placeholder={{ color: colors.colorFontBlue }} placeholder={user.user_district} />
                            </Flex>
                            <Flex direction="row" align="center">
                                <Text fontFamily="atkinson" mr="5px">UF:</Text>
                                <Spacer />
                                <Input type="text" readOnly fontFamily="atkinson" value={userUpdate.user_FU || ""} name="user_FU" onChange={handleChange} w={{ base: "60%", sm: "85%" }} _placeholder={{ color: colors.colorFontBlue }} placeholder={user.user_FU} />
                            </Flex>
                            <Flex direction="row" align="center">
                                <Text fontFamily="atkinson" mr="5px">Número da casa:</Text>
                                <Spacer />
                                <Input type="text" fontFamily="atkinson" value={userUpdate.user_houseNum || ""} name="user_houseNum" onChange={handleChange} w={{ base: "55%", sm: "70%" }} _placeholder={{ color: colors.colorFontBlue }} placeholder={user.user_houseNum?.toString()} maxLength={6} pattern="[0-9]{0,}" />
                            </Flex>
                            <Flex direction="row" align="center">
                                <Text fontFamily="atkinson" mr="5px">Complemento:</Text>
                                <Spacer />
                                <Input type="text" maxLength={30} fontFamily="atkinson" value={userUpdate.user_comp || ""} name="user_comp" onChange={handleChange} w={{ base: "60%", sm: "70%" }} _placeholder={{ color: colors.colorFontBlue }} placeholder={user.user_comp} />
                            </Flex>
                        </SimpleGrid>
                    </Stack>
                </Flex>
            </Flex>

            <Flex bg={colors.veryLightBlue} h="fit-content" direction="column" align="center" _dark={{ bg: colors.veryLightBlue_Dark }}>
                <Heading as="h1" fontSize={{ base: "25px", sm: "30px" }} textAlign="center" color={colors.colorFontDarkBlue} mt={{base:"3vh", md:"3%"}} mb={{base:"3vh", md:"3%"}} _dark={{ color: colors.colorFontDarkBlue_Dark }}>Comentários sobre você</Heading>
                {(avaliations.length > 0) ? <CommentList component={renderComments} /> : <SignNotFound msg={`As coisas estão meio quietas por aqui...Não há avaliações sobre ${user.user_name}`} icon={<TbMoodSilence size="45%" />} />}
            </Flex>

            <Flex bg={colors.bgWhite} h="fit-content" direction="column" align="center" _dark={{ bg: colors.bgWhite_Dark }}>
                <Heading as="h1" fontSize={{ base: "25px", sm: "30px" }} textAlign="center" color={colors.colorFontDarkBlue} mt={{base:"3vh", md:"3%"}} mb={{base:"3vh", md:"3%"}} _dark={{ color: colors.colorFontDarkBlue_Dark }}>Suas Ofertas</Heading>
                {(userOffers.length > 0) ? <OfferList component={renderUserOffers} canMdNew /> : <SignNotFoundButton msg="Parece que você não possui ofertas registradas...Que tal criar alguma?!" icon={<BsPencil size="45%" />} btnText='Criar Oferta' btnPath='/create-offer/any' />}
            </Flex>
            <Footer />
        </Box>
    )
}
export default ProfileOwn;
