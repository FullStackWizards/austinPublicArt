import React from 'react'
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactSpinner from 'react-spinjs';

export default class ArtGallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showInfo: false
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

  render() {
    return (
      <div className="artGallery">
        {this.state.showInfo ?
          <Info onClose={this.closeInfo.bind(this)} currentArt={this.state.currentArt} parseImageUrl={this.parseImageUrl.bind(this)}/>
        : null} 
        {this.props.gallery.map((art) => {
          return <div className="artwork" key={art._id}>
            <img className="artImage" src={this.parseImageUrl(art.Images)[0]} onClick={(e) => this.openInfo(art)}/>            
            {this.props.loggedIn ?
              <div className="userFeatures">
              <button>Like</button>
              <button>Fav!</button>
              </div> 
              : ''}
          </div>
        })}
      </div>
    )
  }
}


class Info extends React.Component {

 
  render() {
    return <ModalContainer onClose={this.props.onClose}>
     
        <ModalDialog onClose={this.props.onClose} className="info">
         
            <h2>{this.props.currentArt['Art Title']}</h2>
            <p>By: {this.props.currentArt['Artist Name']}</p>
   
            <img src={this.props.parseImageUrl(this.props.currentArt.Images)[0]} />
            <img src={this.props.parseImageUrl(this.props.currentArt.Images)[1]} />
            <img src={this.props.parseImageUrl(this.props.currentArt.Images)[2]}/>
          
           
        </ModalDialog>
      
    </ModalContainer>;
  }
}






