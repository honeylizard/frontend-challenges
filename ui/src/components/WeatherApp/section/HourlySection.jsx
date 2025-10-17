import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";

import HourlyListItem from "../common/HourlyListItem";
import WeekdaySelector from "../common/WeekdaySelector";
import { dayOfWeekNumberOnly } from "../utils/common";
import { GlobalContext } from "../../../GlobalStateProvider";

import styles from "@styles/weather-app/hourly-section.module.scss";

const HourlySection = ({ intl }) => {
    const { weatherApp: globalData } = useContext(GlobalContext);
    const { isLoading = true, hourlyWeatherData: data, hourlyWeekday = "" } = globalData;

    const listData = isLoading ? new Array(8).fill({ isLoading: true }) : data;

    const titleLabel = intl.formatMessage({
        id: "weatherApp.hourly.title",
    });

    // This gets the job done, but there might be a better way
    dayjs.extend(localeData);
    const weekdayLabels = dayjs.weekdays();
    const weekdayIndexes = data?.map((item) => (item?.dateTime ? dayOfWeekNumberOnly(item.dateTime) : null)) || [];
    const weekdays = [...new Set(weekdayIndexes)].map((index) => ({
        key: `weekday-${index}`,
        label: weekdayLabels[index],
        value: index,
    }));

    const filteredDataList =
        hourlyWeekday && hourlyWeekday !== ""
            ? listData?.filter((item) => dayOfWeekNumberOnly(item.dateTime) === hourlyWeekday)
            : listData;

    return (
        <section className={styles.hourly}>
            <div className={styles.titleRow}>
                <h3 className={styles.title}>{titleLabel}</h3>
                <WeekdaySelector options={weekdays} />
            </div>
            <div className={styles.list}>
                {filteredDataList?.map((hourlyWeather, index) => {
                    return (
                        <HourlyListItem
                            key={`hourly-weather-${index}`}
                            dateTime={hourlyWeather?.dateTime}
                            condition={hourlyWeather?.condition}
                            temperature={hourlyWeather?.temperature}
                        />
                    );
                })}
            </div>
        </section>
    );
};

HourlySection.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(HourlySection);
