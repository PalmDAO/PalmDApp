import * as React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/material/styles";
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
    console.log(path);
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
            return null;
    }
}

const drawerWidth = 300;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const NavHeader = (props: AppBarProps) => {
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
            const value = getTabValue(location.pathname);
            if (value !== null) {
                setValue(value);
            }
        });
        return unlisten;
    }, []);

    return (
        <AppBar {...props} color="transparent" className="palm-appbar" position="static">
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
