import React, { useState } from "react";
import { ListItem, ListItemProps, ListItemText, Divider, Stack, Box, IconButton } from "@mui/material";
import PalmInput from "../PalmInput";
import styled from "@emotion/styled";
import { IProposalAssets, removeAsset } from "../../store/slices/proposal-creation-slice";
import DeleteIcon from "@mui/icons-material/Delete";
import PalmChipInput from "../PalmChipInput";
import { useDispatch } from "react-redux";
import { updateAsset, updateAllocation } from "src/store/slices/proposal-creation-slice";
import { getTopCoinsByMarketCap } from "../../helpers/token-price";
import { useAsync } from "react-async-hook";

interface CustomListItemProps extends ListItemProps {
    secondary?: boolean;
}

const CustomListItem = styled(ListItem, {
    shouldForwardProp: prop => prop !== "secondary",
})<CustomListItemProps>(
    ({ theme, secondary }) => `
    background: black;
    ${secondary && "background: rgba(255, 255, 255, 0.08);"}    
    box-sizing: border-box;
    height: 60px;
`,
);

interface AssetsListProps {
    assets: IProposalAssets[];
}

export default function AssetsList({ assets }: AssetsListProps) {
    const dispatch = useDispatch();

    const deleteHandler = (id: string) => {
        dispatch(removeAsset(id));
    };

    const handleChange = (event: any, id: string) => {
        dispatch(
            updateAsset({
                id,
                image: event.image,
                name: event.name,
                symbol: event.symbol,
            }),
        );
    };

    const onChange = (event: any, id: string) => {
        const input = event.target;
        const value = input.value;

        if (value.length >= 4) {
            input.value = value.slice(0, 3);
        }

        dispatch(updateAllocation({ id, allocation: Number(input.value) }));
    };

    const [coins, setCoins] = useState([]);
    useAsync(async () => {
        const coinsByMarketCap = await getTopCoinsByMarketCap();
        setCoins(coinsByMarketCap);
    }, []);

    return (
        <Box sx={{ flexGrow: "1" }}>
            {assets.map((asset, index) => (
                <React.Fragment>
                    <CustomListItem key="Bitcoin">
                        <Stack sx={{ alignItems: "center", width: "100%" }} direction="row" spacing={1}>
                            <PalmChipInput id={(index + 1).toString()} onChange={handleChange} coins={coins}></PalmChipInput>
                            <ListItemText primary={asset.name} />
                        </Stack>
                    </CustomListItem>
                    <Divider />
                    <CustomListItem secondary key={`${asset.symbol}-allocation`}>
                        <Stack sx={{ alignItems: "center", width: "100%" }} direction="row" spacing={1}>
                            <ListItemText sx={{ flexGrow: "0" }} secondary="Weight" />
                            <PalmInput
                                id={(index + 1).toString()}
                                onChange={ev => onChange(ev, (index + 1).toString())}
                                type="number"
                                required
                                aria-label="Asset Weight"
                                placeholder="100%"
                            />
                            <Box sx={{ flexGrow: "1", display: "flex", justifyContent: "flex-end" }}>
                                <IconButton onClick={() => deleteHandler(assets[index].id)} aria-label="delete">
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Stack>
                    </CustomListItem>
                    <Divider />
                </React.Fragment>
            ))}
        </Box>
    );
}
