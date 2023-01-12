import React from "react";
import PropTypes from "prop-types";

import appStyles from "../../../styles/multi-step-form/app.module.scss";

const SummaryFormSet = ({
    formData,
    formErrors,
    currentStep = 4,
    totalSteps = 4,
}) => {
    return (
        <div>
            <h2>
                Finishing up
                <span className="sr-only">
                    &nbsp;(Step {currentStep} of {totalSteps})
                </span>
            </h2>
            <p>Double-check everything looks OK before confirming.</p>
            <div className={appStyles.currentFormSet}>
                <div>
                    ...Dynamically add subscription and add-on selections
                    here...
                </div>
                <div>Total (per month/year)</div>
            </div>
        </div>
    );
};

SummaryFormSet.propTypes = {
    formData: PropTypes.object,
    formErrors: PropTypes.object,
    onChange: PropTypes.func,
    currentStep: PropTypes.number,
    totalSteps: PropTypes.number,
};

export default SummaryFormSet;
