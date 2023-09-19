import React from "react";
import {Box, HStack, Icon} from 'native-base'
import { Pressable } from "react-native";
import {Feather, FontAwesome} from '@expo/vector-icons'



export default function Home(){
    return(
        <Box>
            <HStack padding={4} w='100%' alignItems="center" justifyContent="space-between" safeArea>
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
        </Box>
    );
}