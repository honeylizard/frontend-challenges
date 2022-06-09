const GlobalStateReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_COUNTRIES":
            return {
                countriesApi: {
                    ...state.countriesApi,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export default GlobalStateReducer;