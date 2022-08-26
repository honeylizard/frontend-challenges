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
import TodoListFooter from "./common/TodoListFooter";

const TodoAppPage = ({ intl }) => {
    const { todoApp: globalData, updateTodoData } = useContext(GlobalContext);
    const [filter, setFilter] = useState(null);
    const [records, setRecords] = useState(globalData.todoList);
    const [filteredRecords, setFilteredRecords] = useState([]);

    const appTitle = intl.formatMessage({
        id: "todoApp.header.title",
    });
    const dragAndDropLabel = intl.formatMessage({
        id: "todoApp.dragAndDrop",
    });

    const filterRecords = (list, currentFilter) => {
        let output = [];
        switch (currentFilter) {
            case globalData.FILTER_COMPLETED:
                output = list.filter((item) => item.completed);
                break;
            case globalData.FILTER_ACTIVE:
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
    }, [updateTodoData]);

    useEffect(() => {
        setRecords(globalData.todoList);
        setFilteredRecords(
            lodash.orderBy(filterRecords(records, filter), ["order"], ["title"])
        );
    }, [globalData, filter, records]);

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
                        <h1 className={appStyles.appTitle}>{appTitle}</h1>
                        <ThemeToggleButton />
                    </div>
                    <TodoCreateItemForm />
                    <div className={appStyles.listContainer}>
                        <ul className={appStyles.list}>
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
                        <TodoListFooter
                            records={records}
                            filteredRecords={activeRecords}
                            setFilter={setFilter}
                            filter={filter}
                        />
                    </div>
                    <div className={appStyles.dragDropNotice}>
                        {dragAndDropLabel}
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
