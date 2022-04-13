import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import countriesListItemStyle from "../../styles/countries-api/countries-list-item.module.scss";

const CountriesListItem = ({ intl, data, darkMode }) => {
    const classes = [
        countriesListItemStyle.listItemContainer,
        darkMode
            ? countriesListItemStyle.listItemContainerDark
            : countriesListItemStyle.listItemContainerLight,
    ].filter(Boolean);
    return (
        <div className={classes.join(" ")}>
            <img src={data.flag} alt={`Flag of ${data.name}`} />
            <div className={countriesListItemStyle.listItemContent}>
                <h3>{data.name}</h3>
                <div className={countriesListItemStyle.listItemDetails}>
                    <div>
                        <strong>Population</strong>: {data.population}
                    </div>
                    <div>
                        <strong>Region</strong>: {data.region}
                    </div>
                    <div>
                        <strong>Capital</strong>: {data.capital}
                    </div>
                </div>
            </div>
        </div>
    );
};

CountriesListItem.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.shape({
        name: PropTypes.string,
        flag: PropTypes.string,
        capital: PropTypes.string,
        region: PropTypes.string,
        population: PropTypes.number,
    }).isRequired,
    darkMode: PropTypes.bool,
};

export default injectIntl(CountriesListItem);
