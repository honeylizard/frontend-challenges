import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import DailyListItem from "../common/DailyListItem";
import { GlobalContext } from "../../../GlobalStateProvider";

import styles from "@styles/weather-app/daily-section.module.scss";

const DailySection = ({ intl }) => {
    const { weatherApp: globalData } = useContext(GlobalContext);
    const { isLoading = true, configData: config = {}, dailyWeatherData: data } = globalData;

    let listData = [];
    const titleLabel = intl.formatMessage({
        id: "weatherApp.daily.title",
    });

    if (isLoading) {
        listData = new Array(7).fill({
            isLoading: true,
        });
    } else {
        listData = data;
    }

    return (
        <section className={styles.daily}>
            <h3 className={styles.title}>{titleLabel}</h3>
            <div className={styles.list}>
                {listData?.map((dayWeather, index) => {
                    return <DailyListItem key={`daily-weather-${index}`} data={dayWeather} config={config} />;
                })}
            </div>
        </section>
    );
};

DailySection.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(DailySection);
