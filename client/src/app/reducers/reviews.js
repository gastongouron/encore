const initialState = {
    loading: false,
    error: false,
    message: '',
    reviews: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'USER_REVIEWS_INIT':
            return initialState
        case 'USER_REVIEWS_LOADING':
            return {
                ...state,
                error: false,
                loading: true
            }
        case 'USER_REVIEWS_ERROR':
            return {
                ...state,
                error: true,
                message: action.message,
                loading: false
            }
        case 'USER_REVIEWS_LOADED':
            return {
                ...state,
                error: false,
                loading: false,
                reviews: action.reviews
            }
        case 'SELECT_USER_REVIEW':
        console.log("seleted review is----222222222--------", action.review)
        return {
            ...state,
            selected: action.review
        }
        case 'UPDATE_USER_REVIEW':
            let reviewsClone = cloneObject (state.reviews);
            let reviews = {...state.reviews};
            let index = getIndex(reviewsClone, action.review.id);
            if (index!==-1){
                reviewsClone[index] = action.review;
            }
            reviews = reviewsClone;
            return {
                ...state,
                selected: null,
                reviews
            }
        case 'DELETE_USER_REVIEW':
            reviewsClone = cloneObject (state.reviews);
            reviews = {...state.reviews};
            index = getIndex(reviewsClone, action.review.id);
            if (index!==-1){
                reviewsClone.splice(index, 1);
            }
            reviews = reviewsClone;
            return {
                ...state,
                selected: null,
                reviews
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
    return clone.findIndex((obj) => parseInt(obj.id, 10) === parseInt(id, 10));
}