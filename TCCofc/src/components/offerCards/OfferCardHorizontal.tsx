import { Text, Card, CardBody, CardFooter, Flex, Heading, Image, Button, Spacer, Stack} from "@chakra-ui/react";
import colors from "../../colors/colors";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

interface HorizontalOfferCard {
    img: string,
    title: string,
    value: string,
    desc: string,
    id: number
}

const OfferCardHorizontal = ({img, title, value, desc, id}: HorizontalOfferCard) => {
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
        <Card w="90%" h={{base:"60vh",md:"40vh"}} variant="filled" size="sm" direction={{base:"column" ,md:"row"}} borderRadius="10px" _dark={{bg : colors.bgCard_Dark}}>
            <Image src={(imgShow) ? imgShow : ""} objectFit="contain" w={{base:"100%" ,md:"22.5%"}} h={{base:"50%", md:"100%"}} borderRadius="15px 0 0 15px"/>
            <Stack w={{base:"100%" ,md:"77.5%"}} h={{base:"50%", md:"100%"}}>
                <CardBody>
                        <Flex direction="column">
                            <Heading as='h3' fontSize={{base:"24px", md:"23px"}} noOfLines={1} color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}}>{title}</Heading>
                            <Text fontSize={{base:"20px", md:"18px"}} noOfLines={{base:4 ,md:8}} mt="2%" textAlign="justify">{desc}</Text>
                        </Flex>
                </CardBody>
                <CardFooter>
                        <Flex w="100%" align="center" direction="row">
                            <Link to={`/offer/${id}`}><Button colorScheme="linkedin" variant="solid" fontSize={{base:"22px", md:"20px"}}>Ver mais</Button></Link>
                            <Spacer />
                            <Text fontSize={{base:"22px", md:"19px"}} align='center' color={colors.colorFontBlue}>{(value) ? "R$" + value : "Doação"}</Text>
                        </Flex>
                </CardFooter>
            </Stack> 
        </Card>
    ) 
}

export default OfferCardHorizontal;