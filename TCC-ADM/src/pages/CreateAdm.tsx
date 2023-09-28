import { useState } from "react";
import axios from "axios";
import { Box, Button, Flex, Heading, Input, Select, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import decode from "../components/code/decode";

const CreateAdm = () => {
  const [admToken, setToken] = useState(decode(localStorage.getItem("token")))
  const [adm, setAdm] = useState({
    adm_name: '',
    adm_email: '',
    adm_level: 1,
    password: '',
  });

  const [mensagemErro, setMensagemErro] = useState('');
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    if (name == "adm_level") {
      setAdm({ ...adm, [name]: parseInt(value) });
    }
    else setAdm({ ...adm, [name]: value });
  };

  const handleCadastro = () => {
    axios.post('http://localhost:3344/adm', adm, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then((_res) => {
      setMensagemSucesso('Cadastro de administrador bem-sucedido');

    }).catch((error) => {
      setMensagemErro('Falha no cadastro de administrador');
      console.error(error);
    });
  };
  return (
    <Box w="100%" h="100%">
      <Header adm={admToken} />
      <Flex direction="column" pt="5%" align="center">
        <Heading fontFamily="outfit"> Cadastro de Administrador</Heading>
        {mensagemErro && <Text className="mensagem-erro">{mensagemErro}</Text>}
        {mensagemSucesso && <Text className="mensagem-sucesso">{mensagemSucesso}</Text>}

        <Input type="text" name="adm_name" placeholder="Nome do Administrador" value={adm.adm_name} onChange={handleInputChange} />

        <Input type="email" name="adm_email" placeholder="Email do Administrador" value={adm.adm_email} onChange={handleInputChange} />

        <Select variant="outline" name="adm_level" value={adm.adm_level} onChange={handleInputChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </Select>

        <Input type="password" name="password" placeholder="Senha" value={adm.password} onChange={handleInputChange} />

        <Button onClick={handleCadastro}>Cadastrar </Button>
      </Flex>
    </Box>
  )
}

export default CreateAdm;
