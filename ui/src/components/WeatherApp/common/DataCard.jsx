import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import styles from "@styles/weather-app/current-data-card.module.scss";

const DataCard = ({ label, value, isLoading = true }) => {
    return (
        <div className={styles.secondaryCard}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>{isLoading || !value ? "-" : value}</div>
        </div>
    );
};

DataCard.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    isLoading: PropTypes.bool,
};

export default injectIntl(DataCard);
