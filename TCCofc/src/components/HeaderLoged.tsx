import { Link } from "react-router-dom";
import { Flex, Spacer, Image, Menu, MenuButton, MenuList, MenuItem, IconButton, Center, HStack, Button, useColorMode, Avatar, useColorModeValue } from '@chakra-ui/react';
import { RxHamburgerMenu } from 'react-icons/rx';
//imagens
import logo from '../img/home/logoDark.png';
import logoLight from '../img/home/logo.png';

interface avatarProps {
    name: string,
    img: string
}

const HeaderLoged = ({name, img}: avatarProps) => {
    const {toggleColorMode} = useColorMode();
    const logoImg = useColorModeValue(logo, logoLight) //muda o valor de lago a partir do modo de cor que estiver ativo
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
                        <Link to="/loginw"><MenuItem>
                            Sign up/in
                        </MenuItem></Link>
                        <Link to="/logout"><MenuItem>
                            Log Out
                        </MenuItem></Link>
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
                    <Link to="/"><b>Produtos</b></Link>
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

export default HeaderLoged;