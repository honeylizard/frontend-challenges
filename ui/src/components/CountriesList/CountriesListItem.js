import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../GlobalStateProvider";
import countriesListItemStyle from "../../styles/countries-api/countries-list-item.module.scss";

const CountriesListItem = ({ intl, data }) => {
    const { countriesApi: globalData } = useContext(GlobalContext);
    const currentTheme = globalData.darkMode;

    const imageAlt = intl.formatMessage(
        {
            id: "countriesApi.countries.flagImageAlt",
        },
        {
            name: data.name,
        }
    );
    const populationLabel = intl.formatMessage({
        id: "countriesApi.countries.population",
    });
    const regionLabel = intl.formatMessage({
        id: "countriesApi.countries.region",
    });
    const capitalLabel = intl.formatMessage({
        id: "countriesApi.countries.capital",
    });

    const classes = [
        countriesListItemStyle.listItemContainer,
        currentTheme
            ? countriesListItemStyle.listItemContainerDark
            : countriesListItemStyle.listItemContainerLight,
    ].filter(Boolean);

    return (
        <div className={classes.join(" ")}>
            <Link
                to={`/frontend-challenges/countries-api/country/${data.alpha3Code}`}
            >
                <div className={countriesListItemStyle.listItemImage}>
                    <img src={data.flag} alt={imageAlt} />
                </div>
                <div className={countriesListItemStyle.listItemContent}>
                    <h3>{data.name}</h3>
                    <div className={countriesListItemStyle.listItemDetails}>
                        <div>
                            <strong>{populationLabel}</strong>:{" "}
                            {data.population}
                        </div>
                        <div>
                            <strong>{regionLabel}</strong>: {data.region}
                        </div>
                        <div>
                            <strong>{capitalLabel}</strong>: {data.capital}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

CountriesListItem.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.shape({
        alpha3Code: PropTypes.string.isRequired,
        name: PropTypes.string,
        flag: PropTypes.string,
        capital: PropTypes.string,
        region: PropTypes.string,
        population: PropTypes.number,
    }).isRequired,
};

export default injectIntl(CountriesListItem);
