import React from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";

import { amountWithUnitOfMeasure, dateWithWeekDayOnly, temperatureAmount } from "./utils/common";
import WeatherCondition from "./WeatherCondition";

import appStyles from "../../styles/weather-app/app.module.scss";

const WeatherCurrent = ({ intl, data, location, config }) => {
    const { locale = "en-US" } = useIntl();

    const titleLabel = intl.formatMessage({
        id: "weatherApp.current.title",
    });
    const temperatureLabel = intl.formatMessage({
        id: "weatherApp.temperature",
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
    const locationLabel = intl.formatMessage({
        id: "weatherApp.location",
    });
    const feelsLikeLabel = intl.formatMessage({
        id: "weatherApp.feels_like",
    });
    const dateLabel = intl.formatMessage({
        id: "weatherApp.date",
    });

    if (!data || !location || !config) return null;

    return (
        <section className={appStyles.currentWeather}>
            <h3 className="sr-only">{titleLabel}</h3>
            <div className={appStyles.primaryCard}>
                <div className={appStyles.primaryLeft}>
                    <div className={appStyles.location}>
                        <span className="sr-only">{locationLabel}: </span>
                        {location?.name}
                    </div>
                    <div className={appStyles.timestamp}>
                        <span className="sr-only">{dateLabel}: </span>
                        {dateWithWeekDayOnly(data?.dateTime)}
                    </div>
                </div>
                <div className={appStyles.primaryRight}>
                    {!!data?.condition && <WeatherCondition data={data?.condition} />}
                    <div className={appStyles.temperature}>
                        <span className="sr-only">{temperatureLabel}: </span>
                        {temperatureAmount(data?.temperature, config.temperature_unit, locale)}
                    </div>
                </div>
            </div>
            <div className={appStyles.secondaryCardList}>
                <div className={appStyles.secondaryCard}>
                    <div className={appStyles.label}>{feelsLikeLabel}</div>
                    <div className={appStyles.value}>
                        {temperatureAmount(data?.feelsLike, config.temperature_unit, locale)}
                    </div>
                </div>
                <div className={appStyles.secondaryCard}>
                    <div className={appStyles.label}>{humidityLabel}</div>
                    <div className={appStyles.value}>{amountWithUnitOfMeasure(data?.humidity, "%", locale)}</div>
                </div>
                <div className={appStyles.secondaryCard}>
                    <div className={appStyles.label}>{windLabel}</div>
                    <div className={appStyles.value}>
                        {amountWithUnitOfMeasure(data?.wind, " " + config?.wind_speed_unit, locale)}
                    </div>
                </div>
                <div className={appStyles.secondaryCard}>
                    <div className={appStyles.label}>{precipitationLabel}</div>
                    <div className={appStyles.value}>
                        {amountWithUnitOfMeasure(data?.precipitation, " " + config?.precipitation_unit, locale)}
                    </div>
                </div>
            </div>
        </section>
    );
};

WeatherCurrent.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.object,
    location: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
};

export default injectIntl(WeatherCurrent);
