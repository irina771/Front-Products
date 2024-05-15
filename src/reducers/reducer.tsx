const initialState = {
    products: [],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "POST_PRODUCT":
           
            return {
                ...state,
                products: [...state.products, action.payload], 
            };
        default:
            return state;
    }
}

export default rootReducer;
