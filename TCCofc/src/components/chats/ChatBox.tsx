import { ChangeEvent, useEffect, useState } from "react";
import { Avatar, Box, Button, Card, CardBody, CardFooter, Flex, Input, InputGroup, InputRightAddon, Spacer, Stack, Text, useToast } from "@chakra-ui/react";
import { socket } from "../socket/socket";

import {IoMdSend} from "react-icons/io";
import colors from "../../colors/colors";
import { useNavigate } from "react-router-dom";

interface chatBoxProps {
    user_id : number,
    chat_id : number,
    other: object,
}

const ChatBox = ({chat_id, user_id, other} : chatBoxProps) => {
    socket.connect();

    const navigate = useNavigate();
    const toast = useToast();
    const [messages, setMessages] = useState([]);
    let msgRender: object[] = []
    const [msg, setMsg] = useState("");

    socket.on("message", (message) => {
        console.log(message); 
    });
    
    socket.on("showMsg", (resp) => {
        setMessages(resp);
    });

    socket.on("Desconnect", (resp) => {
        navigate(0);
        socket.close();
    })

    messages.map(item => {
        msgRender.push(item)
    })

    useEffect(() => {
        socket.emit("reqMsg", chat_id);
    }, [chat_id])
    
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setMsg(e.target.value);
    }

    const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) => { //evento de input de enter na barra de pesquisa
        if (e.key == "Enter") {
            socket.emit("postMessage", {chat: chat_id, msg : msg, user: user_id});
            socket.emit("reqMsg", chat_id);
            setMsg("");
        }
    }

    const renderMessages = msgRender.map(item => {
        if(item.User_user_id == other.user_id) {
            return <Flex w="100%" key={item.msg_id}>
                <Box minW="0%" maxW={{base:"80%", sm:"60%"}} p={{base:"4%" ,sm:"1%"}} borderRadius="5px" bg={colors.colorFontBlue}>
                <Text textAlign="justify" color="#fff" fontSize={{base:"20px", sm:"15px"}}>{item.msg_content}</Text>
                </Box>
                <Spacer/>
                </Flex>
        }
        else {
            return <Flex w="100%" key={item.msg_id}>
            <Spacer/>
            <Box minW="0%" maxW={{base:"80%", sm:"60%"}} p={{base:"4%" ,sm:"1%"}} borderRadius="5px" bg={colors.slideMsgBg} _dark={{bg : colors.categoryBg_Dark}}>
                <Text fontSize={{base:"20px", sm:"15px"}} textAlign="justify">{item.msg_content}</Text>
            </Box>
            </Flex>
        }
    });

    return (
        <Card w={{base:"90%", sm:"80vw"}} bg="#f7f7f7" variant="outline" _dark={{bg : colors.colorFontDarkBlue}}>
            <Flex w="100%" align="center" direction="row" pt="1%" pb="1%">
                <Avatar name={other.user_name} src={(other.user_img) ? String.fromCharCode(...new Uint8Array(other.user_img.data)) : ""} size={{base:"md", sm:"sm"}} mr="1%" ml="2%"/>
                <Text fontSize={{base:"20px", sm:"15px"}}>{other.user_name}</Text>
                <Spacer/>
                <Button variant="outline" mr="2%" onClick={() => {
                        socket.emit("endChat", chat_id);
                    }
                } colorScheme="red">Cancelar chat</Button>
            </Flex>
            <CardBody minH={{base:"60vh" , sm:"50vh"}} maxH={{base:"60vh", sm:"50vh"}} overflowY="scroll" css={{
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
                <Stack w="100%">
                    {renderMessages}
                </Stack>
            </CardBody>
            <CardFooter>
                <InputGroup>
                    <Input maxLength={255} type="text" fontSize={{base:"20px", sm:"15px"}} onKeyDown={handleKeyPress} onChange={handleChange} value={msg}></Input>
                    <InputRightAddon children={<IoMdSend/>} bg="#eee" _dark={{bg:"#0000"}} _hover={{bg:"#aaa", _dark:{bg:"#555"}}}
                    onClick={() => {
                        setMsg("");
                        socket.emit("postMessage", {chat: chat_id, msg : msg, user: user_id});
                        socket.emit("reqMsg", chat_id);
                    }}/>
                </InputGroup>
                
            </CardFooter>
        </Card>
    )
}

export default ChatBox;