import React from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";

import { hourOnly, temperatureAmount } from "../utils/common";
import WeatherCondition from "../common/WeatherCondition";

import styles from "../../../styles/weather-app/hourly-list-item.module.scss";

const HourlySection = ({ intl, dateTime, condition, temperature, config, isLoading = true, ...attrs }) => {
    const { locale = "en-US" } = useIntl();
    const temperatureLabel = intl.formatMessage({
        id: "weatherApp.temperature",
    });

    return (
        <div className={styles.listItem} {...attrs}>
            {isLoading ? (
                <div />
            ) : (
                <>
                    <div className={styles.label}>
                        {!!condition && <WeatherCondition data={condition} customClasses={[styles.condition]} />}
                        <div>{hourOnly(dateTime)}</div>
                    </div>
                    <div className={styles.value}>
                        <span className="sr-only">{temperatureLabel}: </span>
                        {temperatureAmount(temperature, config.temperature_unit, locale)}
                    </div>
                </>
            )}
        </div>
    );
};

HourlySection.propTypes = {
    intl: PropTypes.object.isRequired,
    dateTime: PropTypes.object,
    condition: PropTypes.object,
    temperature: PropTypes.number,
    config: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
};

export default injectIntl(HourlySection);
