import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import lodash from "lodash";
import { GlobalContext } from "../../GlobalStateProvider";
import { axiosGet } from "./utils/api-helper";
import CountriesListItem from "./CountriesListItem";
import countriesListStyle from "../../styles/countries-api/countries-list.module.scss";
import Loading from "./common/Loading";
import CountriesFilterForm from "./CountriesFilterForm";

const CountriesList = ({ intl }) => {
    const { countriesApi: globalData } = useContext(GlobalContext);
    const currentTheme = globalData.darkMode;
    const currentFilters = globalData.currentFilters;

    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [regionOptions, setRegionOptions] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(null);

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
                setRegionOptions([
                    ...new Set(response.map((item) => item.region)),
                ]);
                setIsLoaded(true);
            })
            .catch((error) => {
                console.error("error", error);
                setLoadError(error.message);
            });
    }, []);

    useEffect(() => {
        const filteredByName = records.filter((country) =>
            currentFilters?.name ? country.name === currentFilters?.name : true
        );
        const filterByRegion = filteredByName.filter((country) =>
            currentFilters?.region
                ? country.region === currentFilters?.region
                : true
        );
        setFilteredRecords(lodash.orderBy(filterByRegion, ["name"], ["asc"]));
    }, [currentFilters, records]);

    const renderList = () => {
        return (
            <React.Fragment>
                <CountriesFilterForm regionOptions={regionOptions} />
                {filteredRecords && filteredRecords.length > 0 ? (
                    <ul className={countriesListStyle.list}>
                        {filteredRecords.map((country, index) => (
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
                )}
            </React.Fragment>
        );
    };

    // TODO: lazy load to prevent slow rendering?

    return isLoaded ? (
        renderList()
    ) : (
        <Loading
            customMessage={loadError}
            customClasses={countriesListStyle.loadingContainer}
        />
    );
};

CountriesList.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(CountriesList);
