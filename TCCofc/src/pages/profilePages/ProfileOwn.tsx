import { Flex, Box, Stack, Input, Avatar, Heading, SimpleGrid, Spacer, Text, Divider, Button, InputGroup, useToast, InputLeftAddon } from "@chakra-ui/react"
import HeaderToggle from "../../components/toggles/HeaderToggle";
import Footer from "../../components/Footer";
import { BsFillStarFill } from "react-icons/bs";
import colors from "../../colors/colors";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ProfileOwnProps {
    user: object
}

const ProfileOwn = ({user} : ProfileOwnProps) =>{

    const toast = useToast();
    const navigate = useNavigate();

    const [userUpdate, setUpdate] = useState({
        user_name : user.user_name,
        user_img : user.user_img,
        user_phone : user.user_phone,
        user_street : user.user_street,
        user_district : user.user_district,
        user_FU : user.user_FU,
        user_city : user.user_city,
        user_CEP : user.user_CEP,
        user_houseNum : user.user_houseNum,
        user_comp : user.user_comp
    });

    async function updateProfile() {
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
            toast({
                position: 'bottom',
                render: () => (
                    <Stack bg="green.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", sm:"20px"}}>Perfil atualizado com sucesso!</Text>
                        <Button variant="outline" color="#fff" _hover={{bg:"#fff2"}} onClick={() => {navigate(0)}}>Atualizar a página</Button>
                    </Stack>
                )
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    function discartChanges() {
        setUpdate(prev => ({...prev, 
            user_name : user.user_name,
            user_img : (user.user_img) ? String.fromCharCode(...new Uint8Array(user.user_img)) : null,
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
            position: 'bottom',
            render: () => (
                <Stack bg="green.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                    <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", sm:"20px"}}>Mudanças revertidas!</Text>
                </Stack>
            )
        })
    }

    useEffect(() => {
        if(user.user_id) {
            setUpdate(prev => ({...prev, 
                user_name : user.user_name,
                user_img : (user.user_img) ? String.fromCharCode(...new Uint8Array(user.user_img)) : null,
                user_phone : user.user_phone,
                user_street : user.user_street,
                user_district : user.user_district,
                user_FU : user.user_FU,
                user_city : user.user_city,
                user_CEP : user.user_CEP,
                user_houseNum : user.user_houseNum,
                user_comp : user.user_comp
            }))
        }
    }, [user.user_id]);

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setUpdate(prev => ({...prev, [e.target.name] : e.target.value}));
    }

    const handleImage = (e:ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setUpdate(prev => ({...prev, user_img: reader.result}))
        }
    }

    return(
        <Box w="100%" h="100%">
            <HeaderToggle/>
            <Flex direction="column" align="center" w="100%" bg={colors.bgWhite} h="fit-content" pt="4.6%" _dark={{bg : colors.bgWhite_Dark}}>
                <Flex direction="row" w="100%"  h="fit-content" >
                    <Stack w="22%" align="center" bg={colors.veryLightBlue} spacing={4} _dark={{bg : colors.veryLightBlue_Dark}} mr="2%">
                        <Avatar src={userUpdate.user_img} name={user.user_name} size="2xl" w="30vh" h="30vh"/>
                        <InputGroup display="flex" zIndex={1} w="77.5%">
                                <InputLeftAddon children={<MdOutlinePhotoSizeSelectActual size="80%"/>}/>
                                <Input type="file" onChange={handleImage} display="inline-block" accept=".png,.jpg,.jpeg" fontFamily="outfit"/>
                        </InputGroup>
                        <Button w="77.5%" colorScheme="green" onClick={updateProfile}>Salvar Mudanças</Button>
                        <Button w="77.5%" colorScheme="red" onClick={discartChanges}>Descartar Mudanças</Button>
                        <Divider orientation="horizontal"/>
                            <Heading as="h4" fontFamily="outfit" fontSize={{base: "28px", sm: "26px"}}>Segurança</Heading>
                        <Divider orientation="horizontal"/>
                        <Text textAlign="center">Caso necessário, <Button variant="link" colorScheme="linkedin">clique aqui</Button> para mudar sua senha...</Text>
                    </Stack>
                    
                    <Stack w="72%" pb="5vh">
                        <SimpleGrid spacing={3} w="100%" fontSize={{base:"24px", sm:"20px"}}>

                            <Heading as="h4" fontFamily="outfit" fontSize={{base: "30px", sm: "28px"}}>Informações da Conta e Contato</Heading>
                            <Divider orientation="horizontal"/>

                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Nome:</Text>
                            <Spacer/>
                            <Input type="text" fontFamily="atkinson" value={userUpdate.user_name} name="user_name" onChange={handleChange} w="85%" _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_name}/>
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
                            <Input type="text" fontFamily="atkinson" value={userUpdate.user_phone} name="user_phone" onChange={handleChange} w="85%" _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_phone}/>
                            </Flex>
                            

                            <Divider orientation="horizontal"/>
                            <Heading as="h4" fontFamily="outfit" fontSize={{base: "30px", sm: "28px"}}>Informações de Endereço</Heading>
                            <Divider orientation="horizontal"/>

                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Cidade:</Text>
                            <Spacer/>
                            <Input type="text" fontFamily="atkinson" value={userUpdate.user_city} name="user_city" onChange={handleChange} w="85%" _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_city}/>
                            </Flex>
                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Rua:</Text>
                            <Spacer/>
                            <Input type="text" fontFamily="atkinson" value={userUpdate.user_street} name="user_street" onChange={handleChange} w="85%" _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_street}/>
                            </Flex>
                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Bairro:</Text>
                            <Spacer/>
                            <Input type="text" fontFamily="atkinson" value={userUpdate.user_district} name="user_district" onChange={handleChange} w="85%" _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_district}/>
                            </Flex>
                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">UF:</Text>
                            <Spacer/>
                            <Input type="text" fontFamily="atkinson" value={userUpdate.user_FU} name="user_FU" onChange={handleChange} w="85%" _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_FU}/>
                            </Flex>
                            <Flex direction="row">
                            <Text fontFamily="atkinson" mr="5px">CEP:</Text>
                            <Spacer/>
                            <Input type="text" fontFamily="atkinson" value={userUpdate.user_CEP} name="user_CEP" onChange={handleChange} w="85%" _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_CEP}/>
                            </Flex>
                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Número da casa:</Text>
                            <Spacer/>
                            <Input type="text" fontFamily="atkinson" value={userUpdate.user_houseNum} name="user_houseNum" onChange={handleChange} w="70%" _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_houseNum}/>
                            </Flex>
                            <Flex direction="row" align="center">
                            <Text fontFamily="atkinson" mr="5px">Complemento:</Text>
                            <Spacer/>
                            <Input type="text" fontFamily="atkinson" value={userUpdate.user_comp} name="user_comp" onChange={handleChange} w="70%" _placeholder={{color : colors.colorFontBlue}} placeholder={user.user_comp}/>
                            </Flex>
                        </SimpleGrid>
                    </Stack>
                </Flex>
            </Flex>
            <Footer/>
        </Box>
    )
}
export default ProfileOwn;