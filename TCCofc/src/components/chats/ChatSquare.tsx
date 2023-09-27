import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, ButtonGroup, useToast, Flex, IconButton, Input, InputGroup, InputRightAddon, Menu, MenuButton, MenuItem, MenuList, Spacer, Stack, Text} from "@chakra-ui/react";
import { socket } from "../socket/socket";

import {IoMdSend} from "react-icons/io";
import colors from "../../colors/colors";
import { Link, useNavigate } from "react-router-dom";
import codes from "../../components/code/codes";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdBlock, MdOutlineLocalOffer } from "react-icons/md";
import { BiDotsHorizontal } from "react-icons/bi";
import {BsTrash} from "react-icons/bs";
import { PiHandshake } from "react-icons/pi";
import {FiDelete} from "react-icons/fi";
import axios from "axios";

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
    const messageOverFlow = useRef(null);
    const navigate = useNavigate();
    const [codeSent, setSent] = useState<number>();
    const toast = useToast();
    const [img, setImg] = useState<any>();

    async function getImg() {
        await axios.get(`http://localhost:3344/users/profile/photo/${other.user_img}`, {responseType : "arraybuffer"}).then(res => {
            const buffer = new Uint8Array(res.data);
            const blob = new Blob([buffer], { type: res.headers.contentType });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setImg(reader.result);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    socket.on("message", (message) => {
        console.log(message); 
    });
    
    socket.on(`showMsg:${chat_id}`, (resp) => {
        setMessages(resp);
    });

    socket.on("otherUser", (resp) => {
        setOther(resp);
    })

    socket.on("intrestOprRes", (resp) => {
        setSent(resp);
    })

    socket.on("Desconnect", (resp) => {
        socket.close();
        navigate(0);
    })

    messages.map(item => {
        msgRender.push(item)
    })

    useEffect(() => {
        if (messageOverFlow) {
            messageOverFlow.current.addEventListener('DOMNodeInserted', event => {
              const { currentTarget: target } = event;
              target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, [])

    useEffect(() => {
        (isOwner) ? socket.emit("findOther", chat_id) : socket.emit("findOwner", chat_id);
        if(chat_id) socket.emit("reqMsg", chat_id);
    }, [chat_id])

    useEffect(() => {
        if(other.user_img)getImg();
    }, [other])

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
            setMsg("");
        }
    }

    const renderMessages = msgRender.map(item => {
        if(item.User_user_id == other.user_id) {
            switch (item.msg_content) {
                case codes.compromisseCode:
                    if(other.ofr_owner_id == item.User_user_id) return <Flex w="100%" key={item.msg_id}>
                        <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.colorFontBlue}>
                            <Text textAlign="justify" mb="3%" color="#fff" fontSize={{base:"15px", md:"15px"}} fontWeight="bold">Deseja iniciar um compromisso nesta oferta?</Text>
                            <ButtonGroup >
                                <Button color="#fff" variant="outline" onClick={() => {socket.emit("setIntrest", {userId : user_id, offerId : other.ofr_id})}}>Sim</Button>
                                <Button color="#fff" variant="outline" onClick={() => {socket.emit("postMessage", {chat: chat_id, msg : codes.compNot, user: user_id});}}>Não</Button>
                            </ButtonGroup>
                        </Flex>
                        <Spacer/>
                    </Flex>
                    else {
                        return <Flex w="100%" key={item.msg_id}>
                            <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.colorFontBlue} >
                                <Text mb="3%" color="#fff" fontSize={{base:"15px", md:"15px"}} textAlign="justify" fontWeight="bold">{`${other.user_name} deseja começar um compromisso em sua oferta!`}</Text>
                            </Flex>
                            <Spacer/>
                        </Flex>
                    }
                case codes.compSucsses:
                    return <Flex w="100%" key={item.msg_id}>
                            <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.colorFontBlue} >
                                <Text mb="3%" color="#fff" fontSize={{base:"15px", md:"15px"}} textAlign="justify" fontWeight="bold">{`${other.user_name} começou um compromisso em sua oferta!`}</Text>
                            </Flex>
                        <Spacer/>
                    </Flex>
                case codes.compError:
                    return <Flex w="100%" key={item.msg_id}>
                            <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.colorFontBlue} >
                                <Text mb="3%" color="#fff" fontSize={{base:"15px", md:"15px"}} textAlign="justify" fontWeight="bold">{`Já existe um compromisso nesta oferta! Logo outro não pode ser iniciado por ${other.user_name}`}</Text>
                            </Flex>
                        <Spacer/>
                    </Flex>
                case codes.compNot:
                    return <Flex w="100%" key={item.msg_id}>
                            <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.colorFontBlue} >
                                <Text mb="3%" color="#fff" fontSize={{base:"15px", md:"15px"}} textAlign="justify" fontWeight="bold">{`${other.user_name} não quer iniciar um compromisso em sua oferta!`}</Text>
                            </Flex>
                        <Spacer/>
                    </Flex>
                default :
                    if (item.msg_show) {
                        return <Flex w="100%" key={item.msg_id}>
                            <Box minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.colorFontBlue}>
                                <Text textAlign="justify" color="#fff" fontSize={{base:"15px", md:"15px"}}>{item.msg_content}</Text>
                            </Box>
                            <Spacer/>
                        </Flex>
                    }
                    else {
                        return <Flex w="100%" key={item.msg_id}>
                            <Flex direction="row" align="center" minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.colorFontBlue} >
                                <Text color="#fff" fontSize={{base:"15px", md:"15px"}} textAlign="justify" fontWeight="bold">{`${other.user_name} apagou essa mensagem`}</Text>
                                <MdBlock size="3vh"/>
                            </Flex>
                            <Spacer/>
                        </Flex>
                    }
            }
        }
        else {
            switch (item.msg_content) {
                case codes.compromisseCode: 
                    return <Flex w="100%" key={item.msg_id}>
                    <Spacer/>
                        <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.slideMsgBg} _dark={{bg : colors.categoryBg_Dark}}>
                            <Text mb="3%" fontSize={{base:"15px", md:"15px"}} textAlign="justify" fontWeight="bold">{`Você requisitou o começo de um compromisso para ${other.user_name}`}</Text>
                        </Flex>
                    </Flex>
                case codes.compSucsses:
                    return <Flex w="100%" key={item.msg_id}>
                    <Spacer/>
                        <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.slideMsgBg} _dark={{bg : colors.categoryBg_Dark}}>
                            <Text mb="3%" fontSize={{base:"15px", md:"15px"}} textAlign="justify" fontWeight="bold">{`Você iniciou um compromisso na oferta de ${other.user_name}`}</Text>
                        </Flex>
                    </Flex>
                case codes.compError:
                    return <Flex w="100%" key={item.msg_id}>
                    <Spacer/>
                        <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.slideMsgBg} _dark={{bg : colors.categoryBg_Dark}}>
                            <Text mb="3%" fontSize={{base:"15px", md:"15px"}} textAlign="justify" fontWeight="bold">{`Você não pode iniciar um compromisso nessa oferta! Já há um existente!`}</Text>
                        </Flex>
                    </Flex>
                case codes.compNot:
                    return <Flex w="100%" key={item.msg_id}>
                    <Spacer/>
                        <Flex direction="column" align="center" minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.slideMsgBg} _dark={{bg : colors.categoryBg_Dark}}>
                            <Text mb="3%" fontSize={{base:"15px", md:"15px"}} textAlign="justify" fontWeight="bold">{`Você recusou iniciar um compromisso na oferta de ${other.user_name}`}</Text>
                        </Flex>
                    </Flex>
                default :
                    
                    if (item.msg_show) {
                        return <Flex w="100%" key={item.msg_id}>
                            <Spacer/>
                            <Box minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.slideMsgBg} _dark={{bg : colors.categoryBg_Dark}}>
                                <Text fontSize={{base:"15px", md:"15px"}} textAlign="justify" mr="25px">{item.msg_content}</Text>
                                <IconButton aria-label={"apagar mensagem"} bg="#0000" float="right" size="20%" onClick={() => {socket.emit("deleteMsg", {chat : chat_id, msgId : item.msg_id})}}><FiDelete color={colors.colorFontBlue} /></IconButton>
                            </Box>
                        </Flex>
                    }
                    else {
                        return <Flex w="100%" key={item.msg_id}>
                        <Spacer/>
                            <Flex direction="row" align="center" minW="0%" maxW={{base:"80%", md:"60%"}} p={{base:"4%" ,md:"1%"}} borderRadius="5px" bg={colors.slideMsgBg} _dark={{bg : colors.categoryBg_Dark}}>
                                <MdBlock size="3vh"/>
                                <Text fontSize={{base:"15px", md:"15px"}} textAlign="justify" fontWeight="bold">{`Você apagou essa mensagem`}</Text>
                            </Flex>
                        </Flex>
                    }
            }
        }
    });

    return (
        <Flex w={{base:"100%", md:"100%"}} bg="#f7f7f7" _dark={{bg : colors.veryLightBlue_Dark}} h="100%" direction="column" justifyContent="center" align="center">
            <Spacer />
            <Flex mt="8vh" w="100%" mb="1%" align="center" direction="row" pt="1%" pb="1%" bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}} pl="2%" >
                <Link to={`/profile/${other.user_email}/view`}>
                    <Avatar name={other.user_name} src={(other.user_img) ? img : ""} size={{base:"md", md:"sm"}} _hover={{border : `2px solid ${colors.colorFontBlue}`, _dark : {border : "2px solid #fff"}}}/>
                </Link>
                <Text fontSize={{base:"20px", md:"18px"}} ml="1%" fontWeight="bold">{other.user_name}</Text>
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
                    <MenuList fontSize={{base:"20px", md:"15px"}}>
                       <MenuItem onClick={end}>
                            <Flex direction="row" align="center" onClick={() => {console.log("cu")}} w={{base:"40%" ,md:"95%"}}>Fechar Chat<Spacer/><AiOutlineCloseCircle size="6%"/></Flex>
                       </MenuItem>
                       <MenuItem onClick={() => {
                            socket.emit("endChat", chat_id);
                            navigate(0);
                        }}> 
                            <Flex direction="row" align="center" w={{base:"40%" ,md:"95%"}}>Cancelar conversa<Spacer/><BsTrash size="6%"/></Flex>
                       </MenuItem>
                       <Link to={`/offer/${other.ofr_id}`}><MenuItem onClick={() => {
                            socket.close();
                        }}> 
                            <Flex direction="row" align="center" w={{base:"40%" ,md:"95%"}}>Ir para a oferta<Spacer/><MdOutlineLocalOffer size="6%"/></Flex>
                       </MenuItem></Link>
                       <MenuItem onClick={() => {socket.emit("postMessage", {chat: chat_id, msg : codes.compromisseCode, user: user_id});}}>
                            <Flex direction="row" align="center" w={{base:"40%" ,md:"95%"}}>Iniciar compromisso<Spacer/><PiHandshake size="6%"/></Flex>
                       </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <Flex w="100%" pr="2%" pl="2%" minH={{base:"60vh" , md:"70%"}} maxH={{base:"60vh", md:"70%"}} overflowY="scroll" ref={messageOverFlow} css={{
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
                    <Input maxLength={255} type="text" fontSize={{base:"20px", md:"15px"}} onKeyDown={handleKeyPress} onChange={handleChange} value={msg}></Input>
                    <InputRightAddon children={<IoMdSend/>} bg="#eee" _dark={{bg:"#0000"}} _hover={{bg:"#aaa", _dark:{bg:"#555"}}}
                    onClick={() => {
                        setMsg("");
                        socket.emit("postMessage", {chat: chat_id, msg : msg, user: user_id});
                    }}/>
                </InputGroup>
                
            </Flex>
        </Flex>
    )
}

export default ChatSquare;