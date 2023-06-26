import { Link } from "react-router-dom";
import {useState} from 'react';
import { Flex, Spacer, Image, Menu, MenuButton, MenuList, MenuItem, IconButton, Center, HStack, Button, useColorMode, useBoolean, useColorModeValue } from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
//imagens
import logo from '../img/home/logoDark.png'
import logoLight from '../img/home/logo.png'

const Header = () => {

    const {toggleColorMode, colorMode} = useColorMode();
    const logoImg = useColorModeValue(logo, logoLight)
    return (
        <Flex w="100%" h="8.5vh" bg='#fff' position='fixed' _dark={{bg : '#131313'}} boxShadow='lg'>
            
            <Center h='100%'  ml='10px'>
                <Menu>
                    <MenuButton  
                        as={IconButton}
                        aria-label='Options'
                        icon = {<RxHamburgerMenu size='100%'/>}
                        bg='#0000'>
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            Algo
                        </MenuItem>
                        <MenuItem>
                            Alguma coisa
                        </MenuItem>
                        <MenuItem>
                            Nada
                        </MenuItem>
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
                <Image src={logoImg} objectFit='cover' w="12%" h='66%' mt='2.5'></Image>
            <Spacer />
            <HStack w='25%'>
                <Button variant='link' colorScheme="#000">
                    <Link to="/"><b>Home</b></Link>
                </Button>
                <Spacer />
                <Button variant='link' colorScheme="#000">
                    <Link to="/"><b>Produtos</b></Link>
                </Button>
                <Spacer />
                <Button variant='link' colorScheme="#000">
                    <Link to="/"><b>Sobre</b></Link>
                </Button>
                <Spacer />
                <Button variant='link' colorScheme="#000">
                    <Link to="/"><b>Contato</b></Link>
                </Button>
            </HStack>
            <Spacer/>
            <Spacer />
            <HStack>
                <Button variant='ghost'>
                    Sign In
                </Button>
                <Button variant='ghost' color='#1976D2'>
                    Sign Up
                </Button>
            </HStack>
        </Flex>
    )
}

export default Header;
