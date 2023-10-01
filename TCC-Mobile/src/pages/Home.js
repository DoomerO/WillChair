import React from "react";
import { StyleSheet, Image } from "react-native";
import { Box, Menu, Pressable, HamburgerIcon, ScrollView, Heading, Text } from "native-base";
import imgLogo from "../../assets/Logo_Clear.png";
import Icon1 from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

/*----------------------------------------------Área específica para style----------------------------------------------*/

const style = StyleSheet.create({
    
    section1:{
        marginTop: 30,
    },
    

    header: {
        backgroundColor:'#fff',
        elevation: 5,
        marginBottom: 2,
    },

    imgHeader: {
        marginTop: 5,
        marginLeft: 95,
        width: 122,
        height: 25,
    },

    heading1: {
        marginTop: 20,
        textAlign: 'center',
        color: '#2D3748',
        fontSize: 25,
    },

    heading2: {
        textAlign: "center",
        color: "#1976D2",
        fontSize: 25,
    },

    textHeading: {
        marginTop: 20,
        textAlign: "center",
        color: "#2D3748",
        fontSize: 14.4,
        fontWeight:'bold',
    },

    heading3: {
        textAlign: 'center',
        color: '#2D3748',
        fontSize: 24,
        marginBottom: 20,
        marginTop: 13,
    },

    section2: {
        backgroundColor: '#F7F7F7',
        marginTop: 70,
        paddingTop: 15,
        paddingBottom: 40,
        alignItems: 'center',
    },

    icon: {
        textAlign: 'center',
    },

    textIcon: {
        textAlign: 'center',
    },

    fundoIcon: {
        backgroundColor: '#E8F1FA',
        borderRadius: 100,
        width: 70,
        height: 70,
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
    },

    heading4:{
        textAlign:'center',
        marginTop: 20,
        marginBottom:50,
    },


})

/*-------------------------------------------------------------------------------------------------------------------------*/


export default function Home() {
    return (
        <ScrollView h="100%">
            <Box style={style.header} safeArea>
                <Box ml="4%" mt="4%" mb="2%" flexDirection="row">
                    <Menu closeOnSelect={false} trigger={(triggerProps) => (
                        <Pressable {...triggerProps}>
                            <HamburgerIcon color="#2B2B2B" size="9" />
                        </Pressable>
                    )}>
                        <Menu.ItemOption value="Contato">Home</Menu.ItemOption>
                        <Menu.ItemOption value="Pesquisa">Pesquisar equipamentos</Menu.ItemOption>
                        <Menu.ItemOption value="Contato">Contato</Menu.ItemOption>
                        <Menu.ItemOption value="Sobre">Sobre nós</Menu.ItemOption>
                        <Menu.ItemOption value="Entrar">Entrar</Menu.ItemOption>
                        <Menu.ItemOption value="Cadastrar">Cadastrar</Menu.ItemOption>
                    </Menu>
                    <Image source={imgLogo} style={style.imgHeader} />
                    <Icon name="user-circle-o" size={30} marginLeft={80} color="#2B2B2B" />
                </Box>
            </Box>

            <Box style={style.section1}>
                <Heading style={style.heading1}>
                    O seu sonho acessível
                </Heading>

                <Heading style={style.heading2}>
                    perto de você!
                </Heading>

                <Text style={style.textHeading}>
                    Compre, negocie ou anuncie equipamentos de acessibilidade
                </Text>
            </Box>

            <Box style={style.section2}>
                <Heading style={style.heading3}>
                    O que você pode encontrar por aqui
                </Heading>

                <Box style={style.fundoIcon}>
                    <Icon1 name="credit-card" size={40} />
                </Box>

                <Text style={style.textIcon}>Compra ou venda de produtos</Text>

                <Box style={style.fundoIcon}>
                    <Icon2 name="hand-heart-outline" size={40} />
                </Box>

                <Text style={style.textIcon}>Doações de equipamentos</Text>

                <Box style={style.fundoIcon}>
                    <Icon3 name="human-wheelchair" size={40} />
                </Box>

                <Text style={style.textIcon}>Aluguéis por preços acessíveis</Text>
            </Box>

            <Box >
                <Heading style={style.heading4}>
                    Confira abaixo algumas de nossas categorias
                </Heading>
            </Box>

        </ScrollView>
    );
}