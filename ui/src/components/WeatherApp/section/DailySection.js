import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import styles from "../../../styles/weather-app/daily-section.module.scss";
import DailyListItem from "../common/DailyListItem";

const DailySection = ({ intl, data, config, isLoading = false }) => {
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
                    return (
                        <DailyListItem
                            key={`daily-weather-${index}`}
                            data={dayWeather}
                            config={config}
                            isLoading={isLoading}
                        />
                    );
                })}
            </div>
        </section>
    );
};

DailySection.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.array,
    config: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
};

export default injectIntl(DailySection);
