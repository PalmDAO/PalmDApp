import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

interface IProgressProps {
    value?: number;
    color: string;
}

export default function PalmProgress({ value, color }: IProgressProps) {
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: color,
        },
    }));

    return (
        <Box sx={{ flexGrow: 1 }}>
            <BorderLinearProgress variant="determinate" value={value} />
        </Box>
    );
}
