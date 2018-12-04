export function initPost() {
  return {
    type: 'POSTDETAIL_INIT'
  }
}

export function loadingPost() {
  return {
    type: 'POSTDETAIL_LOADING'
  }
}

export function failedPost(message) {
  return {
    type: 'POSTDETAIL_ERROR',
    message
  }
}

export function setPost(post) {
  return {
    type: 'POSTDETAIL_LOADED',
    post
  }
}