import { ChangeEvent, useEffect, useState } from "react";
import { Avatar, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Flex, IconButton, Input, InputGroup, InputRightAddon, Menu, MenuButton, MenuItem, MenuList, Spacer, Stack, Text, useToast } from "@chakra-ui/react";
import { socket } from "../socket/socket";

import {IoMdSend} from "react-icons/io";
import colors from "../../colors/colors";
import codes from "../code/codes";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiDotsHorizontal } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { PiHandshake } from "react-icons/pi";

interface chatBoxProps {
    user_id : number,
    chat_id : number,
    offer: object,
    other: object,
}

const ChatBox = ({chat_id, user_id, other, offer} : chatBoxProps) => {
    if(socket.disconnected) {
        socket.connect();
    }
    const navigate = useNavigate();
    const toast = useToast();
    const [messages, setMessages] = useState([]);
    const [codeSent, setSent] = useState<number>();
    let msgRender: object[] = []
    const [msg, setMsg] = useState("");

    socket.on("message", (message) => {
        console.log(message); 
    });
    
    socket.on(`showMsg:${chat_id}`, (resp) => {
        setMessages(resp);
    });

    socket.on("Desconnect", (resp) => {
        socket.close();
        navigate(0);
    })

    socket.on("intrestOprRes", (resp) => {
        setSent(resp);
    })
    
    useEffect(() => {
        if(chat_id) socket.emit("reqMsg", chat_id);
    }, [chat_id])

    messages.map(item => {
        msgRender.push(item)
    })


    useEffect(() => {
        if(codeSent){ switch(codeSent) {
            case 201:
                if(codeSent) toast({
                    title: 'Interesse declarado!',
                    description: "Agora você está compromissado nesta oferta! Um importante passo para receber o equipamento.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                socket.emit("postMessage", {chat: chat_id, msg : codes.compSucsses, user: user_id});
            break;
            case 401:
                if(codeSent) toast({
                    title: 'Já existe um interesse nessa oferta!',
                    description: "Não há como iniciar um compromisso na oferta se já há um existente!",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                socket.emit("postMessage", {chat: chat_id, msg : codes.compError, user: user_id});
            break;
        } setSent(0)}
    }, [codeSent])
    
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
            switch (item.msg_content) {
                case codes.compromisseCode:
                    if(offer.User_user_id == item.User_user_id) return <Flex w="100%" key={item.msg_id}>
                        <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", sm:"60%"}} p={{base:"4%" ,sm:"1%"}} borderRadius="5px" bg={colors.colorFontBlue}>
                            <Text textAlign="justify" mb="3%" color="#fff" fontSize={{base:"15px", sm:"15px"}} fontWeight="bold">Deseja iniciar um compromisso nesta oferta?</Text>
                            <ButtonGroup >
                                <Button color="#fff" variant="outline" onClick={() => {socket.emit("setIntrest", {userId : user_id, offerId : offer.ofr_id})}}>Sim</Button>
                                <Button color="#fff" variant="outline" onClick={() => {socket.emit("postMessage", {chat: chat_id, msg : codes.compNot, user: user_id});}}>Não</Button>
                            </ButtonGroup>
                        </Flex>
                        <Spacer/>
                    </Flex>
                    else {
                        return <Flex w="100%" key={item.msg_id}>
                            <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", sm:"60%"}} p={{base:"4%" ,sm:"1%"}} borderRadius="5px" bg={colors.colorFontBlue} >
                                <Text mb="3%" color="#fff" fontSize={{base:"15px", sm:"15px"}} textAlign="justify" fontWeight="bold">{`${other.user_name} deseja começar um compromisso em sua oferta!`}</Text>
                            </Flex>
                            <Spacer/>
                        </Flex>
                    }
                case codes.compSucsses:
                    return <Flex w="100%" key={item.msg_id}>
                            <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", sm:"60%"}} p={{base:"4%" ,sm:"1%"}} borderRadius="5px" bg={colors.colorFontBlue} >
                                <Text mb="3%" color="#fff" fontSize={{base:"15px", sm:"15px"}} textAlign="justify" fontWeight="bold">{`${other.user_name} começou um compromisso em sua oferta!`}</Text>
                            </Flex>
                        <Spacer/>
                    </Flex>
                case codes.compError:
                    return <Flex w="100%" key={item.msg_id}>
                            <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", sm:"60%"}} p={{base:"4%" ,sm:"1%"}} borderRadius="5px" bg={colors.colorFontBlue} >
                                <Text mb="3%" color="#fff" fontSize={{base:"15px", sm:"15px"}} textAlign="justify" fontWeight="bold">{`Já existe um compromisso nesta oferta! Logo outro não pode ser iniciado por ${other.user_name}`}</Text>
                            </Flex>
                        <Spacer/>
                    </Flex>
                case codes.compNot:
                    return <Flex w="100%" key={item.msg_id}>
                            <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", sm:"60%"}} p={{base:"4%" ,sm:"1%"}} borderRadius="5px" bg={colors.colorFontBlue} >
                                <Text mb="3%" color="#fff" fontSize={{base:"15px", sm:"15px"}} textAlign="justify" fontWeight="bold">{`${other.user_name} não quer iniciar um compromisso em sua oferta!`}</Text>
                            </Flex>
                        <Spacer/>
                    </Flex>
                default :
                    return <Flex w="100%" key={item.msg_id}>
                        <Box minW="0%" maxW={{base:"80%", sm:"60%"}} p={{base:"4%" ,sm:"1%"}} borderRadius="5px" bg={colors.colorFontBlue}>
                        <Text textAlign="justify" color="#fff" fontSize={{base:"15px", sm:"15px"}}>{item.msg_content}</Text>
                        </Box>
                        <Spacer/>
                    </Flex>
            }
        }
        else {
            switch (item.msg_content) {
                case codes.compromisseCode: 
                    return <Flex w="100%" key={item.msg_id}>
                    <Spacer/>
                        <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", sm:"60%"}} p={{base:"4%" ,sm:"1%"}} borderRadius="5px" bg={colors.slideMsgBg} _dark={{bg : colors.categoryBg_Dark}}>
                                <Text mb="3%" fontSize={{base:"15px", sm:"15px"}} textAlign="justify" fontWeight="bold">{`Você requisitou o começo de um compromisso para ${other.user_name}`}</Text>
                            </Flex>
                    </Flex>
                case codes.compSucsses:
                    return <Flex w="100%" key={item.msg_id}>
                    <Spacer/>
                        <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", sm:"60%"}} p={{base:"4%" ,sm:"1%"}} borderRadius="5px" bg={colors.slideMsgBg} _dark={{bg : colors.categoryBg_Dark}}>
                                <Text mb="3%" fontSize={{base:"15px", sm:"15px"}} textAlign="justify" fontWeight="bold">{`Você iniciou um compromisso na oferta de ${other.user_name}`}</Text>
                            </Flex>
                    </Flex>
                case codes.compError:
                    return <Flex w="100%" key={item.msg_id}>
                    <Spacer/>
                        <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", sm:"60%"}} p={{base:"4%" ,sm:"1%"}} borderRadius="5px" bg={colors.slideMsgBg} _dark={{bg : colors.categoryBg_Dark}}>
                                <Text mb="3%" fontSize={{base:"15px", sm:"15px"}} textAlign="justify" fontWeight="bold">{`Você não pode iniciar um compromisso nessa oferta! Já há um existente!`}</Text>
                            </Flex>
                    </Flex>
                case codes.compNot:
                    return <Flex w="100%" key={item.msg_id}>
                    <Spacer/>
                        <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", sm:"60%"}} p={{base:"4%" ,sm:"1%"}} borderRadius="5px" bg={colors.slideMsgBg} _dark={{bg : colors.categoryBg_Dark}}>
                                <Text mb="3%" fontSize={{base:"15px", sm:"15px"}} textAlign="justify" fontWeight="bold">{`Você recusou iniciar um compromisso na oferta de ${other.user_name}`}</Text>
                            </Flex>
                    </Flex>
                default :
                    return <Flex w="100%" key={item.msg_id}>
                    <Spacer/>
                    <Box minW="0%" maxW={{base:"80%", sm:"60%"}} p={{base:"4%" ,sm:"1%"}} borderRadius="5px" bg={colors.slideMsgBg} _dark={{bg : colors.categoryBg_Dark}}>
                        <Text fontSize={{base:"15px", sm:"15px"}} textAlign="justify">{item.msg_content}</Text>
                    </Box>
                    </Flex>
            }
        }
    });

    return (
        <Card w={{base:"90%", sm:"80vw"}} bg="#f7f7f7" variant="outline" _dark={{bg : colors.colorFontDarkBlue}}>
            <Flex w="100%" align="center" direction="row" pt="1%" pb="1%">
                <Avatar name={other.user_name} src={(other.user_img) ? String.fromCharCode(...new Uint8Array(other.user_img.data)) : ""} size={{base:"md", sm:"sm"}} mr="1%" ml="2%"/>
                <Text fontSize={{base:"20px", sm:"15px"}}>{other.user_name}</Text>
                <Spacer/>
                <Menu>
                    <MenuButton  
                        as={IconButton}
                        aria-label='Options'
                        icon = {<BiDotsHorizontal size='80%'/>}
                        variant="unstyled"
                        bg='#0000'
                        _hover={{bg : "#0002", _dark:{bg : "#fff3"}}}>
                    </MenuButton>
                    <MenuList fontSize={{base:"20px", sm:"15px"}}>
                       <MenuItem onClick={() => {
                            socket.emit("endChat", chat_id);
                            navigate(0);
                        }}> 
                            <Flex direction="row" align="center" w={{base:"40%" ,sm:"95%"}}>Cancelar conversa<Spacer/><BsTrash size="6%"/></Flex>
                       </MenuItem>
                       <MenuItem onClick={() => {socket.emit("postMessage", {chat: chat_id, msg : codes.compromisseCode, user: user_id});}}>
                            <Flex direction="row" align="center" w={{base:"40%" ,sm:"95%"}}>Iniciar compromisso<Spacer/><PiHandshake size="6%"/></Flex>
                       </MenuItem>
                    </MenuList>
                </Menu>
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
                    }}/>
                </InputGroup>
                
            </CardFooter>
        </Card>
    )
}

export default ChatBox;