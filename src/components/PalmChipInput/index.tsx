import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import SelectUnstyled, { SelectUnstyledProps, SelectOption } from "@mui/base/SelectUnstyled";
import { selectUnstyledClasses } from "@mui/base/SelectUnstyled";
import OptionUnstyled, { optionUnstyledClasses } from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { IProposalAssets, addAsset } from "../../store/slices/proposal-creation-slice";
import { IReduxState } from "../../store/slices/state.interface";

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

const StyledButton = styled("button")(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    height: 40px;
    min-height: calc(1.5em + 22px);
    min-width: 105px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
    border-radius: 0.75em;
    margin: 0.5em;
    text-align: left;
    margin-left: 0;
    line-height: 1.5;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  
    &:hover {
      background: ${theme.palette.mode === "dark" ? "" : grey[100]};
      border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
  
    &.${selectUnstyledClasses.focusVisible} {
      outline: 3px solid ${theme.palette.mode === "dark" ? green[600] : green[100]};
    }
  
    &.${selectUnstyledClasses.expanded} {
      &::after {
        content: '▴';
      }
    }
  
    &::after {
      content: '▾';
      float: right;
      line-height: 32px;
    }
    `,
);

const StyledListbox = styled("ul")(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 5px;
    margin: 10px 0;
    min-width: 105px;
    height: 200px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
    border-radius: 0.75em;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    overflow: auto;
    outline: 0px;
    `,
);

const StyledOption = styled(OptionUnstyled)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 0.45em;
    cursor: default;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${optionUnstyledClasses.selected} {
      background-color: ${theme.palette.mode === "dark" ? green[900] : green[100]};
      color: ${theme.palette.mode === "dark" ? green[100] : green[900]};
    }
  
    &.${optionUnstyledClasses.highlighted} {
      background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
  
    &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
      background-color: ${theme.palette.mode === "dark" ? green[900] : green[100]};
      color: ${theme.palette.mode === "dark" ? green[100] : green[900]};
    }
  
    &.${optionUnstyledClasses.disabled} {
      color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${optionUnstyledClasses.disabled}) {
      background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
    `,
);

const StyledPopper = styled(PopperUnstyled)`
    z-index: 1;
`;

const Popper = (props: any) => {
    return (
        <StyledPopper
            onKeyPress={e => console.log(e)}
            modifiers={{
                preventOverflow: {
                    // tried these individually and in various combinations:
                    enabled: false,
                    boundariesElement: "window",
                    escapeWithReference: true,
                },
            }}
            container={document.body}
            anchorEl={document.body}
            {...props}
        />
    );
};

const CustomSelect = React.forwardRef(function CustomSelect(props: SelectUnstyledProps<number>, ref: React.ForwardedRef<any>) {
    const components: SelectUnstyledProps<number>["components"] = {
        Root: StyledButton,
        Listbox: StyledListbox,
        Popper,
        ...props.components,
    };

    return <SelectUnstyled {...props} ref={ref} components={components} />;
});

interface PalmChipInputProps {
    onChange: (value: any, id: string) => void;
    id: string;
    coins: any[];
}

export default function PalmChipInput({ onChange, id, coins }: PalmChipInputProps) {
    const assets = useSelector<IReduxState, IProposalAssets[]>(state => {
        return state.proposalCreation.assets;
    });

    let [selectedCoin, setSelectedCoin] = useState({ name: "" });

    const filteredCoins = coins.filter(coin => !assets.some(asset => asset.name === coin.name) || selectedCoin.name === coin.name);

    console.log(selectedCoin);

    return (
        <div>
            <CustomSelect
                onChange={(event: any) => onChange(event, id)}
                renderValue={(option: SelectOption<any> | null) => {
                    if (option == null) {
                        return <Chip label={"Select"}></Chip>;
                    } else {
                        setSelectedCoin(option!.value);
                        return <Chip avatar={<Avatar src={option.value.image} />} label={option.value.symbol.toUpperCase()}></Chip>;
                    }
                }}
            >
                {filteredCoins.map((coin: any) => (
                    <StyledOption sx={{ display: "flex", alignItems: "center", gap: "1rem" }} value={coin}>
                        <Chip avatar={<Avatar src={coin.image} />} label={coin.symbol.toUpperCase()}></Chip>
                    </StyledOption>
                ))}
            </CustomSelect>
        </div>
    );
}
