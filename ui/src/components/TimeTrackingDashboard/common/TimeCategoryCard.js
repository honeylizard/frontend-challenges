import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import { GlobalContext } from "../../../GlobalStateProvider";
import TimeFrame from "./TimeFrame";

import appStyles from "../../../styles/time-tracking-dashboard/time-category-card.module.scss";

const TimeCategoryCard = ({
    intl,
    label = "Unknown",
    categoryData = {},
    customClass = "",
}) => {
    const { timeTrackingDashboard: globalData } = useContext(GlobalContext);
    const [currentTimeFrameKey, setCurrentTimeFrameKey] = useState(null);

    const DAILY_KEY = globalData.DAILY_KEY;
    const WEEKLY_KEY = globalData.WEEKLY_KEY;
    const MONTHLY_KEY = globalData.MONTHLY_KEY;

    const cardStyles = [appStyles.categoryCard];
    cardStyles.push(customClass);

    useEffect(() => {
        if (currentTimeFrameKey !== globalData.currentFilter) {
            setCurrentTimeFrameKey(globalData.currentFilter);
        }
    }, [globalData.currentFilter, currentTimeFrameKey]);

    return (
        <div className={cardStyles.join(" ")}>
            <div className={appStyles.categoryCardInner}>
                <h3 className={appStyles.title}>{label}</h3>
                {currentTimeFrameKey === DAILY_KEY && (
                    <TimeFrame
                        data={categoryData[DAILY_KEY]}
                        currentLabel="Today"
                        previousLabel="Yesterday"
                    />
                )}
                {currentTimeFrameKey === WEEKLY_KEY && (
                    <TimeFrame
                        data={categoryData[WEEKLY_KEY]}
                        currentLabel="This Week"
                        previousLabel="Last Week"
                    />
                )}
                {currentTimeFrameKey === MONTHLY_KEY && (
                    <TimeFrame
                        data={categoryData[MONTHLY_KEY]}
                        currentLabel="This Month"
                        previousLabel="Last Month"
                    />
                )}
            </div>
        </div>
    );
};

TimeCategoryCard.propTypes = {
    intl: PropTypes.object.isRequired,
    label: PropTypes.string,
    categoryData: PropTypes.object,
    customClass: PropTypes.string,
};

export default injectIntl(TimeCategoryCard);
