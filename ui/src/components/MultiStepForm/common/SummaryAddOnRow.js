import React from "react";
import PropTypes from "prop-types";

import Price from "./Price";

import data from "../../../assets/multi-step-form/data.json";

import appStyles from "../../../styles/multi-step-form/app.module.scss";

const SummaryAddOnRow = ({ item, frequency, ...attr }) => {
    const addOnData = data.addOns.find((elem) => elem.name === item.id);
    return (
        <div className={[appStyles.summaryRow, appStyles.summaryAddOn].join(" ")} {...attr}>
            <div>{addOnData.label}</div>
            <div className={appStyles.summaryPrice}>
                +
                <Price
                    amount={addOnData.cost[frequency.value]}
                    frequency={frequency.value}
                    currency={addOnData.cost.currency}
                />
            </div>
        </div>
    );
};

SummaryAddOnRow.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
    }),
    frequency: PropTypes.shape({
        value: PropTypes.string,
    }),
};

export default SummaryAddOnRow;
