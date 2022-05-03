import React from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import pageStyles from "../../styles/bookmark-landing-page/page.module.scss";

const NewsletterCallToAction = ({ intl }) => {
    // TODO: setup form submission logic and validation
    // TODO: style section
    return (
        <section className={pageStyles.callToAction}>
            <div className={pageStyles.wrapper}>
                <div className={pageStyles.reverseHeaderOrder}>
                    <h2>Stay up-to-date with what we&apos;re doing</h2>
                    <h3>35,000+ Already joined</h3>
                </div>
                <form>
                    <label htmlFor="newsletter-email" className="sr-only">
                        Email
                    </label>
                    <input id="newsletter-email" type="email" />
                    <button type="submit">Contact Us</button>
                </form>
            </div>
        </section>
    );
};

NewsletterCallToAction.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(NewsletterCallToAction);
