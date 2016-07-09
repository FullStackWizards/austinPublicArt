import React from 'react'


export default class ArtGallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      artCollection: []
    }
  }

  checkState() {
    console.log("this.props.gallery", this.props.gallery)
  }
  componentWillMount() {
    this.props.fetchArt()
    setTimeout(this.checkState.bind(this), 5000)
  }

  parseImageUrl(imgUrl) {
    imgUrl = imgUrl.split(';')
    return imgUrl[0]
  }

  render() {
    return (
      <div className="artGallery">
        { this.props.gallery ? this.props.gallery.map((art) => {
          return <div className="artwork" key={art._id}>
            <img className="artImage" src={this.parseImageUrl(art.Images)} />
            <p className="artTitle"> {art['Art Title']} </p>
            <p className="artistName"> {art['Artist Name']} </p>
            {this.props.loggedIn ?
            <div className="userFeatures">
            <button>Like</button>
            <button>Fav!</button>
            </div> : ''
            }
          </div>
        }) : '' }
      </div>
    )
  }
}
