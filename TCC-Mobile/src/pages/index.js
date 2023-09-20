import React from "react";
import {Box, HStack, Icon} from 'native-base'
import { Pressable, Text, StyleSheet } from "react-native";
import {Feather, FontAwesome} from '@expo/vector-icons'

/*----------------------------------------------Área específica para style----------------------------------------------*/

const style = StyleSheet.create({
    header:{
        backgroundColor:'#fff',
        elevation:5,
        marginBottom:2,
    },
    
    texto1:{
        color:'#2D3748',
        fontSize: 25,
        textAlign:'center',
    },

    texto2:{
        color: '#1976D2',
        fontSize:25,
        textAlign:'center',
    },

    texto3:{
        marginTop:15,
        fontFamily:'Arial',
        textAlign:'justify',
        fontSize:13,
        fontWeight:"bold",
    },

    section1:{
        backgroundColor:'#F7F9FC',
        paddingTop:40,
        paddingBottom:70,
    }
})

/*-------------------------------------------------------------------------------------------------------------------------*/

export default function Home(){
    return(
        <Box>
            <HStack padding={4} w='100%' alignItems="center" justifyContent="space-between" safeArea  style={style.header}>
                <Box>
                    <Pressable>
                        <Icon
                            as={Feather}
                            name="menu"
                            size={7}
                            color="#000">
                        </Icon>
                    </Pressable>
                </Box>

                <Box>
                    <Pressable>
                        <Icon
                            as={FontAwesome}
                            name="user"
                            size={7}
                            color="#000">
                        </Icon>
                    </Pressable>
                </Box>
            </HStack>
        
            <Box paddingX={4} style={style.section1}>
                <Text style={style.texto1}> O seu sonho acessível</Text>
                <Text style={style.texto2}> perto de você!</Text>
                <Text style={style.texto3}> Compre, negocie ou anuncie equipamentos de acessibilidade</Text>
            </Box>

        </Box>
    );
}
