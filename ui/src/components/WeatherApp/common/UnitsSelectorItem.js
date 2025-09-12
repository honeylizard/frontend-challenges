import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import checkmarkIcon from "../../../assets/weather-app/icon-checkmark.svg";

import styles from "../../../styles/weather-app/units-selector.module.scss";

const UnitsSelectorItem = ({ intl, label, isSelected = false }) => {
    const selectedLabel = intl.formatMessage({
        id: "weatherApp.selected",
    });

    return (
        <div className={isSelected ? styles.itemSelected : styles.item}>
            {label}
            {isSelected && (
                <span>
                    <span className="sr-only">{selectedLabel}</span>
                    <img src={checkmarkIcon} alt="" role="presentation" />
                </span>
            )}
        </div>
    );
};

UnitsSelectorItem.propTypes = {
    intl: PropTypes.object.isRequired,
    label: PropTypes.element.isRequired,
    isSelected: PropTypes.bool,
};

export default injectIntl(UnitsSelectorItem);
