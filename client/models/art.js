import fetch from 'isomorphic-fetch';
import secret from '../../secret'

export function getArt() {
  let obj = {
    method: 'GET'
  };
  return fetch('api/art', obj)
  .then((artwork) => {
    return artwork.json()
  })
}

export function getLikes(artId) {
  let obj = {
    method: 'GET'
  };
  return fetch(`api/like/${artId}`, obj)
  .then((artwork) => {
    return artwork.json()
  })
}

export function getCoords(address) {
  let obj = {
    method: 'GET'
  };
  return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address},+Austin,+TX&key=${secret}`)
    .then((response) => {
      if (response.status >= 400){
        throw new Error("Error getting coordinates")
      }
      return response.json();
    })
}
