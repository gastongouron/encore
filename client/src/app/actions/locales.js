export function initLocales() {
  return {
    type: 'LOCALES_INIT'
  }
}

export function loadingLocales() {
  return {
    type: 'LOCALES_LOADING'
  }
}

export function failedLocales(locale) {
  return {
    type: 'LOCALES_ERROR',
    message
  }
}

export function setLocales(locales) {
  return {
    type: 'LOCALES_LOADED',
    Locales
  }
}