import Footer from "../components/Footer";
import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import { MdEmail } from "react-icons/md"
import { IoLogoWhatsapp } from "react-icons/io"
import { BsFacebook } from "react-icons/bs"
import { ImInstagram } from "react-icons/im"
import HeaderToggle from '../components/toggles/HeaderToggle';


const Contact = () => {
    return (
            <Box w="100%" h="100%">
                    <HeaderToggle/>
        
                    <Flex w='100%' h='30vh' bg='#F7F9FC' align='center' _dark={{bg:'#4f4f4f'}}>
                        <Flex mt='2%' align='center' direction='column' w='100%'>
                            <Heading color='#1976D2' as='h1' fontSize="35px">Confira abaixo alguns dos nossas redes</Heading>
                        </Flex>
                    </Flex>

                    <Flex w='100%' bg='#F7F9FC' h='fit-content' align='center' direction='column' _dark={{bg:'#4f4f4f'}} pb={{base:"5vh", sm:"none"}}>
                        <Stack gap="90" direction={{base: "column", sm: "row"}} >
                            <Flex direction='column' align='center' w='30vh'  h={{base:'33%' , sm:'60vh'}}>
                                <Flex display="flex"alignItems="center">
                                    
                                    <Flex>
                                    <a href='https://instagram.com/grupo_willchair?igshid=MzRIODBiNWFIZA=='><ImInstagram/> Instagram</a>
                                    </Flex>

                                    <flex>
                                    <a href='https://wa.me/5524981267889?text=Descubra+a+liberdade+da+mobilidade+com+nossas+excepcionais+cadeiras+de+rodas.+Entre+em+contato+pelo+WhatsApp+na+Willchair.'><IoLogoWhatsapp/> Whatsapp</a>
                                    </flex>

                                    <Flex mt='10%' textAlign='justify' fontSize={{base: '19px', sm: '16px'}} >
                                    <a href='https://www.facebook.com/people/Tcc-Willchair/pfbid02A9rF2B2yHXVPxS4oM841TwPHz3ain5wL9Neog5iHWDsRaNBVLsbEQZkFczi5WPm8l/?mibextid=%2FZbWKwL'> <BsFacebook/> Facebook </a>
                                    </Flex>
                                   
                                   
                                    
                                    
                                </Flex>    
                                
                            </Flex>
    
                        </Stack>
                         
                    </Flex>

                <Footer/>
                <Flex>
                
                
          
                </Flex>
            </Box> 
         
    )
}

export default Contact;
