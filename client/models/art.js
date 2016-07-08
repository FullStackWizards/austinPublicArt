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
