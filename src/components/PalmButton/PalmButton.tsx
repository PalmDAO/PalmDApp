import * as React from "react";
import ButtonUnstyled, { buttonUnstyledClasses, ButtonUnstyledProps } from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";

interface IPalmButtonProps {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const green = {
    500: "var(--palm-primary)",
    600: "var(--palm-primary-dark)",
    700: "var(--palm-primary-darkest)",
};

const PalmButtonRoot = styled("button")`
    font-family: IBM Plex Sans, sans-serif;
    font-weight: bold;
    font-size: 0.875rem;
    background-color: ${green[500]};
    padding: 12px 24px;
    border-radius: 8px;
    color: black;
    transition: all 150ms ease;
    cursor: pointer;
    border: none;

    &:hover {
        background-color: ${green[600]};
    }

    &.${buttonUnstyledClasses.active} {
        background-color: ${green[700]};
    }

    &.${buttonUnstyledClasses.focusVisible} {
        box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
        outline: none;
    }

    &.${buttonUnstyledClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

function PalmButton(props: IPalmButtonProps) {
    return (
        <ButtonUnstyled {...props} component={PalmButtonRoot}>
            {props.children}
        </ButtonUnstyled>
    );
}

export default PalmButton;
