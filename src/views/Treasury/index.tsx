import { Stack, Typography, Box, Divider, Pagination } from "@mui/material";
import * as React from "react";
import PalmCard from "../../components/PalmCard/PalmCard";
import PalmTable from "../../components/PalmTable/PalmTable";
import { makeStyles } from "@material-ui/core/styles";
import { ColumnData, PalmTableData } from "src/components/PalmTable/PalmTableInterface";
import "./Treasury.scss";
import { getTransactions } from "./Treasury.service";
import { useAsync } from "react-async-hook";

function Treasury() {
    const useStyles = makeStyles(() => ({
        ul: {
            "& .MuiPaginationItem-root": {
                color: "#fff",
            },
        },
    }));

    const setTableState = async (transactionData = transactions) => {
        let amountOfPages = Math.ceil(transactionData.length / 10);
        let pageFirstIndex = (page - 1) * 10 + 1;
        let pageSecondIndex = Math.min(page * 10, transactionData.length);
        let newPageData = transactionData.slice(pageFirstIndex - 1, pageSecondIndex);
        setPageData(newPageData);
        setPaginatorData({ amountOfPages, pageFirstIndex, pageSecondIndex });
    };

    let initialTransactions: PalmTableData[] = [];
    const [page, setPage] = React.useState(1);
    const [transactions, setTransactions] = React.useState(initialTransactions);
    const [pageData, setPageData] = React.useState(initialTransactions);
    const [paginatorData, setPaginatorData] = React.useState({ amountOfPages: 0, pageFirstIndex: 0, pageSecondIndex: 0 });

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setTableState();
    };

    const classes = useStyles();

    const columnHeaders: ColumnData = { tokenName: "Token Name", transactionHash: "Transaction Hash", date: "Date", amount: "Amount", from: "From", to: "To" };

    useAsync(async () => {
        const transactionData = await getTransactions();
        setTransactions(transactionData);
        await setTableState(transactionData);
    }, []);

    const TransactionCard = (
        <React.Fragment key={transactions.length}>
            <Stack sx={{ mx: "16px", my: "12px" }} spacing={2}>
                <Box className="Header">
                    <Typography variant="h6" component="div">
                        Transaction History
                    </Typography>
                </Box>
                <Divider className="palm-card-divider"></Divider>
                <Box className="treasury-palm-table">
                    <PalmTable tableData={pageData} columns={columnHeaders}></PalmTable>
                </Box>
                <Divider className="palm-card-divider footer-divider"></Divider>
                <Box sx={{ display: "flex" }} className="Footer">
                    <Typography
                        sx={{ flexGrow: "1" }}
                    >{`Showing ${paginatorData.pageFirstIndex} to ${paginatorData.pageSecondIndex} out of ${transactions.length} transactions`}</Typography>
                    <Pagination classes={{ ul: classes.ul }} count={paginatorData.amountOfPages} page={page} onChange={handleChange} />
                </Box>
            </Stack>
        </React.Fragment>
    );

    return (
        <Stack spacing={2}>
            <Box sx={{ display: "flex" }}>
                <PalmCard>
                    <Box sx={{ mx: "12px", my: "12px" }}>ETH 500.0</Box>
                </PalmCard>
                <PalmCard>
                    <Box sx={{ mx: "12px", my: "12px" }}>PALM 220.0</Box>
                </PalmCard>
            </Box>
            <PalmCard>{TransactionCard}</PalmCard>
        </Stack>
    );
}

export default Treasury;
