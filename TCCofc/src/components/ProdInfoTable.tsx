import {Table, TableContainer, TableCaption, Tbody, Tr, Td} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import axios from "axios";
import colors from "../colors/colors";

interface prodTableProps {
    ofr_id : number,
}

const ProdInfoTable = ({ofr_id} : prodTableProps) => {
    const [prod, setProd] = useState([]);

    async function queryProduct() {
        await axios.get(`http://localhost:3344/products/offer/${ofr_id}`).then(res => {
            setProd(res.data[0]);
            console.log(prod);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        const canceltoken = axios.CancelToken.source();
        queryProduct();
        return () => {
            canceltoken.cancel();
        }
    }, [ofr_id]);

    const ChildTableInfo = () => {
        switch(prod.prod_type) {
            case "Cadeira de Rodas":
                return <Tbody>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Largura</Td>
                        <Td>{prod.cad_width}cm</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Largura do Acento</Td>
                        <Td>{prod.cad_widthSeat}cm</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Tipo de Cadeira</Td>
                        <Td>{prod.cad_type}</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Peso Máximo</Td>
                        <Td>{prod.cad_maxWeight}kg</Td>
                    </Tr>
                </Tbody>
             case "Bengala":
                return <Tbody>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Altura máxima</Td>
                        <Td>{prod.ben_maxHeight}m</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Altura mínima</Td>
                        <Td>{prod.ben_minHeight}m</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Tipo de Bengala</Td>
                        <Td>{prod.ben_type}</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Possui regulador</Td>
                        <Td>{prod.ben_regulator}</Td>
                    </Tr>
                </Tbody>
             case "Andador":
                return <Tbody>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Largura</Td>
                        <Td>{prod.and_width}m</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Comprimento</Td>
                        <Td>{prod.and_length}m</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Altura Miníma</Td>
                        <Td>{prod.and_minHeight}</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Altura Máxima</Td>
                        <Td>{prod.and_maxHeight}</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Possui regulador</Td>
                        <Td>{prod.and_regulator}</Td>
                    </Tr>
                </Tbody>
             case "Muleta":
                return <Tbody>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Altura Máxima</Td>
                        <Td>{prod.mul_maxHeight}cm</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Altura Miníma</Td>
                        <Td>{prod.mul_minHeigth}cm</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Possui regulador</Td>
                        <Td>{prod.mul_regulator}</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Peso Máximo</Td>
                        <Td>{prod.mul_maxWeight}kg</Td>
                    </Tr>
                </Tbody>
            default:
                return <Tbody/>
        }
    }

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
                        <Td>{prod.prod_status}</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Composição</Td>
                        <Td>{prod.prod_composition}</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow2} _dark={{bg : colors.bgTableRow2_Dark}}>
                        <Td fontWeight="bold">Altura</Td>
                        <Td>{prod.prod_height}m</Td>
                    </Tr>
                    <Tr bg={colors.bgTableRow1} _dark={{bg : colors.bgTableRow1_Dark}}>
                        <Td fontWeight="bold">Peso</Td>
                        <Td>{prod.prod_weight}kg</Td>
                    </Tr> 
                </Tbody>
                <ChildTableInfo/>
            </Table>
        </TableContainer>
    )
}

export default ProdInfoTable;