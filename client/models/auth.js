import fetch from 'isomorphic-fetch';


export function signUp(userData) {
  let obj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }
  return fetch(`/signUp`, obj)
    .then(function(data){
      if(data.status < 400) {
        return data.json().then((data) => {
          document.cookie = "sessionId=" + data + ";path=/"
          return "Success"
        })
      } else return data
    })
}


export function login(userData) {
	let obj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }
  return fetch(`/login`, obj)
    .then(function(data){
      if(data.status < 400) {
        return data.json().then((data) => {
          document.cookie = "sessionId=" + data + ";path=/"
          return "Success"
        })
      } else return data
    })
}

export function likePhoto(artId) {
  let obj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({cookie: document.cookie})
  }
  return fetch(`/like/${artId}`, obj)
    .then(function(data){
      return data.json()
    })
}

export function trashPhoto(artId) {
  let obj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({cookie: document.cookie})
  }
  return fetch(`/trash/${artId}`, obj)
    .then(function(data){
      return data.json()
    })
}

export function favoritePhoto(artId) {
  let obj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({cookie: document.cookie})
  }
  return fetch(`/favorites/${artId}`, obj)
    .then(function(data){
      return data
    })
}

export function fetchFavs() {
  let obj = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'cookieHeader': document.cookie
    }
  }
return fetch(`/favorites`, obj)
  .then(function(resp) {
    return resp.json()
  })
}

export function fetchUser() {
  let obj = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'cookieHeader': document.cookie
    }
  }
return fetch(`/user`, obj)
  .then(function(resp) {
    return resp.json()
  })
}

export function fetchUsername() {
  let obj = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'cookieHeader': document.cookie
    }
  }
return fetch(`/username`, obj)
  .then(function(resp) {
    return resp.json()
  })
}

