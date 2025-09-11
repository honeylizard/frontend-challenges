import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";

import Footer from "./Footer";

import appStyles from "../../styles/weather-app/app.module.scss";
import Header from "./Header";
import WeatherForm from "./WeatherForm";

const WeatherAppPage = ({ intl }) => {
    return (
        <React.Fragment>
            <Helmet>
                <body className={appStyles.solutionContainer} />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;500;600;700&family=Bricolage+Grotesque:wght@700&display=swap"
                />
            </Helmet>
            <div className={appStyles.container}>
                <Header />
                <main id="content" className={appStyles.content}>
                    <WeatherForm />
                </main>
                <Footer />
            </div>
        </React.Fragment>
    );
};

WeatherAppPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(WeatherAppPage);
