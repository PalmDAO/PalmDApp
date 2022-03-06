import ReactDOM from "react-dom";
import Root from "./Root";
import store from "./store/store";
import { Provider } from "react-redux";
import { Web3ContextProvider } from "./hooks";
import { SnackbarProvider } from "notistack";
import SnackMessage from "./components/Messages/snackbar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.render(
    <SnackbarProvider
        maxSnack={4}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        content={(key, message: string) => <SnackMessage id={key} message={JSON.parse(message)} />}
        autoHideDuration={10000}
    >
        <Provider store={store}>
            <Web3ContextProvider>
                <Root />
            </Web3ContextProvider>
        </Provider>
    </SnackbarProvider>,
    document.getElementById("root"),
);
