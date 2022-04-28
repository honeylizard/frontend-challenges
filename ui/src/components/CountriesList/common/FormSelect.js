import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import formFieldStyles from "../../../styles/countries-api/form.module.scss";

const FormSelect = ({
    intl,
    id,
    label,
    required = false,
    classNames,
    options = [],
    placeholder = "Select",
    selectedOptionValue = "",
    errorMessage,
    helpMessage,
    disablePlaceholder = true,
    ...attrs
}) => {
    const renderLabel = (id, label, required) => {
        const optionalLabel = intl.formatMessage({ id: "form.optional" });

        return (
            <label htmlFor={id}>
                {label}
                {required ? (
                    <span
                        className={formFieldStyles.requiredText}
                        aria-hidden="true"
                    >
                        {" "}
                        *
                    </span>
                ) : (
                    <span aria-hidden="true"> ({optionalLabel})</span>
                )}
            </label>
        );
    };

    const renderOption = (option, index) => {
        return (
            <option key={option.key || index} value={option.value}>
                {option.label}
            </option>
        );
    };

    const parentLevelClasses = `${formFieldStyles.fieldWrapper} ${
        errorMessage ? formFieldStyles.invalidField : ""
    } ${classNames ? classNames : ""}`;

    return (
        <div className={parentLevelClasses.trim()}>
            {renderLabel(id, label, required)}
            <div className={formFieldStyles.inputGroup}>
                <select
                    id={id}
                    required={required}
                    value={selectedOptionValue}
                    aria-invalid={errorMessage ? true : false}
                    aria-describedby={`${errorMessage ? `${id}-error` : ""} ${
                        helpMessage ? `${id}-help` : ""
                    }`}
                    {...attrs}
                >
                    <option value="" disabled={disablePlaceholder}>
                        {placeholder}
                    </option>
                    {options &&
                        options.map((opt, index) => renderOption(opt, index))}
                </select>
                {errorMessage && (
                    <div
                        id={`${id}-error`}
                        className={formFieldStyles.fieldErrorText}
                        role="alert"
                    >
                        {errorMessage}
                    </div>
                )}
                {helpMessage && (
                    <div
                        id={`${id}-help`}
                        className={formFieldStyles.fieldHelpText}
                    >
                        {helpMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

FormSelect.propTypes = {
    intl: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    classNames: PropTypes.string,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    helpMessage: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string,
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
    selectedOptionValue: PropTypes.string,
    disablePlaceholder: PropTypes.bool,
};

export default injectIntl(FormSelect);
