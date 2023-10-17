import { useColorMode, Flex, IconButton, Spacer, Heading, UnorderedList, ListItem, Box, Text } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";
import { Link } from "react-router-dom";

const Terms = () => {
    const { toggleColorMode } = useColorMode();
    return (
        <Box w="100%" h="100%" justifyContent="center">
            <Flex direction="row" w="100%" position="absolute">
                <Link to="/"><IconButton ml="5vw" aria-label='Return to home' icon={<AiOutlineHome />}></IconButton></Link>
                <Spacer />
                <IconButton mr="5vw" onClick={toggleColorMode} aria-label='switch lighting mode'
                    icon={localStorage.getItem("chakra-ui-color-mode") == 'light' ? <FiSun /> : <FiMoon />}></IconButton>
            </Flex>
            <Flex align="center" border="3px" direction="column" h="inherit" mt="4%" pt={{base:"8vh", md:"0"}} >
                <Heading as='h1' >Termos de serviço</Heading>
                <Spacer />
                <Flex direction="column" mt="3%" border="2px solid #000" p="2% 2% 0 2%" _dark={{ border: "2px solid #fff" }} w={{base:"90%", md:"70%"}} borderRadius="10px" minH={{base:"75vh", md:"70vh"}} maxH={{base:"75vh", md:"70vh"}} overflowY="scroll" css={{
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#0000',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#1976D2',
                        borderRadius: '50px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#0946a6',
                        borderRadius: '50px',
                    },
                }}>
                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}>Data de vigência: 18/09/2023</Heading>
                    <Text textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>
                        Bem-vindo ao nosso site. Estes termos de serviço regem o uso deste site e dos serviços associados. Ao acessar ou utilizar nosso site, você concorda em cumprir e aceitar estes termos. Leia atentamente
                        este documento.
                    </Text>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}>Definições</Heading>
                    <UnorderedList spacing={2}>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>
                            <b>Usuário:</b> Qualquer pessoa que acesse ou utilize nosso site e serviços.
                        </ListItem>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}><b>Equipamentos de Acessibilidade:</b> Produtos relacionados à acessibiliadde, incluindo,  mas não se limitando a, cadeiras de rodas, dispositivos
                            auditivos, muletas, bengalas e outros equipamentos similares.
                        </ListItem>
                    </UnorderedList>
                    
                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}> Uso do Site</Heading>
                    <UnorderedList spacing={2}>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>
                            <b>Registro de Conta:</b> Para utilizar determinados serviços, você pode ser obrigado a criar uma conta. Você é responsável por manter a confidencialidade de suas credencias de conta.
                        </ListItem>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}><b>Comunicação por chat:</b> Nosso site facilita à comunicação entre usuários por meio de um chat. Você concorda em utilizar esses 
                            recursos de forma ética e respeitosa.
                        </ListItem>
                    </UnorderedList>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}>Compartilhamento de informações via Chat</Heading>
                    <Text textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>Dentro da plataforma os usuários são livres para utilizar do chat para fins de adquirir seu equipamento ou distribuí-lo. No entanto, se compartilhados dados sensíveis por ele, o usuário que os compartilhou é totalmente responsável pelo feito. Intervenções no chat apenas ocorrem caso detectadas mensagens que se encaixem no que foi dito previamente.</Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Terms;
