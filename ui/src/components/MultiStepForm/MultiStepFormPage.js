import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Helmet } from "react-helmet";

import Footer from "./Footer";

import appStyles from "../../styles/multi-step-form/app.module.scss";

const MultiStepFormPage = ({ intl }) => {
    const title = intl.formatMessage({
        id: "multiStepForm.title",
    });

    return (
        <React.Fragment>
            <Helmet>
                <body className={appStyles.solutionContainer} />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
                />
            </Helmet>
            <div className={appStyles.container}>
                <main id="content">
                    <h1 className="sr-only">{title}</h1>
                    <div>
                        {/*
                        Sidebar

                        Step 1
                        Your info

                        Step 2
                        Select plan

                        Step 3
                        Add-ons

                        Step 4
                        Summary
                        */}
                    </div>
                    <div>
                        {/*
                        Step 1

                        Personal info
                        Please provide your name, email address, and phone number.

                        Name
                        e.g. Stephen King

                        Email Address
                        e.g. stephenking@lorem.com

                        Phone Number
                        e.g. +1 234 567 890

                        Next Step
                        */}
                    </div>
                    <div>
                        {/*
                        Step 2

                        Select your plan
                        You have the option of monthly or yearly billing.

                        Arcade
                        $9/mo

                        Advanced
                        $12/mo

                        Pro
                        $15/mo

                        Monthly
                        Yearly

                        Go Back
                        Next Step
                        */}
                    </div>
                    <div>
                        {/*
                        Step 3

                        Pick add-ons
                        Add-ons help enhance your gaming experience.

                        Online service
                        Access to multiplayer games
                        +$1/mo

                        Larger storage
                        Extra 1TB of cloud save
                        +$2/mo

                        Customizable Profile
                        Custom theme on your profile
                        +$2/mo

                        Go Back
                        Next Step
                        */}
                    </div>
                    <div>
                        {/*
                        Step 4

                        Finishing up
                        Double-check everything looks OK before confirming.

                        ...Dynamically add subscription and add-on selections here...

                        Total (per month/year)

                        Go Back
                        Confirm
                        */}
                    </div>
                    <div>
                        {/*
                        Step 5

                        Thank you!

                        Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
                        */}
                    </div>
                </main>
                <Footer />
            </div>
        </React.Fragment>
    );
};

MultiStepFormPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(MultiStepFormPage);
