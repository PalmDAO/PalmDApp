import React, { useEffect } from "react";
import { AnyIfEmpty, useSelector } from "react-redux";
import "./proposals.scss";
import Box from "@mui/material/Box";
import PalmCard from "../../components/PalmCard/PalmCard";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import makeStyles from "@mui/styles/makeStyles";
import PalmTable from "../../components/PalmTable/PalmTable";
import { ColumnData } from "../../components/PalmTable/PalmTableInterface";
import PalmTabs from "src/components/PalmTabs/PalmTabs";
import PalmButton from "src/components/PalmButton/PalmButton";
import { onProposalsCreated, onPastProposals } from "./Proposals.service";
import { setProposals } from "../../store/slices/proposals-slice";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../store/slices/app-slice";
import { useHistory } from "react-router-dom";

const createFilteredProposals = (proposals: any[]) => {
    return proposals.map((proposal: any) => {
        return {
            data: { proposal: proposal.description, proposalId: proposal.proposalId, votes: { component: "progress", text: "0%", textTwo: "0%", value: 0, valueTwo: 0 } },
        };
    });
};

export default function Proposals() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [value, setValue] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const [paginatorData, setPageData] = React.useState({ amountOfPages: 0, pageFirstIndex: 0, pageSecondIndex: 0 });

    const proposals: any[] = useSelector((state: any) => state.proposals.proposals);
    const [filteredProposals, setFilteredProposals] = React.useState(createFilteredProposals(proposals));

    useEffect(() => {
        setFilteredProposals(createFilteredProposals(proposals));
    }, [proposals]);

    const onCreated = () => console.log("Received proposal creation");
    const onData = (event: any) => {
        console.log(event);
        let newProposals = [...proposals];

        newProposals.push({
            proposalId: event.returnValues[0],
            proposer: event.returnValues[1],
            targets: event.returnValues[2],
            values: event.returnValues[3],
            signatures: event.returnValues[4],
            calldatas: event.returnValues[5],
            startBlock: event.returnValues[6],
            endBlock: event.returnValues[7],
            description: event.returnValues[8],
        });

        if (newProposals.length !== proposals.length && value === 0) {
            dispatch(setProposals(newProposals));
        }
    };

    const onError = () => console.log("proposal errored");

    const onPastProposalsCreated = (events: any) => {
        console.log(events);

        const pastProposals = events.map((event: any) => {
            return {
                proposalId: event.returnValues[0],
                proposer: event.returnValues[1],
                targets: event.returnValues[2],
                values: event.returnValues[3],
                signatures: event.returnValues[4],
                calldatas: event.returnValues[5],
                startBlock: event.returnValues[6],
                endBlock: event.returnValues[7],
                description: event.returnValues[8],
            };
        });

        if (pastProposals.length !== proposals.length && value === 0) {
            setProposals(pastProposals);
        }
    };

    onProposalsCreated(onCreated, onData, onError);
    onPastProposals(onPastProposalsCreated);

    function handleTabChange(event: React.SyntheticEvent, newValue: number) {
        setValue(newValue);
        switch (newValue) {
            case 0:
                setFilteredProposals(createFilteredProposals(proposals));
                const amountOfPages = Math.ceil(proposals.length / 10);
                const pageFirstIndex = (page - 1) * 10 + 1;
                const pageSecondIndex = Math.min(page * 10, proposals.length);
                setPageData({ amountOfPages, pageFirstIndex, pageSecondIndex });
                break;
            case 1:
                setFilteredProposals([]);
                setPageData({ amountOfPages: 0, pageFirstIndex: 0, pageSecondIndex: 0 });
                break;
            case 2:
                setFilteredProposals([]);
                setPageData({ amountOfPages: 0, pageFirstIndex: 0, pageSecondIndex: 0 });
                break;
            case 3:
                setFilteredProposals([]);
                setPageData({ amountOfPages: 0, pageFirstIndex: 0, pageSecondIndex: 0 });
                break;
            default:
                setFilteredProposals(filteredProposals);
                setPageData({ amountOfPages: 0, pageFirstIndex: 0, pageSecondIndex: 0 });
                break;
        }
    }

    const useStyles = makeStyles(() => ({
        ul: {
            "& .MuiPaginationItem-root": {
                color: "#fff",
            },
        },
    }));

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handletoggleDrawer = () => {
        // createProposal()
        dispatch(toggleDrawer());
    };

    const onRowClicked = (row: any) => {
        console.log(row);
        history.push(`/proposals/1`);
    };

    const classes = useStyles();

    const columnHeaders: ColumnData = { proposal: "Proposal", votes: "Votes" };

    const card = (
        <React.Fragment>
            <Stack sx={{ mx: "16px", my: "12px" }} spacing={2}>
                <Box className="palm-proposals-header">
                    <PalmTabs onChange={handleTabChange} value={value} tabs={["All proposals", "Active", "Executed", "Failed"]}></PalmTabs>
                    <Divider className="palm-card-divider"></Divider>
                </Box>
                <Box className="overview-palm-table">
                    <PalmTable tableData={filteredProposals.reverse()} columns={columnHeaders} onRowClicked={onRowClicked}></PalmTable>
                </Box>
                <Divider className="palm-card-divider footer-divider"></Divider>
                <Box sx={{ display: "flex" }} className="Footer">
                    <Typography
                        sx={{ flexGrow: "1" }}
                    >{`Showing ${paginatorData.pageFirstIndex} to ${paginatorData.pageSecondIndex} out of ${proposals.length} proposals`}</Typography>
                    <Pagination classes={{ ul: classes.ul }} count={paginatorData.amountOfPages} page={page} onChange={handleChange} />
                </Box>
            </Stack>
        </React.Fragment>
    );

    return (
        <Stack spacing={2}>
            <Box sx={{ display: "flex" }}>
                <Typography sx={{ color: "white", fontWeight: "bold", flexGrow: "1" }} variant="h4">
                    Proposals
                </Typography>
                <PalmButton onClick={handletoggleDrawer}>Create Proposal</PalmButton>
            </Box>

            <PalmCard>{card}</PalmCard>
        </Stack>
    );
}
