import { Flex, Box, Stack, Input, Avatar, Heading, SimpleGrid, Spacer, Text, Divider, Button, InputGroup, useToast, InputLeftAddon } from "@chakra-ui/react"
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

import { BsFillStarFill, BsPencil } from "react-icons/bs";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { TbMoodSilence } from "react-icons/tb";

interface ProfileOwnProps {
    user: object
}

const ProfileOwn = ({user} : ProfileOwnProps) =>{

    const toast = useToast();
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [userOffers, setUserOffers] = useState([]);
    const [userUpdate, setUpdate] = useState({});

    async function getComments() {
        await axios.get(`http://localhost:3344/comment/receiver/${user.user_id}`).then((res) => {
          setComments(res.data);
        }).catch((error) => {
          console.log(error);
        })
    };
    
    function checkChange(){
        let check = false
        check = user.user_name == userUpdate.user_name ? check : true
        check = user.user_img == userUpdate.user_img ? check : true
        check = user.user_phone == userUpdate.user_phone ? check : true
        check = user.user_city == userUpdate.user_city ? check : true
        check = user.user_houseNum == userUpdate.user_houseNum ? check : true
        check = user.user_comp == userUpdate.user_comp ? check : true
        return check
    }
    
    async function getOffers() {
        await axios.get(`http://localhost:3344/offers/user/${user.user_email}`).then((res) => {
          setUserOffers(res.data);
        }).catch((error) => {
          console.log(error);
        })
    };

    async function getEndereco(CEP : string) {
        setUpdate(prev => ({...prev, 
            user_FU : "",
            user_street : "",
            user_district : "",
            user_city : ""
        }))
        cep(CEP, { timeout: 5000}).then((res) => {
            setUpdate(prev => ({...prev, 
                user_FU : res.state,
                user_street : res.street,
                user_district : res.neighborhood,
                user_city : res.city
            }))
        })
    }

    async function updateProfile() {
        if(userUpdate.user_city && userUpdate.user_name && userUpdate.user_phone && checkChange()) {
            await axios.put(`http://localhost:3344/users/${user.user_email}`, {
                user_name :  userUpdate.user_name,
                user_img :  userUpdate.user_img,
                user_phone :  userUpdate.user_phone,
                user_street :  userUpdate.user_street,
                user_district : userUpdate.user_district,
                user_FU :  userUpdate.user_FU,
                user_city : userUpdate.user_city,
                user_CEP : userUpdate.user_CEP,
                user_houseNum : userUpdate.user_houseNum,
                user_comp :  userUpdate.user_comp
            }, {headers : {authorization : "Bearer " + localStorage.getItem("token")}}).then((res) => {
                localStorage.setItem("token", res.data.token);
                navigate(0)
            }).catch((error) => {
                console.log(error);
                if(error.response.status == 413) {
                    toast({
                        title: 'Imagem muito pesada!',
                        description: "Tente usar uma imagem mais leve.",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    })
                }
            })
        }
        else {
            toast({
                title: 'Sem alterações',
                description: "Não há alterações para se atualizar",
                status: 'warning',
                duration: 3000,
                isClosable: true,
              })
        }
    }

    function discartChanges() {
        setUpdate(prev => ({...prev, 
            user_name : user.user_name,
            user_img : (user.user_img) ? String.fromCharCode(...new Uint8Array(user.user_img.data)) : null,
            user_phone : user.user_phone,
            user_street : user.user_street,
            user_district : user.user_district,
            user_FU : user.user_FU,
            user_city : user.user_city,
            user_CEP : user.user_CEP,
            user_houseNum : user.user_houseNum,
            user_comp : user.user_comp
        }))
        toast({
            title: '',
            description: "Mudanças revertidas",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    useEffect(() => {
        if(user.user_id) {
            setUpdate(prev => ({...prev, 
                user_name : user.user_name,
                user_img : (user.user_img) ? String.fromCharCode(...new Uint8Array(user.user_img.data)) : null,
                user_phone : user.user_phone,
                user_street : user.user_street,
                user_district : user.user_district,
                user_FU : user.user_FU,
                user_city : user.user_city,
                user_CEP : user.user_CEP,
                user_houseNum : user.user_houseNum,
                user_comp : user.user_comp
            }))
            getComments();
            getOffers();

            if(!user.user_city || !user.user_phone) {
                toast({
                    title: 'Termine seu perfil',
                    description: "Preencha seu telefone e cidade para concluir seu perfil",
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                  });
            }}
    }, [user]);


    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.name == "user_CEP") {
            if(e.target.value.length >= 7){
                getEndereco(e.target.value);
            }
            else{
                setUpdate(prev => ({...prev, 
                    user_FU : "",
                    user_street : "",
                    user_district : "",
                    user_city : ""
                }))
            }
        }
        if(e.target.name == "user_phone"){
            if(e.target.validity.patternMismatch){e.target.value = ""; return}
            let val = e.target.value.replace("(", "")
            setUpdate(prev => ({...prev, [e.target.name] : val.replace(")", "")}));
            return
        }
        if(!e.target.validity.patternMismatch){
            setUpdate(prev => ({...prev, [e.target.name] : e.target.value}));}
        else{e.target.value = ""}
    }

    const handleImage = (e:ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setUpdate(prev => ({...prev, user_img: reader.result}))
        }
    }

    const renderUserOffers = userOffers.map(item => { //lista de ofertas do usuário renderizadas
        return <CardOffer 
        title={item.ofr_name} 
        composition={item.prod_composition} 
        condition={item.prod_status} 
        img={(item.prod_img) ? String.fromCharCode(...new Uint8Array(item.prod_img.data)) : ""} 
        value={item.ofr_value} 
        type={item.prod_type}
        key={item.ofr_id}
        id={item.ofr_id}/>
      });
    
      const renderComments = comments.map(item => {
        return <Comment 
          userId={item.User_user_idEnv}
          content={item.com_content}
          date={item.com_date}
          key={item.com_id}
        />
      }) 

    return(
        <Box w="100%" h="100%">
            <HeaderToggle/>
            <Flex direction="column" align="center" w="100%" bg={colors.bgWhite} h="fit-content" pt={{base:"10vh" ,sm:"4.6%"}} _dark={{bg : colors.bgWhite_Dark}}>
                <Flex direction={{base:"column-reverse", sm: "row"}} w="100%"  h="fit-content">

                    <Stack w={{base:"100%", sm:"22%"}} align="center" bg={colors.bgProfileImg} spacing={4} _dark={{bg : colors.bgProfileImg_Dark}} mr={{base:"0", sm:"2%"}} pt={{base:"5vh", sm:"0"}} pb={{base:"5vh", sm:"0"}}>
                        <Avatar src={userUpdate.user_img} name={user.user_name} size="2xl" w="30vh" h="30vh"/>
                        <InputGroup display="flex" zIndex={1} w="77.5%">
                                <InputLeftAddon children={<MdOutlinePhotoSizeSelectActual size="80%"/>}/>
                                <Input type="file" color='#0000' onChange={handleImage} display="inline-block" accept=".png,.jpg,.jpeg" fontFamily="outfit"/>
                        </InputGroup>
                        <Button w="77.5%" colorScheme="green" onClick={updateProfile}>Salvar Mudanças</Button>
                        <Button w="77.5%" colorScheme="red" onClick={discartChanges}>Descartar Mudanças</Button>
                        <Divider orientation="horizontal"/>
                            <Heading as="h4" fontFamily="outfit" fontSize={{base: "24px", sm: "26px"}}>Segurança</Heading>
                        <Divider orientation="horizontal"/>
                        <Text textAlign="center" w="90%">Caso necessário,<Button variant="link" colorScheme="linkedin" onClick={() => {navigate("/pass-change")}}>clique aqui</Button> para mudar sua senha...</Text>
                    </Stack>
                    
                    <Stack w={{base:"100%", sm:"72%"}} pb="5vh">
                        <SimpleGrid spacing={3} w="100%" fontSize={{base:"19px", sm:"20px"}} justifyContent={{base:"center", sm:"normal"}}>

                            <Heading as="h4" fontFamily="outfit" textAlign="center" fontSize={{base: "24px", sm: "28px"}}>Informações da Conta e Contato</Heading>
                            <Divider orientation="horizontal"/>

                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Nome:</Text>
                            <Spacer/>
                            <Input type="text" fontFamily="atkinson" value={userUpdate.user_name} name="user_name" onChange={handleChange} w={{base:"60%", sm:"85%"}} _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_name}/>
                            </Flex>
                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Email:</Text>
                            <Text fontFamily="atkinson" color={colors.colorFontBlue}>{user.user_email}</Text>
                            <Spacer/>
                            <Button variant="solid" colorScheme="linkedin">Alterar</Button>
                            </Flex>
                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Avaliação:</Text>
                            <Text fontFamily="atkinson" fontSize={{base: "24px", sm: "22px"}} color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{(user.user_nota) ? user.user_nota : 0.0}</Text>
                            <BsFillStarFill fill={colors.colorFontBlue} size="3vh"/>
                            </Flex>
                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Telefone:</Text>
                            <Spacer/>
                            <Input type="text" fontFamily="atkinson" value={userUpdate.user_phone ? `(${userUpdate.user_phone.slice(0,2)})${userUpdate.user_phone.slice(2,15)}` : ""} name="user_phone" onChange={handleChange} maxLength={15} w={{base:"60%", sm:"85%"}} _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_phone ? user.user_phone : "Digite seu número de telefone"} pattern="[(]?[0]?[0-9]{0,2}[)]?[0-9]{0,}"/>
                            </Flex>
                            

                            <Divider orientation="horizontal"/>
                            <Heading as="h4" fontFamily="outfit" fontSize={{base: "24px", sm: "28px"}} textAlign="center">Informações de Endereço</Heading>
                            <Divider orientation="horizontal"/>

                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">CEP:</Text>
                            <Spacer/>
                            <Input type="text" fontFamily="atkinson" value={userUpdate.user_CEP} name="user_CEP" maxLength={9} onChange={handleChange} w={{base:"60%", sm:"85%"}} _placeholder={{color : colors.colorFontBlue}} placeholder={(user.user_CEP) ? user.user_CEP : "Digite seu CEP aqui para preencher o endereço."} pattern="[0-9]{0,}"/>
                            </Flex>
                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Cidade:</Text>
                            <Spacer/>
                            <Input type="text" readOnly fontFamily="atkinson" value={userUpdate.user_city} name="user_city" onChange={handleChange} w={{base:"60%", sm:"85%"}} _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_city}/>
                            </Flex>
                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Rua:</Text>
                            <Spacer/>
                            <Input type="text" readOnly fontFamily="atkinson" value={userUpdate.user_street} name="user_street" onChange={handleChange} w={{base:"60%", sm:"85%"}} _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_street}/>
                            </Flex>
                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Bairro:</Text>
                            <Spacer/>
                            <Input type="text" readOnly fontFamily="atkinson" value={userUpdate.user_district} name="user_district" onChange={handleChange} w={{base:"60%", sm:"85%"}} _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_district}/>
                            </Flex>
                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">UF:</Text>
                            <Spacer/>
                            <Input type="text" readOnly fontFamily="atkinson" value={userUpdate.user_FU} name="user_FU" onChange={handleChange} w={{base:"60%", sm:"85%"}} _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_FU}/>
                            </Flex>
                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Número da casa:</Text>
                            <Spacer/>
                            <Input type="text" fontFamily="atkinson" value={userUpdate.user_houseNum} name="user_houseNum" onChange={handleChange} w={{base:"55%", sm:"70%"}} _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_houseNum}/>
                            </Flex>
                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Complemento:</Text>
                            <Spacer/>
                            <Input type="text" maxLength={30} fontFamily="atkinson" value={userUpdate.user_comp} name="user_comp" onChange={handleChange} w={{base:"60%", sm:"70%"}} _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_comp}/>
                            </Flex>
                        </SimpleGrid>
                    </Stack>
                </Flex>
            </Flex>

            <Flex bg={colors.veryLightBlue} h="fit-content" direction="column" align="center" pb="5vh" _dark={{bg : colors.veryLightBlue_Dark}}>
            <Heading as="h1" mt="3%" fontSize={{base: "34px", sm: "30px"}} textAlign="center" color={colors.colorFontDarkBlue} mb="3%" _dark={{color: colors.colorFontDarkBlue_Dark}}>Comentários sobre você</Heading>
            {(comments.length > 0) ? <CommentList component={renderComments}/> : <SignNotFound msg={`As coisas estão meio quietas por aqui...Não há comentários sobre ${user.user_name}`} icon={<TbMoodSilence size="45%"/>}/>}
            </Flex>

            <Flex bg={colors.bgWhite} h="fit-content" direction="column" align="center" pb="5vh" _dark={{bg : colors.bgWhite_Dark}}>
            <Heading as="h1" mt="3%" fontSize={{base: "34px", sm: "30px"}} textAlign="center" color={colors.colorFontDarkBlue} mb="3%" _dark={{color: colors.colorFontDarkBlue_Dark}}>Suas Ofertas</Heading>
            {(userOffers.length > 0) ? <OfferList component={renderUserOffers}/> : <SignNotFoundButton msg="Parece que você não possui ofertas registradas...Que tal criar alguma?!" icon={<BsPencil size="45%"/>} btnText='Criar Oferta' btnPath='/create-offer/any'/>}
            </Flex> 
            <Footer/>
        </Box>
    )
}
export default ProfileOwn;