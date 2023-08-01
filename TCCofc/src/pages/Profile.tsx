import Footer from "../components/Footer";
import { useState,useEffect } from "react"
import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import HeaderToggle from '../components/toggles/HeaderToggle';
import { useParams } from "react-router-dom";
import axios from "axios";

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
      <Footer/>
    </Box>
  )
    
}

export default Profile;
