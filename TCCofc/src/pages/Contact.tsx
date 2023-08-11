import Footer from "../components/Footer";
import { Box, Flex, Heading, Spacer, Stack } from '@chakra-ui/react';
import { IoLogoWhatsapp } from "react-icons/io"
import { BsFacebook } from "react-icons/bs"
import { ImInstagram } from "react-icons/im"
import HeaderToggle from '../components/toggles/HeaderToggle';
import { Input } from '@chakra-ui/react'
import {Link} from 'react-router-dom'

const Contact = () => {
    return (
        <Box w="100%" h="100%"> 
                    <HeaderToggle/>
                    <Flex w='100%' align="center" pt='20vh' direction="column">
                        <Heading color='#1976D2' fontSize="35px" textAlign="center" mb="10vh">Confira abaixo alguns dos nossas redes</Heading>
                        
                            <Flex>      
                                <Stack spacing={3} >
                                    <Input variant='filled' placeholder='Filled' />
                                    <Input variant='filled' placeholder='Filled' />
                                    <Input variant='filled' placeholder='Filled' />
                                    <Input variant='filled' placeholder='Filled' />
                                </Stack>  
                            </Flex>     
                            <Flex direction="row" w="50%">
                                    <Link to='https://instagram.com/grupo_willchair?igshid=MzRIODBiNWFIZA=='><ImInstagram/> Instagram</Link>

                                    <Spacer />
                               
                                    <Link to='https://wa.me/5524981267889?text=Descubra+a+liberdade+da+mobilidade+com+nossas+excepcionais+cadeiras+de+rodas.+Entre+em+contato+pelo+WhatsApp+na+Willchair.'><IoLogoWhatsapp/> Whatsapp</Link>
                                
                                    <Spacer/>
                                
                                    <Link to='https://www.facebook.com/people/Tcc-Willchair/pfbid02A9rF2B2yHXVPxS4oM841TwPHz3ain5wL9Neog5iHWDsRaNBVLsbEQZkFczi5WPm8l/?mibextid=%2FZbWKwL'> <BsFacebook/> Facebook </Link>
                            </Flex>
                       
                    </Flex>
                <Footer/>
            </Box> 
         
    )
}

export default Contact;
