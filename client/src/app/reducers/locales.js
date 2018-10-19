const initialState = {
    loading: false,
    error: false,
    message: '',
    locales: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOCALES_INIT':
            return initialState
        case 'LOCALES_LOADING':
            return {
                ...state,
                error: false,
                loading: true
            }
        case 'LOCALES_ERROR':
            return {
                ...state,
                error: true,
                message: action.message,
                loading: false
            }
        case 'LOCALES_LOADED':
            return {
                ...state,
                error: false,
                loading: false,
                locales: action.locales
            }
        default:
            return state;
    }
};
