import React from "react";
import PropTypes from "prop-types";

import appStyles from "../../../styles/time-tracking-dashboard/timeframe.module.scss";

const TimeFrame = ({
    currentLabel = "Current",
    previousLabel = "Previous",
    data,
}) => {
    return (
        data && (
            <div className={appStyles.timeFrameWrapper}>
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
    currentLabel: PropTypes.string,
    previousLabel: PropTypes.string,
    data: PropTypes.object,
};

export default TimeFrame;
