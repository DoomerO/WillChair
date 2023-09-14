import {Table, TableContainer, TableCaption, Tbody, Tr, Td, Input, useToast, Stack, Text, Select} from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from "react";

import axios from "axios";
import colors from "../colors/colors";

interface prodTableProps {
    ofr_id : number,
    update : boolean,
    clear: boolean
}

const ProdInfoTableUpdt = ({ofr_id, update, clear} : prodTableProps) => {
    const [prod, setProd] = useState([]);
    const toast = useToast();

    async function queryProduct() {
        await axios.get(`http://localhost:3344/products/offer/${ofr_id}`).then(res => {
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
                        <Text fontFamily="atkinson" color="white" noOfLines={1} fontSize={{base:"22px", md:"20px"}}>Produto atualizado com sucesso!</Text>
                    </Stack>
                )
            })
        }).catch(error => {
            console.log(error);
        })
    }

    async function updateProductChild() {
        console.log(prod.prod_id)
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
                    ben_regulator: parseInt(prodUpdate.append1),
                    ben_minHeight: prodUpdate.append2,
                    ben_maxHeight : prodUpdate.append3,
                    ben_type: prodUpdate.append4,
                    ben_color: prodUpdate.append5
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
                        and_regulator: parseInt(prodUpdate.append1),
                        and_minHeight: prodUpdate.append2,
                        and_maxHeight: prodUpdate.append3,
                        and_width : prodUpdate.append4,
                        and_lenght: prodUpdate.append5
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
                    mul_regulator: parseInt(prodUpdate.append1),
                    mul_minHeight: prodUpdate.append2,
                    mul_maxHeight : prodUpdate.append3,
                    mul_maxWeight: prodUpdate.append4,
                    mul_type : prodUpdate.append5
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
        prod_status : "",
        prod_composition : "",
        prod_height : 0,
        prod_weight: 0,
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

    function clearChanges() {
        setProdUpdate(prev => ({...prev, 
            prod_status : prod.prod_status,
            prod_composition : prod.prod_composition,
            prod_height : prod.prod_height,
            prod_weight: prod.prod_weight,
        }));
        switch (prod.prod_type) {
            case "Cadeira de Rodas":
                setProdUpdate(prev => ({...prev,
                    append1: prod.cad_width,
                    append2: prod.cad_widthSeat,
                    append3: prod.cad_type,
                    append4: prod.cad_maxWeight
                }))
            break;
            case "Bengala":
                setProdUpdate(prev => ({...prev,
                    append1: prod.ben_regulator,
                    append2: prod.ben_minHeight,
                    append3: prod.ben_maxHeight,
                    append4: prod.ben_type,
                    append5: prod.ben_color
                }))
            break;
            case "Andador":
                setProdUpdate(prev => ({...prev,
                    append1: prod.and_regulator,
                    append2: prod.and_minHeight,
                    append3: prod.and_maxHeight,
                    append4: prod.and_width,
                    append5: prod.and_lenght
                }))
            break;
            case "Muleta":
                setProdUpdate(prev => ({...prev,
                    append1: prod.mul_regulator,
                    append2: prod.mul_minHeight,
                    append3: prod.mul_maxHeight,
                    append4: prod.mul_maxWeight,
                    append5: prod.mul_type
                }))
            break;
            default:
                return
        }
    }

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setProdUpdate(prev => ({...prev, [e.target.name]: e.target.value}));
        if(e.target.name == "append1" && prod.prod_type != "Cadeira de Rodas" && parseInt(e.target.value) == 0) {
            setProdUpdate(prev => ({...prev, append2: "0", append3: "0"}));
        }
    }

    useEffect(() => {
        const canceltoken = axios.CancelToken.source();
        if(ofr_id)queryProduct();
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
                    append1: prod.ben_regulator,
                    append2: prod.ben_minHeight,
                    append3: prod.ben_maxHeight,
                    append4: prod.ben_type,
                    append5: prod.ben_color
                }))
                setChildInp(prev => ({...prev,
                    title1: "Possui Regulador",
                    title2: "Altura Miníma(metros)",
                    title3: "Altura Máxima(metros)",
                    title4: "Tipo de Bengala",
                    title5: "Cor"
                }))
            break;
            case "Andador":
                setProdUpdate(prev => ({...prev,
                    append1: prod.and_regulator,
                    append2: prod.and_minHeight,
                    append3: prod.and_maxHeight,
                    append4: prod.and_width,
                    append5: prod.and_lenght
                }))
                setChildInp(prev => ({...prev,
                    title1: "Possui Regulador",
                    title2: "Altura Miníma(metros)",
                    title3: "Altura Máxima(metros)",
                    title4: "Comprimento(centímetros)",
                    title5: "Largura(centímetros)"
                }))
            break;
            case "Muleta":
                setProdUpdate(prev => ({...prev,
                    append1: prod.mul_regulator,
                    append2: prod.mul_minHeight,
                    append3: prod.mul_maxHeight,
                    append4: prod.mul_maxWeight,
                    append5: prod.mul_type,
                }))
                setChildInp(prev => ({...prev,
                    title1: "Possui Regulador",
                    title2: "Altura Miníma(metros)",
                    title3: "Altura Máxima(metros)",
                    title4: "Peso Máximo(quilos)",
                    title5: "Tipo",
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

    useEffect(() => {
        clearChanges();
    }, [clear])

    return (
        <TableContainer w={{base:"100%", md:"80%"}}>
            <Table variant="unstyled">
                <TableCaption>Informações sobre o Equipamento</TableCaption>
                <Tbody>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Tipo de Equipamento</Td>
                        <Td>{prod.prod_type}</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Condição</Td>
                        <Td><Select name='prod_status' onChange={handleChange} value={prodUpdate.prod_status}>
                            <option value='Boa'>Boa</option>
                            <option value='Rasoável'>Rasoável</option>
                            <option value='Ruim'>Ruim</option>                                        
                        </Select></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Composição</Td>
                        <Td><Input placeholder={prodUpdate.prod_composition} name="prod_composition" onChange={handleChange} value={prodUpdate.prod_composition || ""}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Altura{"(metros)"}</Td>
                        <Td><Input placeholder={"" + prodUpdate.prod_height} type="number" name="prod_height" onChange={handleChange} value={prodUpdate.prod_height || ""}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Peso{"(quilos)"}</Td>
                        <Td><Input placeholder={"" + prodUpdate.prod_weight} type="number" name="prod_weight" onChange={handleChange} value={prodUpdate.prod_weight || ""}/></Td>
                    </Tr>

                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}
                    display={(prod.prod_type == "Cadeira de Rodas" || prod.prod_type == "Andador" || prod.prod_type == "Muleta" || prod.prod_type == "Bengala") ? 0 : "none"}>
                        <Td fontWeight="bold">{prodChildInp.title1}</Td>
                        <Td>{(prod.prod_type != "Cadeira de Rodas") ? <Select name='append1' onChange={handleChange} value={prodUpdate.append1}>
                            <option value={0}>Não</option>
                            <option value={1}>Sim</option>                                  
                        </Select> : 
                        <Input placeholder={prodUpdate.append1 || ""} name="append1" onChange={handleChange}/>}
                        </Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}
                    display={(prod.prod_type == "Cadeira de Rodas" || prod.prod_type == "Andador" && parseInt(prodUpdate.append1) == 1|| prod.prod_type == "Muleta" && parseInt(prodUpdate.append1) == 1|| prod.prod_type == "Bengala" && parseInt(prodUpdate.append1) == 1) ? 0 : "none"}>
                        <Td fontWeight="bold">{prodChildInp.title2}</Td>
                        <Td><Input placeholder={prodUpdate.append2} name="append2" value={prodUpdate.append2 || ""} onChange={handleChange}/></Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}
                    display={(prod.prod_type == "Cadeira de Rodas" || prod.prod_type == "Andador" && parseInt(prodUpdate.append1) == 1|| prod.prod_type == "Muleta" && parseInt(prodUpdate.append1) == 1|| prod.prod_type == "Bengala" && parseInt(prodUpdate.append1) == 1) ? 0 : "none"}>
                        <Td fontWeight="bold">{prodChildInp.title3}</Td>
                        <Td>{(prod.prod_type == "Cadeira de Rodas") ?  <Select name='append3' onChange={handleChange} value={prodUpdate.append3}>
                            <option value='Manual'>Cadeira manual simples</option>
                            <option value='Dobrável em X'>Cadeira dobrável em X</option>
                            <option value='Monobloco'>Cadeira monobloco</option>
                            <option value='Motorizada'>Cadeira motorizada</option>
                            <option value='Elevação automática'>Cadeira com elevação automática</option>
                            <option value='Reclinável'>Cadeira de rodas reclinável</option>
                            <option value='Banho'>Cadeira de rodas para banho</option>
                            <option value='Outro'>Outro</option> 
                        </Select> : 
                        <Input placeholder={prodUpdate.append3 || ""} name="append3" value={prodUpdate.append3} onChange={handleChange}/>}</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}
                    display={(prod.prod_type == "Cadeira de Rodas" || prod.prod_type == "Andador" || prod.prod_type == "Muleta" || prod.prod_type == "Bengala") ? 0 : "none"}>
                        <Td fontWeight="bold">{prodChildInp.title4}</Td>
                        <Td>{(prod.prod_type == "Bengala") ? <Select name='append4' onChange={handleChange} value={prodUpdate.append4}>
                            <option value="Simples">Bengala Simples</option>
                            <option value='4 pontas'>Bengala 4 pontas</option>
                            <option value='Tipo T'>Bengala Bastão tipo T</option>
                            <option value='Dobrável'>Bengala Dobrável</option>
                            <option value='Outro'>Outro</option>
                        </Select> : 
                        <Input placeholder={prodUpdate.append4 || ""} name="append4" value={prodUpdate.append4} onChange={handleChange}/>}</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}
                    display={(prod.prod_type == "Andador" || prod.prod_type == "Bengala" || prod.prod_type == "Muleta") ? 0 : "none"}>
                        <Td fontWeight="bold">{prodChildInp.title5}</Td>
                        <Td>{(prod.prod_type == "Muleta") ? <Select name='append5' onChange={handleChange} value={prodUpdate.append5}>
                            <option value='Auxiliares'>Muletas axilares</option>
                            <option value='Canadenses'>{'Muletas de antebraço (ou canadenses)'}</option>
                            <option value='Outro'>Outro</option>
                        </Select> : 
                        <Input placeholder={prodUpdate.append5 || ""} name="append5" value={prodUpdate.append5} onChange={handleChange}/>}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default ProdInfoTableUpdt;