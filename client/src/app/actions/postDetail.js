export function initPost() {
  return {
    type: 'POST_INIT'
  }
}

export function loadingPost() {
  return {
    type: 'POST_LOADING'
  }
}

export function failedPost(message) {
  return {
    type: 'POST_ERROR',
    message
  }
}

export function setPost(post) {
  return {
    type: 'POST_LOADED',
    post
  }
}