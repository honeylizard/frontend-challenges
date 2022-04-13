import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import countriesListStyle from "../../styles/countries-api/countries-list.module.scss";
import { axiosGet } from "./utils/api-helper";
import CountriesListItem from "./CountriesListItem";

const CountriesList = ({ intl, darkMode }) => {
    const [records, setRecords] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(null);

    const loadingLabel = intl.formatMessage({ id: "app.loading" });

    useEffect(() => {
        axiosGet(`https://restcountries.com/v2/all`)
            .then((response) => {
                setRecords(response);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.error("error", error);
                setLoadError(error.message);
            });
    }, []);

    const renderLoading = () => (
        <div className={countriesListStyle.loadingContainer}>
            {loadError || loadingLabel}
        </div>
    );

    const renderList = () => {
        return records && records.length > 0 ? (
            <ul className={countriesListStyle.list}>
                {records.map((country, index) => (
                    <li key={`country-${index}`}>
                        <CountriesListItem data={country} darkMode={darkMode} />
                    </li>
                ))}
            </ul>
        ) : (
            "No records available"
        );
    };

    return isLoaded ? renderList() : renderLoading();
};

CountriesList.propTypes = {
    intl: PropTypes.object.isRequired,
    darkMode: PropTypes.bool,
};

export default injectIntl(CountriesList);
