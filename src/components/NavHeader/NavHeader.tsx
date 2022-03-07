import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import "./NavHeader.scss";
import { ReactComponent as PalmDaoLogo } from "../../assets/icons/palm-dao-logo.svg";
import PalmTabs from "../PalmTabs/PalmTabs";
import ConnectButton from "../Header/connect-button";
import { useHistory } from "react-router-dom";

const NavHeader = () => {
    const [value, setValue] = React.useState(1);
    const history = useHistory();

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        console.log(newValue);
        switch (newValue) {
            case 0:
                history.push("/dashboard");
                break;
            case 1:
                history.push("/proposals");
                break;
            case 2:
                history.push("/wallet");
                break;
            case 3:
                history.push("/treasury");
                break;
            default:
                break;
        }
        console.log("handleChange", newValue);
        setValue(newValue);
    }

    return (
        <AppBar color="transparent" className="palm-appbar" position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <PalmDaoLogo></PalmDaoLogo>
                    <Box sx={{ flexGrow: 1, justifyContent: "flex-end", display: { xs: "none", md: "flex" } }}>
                        <PalmTabs tabs={["Overview", "Proposals", "Wallet", "Treasury"]} value={value} onChange={handleChange}></PalmTabs>
                    </Box>
                    <Box sx={{ marginLeft: "1rem" }}>
                        <ConnectButton></ConnectButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavHeader;
