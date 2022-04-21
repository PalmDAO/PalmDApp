import React, { useState } from "react";
import "./view-base.scss";
import { useMediaQuery } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Messages from "../Messages";
import NavHeader from "../NavHeader/NavHeader";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Theme } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch, useSelector } from "react-redux";
import { IReduxState } from "../../store/slices/state.interface";
import { toggleDrawer } from "../../store/slices/app-slice";
import AssetsList from "../AssetsList";
import PalmButton from "../PalmButton/PalmButton";
import { IProposalAssets, addAsset, resetProposal } from "../../store/slices/proposal-creation-slice";
import FormControl from "@mui/material/FormControl";
import { error, warning, info, success } from "src/store/slices/messages-slice";
import { addProposal, IProposals } from "src/store/slices/proposals-slice";
import { randomUUID } from "crypto";

interface IViewBaseProps {
    children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        padding: "0.5rem",
        height: "100%",
        overflowY: "auto",
        paddingLeft: "64px !important",
        paddingRight: "64px !important",
        paddingTop: "40px !important",
        paddingBottom: "40px !important",
    },
    contentSmall: {
        padding: "0.5rem",
        height: "100%",
        overflowY: "auto",
        paddingLeft: 100,
        paddingRight: 100,
        paddingTop: 25,
        paddingBottom: 25,
    },
}));

const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: prop => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
}));

function ViewBase({ children }: IViewBaseProps) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const isSmallerScreen = useMediaQuery("(max-width: 960px)");
    // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const prefersDarkMode = true;

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? "dark" : "light",
                },
            }),
        [prefersDarkMode],
    );

    const handleDrawerClose = () => {
        dispatch(toggleDrawer());
    };

    const addAssetHandler = () => {
        dispatch(
            addAsset({
                id: (assets.length + 1).toString(),
                name: "",
                symbol: "",
                image: "",
                allocation: 0,
            }),
        );
    };

    const assets = useSelector<IReduxState, IProposalAssets[]>(state => {
        return state.proposalCreation.assets;
    });

    const totalAllocation = assets.reduce((acc: any, curr: { allocation: any }) => acc + curr.allocation, 0);

    const assetNotFilled = assets.some((asset: { name: any }) => asset.name === "");

    const open = useSelector<IReduxState, boolean>(state => {
        return state.app.showDrawer;
    });

    const proposals = useSelector<IReduxState, IProposals[]>(state => {
        return state.proposals.proposals;
    });

    const onSubmitHandler = () => {
        if (assetNotFilled) {
            dispatch(error({ text: "Please fill in all asset names." }));
        } else if (totalAllocation !== 100) {
            dispatch(error({ text: "Proposal allocations need to add up to 100%. Please try again." }));
        } else {
            dispatch(success({ text: "Proposal successfully created." }));
            dispatch(toggleDrawer());
            dispatch(resetProposal());

            const proposalId = proposals.length + 1;
            const description = assets.reduce((acc: any, curr: { symbol: any; allocation: any }) => acc + `${curr.symbol} ${curr.allocation}%, `, "").slice(0, -2);
            const propose = "PID #" + proposalId + " " + description;

            dispatch(
                addProposal({
                    proposalId,
                    description: propose,
                    propose,
                    targets: "",
                    values: "",
                    signatures: "",
                    calldatas: "",
                    startBlock: "",
                    endBlock: "",
                }),
            );
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="view-base-root">
                <Messages />

                <NavHeader open={open}></NavHeader>
                <Main className={`${classes.content} ${isSmallerScreen && classes.contentSmall}`} open={open}>
                    {children}
                </Main>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                        },
                    }}
                    variant="persistent"
                    anchor="right"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
                        <PalmButton onClick={addAssetHandler} secondary sx={{ marginLeft: "auto" }}>
                            Add
                        </PalmButton>
                        <PalmButton onClick={onSubmitHandler} sx={{ marginLeft: "1rem" }}>
                            Submit
                        </PalmButton>
                    </DrawerHeader>
                    <Divider />
                    <AssetsList assets={assets}></AssetsList>
                </Drawer>
            </div>
        </ThemeProvider>
    );
}

export default ViewBase;
