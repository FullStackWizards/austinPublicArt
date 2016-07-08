import fetch from 'isomorphic-fetch';


export function signUp(userData) {
  console.log('signingup in auth.js~~~~~', userData)
  let obj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    data: userData
  }
  return fetch(`https://localhost4000/signUp`, obj)
    .then(function(data){
      console.log(data, 'data')
      return data
    })
  }


export function login(userData) {
	console.log('logging in auth.js~~~~~', userData)
	let obj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    data: userData
  }
  return fetch(`https://localhost4000/login`, obj)
    .then(function(data){
      console.log(data, 'data')
      return data.json()
    })

}