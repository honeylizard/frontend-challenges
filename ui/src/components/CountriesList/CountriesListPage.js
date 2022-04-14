import React, { useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import CountriesList from "./CountriesList";
import countriesApiStyle from "../../styles/countries-api/countries-api.module.scss";
import Header from "./Header";
import Footer from "./Footer";

const CountriesListPage = ({ intl }) => {
    const [darkMode, setDarkMode] = useState(true);

    const title = intl.formatMessage({ id: "header.appTitle" });
    const subtitle = intl.formatMessage({ id: "countriesApi.subtitle" });

    const handleThemeToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <React.Fragment>
            <Header currentTheme={darkMode} changeTheme={handleThemeToggle} />
            <div
                id="content"
                className={[countriesApiStyle.content, "main"].join(" ")}
                role="main"
            >
                <div className={countriesApiStyle.wrapper}>
                    <section className={countriesApiStyle.section}>
                        <h1 className="sr-only">{title}</h1>
                        <h2 className="sr-only">{subtitle}</h2>
                        <CountriesList darkMode={darkMode} />
                    </section>
                </div>
            </div>
            <Footer currentTheme={darkMode} />
        </React.Fragment>
    );
};

CountriesListPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(CountriesListPage);
