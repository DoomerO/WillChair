import { Avatar, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text } from "@chakra-ui/react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../styles/alice-carousel.css';
import { BsGithub, BsLinkedin } from "react-icons/bs";
import colors from "../colors/colors";
import "../fonts/fonts.css";
import { Link } from "react-router-dom";

interface modalProps {
    isOpen: boolean,
    setClose: () => void;
}

const TeamModal = ({ isOpen, setClose }: modalProps) => {

    const slideItems = [
        <Stack direction="column" spacing={5} align="center">
            <Text fontWeight="semibold" fontFamily="outfit" fontSize={{ base: "22px", md: "25px" }} color={colors.colorFontBlue}>João Victor</Text>
            <Link to="https://github.com/DoomerO" target="_blank"><Avatar size="2xl" src="https://avatars.githubusercontent.com/u/109368541?s=400&u=b87292abdf6f528722487f5d49d4a0b3d32734f5&v=4" _hover={{border : `2px solid ${colors.colorFontBlue}`, _dark : {border : "2px solid #fff"}}}/></Link>
            <Text fontWeight="semibold" fontFamily="outfit" fontSize={{ base: "18px", md: "20px" }} noOfLines={2} textAlign="center" w="80%">Programador Backend, Web Designer e Gestor de Projeto</Text>
            <Flex direction="row" align="center" mt="3" w="80%">
                <BsGithub size="10%" />
                <Link to="https://github.com/DoomerO" target="_blank"><Button ml="3%" fontSize={{ base: "20px", md: "18px" }} variant="link" colorScheme="linkedin">DoomerO</Button></Link>
            </Flex>
            <Flex direction="row" align="center" mt="3" w="80%">
                <BsLinkedin size="10%" />
                <Link to="https://www.linkedin.com/in/jo%C3%A3o-victor-r-281950240/" target="_blank"><Button ml="2%" fontSize={{ base: "20px", md: "18px" }} variant="link" colorScheme="linkedin">João Victor (Almeida) Rodrigues</Button></Link>
            </Flex>
        </Stack>,

        <Stack direction="column" spacing={5} align="center">
            <Text fontWeight="semibold" fontFamily="outfit" fontSize={{ base: "22px", md: "25px" }} color={colors.colorFontBlue}>Pedro Henrique</Text>
            <Link to="https://github.com/BrRange" target="_blank"><Avatar size="2xl" src="https://avatars.githubusercontent.com/u/113287175?v=4" _hover={{border : `2px solid ${colors.colorFontBlue}`, _dark : {border : "2px solid #fff"}}}/></Link>
            <Text fontWeight="semibold" fontFamily="outfit" fontSize={{ base: "18px", md: "20px" }} noOfLines={2} textAlign="center" w="80%">Programador Frontend para Usabilidade e Efeitos Gráficos</Text>
            <Flex direction="row" align="center" mt="3" w="80%">
                <BsGithub size="10%" />
                <Link to="https://github.com/BrRange" target="_blank"><Button ml="3%" fontSize={{ base: "20px", md: "18px" }} variant="link" colorScheme="linkedin">BrRange</Button></Link>
            </Flex>
        </Stack>,

        <Stack direction="column" spacing={5} align="center">
            <Text fontWeight="semibold" fontFamily="outfit" fontSize={{ base: "22px", md: "25px" }} color={colors.colorFontBlue}>Gustavo</Text>
            <Link to="https://github.com/Gustav01v" target="_blank"><Avatar size="2xl" src="https://avatars.githubusercontent.com/u/123855261?v=4" _hover={{border : `2px solid ${colors.colorFontBlue}`, _dark : {border : "2px solid #fff"}}}/></Link>
            <Text fontWeight="semibold" fontFamily="outfit" fontSize={{ base: "18px", md: "20px" }} noOfLines={2} textAlign="center" w="80%">Programador Backend e Modelador de Banco de Dados</Text>
            <Flex direction="row" align="center" mt="3" w="80%">
                <BsGithub size="10%" />
                <Link to="https://github.com/Gustav01v" target="_blank"><Button ml="3%" fontSize={{ base: "20px", md: "18px" }} variant="link" colorScheme="linkedin">Gustav01v</Button></Link>
            </Flex>
        </Stack>,

        <Stack direction="column" spacing={5} align="center">
            <Text fontWeight="semibold" fontFamily="outfit" fontSize={{ base: "22px", md: "25px" }} color={colors.colorFontBlue}>Milena</Text>
            <Link to="https://github.com/Mylliee" target="_blank"><Avatar size="2xl" src="https://avatars.githubusercontent.com/u/102260970?v=4" _hover={{border : `2px solid ${colors.colorFontBlue}`, _dark : {border : "2px solid #fff"}}}/></Link>           
            <Text fontWeight="semibold" fontFamily="outfit" fontSize={{ base: "18px", md: "20px" }} noOfLines={2} textAlign="center" w="80%">Programadora Mobile e Editora de Documentação</Text>
            <Flex direction="row" align="center" mt="3" w="80%">
                <BsGithub size="10%" />
                <Link to="https://github.com/Mylliee" target="_blank"><Button ml="3%" fontSize={{ base: "20px", md: "18px" }} variant="link" colorScheme="linkedin">Mylliee</Button></Link>
            </Flex>
        </Stack>,

        <Stack direction="column" spacing={5} align="center">
            <Text fontWeight="semibold" fontFamily="outfit" fontSize={{ base: "22px", md: "25px" }} color={colors.colorFontBlue}>Matheus</Text>
            <Link to="https://github.com/MatheusBarbosa-01" target="_blank"><Avatar size="2xl" src="https://avatars.githubusercontent.com/u/101056776?v=4" _hover={{border : `2px solid ${colors.colorFontBlue}`, _dark : {border : "2px solid #fff"}}} /></Link>
            <Text fontWeight="semibold" fontFamily="outfit" fontSize={{ base: "18px", md: "20px" }} noOfLines={2} textAlign="center" w="80%">Designer Gráfico</Text>
            <Flex direction="row" align="center" mt="3" w="80%">
                <BsGithub size="10%" />
                <Link to="https://github.com/MatheusBarbosa-01" target="_blank"><Button ml="3%" fontSize={{ base: "20px", md: "18px" }} variant="link" colorScheme="linkedin">MatheusBarbosa-01</Button></Link>
            </Flex>
        </Stack>,

        <Stack direction="column" spacing={5} align="center">
            <Text fontWeight="semibold" fontFamily="outfit" fontSize={{ base: "22px", md: "25px" }} color={colors.colorFontBlue}>Davi</Text>
            <Link to="https://github.com/ointerrogacaodv" target="_blank"><Avatar size="2xl" src="https://avatars.githubusercontent.com/u/137410946?v=4" _hover={{border : `2px solid ${colors.colorFontBlue}`, _dark : {border : "2px solid #fff"}}}/></Link>
            <Text fontWeight="semibold" fontFamily="outfit" fontSize={{ base: "18px", md: "20px" }} noOfLines={2} textAlign="center" w="80%">Gestor de Redes Sociais</Text>
            <Flex direction="row" align="center" mt="3" w="80%">
                <BsGithub size="10%" />
                <Link to="https://github.com/ointerrogacaodv" target="_blank"><Button ml="3%" fontSize={{ base: "20px", md: "18px" }} variant="link" colorScheme="linkedin">ointerrogacaodv</Button></Link>
            </Flex>
        </Stack>
    ]

    return (
        <Modal isOpen={isOpen} onClose={setClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontFamily="atkinson">Equipe Willchair</ModalHeader>
                <ModalCloseButton onClick={() => { setClose(); }} />
                <ModalBody justifyContent="center" display="flex" flexDirection="column" alignItems="center">
                    <AliceCarousel mouseTracking items={slideItems} autoPlay infinite
                        autoPlayInterval={4000} autoPlayStrategy='all' disableButtonsControls />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default TeamModal;