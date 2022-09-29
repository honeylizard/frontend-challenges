import React, { useContext } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import checkIcon from "../../../assets/todo-app/check-circle-gradient.png";
import checkIconGrey from "../../../assets/todo-app/check-circle-grey.png";
import checkIconGreyLight from "../../../assets/todo-app/check-circle-grey-light.png";
import circleIcon from "../../../assets/todo-app/circle-gradient.png";
import circleIconGrey from "../../../assets/todo-app/circle-grey.png";
import circleIconGreyLight from "../../../assets/todo-app/circle-grey-light.png";

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
                <span className="sr-only">
                    {data.completed ? toActiveLabel : toCompletedLabel}
                </span>
                <img
                    src={
                        data.completed
                            ? globalData.darkMode
                                ? checkIconGrey
                                : checkIconGreyLight
                            : circleIcon
                    }
                    alt=""
                    role="presentation"
                    height="24"
                    width="24"
                    className={appStyles.itemToggleButtonHoverIcon}
                />
                <img
                    src={
                        data.completed
                            ? checkIcon
                            : globalData.darkMode
                            ? circleIconGrey
                            : circleIconGreyLight
                    }
                    alt=""
                    role="presentation"
                    height="24"
                    width="24"
                    className={appStyles.itemToggleButtonIcon}
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
