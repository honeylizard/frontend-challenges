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

    return (
        <GlobalContext.Provider
            value={{
                countriesApi: state.countriesApi,
                calculatorApp: state.calculatorApp,
                updateCountriesData,
                updateCalcData,
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
