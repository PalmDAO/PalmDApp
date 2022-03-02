import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import "./NavHeader.scss";
import { ReactComponent as PalmDaoLogo } from "../../assets/icons/palm-dao-logo.svg";
import CustomTabs from "../CustomTabs/CustomTabs";

const NavHeader = () => {
    return (
        <AppBar color="transparent" className="palm-appbar" position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <PalmDaoLogo></PalmDaoLogo>
                    <Box sx={{ flexGrow: 1, justifyContent: "flex-end", display: { xs: "none", md: "flex" } }}>
                        <CustomTabs></CustomTabs>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavHeader;
