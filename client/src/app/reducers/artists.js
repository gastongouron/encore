const initialState = {
    loading: false,
    error: false,
    message: '',
    artists: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ARTISTS_INIT':
            return initialState
        case 'ARTISTS_LOADING':
            return {
                ...state,
                error: false,
                loading: true
            }
        case 'ARTISTS_ERROR':
            return {
                ...state,
                error: true,
                message: action.message,
                loading: false
            }
        case 'ARTISTS_LOADED':
            return {
                ...state,
                error: false,
                loading: false,
                artists: action.artists
            }
        default:
            return state;
    }
};
