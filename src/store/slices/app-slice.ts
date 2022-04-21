import { ethers } from "ethers";
import { getAddresses } from "../../constants";
import { PalmContract, WhaleContract } from "../../abi";
import { setAll } from "../../helpers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { getTokenPrice } from "../../helpers";
import { RootState } from "../store";

interface ILoadAppDetails {
    networkID: number;
    provider: JsonRpcProvider;
}

export const loadAppDetails = createAsyncThunk(
    "app/loadAppDetails",
    //@ts-ignore
    async ({ networkID, provider }: ILoadAppDetails) => {
        const addresses = getAddresses(networkID);
        const currentBlock = await provider.getBlockNumber();
        const palmContract = new ethers.Contract(addresses.PALM_ADDRESS, PalmContract, provider);
        const totalSupply = (await palmContract.totalSupply()) / Math.pow(10, 9);

        return {
            totalSupply,
            currentBlock,
        };
    },
);

const initialState = {
    loading: true,
    showDrawer: false,
};

export interface IAppSlice {
    showDrawer: boolean;
    loading: boolean;
    marketPrice: number;
    marketCap: number;
    currentBlock: number;
    treasuryBalance: number;
    networkID: number;
    totalSupply: number;
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        fetchAppSuccess(state, action) {
            setAll(state, action.payload);
        },
        toggleDrawer(state) {
            state.showDrawer = !state.showDrawer;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadAppDetails.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loadAppDetails.fulfilled, (state, action) => {
                setAll(state, action.payload);
                state.loading = false;
            })
            .addCase(loadAppDetails.rejected, (state, { error }) => {
                state.loading = false;
                console.log(error);
            });
    },
});

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess, toggleDrawer } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
