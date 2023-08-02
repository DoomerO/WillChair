import {Table, TableContainer, TableCaption, Tbody, Tr, Td, Input, useToast, Stack, Text} from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";

import axios from "axios";
import colors from "../colors/colors";

interface prodTableProps {
    ofr_id : number,
    update : boolean
}

const ProdInfoTableUpdt = ({ofr_id, update} : prodTableProps) => {
    const [prod, setProd] = useState([]);
    const toast = useToast();

    async function queryProduct() {
        await axios.get(`http://localhost:3344/products/offer/${ofr_id}`).then(res => {
            console.log(res.data[0])
            setProd(res.data[0]);
        }).catch(error => {
            console.log(error);
        })
    }

    async function updateProduct() {
        await axios.put(`http://localhost:3344/products/${prod.prod_id}`, {
            prod_status : prodUpdate.prod_status,
            prod_composition: prodUpdate.prod_composition,
            prod_height: prodUpdate.prod_height,
            prod_weight: prodUpdate.prod_weight
        },
        {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then((res) => {
            console.log(res);
            toast({
                position: 'bottom',
                render: () => (
                    <Stack bg="green.400" align="center" direction="column" p="2vh" borderRadius="30px" spacing={2}>
                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", sm:"20px"}}>Produto atualizado com sucesso!</Text>
                    </Stack>
                )
            })
        }).catch(error => {
            console.log(error);
        })
    }

    async function updateProductChild() {
        switch(prod.prod_type) {
            case "Cadeira de Rodas":
                await axios.put(`http://localhost:3344/products/cadeira-rodas/${prod.prod_id}`, {
                    cad_width : prodUpdate.append1,
                    cad_widthSeat: prodUpdate.append2,
                    cad_type: prodUpdate.append3,
                    cad_maxWeight: prodUpdate.append4
                },
                {
                    headers : {authorization : "Bearer " + localStorage.getItem("token")}
                }).then((res) => {
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })
            break;
            case "Bengala":
                await axios.put(`http://localhost:3344/products/bengala/${prod.prod_id}`, {
                    ben_maxHeight : prodUpdate.append1,
                    ben_minHeight: prodUpdate.append2,
                    ben_type: prodUpdate.append3,
                    ben_regulator: prodUpdate.append4
                },
                {
                    headers : {authorization : "Bearer " + localStorage.getItem("token")}
                }).then((res) => {
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })
            break;
            case "Andador":
                await axios.put(`http://localhost:3344/products/andador/${prod.prod_id}`, {
                        and_width : prodUpdate.append1,
                        and_lenght: prodUpdate.append2,
                        and_minHeight: prodUpdate.append3,
                        and_maxHeight: prodUpdate.append4,
                        and_regulator: prodUpdate.append5
                    },
                    {
                        headers : {authorization : "Bearer " + localStorage.getItem("token")}
                    }).then((res) => {
                        console.log(res);
                    }).catch(error => {
                        console.log(error);
                    })
            break;
            case "Muleta":
                await axios.put(`http://localhost:3344/products/muleta/${prod.prod_id}`, {
                    mul_maxHeight : prodUpdate.append1,
                    mul_minHeight: prodUpdate.append2,
                    mul_regulator: prodUpdate.append3,
                    mul_maxWeight: prodUpdate.append4
                },
                {
                    headers : {authorization : "Bearer " + localStorage.getItem("token")}
                }).then((res) => {
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })
            break;
            default:
                return
        }
    }

    const [prodUpdate, setProdUpdate] = useState({
        prod_status : prod.prod_status,
        prod_composition : prod.prod_composition,
        prod_height : prod.prod_height,
        prod_weight: prod.prod_weight,
        append1 : "",
        append2 : "",
        append3 : "",
        append4 : "",
        append5 : ""
    });

    const [prodChildInp, setChildInp] = useState({
        title1: "",
        title2: "",
        title3: "",
        title4: "",
        title5: "",
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setProdUpdate(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    useEffect(() => {
        const canceltoken = axios.CancelToken.source();
        queryProduct();
        return () => {
            canceltoken.cancel();
        }
    }, [ofr_id]);

    useEffect(() => {
        setProdUpdate(prev => ({...prev, 
            prod_status : prod.prod_status,
            prod_composition : prod.prod_composition,
            prod_height : prod.prod_height,
            prod_weight: prod.prod_weight,
        }));
    }, [prod])

    useEffect(() => {
        switch (prod.prod_type) {
            case "Cadeira de Rodas":
                setProdUpdate(prev => ({...prev,
                    append1: prod.cad_width,
                    append2: prod.cad_widthSeat,
                    append3: prod.cad_type,
                    append4: prod.cad_maxWeight
                }))
                setChildInp(prev => ({...prev,
                    title1: "Largura(centímetros)",
                    title2: "Largura do Acento(centímetros)",
                    title3: "Tipo de Cadeira",
                    title4: "Peso Máximo(quilos)"
                }))
            break;
            case "Bengala":
                setProdUpdate(prev => ({...prev,
                    append1: prod.ben_maxHeight,
                    append2: prod.ben_minHeight,
                    append3: prod.ben_type,
                    append4: prod.ben_regulator
                }))
                setChildInp(prev => ({...prev,
                    title1: "Altura Miníma(metros)",
                    title2: "Altura Máxima(metros)",
                    title3: "Tipo de Bengala",
                    title4: "Possui Regulador"
                }))
            break;
            case "Andador":
                setProdUpdate(prev => ({...prev,
                    append1: prod.and_width,
                    append2: prod.and_lenght,
                    append3: prod.and_minHeight,
                    append4: prod.and_maxHeight,
                    append5: prod.and_regulator
                }))
                setChildInp(prev => ({...prev,
                    title1: "Largura(centímetros)",
                    title2: "Comprimento(centímetros)",
                    title3: "Altura Miníma(metros)",
                    title4: "Altura Máxima(metros)",
                    title5: "Possui Regulador"
                }))
            break;
            case "Muleta":
                setProdUpdate(prev => ({...prev,
                    append1: prod.mul_maxHeight,
                    append2: prod.mul_minHeight,
                    append3: prod.mul_regulator,
                    append4: prod.mul_maxWeight
                }))
                setChildInp(prev => ({...prev,
                    title1: "Altura Máxima(metros)",
                    title2: "Altura Miníma(metros)",
                    title3: "Possui Regulador",
                    title4: "Peso Máximo(quilos)"
                }))
            break;
            default:
                return
        }
    }, [prod])

    useEffect(() => {
        const canceltoken = axios.CancelToken.source();
        if (update) {
            updateProduct();
            updateProductChild();
        }
        return () => {
            canceltoken.cancel();
        }
    }, [update])

    return (
        <TableContainer w={{base:"100%", sm:"80%"}}>
            <Table variant="unstyled">
                <TableCaption>Informações sobre o Equipamento</TableCaption>
                <Tbody>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Tipo de Equipamento</Td>
                        <Td>{prod.prod_type}</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Condição</Td>
                        <Td><Input placeholder={prod.prod_status} name="prod_status" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Composição</Td>
                        <Td><Input placeholder={prod.prod_composition} name="prod_composition" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Altura{"(metros)"}</Td>
                        <Td><Input placeholder={prod.prod_height} type="number" name="prod_height" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Peso{"(quilos)"}</Td>
                        <Td><Input placeholder={prod.prod_weight} type="number" name="prod_weight" onChange={handleChange}/></Td>
                    </Tr>

                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}
                    display={(prod.prod_type == "Cadeira de Rodas" || prod.prod_type == "Andador" || prod.prod_type == "Muleta" || prod.prod_type == "Bengala") ? 0 : "none"}>
                        <Td fontWeight="bold">{prodChildInp.title1}</Td>
                        <Td><Input placeholder={prodUpdate.append1} name="append1" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}
                    display={(prod.prod_type == "Cadeira de Rodas" || prod.prod_type == "Andador" || prod.prod_type == "Muleta" || prod.prod_type == "Bengala") ? 0 : "none"}>
                        <Td fontWeight="bold">{prodChildInp.title2}</Td>
                        <Td><Input placeholder={prodUpdate.append2} name="append2" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}
                    display={(prod.prod_type == "Cadeira de Rodas" || prod.prod_type == "Andador" || prod.prod_type == "Muleta" || prod.prod_type == "Bengala") ? 0 : "none"}>
                        <Td fontWeight="bold">{prodChildInp.title3}</Td>
                        <Td><Input placeholder={prodUpdate.append3} name="append3" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}
                    display={(prod.prod_type == "Cadeira de Rodas" || prod.prod_type == "Andador" || prod.prod_type == "Muleta" || prod.prod_type == "Bengala") ? 0 : "none"}>
                        <Td fontWeight="bold">{prodChildInp.title4}</Td>
                        <Td><Input placeholder={prodUpdate.append4} name="append4" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}
                    display={(prod.prod_type == "Andador") ? 0 : "none"}>
                        <Td fontWeight="bold">{prodChildInp.title5}</Td>
                        <Td><Input placeholder={prodUpdate.append5} name="append3" onChange={handleChange}/></Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default ProdInfoTableUpdt;