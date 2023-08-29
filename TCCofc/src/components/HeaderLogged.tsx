import { Link } from "react-router-dom";
import { Flex, Spacer, Image, Menu, MenuButton, MenuList, MenuItem, IconButton, Center, HStack, Button, useColorMode, Avatar, useColorModeValue } from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlineSearch, AiOutlineLogout } from "react-icons/ai";
import { CgDarkMode } from "react-icons/cg";
import { FiPhoneForwarded } from "react-icons/fi";
import {MdOutlineCreate} from "react-icons/md";
import {PiChatsFill} from "react-icons/pi";
//imagens
import logo from '../img/home/logoDark.png';
import logoLight from '../img/home/logo.png';

interface avatarProps {
    name: string,
    img: string
}

const HeaderLogged = ({name, img}: avatarProps) => {
    const {toggleColorMode} = useColorMode();
    const logoImg = useColorModeValue(logo, logoLight) //muda o valor do logo a partir do modo de cor que estiver ativo
    const colorMode = useColorModeValue("Modo escuro", "Modo claro");
    return (
        <Flex w="100%" h="8.5vh" bg='#fff' position='fixed' _dark={{bg : '#131313'}} boxShadow='lg' zIndex={2}>
            
            <Center h='100%'  ml='10px'>
                <Menu>
                    <MenuButton  
                        as={IconButton}
                        aria-label='Options'
                        icon = {<RxHamburgerMenu size='100%'/>}
                        variant="unstyled"
                        bg='#0000'>
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
                        <Link to="/logout"><MenuItem>
                            <Flex direction="row" w={{base:"40%" ,sm:"95%"}} align="center">Logout<Spacer/><AiOutlineLogout size="6%"/></Flex>
                        </MenuItem></Link>
                        <Link to="/current-chats"><MenuItem>
                            <Flex direction="row" w={{base:"40%" ,sm:"95%"}} align="center">Seus Chats<Spacer/><PiChatsFill size="6%"/></Flex>
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
                <Avatar name={name} src={img} size={{base: "md", sm:"md"}} mr="1vw"/>
            </HStack>
        </Flex>
    )
}

export default HeaderLogged;
