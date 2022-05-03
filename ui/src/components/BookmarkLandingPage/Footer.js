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

const Footer = ({ intl }) => {
    const challengeLinkUrl = intl.formatMessage({ id: "footer.challenge.url" });
    const challengeLinkLabel = intl.formatMessage({
        id: "footer.challenge.name",
    });
    const codedBy = intl.formatMessage({ id: "footer.codedBy" });

    // TODO: style section
    return (
        <footer className={pageStyles.footerContainer}>
            <NewsletterCallToAction />
            <div className={pageStyles.footer}>
                <div className={pageStyles.wrapper}>
                    <img src={appLogo} alt="Bookmark Company Logo" />
                    <nav
                        className={[
                            pageStyles.footerNav,
                            pageStyles.footerNavStretch,
                        ].join(" ")}
                        aria-label="Footer Navigation"
                    >
                        <ul>
                            <li>Features</li>
                            <li>Pricing</li>
                            <li>Contact</li>
                        </ul>
                    </nav>
                    <nav
                        className={pageStyles.footerNav}
                        aria-label="Social Media Navigation"
                    >
                        <ul>
                            <li>
                                Facebook{" "}
                                <FontAwesomeIcon
                                    icon={faFacebookSquare}
                                    aria-hidden="true"
                                />
                            </li>
                            <li>
                                Twitter{" "}
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    aria-hidden="true"
                                />
                            </li>
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
