import Footer from "../../components/Footer";
import { useState,useEffect } from "react"
import HeaderToggle from '../../components/toggles/HeaderToggle';
import axios from "axios";
import { Box, Flex, Spacer, Heading, Button, Stack, FormLabel, Wrap, Avatar } from '@chakra-ui/react'
import "../../fonts/fonts.css"


interface ProfileProps{
  user: object
}

const Profile = ({user} : ProfileProps) => {

  return (
    <Box w="100%" h="100%">
      <HeaderToggle/>
        <Flex direction="row">
        </Flex>      
      <Footer/>
    </Box>
  )
}

export default Profile
