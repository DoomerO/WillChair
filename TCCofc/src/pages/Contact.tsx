import Footer from "../components/Footer";
import { Box, Flex, Heading, Stack, Text,} from '@chakra-ui/react';
import { IoLogoWhatsapp } from "react-icons/io"
import { BsFacebook } from "react-icons/bs"
import { ImInstagram } from "react-icons/im"
import HeaderToggle from '../components/toggles/HeaderToggle';
import { Link } from "react-router-dom";
import "../fonts/fonts.css"


const Contact = () => {
  return (
    <Box w="100%" h="100%">
      <HeaderToggle/>
      <Flex color="white" w="100%" h="100%" pt="5%" direction="row" textAlign="center">
        <Box  p="6" borderRadius="md" shadow="md" w="40%">
          <Heading as="h2" size="lg" mb="6" color="black" fontFamily="outfit">
            Entre em Contato Conosco
          </Heading>
          <Flex direction="column" align="center" bg="green" p="4" borderRadius="md" color="white" mb="8">
            <Link to="/" target="_blank" rel="noopener noreferrer">
              <IoLogoWhatsapp size="36"/>
              <Text mt="2" color="black" fontFamily="outfit">Entre em contato conosco pelo WhatsApp</Text>
            </Link>
      </Flex>
        <Heading as="h2" size="lg" mb="6" color="black" fontFamily="outfit">
          Nossas Redes Sociais
        </Heading>
          <Flex direction="column" align="center">
            <Link to="/" target="_blank" rel="noopener noreferrer" >
              <ImInstagram size="36" color="#dd2a7b" />
              <Text color="black" mt="2"  fontFamily="outfit">Siga-nos no Instagram</Text>
            </Link>
            <Link to="/" target="_blank" rel="noopener noreferrer" mt="4">
              <BsFacebook size="36" color="blue"  fontFamily="outfit"/>
              <Text color="black" mt="2">Curta-nos no Facebook</Text>
            </Link>
      </Flex>
      </Box>
      <Stack w="60%" h="100%"  textAlign="center" direction="column" >
        <Heading color="blue" fontFamily="outfit">estamos aqui</Heading>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.4366699714915!2d-44.072924925448845!3d-22.48779402302967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9ebd1700000001%3A0xe7458888a0206e3b!2sFAETEC%20Volta%20Redonda!5e0!3m2!1spt-BR!2sbr!4v1692837801377!5m2!1spt-BR!2sbr" 
          width="100%" height="600"/>
      </Stack>
    </Flex>
    <Footer/>
    </Box>
  )
}

export default Contact;
