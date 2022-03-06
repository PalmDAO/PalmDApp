import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import { Tab } from "@mui/material";

interface IPalmTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
    tabs: Array<string>;
}

const StyledTabs = styled((props: IPalmTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />)({
    "& .MuiTabs-indicator": {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
        maxWidth: 40,
        width: "100%",
        backgroundColor: "var(--palm-primary)",
    },
});

interface IPalmTabProps {
    label: string;
}

const StyledTab = styled((props: IPalmTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
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

function PalmTabs({ value, onChange, tabs }: IPalmTabsProps) {
    console.log(onChange);
    return (
        <Box>
            <StyledTabs tabs={tabs} value={value} onChange={onChange} aria-label="Tabs">
                {tabs.map((label, index) => (
                    <StyledTab label={label} key={index} />
                ))}
            </StyledTabs>
        </Box>
    );
}
export default PalmTabs;
