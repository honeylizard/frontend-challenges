import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faCheckCircle,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

import appStyles from "../../../styles/todo-app/app.module.scss";

const TodoListItem = ({ intl, data }) => {
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
        // TODO: add logic to toggle the item's status
    };

    const deleteItem = () => {
        // TODO: add logic to remove hte item from the list
    };

    return (
        <li>
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
                <span>
                    <del>{data.title}</del>
                </span>
            ) : (
                <span>{data.title}</span>
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
