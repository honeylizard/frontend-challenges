import React, { useState, useEffect, useContext, Suspense } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import lodash from "lodash";
import { GlobalContext } from "../../GlobalStateProvider";
import { axiosGet } from "./utils/api-helper";
import countriesListStyle from "../../styles/countries-api/countries-list.module.scss";
import Loading from "./common/Loading";
import CountriesFilterForm from "./CountriesFilterForm";

const CountriesListItem = React.lazy(() => import("./CountriesListItem"));

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
        currentTheme ? countriesListStyle.listItemDark : countriesListStyle.listItemLight,
    ].filter(Boolean);

    useEffect(() => {
        axiosGet(`https://restcountries.com/v2/all?fields=region,name,alpha3Code,flag,population,capital`)
            .then((response) => {
                setRecords(response);
                setRegionOptions([...new Set(response.map((item) => item.region))]);
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
            currentFilters?.region ? country.region === currentFilters?.region : true
        );
        setFilteredRecords(lodash.orderBy(filterByRegion, ["name"], ["asc"]));
    }, [currentFilters, records]);

    const renderPlaceholderItem = () => {
        const placeholderImage = "/assets/flag_placeholder.jpg";
        const contentLabel = intl.formatMessage({
            id: "countriesApi.countries.loadingSingle",
        });
        return (
            <div className={countriesListStyle.placeholderBox}>
                <img src={placeholderImage} alt="" role="presentation" />
                <div className={countriesListStyle.placeholderBoxContent}>{contentLabel}</div>
            </div>
        );
    };

    const renderList = () => {
        return (
            <React.Fragment>
                <CountriesFilterForm regionOptions={regionOptions} />
                {filteredRecords && filteredRecords.length > 0 ? (
                    <ul className={countriesListStyle.list}>
                        {filteredRecords.map((country, index) => (
                            <li key={`country-${index}`} className={listItemClasses.join(" ")}>
                                <Suspense fallback={renderPlaceholderItem()}>
                                    <CountriesListItem data={country} />
                                </Suspense>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className={countriesListStyle.listEmpty}>{emptyListLabel}</div>
                )}
            </React.Fragment>
        );
    };

    return isLoaded ? (
        renderList()
    ) : (
        <Loading customMessage={loadError} customClasses={countriesListStyle.loadingContainer} />
    );
};

CountriesList.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(CountriesList);
