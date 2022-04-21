import React, { useEffect, useState } from "react";
import App from "./App";
import { HashRouter } from "react-router-dom";
import Loading from "../components/Loader";

function Root() {
    const [loading, setLoading] = useState(false);

    if (loading) return <Loading />;

    const app = () => (
        <HashRouter>
            <App />
        </HashRouter>
    );

    return app();
}

export default Root;

// it could be your App.tsx file or theme file that is included in your tsconfig.json
import { Theme } from "@mui/material/styles";

declare module "@mui/styles/defaultTheme" {
    interface DefaultTheme extends Theme {}
}
