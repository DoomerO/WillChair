import React from "react";
import {
  Box,
  Menu,
  Pressable,
  HamburgerIcon,
  Flex,
  Heading,
  Text,
  ScrollView,
  Stack,
} from "native-base";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';

function Home() {
  return (
    <ScrollView style={{ minHeight: "100%" }}>
        <Box w="100%" h="100%">
        <Flex direction="column" w="100%" h="80%" bg="#F7F9FC">
            <Box w="50%" ml="85%" mt="7%">
            <Menu
                closeOnSelect={false}
                w="295px"
                trigger={(triggerProps) => (
                <Pressable {...triggerProps}>
                    <HamburgerIcon size="8" />
                </Pressable>
                )}
            >
                <Menu.ItemOption value="Contato">Home</Menu.ItemOption>
                <Menu.ItemOption value="Pesquisa">Pesquisar equipamentos</Menu.ItemOption>
                <Menu.ItemOption value="Contato">Contato</Menu.ItemOption>
                <Menu.ItemOption value="Sobre">Sobre nós</Menu.ItemOption>
                <Menu.ItemOption value="Entrar">Entrar</Menu.ItemOption>
                <Menu.ItemOption value="Cadastrar">Cadastrar</Menu.ItemOption>
            </Menu>
            </Box>

            <Flex align="center" direction="column" mt="23%">
            <Heading size="xl" color="#2D3748">
                O seu sonho acessível
            </Heading>
            <Heading color="#1976D2" size="xl">
                perto de você!
            </Heading>
            <Text fontSize="14.5px" noOfLines={2} mt="20px" textAlign="center">
                Compre, negocie ou anuncie equipamentos de acessibilidade
            </Text>
            </Flex>
        </Flex>

        <Flex direction="column" w="100%" h="50%">
            <Heading as="h1" noOfLines={2} color="#2D3748" textAlign="center" mt="7%">
            O que você pode encontrar por aqui
            </Heading>
            <Stack space="5" w="100%" direction="column" alignItems="center" mt="5%">
            <Box>
                <Icon name="credit-card" size="80"/>
            </Box>
            <Box>
                <Icon2 name="hand-heart-outline" size="80"/>
            </Box>
            <Box>
                <Icon3 name="human-wheelchair" size="80" />
            </Box>
            </Stack>
        </Flex>

        <Flex w="100%" h="50%" bg="#F7F9FC" align="center" direction="column">
            <Box alignContent="center">
            <Heading noOfLines={2}>
                Confira abaixo algumas de nossas categorias
            </Heading>
            </Box>
        </Flex>
        </Box>
    </ScrollView>
  );
}

export default Home;
