import { Text, Card, CardBody, CardFooter, Flex, Heading, Image, Button, Spacer, Stack} from "@chakra-ui/react";
import colors from "../../colors/colors";
import { Link } from "react-router-dom";

interface HorizontalOfferCard {
    img: string,
    title: string,
    value: string,
    desc: string,
    id: number
}

const OfferCardHorizontal = ({img, title, value, desc, id}: HorizontalOfferCard) => {
    return (
        <Card w="90%" h={{base:"60vh",sm:"40vh"}} variant="filled" size="sm" direction={{base:"column" ,sm:"row"}}>
            <Image src={img} objectFit="auto" w={{base:"100%" ,sm:"22.5%"}} h={{base:"50%", sm:"100%"}}/>
            <Stack w={{base:"100%" ,sm:"77.5%"}} h={{base:"50%", sm:"100%"}}>
                <CardBody>
                        <Flex direction="column">
                            <Heading as='h3' fontSize={{base:"24px", sm:"23px"}} noOfLines={1} color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{title}</Heading>
                            <Text fontSize={{base:"20px", sm:"18px"}} noOfLines={{base:4 ,sm:8}} mt="2%" textAlign="justify">{desc}</Text>
                        </Flex>
                </CardBody>
                <CardFooter>
                        <Flex w="100%" align="center" direction="row">
                            <Link to={`/offer/${id}`}><Button colorScheme="linkedin" variant="solid" fontSize={{base:"22px", sm:"20px"}}>Ver mais</Button></Link>
                            <Spacer />
                            <Text fontSize={{base:"22px", sm:"19px"}} align='center' color={colors.colorFontBlue}>{(value) ? "R$" + value : "Doação"}</Text>
                        </Flex>
                </CardFooter>
            </Stack> 
        </Card>
    ) 
}

export default OfferCardHorizontal;