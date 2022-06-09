import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import pageStyles from "../../styles/bookmark-landing-page/page.module.scss";
import Button from "./common/Button";

const NewsletterCallToAction = ({ intl }) => {
    // TODO: setup form submission logic and validation
    // TODO: convert to translatable text
    return (
        <section className={pageStyles.callToAction}>
            <div className={pageStyles.wrapper}>
                <div className={pageStyles.reverseHeaderOrder}>
                    <h2 className={pageStyles.callToActionTitle}>
                        Stay up-to-date with what we&apos;re doing
                    </h2>
                    <h3 className={pageStyles.callToActionSubtitle}>
                        35,000+ Already joined
                    </h3>
                </div>
                <form>
                    <label htmlFor="newsletter-email" className="sr-only">
                        Email
                    </label>
                    <input
                        id="newsletter-email"
                        type="email"
                        placeholder="Enter your email address"
                    />
                    <Button
                        type="submit"
                        rank="tertiary"
                        customClasses={[pageStyles.callToActionSubmit]}
                    >
                        Contact Us
                    </Button>
                </form>
            </div>
        </section>
    );
};

NewsletterCallToAction.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(NewsletterCallToAction);
