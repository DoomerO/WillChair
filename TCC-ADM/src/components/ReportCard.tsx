import { Flex, Stack, Box, Spacer, Text, Button } from "@chakra-ui/react";
import dateDisplayer from "./code/dataDisplayer";
import { useNavigate } from "react-router-dom";

interface reportCardprops {
    den_gravity : number,
    den_date : string,
    den_id : number,
    den_reason : string,
    den_content : string,
    den_status : string
}

const ReportCard = ({den_content, den_date, den_reason, den_status, den_id, den_gravity} : reportCardprops) => {
    const colorsList = [
        "#8E1F96",
        "#3CA500",
        "#F9D400",
        "#E00300",
        "#7C0300"
    ]

    const navigate = useNavigate();

    return (
        <Stack spacing={4} w="90%" direction="column" pb="2%" h="25vh" borderBottom="2px dashed #000" _dark={{borderBottom : "2px dashed #fff"}}>
            <Flex direction="row" align="center">
                <Box bg={colorsList[den_gravity - 1]} p="2vh" borderRadius="100%"/>
                <Text fontSize="18px" ml="2%">{den_reason} <b>id: {den_id}</b></Text>
                <Spacer/>
                <Text fontSize="18px"><b>data:</b> {dateDisplayer(den_date)}</Text>
            </Flex>
            <Flex direction="row" h="60%">
                <Text fontSize="15px" ml="2%" textAlign="justify"><b>Descrição:</b> {den_content}</Text>
            </Flex>
            <Flex direction="row" align="center">
                <Text fontSize="18px"><b>Status:</b> {den_status}</Text>
                <Text ml="2%" fontSize="18px" color={colorsList[den_gravity - 1]}><b>Gravidade:</b> {den_gravity}</Text>
                <Spacer/>
                <Button variant="outline" colorScheme="linkedin" onClick={() => {navigate(`/report/${den_id}`)}}>
                    Visualizar
                </Button>
            </Flex>
        </Stack>
    )
}

export default ReportCard;