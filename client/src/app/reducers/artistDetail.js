const initialState = {
    loading: false,
    error: false,
    message: '',
    artistDetail: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'ARTISTDETAIL_INIT':
            return initialState
        case 'ARTISTDETAIL_LOADING':
            return {
                ...state,
                error: false,
                loading: true
            }
        case 'ARTISTDETAIL_ERROR':
            return {
                ...state,
                error: true,
                message: action.message,
                loading: false
            }
        case 'ARTISTDETAIL_LOADED':
            return {
                ...state,
                error: false,
                loading: false,
                artistDetail: action.artistDetail
            }
        default:
            return state;
    }
};
