import * as React from "react";
import InputUnstyled, { InputUnstyledProps } from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";

interface PalmInputProps extends InputUnstyledProps {
    sx?: React.CSSProperties;
    id?: string;
}

const green = {
    100: "#B6F6EB",
    200: "#80EFDD",
    400: "#49E9CE",
    500: "var(--palm-primary)",
    600: "var(--palm-primary-dark)",
    900: "var(--palm-primary-darkest)",
};

const grey = {
    100: "#DBE6E4",
    200: "#CFDEDB",
    300: "#B7CDC9",
    400: "#93B4AE",
    500: "#79A29B",
    600: "#5C847E",
    700: "#43605C",
    800: "#2A3C3A",
    900: "#192423",
};

const StyledInputElement = styled("input")(
    ({ theme }) => `
  height: 40px;
  width: 70px;
  font-size: 0.875rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[100]};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 8px;
  padding: 12px 12px;

  &:hover {
    background: ${theme.palette.mode === "dark" ? "" : grey[100]};
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === "dark" ? green[600] : green[100]};
  }
`,
);

const CustomInput = React.forwardRef(function CustomInput(props: InputUnstyledProps, ref: React.ForwardedRef<HTMLDivElement>) {
    return <InputUnstyled components={{ Input: StyledInputElement }} {...props} required ref={ref} />;
});

export default function PalmInput({ ...props }: PalmInputProps) {
    return <CustomInput {...props} />;
}
