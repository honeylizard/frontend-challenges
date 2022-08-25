import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faCheckCircle,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { GlobalContext } from "../../../GlobalStateProvider";

import appStyles from "../../../styles/todo-app/app.module.scss";

const TodoListItem = ({ intl, data }) => {
    const { todoApp: globalData, updateTodoData } = useContext(GlobalContext);

    const toCompletedLabel = intl.formatMessage({
        id: "todoApp.item.toCompleted",
    });
    const toActiveLabel = intl.formatMessage({
        id: "todoApp.item.toActive",
    });
    const deleteLabel = intl.formatMessage({
        id: "todoApp.item.delete",
    });

    const toggleItemStatus = () => {
        const newList = globalData.todoList;
        const objIndex = newList.findIndex((obj) => obj === data);
        newList[objIndex].completed = !data.completed;
        updateTodoData({
            todoList: newList,
        });
    };

    const deleteItem = () => {
        const newList = globalData.todoList.filter((obj) => obj !== data);
        updateTodoData({
            todoList: newList,
        });
    };

    return (
        <li className={appStyles.listItem}>
            <button
                className={appStyles.itemActiveToggleButton}
                title={data.completed ? toActiveLabel : toCompletedLabel}
                onClick={toggleItemStatus}
            >
                <FontAwesomeIcon
                    icon={data.completed ? faCheckCircle : faCircle}
                    aria-hidden="true"
                />
            </button>
            {data.completed ? (
                <span className={appStyles.listItemTitle}>
                    <del>{data.title}</del>
                </span>
            ) : (
                <span className={appStyles.listItemTitle}>{data.title}</span>
            )}
            <button onClick={deleteItem} title={deleteLabel}>
                <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
            </button>
        </li>
    );
};

TodoListItem.propTypes = {
    intl: PropTypes.object.isRequired,
    data: PropTypes.shape({
        order: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool,
    }),
    setRecords: PropTypes.func,
};

export default injectIntl(TodoListItem);
