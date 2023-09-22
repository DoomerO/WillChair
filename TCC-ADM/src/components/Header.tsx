import { Link, useNavigate } from "react-router-dom";
import { Flex, Text, Spacer, Image, Menu, MenuButton, MenuList, MenuItem, IconButton, Center, HStack, Button, useColorMode, Avatar, useColorModeValue, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure, Heading, Divider, Stack } from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { CgDarkMode } from "react-icons/cg";
import {MdAdminPanelSettings} from "react-icons/md";
import "../fonts/fonts.css";

//imagens
import logo from '../img/logoDark.png';
import logoLight from '../img/logo.png';
import colors from "../colors/colors";

interface headerProps {
    adm : object;
}

const Header = ({adm}: headerProps) => {
    const {toggleColorMode} = useColorMode();
    const logoImg = useColorModeValue(logo, logoLight) //muda o valor do logo a partir do modo de cor que estiver ativo
    const colorMode = useColorModeValue("Modo escuro", "Modo claro");
    const navigate = useNavigate();

    return (
        <Flex w="100%" h="8.5vh" bg='#fff' position='fixed' _dark={{bg : '#131313'}} boxShadow='lg' zIndex={2}>
            <Image src={logoImg} objectFit='contain' onClick={() => {navigate("/")}} w={{base:"45%", md:"12%"}} h='66%' mt='2.5'></Image>
            <Spacer />
            <HStack w='50%' display={{base: 'none', md:'inherit'}}>
                <Button variant='link' colorScheme="#000">
                    <Link to="/"><b>Denúncias Previstas</b></Link>
                </Button>
                <Spacer/>
                <Button variant='link' colorScheme="#000">
                    <Link to="/other"><b>Denúncias Adversas</b></Link>
                </Button>
                <Spacer />
                <Button variant='link' colorScheme="#000">
                    <Link to="/"><b>Criar Administrador</b></Link>
                </Button>
                <Spacer/>
                <Button variant='link' colorScheme="#000">
                    <Link to="/responsability"><b>Responsabilizar</b></Link>
                </Button>
            </HStack>
            <Spacer/>
            <Spacer/>
            <HStack spacing={2}>
                <Text color={colors.colorFontBlue} fontSize="17px" fontFamily="atkinson">{adm.name}</Text><MdAdminPanelSettings size="6vh"/>
            </HStack>
        </Flex>
    )
}

export default Header;