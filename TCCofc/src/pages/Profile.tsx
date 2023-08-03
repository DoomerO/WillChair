import Footer from "../components/Footer";
import { useState,useEffect } from "react"
import { Box, Flex} from '@chakra-ui/react';
import HeaderToggle from '../components/toggles/HeaderToggle';
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardBody, Text, CardHeader, Heading, CardFooter, Button } from '@chakra-ui/react'
import { Avatar, Wrap, WrapItem } from '@chakra-ui/react'
import "../fonts/fonts.css"

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
    <Box w="100%" h="100%">
      <HeaderToggle/>
      <Flex h="120vh">
      
        <Card align='center' bgColor="#DFDFDF" h="70vh" w="60vw" margin="15vh 0 0 20vw" fontFamily="atkinson">
          <CardHeader>
            <Heading size='md'>Perfil do Usuário</Heading>
          </CardHeader>
          <CardBody>
            <Wrap>
              <WrapItem margin="0 0 0 3vw">
                <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' w="5vw" h="10vh"/>
              </WrapItem>  
            </Wrap>
            <Text>Julio da Silva Santos</Text>
          </CardBody>
          <CardFooter>
            <Button colorScheme='blue'>View here</Button>
          </CardFooter>
        </Card>

      </Flex>
      <Footer/>
    </Box>
  )
}

export default Profile
