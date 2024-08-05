import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Helmet } from "react-helmet";

import appStyles from "../../styles/e-commerce-product-page/app.module.scss";

import Footer from "./Footer";

const ElectronicCommerceProductPage = ({ intl }) => {
    const title = intl.formatMessage({
        id: "eCommerceProductPage.title",
    });

    return (
        <React.Fragment>
            <Helmet>
                <body className={appStyles.solutionContainer} />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;700&display=swap"
                />
            </Helmet>
            <header>
                <h1 className="sr-only">{title}</h1>
            </header>
            <main id="content" className={appStyles.content} />
            <Footer />
        </React.Fragment>
    );
};

ElectronicCommerceProductPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(ElectronicCommerceProductPage);
