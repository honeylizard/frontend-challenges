import React from "react";
import PropTypes from "prop-types";
import { injectIntl, useIntl } from "react-intl";

import { dateWithWeekDayOnly, temperatureAmount } from "../utils/common";
import WeatherCondition from "./WeatherCondition";

import styles from "../../../styles/weather-app/current-card.module.scss";

const CurrentCard = ({ intl, dateTime, location, condition, temperature, config, isLoading = true }) => {
    const { locale = "en-US" } = useIntl();

    const temperatureLabel = intl.formatMessage({
        id: "weatherApp.temperature",
    });
    const locationLabel = intl.formatMessage({
        id: "weatherApp.location",
    });
    const dateLabel = intl.formatMessage({
        id: "weatherApp.date",
    });

    const classes = [styles.primaryCard];

    if (isLoading) {
        classes.push(styles.loading);
    }

    return (
        <div className={classes.join(" ")}>
            {isLoading ? (
                <div>Loading ...</div>
            ) : (
                <>
                    <div className={styles.label}>
                        <div className={styles.location}>
                            <span className="sr-only">{locationLabel}: </span>
                            {location?.name || "-"}
                        </div>
                        <div className={styles.timestamp}>
                            <span className="sr-only">{dateLabel}: </span>
                            {dateWithWeekDayOnly(dateTime) || "-"}
                        </div>
                    </div>
                    <div className={styles.value}>
                        {!!condition && <WeatherCondition data={condition} customClasses={[styles.condition]} />}
                        <div className={styles.temperature}>
                            <span className="sr-only">{temperatureLabel}: </span>
                            {temperatureAmount(temperature, config.temperature_unit, locale, intl.formatMessage)}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

CurrentCard.propTypes = {
    intl: PropTypes.object.isRequired,
    dateTime: PropTypes.object,
    condition: PropTypes.object,
    location: PropTypes.object,
    temperature: PropTypes.number,
    config: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
};

export default injectIntl(CurrentCard);
