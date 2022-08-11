import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";

import Footer from "./Footer";

import appStyles from "../../styles/todo-app/app.module.scss";

const TodoAppPage = ({ intl }) => {
    return (
        <React.Fragment>
            <Helmet>
                <body className={appStyles.solutionContainer} />
            </Helmet>
            <div className={appStyles.container}>
                <main id="content">
                    <div className={appStyles.wrapper}>
                        <h1>Hello World!</h1>
                    </div>
                </main>
                <Footer />
            </div>
        </React.Fragment>
    );
};

TodoAppPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(TodoAppPage);
