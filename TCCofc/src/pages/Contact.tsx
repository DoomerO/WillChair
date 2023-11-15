import Footer from "../components/Footer";
import { Box, Flex, Heading, Stack, Text,} from '@chakra-ui/react';
import { IoLogoWhatsapp } from "react-icons/io/index"
import { BsFacebook } from "react-icons/bs/index"
import { ImInstagram } from "react-icons/im/index"
import HeaderToggle from '../components/toggles/HeaderToggle';
import "../fonts/fonts.css"
import colors from "../colors/colors"; 


const Contact = () => {
  return (
    <Box w="100%" h="100%">
      <HeaderToggle/>
      <Flex w="100%" h="100%" direction={{base:"column" , md:"row"}} textAlign="center">
        <Box  p="6" shadow="md" pt={{base:"10vh" ,md:"5%"}} w={{base:"100%" ,md:"40%"}} bg={colors.veryLightBlue} _dark={{bg : colors.veryLightBlue_Dark}} display="flex" flexDirection="column" alignItems="center">
          <Heading as="h2" size="lg" mb="6" fontFamily="outfit">
            Entre em Contato Conosco
          </Heading>
          <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">
            <Flex direction="row" justifyContent="center" align="center" bg="#25D366" p="4" borderRadius="md" color="white" mb="8" w={{base:"80vw" , md:"35.7vw"}} _hover={{bg : "#25D366d0"}}>
                <IoLogoWhatsapp size="36"/>
                <Text ml={{base:"6%" ,md:"3%"}} fontFamily="outfit" textAlign={{base:"left" , md:"center"}}>Entre em contato conosco pelo WhatsApp</Text>
            </Flex>
          </a>
        <Heading as="h2" size="lg" mb="6" fontFamily="outfit">
          Nossas Redes Sociais
        </Heading>
          <Flex direction="column" align="center" w="100%">
            <a href="https://instagram.com/grupo_willchair?igshid=MzRIODBiNWFIZA==" target="_blank" rel="noopener noreferrer">
            <Flex direction="row" justifyContent="center" align="center" bg="#dd2a7b" p="4" borderRadius="md" color="white" mb="8" w={{base:"80vw" ,md:"35.7vw"}} _hover={{bg : "#dd2a7bd0"}}>
              <ImInstagram size="36"/>
              <Text ml="3%" fontFamily="outfit">Siga-nos no Instagram</Text>
            </Flex>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100093288588328&mibextid=/ZbWKwL" target="_blank" rel="noopener noreferrer">
              <Flex direction="row" justifyContent="center" align="center" bg="#2618F2" p="4" borderRadius="md" color="white" mb="8" w={{base:"80vw" ,md:"35.7vw"}} _hover={{bg : "#2618F2d0"}}>
                <BsFacebook size="36"/>
                <Text ml="3%" fontFamily="outfit">Curta-nos no Facebook</Text>
              </Flex>
            </a>
        </Flex>
      </Box>
      <Stack w={{base:"100%", md:"60%"}} h="100%" pt="5%" textAlign="center" direction="column" bg={colors.bgWhite} _dark={{bg : colors.bgWhite_Dark}}>
        <Heading color={colors.colorFontBlue} fontFamily="outfit">Estamos aqui!</Heading>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.4366699714915!2d-44.072924925448845!3d-22.48779402302967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9ebd1700000001%3A0xe7458888a0206e3b!2sFAETEC%20Volta%20Redonda!5e0!3m2!1spt-BR!2sbr!4v1692837801377!5m2!1spt-BR!2sbr" 
          width="100%" height="487" color-schme="dark"/>
      </Stack>
    </Flex>
    <Footer/>
    </Box>
  )
}

export default Contact;
