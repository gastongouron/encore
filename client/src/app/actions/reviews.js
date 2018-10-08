export function initMyReviews() {
    return {
      type: 'MYREVIEWS_INIT'
    }
  }
  
  export function loadingMyReviews() {
      return {
        type: 'MYREVIEWS_LOADING'
      }
  }
  
  export function failedMyReviews(message) {
    return {
      type: 'MYREVIEWS_ERROR',
      message
    }
  }
  export function selectMyReview(review){
    return {
      type: 'SELECT_MYREVIEW',
      review
    }
  }
  export function setMyReviews(reviews) {
    return {
      type: 'REVIEWS_LOADED',
      reviews
    }
  }
  export function updateMyReview(review) {
    return {
      type: 'UPDATE_MYREVIEW',
      review
    }
  }
  export function deleteMyReview(review){
    return {
      type: 'DELETE_MYREVIEW',
      review
    }
  }