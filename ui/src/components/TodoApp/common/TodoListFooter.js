import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import { GlobalContext } from "../../../GlobalStateProvider";
import Button from "./Button";

import appStyles from "../../../styles/todo-app/app.module.scss";

const TodoListFooter = ({
    intl,
    records,
    filteredRecords,
    setFilter,
    filter,
}) => {
    const { todoApp: globalData, updateTodoData } = useContext(GlobalContext);

    const filterLabelAll = intl.formatMessage({ id: "todoApp.filters.all" });
    const filterLabelActive = intl.formatMessage({
        id: "todoApp.filters.active",
    });
    const filterLabelCompleted = intl.formatMessage({
        id: "todoApp.filters.completed",
    });
    const clearCompletedItemsTitle = intl.formatMessage({
        id: "todoApp.clearCompletedTodos",
    });
    const clearCompletedItemsLabel = intl.formatMessage({
        id: "todoApp.clearCompleted",
    });

    const clearCompletedItems = () => {
        const newList = records.filter((item) => !item.completed);
        updateTodoData({
            todoList: newList,
        });
    };

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
        <div className={appStyles.listFooterContainer}>
            <div className={appStyles.listFooterLeft}>
                {intl.formatMessage(
                    {
                        id: "todoApp.list.count",
                    },
                    {
                        count: filteredRecords.length,
                    }
                )}
            </div>
            <div className={appStyles.filterButtonsContainer}>
                <Button
                    onClick={showAllItems}
                    customClasses={getActiveFilterStyle(null)}
                >
                    {filterLabelAll}
                </Button>
                <Button
                    onClick={showOnlyActiveItems}
                    customClasses={getActiveFilterStyle(
                        globalData.FILTER_ACTIVE
                    )}
                >
                    {filterLabelActive}
                </Button>
                <Button
                    onClick={showOnlyCompletedItems}
                    customClasses={getActiveFilterStyle(
                        globalData.FILTER_COMPLETED
                    )}
                >
                    {filterLabelCompleted}
                </Button>
            </div>
            <div className={appStyles.listFooterRight}>
                <Button
                    onClick={clearCompletedItems}
                    aria-label={clearCompletedItemsTitle}
                    customClasses={[appStyles.clearButton]}
                >
                    {clearCompletedItemsLabel}
                </Button>
            </div>
        </div>
    );
};

TodoListFooter.propTypes = {
    intl: PropTypes.object.isRequired,
    records: PropTypes.array,
    filteredRecords: PropTypes.array,
    setFilter: PropTypes.func,
    filter: PropTypes.string,
};

export default injectIntl(TodoListFooter);
