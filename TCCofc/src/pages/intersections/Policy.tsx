import { Box, Button, Flex, Heading, IconButton, ListItem, Spacer, Text, UnorderedList, useColorMode } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";
import {AiOutlineHome} from "react-icons/ai";
import {Link} from "react-router-dom";

const Policy = () => {
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
                <Heading as='h1' >Política de privacidade</Heading>
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
                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mb="2%" fontSize={{base: "28px", md:"30px"}} _dark={{borderBottom : "2px solid #fff"}}>Dados requisitados</Heading>
                    <UnorderedList spacing={2}>
                        <ListItem textAlign="justify" fontSize={{base: "17px", md:"18px"}}><b>Email(endereço web):</b> Obrigatório para o uso do sistema.</ListItem>
                        <ListItem textAlign="justify" fontSize={{base: "17px", md:"18px"}}><b>Telefone:</b> Obrigatório para o uso do sistema.</ListItem>
                        <ListItem textAlign="justify" fontSize={{base: "17px", md:"18px"}}><b>CEP:</b> Obrigatório para o uso do sistema.</ListItem>
                        <ListItem textAlign="justify" fontSize={{base: "17px", md:"18px"}}><b>Dados de endereço:</b> Todos obrigatórios exceto pelo número da residência e complemento.</ListItem>
                    </UnorderedList>
                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{base: "28px", md:"30px"}} _dark={{borderBottom : "2px solid #fff"}}>Utilização dos dados</Heading>
                    <UnorderedList spacing={2}>
                        <ListItem textAlign="justify" fontSize={{base: "17px", md:"18px"}}><b>Email(endereço web):</b> Utilizado como identificador do usuário dentro do sistema, servindo como uma chave de diferenciação dentre os diversos usuários. É também utilizado como opção de contato e exposto na plataforma para permitir acesso dos demais usuários à informação.</ListItem>
                        <ListItem textAlign="justify" fontSize={{base: "17px", md:"18px"}}><b>Telefone:</b> É utilizado como uma opção de contato. O dado é exposto na plataforma para permitir fácil acesso dos interessados em entrar em contato.</ListItem>
                        <ListItem textAlign="justify" fontSize={{base: "17px", md:"18px"}}><b>CEP:</b> É utilizado como ferramenta de descobrimento de endereço pelo sistema. O dado É exposto na plataforma.</ListItem>
                        <ListItem textAlign="justify" fontSize={{base: "17px", md:"18px"}}><b>Dados de endereço:</b> São utilizados para demonstrar de onde um usuário lança suas ofertas e, onde um outro usuário deve se deslocar para acessar um determinado equipamento. Dados como a cidade correspondente ao CEP são também utilizados como identificadores de ofertas por razões de filtragem e facilidade para a pesquisa. Dados como o número da residência e complemento não são obrigatórios, sendo falcutativo ao usuário disponíbilizá-los à plataforma. Todos os dados de endereço são expostos, incluindo os não obrigatórios.</ListItem>
                    </UnorderedList>
                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{base: "28px", md:"30px"}} _dark={{borderBottom : "2px solid #fff"}}>Disponibilidade á terceiros</Heading>
                    <Text textAlign="justify" fontSize={{base: "17px", md:"18px"}}>Os dados disponibilizados não são utilizados compartilhados com nenhum terceiro. Os únicos com acesso à eles são os demais usuários e a equipe de administradores Willchair, a qual os armazena em seu banco de dados.</Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Policy;