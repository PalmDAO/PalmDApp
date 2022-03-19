import * as React from "react";
import { useSelector } from "react-redux";
import "./proposals.scss";
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
import { ethers, utils } from "ethers";
import { PalmContract, WhaleContract } from "../../abi";
import { getAddresses, Networks } from "../../constants";
import PalmDialog from "../../components/PalmDialog";
import PalmChipInput from "../../components/PalmChipInput";
import { getTopCoinsByMarketCap } from "../../helpers/token-price";

let Web3 = require("web3");
let web3 = new Web3(Web3.givenProvider);

const createFilteredProposals = (proposals: any[]) => {
    return proposals.map((proposal: any) => {
        return {
            data: { proposal: proposal.description, proposalId: proposal.proposalId, votes: { component: "progress", text: "0%", textTwo: "0%", value: 0, valueTwo: 0 } },
        };
    });
};

export default function Proposals() {
    const addresses = getAddresses(Networks.ETH);
    const [value, setValue] = React.useState(0);
    const [page, setPage] = React.useState(1);
    const initialProposals: any[] = [];
    const [proposals, setProposals] = React.useState(initialProposals);
    const [filteredProposals, setFilteredProposals] = React.useState(initialProposals);
    const [paginatorData, setPageData] = React.useState({ amountOfPages: 0, pageFirstIndex: 0, pageSecondIndex: 0 });
    getTopCoinsByMarketCap();

    const provider = ethers.providers.getDefaultProvider("http://127.0.0.1:9545");
    const governorAddress = addresses.WHALE_GOVERNOR_ADDRESS;

    let whaleGovernor = new web3.eth.Contract(WhaleContract, governorAddress);
    //Any new, incoming events
    whaleGovernor.events
        .ProposalCreated({}, () => console.log("Received proposal creation"))
        .on("data", (event: any) => {
            //Has a field called returnValues which maps to the 8 arguments from ProposalCreated
            //See https://docs.openzeppelin.com/contracts/4.x/api/governance#IGovernor-ProposalCreated-uint256-address-address---uint256---string---bytes---uint256-uint256-string-
            //Only fires on successful events.  Inspect why it happens a lot
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
                setProposals(newProposals);
            }

            const newFilteredProposals = createFilteredProposals(newProposals);

            if (newFilteredProposals.length !== filteredProposals.length && value === 0) {
                setFilteredProposals(newFilteredProposals);
                const amountOfPages = Math.ceil(newProposals.length / 10);
                const pageFirstIndex = (page - 1) * 10 + 1;
                const pageSecondIndex = Math.min(page * 10, newProposals.length);
                setPageData({ amountOfPages, pageFirstIndex, pageSecondIndex });
            }
        })
        .on("error", (error: any) => {
            //Only fires on errors for ProposalCreated

            console.log("proposal errored");
        });

    //All past events
    //Inspect why events here is alwasy length 1
    whaleGovernor.getPastEvents("ProposalCreated", { fromBlock: 0, toBlock: "latest" }, (error: any, events: any) => {
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

        const newFilteredProposals = createFilteredProposals(pastProposals);

        if (newFilteredProposals.length !== filteredProposals.length && value === 0) {
            setFilteredProposals(newFilteredProposals);
            const amountOfPages = Math.ceil(pastProposals.length / 10);
            const pageFirstIndex = (page - 1) * 10 + 1;
            const pageSecondIndex = Math.min(page * 10, pastProposals.length);
            setPageData({ amountOfPages, pageFirstIndex, pageSecondIndex });
        }
    });

    function handleTabChange(event: React.SyntheticEvent, newValue: number) {
        console.log(newValue);

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

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        // createProposal()
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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
                    <PalmTable tableData={filteredProposals.reverse()} columns={columnHeaders}></PalmTable>
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
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <PalmButton onClick={handleClickOpen}>Create Proposal</PalmButton>
                <PalmDialog onClose={handleClose} open={open}>
                    <PalmChipInput></PalmChipInput>
                </PalmDialog>
            </Box>
            <PalmCard>{card}</PalmCard>
        </Stack>
    );
}
