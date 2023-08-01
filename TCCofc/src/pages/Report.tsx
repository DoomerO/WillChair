import { Input } from '@chakra-ui/react'
import Footer from "../components/Footer";
import HeaderToggle from "../components/toggles/HeaderToggle";
import { Box, Flex, Heading, Select, Button, ButtonGroup} from '@chakra-ui/react';



const denounce = () => {

    return (
        <Box w="100%" h="100%">
            <HeaderToggle/>
           < Flex w='100%' h='70vh' bg='#F7F9FC' align='center' >
                <Flex align='left' direction='column' ml={{base: "none", sm: '8%'}} w={{base: "inherit", sm :'50%'}}>
                    <Heading fontFamily="outfit"  color='#2D3748' as='h1' >Denuncia</Heading>
                </Flex>
              
                <Flex w='100%' h='fit-content' bg='#F7F9FC' align='center' direction='column' _dark={{bg:'#484A4D'}} >
                <Select placeholder='motivo da denuncia' color={"blue"} background={"blackAlpha.100"} alignSelf={"center"} borderColor='blue'> 
                    <option value='option1'>Golpe</option>
                    <option value='option2'>Preço abusivo</option>
                    <option value='option3'>usuario fantasma</option>
                    <option value='option4'>outro?</option>
                </Select>
                <br></br>
                <Input placeholder='outro?, qual?'/>
                <br></br>
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

export default denounce;
