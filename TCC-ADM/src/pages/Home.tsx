import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import decode from "../components/code/decode";
import Header from "../components/Header";
import colors from "../colors/colors";
import ReportCard from "../components/ReportCard";
import ReportCardList from "../components/ReportCardList";
import axios from "axios";
import SignAdaptable from "../components/SignAdaptable";
import { BiSolidHappyAlt } from "react-icons/bi";
import { AdmToken, ReportProps } from "../components/code/interfaces";
import serverUrl from "../components/code/serverUrl";
import Loading from "../components/Loading";

const Home = () => {
    const [adm, setAdm] = useState<AdmToken>({});
    const [reports, setReports] = useState<ReportProps[]>([]);
    const [offerRep, setOfrRep] = useState<ReportProps[]>([]);
    const [userRep, setUserRep] = useState<ReportProps[]>([]);
    const [once, setOnce] = useState(false);
    const[loading, isLoading] = useState(true);

    async function getReports() {
        await axios.get(`${serverUrl}/denounce`, {
            headers: { authorization: "Bearer " + localStorage.getItem("token") }
        }).then((res) => {
            setReports(res.data);
            isLoading(false);
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        const test = localStorage.getItem("token");

        if (test) {
            const token = decode(test);
            setAdm(token)
        }

        getReports();
    }, [])

    useEffect(() => {
        if (reports.length > 0 && !once) {
            const sortReports = reports.sort(function (a, b) {
                if(a.den_gravity && b.den_gravity) return b.den_gravity - a.den_gravity;
                else return 0
            });
            for (const report of sortReports) {
                if (report.den_gravity && report.den_gravity > 1) {
                    if (report.Offer_ofr_id == 0) {
                        setUserRep(prev => ([...prev, report]));
                    }
                    else setOfrRep(prev => ([...prev, report]));
                }
            }
            setOnce(true);
        }
    }, [reports])

    const renderOfferReports = offerRep.map(item => {
        return <ReportCard den_gravity={item.den_gravity ?? 0}
            den_date={item.den_date ?? ""}
            den_content={item.den_content ?? ""}
            den_id={item.den_id ?? 0}
            den_reason={item.den_reason ?? ""}
            den_status={item.den_status ?? ""}
            key={item.den_id ?? 0} />
    })

    const renderUserReports = userRep.map(item => {
        return <ReportCard den_gravity={item.den_gravity ?? 0}
            den_date={item.den_date ?? ""}
            den_content={item.den_content ?? ""}
            den_id={item.den_id ?? 0}
            den_reason={item.den_reason ?? ""}
            den_status={item.den_status ?? ""}
            key={item.den_id ?? 0} />
    })

    return (
        (loading) ? <Loading/> : <Box w="100%" h="100%">
            <Header adm={adm} />
            <Flex direction="row" align="center" w="100%" bg={colors.bgWhite} _dark={{ bg: colors.bgWhite_Dark }}>
                <Stack w="50%" h="100vh" align="center" pt="6vh">
                    <Heading as="h3" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }} mt="3%" mb="3%">Denúncias sobre Ofertas</Heading>
                    {(offerRep.length > 0) ? <ReportCardList component={renderOfferReports} /> : <SignAdaptable msg="Não há denúncias a serem analisadas" icon={<BiSolidHappyAlt size="40%" />} bgType="none" />}
                </Stack>

                <Stack w="50%" h="100vh" pt="6vh" align="center" bg={colors.veryLightBlue} _dark={{ bg: colors.veryLightBlue_Dark }}>
                    <Heading as="h3" color={colors.colorFontDarkBlue} _dark={{ color: colors.colorFontDarkBlue_Dark }} mt="3%" mb="3%">Denúncias sobre Usuários</Heading>
                    {(userRep.length > 0) ? <ReportCardList component={renderUserReports} /> : <SignAdaptable msg="Não há denúncias a serem analisadas" icon={<BiSolidHappyAlt size="40%" />} bgType="none" />}
                </Stack>
            </Flex>
        </Box>
    )
}

export default Home;
