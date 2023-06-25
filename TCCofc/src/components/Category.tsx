import { Link } from "react-router-dom";
import {Flex, Container, Text, Box, Image} from '@chakra-ui/react';
import "../styles/components/Category.css";

//properties to adjust the component
interface catProps {
    icon: string //Using to define the path to an image to represent the category
    name: string //Using to define the name to a Category
}  

const Category =({name, icon}:catProps) => {

    return (
       <Flex align='center' direction='column' w="14vw">
            <Box w='fit-content' mb='10px'>
                <Container bg='#fff' p='20px' borderRadius='15px' boxShadow='lg'  _hover={{bg : "#ddd"}} _dark={{bg: '#444', _hover : {bg: "#123"}}}>
                    <Link to='/login'><Image src={icon} objectFit='contain' w="12vh" h="12svh"></Image></Link>
                </Container>
            </Box>
            
            <Text align='center' noOfLines={1} fontSize='20px'>
                {name}
            </Text>
       </Flex>
    )
}

export default Category;