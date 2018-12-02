const initialState = {
    loading: false,
    error: false,
    message: '',
    posts: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'POSTS_INIT':
            return initialState
        case 'POSTS_LOADING':
            return {
                ...state,
                error: false,
                loading: true
            }
        case 'POSTS_ERROR':
            return {
                ...state,
                error: true,
                message: action.message,
                loading: false
            }
        case 'POSTS_LOADED':
            return {
                ...state,
                error: false,
                loading: false,
                posts: action.posts
            }
        default:
            return state;
    }
};
