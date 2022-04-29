import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Helmet } from "react-helmet";
import appLogo from "../../assets/bookmark-landing-page/logo-bookmark.svg";

import pageStyles from "../../styles/bookmark-landing-page/page.module.scss";

const Header = ({ intl }) => {
    const skipToContentLabel = intl.formatMessage({ id: "app.skipToContent" });

    const bodyClasses = [pageStyles.solutionContainer].filter(Boolean);

    return (
        <React.Fragment>
            <Helmet>
                <body className={bodyClasses.join(" ")} />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Rubik"
                />
            </Helmet>
            <a
                className="sr-only sr-focusable"
                href="#content"
                title={skipToContentLabel}
            >
                {skipToContentLabel}
            </a>
            <header className={pageStyles.header}>
                <div className={pageStyles.wrapper}>
                    <img src={appLogo} alt="Bookmark Company Logo" />
                    <nav aria-label="Primary Navigation">
                        <ul>
                            <li>Features</li>
                            <li>Pricing</li>
                            <li>Contact</li>
                            <li>Login</li>
                        </ul>
                    </nav>
                </div>
            </header>
        </React.Fragment>
    );
};

Header.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Header);
