import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import data from "@resources/time-tracking-dashboard/data.json";
import TimeCategoryCard from "./TimeCategoryCard";

import appStyles from "@styles/time-tracking-dashboard/category-list.module.scss";

const CategoryList = ({ intl }) => {
    const workLabel = intl.formatMessage({
        id: "timeTrackingDashboard.work",
    });
    const studyLabel = intl.formatMessage({
        id: "timeTrackingDashboard.study",
    });
    const playLabel = intl.formatMessage({
        id: "timeTrackingDashboard.play",
    });
    const exerciseLabel = intl.formatMessage({
        id: "timeTrackingDashboard.exercise",
    });
    const socialLabel = intl.formatMessage({
        id: "timeTrackingDashboard.social",
    });
    const selfCareLabel = intl.formatMessage({
        id: "timeTrackingDashboard.selfCare",
    });

    return (
        <div className={appStyles.categoryList}>
            <TimeCategoryCard
                label={workLabel}
                categoryData={data["work"]}
                customClass={appStyles.categoryCardOrange}
            />
            <TimeCategoryCard label={playLabel} categoryData={data["play"]} customClass={appStyles.categoryCardBlue} />
            <TimeCategoryCard label={studyLabel} categoryData={data["study"]} customClass={appStyles.categoryCardRed} />
            <TimeCategoryCard
                label={exerciseLabel}
                categoryData={data["exercise"]}
                customClass={appStyles.categoryCardGreen}
            />
            <TimeCategoryCard
                label={socialLabel}
                categoryData={data["social"]}
                customClass={appStyles.categoryCardPurple}
            />
            <TimeCategoryCard
                label={selfCareLabel}
                categoryData={data["selfCare"]}
                customClass={appStyles.categoryCardYellow}
            />
        </div>
    );
};

CategoryList.propTypes = {
    intl: PropTypes.object.isRequired,
    currentLabel: PropTypes.string,
    previousLabel: PropTypes.string,
    data: PropTypes.object,
};

export default injectIntl(CategoryList);
