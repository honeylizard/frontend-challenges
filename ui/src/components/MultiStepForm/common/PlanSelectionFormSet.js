import React from "react";
import PropTypes from "prop-types";

import FormInput from "./FormInput";

import appStyles from "../../../styles/multi-step-form/app.module.scss";

const PlanSelectionFormSet = ({
    formData,
    formErrors,
    onChange,
    currentStep = 2,
    totalSteps = 4,
}) => {
    return (
        <div>
            <h2>
                Select your plan
                <span className="sr-only">
                    &nbsp;(Step {currentStep} of {totalSteps})
                </span>
            </h2>
            <p>You have the option of monthly or yearly billing.</p>
            <div className={appStyles.currentFormSet}>
                <div>
                    <div>Arcade $9/mo</div>
                    <div>Advanced $12/mo</div>
                    <div>Pro $15/mo</div>
                </div>
                <div>Monthly Yearly</div>
            </div>
        </div>
    );
};

PlanSelectionFormSet.propTypes = {
    formData: PropTypes.object,
    formErrors: PropTypes.object,
    onChange: PropTypes.func,
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
};

export default PlanSelectionFormSet;
