import React from 'react'

export default class ArtGallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      art: [{
        image: 'http://st.hzcdn.com/simgs/b0f1319d01845aa4_4-8455/artwork.jpg',
        artist: 'van gough',
        location: 78787

      },
      {
        image: 'http://garitocafe.com/max/img/articulos/2015/09/01/tumblr_ncv6ba4qes1rv44ddo1_1280_1.jpg',
        artist: 'Travers Pinkerton',
        location: 78787
      }]
    }
  }

  render() {
    return (
      <div className="artGallery">
        { this.state.art.map((art) => {
          return <div className="artwork">
            <img className="artImage" src={art.image} />
            <p className="artistName"> {art.artist} </p>
          </div>
        })}
      </div>
    )
  }
}
