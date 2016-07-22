import fetch from 'isomorphic-fetch';

export function getArt (){
   console.log('hello')
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

export function getTrash(artId) {
  let obj = {
    method: 'GET'
  };
  return fetch(`/trash/${artId}`, obj)
  .then((artwork) => {
    return artwork.json()
  })
}

export function getHipster(artId){
  let obj = {
    method: 'GET'
  };
  return fetch(`/hipster/${artId}`, obj)
  .then((artwork) => {
    return artwork.json()
  })
  .catch((error) => {
    console.log('art error', error)
  })
}
