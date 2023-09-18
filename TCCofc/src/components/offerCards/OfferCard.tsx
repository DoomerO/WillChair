import { Text, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, Button, Spacer} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import colors from "../../colors/colors";
import axios from "axios";
import { useEffect, useState } from "react";

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
    const navigate = useNavigate();
    const [imgShow, setShow] = useState<any>();

    async function getProdImg() {
        await axios.get(`http://localhost:3344/products/photo/${img}`, {responseType : "arraybuffer"}).then(res => {
            const buffer = new Uint8Array(res.data);
            const blob = new Blob([buffer], { type: res.headers.contentType });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setShow(reader.result);
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        if (img) getProdImg();
    }, [img])

    return (
        <Card w={{base:"70vw", md:"23vw"}} boxShadow="lg" h="fit-content" align='center' variant="outline" size="sm" _dark={{bg : colors.bgCard_Dark}}> 
            <CardHeader>
                <Heading as='h3' fontSize={{base:"24px", md:"20px"}} noOfLines={1}>{title}</Heading>
            </CardHeader>
            <CardBody flexDirection="column" w="100%">
                <Image src={(imgShow) ? imgShow : ""} objectFit="contain" w="100%" h="20vh"/>
                <Flex direction="column" mt="3%">
                   <Flex direction="row">
                        <Text color={colors.colorFontBlue} fontSize={{base:"20px", md:"18px"}}>Condição:</Text>
                        <Spacer/>
                        <Text fontSize={{base:"20px", md:"18px"}}>{condition}</Text>
                   </Flex>
                   <Flex direction="row">
                        <Text color={colors.colorFontBlue} fontSize={{base:"20px", md:"18px"}}>Equipamento:</Text>
                        <Spacer/>
                        <Text fontSize={{base:"20px", md:"18px"}}>{type}</Text>
                   </Flex>
                   <Flex direction="row">
                        <Text color={colors.colorFontBlue} fontSize={{base:"20px", md:"18px"}}>Composição:</Text>
                        <Spacer/>
                        <Text fontSize={{base:"20px", md:"18px"}}>{composition}</Text>
                   </Flex>
                   <Text fontSize={{base:"22px", md:"19px"}} align='center' color={colors.colorFontBlue} mt="2%">{(value) ? "R$" + value : "Doação"}</Text>
                </Flex>
            </CardBody>
            <CardFooter>
                <Button variant="solid" colorScheme="linkedin" fontSize={{base:"22px", md:"20px"}} onClick={() => {navigate(`/offer/${id}`); navigate(0)}}>Ver mais</Button>
            </CardFooter>
        </Card>
    )
}

export default CardOffer;