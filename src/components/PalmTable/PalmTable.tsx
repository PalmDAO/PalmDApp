import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./PalmTable.scss";
import { PalmTableData, ColumnData } from "./PalmTableInterface";
import { CellObject } from "./PalmTableInterface";
import PalmProgress from "../PalmProgress/PalmProgress";
import { Box, Typography } from "@mui/material";

interface IPalmTableProps {
    tableData: PalmTableData[];
    columns: ColumnData;
    onRowClicked?: (row: PalmTableData) => void;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },

    [`&.MuiTableRow-hover:hover`]: {
        backgroundColor: "rgba(255, 255, 255, 0.06)",
        cursor: "pointer",
    },

    [`&.MuiTableRow-hover:nth-of-type(even):hover`]: {
        backgroundColor: "rgba(0, 0, 0, 0.40)",
        cursor: "pointer",
    },
}));

export default function PalmTable({ tableData, columns, onRowClicked = () => null }: IPalmTableProps) {
    return (
        <TableContainer sx={{ borderRadius: "0px" }} elevation={0} component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {Object.keys(columns).map(column => (
                            <StyledTableCell>{columns[column]}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map(row => (
                        <StyledTableRow hover onClick={() => onRowClicked(row)}>
                            {Object.keys(columns).map((column, index) =>
                                (row.data[column] as CellObject)?.component === "progress" ? (
                                    <StyledTableCell key={index} component="th" scope="row">
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                            <PalmProgress color="var(--palm-primary)" value={(row.data[column] as CellObject).value} />
                                            <Typography sx={{ width: "40px" }}>{(row.data[column] as CellObject).text}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                            <PalmProgress color="red" value={(row.data[column] as CellObject).valueTwo} />
                                            <Typography sx={{ width: "40px" }}>{(row.data[column] as CellObject).textTwo}</Typography>
                                        </Box>
                                    </StyledTableCell>
                                ) : (
                                    <StyledTableCell key={index} component="th" scope="row">
                                        {row.data[column]}
                                    </StyledTableCell>
                                ),
                            )}
                            {/* <StyledTableCell align="right">{row.calories}</StyledTableCell> */}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
