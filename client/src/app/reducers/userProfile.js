const initialState = {
    loading: false,
    error: false,
    message: '',
    userProfile: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'USER_PROFILE_INIT':
            return initialState
        case 'USER_PROFILE_LOADING':
            return {
                ...state,
                error: false,
                loading: true
            }
        case 'USER_PROFILE_ERROR':
            return {
                ...state,
                error: true,
                message: action.message,
                loading: false
            }
        case 'USER_PROFILE_LOADED':
            return {
                ...state,
                error: false,
                loading: false,
                use: action.user
            }
        default:
            return state;
    }
};
