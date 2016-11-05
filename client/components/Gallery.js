import React from 'react'
import ReactSpinner from 'react-spinjs';
import SearchInput, {createFilter} from 'react-search-input'
import NavBar from './NavBar'
import Slider from 'react-slick'
import * as auth from '../models/auth'
import * as art from '../models/art'
import InfoModal from './InfoModal'


const KEYS_TO_FILTERS = ['Artist Full Name', 'Art Title']

export default class ArtWindow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showInfo: false,
      searchTerm: '',
    }
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }


  render() {
    const filteredArt = this.props.gallery.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <div>
    {/*If the gallery state is not populated, show the loading div. Else diaplay gallery*/}
      {!this.props.gallery[0] ?
        <div className="loadingDiv">
          <div className="loading-img animated infinite swing">
            <img src="http://images.clipartpanda.com/paintbrush-clip-art-Kcne5a99i.png" height="150px" width="150px"/>
          </div>
          <ReactSpinner className="spinner" config={{scale: 1.5, color: 'blue'}}/>
          <h4>Drawing pictures...</h4>
        </div>
        :
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          <NavBar
            searchUpdated={this.searchUpdated.bind(this)}
            searchTerm={this.state.searchTerm}
          />

          {/* Art info modal */}
          {this.props.showInfoModal ?
            <InfoModal
              onClose={this.props.closeInfoModal}
              updateCurrent={this.props.updateCurrentArt}
              currentArt={this.props.currentArt}
              parseImageUrl={parseImageUrl}
            /> :
            null}

          <ul className="rig">
            {filteredArt.map(art =>
              <li className="artwork animated flipInY" key={art._id}>
                <a
                  href="javascript:void(0)"
                  onClick={this.props.openInfoModal.bind(null, art)}
                  className="artImage"
                >
                  <img className="artImage" src={parseImageUrl(art.Images)[0]} />
                </a>
              </li>
            )}
          </ul>
        </div>}
      </div>
  )
  }
}

function parseImageUrl(imgUrl) {
  return imgUrl.split(';').filter(e => e !== '');
}

