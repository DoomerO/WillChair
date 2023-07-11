import { Text, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Button, Container } from "@chakra-ui/react";
import test from "../img/home/imgHomeTop.png";

interface OfferCard {
    img: string,
    title: string,
    condition:string,
    composition: string,
    type: string,
    value: string
}

const CardOffer = ({img, title, condition, composition, type, value}: OfferCard) => {
    return (
        <Card w="23vw" boxShadow="lg" h="fit-content" align='center' variant="outline" size="sm"> 
            <CardHeader>
                <Heading as='h3' fontSize='20px' noOfLines={1}>{title}</Heading>
            </CardHeader>
            <CardBody flexDirection="column" w="100%">
                <Image src={img} objectFit="auto" w="100%" h="20vh"/>
                <Flex direction="column" mt="3%">
                   <Flex direction="row">
                        <Text color="#2D37b8">Condição:</Text>
                        <Text>{condition}</Text>
                   </Flex>
                   <Flex direction="row">
                        <Text color="#2D37b8">Tipo:</Text>
                        <Text>{type}</Text>
                   </Flex>
                   <Flex direction="row">
                        <Text color="#2D37b8">Composição:</Text>
                        <Text>{composition}</Text>
                   </Flex>
                   <Text fontSize="19px" align='center' color="#1963D2" mt="2%">{value}</Text>
                </Flex>
            </CardBody>
            <CardFooter>
                <Button variant="solid" colorScheme="linkedin">Ver mais</Button>
            </CardFooter>
        </Card>
    )
}

export default CardOffer;