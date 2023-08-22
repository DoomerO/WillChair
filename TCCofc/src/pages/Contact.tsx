import Footer from "../components/Footer";
import { Box, Flex, Heading, Stack, Spacer, Center, Square, Text, AspectRatio, VStack, Container} from '@chakra-ui/react';
import { IoLogoWhatsapp } from "react-icons/io"
import { BsFacebook } from "react-icons/bs"
import { ImInstagram } from "react-icons/im"
import HeaderToggle from '../components/toggles/HeaderToggle';
import { Link } from "react-router-dom";


const Contact = () => {
    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>
            <Flex color="white" w="100%" h="100%" pt="5%" direction="row">
                <Box bg="gray.100" p="6" borderRadius="md" shadow="md" w="40%">
                      <Heading as="h2" size="lg" mb="6" color="black">
                        Entre em Contato Conosco
                      </Heading>
                <Flex direction="column" align="center" bg="green.500" p="4" borderRadius="md" color="white" mb="8">
                    <Link href="https://api.whatsapp.com/send?phone=SEU_NUMERO_DE_TELEFONE_AQUI" target="_blank" rel="noopener noreferrer">
                          <IoLogoWhatsapp size="36"/>
                          <Text mt="2" color="black">Entre em contato conosco pelo WhatsApp</Text>
                    </Link>
                  </Flex>
                  <Heading as="h2" size="lg" mb="6" color="black" >
                    Nossas Redes Sociais
                  </Heading>
                  <Flex direction="column" align="center">
                    <Link href="https://www.instagram.com/seu_perfil/" target="_blank" rel="noopener noreferrer">
                          <ImInstagram size="36" color="purple" />
                          <Text color="black" mt="2" >Siga-nos no Instagram</Text>
                    </Link>
                    <Link href="https://www.facebook.com/seu_perfil/" target="_blank" rel="noopener noreferrer" mt="4">
                        <BsFacebook size="36" color="blue" />
                        <Text color="black" mt="2"></Text>Curta-nos no Facebook</Text>
                    </Link>
      </Flex>
    </Box>
     
                
                <Stack w="60%" h="100%"  textAlign="center" direction="column" >
                    <Heading color="blue">estamos aqui</Heading>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.6789!2d-123.456789!3d12.345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDMxJzA1LjMiTiAxMjPCsDEwJzA2LjQiVw!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus" 
                        width="100%" height="600"/>
                </Stack>
            </Flex>
            <Footer/>
        </Box>
    )
}

export default Contact;
