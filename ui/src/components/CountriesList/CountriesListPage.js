import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import CountriesList from "./CountriesList";
import Header from "./Header";
import Footer from "./Footer";
import countriesApiStyle from "../../styles/countries-api/countries-api.module.scss";

const CountriesListPage = ({ intl }) => {
    const title = intl.formatMessage({ id: "header.appTitle" });
    const subtitle = intl.formatMessage({ id: "countriesApi.subtitle" });

    return (
        <React.Fragment>
            <Header />
            <div
                id="content"
                className={[countriesApiStyle.content, "main"].join(" ")}
                role="main"
            >
                <div className={countriesApiStyle.wrapper}>
                    <section className={countriesApiStyle.section}>
                        <h1 className="sr-only">{title}</h1>
                        <h2 className="sr-only">{subtitle}</h2>
                        <CountriesList />
                    </section>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
};

CountriesListPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(CountriesListPage);
