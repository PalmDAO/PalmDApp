import { Networks } from "./blockchain";

const ETH_MAINNET = {
    PALM_ADDRESS: "0xEC189C53D7FA727575bF48BE40039679e923BCB2",
    WHALE_GOVERNOR_ADDRESS: "0xED74b8F16502D1165F52cD1545F0484B733591f8",
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.ETH) return ETH_MAINNET;

    throw Error("Network don't support");
};
