import { useState,useEffect } from "react"
import { Box, Flex, Spacer, Heading, Stack, Text, Avatar, SimpleGrid } from '@chakra-ui/react'
import SignNotFound from "../../components/signs/SignNotFound";
import CommentList from "../../components/comments/CommentList";
import HeaderToggle from '../../components/toggles/HeaderToggle';
import Footer from "../../components/Footer";
import Comment from "../../components/comments/Comment";
import OfferList from "../../components/offerCards/OfferList";
import CardOffer from "../../components/offerCards/OfferCard";
import colors from "../../colors/colors";
import "../../fonts/fonts.css"
import axios from "axios";

import { BsFillStarFill } from "react-icons/bs";
import {TbMoodSilence} from "react-icons/tb";

interface ProfileProps{
  user: object
}

const Profile = ({user} : ProfileProps) => {

  const [comments, setComments] = useState([]);
  const [userOffers, setUserOffers] = useState([]);

  async function getComments() {
    await axios.get(`http://localhost:3344/comment/receiver/${user.user_id}`).then((res) => {
      setComments(res.data);
    }).catch((error) => {
      console.log(error);
    })
  };

  async function getOffers() {
    await axios.get(`http://localhost:3344/offers/user/${user.user_email}`).then((res) => {
      setUserOffers(res.data);
    }).catch((error) => {
      console.log(error);
    })
  };

  useEffect(() => {
    if(user.user_id) getComments();
    if(user.user_email)getOffers();
  }, [user]);

  const renderUserOffers = userOffers.map(item => { //lista de ofertas do usuário renderizadas
    return <CardOffer 
    title={item.ofr_name} 
    composition={item.prod_composition} 
    condition={item.prod_status} 
    img={(item.prod_img) ? String.fromCharCode(...new Uint8Array(item.prod_img.data)) : ""} 
    value={item.ofr_value} 
    type={item.prod_type}
    key={item.ofr_id}
    id={item.ofr_id}/>
  });

  const renderComments = comments.map(item => {
    return <Comment 
      userId={item.User_user_idEnv}
      content={item.com_content}
      date={item.com_date}
      key={item.com_id}
    />
  }) 

  return (
    <Box w="100%" h="100%">
      <HeaderToggle/>
        <Flex direction="column" align="center" w="100%" bg={colors.bgWhite} h="fit-content" pt={{base:"9vh", sm:"4.6%"}} _dark={{bg : colors.bgWhite_Dark}}>
          <Flex direction={{base:"column", sm:"row"}} w="90%" h="fit-content" pb="5vh" align={{base:"center", sm:"normal"}}>
              <Avatar src="" name={user.user_name} size="2xl" w="30vh" h="30vh"/>
              <Spacer/>
              <Stack w={{base:"95%", sm:"80%"}}>

                <Flex direction="row" align="center">
                  <Heading as="h1" fontSize={{base: "36px", sm: "30px"}} color={colors.colorFontDarkBlue} _dark={{color: colors.colorFontDarkBlue_Dark}}>{user.user_name}</Heading>
                  <Spacer/>
                  <Text fontFamily="atkinson" fontSize={{base: "36px", sm: "30px"}} color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{(user.user_nota) ? user.user_nota : 0.0}</Text>
                  <BsFillStarFill fill={colors.colorFontBlue} size="3vh"/>
                </Flex>

                <SimpleGrid spacing={3} fontSize={{base:"20px", sm:"20px"}}>
                    <Flex direction="row">
                      <Text fontFamily="atkinson" mr="5px">Email:</Text>
                      <Text fontFamily="atkinson" color={colors.colorFontBlue}>{user.user_email}</Text>
                    </Flex>
                    <Flex direction="row">
                      <Text fontFamily="atkinson" mr="5px">Telefone:</Text>
                      <Text fontFamily="atkinson" color={colors.colorFontBlue}>{user.user_phone}</Text>
                    </Flex>
                    <Flex direction="row">
                      <Text fontFamily="atkinson" mr="5px">Cidade:</Text>
                      <Text fontFamily="atkinson" color={colors.colorFontBlue}>{user.user_city}</Text>
                    </Flex>
                    <Flex direction="row">
                      <Text fontFamily="atkinson" mr="5px">Endereço:</Text>
                      <Text fontFamily="atkinson" color={colors.colorFontBlue}>{(user.user_CEP || user.user_street || user.user_district || user.user_houseNum) ? user.user_street + ", " + user.user_houseNum + " " + user.user_comp + ", " + user.user_district + ". " + user.user_CEP : "Endereço não disponibilizado."}</Text>
                    </Flex>
                </SimpleGrid>
              </Stack>
          </Flex>
        </Flex>

        <Flex bg={colors.veryLightBlue} h="fit-content" direction="column" align="center" pb="5vh" _dark={{bg : colors.veryLightBlue_Dark}}>
          <Heading as="h1" mt="3%" fontSize={{base: "34px", sm: "30px"}} textAlign="center" color={colors.colorFontDarkBlue} mb="2%" _dark={{color: colors.colorFontDarkBlue_Dark}}>Comentários sobre {user.user_name}</Heading>
          {(comments.length > 0) ? <CommentList component={renderComments}/> : <SignNotFound msg={`As coisas estão meio quietas por aqui...Não há comentários sobre ${user.user_name}`} icon={<TbMoodSilence size="45%"/>}/>}
        </Flex>

        <Flex bg={colors.bgWhite} h="fit-content" direction="column" align="center" pb="5vh" _dark={{bg : colors.bgWhite_Dark}}>
          <Heading as="h1" mt="3%" fontSize={{base: "34px", sm: "30px"}} textAlign="center" color={colors.colorFontDarkBlue} mb="2%" _dark={{color: colors.colorFontDarkBlue_Dark}}>Ofertas de {user.user_name}</Heading>
          {(userOffers.length > 0) ? <OfferList component={renderUserOffers}/> : <SignNotFound msg={`Parece que ${user.user_name} não possui nenhuma oferta...`} icon={<TbMoodSilence size="45%"/>}/>}
        </Flex> 
      <Footer/>
    </Box>
  )
}

export default Profile
