import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { axiosGet } from "./utils/api-helper";
import { renderListAsCommaSeperatedText } from "./utils/common";
import { GlobalContext } from "../../GlobalStateProvider";
import countryDetailsStyle from "../../styles/countries-api/country-details.module.scss";
import PageTemplate from "./PageTemplate";
import Loading from "./Loading";
import CountryDataPoint from "./CountryDataPoint";

const CountryDetailsPage = ({ intl }) => {
    const { countriesApi: globalData } = useContext(GlobalContext);
    const currentTheme = globalData.darkMode;

    const params = useParams();
    const [id, setId] = useState(null);
    const [record, setRecord] = useState(null);
    const [borderCountries, setBorderCountries] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        setId(params.id);
    }, [params]);

    useEffect(() => {
        if (id) {
            axiosGet(`https://restcountries.com/v2/alpha/${id}`)
                .then((response) => {
                    setRecord(response);
                    setIsLoaded(true);
                })
                .catch((error) => {
                    console.error("error", error);
                    setLoadError(error.message);
                });
        }
    }, [id]);

    useEffect(() => {
        if (id && record && record.borders && record.borders.length > 0) {
            const borderCountryCodes = record.borders;
            axiosGet(
                `https://restcountries.com/v2/alpha?codes=${borderCountryCodes.join(
                    ","
                )}`
            )
                .then((response) => {
                    const names = response.map((country) => {
                        return {
                            name: country.name,
                            code: country.alpha3Code,
                        };
                    });
                    setBorderCountries(names);
                    setIsLoaded(true);
                })
                .catch((error) => {
                    console.error("error", error);
                    setLoadError(error.message);
                });
        }
    }, [id, record]);

    const renderBackButton = () => {
        const backLabel = intl.formatMessage({
            id: "countriesApi.back",
        });
        const classes = [
            countryDetailsStyle.linkButton,
            currentTheme
                ? countryDetailsStyle.linkButtonDark
                : countryDetailsStyle.linkButtonLight,
        ].filter(Boolean);

        return (
            <Link
                to="/frontend-challenges/countries-api"
                className={classes.join(" ")}
            >
                <FontAwesomeIcon icon={faArrowLeftLong} aria-hidden="true" />
                &nbsp; {backLabel}
            </Link>
        );
    };

    const renderBorderCountry = (data) => {
        const linkTooltip = intl.formatMessage(
            {
                id: "countriesApi.countries.linkTooltip",
            },
            {
                name: data.name,
            }
        );

        const classes = [
            countryDetailsStyle.linkButton,
            currentTheme
                ? countryDetailsStyle.linkButtonDark
                : countryDetailsStyle.linkButtonLight,
        ].filter(Boolean);

        return (
            <Link
                to={`/frontend-challenges/countries-api/country/${data.code}`}
                title={linkTooltip}
                className={classes.join(" ")}
            >
                {data.name}
            </Link>
        );
    };

    const renderDetails = (data) => {
        const imageAlt = intl.formatMessage(
            {
                id: "countriesApi.countries.flagImageAlt",
            },
            {
                name: data.name,
            }
        );
        const borderCountriesLabel = intl.formatMessage({
            id: "countriesApi.countries.borderCountries",
        });

        return (
            <div className={countryDetailsStyle.detailContainer}>
                <div className={countryDetailsStyle.detailImage}>
                    <img src={record.flag} alt={imageAlt} />
                </div>
                <div className={countryDetailsStyle.detailContent}>
                    <h1 className={countryDetailsStyle.title}>{record.name}</h1>
                    <div className={countryDetailsStyle.listItemDetails}>
                        <div className={countryDetailsStyle.listColumn}>
                            <CountryDataPoint
                                value={data.nativeName}
                                labelIntlId="countriesApi.countries.nativeName"
                            />
                            <CountryDataPoint
                                value={data.population}
                                labelIntlId="countriesApi.countries.population"
                            />
                            <CountryDataPoint
                                value={data.region}
                                labelIntlId="countriesApi.countries.region"
                            />
                            <CountryDataPoint
                                value={data.subregion}
                                labelIntlId="countriesApi.countries.subregion"
                            />
                            <CountryDataPoint
                                value={data.capital}
                                labelIntlId="countriesApi.countries.capital"
                            />
                        </div>
                        <div className={countryDetailsStyle.listColumn}>
                            <CountryDataPoint
                                value={renderListAsCommaSeperatedText(
                                    data.topLevelDomain
                                )}
                                labelIntlId="countriesApi.countries.topLevelDomain"
                            />
                            <CountryDataPoint
                                value={renderListAsCommaSeperatedText(
                                    data.currencies,
                                    "name"
                                )}
                                labelIntlId="countriesApi.countries.currencies"
                            />
                            <CountryDataPoint
                                value={renderListAsCommaSeperatedText(
                                    data.languages,
                                    "name"
                                )}
                                labelIntlId="countriesApi.countries.languages"
                            />
                        </div>
                    </div>
                    {borderCountries && borderCountries.length > 0 && (
                        <div
                            className={
                                countryDetailsStyle.borderCountriesListContainer
                            }
                        >
                            <strong>{borderCountriesLabel}</strong>:{" "}
                            <ul
                                className={
                                    countryDetailsStyle.borderCountriesList
                                }
                            >
                                {borderCountries.map((country, index) => (
                                    <li key={`border-country-${index}`}>
                                        {renderBorderCountry(country)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <PageTemplate>
            <section className={countryDetailsStyle.section}>
                {renderBackButton()}
                {isLoaded ? (
                    renderDetails(record)
                ) : (
                    <Loading
                        customMessage={loadError}
                        customClasses={countryDetailsStyle.loadingContainer}
                    />
                )}
            </section>
        </PageTemplate>
    );
};

CountryDetailsPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(CountryDetailsPage);
