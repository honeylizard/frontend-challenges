import React from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";

import { hourOnly, tempuratureAmount } from "./utils/common";
import WeatherCondition from "./WeatherCondition";

// import appStyles from "../../styles/weather-app/app.module.scss";

const WeatherHourly = ({ intl, data, config }) => {
    const { locale = "en-US" } = useIntl();

    const titleLabel = intl.formatMessage({
        id: "weatherApp.hourly.title",
    });
    const tempuratureLabel = intl.formatMessage({
        id: "weatherApp.temperature",
    });

    if (!data || data?.length === 0 || !config) return null;

    return (
        <section>
            <h3>{titleLabel}</h3>
            {/* TODO: Pick a date dropdown and limit the display to just that date */}
            {data?.map((hourlyWeather, index) => {
                return (
                    <div key={`hourly-weather-${index}`}>
                        <div>{hourOnly(hourlyWeather?.dateTime)}</div>
                        {!!hourlyWeather?.condition && <WeatherCondition data={hourlyWeather?.condition} />}
                        <div>
                            <span className="sr-only">{tempuratureLabel}: </span>
                            {tempuratureAmount(hourlyWeather?.temperature, config.temperature_unit, locale)}
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

WeatherHourly.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.array,
    config: PropTypes.object.isRequired,
};

export default injectIntl(WeatherHourly);
