import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import TimeCategoryCard from "./TimeCategoryCard";
import data from "../../../assets/time-tracking-dashboard/data.json";

import appStyles from "../../../styles/time-tracking-dashboard/category-list.module.scss";

const CategoryList = ({ intl }) => {
    return (
        <div className={appStyles.categoryList}>
            <TimeCategoryCard
                label="Work"
                categoryData={data["work"]}
                customClass={appStyles.categoryCardOrange}
            />
            <TimeCategoryCard
                label="Play"
                categoryData={data["play"]}
                customClass={appStyles.categoryCardBlue}
            />
            <TimeCategoryCard
                label="Study"
                categoryData={data["study"]}
                customClass={appStyles.categoryCardRed}
            />
            <TimeCategoryCard
                label="Exercise"
                categoryData={data["exercise"]}
                customClass={appStyles.categoryCardGreen}
            />
            <TimeCategoryCard
                label="Social"
                categoryData={data["social"]}
                customClass={appStyles.categoryCardPurple}
            />
            <TimeCategoryCard
                label="Self Care"
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
