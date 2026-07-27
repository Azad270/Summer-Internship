import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/800.css";
import "@fontsource/rajdhani/400.css";
import "@fontsource/rajdhani/500.css";
import "@fontsource/rajdhani/600.css";
import "@fontsource/rajdhani/700.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import "./styles/global.css";
import "./styles/designSystem.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>

        <UserProvider>

            <App />

        </UserProvider>

    </BrowserRouter>
);