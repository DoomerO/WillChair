import { Link } from "react-router-dom";
import { Flex, Text, Spacer, Image, Menu, MenuButton, MenuList, MenuItem, IconButton, Center, HStack, Button, useColorMode, Avatar, useColorModeValue, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure, Heading, Divider, Stack } from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlineSearch, AiOutlineLogout } from "react-icons/ai";
import { CgDarkMode, CgProfile } from "react-icons/cg";
import { FiPhoneForwarded } from "react-icons/fi";
import {MdOutlineCreate} from "react-icons/md";
import {PiChatsFill} from "react-icons/pi";
import colors from "../colors/colors";
//imagens
import logo from '../img/home/logoDark.png';
import logoLight from '../img/home/logo.png';
import { BsFillStarFill } from "react-icons/bs";

interface avatarProps {
    user : object;
}

const HeaderLogged = ({user}: avatarProps) => {
    const {toggleColorMode} = useColorMode();
    const logoImg = useColorModeValue(logo, logoLight) //muda o valor do logo a partir do modo de cor que estiver ativo
    const colorMode = useColorModeValue("Modo escuro", "Modo claro");
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Flex w="100%" h="8.5vh" bg='#fff' position='fixed' _dark={{bg : '#131313'}} boxShadow='lg' zIndex={2}>
            
            <Center h='100%'  ml='10px'>
                <Menu>
                    <MenuButton  
                        as={IconButton}
                        aria-label='Options'
                        icon = {<RxHamburgerMenu size='100%'/>}
                        variant="unstyled"
                        bg='#0000'
                        _hover={{bg : "#0002", _dark:{bg : "#fff3"}}}>
                    </MenuButton>
                    <MenuList fontSize={{base:"20px", sm:"15px"}}>
                        <Link to="/"><MenuItem display={{base:"inherit", sm: "none"}}>
                            <Flex direction="row" align="center" w={{base:"40%" ,sm:"95%"}}>Home<Spacer/><AiOutlineHome size="6%"/></Flex>
                        </MenuItem></Link>
                        <Link to="/search/all/all"><MenuItem display={{base:"inherit", sm: "none"}}>
                            <Flex direction="row" align="center" w={{base:"40%" ,sm:"95%"}}>Pesquisar equipamentos<Spacer/><AiOutlineSearch size="6%"/></Flex>
                        </MenuItem></Link>
                        <Link to="/contact"><MenuItem>
                            <Flex direction="row" w={{base:"40%" ,sm:"95%"}} align="center">Contato<Spacer/><FiPhoneForwarded size="6%"/></Flex>
                        </MenuItem></Link>
                        <Link to="/about"><MenuItem>
                            <Flex direction="row" w={{base:"40%" ,sm:"95%"}} align="center">Sobre nós<Spacer/><AiOutlineInfoCircle size="6%"/></Flex>
                        </MenuItem></Link>
                        <Link to="/create-offer/all"><MenuItem>
                            <Flex direction="row" w={{base:"40%" ,sm:"95%"}} align="center">Criar oferta<Spacer/><MdOutlineCreate size="6%"/></Flex>
                        </MenuItem></Link>
                        <MenuItem onClick={toggleColorMode}>
                            <Flex direction="row" w={{base:"40%" ,sm:"95%"}} align="center">{colorMode}<Spacer/><CgDarkMode size="6%"/></Flex>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Center>
            <Spacer />
                <Image src={logoImg} objectFit='cover' w={{base:"45%", sm:"12%"}} h='66%' mt='2.5'></Image>
            <Spacer />
            <HStack w='25%' display={{base: 'none', sm:'inherit'}}>
                <Button variant='link' colorScheme="#000">
                    <Link to="/"><b>Home</b></Link>
                </Button>
                <Spacer />
                <Button variant='link' colorScheme="#000">
                    <Link to="/search/all/all"><b>Produtos</b></Link>
                </Button>
                <Spacer />
                <Button variant='link' colorScheme="#000">
                    <Link to="/about"><b>Sobre</b></Link>
                </Button>
                <Spacer />
                <Button variant='link' colorScheme="#000">
                    <Link to="/contact"><b>Contato</b></Link>
                </Button>
            </HStack>
            <Spacer/>
            <Spacer/>
            <HStack>
                <Avatar name={user.user_name} src={(user.user_img) ? String.fromCharCode(...new Uint8Array(user.user_img.data)) : ""} size={{base: "md", sm:"md"}} mr="1vw" _hover={{border : `2px solid ${colors.colorFontBlue}`, _dark : {border : "2px solid #fff"}}} onClick={() => {onOpen()}}/>
            </HStack>
            <Drawer onClose={onClose} isOpen={isOpen} size={{base:"full", sm:"md"}}>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader></DrawerHeader>
                <DrawerBody>
                    <Divider orientation="horizontal" mt="3"/>
                    <Flex direction="row" align="end" mt="3" mb="3">
                        <Avatar name={user.user_name} src={(user.user_img) ? String.fromCharCode(...new Uint8Array(user.user_img.data)) : ""} size="2xl" mr="1vw"/>
                        <Heading as="h1" fontFamily="outfit">
                            {user.user_name}
                        </Heading>
                        <Spacer/>
                        <Flex direction="row" align="center">
                            <Heading as="h1" fontFamily="atkinson" fontSize={{base: "36px", sm: "30px"}} color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{(user.user_nota) ? user.user_nota : 0.0}</Heading>
                            <BsFillStarFill fill={colors.colorFontBlue} size="3vh"/>
                        </Flex>
                    </Flex>
                    <Divider orientation="horizontal"/>
                    <Stack mt="3" mb="3">
                        <Flex direction="row" align="center">
                            <Text fontFamily="outfit" fontSize={{base:"20px", sm:"18px"}} mr="1%">Email:</Text>
                            <Text fontFamily="outfit" fontSize={{base:"20px", sm:"18px"}}color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{user.user_email}</Text>
                        </Flex>
                        <Flex direction="row" align="center">
                            <Text fontFamily="outfit" fontSize={{base:"20px", sm:"18px"}} mr="1%">Telefone:</Text>
                            <Text fontFamily="outfit" fontSize={{base:"20px", sm:"18px"}}color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{user.user_phone}</Text>
                        </Flex>
                        <Flex direction="row" align="center">
                            <Text fontFamily="outfit" fontSize={{base:"20px", sm:"18px"}} mr="1%">CEP:</Text>
                            <Text fontFamily="outfit" fontSize={{base:"20px", sm:"18px"}}color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{user.user_CEP}</Text>
                        </Flex>
                        <Flex direction="row" align="start">
                            <Text fontFamily="outfit" fontSize={{base:"20px", sm:"18px"}} mr="1%">Endereço:</Text>
                            <Text fontFamily="outfit" fontSize={{base:"20px", sm:"18px"}}color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{`${user.user_street} ${(user.user_houseNum) ? "n° " + user.user_houseNum + (user.user_comp) ? " " + user.user_comp : "" : ""}, ${user.user_district}, ${user.user_city}, ${user.user_FU}`}</Text>
                        </Flex>
                    </Stack>
                    <Divider orientation="horizontal"/>
                    <Stack mt="3">
                        <Heading as="h5" textAlign="center" fontFamily="outfit" fontSize={{base:"30px", sm:"28px"}}>
                            Ações
                        </Heading>
                        <Link to={`/profile/${user.user_email}/view`}>
                            <Flex direction="row" w="100%" align="center" _hover={{bg : "#0002", _dark : {bg : "#fff2"}}} p="2%" borderRadius="10px">
                                <Text fontFamily="outfit" fontSize={{base:"20px", sm:"18px"}}>Acessar Perfil</Text><Spacer/><CgProfile size="6%"/>
                            </Flex>
                        </Link>
                        <Link to="/current-chats">
                            <Flex direction="row" w="100%" align="center" _hover={{bg : "#0002", _dark : {bg : "#fff2"}}} p="2%" borderRadius="10px">
                                <Text fontFamily="outfit" fontSize={{base:"20px", sm:"18px"}}>Acessar Conversas </Text><Spacer/><PiChatsFill size="6%"/>
                            </Flex>
                        </Link>
                        <Link to="/logout">
                            <Flex direction="row" w="100%" align="center" _hover={{bg : "#0002", _dark : {bg : "#fff2"}}} p="2%" borderRadius="10px">
                                <Text fontFamily="outfit" fontSize={{base:"20px", sm:"18px"}}>Logout</Text><Spacer/><AiOutlineLogout size="6%"/>
                            </Flex>
                        </Link>
                    </Stack>
                    
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}

export default HeaderLogged;
