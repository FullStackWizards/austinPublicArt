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
      return data.json()
    })
    .then(function(data){
      document.cookie = "sessionId=" + data + ";path=/";
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
      return data.json()
    })
    .then(function(data) {
      document.cookie = "sessionId=" + data + ";path=/";
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
    },
    body: JSON.stringify(artId)
  }
  return fetch(`/like/${artId}`, obj)
    .then(function(data){
      return data.json()
    })
}
