import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Helmet } from "react-helmet";

import Footer from "./Footer";
import CategoryList from "./common/CategoryList";
import OverviewCard from "./common/OverviewCard";

import appStyles from "../../styles/time-tracking-dashboard/app.module.scss";

const TimeTrackingDashboardPage = ({ intl }) => {
    const title = intl.formatMessage({
        id: "timeTrackingDashboard.title",
    });

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
                    <h1 className="sr-only">{title}</h1>
                    <div className={appStyles.dashboard}>
                        <OverviewCard />
                        <CategoryList />
                    </div>
                </main>
                <Footer />
            </div>
        </React.Fragment>
    );
};

TimeTrackingDashboardPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(TimeTrackingDashboardPage);
