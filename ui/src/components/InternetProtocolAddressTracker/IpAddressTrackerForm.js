import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

import FormInput from "./common/FormInput";
import Alert from "./common/Alert";

import appStyles from "../../styles/ip-address-tracker/app.module.scss";
import Button from "./common/Button";

const IpAddressTrackerForm = ({ intl, setResults }) => {
    // TODO: move to env var?
    const IPIFY_API_KEY = "at_SnevHZ5viEh6DR8tGzZWvKrTG02v2";
    const IPIFY_API_BASE_URL = "https://geo.ipify.org/api/v1?";

    const inputLabel = intl.formatMessage({
        id: "ipAddressTracker.input.label",
    });
    const inputPlaceholder = intl.formatMessage({
        id: "ipAddressTracker.input.placeholder",
    });
    const submitButtonLabel = intl.formatMessage({
        id: "ipAddressTracker.submit.label",
    });

    const initialFormData = {
        ipAddressOrDomain: "18.23.456.7", // "8.8.8.8",
    };

    const [processingSubmit, setProcessingSubmit] = useState(false); // Toggle for disabling submit button for form
    const [formData, setFormData] = useState(initialFormData); // Set of form fields and "hidden" fields that will be passed through when submitted
    const [formErrors, setFormErrors] = useState(null); // Set of form field errors

    const updateValue = (event) => {
        const { id, name, value: newValue } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name || id]: newValue,
        }));
    };

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        // Toggle the ability to click on the submit while the current submission is processing
        setProcessingSubmit(true);

        const path =
            IPIFY_API_BASE_URL +
            "apiKey=" +
            IPIFY_API_KEY +
            "&ipAddress=" +
            formData["ipAddressOrDomain"];

        axios
            .get(path)
            .then((response) => {
                if (response.status === 200) {
                    const { isp, location, ip } = response.data;

                    setResults({
                        ip_address: ip,
                        location: `${location.city}, ${location.region} ${location.postalCode}`,
                        country: location.country,
                        timezone: `UTC ${location.timezone}`,
                        provider: isp,
                    });
                }
                // TODO: remove when finished
                console.group("API GET");
                console.log("fetch response", response);
                console.groupEnd();

                // Clear the form of errors in case anything was left over
                setFormErrors(null);

                // Toggle the ability to click on the submit since the current submission is finished
                setProcessingSubmit(false);
            })
            .catch((error) => {
                // Set the applicable message and provide a polite alert for accessibility purposes to notify users that at least one error occurred.
                setFormErrors((prevState) => ({
                    ...prevState,
                    general: error.message,
                }));

                // Toggle the ability to click on the submit since the current submission is finished
                setProcessingSubmit(false);
            });
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <FormInput
                    id="ip-address-or-domain"
                    name="ipAddressOrDomain"
                    placeholder={inputPlaceholder}
                    required={true}
                    label={inputLabel}
                    hideLabel={true}
                    value={formData["ipAddressOrDomain"]}
                    onChange={updateValue}
                    errorMessage={formErrors && formErrors["ipAddressOrDomain"]}
                />
                <Button
                    type="submit"
                    customClasses={[appStyles.formSubmit]}
                    disabled={processingSubmit}
                    title={submitButtonLabel}
                    aria-label={submitButtonLabel}
                >
                    <FontAwesomeIcon icon={faAngleRight} aria-hidden="true" />
                </Button>
            </form>
            <div id="alertContainer">
                {formErrors && Object.keys(formErrors).includes("general") && (
                    <Alert
                        id="generalError"
                        type="error"
                        message={formErrors["general"]}
                    />
                )}
            </div>
        </React.Fragment>
    );
};

IpAddressTrackerForm.propTypes = {
    intl: PropTypes.object.isRequired,
    setResults: PropTypes.func.isRequired,
};

export default injectIntl(IpAddressTrackerForm);
