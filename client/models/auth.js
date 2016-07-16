import fetch from 'isomorphic-fetch';


export function signUp(userData) {
  console.log('signingup in auth.js~~~~~', userData)
  let obj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }
  return fetch(`/signUp`, obj)
    .then(function(data){
      console.log('after login data', data)
      if(data.status < 400) {
        data.json().then((data) => document.cookie = "sessionId=" + data + ";path=/")
        return "Success"
      } else return data
    })
}


export function login(userData) {
	console.log('logging in auth.js~~~~~', userData)
	let obj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }
  return fetch(`/login`, obj)
    .then(function(data){
      console.log('after login data', data)
      if(data.status < 400) {
        data.json().then((data) => document.cookie = "sessionId=" + data + ";path=/")
        return "Success"
      } else return data
    })
}

export function likePhoto(artId) {
  console.log('liking in auth.js~~~~~', artId, document.cookie)
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

export function favoritePhoto(artId) {
  console.log('favoriting photo', artId)
  let obj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(`/favorites/${artId}`, obj)
    .then(function(data){
      console.log('data in auth.js', data)
      return data
    })
}
