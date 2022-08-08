import React, { useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";

import IpAddressTrackerForm from "./IpAddressTrackerForm";
import IpAddressTrackerOutput from "./IpAddressTrackerOutput";

import appStyles from "../../styles/ip-address-tracker/app.module.scss";
import Footer from "./Footer";

const IpAddressTracker = ({ intl }) => {
    const [results, setResults] = useState({});

    const appTitle = intl.formatMessage({
        id: "ipAddressTracker.title",
    });

    return (
        <React.Fragment>
            <Helmet>
                <body className={appStyles.solutionContainer} />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap"
                />
            </Helmet>
            <div className={appStyles.container}>
                <main id="content" className={appStyles.wrapper}>
                    <h1 className={appStyles.appTitle}>{appTitle}</h1>
                    <IpAddressTrackerForm setResults={setResults} />
                    <IpAddressTrackerOutput results={results} />
                </main>
                <Footer />
            </div>
        </React.Fragment>
    );
};

IpAddressTracker.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(IpAddressTracker);
