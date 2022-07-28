const GlobalStateReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_COUNTRIES":
            return {
                countriesApi: {
                    ...state.countriesApi,
                    ...action.payload,
                },
            };
        case "UPDATE_CALCULATOR":
            localStorage.setItem("calculatorTheme", action.payload.theme);
            return {
                calculatorApp: {
                    ...state.calculatorApp,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export default GlobalStateReducer;
