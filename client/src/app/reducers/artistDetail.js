const initialState = {
    loading: false,
    error: false,
    message: '',
    artistDetail: [],
    newReview:[]
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
        case 'ADD_NEW_REVIEW':
            console.log('new', action.newReview);
            let {reviews=[]} = state.artistDetail;
            let artistDetail = {...state.artistDetail};
            artistDetail.reviews = [...reviews, action.newReview];
            return {
                ...state,
                error: false,
                artistDetail,
                newReview: action.newReview

            }
        case 'SELECT_REVIEW':
            return {
                ...state,
                selected: action.review
            }

        case 'UPDATE_REVIEW':
             reviews = cloneObject (state.artistDetail.reviews);
             artistDetail = {...state.artistDetail};
            const index = getIndex(reviews, action.review.id);
            if (index!==-1){
                reviews[index] = action.review;
            }
            artistDetail.reviews = reviews;
            return {
                ...state,
                selected: null,
                artistDetail
            }
        case 'DELETE_REVIEW':
            reviews = cloneObject (state.artistDetail.reviews);
            artistDetail = {...state.artistDetail};
            index = getIndex(reviews, action.review.id);
            if (index!==-1){
                reviews.splice(index, 1);
            }
            artistDetail.reviews = reviews;
            return {
                ...state,
                selected: null,
                artistDetail
            }
        default:
            return state;
    }
};

function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}
