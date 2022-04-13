import React from "react";
import ReactDOM from "react-dom";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import * as serviceWorker from "./serviceWorker";

// Styling
import "./styles/_core.scss";

// Routes
import routes from "./routes.js";

// Localization
import { IntlProvider } from "react-intl";
import messages_en from "./translations/en.json";

// Localization Init
const messages = {
    en: messages_en,
};

const language = navigator.language.split(/[-_]/)[0]; // language without region code

// Adds Validation against axe-core accessibility testing library
if (process.env.NODE_ENV !== "production") {
    const axe = require("react-axe");
    axe(React, ReactDOM, 1000);
}

// App init
ReactDOM.render(
    <IntlProvider locale={language} messages={messages[language]}>
        <div className="appContainer">
            <BrowserRouter>
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
            </BrowserRouter>
        </div>
    </IntlProvider>,
    document.getElementById("root")
);

serviceWorker.unregister();
