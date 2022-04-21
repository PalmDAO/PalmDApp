import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

interface PalmStepperPropsInterface {
    steps: {
        label: string;
        labelProps: {
            optional?: React.ReactNode;
        };
        optional: boolean;
    }[];
    activeStep: number;
}

const PalmStep = styled(Step)(
    ({ theme }) => `

    &.MuiStep-root .MuiSvgIcon-root.Mui-active, &.MuiStep-root .MuiSvgIcon-root.Mui-completed {
        color: var(--palm-primary);
    }
`,
);

export default function PalmStepper({ steps, activeStep }: PalmStepperPropsInterface) {
    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => {
                    if (step.optional) {
                        step.labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    const completed = index < activeStep;
                    return (
                        <PalmStep key={step.label} completed={completed}>
                            <StepLabel {...step.labelProps}>{step.label}</StepLabel>
                        </PalmStep>
                    );
                })}
            </Stepper>
        </Box>
    );
}
