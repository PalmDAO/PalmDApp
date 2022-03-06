import * as React from "react";
import { useSelector } from "react-redux";
import "./proposals.scss";
import { IReduxState } from "../../store/slices/state.interface";
import { IAppSlice } from "../../store/slices/app-slice";
import Box from "@mui/material/Box";
import PalmCard from "../../components/PalmCard/PalmCard";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import PalmTable from "../../components/PalmTable/PalmTable";
import { PalmTableData, ColumnData } from "../../components/PalmTable/PalmTableInterface";
import PalmTabs from "src/components/PalmTabs/PalmTabs";
import PalmButton from "src/components/PalmButton/PalmButton";
import { createProposal } from "./Proposals.service";

function Proposals() {
    const app = useSelector<IReduxState, IAppSlice>(state => state.app);
    const [value, setValue] = React.useState(0);

    function handleTabChange(event: React.SyntheticEvent, newValue: number) {
        setValue(newValue);
    }

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

    const columnHeaders: ColumnData = { proposal: "Proposal", votes: "Votes" };
    const cellData: PalmTableData[] = [
        { data: { proposal: "PIP-1: ETH 80%, OHM 10%, PALM 10%", votes: { component: "progress", text: "80%", textTwo: "20%", value: 80, valueTwo: 20 } } },
    ];

    const amountOfPages = Math.ceil(cellData.length / 10);
    const pageFirstIndex = (page - 1) * 10 + 1;
    const pageSecondIndex = Math.min(page * 10, cellData.length);

    const pageData = cellData.slice(pageFirstIndex - 1, pageSecondIndex);

    const card = (
        <React.Fragment>
            <Stack sx={{ mx: "16px", my: "12px" }} spacing={2}>
                <Box className="palm-proposals-header">
                    <PalmTabs onChange={handleTabChange} value={value} tabs={["All proposals", "Active", "Executed", "Failed"]}></PalmTabs>
                    <Divider className="palm-card-divider"></Divider>
                </Box>
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
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <PalmButton onClick={() => createProposal()}>Create Proposal</PalmButton>
            </Box>
            <PalmCard>{card}</PalmCard>
        </Stack>
    );
}

export default Proposals;
