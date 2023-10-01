import React from "react";
import { StyleSheet, Image } from "react-native";
import {Box, Menu, Pressable, HamburgerIcon, ScrollView} from "native-base";
import imgLogo from "../../assets/Logo_Clear.png";

/*----------------------------------------------Área específica para style----------------------------------------------*/

const style = StyleSheet.create({
    header:{
        backgroundColor:'#fff',
        elevation:5,
        marginBottom:2,
    },

    imgHeader: {
        marginTop:5,
        marginLeft: 95,
        width:122,
        height:25,
      },
})

/*-------------------------------------------------------------------------------------------------------------------------*/


export default function About() {
    return (
        <ScrollView h="100%">
            <Box style={style.header} safeArea>
                <Box ml="4%" mt="4%" mb="2%"  flexDirection="row">
                    <Menu closeOnSelect={false} trigger={(triggerProps) => (
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
                        <Image source={imgLogo} style={style.imgHeader}/>
                </Box>
            </Box>

            <Box>
                
            </Box>
        </ScrollView>
    );
}
