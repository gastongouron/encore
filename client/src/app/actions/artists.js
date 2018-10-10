export function initArtists() {
  return {
    type: 'ARTISTS_INIT'
  }
}

export function loadingArtists() {
  return {
    type: 'ARTISTS_LOADING'
  }
}

export function failedArtists(message) {
  return {
    type: 'ARTISTS_ERROR',
    message
  }
}

export function setArtists(artists) {
  return {
    type: 'ARTISTS_LOADED',
    artists
  }
}