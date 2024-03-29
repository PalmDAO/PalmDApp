import { IPendingTxn } from "./pending-txns-slice";
import { IAccountSlice } from "./account-slice";
import { IAppSlice } from "./app-slice";
import { MessagesState } from "./messages-slice";
import { IProposalCreation } from "./proposal-creation-slice";
import { IProposals } from "./proposals-slice";

export interface IReduxState {
    pendingTransactions: IPendingTxn[];
    account: IAccountSlice;
    app: IAppSlice;
    messages: MessagesState;
    proposalCreation: IProposalCreation;
    proposals: IProposals;
}
