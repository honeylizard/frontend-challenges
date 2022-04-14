import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { axiosGet } from "./utils/api-helper";
import countryDetailsStyle from "../../styles/countries-api/country-details.module.scss";
import PageTemplate from "./PageTemplate";

const CountryDetailsPage = ({ intl }) => {
    const params = useParams();
    const [id, setId] = useState(null);
    const [record, setRecord] = useState(null);
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

    const renderLoading = () => {
        const loadingLabel = intl.formatMessage({ id: "app.loading" });
        return (
            <div className={countryDetailsStyle.loadingContainer}>
                {loadError || loadingLabel}
            </div>
        );
    };

    const renderDetails = (data) => {
        console.log("record", data);
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

        return (
            <div className={countryDetailsStyle.detailContainer}>
                <div className={countryDetailsStyle.detailImage}>
                    <img src={record.flag} alt={imageAlt} />
                </div>
                <div className={countryDetailsStyle.detailContent}>
                    <h3>{record.name}</h3>
                    <div className={countryDetailsStyle.listItemDetails}>
                        <div>
                            <strong>{populationLabel}</strong>:{" "}
                            {record.population}
                        </div>
                        <div>
                            <strong>{regionLabel}</strong>: {record.region}
                        </div>
                        <div>
                            <strong>{capitalLabel}</strong>: {record.capital}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <PageTemplate>
            <section className={countryDetailsStyle.section}>
                <Link to="/frontend-challenges/countries-api">Back</Link>
                {isLoaded ? renderDetails(record) : renderLoading()}
            </section>
        </PageTemplate>
    );
};

CountryDetailsPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(CountryDetailsPage);
