import { Link } from "react-router-dom";
import {Flex, Container, Text, Box, Image} from '@chakra-ui/react';
import colors from "../colors/colors";
import { useState } from "react";

//properties to adjust the component
interface catProps {
    icon: string //Using to define the path to an image to represent the category
    name: string //Using to define the name to a Category
    path: string //Caminho de redirecionamento da categoria
}

const Category =({name, icon, path}:catProps) => {

    const [mov, setMov] = useState([0, 0])

function tilt(node:any){
    node.style.transition = "500ms"
    node.style.transform = `rotateX(${mov[1] * 0.8}deg)`
    node.style.transform += `rotateY(${-mov[0] * 0.8}deg)`
}
function reCenter(node:any){
    node.style.transform = ""
    node.style.transition = "1s"
}

    return (
        <Flex align='center' direction='column' w={{base:"50vw", md: "16vw"}} m={{base: "20px", md: "none"}}>
           <Link to={path}>
            <Box onMouseMove={(e) => {setMov([mov[0] + e.movementX, mov[1] + e.movementY]);tilt(e.target)}} onMouseOut={(e) => {setMov([0, 0]);reCenter(e.target)}} w='fit-content' mb='10px' pos="relative" transition="500ms">
                <Container pointerEvents="none" bg={colors.categoryBg} p={{base:'10px' ,md:'20px'}} borderRadius='15px' boxShadow='lg' _hover={{bg : "#ddd"}} _dark={{bg: colors.categoryBg_Dark, _hover : {bg: "#123"}}}>
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
