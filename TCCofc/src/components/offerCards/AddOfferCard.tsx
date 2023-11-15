import { Container, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi/index";

const CreateOfferCard = () => {
    const navigate = useNavigate();

    return (
        <Container centerContent w="18vw">
            <IconButton variant='link' w="40%" colorScheme="linkedin" fontSize="auto" onClick={() => { navigate("/create-offer/all") }} icon={<FiPlus size="100%" />} aria-label=""></IconButton>
        </Container>
    )
}

export default CreateOfferCard;
