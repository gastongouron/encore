export function initArtistDetail() {
    return {
      type: 'ARTISTDETAIL_INIT'
    }
  }
  
  export function loadingArtistDetail() {
      return {
        type: 'ARTISTDETAIL_LOADING'
      }
  }
  
  export function failedArtistDetail(message) {
    return {
      type: 'ARTISTDETAIL_ERROR',
      message
    }
  }
  
  export function setArtistDetail(artistDetail) {
    return {
      type: 'ARTISTDETAIL_LOADED',
      artistDetail
    }
  }
  export function addNewReview(newReview){
    return {
      type: 'ADD_NEW_REVIEW',
      newReview
    }
  }

  export function selectReview(review){
    return {
      type: 'SELECT_REVIEW',
      review
    }
  }

  export function updateReview(review) {
    return {
      type: 'UPDATE_REVIEW',
      review
    }
  }
  export function deleteReview(review){
    return {
      type: 'DELETE_REVIEW',
      review
    }
  }