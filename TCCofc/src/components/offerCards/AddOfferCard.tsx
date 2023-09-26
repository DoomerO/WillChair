import { Card, CardBody, CardFooter, CardHeader, Heading, IconButton, Image} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import colors from "../../colors/colors";
import { FiPlus } from "react-icons/fi";

const CreateOfferCard = () => {
    const navigate = useNavigate();

    return (
        <Card w={{base:"70vw", md:"23vw"}} boxShadow="lg" h="23vh" align='center' variant="outline" size="sm" _dark={{bg : colors.bgCard_Dark}}> 
            <CardHeader>
                <Heading as='h3' fontSize={{base:"24px", md:"20px"}} noOfLines={1}>{"Crie uma oferta"}</Heading>
            </CardHeader>
            <CardFooter>
                <IconButton variant="solid" h="5vw" w="5vw" colorScheme="linkedin" fontSize="5vw" onClick={() => {navigate("/create-offer/all")}} icon={<FiPlus/>} aria-label=""></IconButton>
            </CardFooter>
        </Card>
    )
}

export default CreateOfferCard;