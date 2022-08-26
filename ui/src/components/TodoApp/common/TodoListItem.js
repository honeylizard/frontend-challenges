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
import Button from "./Button";

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
        const objIndex = newList.findIndex((obj) => obj.title === data.title);
        newList[objIndex].completed = !data.completed;
        updateTodoData({
            todoList: newList,
        });
    };

    const deleteItem = () => {
        const newList = globalData.todoList.filter(
            (obj) => obj.title !== data.title
        );
        updateTodoData({
            todoList: newList,
        });
    };

    return (
        <li className={appStyles.listItem}>
            <Button
                customClasses={[
                    appStyles.itemActiveToggleButton,
                    data.completed ? appStyles.itemToggleButtonChecked : null,
                ]}
                title={data.completed ? toActiveLabel : toCompletedLabel}
                onClick={toggleItemStatus}
            >
                <FontAwesomeIcon
                    icon={data.completed ? faCheckCircle : faCircle}
                    aria-hidden="true"
                />
            </Button>
            {data.completed ? (
                <span className={appStyles.listItemTitle}>
                    <del>{data.title}</del>
                </span>
            ) : (
                <span className={appStyles.listItemTitle}>{data.title}</span>
            )}
            <Button
                customClasses={[appStyles.itemDeleteButton]}
                title={deleteLabel}
                onClick={deleteItem}
            >
                <FontAwesomeIcon icon={faXmark} aria-hidden="true" />
            </Button>
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
