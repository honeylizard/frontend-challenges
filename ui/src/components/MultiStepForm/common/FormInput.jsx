import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import FormInputLabel from "./FormInputLabel";

import formFieldStyles from "@styles/multi-step-form/form.module.scss";

const FormInput = ({
    intl,
    id,
    label,
    value = "",
    type = "text",
    required = false,
    classNames = [],
    placeholder = "Input Text",
    errorMessage,
    helpMessage,
    hideLabel = false,
    ...attrs
}) => {
    const renderBasicInput = (id, type, value, required, placeholder, errorMessage, helpMessage, attrs) => {
        const describedByList = [errorMessage ? `${id}-error` : null, helpMessage ? `${id}-help` : null].filter(
            Boolean
        );

        return (
            <div className={formFieldStyles.inputWrapper}>
                <input
                    id={id}
                    type={type}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    aria-invalid={errorMessage ? true : false}
                    aria-describedby={describedByList.length > 0 ? describedByList.join(" ") : null}
                    {...attrs}
                />
            </div>
        );
    };

    const parentLevelClasses = [
        formFieldStyles.fieldWrapper,
        errorMessage ? formFieldStyles.invalidField : null,
        ...classNames,
    ].filter(Boolean);

    return (
        <div className={parentLevelClasses.join(" ")}>
            <div className={formFieldStyles.labelAndErrorContainer}>
                <FormInputLabel id={id} label={label} required={required} hideLabel={hideLabel} />
                {errorMessage && (
                    <div id={`${id}-error`} className={formFieldStyles.fieldErrorText} role="alert" aria-atomic="true">
                        {errorMessage}
                    </div>
                )}
            </div>
            <div className={formFieldStyles.inputGroup}>
                {renderBasicInput(id, type, value, required, placeholder, errorMessage, helpMessage, attrs)}
                {helpMessage && (
                    <div id={`${id}-help`} className={formFieldStyles.fieldHelpText}>
                        {helpMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

FormInput.propTypes = {
    intl: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
    classNames: PropTypes.arrayOf(PropTypes.string),
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    helpMessage: PropTypes.string,
    hideLabel: PropTypes.bool,
};

export default injectIntl(FormInput);
