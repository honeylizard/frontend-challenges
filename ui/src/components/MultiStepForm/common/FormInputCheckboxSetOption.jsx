import React from "react";
import PropTypes from "prop-types";

import formFieldStyles from "@styles/multi-step-form/form.module.scss";

const FormInputCheckboxSetOption = ({
    id,
    name,
    values,
    option,
    classNames,
    checkedClassNames,
    labelComponent,
    onChange,
    ...attr
}) => {
    const optionId = `${id}-${option.key || option.name}`;

    const optionLevelClasses = [formFieldStyles.horizontalRow, ...classNames].filter(Boolean);

    const isChecked = values[option.name] === true;

    if (isChecked) {
        optionLevelClasses.push([formFieldStyles.optionChecked, ...checkedClassNames].filter(Boolean));
    }

    const CustomComponent = labelComponent;

    return (
        <div className={optionLevelClasses.join(" ")}>
            <input
                type="checkbox"
                name={`${name}-${option.name}`}
                id={optionId}
                checked={isChecked ? "checked" : false}
                onChange={onChange}
            />
            {labelComponent ? (
                <label htmlFor={optionId}>
                    <CustomComponent data={option} {...attr} />
                </label>
            ) : (
                <label htmlFor={optionId}>{option.label}</label>
            )}
        </div>
    );
};

FormInputCheckboxSetOption.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    values: PropTypes.object,
    option: PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
        label: PropTypes.string,
    }),
    classNames: PropTypes.arrayOf(PropTypes.string),
    checkedClassNames: PropTypes.arrayOf(PropTypes.string),
    labelComponent: PropTypes.func,
    onChange: PropTypes.func,
};

export default FormInputCheckboxSetOption;
