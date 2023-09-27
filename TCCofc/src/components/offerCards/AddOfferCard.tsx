import { Card, CardBody, CardFooter, CardHeader, Heading, IconButton, Image, Spacer} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import colors from "../../colors/colors";
import { FiPlus } from "react-icons/fi";

const CreateOfferCard = () => {
    const navigate = useNavigate();

    return (
        <Card w={{base:"70vw", md:"23vw"}} h={{base:"57vh", md:'59vh'}} onClick={() => {navigate("/create-offer/all")}} boxShadow="lg" align='center' variant="outline" size="sm" _dark={{bg : colors.bgCard_Dark}}> 
            <CardHeader h="20%">
                <Heading as='h3' fontSize={{base:"22px", md:"20px"}} noOfLines={1}>{"Crie uma nova oferta!"}</Heading>
            </CardHeader>
            <Spacer/>
            <CardFooter h="80%" justifyContent="center">
                <IconButton variant="outline" h="80%" w="80%" colorScheme="linkedin" fontSize="5vw" onClick={() => {navigate("/create-offer/all")}} icon={<FiPlus size="100%"/>} aria-label=""></IconButton>
            </CardFooter>
        </Card>
    )
}

export default CreateOfferCard;