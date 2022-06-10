import React from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import {
    faFacebookSquare,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import appLogo from "../../assets/bookmark-landing-page/logo-bookmark-dark-bg.svg";
import NewsletterCallToAction from "./NewsletterCallToAction";

import pageStyles from "../../styles/bookmark-landing-page/page.module.scss";
import NavList from "./common/NavList";

const Footer = ({ intl, data = {} }) => {
    const challengeLinkUrl = intl.formatMessage({ id: "footer.challenge.url" });
    const challengeLinkLabel = intl.formatMessage({
        id: "footer.challenge.name",
    });
    const codedBy = intl.formatMessage({ id: "footer.codedBy" });

    const footerLogoAlt = intl.formatMessage({
        id: "bookmarkLanding.header.logoAlt",
    });
    const footerNavLabel = intl.formatMessage({
        id: "bookmarkLanding.nav.footer",
    });
    const footerSocialNavLabel = intl.formatMessage({
        id: "bookmarkLanding.nav.social",
    });

    const navItems = data.nav;

    const socialNavItems = data.socialNav.map((item) => {
        return {
            ...item,
            icon:
                item.iconType === "facebook"
                    ? faFacebookSquare
                    : item.iconType === "twitter"
                    ? faTwitter
                    : null,
        };
    });

    return (
        <footer className={pageStyles.footerContainer}>
            <NewsletterCallToAction />
            <div className={pageStyles.footer}>
                <div className={pageStyles.wrapper}>
                    <img
                        src={appLogo}
                        alt={footerLogoAlt}
                        className={pageStyles.footerLogo}
                    />
                    <NavList
                        navClasses={[
                            pageStyles.footerNav,
                            pageStyles.footerNavStretch,
                        ].join(" ")}
                        label={footerNavLabel}
                        data={navItems}
                        itemKeyPrefix="nav-item-"
                        itemCustomClasses={pageStyles.basicLink}
                    />
                    <NavList
                        navClasses={pageStyles.footerNav}
                        label={footerSocialNavLabel}
                        data={socialNavItems}
                        itemKeyPrefix="social-nav-item-"
                        itemCustomClasses={pageStyles.socialMediaLink}
                        itemIconOnly={true}
                    />
                </div>
            </div>
            <div className={pageStyles.copyright}>
                <FormattedMessage
                    id="footer.challenge.link"
                    values={{
                        link: (
                            <a
                                href={challengeLinkUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {challengeLinkLabel}
                            </a>
                        ),
                    }}
                />
                <br />
                {codedBy}
            </div>
        </footer>
    );
};

Footer.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.shape({
        nav: PropTypes.array,
        socialNav: PropTypes.array,
    }),
};

export default injectIntl(Footer);
