import {Avatar, Box, Divider, Flex, Heading, SimpleGrid, Spacer, Stack, Text} from "@chakra-ui/react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import decode from "../components/code/decode";
import colors from "../colors/colors";
import "../fonts/fonts.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BiSolidRightArrow } from "react-icons/bi";
import dateDisplayer from "../components/code/dataDisplayer";

const ReportPage = () => {
    const {id} = useParams();
    const [adm, setAdm] = useState(decode(localStorage.getItem("token")));
    const [report, setReport] = useState([]);
    const [reportEnv, setReportEnv] = useState([]);
    const [recImg, setRecImg] = useState<any>();
    const [envImg, setEnvImg] = useState<any>();

    const colorsList = [
        "#8E1F96",
        "#3CA500",
        "#F9D400",
        "#E00300",
        "#7C0300"
    ]

    async function getReport() {
        await axios.get(`http://localhost:3344/denounce/id/${id}`, {headers :{
            authorization: "Bearer " + localStorage.getItem("token")
        }}).then((res) => {
            setReport(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function getUserEnv() {
        await axios.get(`http://localhost:3344/users/id/${report.User_user_idEnv}`).then((res) => {
            setReportEnv(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function getRecImg() {
        await axios.get(`/users/profile/photo/${report.user_img}`).then((res) => {
            setRecImg(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    async function getEnvImg() {
        await axios.get(`/users/profile/photo/${reportEnv.user_img}`).then((res) => {
            setEnvImg(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        if (id) getReport();
    }, [id]);

    useEffect(() => {
        if (report.user_img) getRecImg();
        if (report.User_user_idEnv) getUserEnv();
    }, [report])

    useEffect(() => {
        if (reportEnv.user_img) getEnvImg();
    }, [reportEnv])

    return (
        <Box w="100%" h="100%">
            <Header adm={adm}/>
            <Flex w="100%" bg={colors.bgWhite} _dark={{bg : colors.bgWhite_Dark}} pt="8vh" align="center" direction="column">
                <Flex direction="row" align="center" w="100%">
                    <BiSolidRightArrow size="20vh" color={colorsList[report.den_gravity - 1]}/>
                    <Heading as="h1" fontFamily="outfit">
                        {report.den_reason}
                    </Heading>
                    <Spacer/>
                    <Heading as="h1" mr="2vw" fontFamily="outfit">
                        Código(id) : {report.den_id}
                    </Heading>
                </Flex>
                <Divider orientation="horizontal"/>
                <Flex w="100%" direction="row" align="centers">
                    <Stack direction="column" fontFamily="outfit" p="2%" w="50%">
                        <SimpleGrid fontSize="20px" spacing={5}>
                            <Text>
                                Feita em: {(report.den_date) ? dateDisplayer(report.den_date) : ""};
                            </Text>
                            <Text>
                                Gravidade: {report.den_gravity};
                            </Text>
                            <Flex direction="row" align="flex-start">
                                <Text mr="2%">
                                    Descrição: 
                                </Text>
                                <Text fontFamily="atkinson" border="1px solid #000" borderRadius="10px" p="2%" w="80%" h="25vh" _dark={{border : "1px solid #fff"}}>
                                    {report.den_content}
                                </Text>
                            </Flex>
                        </SimpleGrid>
                    </Stack>
                </Flex>
                <Divider orientation="horizontal"/>
                <Flex w="100%" direction="column" align="center">
                    <Heading color={colors.colorFontBlue} as="h4">
                        Feita por
                    </Heading>
                    <Avatar name={reportEnv.user_name} src={(reportEnv.user_img) ? envImg : ""}/>
                    <Text ml="1%">
                        {reportEnv.user_name}, id: {reportEnv.user_id}, email: {reportEnv.user_email};
                    </Text>
                </Flex>

                <Flex w="100%" direction="row" align="center">
                        <Text mr="1%">
                            Alvo : 
                        </Text>
                        <Avatar name={report.user_name} src={(report.user_img) ? recImg : ""}/>
                        <Text ml="1%">
                        {report.user_name}, id: {report.user_id}, email: {report.user_email};
                    </Text>
                </Flex>
            </Flex>
        </Box>
    )
}

export default ReportPage;