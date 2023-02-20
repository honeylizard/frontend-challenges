import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import formFieldStyles from "../../../styles/todo-app/form.module.scss";

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
    const renderLabel = (id, label, required) => {
        const optionalLabel = intl.formatMessage({ id: "form.optional" });

        return (
            <label htmlFor={id} className={hideLabel ? "sr-only" : null}>
                {label}
                {required ? (
                    <span className={formFieldStyles.requiredText} aria-hidden="true">
                        {" "}
                        *
                    </span>
                ) : (
                    <span aria-hidden="true"> ({optionalLabel})</span>
                )}
            </label>
        );
    };

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
                {errorMessage && (
                    <div className={formFieldStyles.suffixIcon}>
                        <FontAwesomeIcon icon={faCircleExclamation} aria-hidden="true" />
                    </div>
                )}
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
            {renderLabel(id, label, required)}
            <div className={formFieldStyles.inputGroup}>
                {renderBasicInput(id, type, value, required, placeholder, errorMessage, helpMessage, attrs)}
                {errorMessage && (
                    <div id={`${id}-error`} className={formFieldStyles.fieldErrorText} role="alert" aria-atomic="true">
                        {errorMessage}
                    </div>
                )}
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
    classNames: PropTypes.array,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    helpMessage: PropTypes.string,
    hideLabel: PropTypes.bool,
};

export default injectIntl(FormInput);
