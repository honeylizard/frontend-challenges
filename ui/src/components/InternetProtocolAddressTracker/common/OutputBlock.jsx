import React from "react";
import PropTypes from "prop-types";

import outputStyles from "../../../styles/ip-address-tracker/output.module.scss";

const OutputBlock = ({ label, value, value2 = null }) => {
    return (
        <div className={outputStyles.outputBlock}>
            <h2 className={outputStyles.outputBlockHeader}>{label}</h2>
            {!value ? "" : <div>{value}</div>}
            {!value2 ? "" : <div>{value2}</div>}
        </div>
    );
};

OutputBlock.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    value: PropTypes.string,
    value2: PropTypes.string,
};

export default OutputBlock;
