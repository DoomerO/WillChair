import { ChangeEvent, useEffect, useState } from "react";
import { Avatar, Box, Button, Flex, IconButton, Input, InputGroup, InputRightAddon, Menu, MenuButton, MenuItem, MenuList, Spacer, Stack, Text} from "@chakra-ui/react";
import { socket } from "../socket/socket";

import {IoMdSend} from "react-icons/io";
import colors from "../../colors/colors";
import { BiDotsHorizontal } from "react-icons/bi";
import {BsTrash} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";

interface chatSquareProps {
    user_id : number,
    chat_id : number,
    isOwner : boolean,
    end : React.MouseEventHandler<HTMLButtonElement>
}

const ChatSquare = ({chat_id, user_id, isOwner, end} : chatSquareProps) => {
    if(socket.disconnected) {
        socket.connect();
    }
    const [messages, setMessages] = useState([]);
    const [other, setOther] = useState([]);
    let msgRender: object[] = []
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    socket.on("message", (message) => {
        console.log(message); 
    });
    
    socket.on("showMsg", (resp) => {
        setMessages(resp);
    });

    socket.on("otherUser", (resp) => {
        setOther(resp);
    })

    messages.map(item => {
        msgRender.push(item)
    })

    useEffect(() => {
        (isOwner) ? socket.emit("findOther", chat_id) : socket.emit("findOwner", chat_id);
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
        <Flex w={{base:"100%", sm:"100%"}} bg="#f7f7f7" _dark={{bg : colors.veryLightBlue_Dark}} h="100%" direction="column" justifyContent="center" align="center">
            <Spacer />
            <Flex mt="8vh" w="100%" mb="1%" align="center" direction="row" pt="1%" pb="1%" bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}} pl="2%" >
                <Link to={`/profile/${other.user_email}/view`}>
                    <Avatar name={other.user_name} src={(other.user_img) ? String.fromCharCode(...new Uint8Array(other.user_img)) : ""} size={{base:"md", sm:"sm"}} _hover={{border : `2px solid ${colors.colorFontBlue}`, _dark : {border : "2px solid #fff"}}}/>
                </Link>
                <Text fontSize={{base:"20px", sm:"18px"}} ml="1%" fontWeight="bold">{other.user_name}</Text>
                <Spacer/>
                <Menu>
                    <MenuButton  
                        as={IconButton}
                        aria-label='Options'
                        icon = {<BiDotsHorizontal size='80%'/>}
                        variant="unstyled"
                        bg='#0000'>
                    </MenuButton>
                    <MenuList fontSize={{base:"20px", sm:"15px"}}>
                       <MenuItem onClick={end}>
                            <Flex direction="row" align="center" onClick={() => {console.log("cu")}} w={{base:"40%" ,sm:"95%"}}>Fechar Chat<Spacer/><AiOutlineCloseCircle size="6%"/></Flex>
                       </MenuItem>
                       <MenuItem onClick={() => {
                        socket.emit("endChat", chat_id);
                        navigate(0);
                        }}> 
                            <Flex direction="row" align="center" w={{base:"40%" ,sm:"95%"}}>Cancelar conversa<Spacer/><BsTrash size="6%"/></Flex>
                       </MenuItem>
                       <Link to={`/offer/${other.ofr_id}`}><MenuItem onClick={() => {
                        socket.close();
                        }}> 
                            <Flex direction="row" align="center" w={{base:"40%" ,sm:"95%"}}>Ir para a oferta<Spacer/><MdOutlineLocalOffer size="6%"/></Flex>
                       </MenuItem></Link>
                    </MenuList>
                </Menu>
            </Flex>
            <Flex w="100%" pr="2%" pl="2%" minH={{base:"60vh" , sm:"70%"}} maxH={{base:"60vh", sm:"70%"}} overflowY="scroll" css={{
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
            </Flex>
            <Spacer/>
            <Flex align="center" direction="column" bg={colors.bgTableRow1} w="100%" _dark={{bg : colors.bgTableRow1_Dark}}>
                <InputGroup w="95%" pb="2%" pt="2%">
                    <Input maxLength={255} type="text" fontSize={{base:"20px", sm:"15px"}} onKeyDown={handleKeyPress} onChange={handleChange} value={msg}></Input>
                    <InputRightAddon children={<IoMdSend/>} bg="#eee" _dark={{bg:"#0000"}} _hover={{bg:"#aaa", _dark:{bg:"#555"}}}
                    onClick={() => {
                        setMsg("");
                        socket.emit("postMessage", {chat: chat_id, msg : msg, user: user_id});
                        socket.emit("reqMsg", chat_id);
                    }}/>
                </InputGroup>
                
            </Flex>
        </Flex>
    )
}

export default ChatSquare;