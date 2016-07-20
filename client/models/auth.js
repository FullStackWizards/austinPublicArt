import fetch from 'isomorphic-fetch';


export function signUp(userData) {
  let obj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }
  return fetch(`api/signUp`, obj)
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
  return fetch(`api/login`, obj)
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
  return fetch(`api/like/${artId}`, obj)
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
  return fetch(`api/favorites/${artId}`, obj)
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
return fetch(`api/favorites`, obj)
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
return fetch(`api/user`, obj)
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
return fetch(`api/username`, obj)
  .then(function(resp) {
    return resp.json()
  })
}

