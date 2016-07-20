import fetch from 'isomorphic-fetch';

export function getArt (){
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
  return fetch(`api/likes/${artId}`, obj)
  .then((artwork) => {
    return artwork.json()
  })
}

