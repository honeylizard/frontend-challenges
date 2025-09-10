import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import styles from "../../../styles/weather-app/hourly-section.module.scss";
import HourlyListItem from "../common/HourlyListItem";
import WeekdaySelector from "../common/WeekdaySelector";
import { dayOfWeekNumberOnly } from "../utils/common";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";

const HourlySection = ({ intl, data, config, isLoading = true }) => {
    dayjs.extend(localeData);

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

    // This gets the job done, but there might be a better way
    const weekdayLabels = dayjs.weekdays();
    const weekdayIndexes = data?.map((item) => (item?.dateTime ? dayOfWeekNumberOnly(item.dateTime) : null)) || [];
    const weekdays = [...new Set(weekdayIndexes)].map((index) => ({
        key: `weekday-${index}`,
        label: weekdayLabels[index],
        value: index,
    }));

    // TODO: filter the data based on the selector value. Will need to make a context provider to manage this

    return (
        <section className={styles.hourly}>
            <div className={styles.titleRow}>
                <h3 className={styles.title}>{titleLabel}</h3>
                <WeekdaySelector options={weekdays} />
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
