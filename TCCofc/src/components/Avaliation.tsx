import { Avatar, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useState, useEffect } from "react";
import {RiStarSLine, RiStarSFill} from "react-icons/ri"
import colors from "../colors/colors";
import "../fonts/fonts.css";
import { useNavigate } from "react-router-dom";

interface avaliationProps {
    isOpen : boolean,
    setClose : () => void;
    recUserId : number;
    envUserId : number;
    user_name : string;
    user_img : any;
}

const Avaliation = ({isOpen, setClose, recUserId, envUserId, user_name, user_img} : avaliationProps) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [avaliation, setAvaliation] = useState({
    value : 0,
    content : "",
  });
  const [hasAvaliation, setHasAva] = useState([]); 

    async function getAvaliation() {
      await axios.get(`http://localhost:3344/avaliation/both/${recUserId}/${envUserId}`, {headers : {
        authorization :  "Bearer " + localStorage.getItem("token")
      }}).then((res) => {
        setHasAva(res.data[0]);
      }).catch((error) => {
        console.log(error);
      })
    }

    async function postAvaliation() {
      await axios.post("http://localhost:3344/avaliation", {
        ava_value :  avaliation.value,
        ava_content: avaliation.content,
        User_user_idEnv: envUserId, 
        User_user_idRec: recUserId
      }, {headers : {
        authorization : "Bearer " + localStorage.getItem("token")
      }}).then((res) => {
        toast({
          title: 'Avaliação realizada com sucesso',
          description: `Parabens! A avaliação foi enviada com sucesso!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        navigate("/")
      }).catch((error) => {
        toast({
          title: 'Ocorreu um erro!',
          description: "Algo deu errado no envio da avaliação",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        console.log(error)
      });
    }

    async function updateAvaliation() {
      await axios.put(`http://localhost:3344/avaliation/${hasAvaliation.ava_id}`, {
        ava_value :  avaliation.value,
        ava_content: avaliation.content,
      }, {headers : {
        authorization : "Bearer " + localStorage.getItem("token")
      }}).then((res) => {
        toast({
          title: 'Avaliação atualizada com sucesso!',
          description: `Parabens! Você atualizou uma avaliação já existente!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        navigate("/")
      }).catch((error) => {
        toast({
          title: 'Ocorreu um erro!',
          description: "Algo deu errado na atualização da avaliação",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        console.log(error)
      });
    }

    function clearValue (){
      setAvaliation(prev => ({...prev, value : 0}));
    }

    useEffect(() => {
      if(recUserId && envUserId) getAvaliation();
    }, [recUserId, envUserId])

    const handleContentChange = (e:ChangeEvent<HTMLInputElement>) => {
      setAvaliation(prev => ({...prev, content : e.target.value}));
    }

    return (
        <Modal isOpen={isOpen}  onClose={setClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Avaliar {user_name}</ModalHeader>
          <ModalCloseButton onClick={() => {setClose(); clearValue()}}/>
          <ModalBody justifyContent="center" align="center">
            <Avatar name={user_name} src={(user_img) ? user_img : null} size="2xl" mb="3%"></Avatar>
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

            <Stack direction="column" align="center" justifyContent="center" fontFamily="outfit" w="100%" h="20vh">
                <Text>Deixe um comentário sobre a sua avaliação!</Text>
                <Textarea onChange={handleContentChange} w="100%" h="100%" placeholder="Digite aqui (Opcional)" borderColor="gray"/>
            </Stack>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='linkedin' mr={3} onClick={() => {
              (hasAvaliation) ? updateAvaliation() : postAvaliation();
            }}>Enviar</Button>
            <Button variant='ghost' colorScheme="linkedin" onClick={() => {setClose(); clearValue()}}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default Avaliation;