import { createSlice } from "@reduxjs/toolkit";

export interface IProposal {
    proposalId: string;
    description: string;
    propose: any;
    targets: any;
    values: any;
    signatures: any;
    calldatas: any;
    startBlock: any;
    endBlock: any;
}

export interface IProposals {
    proposals: IProposal[];
}

const initialState: IProposals = {
    proposals: [],
};

const proposalsSlice = createSlice({
    name: "proposals",
    initialState,
    reducers: {
        setProposals(state, action) {
            state.proposals = action.payload;
        },
        addProposal(state, action) {
            state.proposals.push(action.payload);
        },
        removeProposal(state, action) {
            state.proposals = state.proposals.filter(proposal => proposal.proposalId !== action.payload);
        },
    },
});

export const { addProposal, removeProposal, setProposals } = proposalsSlice.actions;
export default proposalsSlice.reducer;
