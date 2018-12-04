const initialState = {
    loading: false,
    error: false,
    message: '',
    postDetail: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'POSTDETAIL_INIT':
            return initialState
        case 'POSTDETAIL_LOADING':
            return {
                ...state,
                error: false,
                loading: true
            }
        case 'POSTDETAIL_ERROR':
            return {
                ...state,
                error: true,
                message: action.message,
                loading: false
            }
        case 'POSTDETAIL_LOADED':
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
