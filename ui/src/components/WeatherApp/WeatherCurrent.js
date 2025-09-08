import React from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";

import { amountWithUnitOfMeasure, dateWithWeekDayOnly, tempuratureAmount } from "./utils/common";
import WeatherCondition from "./WeatherCondition";

// import appStyles from "../../styles/weather-app/app.module.scss";

const WeatherCurrent = ({ intl, data, location, config }) => {
    const { locale = "en-US" } = useIntl();

    const titleLabel = intl.formatMessage({
        id: "weatherApp.current.title",
    });
    const tempuratureLabel = intl.formatMessage({
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
        <section>
            <h3 className="sr-only">{titleLabel}</h3>
            <div>
                <div>
                    <span className="sr-only">{locationLabel}: </span>
                    {location?.name}
                </div>
                <div>
                    <span className="sr-only">{dateLabel}: </span>
                    {dateWithWeekDayOnly(data?.dateTime)}
                </div>
                {!!data?.condition && <WeatherCondition data={data?.condition} />}
                <div>
                    <span className="sr-only">{tempuratureLabel}: </span>
                    {tempuratureAmount(data?.temperature, config.temperature_unit, locale)}
                </div>
            </div>
            <div>
                <div>{feelsLikeLabel}</div>
                <div>{tempuratureAmount(data?.feelsLike, config.temperature_unit, locale)}</div>
            </div>
            <div>
                <div>{humidityLabel}</div>
                <div>{amountWithUnitOfMeasure(data?.humidity, "%", locale)}</div>
            </div>
            <div>
                <div>{windLabel}</div>
                <div>{amountWithUnitOfMeasure(data?.wind, config?.wind_speed_unit, locale)}</div>
            </div>
            <div>
                <div>{precipitationLabel}</div>
                <div>{amountWithUnitOfMeasure(data?.precipitation, config?.precipitation_unit, locale)}</div>
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
