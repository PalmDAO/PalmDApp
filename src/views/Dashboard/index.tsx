import * as React from "react";
import { useSelector } from "react-redux";
import "./dashboard.scss";
import Box from "@mui/material/Box";
import PalmCard from "../../components/PalmCard/PalmCard";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import makeStyles from "@mui/styles/makeStyles";
import PalmTable from "../../components/PalmTable/PalmTable";
import { PalmTableData, ColumnData } from "../../components/PalmTable/PalmTableInterface";

function Dashboard() {
    const useStyles = makeStyles(() => ({
        ul: {
            "& .MuiPaginationItem-root": {
                color: "#fff",
            },
        },
    }));

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const classes = useStyles();

    const columnHeaders: ColumnData = { address: "Address", votingPower: "Voting Power", votes: "Votes", proposals: "Proposals" };
    const cellData: PalmTableData[] = [
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "5", proposals: "5" } },
        { data: { address: "0xa2ad64b2d890a59ce18c0ddd51a7de9ef69eb3da", votingPower: "100.52", votes: "10", proposals: "10" } },
    ];

    const amountOfPages = Math.ceil(cellData.length / 10);
    const pageFirstIndex = (page - 1) * 10 + 1;
    const pageSecondIndex = Math.min(page * 10, cellData.length);

    const pageData = cellData.slice(pageFirstIndex - 1, pageSecondIndex);

    const card = (
        <React.Fragment>
            <Stack sx={{ mx: "16px", my: "12px" }} spacing={2}>
                <Box className="Header">
                    <Typography variant="h6" component="div">
                        Voter Weights
                    </Typography>
                </Box>
                <Divider className="palm-card-divider"></Divider>
                <Box className="overview-palm-table">
                    <PalmTable tableData={pageData} columns={columnHeaders}></PalmTable>
                </Box>
                <Divider className="palm-card-divider footer-divider"></Divider>
                <Box sx={{ display: "flex" }} className="Footer">
                    <Typography sx={{ flexGrow: "1" }}>{`Showing ${pageFirstIndex} to ${pageSecondIndex} out of ${cellData.length} holders`}</Typography>
                    <Pagination classes={{ ul: classes.ul }} count={amountOfPages} page={page} onChange={handleChange} />
                </Box>
            </Stack>
        </React.Fragment>
    );

    return (
        <Stack spacing={2}>
            <Typography sx={{ color: "white", fontWeight: "bold", flexGrow: "1", marginLeft: "1rem" }} variant="h4">
                Overview
            </Typography>
            <PalmCard>{card}</PalmCard>;
        </Stack>
    );
}

export default Dashboard;
