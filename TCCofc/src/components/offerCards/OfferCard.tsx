import { Text, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Button} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import colors from "../../colors/colors";

interface OfferCard {
    img: string,
    title: string,
    condition:string,
    composition: string,
    type: string,
    value: string,
    id: number
}

const CardOffer = ({img, title, condition, composition, type, value, id}: OfferCard) => {
    return (
        <Card w={{base:"70vw", sm:"23vw"}} boxShadow="lg" h="fit-content" align='center' variant="outline" size="sm"> 
            <CardHeader>
                <Heading as='h3' fontSize={{base:"24px", sm:"20px"}} noOfLines={1}>{title}</Heading>
            </CardHeader>
            <CardBody flexDirection="column" w="100%">
                <Image src={img} objectFit="auto" w="100%" h="20vh"/>
                <Flex direction="column" mt="3%">
                   <Flex direction="row">
                        <Text color={colors.colorFontBlue} fontSize={{base:"20px", sm:"18px"}}>Condição:</Text>
                        <Text fontSize={{base:"20px", sm:"18px"}}>{condition}</Text>
                   </Flex>
                   <Flex direction="row">
                        <Text color={colors.colorFontBlue} fontSize={{base:"20px", sm:"18px"}}>Tipo:</Text>
                        <Text fontSize={{base:"20px", sm:"18px"}}>{type}</Text>
                   </Flex>
                   <Flex direction="row">
                        <Text color={colors.colorFontBlue} fontSize={{base:"20px", sm:"18px"}}>Composição:</Text>
                        <Text fontSize={{base:"20px", sm:"18px"}}>{composition}</Text>
                   </Flex>
                   <Text fontSize={{base:"22px", sm:"19px"}} align='center' color={colors.colorFontBlue} mt="2%">{(value) ? "R$" + value : "Doação"}</Text>
                </Flex>
            </CardBody>
            <CardFooter>
                <Link to={`/offer/${id}`}><Button variant="solid" colorScheme="linkedin" fontSize={{base:"22px", sm:"20px"}}>Ver mais</Button></Link>
            </CardFooter>
        </Card>
    )
}

export default CardOffer;