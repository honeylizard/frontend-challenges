import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Helmet } from "react-helmet";

import TimeCategoryCard from "./common/TimeCategoryCard";
import data from "../../assets/time-tracking-dashboard/data.json";

import appStyles from "../../styles/time-tracking-dashboard/app.module.scss";

const TimeTrackingDashboardPage = ({ intl }) => {
    return (
        <React.Fragment>
            <Helmet>
                <body className={appStyles.solutionContainer} />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500&display=swap"
                />
            </Helmet>
            <div className={appStyles.container}>
                <main id="content">
                    <h1 className="sr-only">Time Tracking Dashboard</h1>
                    <div className={appStyles.dashboard}>
                        <div className={appStyles.overviewCard}>
                            <div className={appStyles.profile}>
                                <img
                                    src={
                                        process.env.PUBLIC_URL +
                                        data.profile.avatar
                                    }
                                    alt={`Avatar of ${data.profile.name}`}
                                />
                                <h2 className={appStyles.name}>
                                    <div>Report for</div>
                                    <div>{data.profile.name}</div>
                                </h2>
                            </div>
                            <div className={appStyles.filters}>
                                <h3 className="sr-only">View As</h3>
                                <ul>
                                    <li>Daily</li>
                                    <li>Weekly</li>
                                    <li>Monthly</li>
                                </ul>
                            </div>
                        </div>
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
                    </div>
                </main>
            </div>
        </React.Fragment>
    );
};

TimeTrackingDashboardPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(TimeTrackingDashboardPage);
