import {Box, Flex, Heading, Spacer, Stack, Text, Button, useToast, UseToastOptions, FormLabel, Select} from "@chakra-ui/react";
import Header from "../components/Header";
import { ChangeEvent, useEffect, useState } from "react";
import decode from "../components/code/decode";
import colors from "../colors/colors";
import "../fonts/fonts.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dateDisplayer from "../components/code/dataDisplayer";
import SignAdaptable from "../components/SignAdaptable";

const SetResponsability = () => {
    const [adm, setAdm] = useState(decode(localStorage.getItem("token")));
    const [reports, setReports] = useState([]);
    const toastRender = useToast();
    const [adms, setAdms] = useState([]);
    const [respInfo, setResp] = useState({
        idReport : 0,
        idAdm : 0, 
        renderRep : 0,
        renderAdm : 0
    })

    function toast(title:string, desc:string, time?:number, type?:UseToastOptions["status"], pos?:ToastPosition, close?:boolean){
        toastRender({
            title: title,
            description: desc,
            status: type,
            duration: time,
            position: pos,
            isClosable: close ? close : true
        })
    }

    async function getReports() {
        await axios.get(`http://localhost:3344/denounce`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setReports(res.data);
        }).catch((error) => {
            console.log(error)
        })
    }
    
    async function getAdms() {
        await axios.get(`http://localhost:3344/adm`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setAdms(res.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    async function createResponsability() {
        if (respInfo.idAdm && respInfo.idReport) {
            await axios.put(`http://localhost:3344/adm/responsability/${respInfo.idReport}/${respInfo.idAdm}`, {}, {
                headers : {authorization : "Bearer " + localStorage.getItem("token")}
            }).then((res) => {
                toast("Responsbilidade criada", `Você responsabilizou ${adms[respInfo.renderAdm - 1].adm_name} pela denúncia ${reports[respInfo.renderRep - 1].den_id}`, 3000, "success")
            }).catch((error) => {
                console.log(error)
                if (error.response.status == 406) {
                    toast("Nível Baixo", `Seu nível de administrador é muito baixo para executar essa ação!`, 3000, "error")         
                }
            })
        }
        else {
            toast("Erro detectado", `Devem ser selecionados um administrador e uma denúncia`, 3000, "warning") 
        }
    }

    useEffect(() => {
        getReports();
        getAdms();
    }, [])

    const handleSelects = (e:ChangeEvent<HTMLInputElement>) => {
        let values = e.target.value.split(",");
        setResp(prev => ({...prev, [e.target.name] : parseInt(values[0])}));
        if (e.target.name == "idReport") {
            setResp(prev => ({...prev, renderRep : parseInt(values[1]) + 1}));
        }
        else setResp(prev => ({...prev, renderAdm : parseInt(values[1]) + 1}));
    }

    const renderReportsOpt = reports.map(item => {
        if (item.den_status == "Aberta") {
            return <option value={`${item.den_id},${reports.indexOf(item)}`} key={item.den_id}>{`${item.den_reason}--id:${item.den_id}`}</option>
        }
        return <div key={item.den_id}></div>
    });

    const renderAdms = adms.map(item => {
        return <option value={`${item.adm_id},${adms.indexOf(item)}`} key={item.adm_id}>{`${item.adm_name}--id:${item.adm_id}`}</option>
    });

    return (
        <Box w="100%" h="100%">
            <Header adm={adm}/>
            <Flex w="100%" h="100vh" fontFamily="outfit" direction="row" bg={colors.bgWhite} _dark={{bg : colors.bgWhite_Dark}}>
                <Stack direction="column" pt="8vh" align="center" w="50%" spacing={5} bg={colors.veryLightBlue} _dark={{bg : colors.veryLightBlue_Dark}}>
                    <Heading color={colors.colorFontBlue} fontFamily="outfit" as="h1">Denúncias</Heading>
                    <FormLabel w="80%">
                        Denúncias Abertas:
                        <Select variant="outline" placeholder="Selecione uma denúncia" name="idReport" onChange={handleSelects}>
                            {renderReportsOpt}
                        </Select>
                    </FormLabel>

                    {(respInfo.renderRep) ? <Stack direction="column" w="100%" pl="2%" fontSize="18px" spacing={4}> 
                        <Text>
                            Motivo da denúncia: {reports[respInfo.renderRep - 1].den_reason}
                        </Text>
                        <Text>
                            ID: {reports[respInfo.renderRep - 1].den_id}
                        </Text>
                        <Text>
                            Gravidade da denúncia: {reports[respInfo.renderRep - 1].den_gravity}
                        </Text>
                        <Text textAlign="justify">
                            Descrição da denúncia: {reports[respInfo.renderRep - 1].den_content}
                        </Text>
                        <Text>
                            Data da denúncia: {dateDisplayer(reports[respInfo.renderRep - 1].den_date)}
                        </Text>
                    </Stack>: <SignAdaptable msg="Selecione um denúncia para colocar um administrador como seu responsável." icon={<div></div>} bgType="none"/>}

                </Stack>
                <Stack direction="column" pt="8vh" align="center" w="50%" spacing={5}>
                    <Heading color={colors.colorFontBlue} fontFamily="outfit" as="h1">Administradores</Heading>
                    <FormLabel w="80%">
                        Administradores:
                        <Select variant="outline" name="idAdm" placeholder="Selecione um administrador" onChange={handleSelects}>
                            {renderAdms}
                        </Select>
                    </FormLabel>

                    {(respInfo.renderAdm) ? <Stack direction="column" w="100%" pl="2%" fontSize="18px" spacing={4}> 
                        <Text>
                            Nome do administrador: {adms[respInfo.renderAdm - 1].adm_name}
                        </Text>
                        <Text>
                            ID: {adms[respInfo.renderAdm - 1].adm_id}
                        </Text>
                        <Text>
                            Email do administrador: {adms[respInfo.renderAdm - 1].adm_email}
                        </Text>
                        <Text textAlign="justify">
                            Nível do administrador: {adms[respInfo.renderAdm - 1].adm_level}
                        </Text>
                    </Stack>: <SignAdaptable msg="Selecione um administrador para responsabilizá-lo." icon={<div></div>} bgType="none"/>}
                    <Spacer/>
                    <Flex direction='column' mt="5%" pb="5%" w="100%" align="center" justifyContent="center" h="20%">
                        <Text>Administrador {(respInfo.idAdm) ? "id: " + respInfo.idAdm : "Não selecionado"} / Denúncia {(respInfo.idReport) ? "id: " + respInfo.idReport : "Não selecionado"}</Text>
                        <Button mt="3%" colorScheme="linkedin" onClick={() => {
                             toastRender({
                                position: 'bottom',
                                render: () => (
                                    <Stack bg="orange.500" align="center" direction="column" p="2vh" borderRadius="10px" spacing={2} _dark={{bg : "orange.200"}}>
                                        <Text fontWeight="semibold" color="white" _dark={{color : "black"}} noOfLines={1} fontSize={{base:"22px", md:"20px"}}>Certeza que esse usuário deve ser responsabilizado</Text>
                                        <Stack direction="row">
                                            <Button variant="outline" color="#fff"  _dark={{color : "black"}} _hover={{bg:"#fff2"}} onClick={() => {createResponsability()}}>Sim</Button>
                                            <Button variant="outline" color="#fff" _dark={{color : "black"}}  _hover={{bg:"#fff2"}} onClick={() => {toastRender.closeAll()}}>Não</Button>    
                                        </Stack>
                                    </Stack>
                                )
                            })
                        }}>Resposabilizar</Button>
                    </Flex>
                </Stack>
            </Flex>
        </Box>
    )
}

export default SetResponsability;