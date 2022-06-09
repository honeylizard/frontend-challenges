import React from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookSquare,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import appLogo from "../../assets/bookmark-landing-page/logo-bookmark-dark-bg.svg";
import NewsletterCallToAction from "./NewsletterCallToAction";

import pageStyles from "../../styles/bookmark-landing-page/page.module.scss";
import { Link } from "react-router-dom";

const Footer = ({ intl }) => {
    const challengeLinkUrl = intl.formatMessage({ id: "footer.challenge.url" });
    const challengeLinkLabel = intl.formatMessage({
        id: "footer.challenge.name",
    });
    const codedBy = intl.formatMessage({ id: "footer.codedBy" });

    // TODO: convert to translatable text
    const navItems = [
        {
            label: "Features",
            url: "#",
        },
        {
            label: "Pricing",
            url: "#",
        },
        {
            label: "Contact",
            url: "#",
        },
    ];

    const socialNavItems = [
        {
            label: "Facebook",
            url: "#",
            icon: faFacebookSquare,
        },
        {
            label: "Twitter",
            url: "#",
            icon: faTwitter,
        },
    ];

    return (
        <footer className={pageStyles.footerContainer}>
            <NewsletterCallToAction />
            <div className={pageStyles.footer}>
                <div className={pageStyles.wrapper}>
                    <img
                        src={appLogo}
                        alt="Bookmark Company Logo"
                        className={pageStyles.footerLogo}
                    />
                    <nav
                        className={[
                            pageStyles.footerNav,
                            pageStyles.footerNavStretch,
                        ].join(" ")}
                        aria-label="Footer Navigation"
                    >
                        <ul>
                            {navItems &&
                                navItems.length > 0 &&
                                navItems.map((item, index) => (
                                    <li key={`nav-item-${index}`}>
                                        <Link
                                            to={item.url}
                                            className={pageStyles.basicLink}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </nav>
                    <nav
                        className={pageStyles.footerNav}
                        aria-label="Social Media Navigation"
                    >
                        <ul>
                            {socialNavItems &&
                                socialNavItems.length > 0 &&
                                socialNavItems.map((item, index) => (
                                    <li key={`social-nav-item-${index}`}>
                                        <Link
                                            to={item.url}
                                            className={
                                                pageStyles.socialMediaLink
                                            }
                                            title={item.label}
                                        >
                                            <FontAwesomeIcon
                                                icon={item.icon}
                                                aria-hidden="true"
                                            />
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </nav>
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
};

export default injectIntl(Footer);
