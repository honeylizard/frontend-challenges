import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { injectIntl } from "react-intl";

const NotFoundPage = ({ intl }) => {
    const title = intl.formatMessage({ id: "app.404.title" });
    const content = intl.formatMessage({ id: "app.404.body" });
    const navA = intl.formatMessage({ id: "app.404.nav" });
    const navB = intl.formatMessage({ id: "app.404.link" });

    return (
        <div id="content" className="wrapper content main" role="main">
            <section className="not-found-section section">
                <h1>{title}</h1>
                <p>{content}</p>
                <p>
                    {navA}
                    <Link to="/">{navB}</Link>
                </p>
            </section>
        </div>
    );
};

NotFoundPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(NotFoundPage);
