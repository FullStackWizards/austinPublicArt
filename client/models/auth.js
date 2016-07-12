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
      document.cookie = "sessionId=" + data;
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
      document.cookie = "sessionId=" + data;
    })
}

export function likePhoto(artId) {
  console.log('liking in auth.js~~~~~', artId)
  let obj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return fetch(`/like/${artId}`, obj)
    .then(function(data){
      return data.json()
    })
}

export function favoritePhoto(artId) {
  console.log('logging in auth.js~~~~~', userData)
  let obj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }
  return fetch(`/like/${artId}`, obj)
    .then(function(data){
      return data.json()
    })
}
