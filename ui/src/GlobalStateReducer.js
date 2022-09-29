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
        case "UPDATE_TODOS":
            if (action.payload.todoList) {
                localStorage.setItem(
                    "todoList",
                    JSON.stringify(action.payload.todoList)
                );
            }
            return {
                todoApp: {
                    ...state.todoApp,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export default GlobalStateReducer;
