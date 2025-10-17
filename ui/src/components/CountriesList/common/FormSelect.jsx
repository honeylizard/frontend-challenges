import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import { GlobalContext } from "../../../GlobalStateProvider";

import FormInputLabel from "./FormInputLabel";

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
    const { countriesApi: globalData } = useContext(GlobalContext);
    const currentTheme = globalData.darkMode;

    const renderOption = (option, index) => {
        return (
            <option key={option.key || index} value={option.value}>
                {option.label}
            </option>
        );
    };

    const parentLevelClasses = [
        formFieldStyles.fieldWrapper,
        currentTheme ? formFieldStyles.fieldWrapperDark : formFieldStyles.fieldWrapperLight,
        errorMessage ? formFieldStyles.invalidField : null,
        classNames ? classNames : null,
    ].filter(Boolean);

    const describedByList = [errorMessage ? `${id}-error` : null, helpMessage ? `${id}-help` : null].filter(Boolean);

    return (
        <div className={parentLevelClasses.join(" ")}>
            <FormInputLabel id={id} label={label} required={required} />
            <div className={formFieldStyles.inputGroup}>
                <select
                    id={id}
                    required={required}
                    value={selectedOptionValue}
                    aria-invalid={errorMessage ? true : false}
                    aria-describedby={describedByList.length > 0 ? describedByList.join(" ") : null}
                    {...attrs}
                >
                    <option value="" disabled={disablePlaceholder}>
                        {placeholder}
                    </option>
                    {options && options.map((opt, index) => renderOption(opt, index))}
                </select>
                {errorMessage && (
                    <div id={`${id}-error`} className={formFieldStyles.fieldErrorText} role="alert">
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
