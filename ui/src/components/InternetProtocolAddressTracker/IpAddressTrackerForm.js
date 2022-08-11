import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import isValidDomain from "is-valid-domain";

import FormInput from "./common/FormInput";
import Alert from "./common/Alert";

import appStyles from "../../styles/ip-address-tracker/app.module.scss";
import Button from "./common/Button";

const IpAddressTrackerForm = ({ intl, setResults }) => {
    const IPIFY_API_KEY = "at_SnevHZ5viEh6DR8tGzZWvKrTG02v2";
    const IPIFY_API_BASE_URL = "https://geo.ipify.org/api/v1?";
    const IPIFY_GET_IP_URL = "https://api.ipify.org?format=json";
    const SEARCH_TYPE_IP = "ipAddress";
    const SEARCH_TYPE_DOMAIN = "domain";

    const inputLabel = intl.formatMessage({
        id: "ipAddressTracker.input.label",
    });
    const inputPlaceholder = intl.formatMessage({
        id: "ipAddressTracker.input.placeholder",
    });
    const submitButtonLabel = intl.formatMessage({
        id: "ipAddressTracker.submit.label",
    });
    const emptyInputError = intl.formatMessage({
        id: "ipAddressTracker.input.empty",
    });
    const utcLabel = intl.formatMessage({
        id: "ipAddressTracker.utc",
    });

    const initialFormData = {
        ipAddressOrDomain: "",
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

    const getResults = (value) => {
        if (!value) {
            return Promise.reject(emptyInputError);
        }

        const path = IPIFY_API_BASE_URL + "apiKey=" + IPIFY_API_KEY;
        // Validate if it is an IP or domain
        const searchTerm = isValidDomain(value)
            ? SEARCH_TYPE_DOMAIN
            : SEARCH_TYPE_IP;
        const searchQuery = `&${searchTerm}=${value}`;

        return axios.get(path + searchQuery).then((response) => {
            if (response.status === 200) {
                const { isp, location, ip } = response.data;

                return {
                    ip_address: ip,
                    location: `${location.city}, ${location.region} ${location.postalCode}`,
                    country: location.country,
                    timezone: `${utcLabel} ${location.timezone}`,
                    provider: isp,
                    coordinates: [location.lat, location.lng],
                };
            }

            return Promise.reject(response);
        });
    };

    const setError = (message) => {
        // Set the applicable message and provide a polite alert for accessibility purposes to notify users that at least one error occurred.
        setFormErrors((prevState) => ({
            ...prevState,
            general: message,
        }));

        // Toggle the ability to click on the submit since the current submission is finished
        setProcessingSubmit(false);
    };

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        // Toggle the ability to click on the submit while the current submission is processing
        setProcessingSubmit(true);

        if (formData["ipAddressOrDomain"]) {
            getResults(formData["ipAddressOrDomain"])
                .then((response) => {
                    setResults(response);

                    // Clear the form of errors in case anything was left over
                    setFormErrors(null);

                    // Toggle the ability to click on the submit since the current submission is finished
                    setProcessingSubmit(false);
                })
                .catch((error) => {
                    setError(error.message);
                });
        } else {
            // Toggle the ability to click on the submit since the current submission is finished
            setProcessingSubmit(false);
        }
    };

    useEffect(() => {
        // Get the browser's IP address
        axios.get(IPIFY_GET_IP_URL).then((response) => {
            if (response.status === 200) {
                const { ip } = response.data;

                getResults(ip)
                    .then((response) => {
                        setFormData((prevState) => ({
                            ...prevState,
                            ipAddressOrDomain: ip,
                        }));
                        setResults(response);
                    })
                    .catch((error) => {
                        setError(error.message);
                    });
            }
        });
    }, [setResults]);

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
