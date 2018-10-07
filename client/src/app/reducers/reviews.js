const initialState = {
    loading: false,
    error: false,
    message: '',
    reviews: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'REVIEWS_INIT':
            return initialState
        case 'REVIEWS_LOADING':
            return {
                ...state,
                error: false,
                loading: true
            }
        case 'REVIEWS_ERROR':
            return {
                ...state,
                error: true,
                message: action.message,
                loading: false
            }
        case 'REVIEWS_LOADED':
            return {
                ...state,
                error: false,
                loading: false,
                reviews: action.reviews
            }
        default:
            return state;
    }
};
