import React, { useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import validator from "validator";

import Button from "./common/Button";
import FormInput from "./common/FormInput";
import Alert from "./common/Alert";

import pageStyles from "../../styles/bookmark-landing-page/page.module.scss";

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

    const initialFormData = {
        newsletterEmail: "",
    };
    const [formData, setFormData] = useState(initialFormData); // Set of form fields and "hidden" fields that will be passed through when submitted
    const [formErrors, setFormErrors] = useState(null); // Set of form field errors
    const [processingSubmit, setProcessingSubmit] = useState(false); // Toggle for disabling submit button for form
    const [successfulSubmission, setSuccessfulSubmission] = useState(false); // Toggle for success alert message visibility

    const updateValue = (event) => {
        const { id, name, value: newValue } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name || id]: newValue,
        }));
    };

    const validateForm = () => {
        let validForm = true;
        setFormErrors({}); // Reset form errors

        const tempFormErrors = {};

        if (!formData?.newsletterEmail || formData?.newsletterEmail === "") {
            tempFormErrors["newsletterEmail"] = intl.formatMessage({
                id: "bookmarkLanding.cta.form.email.error.required",
            });
            validForm = false;
        } else if (!validator.isEmail(formData?.newsletterEmail)) {
            tempFormErrors["newsletterEmail"] = intl.formatMessage({
                id: "bookmarkLanding.cta.form.email.error.invalid",
            });
            validForm = false;
        }

        if (!validForm) {
            setFormErrors(tempFormErrors);
        }

        return validForm;
    };

    const submitForm = (event) => {
        if (event) {
            event.preventDefault();
        }

        // Toggle the ability to click on the submit while the current submission is processing
        setProcessingSubmit(true);

        if (validateForm()) {
            // Update the polite alert for accessibility purposes to notify users that the list is updated
            setSuccessfulSubmission(
                intl.formatMessage({ id: "bookmarkLanding.cta.form.success" })
            );

            // Send the form data to a backend for processing...

            // Clear the form of errors in case anything was left over
            setFormErrors(null);

            // Clear the form for a new submission
            setFormData(initialFormData);
        } else {
            // Set the applicable message and provide a polite alert for accessibility purposes to notify users that at least one error occurred.
            setFormErrors((prevState) => ({
                ...prevState,
                general: intl.formatMessage({
                    id: "bookmarkLanding.cta.form.error",
                }),
            }));

            // Clear the form of success in case anything was left over
            setSuccessfulSubmission(false);
        }

        // Toggle the ability to click on the submit since the current submission is finished
        setProcessingSubmit(false);
    };

    // TODO: add validation icon (red circle with exclamation in it)

    return (
        <section className={pageStyles.callToAction}>
            <div className={pageStyles.wrapper}>
                <div className={pageStyles.reverseHeaderOrder}>
                    <h2 className={pageStyles.callToActionTitle}>{title}</h2>
                    <h3 className={pageStyles.callToActionSubtitle}>
                        {subtitle}
                    </h3>
                </div>
                <form onSubmit={submitForm}>
                    <div role="status" aria-live="polite">
                        {successfulSubmission && (
                            <Alert
                                id="generalSuccess"
                                type="success"
                                message={successfulSubmission}
                            />
                        )}
                    </div>
                    <div className={pageStyles.callToActionRow}>
                        <FormInput
                            label={emailLabel}
                            id="newsletter-email"
                            name="newsletterEmail"
                            placeholder={emailPlaceholder}
                            errorMessage={
                                formErrors && formErrors["newsletterEmail"]
                            }
                            value={formData["newsletterEmail"]}
                            onChange={updateValue}
                            type="email"
                            hideLabel={true}
                            classNames={pageStyles.callToActionInput}
                            required={true}
                        />
                        <Button
                            type="submit"
                            rank="tertiary"
                            customClasses={[pageStyles.callToActionSubmit]}
                            disabled={processingSubmit}
                        >
                            {submitLabel}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

NewsletterCallToAction.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(NewsletterCallToAction);
