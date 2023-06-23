import { Link } from "react-router-dom";
import { Flex, Spacer, Image, Menu, MenuButton, MenuList, MenuItem, IconButton, Center, HStack, Button } from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
//imagens
import logo from '../img/home/logo.png'

const Header = () => {

    return (
        <Flex w="100%" h="8.5vh" bg='#fff' position='fixed'>
            <Center h='100%'  ml='10px'>
                <Menu>
                    <MenuButton  
                        as={IconButton}
                        aria-label='Options'
                        icon = {<RxHamburgerMenu size='100%'/>}
                        bg='#fff'>
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
                    </MenuList>
                </Menu>
            </Center>
            <Spacer />
                <Image src={logo} objectFit='cover' w="20%" h='55%' mt='2.5'></Image>
            <Spacer />
            <HStack>
                <Button variant='link' colorScheme="#000">
                    <Link to="/">Home</Link>
                </Button>
                <Button variant='link' colorScheme="#000">
                    <Link to="/">Produtos</Link>
                </Button>
                <Button variant='link' colorScheme="#000">
                    <Link to="/">Sobre</Link>
                </Button>
                <Button variant='link' colorScheme="#000">
                    <Link to="/">Contato</Link>
                </Button>
            </HStack>
            <Spacer/>
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
