import React, { Fragment } from "react";
import { Stack, Typography, Box, Button, CardHeader, Divider, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IReduxState } from "src/store/slices/state.interface";
import { IProposal } from "src/store/slices/proposals-slice";
import PalmCard from "src/components/PalmCard/PalmCard";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import styled from "@emotion/styled";
import { useHistory } from "react-router-dom";
import PalmProgress from "src/components/PalmProgress/PalmProgress";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const HourGlassIcon = () => {
    return (
        <Box
            sx={{
                width: "40px",
                height: "40px",
                backgroundColor: "rgba(79, 106, 230, 0.2)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
            }}
        >
            <Box sx={{ color: "#4f6ae6", paddingTop: "4px" }}>
                <HourglassEmptyIcon fontSize="small" color="inherit" />
            </Box>
        </Box>
    );
};

const CheckMarkIcon = () => {
    return (
        <Box
            sx={{
                width: "40px",
                height: "40px",
                backgroundColor: "var(--palm-primary-light)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
            }}
        >
            <Box sx={{ color: "var(--palm-primary)", paddingTop: "4px" }}>
                <CheckIcon fontSize="small" color="inherit" />
            </Box>
        </Box>
    );
};

const BackButton = styled(Button)`
    &.MuiButton-root.MuiButton-text.MuiButton-textPrimary {
        color: rgba(255, 255, 255, 0.8);
    }

    &.MuiButton-root.MuiButton-text.MuiButton-textPrimary:hover {
        color: white;
        background: transparent;
    }
`;

const AccountImg = styled("img")`
    border: 1px solid #e3e4e6;
    border-radius: 4px;
`;

export default function ViewProposal() {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const proposal = useSelector<IReduxState, IProposal | undefined>(state => state.proposals.proposals.find(proposal => String(proposal.proposalId) === id));

    // This will come from proposal object
    const votingComplete = false;

    if (!proposal) {
        return <Typography>No proposal found</Typography>;
    }

    const onBackClicked = () => {
        history.push("/proposals");
    };

    let stepsData = [
        { title: "Executed", date: "20 Mar 2022 - 15:09", status: "success", icon: <CheckMarkIcon /> },
        { title: "Pending execution", date: "Ended at 20 Mar 2022 - 15:09", status: "success", icon: <CheckMarkIcon /> },
        { title: "Queued for execution", date: "17 Mar 2022 - 16:40", status: "success", icon: <CheckMarkIcon /> },
        { title: "Accepted", date: "17 Mar 2022 - 16:40", status: "success", icon: <CheckMarkIcon /> },
        { title: "Voting", date: "Ended at 17 Mar 2022 - 16:40", status: "success", icon: <CheckMarkIcon /> },
        { title: "Warm-Up", date: "Ended at 15 Mar 2022 - 16:40", status: "success", icon: <CheckMarkIcon /> },
        { title: "Created", date: "13 Mar 2022 - 16:40", status: "success", icon: <CheckMarkIcon /> },
    ];

    if (!votingComplete) {
        stepsData = [
            { title: "Voting", date: "20 Mar 2022 - 15:09", status: "success", icon: <HourGlassIcon /> },
            { title: "Warm-Up", date: "Ended at 20 Mar 2022 - 15:09", status: "success", icon: <CheckMarkIcon /> },
            { title: "Created", date: "17 Mar 2022 - 16:40", status: "success", icon: <CheckMarkIcon /> },
        ];
    }

    const VoteResultsCard = () => {
        return (
            <PalmCard>
                <CardHeader
                    disableTypography
                    title={
                        <Typography sx={{ color: "white", fontWeight: "bold" }} variant="h5">
                            Vote results
                        </Typography>
                    }
                ></CardHeader>
                <Divider orientation="horizontal"></Divider>
                <CardContent>
                    <Stack spacing={2}>
                        <Box sx={{ display: "grid", width: "100%", justifyContent: "space-between", gridAutoFlow: "column" }}>
                            <Box>
                                <Stack spacing={1}>
                                    <Typography variant="subtitle2">For</Typography>
                                    <Typography variant="subtitle1">113,092,702.48 (100.00%)</Typography>
                                </Stack>
                            </Box>
                            <Box>
                                <Stack sx={{ alignItems: "flex-end" }} spacing={1}>
                                    <Typography variant="subtitle2">Against</Typography>
                                    <Typography variant="subtitle1">0.00 (0%)</Typography>
                                </Stack>
                            </Box>
                        </Box>
                        <PalmProgress value={40} color="var(--palm-primary)"></PalmProgress>
                    </Stack>
                </CardContent>
                <CardContent>
                    <Stack spacing={2}>
                        <Box sx={{ display: "grid", width: "100%", justifyContent: "space-between", gridAutoFlow: "column" }}>
                            <Box>
                                <Stack spacing={1}>
                                    <Typography variant="subtitle2">Quorum</Typography>
                                    <Typography variant="subtitle1">45.09%(&gt; 40% required)</Typography>
                                </Stack>
                            </Box>
                            <Box>
                                <Stack sx={{ alignItems: "flex-end" }} spacing={1}>
                                    <Typography variant="subtitle2">Approval</Typography>
                                    <Typography variant="subtitle1">100.00%(&gt; 60% required)</Typography>
                                </Stack>
                            </Box>
                        </Box>
                    </Stack>
                </CardContent>
            </PalmCard>
        );
    };

    const DetailsCard = () => {
        return (
            <PalmCard>
                <CardHeader
                    disableTypography
                    title={
                        <Typography sx={{ color: "white", fontWeight: "bold" }} variant="h5">
                            Details
                        </Typography>
                    }
                ></CardHeader>
                <Divider orientation="horizontal"></Divider>
                <CardContent>
                    <Box sx={{ display: "flex", gap: "32px", flexWrap: "wrap", gridGap: "32px" }}>
                        <Stack spacing={1}>
                            <Typography sx={{ height: "30px" }} variant="subtitle2">
                                Owned by
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                <AccountImg
                                    width="24"
                                    height="24"
                                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc2NCcgaGVpZ2h0PSc2NCcgc3R5bGU9J2JhY2tncm91bmQtY29sb3I6cmdiYSgyNDAsMjQwLDI0MCwxKTsnPjxnIHN0eWxlPSdmaWxsOnJnYmEoMjE3LDM4LDk4LDEpOyBzdHJva2U6cmdiYSgyMTcsMzgsOTgsMSk7IHN0cm9rZS13aWR0aDowLjMyOyc+PHJlY3QgIHg9JzI3JyB5PSc3JyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnLz48cmVjdCAgeD0nMjcnIHk9JzE3JyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnLz48cmVjdCAgeD0nMjcnIHk9JzM3JyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnLz48cmVjdCAgeD0nMTcnIHk9JzE3JyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnLz48cmVjdCAgeD0nMzcnIHk9JzE3JyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnLz48cmVjdCAgeD0nMTcnIHk9JzI3JyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnLz48cmVjdCAgeD0nMzcnIHk9JzI3JyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnLz48cmVjdCAgeD0nMTcnIHk9JzQ3JyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnLz48cmVjdCAgeD0nMzcnIHk9JzQ3JyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnLz48L2c+PC9zdmc+"
                                ></AccountImg>
                                <Typography variant="subtitle1">
                                    <a style={{ color: "#4f6ae6", textDecoration: "solid" }} href="https://etherscan.io/address/0x56bf24f635B39aC01DA6761C69AEe7ba4f1cFE3f">
                                        0x56bf...FE3f
                                    </a>
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack spacing={1}>
                            <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
                                <Typography variant="subtitle2">Creator threshold</Typography>
                                <Tooltip title="If the creator’s PALM balance falls below 1% of the total amount of PALM avaialble in the DAO. Then this proposal can be cancelled by anyone.">
                                    <IconButton size="small">
                                        <InfoIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                            <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
                                <CheckCircleIcon color="disabled" fontSize="small"></CheckCircleIcon>
                                <Typography variant="subtitle1">Above 1%</Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </CardContent>
                <CardContent>
                    <Stack spacing={2}>
                        <Box sx={{ display: "grid", width: "100%", justifyContent: "space-between", gridAutoFlow: "column" }}>
                            <Box>
                                <Stack spacing={1}>
                                    <Typography variant="subtitle2">Description</Typography>
                                    <Typography variant="subtitle1">{proposal.description}</Typography>
                                </Stack>
                            </Box>
                        </Box>
                    </Stack>
                </CardContent>
            </PalmCard>
        );
    };

    const StepsCard = () => {
        return (
            <PalmCard>
                <CardContent>
                    <Stack spacing={2}>
                        {stepsData.map(step => {
                            return (
                                <Stack spacing={1} direction="row">
                                    <Box sx={{ color: "var(--palm-primary)", alignSelf: "center" }}>{step.icon}</Box>
                                    <Stack>
                                        <Typography variant="subtitle1">{step.title}</Typography>
                                        <Typography sx={{ opacity: "0.6" }} variant="subtitle2">
                                            {step.date}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            );
                        })}
                    </Stack>
                </CardContent>
            </PalmCard>
        );
    };

    const VotesCard = () => {
        return (
            <PalmCard>
                <CardHeader
                    disableTypography
                    title={
                        <Typography sx={{ color: "white", fontWeight: "bold" }} variant="h5">
                            Votes
                        </Typography>
                    }
                ></CardHeader>
                <Divider orientation="horizontal"></Divider>
                <CardContent>
                    <Stack spacing={2}>
                        <Box sx={{ display: "flex", width: "100%", gap: "100px" }}>
                            <Stack spacing={1} sx={{ flexGrow: "1", flexBasis: "0" }}>
                                <Stack spacing={1} direction="row" sx={{ alignItems: "flex-end" }}>
                                    <Typography sx={{ fontWeight: "bold" }} variant="subtitle2">
                                        For 0.00
                                    </Typography>
                                    <Typography variant="subtitle2">(0.00%)</Typography>
                                </Stack>
                                <PalmProgress value={40} color="var(--palm-primary)"></PalmProgress>
                            </Stack>
                            <Stack spacing={1} sx={{ flexGrow: "1", flexBasis: "0" }}>
                                <Stack spacing={1} direction="row" sx={{ alignItems: "flex-end" }}>
                                    <Typography sx={{ fontWeight: "bold" }} variant="subtitle2">
                                        Against 0.00
                                    </Typography>
                                    <Typography variant="subtitle2">(0.00%)</Typography>
                                </Stack>
                                <PalmProgress value={10} color="red"></PalmProgress>
                            </Stack>
                        </Box>
                    </Stack>
                </CardContent>
            </PalmCard>
        );
    };

    const QuorumCard = () => {
        return (
            <PalmCard>
                <CardHeader
                    disableTypography
                    title={
                        <Box sx={{ display: "flex", gap: "4px" }}>
                            <Typography sx={{ color: "white", fontWeight: "bold" }} variant="h5">
                                Quorum
                            </Typography>
                            <Tooltip title="If the creator’s PALM balance falls below 1% of the total amount of PALM avaialble in the DAO. Then this proposal can be cancelled by anyone.">
                                <IconButton size="small">
                                    <InfoIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }
                ></CardHeader>
                <Divider orientation="horizontal"></Divider>
                <CardContent>
                    <Stack spacing={2}>
                        <Box sx={{ display: "flex", width: "100%", gap: "100px" }}>
                            <Stack spacing={1} sx={{ flexGrow: "1", flexBasis: "0" }}>
                                <Stack spacing={1} direction="row" sx={{ alignItems: "flex-end" }}>
                                    <Typography sx={{ fontWeight: "bold" }} variant="subtitle2">
                                        0.00%
                                    </Typography>
                                    <Typography variant="subtitle2">(&gt; 40% 0.00%)</Typography>
                                </Stack>
                                <PalmProgress value={40} color="var(--palm-primary)"></PalmProgress>
                            </Stack>
                        </Box>
                    </Stack>
                </CardContent>
            </PalmCard>
        );
    };

    const ApprovalCard = () => {
        return (
            <PalmCard>
                <CardHeader
                    disableTypography
                    title={
                        <Box sx={{ display: "flex", gap: "4px" }}>
                            <Typography sx={{ color: "white", fontWeight: "bold" }} variant="h5">
                                Approval
                            </Typography>
                            <Tooltip title="If the creator’s PALM balance falls below 1% of the total amount of PALM avaialble in the DAO. Then this proposal can be cancelled by anyone.">
                                <IconButton size="small">
                                    <InfoIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }
                ></CardHeader>
                <Divider orientation="horizontal"></Divider>
                <CardContent>
                    <Stack spacing={2}>
                        <Box sx={{ display: "flex", width: "100%", gap: "100px" }}>
                            <Stack spacing={1} sx={{ flexGrow: "1", flexBasis: "0" }}>
                                <Stack spacing={1} direction="row" sx={{ alignItems: "flex-end" }}>
                                    <Typography sx={{ fontWeight: "bold" }} variant="subtitle2">
                                        0.00%
                                    </Typography>
                                    <Typography variant="subtitle2">(&gt; 40% 0.00%)</Typography>
                                </Stack>
                                <PalmProgress value={40} color="var(--palm-primary)"></PalmProgress>
                            </Stack>
                        </Box>
                    </Stack>
                </CardContent>
            </PalmCard>
        );
    };

    return (
        <Fragment>
            <BackButton onClick={() => onBackClicked()} sx={{ color: "black", marginBottom: "2rem" }} variant="text" startIcon={<KeyboardBackspaceIcon />}>
                Proposals
            </BackButton>
            <Stack spacing={4}>
                <Typography sx={{ color: "white", fontWeight: "bold", flexGrow: "1" }} variant="h4">
                    {proposal.description}
                </Typography>
                <Box sx={{ display: "flex", flexGap: "32px", gap: "32px" }}>
                    <Box sx={{ display: "grid", flexGrow: "1", gridAutoFlow: "row", gap: "32px" }}>
                        {votingComplete ?? <VoteResultsCard></VoteResultsCard>}
                        <DetailsCard></DetailsCard>
                    </Box>
                    <Box sx={{ display: "grid", width: "100%", maxWidth: "428px", gap: "32px" }}>
                        <StepsCard></StepsCard>
                        {!votingComplete ? (
                            <Fragment>
                                <VotesCard></VotesCard>
                                <QuorumCard></QuorumCard>
                                <ApprovalCard></ApprovalCard>
                            </Fragment>
                        ) : null}
                    </Box>
                </Box>
            </Stack>
        </Fragment>
    );
}
