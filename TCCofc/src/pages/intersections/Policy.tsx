import { Box, Flex, Heading, IconButton, ListItem, Spacer, Text, UnorderedList, useColorMode } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const Policy = () => {
    const { toggleColorMode } = useColorMode();
    return (
        <Box w="100%" h="100%" justifyContent="center">
            <Flex direction="row" w="100%" position="absolute">
                <Link to="/"><IconButton ml="5vw" aria-label='Return to home' icon={<AiOutlineHome />}></IconButton></Link>
                <Spacer />
                <IconButton mr="5vw" onClick={toggleColorMode} aria-label='switch lighting mode'
                    icon={localStorage.getItem("chakra-ui-color-mode") == 'light' ? <FiSun /> : <FiMoon />}></IconButton>
            </Flex>
            <Flex align="center" border="3px" direction="column" h="inherit" mt="4%" pt={{ base: "8vh", md: "0" }}>
                <Heading as='h1' >Política de privacidade</Heading>
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

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}>Última atualização: 18/09/2023</Heading>
                    <Text textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>Esta Política de Privacidade descreve como o WillChair coleta, usa, divulga e protege suas informações pessoais quando você utiliza nossos
                        serviços online através de nosso site. Ao usar nosso site, você concorda com todas as práticas descritas nesta política.
                    </Text>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}>Coleta de Informações Pessoais</Heading>
                    <Text textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>Coletamos as seguintes informações pessoais quando você se registra em nosso site ou utiliza nossos serviços:</Text>
                    <UnorderedList spacing={2}>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}><b>Informações de Identificação Pessoal:</b>  Isso inclui seu nome, endereço de e-mail, número de telefone, endereço postal (CEP) e outras
                            informações de contato necessárias para criar sua conta e facilitar transações.
                        </ListItem>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}><b>Informações de Perfil:</b> Podemos coletar informações sobre suas preferências, interesses e necessidades específicas de acessibilidade
                            para personalizar sua experiência no site.
                        </ListItem>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}><b>Mensagens de Chat:</b> Registramos as conversas realizadas em nosso chat para auxiliar na resolução de conflitos, melhorar nossos serviços
                            e garantir uma experiência segura para todos os usuários.
                        </ListItem>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}><b>Informações de Uso:</b> Coletamos informações sobre como você interage com nosso site, incluindo páginas visitadas, tempo gasto e
                            informações sobre o dispositivo que você utiliza para acessar esta aplicação.
                        </ListItem>
                    </UnorderedList>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}>Uso de Informações Pessoais</Heading>
                    <Text textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>Usamos as informações pessoais coletadas para os seguintes fins:</Text>
                    <UnorderedList spacing={2}>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}><b>Registro e Gerenciamento de Conta:</b> Para criar e gerenciar sua conta, permitindo que você participe de transações de compra, aluguel e
                            doação de equipamentos de acessibilidade.
                        </ListItem>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}><b>Fornecimento de Serviços:</b> Para facilitar a comunicação entre os usuários por meio de nosso chat e serviços.</ListItem>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}><b>Personalização:</b> Para personalizar sua experiência no site, oferecendo produtos e serviços relevantes com base em suas preferências e interesses.</ListItem>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}><b>Análise e Melhoria:</b> Para analisar o desempenho do site, entender como os usuários o utilizam e poder oferecer as melhores resuloções para os
                            problemas com as respectivas melhorias.
                        </ListItem>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}><b>Comunicações:</b> Para enviar informações sobre experiências, atualizações de serviços e comunicações relacionadas ao seu uso do site. </ListItem>
                    </UnorderedList>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}>Divulgação de Informações Pessoais</Heading>
                    <Text textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>Não compartilharemos suas informações pessoais com terceiros, exceto nas seguintes situações:</Text>
                    <UnorderedList spacing={2}>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}><b>Usuários do Site:</b> Suas informações de contato, como nome, número de telefone e e-mail serão compartilhadas com outros usuários com quem você
                            interagir por meio do chat, para facilitar a realização de negócios.
                        </ListItem>
                        <ListItem textAlign="justify" fontSize={{ base: "17px", md: "18px" }}><b>Requisitos Legais:</b> Se exigido por lei ou por uma autoridade competente, poderemos divulgar suas informações para com os devidos fins das investigações.</ListItem>
                    </UnorderedList>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}>Segurança de Dados</Heading>
                    <Text textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>Empregamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, uso indevido da conta,
                        divulgação ou vazamentos de dados.
                    </Text>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}>Seus Direitos de Privacidade</Heading>
                    <Text textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>Você tem direitos relacionados à sua privacidade e às suas informações pessoais, incluindo o direito de acessar, retificar e excluir dados
                        pessoais. Para exercer esses direitos ou fazer perguntas sobre esta Política de Privacidade, entre em contato conosco através dos canais de suporte disponibilizados no site.
                    </Text>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}>Alterações nesta Política de Privacidade</Heading>
                    <Text textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças em nossas práticas de privacidade. Recomendamos que você reveja esta
                        política regularmente para estar ciente de quaisquer alterações.
                    </Text>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}>Contato</Heading>
                    <Text textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>Se você tiver alguma dúvida ou preocupação relacionada a esta Política de Privacidade, entre em contato conosco através dos canais de suporte disponibilizados
                        no site. Ao utilizar nosso site, você concorda com todos esses termos, com a coleta e uso de suas informações pessoais conforme o descrito.
                    </Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Policy;
