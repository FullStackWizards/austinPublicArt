import fetch from 'isomorphic-fetch';

export function getArt (){
  let obj = {
    method: 'GET'
  };
  return fetch('/art', obj)
  .then((artwork) => {
    return artwork.json()
  })
}

export function getLikes(artId) {
  let obj = {
    method: 'GET'
  };
  return fetch(`/likes/${artId}`, obj)
  .then((artwork) => {
    return artwork.json()
  })
}

export function getCoords(address){
  return fetch('https://maps.googleapis.com/maps/api/geocode/json?address='+address+',+Austin,+TX&key=AIzaSyBVn0zEBvjV5EGOwL0ZX5ByM2Z_Kphs2RM')
    .then(function(data){
      console.log("inside getLats", data)
      return data.json()
    })
}

export function getAddress(){
  let obj = {
    method: 'GET'
  };
  return fetch('/adds', obj)
  .then((adds) => {
    return adds.json()
  })
}
