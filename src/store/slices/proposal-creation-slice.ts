import { createSlice } from "@reduxjs/toolkit";

export interface IProposalAssets {
    id: string;
    name: string;
    image: string;
    symbol: string;
    allocation: number;
}

export interface IProposalCreation {
    id: string;
    assets: IProposalAssets[];
    proposalName: string;
    proposalDescription: string;
}

const initialState: IProposalCreation = {
    id: "",
    assets: [],
    proposalName: "",
    proposalDescription: "",
};

const proposalsCreationSlice = createSlice({
    name: "proposalCreation",
    initialState,
    reducers: {
        setProposal(state, action) {
            state.id = action.payload.id;
            state.proposalName = action.payload.proposalName;
            state.proposalDescription = action.payload.proposalDescription;
            state.assets = action.payload.assets;
        },
        resetProposal(state) {
            state.id = "";
            state.proposalName = "";
            state.proposalDescription = "";
            state.assets = [];
        },
        addAsset(state, action) {
            state.assets.push(action.payload);
        },
        removeAsset(state, action) {
            state.assets = state.assets.filter(asset => asset.id !== action.payload);
        },
        updateAsset(state, action) {
            const asset = state.assets.find(asset => asset.id === action.payload.id);
            if (asset) {
                asset.name = action.payload.name;
                asset.symbol = action.payload.symbol;
                asset.image = action.payload.symbol;
            }
            state.assets = [...state.assets];
        },
        updateAllocation(state, action) {
            const asset = state.assets.find(asset => asset.id === action.payload.id);

            if (asset) {
                asset.allocation = action.payload.allocation;
            }
        },
    },
});

export const { setProposal, resetProposal, addAsset, removeAsset, updateAsset, updateAllocation } = proposalsCreationSlice.actions;
export default proposalsCreationSlice.reducer;
