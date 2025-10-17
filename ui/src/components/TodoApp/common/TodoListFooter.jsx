import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";

import { GlobalContext } from "../../../GlobalStateProvider";
import Button from "./Button";
import TodoListFooterFilterSet from "./TodoListFooterFilterSet";

import appStyles from "@styles/todo-app/app.module.scss";

const TodoListFooter = ({ intl, records, filteredRecords, setFilter, filter, isDesktop }) => {
    const { updateTodoData } = useContext(GlobalContext);

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
            {isDesktop && <TodoListFooterFilterSet setFilter={setFilter} filter={filter} />}
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
    isDesktop: PropTypes.bool,
};

export default injectIntl(TodoListFooter);
