import React from "react";
import PropTypes from "prop-types";

import FormInput from "../common/FormInput";

import appStyles from "../../../styles/multi-step-form/app.module.scss";

const PersonalInfoFormSet = ({
    formData,
    formErrors,
    onChange,
    currentStep = 1,
    totalSteps = 4,
}) => {
    return (
        <div>
            <h2>
                Personal info
                <span className="sr-only">
                    &nbsp;(Step {currentStep} of {totalSteps})
                </span>
            </h2>
            <p>Please provide your name, email address, and phone number.</p>
            <div className={appStyles.currentFormSet}>
                <FormInput
                    id="name"
                    name="name"
                    placeholder="e.g. Stephen King"
                    required={true}
                    label="Name"
                    value={formData["name"]}
                    onChange={onChange}
                    errorMessage={formErrors && formErrors["name"]}
                />

                <FormInput
                    id="email"
                    name="email"
                    placeholder="e.g. stephenking@lorem.com"
                    required={true}
                    label="Email Address"
                    type="email"
                    value={formData["email"]}
                    onChange={onChange}
                    errorMessage={formErrors && formErrors["email"]}
                />
                <FormInput
                    id="phone"
                    name="phone"
                    placeholder="e.g. +1 234 567 890"
                    required={true}
                    label="Phone Number"
                    type="tel"
                    value={formData["phone"]}
                    onChange={onChange}
                    errorMessage={formErrors && formErrors["phone"]}
                />
            </div>
        </div>
    );
};

PersonalInfoFormSet.propTypes = {
    formData: PropTypes.object,
    formErrors: PropTypes.object,
    onChange: PropTypes.func,
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
};

export default PersonalInfoFormSet;
