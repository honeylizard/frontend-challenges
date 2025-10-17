import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";

import GlobalStateReducer from "./GlobalStateReducer";
import { getInitialWeatherData } from "./components/WeatherApp/utils/initialData";

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
        darkMode: false,
        FILTER_COMPLETED: "completed",
        FILTER_ACTIVE: "active",
    },
    timeTrackingDashboard: {
        currentFilter: "daily",
        DAILY_KEY: "daily",
        WEEKLY_KEY: "weekly",
        MONTHLY_KEY: "monthly",
    },
    weatherApp: getInitialWeatherData(),
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

    function updateTimeTrackingData(item) {
        dispatch({
            type: "UPDATE_TIME_TRACKING",
            payload: item,
        });
    }

    function updateWeatherAppData(item) {
        console.log("updateWeatherAppData", item);
        dispatch({
            type: "UPDATE_WEATHER",
            payload: item,
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                countriesApi: state.countriesApi,
                calculatorApp: state.calculatorApp,
                todoApp: state.todoApp,
                timeTrackingDashboard: state.timeTrackingDashboard,
                weatherApp: state.weatherApp,
                updateCountriesData,
                updateCalcData,
                updateTodoData,
                updateTimeTrackingData,
                updateWeatherAppData,
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
