import { useState } from "react";
import axios from "axios";
import { Button, Flex, Heading, Input } from "@chakra-ui/react";


const cadastro = () => {
    const [admin, setAdmin] = useState({
        adm_name: '',
        adm_email: '',
        adm_level: '',
        password: '',
      });
    
      const [mensagemErro, setMensagemErro] = useState('');
      const [mensagemSucesso, setMensagemSucesso] = useState('');
    
      const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setAdmin({ ...admin, [name]: value });
      };
    
      const handleCadastro = () => {
        axios
          .post('http://localhost:3344/adm', admin)
          .then((_res) => {
            setMensagemSucesso('Cadastro de administrador bem-sucedido');
  
          })
          .catch((error) => {
            setMensagemErro('Falha no cadastro de administrador');
            console.error(error);
          });
      };
    return (
        <Flex direction="column">
      <Heading> Cadastro de Administrador</Heading>
      {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}
      {mensagemSucesso && <p className="mensagem-sucesso">{mensagemSucesso}</p>}
      <Input type="text" name="adm_name" placeholder="Nome do Administrador" value={admin.adm_name} onChange={handleInputChange}/>

      <Input type="email" name="adm_email" placeholder="Email do Administrador" value={admin.adm_email} onChange={handleInputChange}/>

      <Input type="text" name="adm_level" placeholder="Nível do Administrador" value={admin.adm_level} onChange={handleInputChange} />

      <Input type="password" name="password" placeholder="Senha" value={admin.password} onChange={handleInputChange}/>

      <Button onClick={handleCadastro}>Cadastrar </Button>
    </Flex>
    )
}

export default cadastro;
