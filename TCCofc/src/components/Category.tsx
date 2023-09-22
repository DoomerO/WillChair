import { Link } from "react-router-dom";
import {Flex, Container, Text, Box, Image} from '@chakra-ui/react';
import colors from "../colors/colors";
import {reCenter, hoverFocus} from "../components/code/tilt"

//properties to adjust the component
interface catProps {
    icon: string //Using to define the path to an image to represent the category
    name: string //Using to define the name to a Category
    path: string //Caminho de redirecionamento da categoria
}

const Category =({name, icon, path}:catProps) => {

    return (
        <Flex align='center' direction='column' w={{base:"50vw", md: "16vw"}} m={{base: "20px", md: "none"}}>
           <Link to={path}>
            <Box onMouseMove={(e) => {hoverFocus(e, 0.25, 1.1)}} onMouseOut={(e) => {reCenter(e)}} w='fit-content' mb='10px' pos="relative" transition="500ms">
                <Container pointerEvents="none" bg={colors.categoryBg} p={{base:'10px' ,md:'20px'}} borderRadius='15px' boxShadow='lg' _hover={{bg : "#ddd"}} _dark={{bg: colors.categoryBg_Dark}}>
                    <Image src={icon} objectFit='contain' w="12vh" h="14vh"></Image>
                </Container>
            </Box>
            
            <Text align='center' noOfLines={2} fontSize={{base: '19px',md:'20px'}}>
                {name}
            </Text>
    </Link>
       </Flex>
    )
}

export default Category;
