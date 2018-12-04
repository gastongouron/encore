const initialState = {
    loading: false,
    error: false,
    message: '',
    postDetail: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'POST_INIT':
            return initialState
        case 'POST_LOADING':
            return {
                ...state,
                error: false,
                loading: true
            }
        case 'POST_ERROR':
            return {
                ...state,
                error: true,
                message: action.message,
                loading: false
            }
        case 'POST_LOADED':
            return {
                ...state,
                error: false,
                loading: false,
                postDetail: action.postDetail
            }
        default:
            return state;
    }
};
