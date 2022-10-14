import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import appStyles from "../../../styles/time-tracking-dashboard/app.module.scss";
import TimeFrame from "./TimeFrame";

const TimeCategoryCard = ({
    intl,
    label = "Unknown",
    categoryData = {},
    currentTimeFrameKey = "daily",
    customClass = "",
}) => {
    const DAILY_KEY = "daily";
    const WEEKLY_KEY = "weekly";
    const MONTHLY_KEY = "monthly";

    const cardStyles = [appStyles.categoryCard];
    cardStyles.push(customClass);

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
    currentTimeFrameKey: PropTypes.string,
    customClass: PropTypes.string,
};

export default injectIntl(TimeCategoryCard);
