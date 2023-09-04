import { Button, Container, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import {RiStarSLine, RiStarSFill} from "react-icons/ri"
import colors from "../colors/colors";
import "../fonts/fonts.css";

interface avaliationProps {
    isOpen : boolean,
    setClose : () => void;
}

const Avaliation = ({isOpen, setClose} : avaliationProps) => {
    const [avaliation, setAvaliation] = useState({
        value : 0,
        content : "",
    });

    function clearValue (){
        setAvaliation(prev => ({...prev, value : 0}));
    }

    return (
        <Modal isOpen={isOpen}  onClose={setClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Avaliação</ModalHeader>
          <ModalCloseButton onClick={() => {setClose(); clearValue()}}/>
          <ModalBody>
            <Stack spacing={5} direction="row" align="center" justifyContent="center" mb="3%">
                {(avaliation.value >= 1) ? 
                <RiStarSFill color={colors.colorFontBlue} size="7%" onClick={() => {setAvaliation(prev => ({...prev, value : 1}));}}/> : 
                <RiStarSLine size="7%" onClick={() => {setAvaliation(prev => ({...prev, value : 1}));}}/>};
                {(avaliation.value >= 2) ? 
                <RiStarSFill color={colors.colorFontBlue} size="7%" onClick={() => {setAvaliation(prev => ({...prev, value : 2}));}}/> : 
                <RiStarSLine size="7%" onClick={() => {setAvaliation(prev => ({...prev, value : 2}));}}/>};
                {(avaliation.value >= 3) ? 
                <RiStarSFill color={colors.colorFontBlue} size="7%" onClick={() => {setAvaliation(prev => ({...prev, value : 3}));}}/> : 
                <RiStarSLine size="7%" onClick={() => {setAvaliation(prev => ({...prev, value : 3}));}}/>};
                {(avaliation.value >= 4) ? 
                <RiStarSFill color={colors.colorFontBlue} size="7%" onClick={() => {setAvaliation(prev => ({...prev, value : 4}));}}/> : 
                <RiStarSLine size="7%" onClick={() => {setAvaliation(prev => ({...prev, value : 4}));}}/>};
                {(avaliation.value >= 5) ? 
                <RiStarSFill color={colors.colorFontBlue} size="7%" onClick={() => {setAvaliation(prev => ({...prev, value : 5}));}}/> : 
                <RiStarSLine size="7%" onClick={() => {setAvaliation(prev => ({...prev, value : 5}));}}/>};
            </Stack>

            <Stack direction="column" align="center" justifyContent="center" w="100%" h="20vh">
                <Text>Deixe um comentário sobre a sua avaliação!</Text>
                <Textarea w="100%" h="100%" placeholder="Digite aqui (Opcional)" borderColor="gray"/>
            </Stack>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='linkedin' mr={3}>Enviar</Button>
            <Button variant='ghost' colorScheme="linkedin" onClick={() => {setClose(); clearValue()}}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default Avaliation;