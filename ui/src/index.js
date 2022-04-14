import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Routes, HashRouter, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import * as serviceWorker from "./serviceWorker";

// Styling
import "./styles/_core.scss";

// Routes
import routes from "./routes.js";

// Localization
import { IntlProvider } from "react-intl";
import messages_en from "./translations/en.json";
import { GlobalProvider } from "./GlobalStateProvider";

// Localization Init
const messages = {
    en: messages_en,
};

const language = navigator.language.split(/[-_]/)[0]; // language without region code

// Adds Validation against axe-core accessibility testing library
if (process.env.NODE_ENV !== "production") {
    const { default: axe } = require("@axe-core/react");
    axe(React, ReactDOM, 1000);
}

// App init
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <IntlProvider locale={language} messages={messages[language]}>
        <GlobalProvider>
            <div className="appContainer">
                <HashRouter basename="/">
                    <Helmet
                        htmlAttributes={{
                            lang: navigator.language,
                        }}
                    />
                    <Routes>
                        {routes.map((route, key) => (
                            <Route
                                key={key}
                                path={route.path}
                                exact={route.exact}
                                element={<route.component />}
                            />
                        ))}
                    </Routes>
                </HashRouter>
            </div>
        </GlobalProvider>
    </IntlProvider>
);

serviceWorker.unregister();
