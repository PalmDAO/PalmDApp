import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./slices/account-slice";
import appReducer from "./slices/app-slice";
import pendingTransactionsReducer from "./slices/pending-txns-slice";
import messagesReducer from "./slices/messages-slice";
import proposalsCreationReducer from "./slices/proposal-creation-slice";
import proposalsReducer from "./slices/proposals-slice";

const store = configureStore({
    reducer: {
        account: accountReducer,
        app: appReducer,
        pendingTransactions: pendingTransactionsReducer,
        messages: messagesReducer,
        proposalCreation: proposalsCreationReducer,
        proposals: proposalsReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
