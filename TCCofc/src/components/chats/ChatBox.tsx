import { ChangeEvent, useEffect, useState, useRef } from "react";
import { Avatar, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Flex, IconButton, Input, InputGroup, InputRightAddon, Menu, MenuButton, MenuItem, MenuList, Spacer, Stack, Text, useToast } from "@chakra-ui/react";
import { socket } from "../socket/socket";

import axios from "axios";
import colors from "../../colors/colors";
import codes from "../code/codes";

import { IoMdSend } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { BiDotsHorizontal } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { PiHandshake } from "react-icons/pi";
import { MdBlock } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import serverUrl from "../code/serverUrl";
import { MessageProps, Offer, User } from "../code/interfaces";
import ComponentLoading from "../toggles/ComponentLoading";

interface chatBoxProps {
    user_id: number,
    chat_id: number,
    offer: Offer,
    other: User,
}

const ChatBox = ({ chat_id, user_id, other, offer }: chatBoxProps) => {
    useEffect(() => {
        if (socket.disconnected) {
            socket.connect();
        }
    }, [])

    const navigate = useNavigate();
    const toast = useToast();
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const messageOverFlow = useRef<any>();
    const [codeSent, setSent] = useState<number>();
    let msgRender: MessageProps[] = []
    const [msg, setMsg] = useState("");
    const [img, setImg] = useState<any>();
    const [loading, isLoading] = useState(true);

    async function getImg() {
        await axios.get(`${serverUrl}/users/profile/photo/${other.user_img}`, { responseType: "arraybuffer" }).then(res => {
            const buffer = new Uint8Array(res.data);
            const blob = new Blob([buffer], { type: res.headers.contentType });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setImg(reader.result);
                isLoading(false);
            }
        }).catch((error) => {
            console.log(error);
            isLoading(false);
        })
    }

    socket.on("message", (message) => {
        console.log(message);
    });

    socket.on(`showMsg:${chat_id}`, (resp) => {
        setMessages(resp);
        isLoading(false);
    });

    socket.on("Desconnect", () => {
        socket.close();
        navigate(0);
    })

    socket.on("intrestOprRes", (resp) => {
        setSent(resp);
    })

    messages.map(item => {
        msgRender.push(item)
    })

    useEffect(() => {
        if (messageOverFlow.current) {
            const observer = new MutationObserver(() => {
                const target = messageOverFlow.current;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });

            observer.observe(messageOverFlow.current, { childList: true, subtree: true });

            return () => {
                observer.disconnect();
            };
        }
    }, [])

    useEffect(() => {
        if (other.user_img) getImg();
        if (chat_id) socket.emit("reqMsg", chat_id)
    }, [other, chat_id]);

    useEffect(() => {
        if (codeSent) {
            switch (codeSent) {
                case 201:
                    if (codeSent) toast({
                        title: 'Interesse declarado!',
                        description: "Agora você está compromissado nesta oferta! Um importante passo para receber o equipamento.",
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                    socket.emit("postMessage", { chat: chat_id, msg: codes.compSucsses, user: user_id });
                    navigate(0)
                    break;
                case 401:
                    if (codeSent) toast({
                        title: 'Já existe um interesse nessa oferta!',
                        description: "Não há como iniciar um compromisso na oferta se já há um existente!",
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                    socket.emit("postMessage", { chat: chat_id, msg: codes.compError, user: user_id });
                    break;
            } setSent(0)
        }
    }, [codeSent])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMsg(e.target.value);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => { //evento de input de enter na barra de pesquisa
        if (e.key == "Enter") {
            socket.emit("postMessage", { chat: chat_id, msg: msg, user: user_id });
            setMsg("");
        }
    }

    const renderMessages = msgRender.map(item => {
        if (item.User_user_id == other.user_id) {
            switch (item.msg_content) {
                case codes.compromisseCode:
                    if (offer.User_user_id == item.User_user_id) return <Flex w="100%" key={item.msg_id}>
                        <Flex direction="column" align="center" minW="0%" maxW={{ base: "80%", md: "60%" }} p={{ base: "4%", md: "1%" }} borderRadius="5px" bg={colors.colorFontBlue}>
                            <Text textAlign="justify" mb="3%" color="#fff" fontSize={{ base: "15px", md: "15px" }} fontWeight="bold">Deseja iniciar um compromisso nesta oferta?</Text>
                            <ButtonGroup >
                                <Button color="#fff" variant="outline" _hover={{ color: "#fff3" }} onClick={() => { socket.emit("setIntrest", { userId: user_id, offerId: offer.ofr_id }) }}>Sim</Button>
                                <Button color="#fff" variant="outline" _hover={{ color: "#fff3" }} onClick={() => { socket.emit("postMessage", { chat: chat_id, msg: codes.compNot, user: user_id }); }}>Não</Button>
                            </ButtonGroup>
                        </Flex>
                        <Spacer />
                    </Flex>
                    else {
                        return <Flex w="100%" key={item.msg_id}>
                            <Flex direction="column" align="center" minW="0%" maxW={{ base: "80%", md: "60%" }} p={{ base: "4%", md: "1%" }} borderRadius="5px" bg={colors.colorFontBlue} >
                                <Text mb="3%" color="#fff" fontSize={{ base: "15px", md: "15px" }} textAlign="justify" fontWeight="bold">{`${other.user_name} deseja começar um compromisso em sua oferta!`}</Text>
                            </Flex>
                            <Spacer />
                        </Flex>
                    }
                case codes.compSucsses:
                    return <Flex w="100%" key={item.msg_id}>
                        <Flex direction="column" align="center" minW="0%" maxW={{ base: "80%", md: "60%" }} p={{ base: "4%", md: "1%" }} borderRadius="5px" bg={colors.colorFontBlue} >
                            <Text mb="3%" color="#fff" fontSize={{ base: "15px", md: "15px" }} textAlign="justify" fontWeight="bold">{`${other.user_name} começou um compromisso em sua oferta!`}</Text>
                        </Flex>
                        <Spacer />
                    </Flex>
                case codes.compError:
                    return <Flex w="100%" key={item.msg_id}>
                        <Flex direction="column" align="center" minW="0%" maxW={{ base: "80%", md: "60%" }} p={{ base: "4%", md: "1%" }} borderRadius="5px" bg={colors.colorFontBlue} >
                            <Text mb="3%" color="#fff" fontSize={{ base: "15px", md: "15px" }} textAlign="justify" fontWeight="bold">{`Já existe um compromisso nesta oferta! Logo outro não pode ser iniciado por ${other.user_name}`}</Text>
                        </Flex>
                        <Spacer />
                    </Flex>
                case codes.compNot:
                    return <Flex w="100%" key={item.msg_id}>
                        <Flex direction="column" align="center" minW="0%" maxW={{ base: "80%", md: "60%" }} p={{ base: "4%", md: "1%" }} borderRadius="5px" bg={colors.colorFontBlue} >
                            <Text mb="3%" color="#fff" fontSize={{ base: "15px", md: "15px" }} textAlign="justify" fontWeight="bold">{`${other.user_name} não quer iniciar um compromisso em sua oferta!`}</Text>
                        </Flex>
                        <Spacer />
                    </Flex>
                default:
                    if (item.msg_show) {
                        return <Flex w="100%" key={item.msg_id}>
                            <Box minW="0%" maxW={{ base: "80%", md: "60%" }} p={{ base: "4%", md: "1%" }} borderRadius="5px" bg={colors.colorFontBlue}>
                                <Text textAlign="justify" color="#fff" fontSize={{ base: "15px", md: "15px" }}>{item.msg_content}</Text>
                            </Box>
                            <Spacer />
                        </Flex>
                    }
                    else {
                        return <Flex w="100%" key={item.msg_id}>
                            <Flex direction="row" align="center" minW="0%" maxW={{ base: "80%", md: "60%" }} p={{ base: "4%", md: "1%" }} borderRadius="5px" bg={colors.colorFontBlue} >
                                <Text color="#fff" fontSize={{ base: "15px", md: "15px" }} textAlign="justify" fontWeight="bold">{`${other.user_name} apagou essa mensagem`}</Text>
                                <MdBlock size="3vh" color="#fff" />
                            </Flex>
                            <Spacer />
                        </Flex>
                    }
            }
        }
        else {
            switch (item.msg_content) {
                case codes.compromisseCode:
                    return <Flex w="100%" key={item.msg_id}>
                        <Spacer />
                        <Flex direction="column" align="center" minW="0%" maxW={{ base: "80%", md: "60%" }} p={{ base: "4%", md: "1%" }} borderRadius="5px" bg={colors.slideMsgBg} _dark={{ bg: colors.categoryBg_Dark }}>
                            <Text mb="3%" fontSize={{ base: "15px", md: "15px" }} textAlign="justify" fontWeight="bold">{`Você requisitou o começo de um compromisso para ${other.user_name}`}</Text>
                        </Flex>
                    </Flex>
                case codes.compSucsses:
                    return <Flex w="100%" key={item.msg_id}>
                        <Spacer />
                        <Flex direction="column" align="center" minW="0%" maxW={{ base: "80%", md: "60%" }} p={{ base: "4%", md: "1%" }} borderRadius="5px" bg={colors.slideMsgBg} _dark={{ bg: colors.categoryBg_Dark }}>
                            <Text mb="3%" fontSize={{ base: "15px", md: "15px" }} textAlign="justify" fontWeight="bold">{`Você iniciou um compromisso na oferta de ${other.user_name}`}</Text>
                        </Flex>
                    </Flex>
                case codes.compError:
                    return <Flex w="100%" key={item.msg_id}>
                        <Spacer />
                        <Flex direction="column" align="center" minW="0%" maxW={{ base: "80%", md: "60%" }} p={{ base: "4%", md: "1%" }} borderRadius="5px" bg={colors.slideMsgBg} _dark={{ bg: colors.categoryBg_Dark }}>
                            <Text mb="3%" fontSize={{ base: "15px", md: "15px" }} textAlign="justify" fontWeight="bold">{`Você não pode iniciar um compromisso nessa oferta! Já há um existente!`}</Text>
                        </Flex>
                    </Flex>
                case codes.compNot:
                    return <Flex w="100%" key={item.msg_id}>
                        <Spacer />
                        <Flex direction="column" align="center" minW="0%" maxW={{ base: "80%", md: "60%" }} p={{ base: "4%", md: "1%" }} borderRadius="5px" bg={colors.slideMsgBg} _dark={{ bg: colors.categoryBg_Dark }}>
                            <Text mb="3%" fontSize={{ base: "15px", md: "15px" }} textAlign="justify" fontWeight="bold">{`Você recusou iniciar um compromisso na oferta de ${other.user_name}`}</Text>
                        </Flex>
                    </Flex>
                default:
                    if (item.msg_show) {
                        return <Flex w="100%" key={item.msg_id}>
                            <Spacer />
                            <Box minW="0%" maxW={{ base: "80%", md: "60%" }} p={{ base: "4%", md: "1%" }} borderRadius="5px" bg={colors.slideMsgBg} _dark={{ bg: colors.categoryBg_Dark }}>
                                <Text fontSize={{ base: "15px", md: "15px" }} textAlign="justify" mr="25px">{item.msg_content}</Text>
                                <IconButton aria-label={"apagar mensagem"} bg="#0000" float="right" size="20%" onClick={() => { socket.emit("deleteMsg", { chat: chat_id, msgId: item.msg_id }) }}><FiDelete color={colors.colorFontBlue} /></IconButton>
                            </Box>
                        </Flex>
                    }
                    else {
                        return <Flex w="100%" key={item.msg_id}>
                            <Spacer />
                            <Flex direction="row" align="center" minW="0%" maxW={{ base: "80%", md: "60%" }} p={{ base: "4%", md: "1%" }} borderRadius="5px" bg={colors.slideMsgBg} _dark={{ bg: colors.categoryBg_Dark }}>
                                <MdBlock size="3vh" />
                                <Text fontSize={{ base: "15px", md: "15px" }} textAlign="justify" fontWeight="bold">{`Você apagou essa mensagem`}</Text>
                            </Flex>
                        </Flex>
                    }
            }
        }
    });

    return (
        <Card w={{ base: "90%", md: "80vw" }} bg="#f7f7f7" variant="outline" _dark={{ bg: colors.bgCard_Dark }}>
            <Flex w="100%" align="center" direction="row" pt="1%" pb="1%" pl="1%">
                <Link to={`/profile/${other.user_email}/view`}>
                    {(loading) ? <ComponentLoading type="skeleton-circle" width="10" height="10" /> : <Avatar name={other.user_name} src={(other.user_img) ? img : ""} size={{ base: "md", md: "sm" }} _hover={{ border: `2px solid ${colors.colorFontBlue}`, _dark: { border: "2px solid #fff" } }} />}
                </Link>
                <Text ml="1%" fontWeight="bold" fontSize={{ base: "20px", md: "15px" }}>{other.user_name}</Text>
                <Spacer />
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<BiDotsHorizontal size='80%' />}
                        variant="unstyled"
                        bg='#0000'
                        _hover={{ bg: "#0002", _dark: { bg: "#fff3" } }}>
                    </MenuButton>
                    <MenuList fontSize={{ base: "20px", md: "15px" }} w={{ base: "95vw", md: "fit-content" }}>
                        <MenuItem onClick={() => {
                            socket.emit("endChat", chat_id);
                            navigate(0);
                        }}>
                            <Flex direction="row" align="center" w={{ base: "100%", md: "95%" }}>Cancelar conversa<Spacer /><BsTrash size="6%" /></Flex>
                        </MenuItem>
                        <MenuItem onClick={() => { socket.emit("postMessage", { chat: chat_id, msg: codes.compromisseCode, user: user_id }); }}>
                            <Flex direction="row" align="center" w={{ base: "100%", md: "95%" }}>Iniciar compromisso<Spacer /><PiHandshake size="6%" /></Flex>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <CardBody minH={{ base: "60vh", md: "50vh" }} maxH={{ base: "60vh", md: "50vh" }} overflowY="scroll" ref={messageOverFlow} css={{
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
                    {(loading) ? <ComponentLoading height={{base: "53vh", md:"43vh"}}/> : renderMessages}
                </Stack>
            </CardBody>
            <CardFooter>
                <InputGroup>
                    <Input maxLength={255} type="text" fontSize={{ base: "17px", md: "15px" }} onKeyDown={handleKeyPress} onChange={handleChange} value={msg}></Input>
                    <InputRightAddon children={<IoMdSend />} bg="#eee" _dark={{ bg: "#0000" }} _hover={{ bg: "#aaa", _dark: { bg: "#555" } }}
                        onClick={() => {
                            setMsg("");
                            socket.emit("postMessage", { chat: chat_id, msg: msg, user: user_id });
                        }} />
                </InputGroup>

            </CardFooter>
        </Card>
    )
}

export default ChatBox;