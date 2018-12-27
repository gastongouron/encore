export function initUsers() {
  return {
    type: 'USERS_INIT'
  }
}

export function loadingUsers() {
  return {
    type: 'USERS_LOADING'
  }
}

export function failedUsers(message) {
  return {
    type: 'USERS_ERROR',
    message
  }
}

export function setUsers(users) {
  return {
    type: 'USERS_LOADED',
    users
  }
}