import { Link } from "react-router-dom";
import { Flex, Spacer, Image, Menu, MenuButton, MenuList, MenuItem, IconButton, Center, HStack, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
//imagens
import logo from '../img/home/logoDark.png'
import logoLight from '../img/home/logo.png'

const Header = () => {

    const {toggleColorMode} = useColorMode();
    const logoImg = useColorModeValue(logo, logoLight)
    return (
        <Flex w="100%" h="8.5vh" bg='#fff' position='fixed' _dark={{bg : '#131313'}} boxShadow='lg' zIndex={2}>
            
            <Center h='100%'  ml='10px'>
                <Menu>
                    <MenuButton  
                        as={IconButton}
                        aria-label='Options'
                        icon = {<RxHamburgerMenu size='100%'/>}
                        bg='#0000'>
                    </MenuButton>
                    <MenuList>
                        <Link to="/contact"><MenuItem>
                            Contato
                        </MenuItem></Link>
                        <Link to="/about"><MenuItem>
                            Sobre nós
                        </MenuItem></Link>
                        <Link to="/login"><MenuItem>
                            Sign up/in
                        </MenuItem></Link>
                        <MenuItem>
                            ou alguma coisa
                        </MenuItem>
                        <MenuItem onClick={toggleColorMode}>
                            Dark Mode
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
            <Spacer />
            <HStack display={{base: 'none', sm:'inherit'}}>
                <Link to="/login"><Button variant='ghost'>
                    Sign in
                </Button></Link>
                <Link to="/login"><Button variant='ghost' color='#1976D2'>
                    Sign Up
                </Button></Link>
            </HStack>
        </Flex>
    )
}

export default Header;
