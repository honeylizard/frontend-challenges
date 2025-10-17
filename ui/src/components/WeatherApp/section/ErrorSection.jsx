import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import errorIcon from "@resources/weather-app/icon-error.svg";
import retryIcon from "@resources/weather-app/icon-retry.svg";

import styles from "@styles/weather-app/error-section.module.scss";

const ErrorSection = ({ intl, handleReset }) => {
    const titleLabel = intl.formatMessage({
        id: "weatherApp.error.title",
    });
    const descriptionLabel = intl.formatMessage({
        id: "weatherApp.error.description",
    });
    const resetLabel = intl.formatMessage({
        id: "weatherApp.error.reset",
    });

    return (
        <section className={styles.error}>
            <img src={errorIcon} alt="" role="presentation" className={styles.icon} />
            <h2 className={styles.title}>{titleLabel}</h2>
            <p className={styles.content}>{descriptionLabel}</p>
            <button type="button" onClick={handleReset} className={styles.button}>
                <img src={retryIcon} alt="" role="presentation" />
                {resetLabel}
            </button>
        </section>
    );
};

ErrorSection.propTypes = {
    intl: PropTypes.object.isRequired,
    handleReset: PropTypes.func.isRequired,
};

export default injectIntl(ErrorSection);
