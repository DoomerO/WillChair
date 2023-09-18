import { Flex, Text, Spacer, Box, Stack } from "@chakra-ui/react";
import {useState, useEffect} from "react";
import axios from "axios";
import colors from "../colors/colors";

interface messagesProps {
    chatId : number,
    targetId : number
}

const Messages = ({chatId, targetId} : messagesProps) => {

    const [messages, setMessages] = useState([]);

    async function getMessages() {
        await axios.get(`http://localhost:3344/messages/chat/adm/${chatId}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setMessages(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        if(chatId) getMessages();
    }, [chatId])

    const renderMessages = messages.map(item => {
        if (item.User_user_id == targetId) {
            return <Flex w="100%" key={item.msg_id}>
                <Box minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.colorFontBlue}>
                    <Text textAlign="justify" color="#fff" fontSize={{base:"15px", md:"15px"}}>{item.msg_content}</Text>
                </Box>
                <Spacer/>
            </Flex>
        }
        return <Flex w="100%" key={item.msg_id}>
            <Spacer/>
            <Box minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.slideMsgBg} _dark={{bg : colors.categoryBg_Dark}}>
                <Text fontSize={{base:"15px", md:"15px"}} textAlign="justify">{item.msg_content}</Text>
            </Box>
        </Flex>
    });

    return (
        <Flex w="90%" direction="column">
            <Flex direction="row" align="center"  mb="1%" p="1.5%" borderRadius="10px" bg={colors.slideMsgBg} _dark={{bg : colors.categoryBg_Dark}}>
                <Text fontSize="18px" textAlign="justify" fontWeight="bold">Alvo da Denúncia</Text>
                <Spacer/>
                <Text fontSize="18px" textAlign="justify" fontWeight="bold">Outro usuário</Text>
            </Flex>
            <Stack spacing={2} direction="column" maxH="50vh" minH="50vh" overflowY="scroll" css={{
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
                {renderMessages}
            </Stack>
        </Flex>
    )
}

export default Messages;