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
