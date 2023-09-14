import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import decode from "../components/code/decode";
import Header from "../components/Header";
import colors from "../colors/colors";
import ReportCard from "../components/ReportCard";
import ReportCardList from "../components/ReportCardList";
import axios from "axios";

const Home = () => {
    const [adm, setAdm] = useState(decode(localStorage.getItem("token")));
    const [reports, setReports] = useState([]);
    const [offerRep, setOfrRep] = useState([]);
    const [userRep, setUserRep] = useState([]);
    const [once, setOnce] = useState(false);

    async function getReports() {
        await axios.get(`http://localhost:3344/denounce`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setReports(res.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getReports();
    }, [])

    useEffect(() => {
        if(reports.length > 0 && !once) {
            const sortReports = reports.sort(function(a, b) {
                return b.den_gravity - a.den_gravity;
            });
            for (const report of sortReports) {
                if ( report.Offer_ofr_id == 0) {
                    setUserRep(prev => ([...prev, report]));
                }
                else setOfrRep(prev => ([...prev, report]));
            }
            setOnce(true);
        }
    }, [reports])

    const renderOfferReports = offerRep.map(item => {
        return <ReportCard den_gravity={item.den_gravity} 
        den_date={item.den_date} 
        den_content={item.den_content} 
        den_id={item.den_id} 
        den_reason={item.den_reason} 
        den_status={item.den_status}
        key={item.den_id}/>
    })

    const renderUserReports = userRep.map(item => {
        return <ReportCard den_gravity={item.den_gravity} 
        den_date={item.den_date} 
        den_content={item.den_content} 
        den_id={item.den_id} 
        den_reason={item.den_reason} 
        den_status={item.den_status}
        key={item.den_id}/>
    })
    
    return (
        <Box w="100%" h="100%">
            <Header adm={adm}/>
            <Flex direction="row" align="center" w="100%" bg={colors.bgWhite} _dark={{bg : colors.bgWhite_Dark}}>
                <Stack w="50%" h="100vh" align="center" pt="6vh">
                    <Heading as="h3" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}} mt="3%" mb="3%">Denúncias sobre Ofertas</Heading>
                    <ReportCardList component={renderOfferReports}/>
                </Stack>

                <Stack w="50%" h="100vh" pt="6vh" align="center" bg={colors.veryLightBlue} _dark={{bg : colors.veryLightBlue_Dark}}>
                    <Heading as="h3" color={colors.colorFontDarkBlue} _dark={{color : colors.colorFontDarkBlue_Dark}} mt="3%" mb="3%">Denúncias sobre Usuários</Heading>
                    <ReportCardList component={renderUserReports}/>
                </Stack>
            </Flex>
        </Box>
    )
}

export default Home;
