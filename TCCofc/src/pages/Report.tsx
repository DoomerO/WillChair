import { Input } from '@chakra-ui/react';
import {useState, useEffect, ChangeEvent} from "react";
import Footer from "../components/Footer";
import HeaderToggle from "../components/toggles/HeaderToggle";
import { Box, Flex, Heading, Select, Button, ButtonGroup} from '@chakra-ui/react';
import axios from "axios";

const Report = () => {

    const [report, setReport] = useState({
        den_reason: "",
        den_content: "",
        User_user_id: 0,
        Offer_ofr_id: 0
    });

    async function postDenounce() {
        await axios.post(`http://localhost:3344/denounce`, {
            den_reason: report.den_reason,
            den_content: report.den_content,
            User_user_id: report.User_user_id,
            Offer_ofr_id: report.Offer_ofr_id
        }, {headers : {authorization : "Bearer " + localStorage.getItem("token")}}).then((res) => {

        }).catch((error) => {
            console.log(error);
        })
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setReport(prev => ({...prev, [e.target.name] : e.target.value}));
    }

    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>
           < Flex w='100%' h='70vh' bg='#F7F9FC' align='center'>
                <Flex align='left' direction='column' ml={{base: "none", sm: '8%'}} w={{base: "inherit", sm :'50%'}}>
                    <Heading fontFamily="outfit"  color='#2D3748' as='h1' >Denuncia</Heading>
                </Flex>
              
                <Flex w='100%' h='fit-content' bg='#F7F9FC' align='center' direction='column' _dark={{bg:'#484A4D'}} >
                <Select placeholder='motivo da denuncia' color={"blue"} background={"blackAlpha.100"} alignSelf={"center"} borderColor='blue' 
                onChange={handleChange} name="den_reason"> 
                    <option value='option1'>Golpe</option>
                    <option value='option2'>Preço abusivo</option>
                    <option value='option3'>usuario fantasma</option>
                    <option value='option4'>outro?</option>
                </Select>
                
                <Input placeholder='outro?, qual?'/>
                
                <ButtonGroup variant='outline' spacing='6'>
                    <Button colorScheme='blue'>Enviar</Button>
                    <Button>Cancelar</Button>
                </ButtonGroup>

                </Flex>
            </Flex>
            <Footer/>
        </Box> 
    )
}

export default Report;
