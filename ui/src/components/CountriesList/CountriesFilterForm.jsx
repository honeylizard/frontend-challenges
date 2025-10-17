import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import FormInput from "./common/FormInput";
import Button from "./common/Button";
import FormSelect from "./common/FormSelect";
import Alert from "./common/Alert";
import { GlobalContext } from "../../GlobalStateProvider";
import filterFormFieldStyles from "@styles/countries-api/countries-filter-form.module.scss";

const CountriesFilterForm = ({ intl, regionOptions }) => {
    const { updateCountriesData, countriesApi: globalData } = useContext(GlobalContext);
    const currentTheme = globalData.darkMode;
    const currentFilters = globalData.currentFilters;

    const initialFormData = {
        countrySearchName: currentFilters?.name || "",
        countrySearchRegion: currentFilters?.region || "", // Must set to "" for select fields
    };
    const [formData, setFormData] = useState(initialFormData); // Set of form fields and "hidden" fields that will be passed through when submitted
    const [formErrors, setFormErrors] = useState(null); // Set of form field errors
    const [processingSubmit, setProcessingSubmit] = useState(false); // Toggle for disabling submit button for form
    const [successfulSubmission, setSuccessfulSubmission] = useState(false); // Toggle for success alert message visibility
    const alertRef = React.useRef();

    const fieldNameLabel = intl.formatMessage({
        id: "countriesApi.filter.name.label",
    });
    const fieldNamePlaceholder = intl.formatMessage({
        id: "countriesApi.filter.name.placeholder",
    });
    const fieldRegionLabel = intl.formatMessage({
        id: "countriesApi.filter.region.label",
    });
    const fieldRegionDefaultOptionLabel = intl.formatMessage({
        id: "countriesApi.filter.region.all",
    });

    const submitButtonLabel = intl.formatMessage({
        id: "countriesApi.filter.submit.label",
    });

    const updateValue = (event) => {
        const { id, name, value: newValue } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name || id]: newValue,
        }));
    };

    const submitFilterForm = (event) => {
        if (event) {
            event.preventDefault();
        }

        // Toggle the ability to click on the submit while the current submission is processing
        setProcessingSubmit(true);

        // Update the current filters context for reference in other components
        updateCountriesData({
            currentFilters: {
                name: formData["countrySearchName"],
                region: formData["countrySearchRegion"],
            },
        });

        const isValidForm = true; // create a function if validation is needed

        if (isValidForm) {
            // Update the polite alert for accessibility purposes to notify users that the list is updated
            setSuccessfulSubmission(intl.formatMessage({ id: "countriesApi.filter.success" }));

            // Clear the form of errors in case anything was left over
            setFormErrors(null);
        } else {
            // Set the applicable message and provide a polite alert for accessibility purposes to notify users that at least one error occurred.
            setFormErrors((prevState) => ({
                ...prevState,
                general: intl.formatMessage({
                    id: "countriesApi.filter.error",
                }),
            }));

            // Clear the form of success in case anything was left over
            setSuccessfulSubmission(false);

            // Change focus to the top most error on the page
            alertRef.current.focus();
        }

        // Toggle the ability to click on the submit since the current submission is finished
        setProcessingSubmit(false);
    };

    const classes = [
        filterFormFieldStyles.formWrapper,
        currentTheme ? filterFormFieldStyles.formWrapperDark : filterFormFieldStyles.formWrapperLight,
    ].filter(Boolean);

    return (
        <form onSubmit={submitFilterForm} className={classes.join(" ")}>
            <div role="search">
                <div
                    id="alertContainer"
                    ref={alertRef}
                    autoFocus={true} // eslint-disable-line jsx-a11y/no-autofocus
                    tabIndex={-1}
                >
                    {formErrors && Object.keys(formErrors).includes("general") && (
                        <Alert id="generalError" type="error" message={formErrors["general"]} />
                    )}
                </div>
                <div role="status" aria-live="polite" className="sr-only">
                    {successfulSubmission && (
                        <Alert id="generalSuccess" type="success" message={successfulSubmission} />
                    )}
                </div>

                <div className={filterFormFieldStyles.fieldsWrapper}>
                    <FormInput
                        label={fieldNameLabel}
                        id="country-search-name"
                        name="countrySearchName"
                        placeholder={fieldNamePlaceholder}
                        errorMessage={formErrors && formErrors["countrySearchName"]}
                        value={formData["countrySearchName"]}
                        onChange={updateValue}
                        type="search"
                        classNames={[filterFormFieldStyles.formField, filterFormFieldStyles.fieldWrapperStretch].join(
                            " "
                        )}
                    />

                    {
                        // TODO: Style the dropdown?
                    }
                    {regionOptions && regionOptions.length > 0 && (
                        <FormSelect
                            id="country-search-region"
                            name="countrySearchRegion"
                            label={fieldRegionLabel}
                            errorMessage={formErrors && formErrors["countrySearchRegion"]}
                            selectedOptionValue={formData["countrySearchRegion"]}
                            placeholder={fieldRegionDefaultOptionLabel}
                            disablePlaceholder={false}
                            options={regionOptions.map((option) => ({
                                label: option,
                                value: option,
                            }))}
                            onChange={updateValue}
                            classNames={filterFormFieldStyles.formField}
                        />
                    )}

                    <div className={filterFormFieldStyles.buttonSet}>
                        <Button
                            type="submit"
                            disabled={processingSubmit}
                            customClasses={[filterFormFieldStyles.submitButton]}
                        >
                            {submitButtonLabel}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

CountriesFilterForm.propTypes = {
    intl: PropTypes.object.isRequired,
    regionOptions: PropTypes.array,
};

export default injectIntl(CountriesFilterForm);
