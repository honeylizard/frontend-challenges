import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import { GlobalContext } from "../../../GlobalStateProvider";
import Button from "./Button";

import appStyles from "../../../styles/todo-app/app.module.scss";

const TodoListFooterFilterSet = ({ intl, setFilter, filter, isMobile }) => {
    const { todoApp: globalData } = useContext(GlobalContext);

    const filterLabelAll = intl.formatMessage({ id: "todoApp.filters.all" });
    const filterLabelActive = intl.formatMessage({
        id: "todoApp.filters.active",
    });
    const filterLabelCompleted = intl.formatMessage({
        id: "todoApp.filters.completed",
    });

    const showAllItems = () => {
        setFilter(null);
    };

    const showOnlyCompletedItems = () => {
        setFilter(globalData.FILTER_COMPLETED);
    };

    const showOnlyActiveItems = () => {
        setFilter(globalData.FILTER_ACTIVE);
    };

    const getActiveFilterStyle = (expectedFilter) => {
        if (expectedFilter && filter === expectedFilter) {
            return [appStyles.filterButton, appStyles.activeFilter];
        }
        if (!filter && !expectedFilter) {
            return [appStyles.filterButton, appStyles.activeFilter];
        }
        return [appStyles.filterButton];
    };

    return (
        <div className={isMobile ? appStyles.mobileFilterButtonsContainer : appStyles.filterButtonsContainer}>
            <Button onClick={showAllItems} customClasses={getActiveFilterStyle(null)}>
                {filterLabelAll}
            </Button>
            <Button onClick={showOnlyActiveItems} customClasses={getActiveFilterStyle(globalData.FILTER_ACTIVE)}>
                {filterLabelActive}
            </Button>
            <Button onClick={showOnlyCompletedItems} customClasses={getActiveFilterStyle(globalData.FILTER_COMPLETED)}>
                {filterLabelCompleted}
            </Button>
        </div>
    );
};

TodoListFooterFilterSet.propTypes = {
    intl: PropTypes.object.isRequired,
    setFilter: PropTypes.func,
    filter: PropTypes.string,
    isMobile: PropTypes.bool,
};

export default injectIntl(TodoListFooterFilterSet);
