import React from "react";
import PropTypes from "prop-types";

import newDotStyles from "../../styles/notifications-page/newDot.module.scss";

const NewDot = ({ intl, isNew = false, customClasses = [], ...props }) => {
    const dotClasses = [newDotStyles.dot];

    if (customClasses) {
        dotClasses.push(...customClasses);
    }

    return isNew ? (
        <span className={dotClasses.join(" ")} title="New" {...props}>
            &nbsp;
        </span>
    ) : null;
};

NewDot.propTypes = {
    intl: PropTypes.object.isRequired,
    isNew: PropTypes.bool,
    customClasses: PropTypes.arrayOf(PropTypes.string),
};

export default NewDot;
