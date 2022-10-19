import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import { GlobalContext } from "../../../GlobalStateProvider";
import appStyles from "../../../styles/time-tracking-dashboard/filter-button.module.scss";

const FilterButton = ({ label, filterCode }) => {
    const { updateTimeTrackingData, timeTrackingDashboard: globalData } =
        useContext(GlobalContext);
    const [currentFilter, setCurrentFilter] = useState(null);

    const handleFilterClick = (newFilter) => {
        if (currentFilter !== newFilter) {
            updateTimeTrackingData({
                currentFilter: newFilter,
            });
        }
    };

    useEffect(() => {
        if (currentFilter !== globalData.currentFilter) {
            setCurrentFilter(globalData.currentFilter);
        }
    }, [globalData.currentFilter, currentFilter]);

    return (
        <button
            className={appStyles.filterButton}
            onClick={() => handleFilterClick(filterCode)}
        >
            {label}
        </button>
    );
};

FilterButton.propTypes = {
    label: PropTypes.string.isRequired,
    filterCode: PropTypes.string.isRequired,
};

export default injectIntl(FilterButton);
