import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import FormInput from "../common/FormInput";

import appStyles from "../../../styles/multi-step-form/app.module.scss";

const PersonalInfoFormSet = ({
    intl,
    formData,
    formErrors,
    onChange,
    currentStep = 1,
    totalSteps = 4,
}) => {
    const sectionTitle = intl.formatMessage({
        id: "multiStepForm.personalInfo.title",
    });
    const sectionStep = intl.formatMessage(
        {
            id: "multiStepForm.step",
        },
        {
            current: currentStep,
            total: totalSteps,
        }
    );
    const sectionDescription = intl.formatMessage({
        id: "multiStepForm.personalInfo.description",
    });

    const fields = [
        {
            id: "name",
            labelKey: "multiStepForm.personalInfo.name",
            placeholderKey: "multiStepForm.personalInfo.name.placeholder",
            required: true,
            valueKey: "name",
            type: "text",
        },
        {
            id: "email",
            labelKey: "multiStepForm.personalInfo.email",
            placeholderKey: "multiStepForm.personalInfo.email.placeholder",
            required: true,
            valueKey: "email",
            type: "email",
        },
        {
            id: "phone",
            labelKey: "multiStepForm.personalInfo.phone",
            placeholderKey: "multiStepForm.personalInfo.phone.placeholder",
            required: true,
            valueKey: "phone",
            type: "tel",
        },
    ];
    return (
        <div>
            <h2>
                {sectionTitle}
                <span className="sr-only">&nbsp;({sectionStep})</span>
            </h2>
            <p>{sectionDescription}</p>
            <div className={appStyles.currentFormSet}>
                {fields.map((field, index) => (
                    <FormInput
                        key={`field-${index}`}
                        id={field.id}
                        name={field.id}
                        placeholder={intl.formatMessage({
                            id: field.placeholderKey,
                        })}
                        required={field.required}
                        label={intl.formatMessage({
                            id: field.labelKey,
                        })}
                        value={formData[field.valueKey]}
                        onChange={onChange}
                        errorMessage={formErrors && formErrors[field.valueKey]}
                    />
                ))}
            </div>
        </div>
    );
};

PersonalInfoFormSet.propTypes = {
    intl: PropTypes.object.isRequired,
    formData: PropTypes.object,
    formErrors: PropTypes.object,
    onChange: PropTypes.func,
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
};

export default injectIntl(PersonalInfoFormSet);
