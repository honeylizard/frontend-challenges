import React from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";

import { hourOnly, temperatureAmount } from "./utils/common";
import WeatherCondition from "./WeatherCondition";

import styles from "../../styles/weather-app/hourly.module.scss";

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
        <section className={styles.hourly}>
            <div className={styles.titleRow}>
                <h3 className={styles.title}>{titleLabel}</h3>
                {/* TODO: Pick a date dropdown and limit the display to just that date */}
            </div>
            <div className={styles.list}>
                {data?.map((hourlyWeather, index) => {
                    return (
                        <div key={`hourly-weather-${index}`} className={styles.listItem}>
                            <div className={styles.label}>
                                {!!hourlyWeather?.condition && (
                                    <WeatherCondition
                                        data={hourlyWeather?.condition}
                                        customClasses={[styles.condition]}
                                    />
                                )}
                                <div>{hourOnly(hourlyWeather?.dateTime)}</div>
                            </div>
                            <div className={styles.value}>
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
