import { Link, useNavigate } from "react-router-dom";
import { Flex, Spacer, Image, Menu, MenuButton, MenuList, MenuItem, IconButton, Center, HStack, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
import {AiOutlineHome, AiOutlineInfoCircle, AiOutlineLogin, AiOutlineUserAdd, AiOutlineSearch} from "react-icons/ai";
import {FiPhoneForwarded} from "react-icons/fi";
import {CgDarkMode} from "react-icons/cg";
//imagens
import logo from '../img/home/logoDark.png'
import logoLight from '../img/home/logo.png'

const Header = () => {

    const {toggleColorMode} = useColorMode();
    const logoImg = useColorModeValue(logo, logoLight)
    const colorMode = useColorModeValue("Modo escuro", "Modo claro");
    const navigate = useNavigate();
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
                    <MenuList fontSize={{base:"20px", md:"15px"}}>
                        <Link to="/"><MenuItem display={{base:"inherit", md: "none"}}>
                            <Flex direction="row" align="center" w={{base:"37%" ,md:"95%"}}>Home<Spacer/><AiOutlineHome size="6%"/></Flex>
                        </MenuItem></Link>
                        <Link to="/search/all/all"><MenuItem display={{base:"inherit", md: "none"}}>
                            <Flex direction="row" align="center" w={{base:"37%" ,md:"95%"}}>Pesquisar equipamentos<Spacer/><AiOutlineSearch size="6%"/></Flex>
                        </MenuItem></Link>
                        <Link to="/contact"><MenuItem>
                            <Flex direction="row" w={{base:"37%" ,md:"95%"}} align="center">Contato<Spacer/><FiPhoneForwarded size="6%"/></Flex>
                        </MenuItem></Link>
                        <Link to="/about"><MenuItem>
                            <Flex direction="row" w={{base:"37%" ,md:"95%"}} align="center">Sobre nós<Spacer/><AiOutlineInfoCircle size="6%"/></Flex>
                        </MenuItem></Link>
                        <Link to="/login"><MenuItem>
                            <Flex direction="row" w={{base:"37%" ,md:"95%"}} align="center">Entrar<Spacer/><AiOutlineLogin size="6%"/></Flex>
                        </MenuItem></Link>
                        <Link to="/login/new"><MenuItem>
                            <Flex direction="row" w={{base:"37%" ,md:"95%"}} align="center">Cadastrar<Spacer/><AiOutlineUserAdd size="6%"/></Flex>
                        </MenuItem></Link>
                        <MenuItem onClick={toggleColorMode}>
                            <Flex direction="row" w={{base:"37%" ,md:"95%"}} align="center">{colorMode}<Spacer/><CgDarkMode size="6%"/></Flex>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Center>
            <Spacer />
                <Image src={logoImg} onClick={() => {navigate("/")}} objectFit='contain' w={{base:"45%", md:"12%"}} h='66%' mt='2.5'></Image>
            <Spacer />
            <HStack w='25%' display={{base: 'none', md:'inherit'}}>
                <Button variant='link' colorScheme="#000">
                    <Link to="/"><b>Home</b></Link>
                </Button>
                <Spacer />
                <Button variant='link' colorScheme="#000">
                    <Link to="/search/all/all"><b>Equipamentos</b></Link>
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
            <Spacer />
            <HStack display={{base: 'none', md:'inherit'}}>
                <Link to="/login"><Button variant='ghost'>
                    Entrar
                </Button></Link>
                <Link to="/login/new"><Button variant='ghost' color='#1976D2'>
                    Cadastrar
                </Button></Link>
            </HStack>
        </Flex>
    )
}

export default Header;
