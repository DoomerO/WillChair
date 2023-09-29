import React from "react";
import {
    Box,
    Menu,
    Pressable,
    HamburgerIcon,
    Heading,
    Text,
    ScrollView,
    Stack,
} from "native-base";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../colors/colors";

function Home() {
    return (
        <ScrollView h="100%">
            <Box w="100%" h="100%" alignItems="center">
                <Box bg={colors.veryLightBlue} w="100%">
                    <Box w="20%" ml="85%" mt="7%">
                        <Menu closeOnSelect={false} w="295px" trigger={(triggerProps) => (
                            <Pressable {...triggerProps}>
                                <HamburgerIcon size="8" />
                            </Pressable>
                        )}>

                            <Menu.ItemOption value="Contato">Home</Menu.ItemOption>
                            <Menu.ItemOption value="Pesquisa">Pesquisar equipamentos</Menu.ItemOption>
                            <Menu.ItemOption value="Contato">Contato</Menu.ItemOption>
                            <Menu.ItemOption value="Sobre">Sobre nós</Menu.ItemOption>
                            <Menu.ItemOption value="Entrar">Entrar</Menu.ItemOption>
                            <Menu.ItemOption value="Cadastrar">Cadastrar</Menu.ItemOption>
                        </Menu>
                    </Box>

                    
                    <Heading size="xl" color={colors.colorFontDarkBlue} textAlign="center" mt="20%">
                        O seu sonho acessível
                    </Heading>

                    <Heading color={colors.colorFontBlue} size="xl" textAlign="center">
                        perto de você!
                    </Heading>

                    <Text color={colors.colorFontDarkBlue} fontSize="sm" mt="20px" textAlign="center" mb="40%">
                        Compre, negocie ou anuncie equipamentos de acessibilidade
                    </Text>
                </Box>

                <Heading as="h1" color={colors.colorFontDarkBlue} textAlign="center" mt="7%">
                    O que você pode encontrar por aqui
                </Heading>

                <Stack space="5" w="100%" direction="column" alignItems="center" justifyContent="center" mt="15%">

                    <Box borderRadius={100} bg='#E8F1FA' p='20px'>
                        <Icon name="credit-card" size="50" />
                    </Box>
                    <Text fontSize="sm">Compra ou venda de produtos</Text>

                    <Box borderRadius={100} bg='#E8F1FA' p='20px' >
                        <Icon2 name="hand-heart-outline" size="50" />
                    </Box>
                    <Text fontSize="sm">Doações de equipamentos</Text>

                    <Box bg='#E8F1FA' p='20px' borderRadius={100}>
                        <Icon3 name="human-wheelchair" size="50" />
                    </Box>
                    <Text fontSize="sm">Aluguéis por preços acessíveis</Text>
                </Stack>

                <Box alignContent="center">
                    <Heading mt="5%" size="xl" textAlign="center">
                        Confira abaixo algumas de nossas categorias
                    </Heading>
                </Box>


            </Box>
        </ScrollView>
    );
}

export default Home;





