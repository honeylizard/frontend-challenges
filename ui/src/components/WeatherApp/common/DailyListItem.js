import React from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";

import { dayOfWeekOnly, temperatureAmount } from "../utils/common";
import WeatherCondition from "./WeatherCondition";

import styles from "../../../styles/weather-app/daily-list-item.module.scss";

const DailyListItem = ({ intl, data, config, ...attrs }) => {
    const { locale = "en-US" } = useIntl();

    const temperatureHighLabel = intl.formatMessage({
        id: "weatherApp.temperatureHigh",
    });
    const temperatureLowLabel = intl.formatMessage({
        id: "weatherApp.temperatureLow",
    });

    // if (!data || data?.length === 0 || !config) return null;

    return (
        <div className={styles.listItem} {...attrs}>
            <div className={styles.label}>{!data?.isLoading && dayOfWeekOnly(data?.dateTime)}</div>
            {!!data?.condition && <WeatherCondition data={data?.condition} customClasses={[styles.condition]} />}
            <div className={styles.values}>
                {!data?.isLoading ? (
                    <>
                        <div>
                            <span className="sr-only">{temperatureHighLabel}: </span>
                            {temperatureAmount(data?.maxTemperature, config.temperature_unit, locale)}
                        </div>
                        <div>
                            <span className="sr-only">{temperatureLowLabel}: </span>
                            {temperatureAmount(data?.minTemperature, config.temperature_unit, locale)}
                        </div>
                    </>
                ) : (
                    <>
                        <div />
                        <div />
                    </>
                )}
            </div>
        </div>
    );
};

DailyListItem.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.object,
    config: PropTypes.object.isRequired,
};

export default injectIntl(DailyListItem);
