import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import CountriesList from "./CountriesList";
import countriesApiStyle from "../../styles/countries-api/countries-api.module.scss";
import PageTemplate from "./PageTemplate";

const CountriesListPage = ({ intl }) => {
    const title = intl.formatMessage({ id: "header.appTitle" });
    const subtitle = intl.formatMessage({ id: "countriesApi.subtitle" });

    return (
        <PageTemplate>
            <section className={countriesApiStyle.section}>
                <h1 className="sr-only">{title}</h1>
                <h2 className="sr-only">{subtitle}</h2>
                <CountriesList />
            </section>
        </PageTemplate>
    );
};

CountriesListPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(CountriesListPage);
