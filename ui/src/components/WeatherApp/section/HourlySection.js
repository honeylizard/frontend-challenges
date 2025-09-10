import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import styles from "../../../styles/weather-app/hourly-section.module.scss";
import HourlyListItem from "../common/HourlyListItem";

const HourlySection = ({ intl, data, config, isLoading = true }) => {
    let listData = [];

    const titleLabel = intl.formatMessage({
        id: "weatherApp.hourly.title",
    });

    if (isLoading) {
        listData = new Array(8).fill({
            isLoading: true,
        });
    } else {
        listData = data;
    }

    return (
        <section className={styles.hourly}>
            <div className={styles.titleRow}>
                <h3 className={styles.title}>{titleLabel}</h3>
                {/* TODO: Pick a date dropdown and limit the display to just that date */}
            </div>
            <div className={styles.list}>
                {listData?.map((hourlyWeather, index) => {
                    return (
                        <HourlyListItem
                            key={`hourly-weather-${index}`}
                            dateTime={hourlyWeather?.dateTime}
                            condition={hourlyWeather?.condition}
                            temperature={hourlyWeather?.temperature}
                            config={config}
                            isLoading={isLoading}
                        />
                    );
                })}
            </div>
        </section>
    );
};

HourlySection.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.array,
    config: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
};

export default injectIntl(HourlySection);
