import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";

import { amountWithUnitOfMeasure, temperatureAmount } from "../utils/common";
import DataCard from "../common/DataCard";
import CurrentCard from "../common/CurrentCard";
import { GlobalContext } from "../../../GlobalStateProvider";

import styles from "../../../styles/weather-app/current-section.module.scss";

const CurrentSection = ({ intl }) => {
    const { weatherApp: globalData } = useContext(GlobalContext);
    const {
        isLoading = true,
        configData: config = {},
        currentWeatherData: data,
        currentLocation: location,
    } = globalData;

    const { locale = "en-US" } = useIntl();

    const titleLabel = intl.formatMessage({
        id: "weatherApp.current.title",
    });

    const precipitationLabel = intl.formatMessage({
        id: "weatherApp.precipitation",
    });
    const humidityLabel = intl.formatMessage({
        id: "weatherApp.humidity",
    });
    const windLabel = intl.formatMessage({
        id: "weatherApp.wind",
    });
    const feelsLikeLabel = intl.formatMessage({
        id: "weatherApp.feels_like",
    });

    const kmhLabel = intl.formatMessage({
        id: "weatherApp.units.kmh",
    });
    const mphLabel = intl.formatMessage({
        id: "weatherApp.units.mph",
    });
    const mmLabel = intl.formatMessage({
        id: "weatherApp.units.mm",
    });
    const inchLabel = intl.formatMessage({
        id: "weatherApp.units.inch",
    });

    const classes = [styles.primaryCard];

    if (isLoading) {
        classes.push(styles.loading);
    }

    const getUnit = (label, title) => {
        return (
            <>
                {" "}
                <dfn title={title}>{label}</dfn>
            </>
        );
    };

    return (
        <section className={styles.current}>
            <h3 className="sr-only">{titleLabel}</h3>
            <div className={styles.primaryCard}>
                <CurrentCard
                    isLoading={isLoading}
                    dateTime={data?.dateTime}
                    location={location}
                    condition={data?.condition}
                    temperature={data?.temperature}
                    config={config}
                />
            </div>
            <div className={styles.secondaryCardList}>
                <DataCard
                    isLoading={isLoading}
                    label={feelsLikeLabel}
                    value={temperatureAmount(data?.feelsLike, config.temperature_unit, locale, intl.formatMessage)}
                />
                <DataCard
                    isLoading={isLoading}
                    label={humidityLabel}
                    value={amountWithUnitOfMeasure(data?.humidity, "%", locale)}
                />
                <DataCard
                    isLoading={isLoading}
                    label={windLabel}
                    value={amountWithUnitOfMeasure(
                        data?.wind,
                        getUnit(config?.wind_speed_unit, config?.wind_speed_unit === "kmh" ? kmhLabel : mphLabel),
                        locale
                    )}
                />
                <DataCard
                    isLoading={isLoading}
                    label={precipitationLabel}
                    value={amountWithUnitOfMeasure(
                        data?.precipitation,
                        getUnit(config?.precipitation_unit, config?.precipitation_unit === "mm" ? mmLabel : inchLabel),
                        locale
                    )}
                />
            </div>
        </section>
    );
};

CurrentSection.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(CurrentSection);
