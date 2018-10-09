export function initUserReviews() {
    return {
      type: 'USER_REVIEWS_INIT'
    }
  }
  
  export function loadingUserReviews() {
      return {
        type: 'USER_REVIEWS_LOADING'
      }
  }
  
  export function failedUserReviews(message) {
    return {
      type: 'USER_REVIEWS_ERROR',
      message
    }
  }
  export function selectUserReview(review){
    return {
      type: 'SELECT_USER_REVIEW',
      review
    }
  }
  export function setUserReviews(reviews) {
    return {
      type: 'USER_REVIEWS_LOADED',
      reviews
    }
  }
  export function updateUserReview(review) {
    return {
      type: 'UPDATE_USER_REVIEW',
      review
    }
  }
  export function deleteUserReview(review){
    return {
      type: 'DELETE_USER_REVIEW',
      review
    }
  }