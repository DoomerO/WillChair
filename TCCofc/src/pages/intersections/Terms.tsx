import { useColorMode, Flex, IconButton, Spacer, Heading, UnorderedList, ListItem, Box, Text } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";
import { Link } from "react-router-dom";

const Terms = () => {
    const { toggleColorMode } = useColorMode();
    return (
        <Box w="100%" h="100%" justifyContent="center">
            <Flex direction="row" w="100%" position="absolute">
                <Link to="/"><IconButton aria-label='Return to home' icon={<AiOutlineHome />}></IconButton></Link>
                <Spacer />
                <IconButton onClick={toggleColorMode} aria-label='switch lighting mode'
                    icon={localStorage.getItem("chakra-ui-color-mode") == 'light' ? <FiSun /> : <FiMoon />}></IconButton>
            </Flex>
            <Flex align="center" border="3px" direction="column" h="inherit" mt="4%" >
                <Heading as='h1' >Termos de serviço</Heading>
                <Spacer />
                <Flex direction="column" mt="3%" border="2px solid #000" p="2% 2% 0 2%" _dark={{ border: "2px solid #fff" }} w="70%" borderRadius="10px" minH="70vh" maxH="70vh" overflowY="scroll" css={{
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
                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}>Termos de Conta</Heading>
                    <Text textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>Para acessar e utilizar os nossos serviços, você deve criar uma conta em nosso site (“WillChair”) fornecida com as informações possíveis, incluindo nome completo, endereço comercial, número de telefone, endereço de e-mail válido e outros detalhes indicados como obrigatórios. Reservamos o direito exclusivo de aceitação ou rejeição de obrigações de criação de Contas, ou mesmo cancelar Contas existentes.
                        Você deve ser maior de 18 anos, ou ter idade legalmente reconhecida como maioridade em sua jurisdição, para criar uma Conta. Ao criar uma Conta, você concorda que está utilizando nossos Serviços para fins comerciais relacionados à acessibilidade e não para fins pessoais, domésticos ou familiares.
                        É importante que você esteja ciente de que usaremos o endereço de e-mail fornecido por você na criação da Conta como o principal meio de comunicação. Portanto, você deve manter esse endereço de e-mail atualizado e funcional para receber informações importantes sobre novas ofertas, atualizações e informes gerais sobre o sistema.
                        A segurança de sua senha é de sua responsabilidade, e não seremos responsáveis ​​por perdas ou danos resultantes da falta de segurança em sua conta. Reservamo-nos o direito de solicitar medidas adicionais de segurança a qualquer momento.
                        O suporte técnico relacionado aos Serviços será fornecido apenas aos usuários cadastrados em nosso site. Quaisquer dúvidas sobre nossos Termos de Serviço devem ser direcionadas às nossas redes sociais ou podem ser resolvidas presencialmente, com informações disponíveis na seção de contato.
                        Você concorda em não explorar erros em nosso site para benefício próprio e em relatar qualquer erro à nossa equipe de suporte. Além disso, você se compromete a não contornar, ignorar ou violar quaisquer limitações técnicas dos Serviços, incluindo o processamento de pedidos fora dos termos de cadeiras de rodas, a ativação de recursos desabilitados ou a engenharia reversa dos Serviços.
                        O uso de qualquer meio automatizado, como robôs, spiders ou scrapers, para acessar nossos Serviços ou monitorar informações é limitação proibida. Entenda que suas informações podem ser transmitidas sem criptografia e podem passar por várias redes, sujeitas a alterações técnicas para cumprir os requisitos de conexão.
                    </Text>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}>Equipe de administração</Heading>
                    <Text textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>A plataforma conta com uma equipe de administradores. Estes possuem acesso às informações armazenadas no banco de dados do sistema e, podem, em qualquer momento, remover irregularidades caso detectadas. Isto incluí perfís, ofertas, conversas e outros. Ao entrar na plataforma, o usuário se submete à moderação do sistema, se sujeitando a monitoração de sua atividade pela equipe de administradores.A equipe Willchair não se responsabiliza por ocorrências externas ao escopo da plataforma. Toda a ação esperada será tomada pelos moderadores apenas dentro da aplicação, resolvendo problemas no ambiente desta. Eventos como: transações financeiras, envio e recebimento do equipamento, devolução(em caso de aluguél) e definição de pontos de encontro entre as partes involvidas; não são de responsabilidade da equipe, cabendo às partes se administrarem sem mediamento da plataforma.</Text>
                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}> Condições de Uso</Heading>
                    <Text textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>2.1
Bem-vindo ao nosso site de venda, compra e aluguel de itens de acessibilidade. Ao utilizar nossos Serviços, você concorda com as seguintes condições:
Comunicações Eletrônicas : Ao utilizar nossos Serviços, você concorda em receber comunicações eletrônicas de nossa parte, como e-mails, mensagens de texto, mensagens push e postagens em nosso site.

2.2
Direitos Autorais : Todo o conteúdo disponibilizado em nossos Serviços, incluindo textos, gráficos, logotipos, imagens e outros materiais, é protegido por direitos autorais.

2.3
Sua Conta : Você é responsável por manter a confidencialidade de sua conta e senha. Reservamos-nos o direito de recusa do serviço, encerrar contas ou tomar outras medidas a nossos descontos exclusivos.

2.4
Avaliações, comentários e conteúdo : Os usuários podem postar avaliações, comentários e outros conteúdos, desde que estejam em conformidade com nossas diretrizes.

2.5
Descrições de Produtos : Tentamos fornecer especificações específicas de produtos, mas não garantimos a exatidão completa.

2.6
Preços : Os preços estão sujeitos a alterações a qualquer momento, e a disponibilidade de produtos em estoque é necessária para concluir uma compra.

2.7
Compra de um Vendedor Independente : Nas transações com vendedores independentes em nosso site, as condições de compra são condicionais ao vendedor, e não nos responsabilizamos por eventuais danos.

2.8
Denúncias e Banimento : Reservamo-nos o direito de banir usuários que se envolvam em fraude, comportamento abusivo, anúncios enganosos, spam, uso inadequado de informações pessoais, comportamento ilegal, violação de direitos autorais, feedback falso, assédio sexual ou uso inadequado do site .

2.9
Pontos Adicionais nos Termos de Uso : Além disso, nossos Termos de Uso incluem diretrizes claras para o uso do site, política de privacidade, responsabilidades do usuário, transações seguras, resolução de disputas, direitos autorais e consequências de privacidade.

</Text>

                    <Heading as="h5" fontWeight="semibold" borderBottom="2px solid #000" mt="2%" mb="2%" fontSize={{ base: "28px", md: "30px" }} _dark={{ borderBottom: "2px solid #fff" }}>Compartilhamento de informações via Chat</Heading>
                    <Text textAlign="justify" fontSize={{ base: "17px", md: "18px" }}>Dentro da plataforma os usuários são livres para utilizar do chat para fins de adquirir seu equipamento ou distribuí-lo. No entanto, se compartilhados dados sensíveis por ele, o usuário que os compartilhou é totalmente responsável pelo feito. Intervenções no chat apenas ocorrem caso detectadas mensagens que se encaixem no que foi dito previamente.</Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default Terms;
