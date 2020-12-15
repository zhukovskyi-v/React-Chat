

export const initialState = {
    user: null,
};
export const actionTypes = {
    SET_USER: "SET_USER",
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            localStorage.setItem('user', JSON.stringify(action.user))
            return {
                ...state,
                user: action.user,
            };

        default:
            return state;
    }
};

export default reducer;