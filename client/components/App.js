import React from 'react';
import * as art from '../models/art';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tempCollection: [],
      artCollection: [],
      testProp: 'test'
    }
  }

  componentDidMount() {
    this.update()
  }
  update() {
    this.fetchArt(this.props.params.artistName)
    .then(() => {
      this.getLikes()
    })
  }
  
  fetchArt(artist) {
    return art.getArt()
    .then((artwork) => {
      if(artist) {
        this.setState({tempCollection: artwork.filter((art) => art['Artist Full Name'] == artist)})
      }
      else {
        this.setState({tempCollection: artwork})
      }
    })
  }

  getLikes() {
    var results = [];
    this.state.tempCollection.forEach((artWork) => {
      art.getLikes(artWork._id)
      .then((likeCount) => {
        results.push(Object.assign(artWork, {likeCount: likeCount.likeCount}))
        if (results.length === this.state.tempCollection.length) {
          this.setState({artCollection: results})
        }
      })
    })
  }

  render(){
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          tempCollection: this.state.tempCollection,
          gallery: this.state.artCollection,
          testProp: this.state.testProp
        })}
      </div>
    )
  }
}
