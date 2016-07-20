import React from 'react'
import ReactSpinner from 'react-spinjs';
import SearchInput, {createFilter} from 'react-search-input'
import NavBar from './NavBar'
import Slider from 'react-slick'
import * as auth from '../models/auth'
import * as art from '../models/art'
import Info from './Info'


const KEYS_TO_FILTERS = ['Artist Full Name', 'Art Title']

export default class ArtWindow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showInfo: false,
      searchTerm: ''
    }
  }
  parseImageUrl(imgUrl) {
    imgUrl = imgUrl.split(';')
    return imgUrl.filter((x) => x !== '')
  }
  openInfo(art) {
    this.setState({showInfo: true});
    this.setState({currentArt: art})
    console.log("openinfogallery", art)
  }
  closeInfo() {
    this.setState({showInfo: false});
  }
  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
  updateCurrent(likeCount) {
    this.setState({currentArt: Object.assign(this.state.currentArt, {likeCount: likeCount.likeCount})})
  }

  render() {
    const filteredArt = this.props.gallery.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <div>
    {/*If the gallery state is not populated, show the loading div. Else diaplay gallery*/}
      {!this.props.gallery[0] ?
        <div className="loadingDiv">
          <div className="animated infinite swing">
            <img src="http://images.clipartpanda.com/artist-paint-brush-vector-artist__s_paint_brush_by_rildraw-d4a5ogt.png" height="150px" width="150px"/>
          </div>
          <p>Drawing pictures...</p>
          <ReactSpinner config={{color: "red"}}/>
        </div>
        :
        <div>
        <br></br>
        <SearchInput className="search-input" onChange={this.searchUpdated.bind(this)} />
          <div className="artGallery">
            <NavBar />
            {this.state.showInfo ?
              <Info onClose={this.closeInfo.bind(this)} loggedIn={this.props.loggedIn}  updateCurrent={this.updateCurrent.bind(this)} currentArt={this.state.currentArt} parseImageUrl={this.parseImageUrl.bind(this)}/>
            : null}
            {filteredArt.map((art) => {
              return (
                  <div className="artwork" key={art._id}>
                    <a href="javascript:void(0)" onClick={(e) => this.openInfo(art)} className="artImage"> <img className="artImage" src={this.parseImageUrl(art.Images)[0]} /> </a>
                  </div>
                )
            })}
          </div>
        </div>}
      </div>
    )
  }
}
