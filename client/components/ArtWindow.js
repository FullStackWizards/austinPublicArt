import React from 'react'
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactSpinner from 'react-spinjs';
import SearchInput, {createFilter} from 'react-search-input'
import NavBar from './NavBar'
import * as auth from '../models/auth'

const KEYS_TO_FILTERS = ['Artist Name', 'Art Title']

export default class ArtGallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showInfo: false,
      searchTerm: ''
    }
  }

  parseImageUrl(imgUrl) {
    imgUrl = imgUrl.split(';')
    return imgUrl
  }
  openInfo(art) {
    this.setState({showInfo: true});
    this.setState({currentArt: art})
  }
  closeInfo() {
    this.setState({showInfo: false});
  }
  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  render() {
    const filteredArt = this.props.gallery.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    return (
      <div>
      <SearchInput className="search-input" onChange={this.searchUpdated.bind(this)} />
      <div className="artGallery">
        <NavBar />
        {this.state.showInfo ?
          <Info onClose={this.closeInfo.bind(this)} loggedIn={this.props.loggedIn} currentArt={this.state.currentArt} parseImageUrl={this.parseImageUrl.bind(this)}/>
        : null} 

        {filteredArt.map((art) => {
          return <div className="artwork" key={art._id}>
            <img className="artImage" src={this.parseImageUrl(art.Images)[0]} onClick={(e) => this.openInfo(art)}/>            
            
          </div>
        })}
      </div>
      </div>
    )
  }
}

class Info extends React.Component {
  //The info modal that pops up with the props currentArt set as the object of the work of art you clicked on
  render() {
    return (
      <ModalContainer onClose={this.props.onClose}>
     
        <ModalDialog onClose={this.props.onClose} className="info">
         
            <h2>{this.props.currentArt['Art Title']}</h2>
            <p>By: {this.props.currentArt['Artist Name']}</p>
   
            <img src={this.props.parseImageUrl(this.props.currentArt.Images)[0]} />
            <img src={this.props.parseImageUrl(this.props.currentArt.Images)[1]} />
            <img src={this.props.parseImageUrl(this.props.currentArt.Images)[2]}/>
            {document.cookie ?
              <div className="userFeatures">
              <button onClick={() => auth.likePhoto(this.props.currentArt._id)}>Like</button>
              <button>Fav!</button>
              </div> 
              : ''}
                  
        </ModalDialog>
      
    </ModalContainer>
    )
  }
}