export function initUserProfile() {
  return {
    type: 'USER_PROFILE_INIT'
  }
}

export function loadingUserProfile() {
    return {
      type: 'USER_PROFILE_LOADING'
    }
}

export function failedUserProfile(message) {
  return {
    type: 'USER_PROFILE_ERROR',
    message
  }
}

export function setUserProfile(user) {
  return {
    type: 'USER_PROFILE_LOADED',
    user
  }
}