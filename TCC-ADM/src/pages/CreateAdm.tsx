import { ChangeEvent, useState } from "react";
import axios from "axios";
import { Box, Button, Flex, Heading, Input, Select, Stack, Text, FormLabel, useToast, ToastPosition, UseToastOptions } from "@chakra-ui/react";
import Header from "../components/Header";
import decode from "../components/code/decode";
import colors from "../colors/colors";
import Password from "../components/Password";

const CreateAdm = () => {
  const toast = useToast();
  const [admToken, setToken] = useState(decode(localStorage.getItem("token")))
  const [adm, setAdm] = useState({
    adm_name: '',
    adm_email: '',
    adm_level: 1,
    password: '',
    passwordMissmatch: false
  });

  function callToast(title: string, desc: string, time?: number, type?: UseToastOptions["status"], pos?: ToastPosition, close?: boolean) {
    toast({
      title: title,
      description: desc,
      status: type,
      duration: time,
      position: pos,
      isClosable: close ? close : true
    })
  }

  const handleInputChange = (e: { target: { name: any; value: any }; }) => {
    const { name, value } = e.target;
    if (name == "adm_level") {
      setAdm({ ...adm, [name]: parseInt(value) });
    }
    else setAdm({ ...adm, [name]: value });
  };

  const handleCadastro = () => {
    if (adm.adm_name == "" || adm.adm_email == "" || adm.password == "" || adm.passwordMissmatch) {
      callToast("Campos não preenchidos corretamente!", "É necessário o preenchimento correto de todos os campos para a realização do login!", 3000, "warning", "bottom");
      return 
    }
    axios.post('http://localhost:3344/adm', adm, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then((res) => {
      callToast("Administrador Criado!", "O administrador foi registrado no sistema devidamente!", 3000, "success")
    }).catch((error) => {
      callToast("Erro!", "Ocorreu algum erro no cadastro de administrador.", 3000, "error")
      if (error.response.status == 406) {
        callToast("Nível Baixo", `Seu nível de administrador é muito baixo para executar essa ação!`, 3000, "error")
      }
      console.error(error);
    });
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setAdm(prev => ({ ...prev, password: e.target.value, passwordMissmatch: e.target.validity.patternMismatch }))
  }

  return (
    <Box w="100%" h="100%">
      <Header adm={admToken} />
      <Stack direction="column" align="center" spacing={25} h="100%" w="100%">
        <Heading fontFamily="outfit" mt="12vh" textAlign="center">Cadastro de Administrador</Heading>

        <Stack direction="column" w="70%" spacing={3} borderRadius="10px" bg={colors.veryLightBlue} _dark={{ border: "2px solid #fff3", bg: "#0000" }} p="2%" align="center">
          <FormLabel w="100%">
            Nome do Administrador
            <Input type="text" name="adm_name" value={adm.adm_name} onChange={handleInputChange} />
          </FormLabel>

          <FormLabel w="100%">
            Email do Administrador
            <Input type="email" name="adm_email" value={adm.adm_email} onChange={handleInputChange} />
          </FormLabel>

          <FormLabel w="100%">
            Nível do Administrador
            <Select variant="outline" name="adm_level" value={adm.adm_level} onChange={handleInputChange}>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </Select>
          </FormLabel>

          <FormLabel w="100%">
            Senha do Administrador
            <Password onChange={handlePassword} validity={adm.passwordMissmatch}></Password>
          </FormLabel>

          <Button onClick={handleCadastro} colorScheme="linkedin">Cadastrar </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default CreateAdm;
