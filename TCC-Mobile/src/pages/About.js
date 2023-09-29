import React from "react";
import { StyleSheet, Image } from "react-native";
import {Box, Menu, Pressable, HamburgerIcon, ScrollView} from "native-base";

import imgLogo from "../../assets/Logo_Clear.png"

/*----------------------------------------------Área específica para style----------------------------------------------*/

const style = StyleSheet.create({
    header:{
        backgroundColor:'#fff',
        elevation:5,
        marginBottom:2,
    },
    imgHeader: {
        marginLeft: 50,
        width: 200,
        height: 50,
      },
})

/*-------------------------------------------------------------------------------------------------------------------------*/


export default function About() {
    return (
        <ScrollView h="100%">
            <Box style={style.header} safeArea>
                <Box ml="3%" mt="4%" mb="1%" display="flex" justifyContent="center" flexDirection="row" align="center">
                    <Image source={imgLogo} style={style.imgHeader} />
                    <Menu closeOnSelect={false} w="295px"  trigger={(triggerProps) => (
                        <Pressable {...triggerProps}>
                            <HamburgerIcon size="9"/>
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
            </Box>
        </ScrollView>
    );
}