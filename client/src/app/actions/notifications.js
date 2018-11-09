export function initUserNotifications() {
  return {
    type: 'USER_NOTIFICATIONS_INIT'
  }
}

export function loadingUserNotifications() {
    return {
      type: 'USER_NOTIFICATIONS_LOADING'
    }
}

export function failedUserNotifications(message) {
  return {
    type: 'USER_NOTIFICATIONS_ERROR',
    message
  }
}

export function setUserNotifications(notifications) {
  return {
    type: 'USER_NOTIFICATIONS_LOADED',
    notifications
  }
}