export function initPosts() {
  return {
    type: 'POSTS_INIT'
  }
}

export function loadingPosts() {
  return {
    type: 'POSTS_LOADING'
  }
}

export function failedPosts(message) {
  return {
    type: 'POSTS_ERROR',
    message
  }
}

export function setPosts(posts) {
  return {
    type: 'POSTS_LOADED',
    posts
  }
}