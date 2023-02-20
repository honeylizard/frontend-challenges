import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

import { GlobalContext } from "../../../GlobalStateProvider";

import FormInput from "./FormInput";
import Alert from "./Alert";
import Button from "./Button";
// import _ from "lodash";

import appStyles from "../../../styles/todo-app/app.module.scss";

const TodoCreateItemForm = ({ intl }) => {
    const { todoApp: globalData, updateTodoData } = useContext(GlobalContext);

    const initialFormData = {
        newTodoItem: "",
    };

    const [processingSubmit, setProcessingSubmit] = useState(false); // Toggle for disabling submit button for form
    const [formData, setFormData] = useState(initialFormData); // Set of form fields and "hidden" fields that will be passed through when submitted
    const [formErrors, setFormErrors] = useState(null); // Set of form field errors

    const updateValue = (event) => {
        const { id, name, value: newValue } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name || id]: newValue,
        }));
    };

    const addNewTodo = (newTodo) => {
        const newList = globalData.todoList;
        const newTodoItem = {
            title: newTodo,
            completed: false,
            order: newList.length - 1,
        };
        newList.push(newTodoItem);

        updateTodoData({
            todoList: newList,
        });
    };

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        // Toggle the ability to click on the submit while the current submission is processing
        setProcessingSubmit(true);

        const isValidForm = true; // create a function if validation is needed

        if (isValidForm) {
            addNewTodo(formData["newTodoItem"]);

            // Clear the form of errors in case anything was left over
            setFormErrors(null);

            // Clear the form for a new submission
            setFormData(initialFormData);
        } else {
            // Set the applicable message and provide a polite alert for accessibility purposes to notify users that at least one error occurred.
            setFormErrors((prevState) => ({
                ...prevState,
                general: intl.formatMessage({ id: "todoApp.form.error" }),
            }));
        }

        // Toggle the ability to click on the submit since the current submission is finished
        setProcessingSubmit(false);
    };

    return (
        <React.Fragment>
            <div id="alertContainer">
                {formErrors && Object.keys(formErrors).includes("general") && (
                    <Alert id="generalError" type="error" message={formErrors["general"]} />
                )}
            </div>
            <form onSubmit={handleSubmit} className={appStyles.formContainer}>
                <FontAwesomeIcon icon={faCircle} aria-hidden="true" className={appStyles.formToggleIcon} />
                <FormInput
                    id="new-todo-item"
                    name="newTodoItem"
                    placeholder={intl.formatMessage({
                        id: "todoApp.form.newTodo.placeholder",
                    })}
                    required={true}
                    label={intl.formatMessage({
                        id: "todoApp.form.newTodo.label",
                    })}
                    hideLabel={true}
                    value={formData["newTodoItem"]}
                    onChange={updateValue}
                    errorMessage={formErrors && formErrors["newTodoItem"]}
                    classNames={[appStyles.formInput]}
                />
                <Button
                    type="submit"
                    disabled={processingSubmit}
                    customClasses={[appStyles.formSubmit]}
                    aria-describedby="new-todo-item"
                >
                    {intl.formatMessage({ id: "todoApp.form.submit" })}
                </Button>
            </form>
        </React.Fragment>
    );
};

TodoCreateItemForm.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(TodoCreateItemForm);
