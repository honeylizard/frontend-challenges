import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import appStyles from "../../../styles/weather-app/app.module.scss";

const WeatherCondition = ({ intl, data, customClasses = [] }) => {
    const conditionLabel = intl.formatMessage({
        id: "weatherApp.condition",
    });

    if (!data || !data?.alt || !data.src) return null;

    return (
        <div className={[appStyles.condition, ...customClasses].join(" ")} title={data?.alt}>
            <span className="sr-only">{conditionLabel}: </span>
            <img src={process.env.PUBLIC_URL + data?.src} alt={data?.alt} />
        </div>
    );
};

WeatherCondition.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    customClasses: PropTypes.arrayOf(PropTypes.string),
};

export default injectIntl(WeatherCondition);
