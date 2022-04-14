import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { GlobalContext } from "../../GlobalStateProvider";
import { axiosGet } from "./utils/api-helper";
import CountriesListItem from "./CountriesListItem";
import countriesListStyle from "../../styles/countries-api/countries-list.module.scss";

const CountriesList = ({ intl }) => {
    const { countriesApi: globalData } = useContext(GlobalContext);
    const currentTheme = globalData.darkMode;

    const [records, setRecords] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(null);

    const loadingLabel = intl.formatMessage({ id: "app.loading" });
    const emptyListLabel = intl.formatMessage({
        id: "countriesApi.countries.emptyList",
    });

    const listItemClasses = [
        countriesListStyle.listItem,
        currentTheme
            ? countriesListStyle.listItemDark
            : countriesListStyle.listItemLight,
    ].filter(Boolean);

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
                    <li
                        key={`country-${index}`}
                        className={listItemClasses.join(" ")}
                    >
                        <CountriesListItem data={country} />
                    </li>
                ))}
            </ul>
        ) : (
            emptyListLabel
        );
    };

    return isLoaded ? renderList() : renderLoading();
};

CountriesList.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(CountriesList);
