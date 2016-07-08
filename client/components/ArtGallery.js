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
            <p className="artistName"> {art.Images} </p>
          </div>
        }) : '' }
      </div>
    )
  }
}
