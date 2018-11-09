const initialState = {
    loading: false,
    error: false,
    message: '',
    notifications: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'USER_NOTIFICATIONS_INIT':
            return initialState
        case 'USER_NOTIFICATIONS_LOADING':
            return {
                ...state,
                error: false,
                loading: true
            }
        case 'USER_NOTIFICATIONS_ERROR':
            return {
                ...state,
                error: true,
                message: action.message,
                loading: false
            }
        case 'USER_NOTIFICATIONS_LOADED':
            return {
                ...state,
                error: false,
                loading: false,
                notifications: action.notifications
            }
        default:
            return state;
    }
};
