import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import GlobalStateReducer from "./GlobalStateReducer";

const initialState = {
    countriesApi: {
        darkMode: false,
        currentFilters: null,
    },
    calculatorApp: {
        theme: null,
        output: "",
        formula: "",
        error: null,
    },
    todoApp: {
        todoList: [],
        FILTER_COMPLETED: "completed",
        FILTER_ACTIVE: "active",
    },
};

const GlobalContext = createContext(initialState);

const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(GlobalStateReducer, initialState);

    // Actions for changing state

    function updateCountriesData(item) {
        dispatch({
            type: "UPDATE_COUNTRIES",
            payload: item,
        });
    }

    function updateCalcData(item) {
        dispatch({
            type: "UPDATE_CALCULATOR",
            payload: item,
        });
    }

    function updateTodoData(item) {
        dispatch({
            type: "UPDATE_TODOS",
            payload: item,
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                countriesApi: state.countriesApi,
                calculatorApp: state.calculatorApp,
                todoApp: state.todoApp,
                updateCountriesData,
                updateCalcData,
                updateTodoData,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

GlobalProvider.propTypes = {
    children: PropTypes.node,
};

export { GlobalProvider, GlobalContext };
