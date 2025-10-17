import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../GlobalStateProvider";
import countriesListItemStyle from "../../styles/countries-api/countries-list-item.module.scss";
import CountryDataPoint from "./CountryDataPoint";
import LazyImage from "./common/LazyImage";

const CountriesListItem = ({ intl, data }) => {
    const { countriesApi: globalData } = useContext(GlobalContext);
    const currentTheme = globalData.darkMode;

    const linkTooltip = intl.formatMessage(
        {
            id: "countriesApi.countries.linkTooltip",
        },
        {
            name: data.name,
        }
    );
    const imageAlt = intl.formatMessage(
        {
            id: "countriesApi.countries.flagImageAlt",
        },
        {
            name: data.name,
        }
    );

    const classes = [
        countriesListItemStyle.listItemContainer,
        currentTheme ? countriesListItemStyle.listItemContainerDark : countriesListItemStyle.listItemContainerLight,
    ].filter(Boolean);

    return (
        <div className={classes.join(" ")}>
            <Link to={`/frontend-challenges/countries-api/country/${data.alpha3Code}`} title={linkTooltip}>
                <div className={countriesListItemStyle.listItemImage}>
                    <LazyImage
                        src={data.flag}
                        alt={imageAlt}
                        placeholderImage={process.env.PUBLIC_URL + "/assets/flag_placeholder.jpg"}
                    />
                </div>
                <div className={countriesListItemStyle.listItemContent}>
                    <h3>{data.name}</h3>
                    <div className={countriesListItemStyle.listItemDetails}>
                        <CountryDataPoint value={data.population} labelIntlId="countriesApi.countries.population" />
                        <CountryDataPoint value={data.region} labelIntlId="countriesApi.countries.region" />
                        <CountryDataPoint value={data.capital} labelIntlId="countriesApi.countries.capital" />
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
