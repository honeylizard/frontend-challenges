import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { Helmet } from "react-helmet";
import HeaderNav from "./Nav";
import appLogo from "@resources/bookmark-landing-page/logo-bookmark.svg";

import pageStyles from "@styles/bookmark-landing-page/page.module.scss";

const Header = ({ intl, data = {} }) => {
    const skipToContentLabel = intl.formatMessage({ id: "app.skipToContent" });
    const headerLogoAlt = intl.formatMessage({
        id: "bookmarkLanding.header.logoAlt",
    });
    const primaryNavLabel = intl.formatMessage({
        id: "bookmarkLanding.nav.primary",
    });

    const bodyClasses = [pageStyles.solutionContainer].filter(Boolean);

    return (
        <React.Fragment>
            <Helmet>
                <body className={bodyClasses.join(" ")} />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik" />
            </Helmet>
            <a
                className="sr-only sr-focusable"
                href="/frontend-challenges#/frontend-challenges/bookmark-landing-page#content"
                title={skipToContentLabel}
            >
                {skipToContentLabel}
            </a>
            <header className={pageStyles.header}>
                <div className={pageStyles.wrapper}>
                    <img src={appLogo} alt={headerLogoAlt} className={pageStyles.headerLogo} />
                    <HeaderNav navLabel={primaryNavLabel} data={data} />
                </div>
            </header>
        </React.Fragment>
    );
};

Header.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.shape({
        nav: PropTypes.array,
        socialNav: PropTypes.array,
    }),
};

export default injectIntl(Header);
