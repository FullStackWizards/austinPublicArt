import React from 'react'


export default class ArtGallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      art: this.props.art
    }
  }

  componentWillMount() {
    this.props.fetchArt()
  }

  render() {
    return (
      <div className="artGallery">
        { this.state.art.map((art) => {
          return <div className="artwork" key={art.image}>
            <img className="artImage" src={art.image} />
            <p className="artistName"> {art.artist} </p>
          </div>
        })}
      </div>
    )
  }
}
