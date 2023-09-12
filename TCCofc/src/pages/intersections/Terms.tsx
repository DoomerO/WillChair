import { useColorMode, Flex, IconButton, Spacer, Heading, UnorderedList, ListItem, Box, Text } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";
import { Link } from "react-router-dom";

const Terms = () => {
    const {toggleColorMode} = useColorMode();
    return (
        <Box w="100%" h="100%" justifyContent="center">
            <Flex direction="row" w="100%" position="absolute">
                    <Link to="/"><IconButton aria-label='Return to home' icon={<AiOutlineHome/>}></IconButton></Link>
                    <Spacer/>
                    <IconButton onClick={toggleColorMode} aria-label='switch lighting mode'
                    icon={localStorage.getItem("chakra-ui-color-mode") == 'light' ? <FiSun/> : <FiMoon/>}></IconButton>
            </Flex>
            <Flex align="center" border="3px" direction="column" h="inherit" mt="4%" >
                <Heading as='h1' >Termos de serviço</Heading>
                <Spacer/>
                <Flex direction="column" mt="3%" border="2px solid #000" p="2% 2% 0 2%" _dark={{border : "2px solid #fff"}} w="70%" borderRadius="10px" minH="70vh" maxH="70vh" overflowY="scroll" css={{
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
                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mb="2%" fontSize={{base: "28px", md:"30px"}} _dark={{borderBottom : "2px solid #fff"}}>Disponibilização de dados</Heading>
                    <Text textAlign="justify" fontSize={{base: "17px", md:"18px"}}>Para efetuar um cadastro na plataforma são demandados determinados dados do interessado. o compartilhamento destes com a plataforma é de total responsabilidade do usuário. A equipe Willchair não é responsável de consequências relativas aos dados disponibilados. Qualquer dúvida verificar na política privaciade como ocorre a utilização destes dados.</Text>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{base: "28px", md:"30px"}} _dark={{borderBottom : "2px solid #fff"}}>Equipe de administração</Heading>
                    <Text textAlign="justify" fontSize={{base: "17px", md:"18px"}}>A plataforma conta com uma equipe de administradores. Estes possuem acesso às informações armazenadas no banco de dados do sistema e, podem, em qualquer momento, remover irregularidades caso detectadas. Isto incluí perfís, ofertas, conversas e outros. Ao entrar na plataforma, o usuário se submete à moderação do sistema, se sujeitando a monitoração de sua atividade pela equipe de administradores.</Text>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{base: "28px", md:"30px"}} _dark={{borderBottom : "2px solid #fff"}}>Escopo de ação da adminstração</Heading>
                    <Text textAlign="justify" fontSize={{base: "17px", md:"18px"}}>A equipe Willchair não se responsabiliza por ocorrências externas ao escopo da plataforma. Toda a ação esperada será tomada pelos moderadores apenas dentro da aplicação, resolvendo problemas no ambiente desta. Eventos como: transações financeiras, envio e recebimento do equipamento, devolução(em caso de aluguél) e definição de pontos de encontro entre as partes involvidas; não são de responsabilidade da equipe, cabendo às partes se administrarem sem mediamento da plataforma.</Text>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{base: "28px", md:"30px"}} _dark={{borderBottom : "2px solid #fff"}}>Ações condenáveis na plataforma</Heading>
                    <Text textAlign="justify" fontSize={{base: "17px", md:"18px"}}>Um usuário da plataforma se compromete em não utilizar da plataforma para o compartilhamento de pornográfia, discurso de ódio e conteúdo violento. Se compromete em não emitir falsas informações sobre suas ofertas ou executar atos sexualmente ou moralmente violentos. Todas essa transgreções podem ser passivas de banimento na aplicação. Vale ressaltar, caso um usuário dutilize do mecênismo de denúncia sem motivos, apenas para reduzir engajamento de outro usuário ou, outras motivações que não concordam com as intenções da funcionalidade, este também se torna passivo a banimento.</Text>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{base: "28px", md:"30px"}} _dark={{borderBottom : "2px solid #fff"}}>Compartilhamento de informações via Chat</Heading>
                    <Text textAlign="justify" fontSize={{base: "17px", md:"18px"}}>Dentro da plataforma os usuários são livres para utilizar do chat para fins de adquirir seu equipamento ou distribuí-lo. No entanto, se compartilhados dados sensíveis por ele, o usuário que os compartilhou é totalmente responsável pelo feito. Intervenções no chat apenas ocorrem caso detectadas mensagens que se encaixem no que foi dito previamente.</Text>
                </Flex>
            </Flex>
        </Box>
    )
}   

export default Terms;