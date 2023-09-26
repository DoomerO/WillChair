import { Link, useNavigate } from "react-router-dom";
import { Flex, Text, Spacer, Image, Input, IconButton, HStack, Button, useColorMode, useColorModeValue, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure, Heading, Divider, Stack, textDecoration, FormLabel } from '@chakra-ui/react';
import {MdAdminPanelSettings} from "react-icons/md";
import "../fonts/fonts.css";
import { FiSun, FiMoon } from "react-icons/fi";
import {MdOutlineReportOff} from "react-icons/md";
//imagens
import logo from '../img/logoDark.png';
import logoLight from '../img/logo.png';
import colors from "../colors/colors";

import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import ReportCard from "./ReportCard";
import ReportCardList from "./ReportCardList";
import SignAdaptable from "./SignAdaptable";

interface headerProps {
    adm : object;
}

const Header = ({adm}: headerProps) => {
    const {toggleColorMode} = useColorMode();
    const logoImg = useColorModeValue(logo, logoLight) //muda o valor do logo a partir do modo de cor que estiver ativo
    const colorMode = useColorModeValue("Modo claro", "Modo escuro");
    const navigate = useNavigate();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [reports, setReports] = useState([]);
    const [repId, setRepId] = useState<string>();

    async function getReports() {
        await axios.get(`http://localhost:3344/denounce/adm/${adm.email}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            setReports(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getReports();
    }, [adm])

    const renderReports = reports.map(item => {
        if (!repId) {
            return <ReportCard den_gravity={item.den_gravity} 
            den_date={item.den_date} 
            den_content={item.den_content} 
            den_id={item.den_id} 
            den_reason={item.den_reason} 
            den_status={item.den_status}
            key={item.den_id}/>
        }
        else {
            if (item.den_id.toString().match(repId)) {
                return <ReportCard den_gravity={item.den_gravity} 
                den_date={item.den_date} 
                den_content={item.den_content} 
                den_id={item.den_id} 
                den_reason={item.den_reason} 
                den_status={item.den_status}
                key={item.den_id}/>
            }
            else return <div key={item.den_id}></div>
        }
    })

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setRepId(e.target.value);
    }

    return (
        <Flex w="100%" h="8.5vh" bg='#fff' position='fixed' _dark={{bg : '#131313'}} boxShadow='lg' zIndex={2}>
            <Image src={logoImg} objectFit='contain' onClick={() => {navigate("/")}} w={{base:"45%", md:"12%"}} h='66%' mt='2.5'></Image>
            <Spacer />
            <HStack w='60%' display={{base: 'none', md:'inherit'}}>
                <Button variant='link' colorScheme="#000">
                    <Link to="/"><b>Denúncias Previstas</b></Link>
                </Button>
                <Spacer/>
                <Button variant='link' colorScheme="#000">
                    <Link to="/other"><b>Denúncias Adversas</b></Link>
                </Button>
                <Spacer />
                <Button variant='link' colorScheme="#000">
                    <Link to="/adm-create"><b>Criar Administrador</b></Link>
                </Button>
                <Spacer/>
                <Button variant='link' colorScheme="#000">
                    <Link to="/responsability"><b>Responsabilizar</b></Link>
                </Button>
                <Spacer/>
                <Button variant='link' colorScheme="#000">
                    <Link to="/adm-update"><b>Atualizar</b></Link>
                </Button>
            </HStack>
            <Spacer/>
            <Spacer/>
            <HStack spacing={2}>
                <Button variant="link" color={colors.colorFontBlue} fontSize="17px" fontFamily="atkinson" fontWeight="normal" onClick={onOpen}>{adm.name}</Button><MdAdminPanelSettings size="6vh" onClick={onOpen}/>
            </HStack>

            <Drawer onClose={onClose} isOpen={isOpen} size={{base:"full", md:"md"}}>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader _dark={{bg : colors.bgDrawer_Dark}}>
                    <Flex direction="row" align="center">
                        <IconButton onClick={toggleColorMode} aria-label='switch lighting mode'
                        icon={localStorage.getItem("chakra-ui-color-mode") == 'light' ? <FiSun/> : <FiMoon/>}></IconButton>
                        <Text ml="2%">{colorMode}</Text>
                    </Flex>
                </DrawerHeader>
                <DrawerBody _dark={{bg : colors.bgDrawer_Dark}}>
                    <Divider orientation="horizontal"/>
                    <Stack direction="column" pl="2%" mt="2%" mb="2%" fontFamily="atkinson" fontSize="20px">
                        <Text>
                            <b>Nome :</b> {adm.name}
                        </Text>
                        <Text>
                            <b>Email :</b> {adm.email}
                        </Text>
                        <Text>
                            <b>Nível :</b> {adm.level}
                        </Text>
                    </Stack>
                    <Divider orientation="horizontal"/>
                    <Text textAlign="center" fontFamily="outfit" fontSize="24px" color={colors.colorFontBlue} fontWeight="semibold">
                        Denúncias de sua responsabilidade
                    </Text>
                    {(reports.length > 0) ?<Flex w="100%" h="fit-content" mt="1%" mb="1%">
                        <FormLabel> Id da denúncia: <Input type="number" onChange={handleSearch}>
                        </Input></FormLabel>
                    </Flex> : null}
                    {(reports.length > 0) ? <Flex w="100%" h="50%">
                        <ReportCardList height="50vh" component={renderReports}/>
                    </Flex> : <SignAdaptable msg="Não há nenhuma denúncia para você resolver!" icon={<MdOutlineReportOff size="40%"/>} bgType="none" height="60%"/>} 
                    
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}

export default Header;