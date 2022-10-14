import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import appStyles from "../../../styles/time-tracking-dashboard/app.module.scss";

const TimeFrame = ({
    intl,
    currentLabel = "Current",
    previousLabel = "Previous",
    data,
}) => {
    return (
        data && (
            <div>
                <div className={appStyles.current}>
                    <span className="sr-only">{currentLabel}:</span>{" "}
                    {data.current}
                </div>
                <div className={appStyles.previous}>
                    {previousLabel} - {data.previous}
                </div>
            </div>
        )
    );
};

TimeFrame.propTypes = {
    intl: PropTypes.object.isRequired,
    currentLabel: PropTypes.string,
    previousLabel: PropTypes.string,
    data: PropTypes.object,
};

export default injectIntl(TimeFrame);
