import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";

import Footer from "./Footer";

import appStyles from "../../styles/age-calculator-app/app.module.scss";
import Calculator from "./Calculator";

const AgeCalculatorAppPage = ({ intl }) => {
    const title = intl.formatMessage({
        id: "ageCalculatorApp.title",
    });

    return (
        <React.Fragment>
            <Helmet>
                <body className={appStyles.solutionContainer} />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;800&display=swap"
                />
            </Helmet>
            <div className={appStyles.container}>
                <header>
                    <h1 className="sr-only">{title}</h1>
                </header>
                <main id="content">
                    <Calculator />
                </main>
                <Footer />
            </div>
        </React.Fragment>
    );
};

AgeCalculatorAppPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(AgeCalculatorAppPage);
