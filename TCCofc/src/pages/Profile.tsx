import Footer from "../components/Footer";
import { useState,useEffect } from "react"
import { Box, Flex, Spacer} from '@chakra-ui/react';
import HeaderToggle from '../components/toggles/HeaderToggle';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardBody, Text, CardHeader, Heading, CardFooter, Button } from '@chakra-ui/react'
import "../fonts/fonts.css"
import { Input, Radio, RadioGroup, Stack, FormControl, FormLabel, WrapItem, Avatar } from '@chakra-ui/react'


const Profile = () => {
  const {email} = useParams();
  const [userQuery, setUser] = useState([]);

  async function getUser() {
    await axios.get(`http://localhost:3344/users/profile/${email}`).then((res) => {
      setUser(res.data);
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <Box w="100%" h="100%" fontFamily="atkinson">
      <HeaderToggle/>
      <Flex h="120vh">     
        <Card bgColor="#EDEDED" h="80vh" w="60vw" margin="15vh 0 0 20vw">


          <CardHeader display="flex" flexDirection="row" justifyContent="start" alignItems="center" w="100%" h="auto">
          <Flex float="left" w="50% " h="auto"><Heading size='md'>Meu Cadastro</Heading></Flex>
            <Flex float="right" w="50% " h="auto" alignItems="center" justifyContent="flex-end"><Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' /></Flex>
          </CardHeader>
          <h3>Configure o seu cadastro</h3>
          <CardBody>
            <Text>Dados da conta</Text>
            <Input bgColor="#D9D9D9" placeholder='Seu nome'/>
            <Spacer/>

            <FormControl marginTop="3vh">
              <FormLabel>E-mail</FormLabel>
              <Input bgColor="#D9D9D9" type='e-mail' placeholder="Seu e-mail"/>
            </FormControl>
            <Spacer/>
            
            <FormLabel marginTop="3vh">Gênero</FormLabel>
            <RadioGroup bgColor="#D9D9D9" padding="1.4vh" borderRadius="5px" defaultValue='2' >
              <Stack spacing={5} direction='row'>
                <Radio colorScheme='blue' value='1'>
                  Feminino
                </Radio>
                <Radio colorScheme='blue' value='2'>
                  Masculino
                </Radio>
                <Radio colorScheme='blue' value='3'>
                  Outro
                </Radio>
                <Radio colorScheme='blue' value='4'>
                  Não informar
                </Radio>
              </Stack>
            </RadioGroup>
            <Spacer/>

            <Flex display="flex" flexDirection="row" justifyContent="start" alignItems="center" marginTop="3vh">
              <Text>Tipo de conta:</Text>
              <Input placeholder="Particular" w="8vw" h="4vh"/>
            </Flex>

          </CardBody>
          <CardFooter>
            <Button colorScheme='blue'>Salvar alterações</Button>
          </CardFooter>
        </Card>

      </Flex>
      <Footer/>
    </Box>
  )
}

export default Profile
