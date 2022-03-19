import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import "./NavHeader.scss";
import { ReactComponent as PalmDaoLogo } from "../../assets/icons/palm-dao-logo.svg";
import PalmTabs from "../PalmTabs/PalmTabs";
import ConnectButton from "../connect-button";
import { useHistory } from "react-router-dom";

function getPath(path: string) {
    return path.replace(/^\//, "");
}

function getTabValue(path: string) {
    switch (getPath(path)) {
        case "overview":
            return 0;
        case "proposals":
            return 1;
        case "wallet":
            return 2;
        case "treasury":
            return 3;
        default:
            return 1;
    }
}

const NavHeader = () => {
    const history = useHistory();
    const [value, setValue] = React.useState(getTabValue(history.location.pathname));

    function handleChange(event: React.SyntheticEvent, newValue: number) {
        switch (newValue) {
            case 0:
                history.push("/overview");
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
        setValue(newValue);
    }

    React.useEffect(() => {
        const unlisten = history.listen(location => {
            setValue(getTabValue(location.pathname));
        });
        return unlisten;
    }, []);

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
