import React from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";

import { dayOfWeekOnly, temperatureAmount } from "./utils/common";
import WeatherCondition from "./WeatherCondition";

import appStyles from "../../styles/weather-app/app.module.scss";

const WeatherDaily = ({ intl, data, config }) => {
    const { locale = "en-US" } = useIntl();

    const titleLabel = intl.formatMessage({
        id: "weatherApp.daily.title",
    });
    const temperatureHighLabel = intl.formatMessage({
        id: "weatherApp.temperatureHigh",
    });
    const temperatureLowLabel = intl.formatMessage({
        id: "weatherApp.temperatureLow",
    });

    if (!data || data?.length === 0 || !config) return null;

    return (
        <section className={appStyles.dailyWeather}>
            <h3 className={appStyles.title}>{titleLabel}</h3>
            <div className={appStyles.list}>
                {data?.map((dayWeather, index) => {
                    return (
                        <div key={`daily-weather-${index}`} className={appStyles.listItem}>
                            <div className={appStyles.label}>{dayOfWeekOnly(dayWeather?.dateTime)}</div>
                            {!!dayWeather?.condition && <WeatherCondition data={dayWeather?.condition} />}
                            <div className={appStyles.values}>
                                <div>
                                    <span className="sr-only">{temperatureHighLabel}: </span>
                                    {temperatureAmount(dayWeather?.maxTemperature, config.temperature_unit, locale)}
                                </div>
                                <div>
                                    <span className="sr-only">{temperatureLowLabel}: </span>
                                    {temperatureAmount(dayWeather?.minTemperature, config.temperature_unit, locale)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

WeatherDaily.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.array,
    config: PropTypes.object.isRequired,
};

export default injectIntl(WeatherDaily);
