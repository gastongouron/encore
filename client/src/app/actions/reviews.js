export function initReviews() {
    return {
      type: 'REVIEWS_INIT'
    }
  }
  
  export function loadingReviews() {
      return {
        type: 'REVIEWS_LOADING'
      }
  }
  
  export function failedReviews(message) {
    return {
      type: 'REVIEWS_ERROR',
      message
    }
  }
  
  export function setReviews(revies) {
    return {
      type: 'REVIEWS_LOADED',
      revies
    }
  }