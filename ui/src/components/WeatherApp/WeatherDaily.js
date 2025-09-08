import React from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";

import { dayOfWeekOnly, tempuratureAmount } from "./utils/common";
import WeatherCondition from "./WeatherCondition";

// import appStyles from "../../styles/weather-app/app.module.scss";

const WeatherDaily = ({ intl, data, config }) => {
    const { locale = "en-US" } = useIntl();

    const titleLabel = intl.formatMessage({
        id: "weatherApp.daily.title",
    });
    const tempuratureHighLabel = intl.formatMessage({
        id: "weatherApp.temperatureHigh",
    });
    const tempuratureLowLabel = intl.formatMessage({
        id: "weatherApp.temperatureLow",
    });

    if (!data || data?.length === 0 || !config) return null;

    return (
        <section>
            <h3>{titleLabel}</h3>
            {data?.map((dayWeather, index) => {
                return (
                    <div key={`daily-weather-${index}`}>
                        <div>{dayOfWeekOnly(dayWeather?.dateTime)}</div>
                        {!!dayWeather?.condition && <WeatherCondition data={dayWeather?.condition} />}
                        <div>
                            <span className="sr-only">{tempuratureHighLabel}: </span>
                            {tempuratureAmount(dayWeather?.maxTemperature, config.temperature_unit, locale)}
                        </div>
                        <div>
                            <span className="sr-only">{tempuratureLowLabel}: </span>
                            {tempuratureAmount(dayWeather?.minTemperature, config.temperature_unit, locale)}
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

WeatherDaily.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.array,
    config: PropTypes.object.isRequired,
};

export default injectIntl(WeatherDaily);
