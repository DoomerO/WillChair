import {Box, Heading, Flex, Input, InputGroup, InputRightAddon} from '@chakra-ui/react';
import {useState, useEffect} from 'react';
import decode from '../components/decoderToken';
import HeaderLoged from '../components/HeaderLoged';
import Footer from '../components/Footer';
import {BiSearchAlt} from 'react-icons/bi';

const HomeProd = () => {

    useEffect(() => {
        setUser(decode(localStorage.getItem("token")));
    }, []);
    
    const [user, setUser] = useState({name: "", level: 0, email: ""});
    console.log(user);

    return (
        <Box w="100%" h="100%">
            <HeaderLoged name={user.name} img={""}/>

            <Flex bg="#F7F9FC" w='100%' h='70vh' align="center" _dark={{bg:'#484A4D'}}>
                <Flex w="100%" direction="column" align="center">
                    <Heading color='#2D3748' as='h1' fontSize={{base: "36px", sm: "30px"}} _dark={{color:"#0D87d8"}} mb="5%">O que deseja encontrar?</Heading>
                    <InputGroup display="flex" zIndex={1} w="50%">    
                        <Input placeholder='Busque as melhores ofertas aqui!' bg="#eee" borderRightColor="#000"/>
                        <InputRightAddon children={<BiSearchAlt/>} bg="#eee"/>
                    </InputGroup> 
                </Flex>
            </Flex>

            <Flex bg="#fff" h='70vh' align="center" direction="column">
                <Heading color='#2D3748' as='h1' fontSize={{base: "36px", sm: "30px"}} _dark={{color:"#0D87d8"}} mt="3%" mb="5%">Confira as ofertas perto de você</Heading>
            </Flex>
            
            <Footer/>
        </Box>
    );
}

export default HomeProd;