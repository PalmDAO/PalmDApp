import React, { useState } from "react";
import "./view-base.scss";
import Header from "../Header";
import { Hidden, makeStyles, useMediaQuery } from "@material-ui/core";
import { DRAWER_WIDTH, TRANSITION_DURATION } from "../../constants/style";
import Messages from "../Messages";
import NavHeader from "../NavHeader/NavHeader";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface IViewBaseProps {
    children: React.ReactNode;
}

const useStyles = makeStyles(theme => ({
    content: {
        padding: theme.spacing(1),
        height: "100%",
        overflowY: "auto",
        paddingLeft: 200,
        paddingRight: 200,
        paddingTop: 50,
        paddingBottom: 50,
    },
    contentSmall: {
        padding: theme.spacing(1),
        height: "100%",
        overflowY: "auto",
        paddingLeft: 100,
        paddingRight: 100,
        paddingTop: 25,
        paddingBottom: 25,
    },
}));

function ViewBase({ children }: IViewBaseProps) {
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

    return (
        <ThemeProvider theme={theme}>
            <div className="view-base-root">
                <Messages />
                <NavHeader></NavHeader>
                <div className={`${classes.content} ${isSmallerScreen && classes.contentSmall}`}>{children}</div>
            </div>
        </ThemeProvider>
    );
}

export default ViewBase;
