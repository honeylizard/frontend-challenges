import React from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";

import { hourOnly, temperatureAmount } from "./utils/common";
import WeatherCondition from "./WeatherCondition";

import appStyles from "../../styles/weather-app/app.module.scss";

const WeatherHourly = ({ intl, data, config }) => {
    const { locale = "en-US" } = useIntl();

    const titleLabel = intl.formatMessage({
        id: "weatherApp.hourly.title",
    });
    const temperatureLabel = intl.formatMessage({
        id: "weatherApp.temperature",
    });

    if (!data || data?.length === 0 || !config) return null;

    return (
        <section className={appStyles.hourlyWeather}>
            <div className={appStyles.titleRow}>
                <h3 className={appStyles.title}>{titleLabel}</h3>
                {/* TODO: Pick a date dropdown and limit the display to just that date */}
            </div>
            <div className={appStyles.list}>
                {data?.map((hourlyWeather, index) => {
                    return (
                        <div key={`hourly-weather-${index}`} className={appStyles.listItem}>
                            <div className={appStyles.listItemLeft}>
                                {!!hourlyWeather?.condition && <WeatherCondition data={hourlyWeather?.condition} />}
                                <div>{hourOnly(hourlyWeather?.dateTime)}</div>
                            </div>
                            <div>
                                <span className="sr-only">{temperatureLabel}: </span>
                                {temperatureAmount(hourlyWeather?.temperature, config.temperature_unit, locale)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

WeatherHourly.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.array,
    config: PropTypes.object.isRequired,
};

export default injectIntl(WeatherHourly);
