import * as React from "react";
import { useCallback } from "react";
import { NavLink, withRouter, useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />)({
    "& .MuiTabs-indicator": {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
        maxWidth: 50,
        width: "100%",
        backgroundColor: "var(--palm-primary)",
    },
});

interface StyledTabProps {
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
        color: "#fff",
    },
    "&.Mui-focusVisible": {
        backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
    "&:hover": {
        color: "var(--palm-primary)",
        opacity: 1,
    },
}));

const CustomTabs = (props: any) => {
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        switch (newValue) {
            case 0:
                history.push("/dashboard");
                break;
            case 1:
                history.push("/stake");
                break;
            case 2:
                history.push("/mints");
                break;
            case 3:
                history.push("/calculator");
                break;
            default:
                break;
        }
        console.log("handleChange", newValue);
        setValue(newValue);
    };

    return (
        <Box>
            <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs example">
                <StyledTab label="Overview" />
                <StyledTab label="Proposals" />
                <StyledTab label="Wallet" />
                <StyledTab label="Treasury" />
            </StyledTabs>
        </Box>
    );
};
export default CustomTabs;
