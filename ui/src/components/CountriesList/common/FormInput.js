import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../../../GlobalStateProvider";
import formFieldStyles from "../../../styles/countries-api/form.module.scss";

const FormInput = ({
    intl,
    id,
    label,
    value = "",
    type = "text",
    required = false,
    classNames,
    placeholder = "Input Text",
    errorMessage,
    helpMessage,
    ...attrs
}) => {
    const { countriesApi: globalData } = useContext(GlobalContext);
    const currentTheme = globalData.darkMode;

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

    const renderBasicInput = (
        id,
        type,
        value,
        required,
        placeholder,
        errorMessage,
        helpMessage,
        attrs
    ) => {
        const describedByList = [
            errorMessage ? `${id}-error` : null,
            helpMessage ? `${id}-help` : null,
        ].filter(Boolean);

        return type === "search" ? (
            <div className={formFieldStyles.inputWrapper}>
                <div className={formFieldStyles.prefixIcon}>
                    <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
                </div>
                <input
                    id={id}
                    type={type}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    aria-invalid={errorMessage ? true : false}
                    aria-describedby={
                        describedByList.length > 0
                            ? describedByList.join(" ")
                            : null
                    }
                    {...attrs}
                />
            </div>
        ) : (
            <div className={formFieldStyles.inputWrapper}>
                <input
                    id={id}
                    type={type}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    aria-invalid={errorMessage ? true : false}
                    aria-describedby={
                        describedByList.length > 0
                            ? describedByList.join(" ")
                            : null
                    }
                    {...attrs}
                />
            </div>
        );
    };

    const parentLevelClasses = [
        formFieldStyles.fieldWrapper,
        currentTheme
            ? formFieldStyles.fieldWrapperDark
            : formFieldStyles.fieldWrapperLight,
        errorMessage ? formFieldStyles.invalidField : null,
        classNames ? classNames : null,
    ].filter(Boolean);

    return (
        <div className={parentLevelClasses.join(" ")}>
            {renderLabel(id, label, required)}
            <div className={formFieldStyles.inputGroup}>
                {renderBasicInput(
                    id,
                    type,
                    value,
                    required,
                    placeholder,
                    errorMessage,
                    helpMessage,
                    attrs
                )}
                {errorMessage && (
                    <div
                        id={`${id}-error`}
                        className={formFieldStyles.fieldErrorText}
                        role="alert"
                        aria-atomic="true"
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

FormInput.propTypes = {
    intl: PropTypes.object.isRequired,
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
    classNames: PropTypes.string,
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
    helpMessage: PropTypes.string,
};

export default injectIntl(FormInput);
