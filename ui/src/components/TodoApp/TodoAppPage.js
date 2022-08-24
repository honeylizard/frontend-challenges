import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { injectIntl } from "react-intl";
import lodash from "lodash";

import { GlobalContext } from "../../GlobalStateProvider";
import Footer from "./Footer";

import appStyles from "../../styles/todo-app/app.module.scss";
import TodoListItem from "./common/TodoListItem";
import ThemeToggleButton from "./common/ThemeToggleButton";
import TodoCreateItemForm from "./common/TodoCreateItemForm";

const TodoAppPage = ({ intl }) => {
    const { todoApp: globalData, updateTodoData } = useContext(GlobalContext);
    const FILTER_COMPLETED = "completed";
    const FILTER_ACTIVE = "active";
    const [filter, setFilter] = useState(null);
    const [records, setRecords] = useState(globalData.todoList);
    const [filteredRecords, setFilteredRecords] = useState([]);

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
        setFilter(FILTER_COMPLETED);
    };

    const showOnlyActiveItems = () => {
        setFilter(FILTER_ACTIVE);
    };

    const filterRecords = (list, currentFilter) => {
        let output = [];
        switch (currentFilter) {
            case FILTER_COMPLETED:
                output = list.filter((item) => item.completed);
                break;
            case FILTER_ACTIVE:
                output = list.filter((item) => !item.completed);
                break;
            default:
                output = list;
                break;
        }
        return output;
    };

    useEffect(() => {
        // Initialize the list of todos based on the previously saved data or our example set of items
        const previousTodoList = JSON.parse(localStorage.getItem("todoList"));
        const initialData = [
            {
                title: "Complete online Javascript course",
                completed: true,
                order: 1,
            },
            {
                title: "Jog around the park 3x",
                completed: false,
                order: 2,
            },
            {
                title: "10 minutes meditation",
                completed: false,
                order: 3,
            },
        ];
        updateTodoData({
            todoList:
                previousTodoList?.length > 0 ? previousTodoList : initialData,
        });
    }, []);

    useEffect(() => {
        setRecords(globalData.todoList);
        setFilteredRecords(
            lodash.orderBy(filterRecords(records, filter), ["order"], ["title"])
        );
    }, [globalData]);

    useEffect(() => {
        setFilteredRecords(
            lodash.orderBy(filterRecords(records, filter), ["order"], ["title"])
        );
    }, [filter, records]);

    const activeRecords = records.filter((item) => !item.completed);

    return (
        <div className={appStyles.container}>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap"
                />
            </Helmet>
            <main id="content">
                <div className={appStyles.wrapper}>
                    <div className={appStyles.header}>
                        <h1 className={appStyles.appTitle}>Todo</h1>
                        <ThemeToggleButton />
                    </div>
                    <TodoCreateItemForm />
                    <ul>
                        {filteredRecords &&
                            filteredRecords.length > 0 &&
                            filteredRecords.map((item, index) => (
                                <TodoListItem
                                    key={`todo-item-${item.title
                                        .replace(/\s+/g, "-")
                                        .toLowerCase()}-${item.order}`}
                                    index={index}
                                    data={item}
                                />
                            ))}
                    </ul>
                    <div className={appStyles.listFooterContainer}>
                        <div className={appStyles.listFooterLeft}>
                            {activeRecords.length} items left
                        </div>
                        <div className={appStyles.filterButtonsContainer}>
                            <button onClick={showAllItems}>All</button>
                            <button onClick={showOnlyActiveItems}>
                                Active
                            </button>
                            <button onClick={showOnlyCompletedItems}>
                                Completed
                            </button>
                        </div>
                        <div className={appStyles.listFooterRight}>
                            <button onClick={clearCompletedItems}>
                                Clear Completed Todos
                            </button>
                        </div>
                    </div>
                    <div className={appStyles.dragDropNotice}>
                        Drag and drop to reorder list
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

TodoAppPage.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(TodoAppPage);
