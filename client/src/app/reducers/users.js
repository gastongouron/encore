const initialState = {
    loading: false,
    error: false,
    message: '',
    users: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'USERS_INIT':
            return initialState
        case 'USERS_LOADING':
            return {
                ...state,
                error: false,
                loading: true
            }
        case 'USERS_ERROR':
            return {
                ...state,
                error: true,
                message: action.message,
                loading: false
            }
        case 'USERS_LOADED':
            return {
                ...state,
                error: false,
                loading: false,
                users: action.users
            }
        default:
            return state;
    }
};
