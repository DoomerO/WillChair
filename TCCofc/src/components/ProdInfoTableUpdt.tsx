import {Table, TableContainer, TableCaption, Tbody, Tr, Td, Input} from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";

import axios from "axios";
import colors from "../colors/colors";

interface prodTableProps {
    ofr_id : number,
    update : boolean
}

const ProdInfoTableUpdt = ({ofr_id, update} : prodTableProps) => {
    const [prod, setProd] = useState([]);

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
        const canceltoken = axios.CancelToken.source();
        if (update) {
            updateProduct();
            updateProductChild();
        }
        return () => {
            canceltoken.cancel();
        }
    }, [update])

    const ChildTableInfo = () => {
        switch(prod.prod_type) {
            case "Cadeira de Rodas":
                return <Tbody>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Largura</Td>
                        <Td><Input placeholder={prod.cad_width + "cm"} name="append1" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Largura do Acento</Td>
                        <Td><Input placeholder={prod.cad_widthSeat + "cm"} name="append2" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Tipo de Cadeira</Td>
                        <Td><Input placeholder={prod.cad_type} name="append3" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Peso Máximo</Td>
                        <Td><Input placeholder={prod.cad_maxWeight + "kg"} name="append4" onChange={handleChange}/></Td>
                    </Tr>
                </Tbody>
             case "Bengala":
                return <Tbody>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Altura Miníma</Td>
                        <Td><Input placeholder={prod.ben_maxHeight + "cm"} name="append1" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Altura Máxima</Td>
                        <Td><Input placeholder={prod.ben_minHeight + "cm"} name="append2" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Tipo de Bengala</Td>
                        <Td><Input placeholder={prod.ben_type} name="append3" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Possui regulador</Td>
                        <Td><Input placeholder={prod.ben_regulator} name="append4" onChange={handleChange}/></Td>
                    </Tr>
                </Tbody>
             case "Andador":
                return <Tbody>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Largura</Td>
                        <Td><Input placeholder={prod.and_width + "cm"} name="append1" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Comprimento</Td>
                        <Td><Input placeholder={prod.and_lenght + "cm"} name="append2" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Altura miníma</Td>
                        <Td><Input placeholder={prod.and_minHeight + "cm"} name="append3" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Altura máxima</Td>
                        <Td><Input placeholder={prod.and_maxHeight + "cm"} name="append4" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Possui Regulador</Td>
                        <Td><Input placeholder={prod.and_regulator} name="append5" onChange={handleChange}/></Td>
                    </Tr>
                </Tbody>
             case "Muleta":
                return <Tbody>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Altura Máxima</Td>
                        <Td><Input placeholder={prod.mul_maxHeight + "cm"} name="append1" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Largura Máxima</Td>
                        <Td><Input placeholder={prod.mul_maxWidth + "cm"} name="append2" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Possui regulador</Td>
                        <Td><Input placeholder={prod.mul_regulator} name="append3" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Peso Máximo</Td>
                        <Td><Input placeholder={prod.mul_maxWeight + "kg"} name="append4" onChange={handleChange}/></Td>
                    </Tr>
                </Tbody>
            default:
                return <Tbody/>
        }
    }

    return (
        <TableContainer w="80%">
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
                        <Td fontWeight="bold">Altura</Td>
                        <Td><Input placeholder={prod.prod_height + "m"} name="prod_height" onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Peso</Td>
                        <Td><Input placeholder={prod.prod_weight + "kg"} name="prod_weight" onChange={handleChange}/></Td>
                    </Tr> 
                </Tbody>
                <ChildTableInfo/>
            </Table>
        </TableContainer>
    )
}

export default ProdInfoTableUpdt;