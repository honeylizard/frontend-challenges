import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import pageStyles from "../../styles/bookmark-landing-page/page.module.scss";
import Button from "./common/Button";

const NewsletterCallToAction = ({ intl }) => {
    const title = intl.formatMessage({ id: "bookmarkLanding.cta.title" });
    const subtitle = intl.formatMessage({ id: "bookmarkLanding.cta.subtitle" });

    const emailLabel = intl.formatMessage({
        id: "bookmarkLanding.cta.form.email",
    });
    const emailPlaceholder = intl.formatMessage({
        id: "bookmarkLanding.cta.form.email.placeholder",
    });

    const submitLabel = intl.formatMessage({
        id: "bookmarkLanding.cta.form.submit",
    });

    // TODO: setup form submission logic and validation
    return (
        <section className={pageStyles.callToAction}>
            <div className={pageStyles.wrapper}>
                <div className={pageStyles.reverseHeaderOrder}>
                    <h2 className={pageStyles.callToActionTitle}>{title}</h2>
                    <h3 className={pageStyles.callToActionSubtitle}>
                        {subtitle}
                    </h3>
                </div>
                <form>
                    <label htmlFor="newsletter-email" className="sr-only">
                        {emailLabel}
                    </label>
                    <input
                        id="newsletter-email"
                        type="email"
                        placeholder={emailPlaceholder}
                    />
                    <Button
                        type="submit"
                        rank="tertiary"
                        customClasses={[pageStyles.callToActionSubmit]}
                    >
                        {submitLabel}
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
