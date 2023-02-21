import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import appStyles from "../../../styles/multi-step-form/app.module.scss";

const StepNavItem = ({ intl, title, number = 0, isCurrent = false, isCompleted = false }) => {
    const completedPrefix = intl.formatMessage({
        id: "multiStepForm.nav.completed",
    });
    const stepNumber = intl.formatMessage(
        {
            id: "multiStepForm.nav.step",
        },
        {
            number: number,
        }
    );

    const numberClasses = [appStyles.sidebarNumber];

    if (isCurrent) {
        numberClasses.push(appStyles.sidebarNumberCurrent);
    }

    return (
        <div className={appStyles.sidebarNavItem} aria-current={isCurrent ? "step" : false}>
            <div aria-hidden="true" className={numberClasses.join(" ")}>
                {number}
            </div>
            <div className={appStyles.sidebarStepLabel}>
                {isCompleted && <span className="sr-only">{completedPrefix}&nbsp;</span>}
                <div className={appStyles.sidebarStepNumber}>{stepNumber}</div>
                <div className={appStyles.sidebarStepTitle}>{title}</div>
            </div>
        </div>
    );
};

StepNavItem.propTypes = {
    intl: PropTypes.object.isRequired,
    title: PropTypes.string,
    number: PropTypes.number,
    isCurrent: PropTypes.bool,
    isCompleted: PropTypes.bool,
};

export default injectIntl(StepNavItem);
