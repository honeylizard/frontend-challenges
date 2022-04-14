import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import GlobalStateReducer from "./GlobalStateReducer";

const initialState = {
    countriesApi: {
        darkMode: false,
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

    return (
        <GlobalContext.Provider
            value={{
                countriesApi: state.countriesApi,
                updateCountriesData,
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
