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