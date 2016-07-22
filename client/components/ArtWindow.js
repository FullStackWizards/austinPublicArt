import React from 'react'
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactSpinner from 'react-spinjs';
import SearchInput, {createFilter} from 'react-search-input'
import NavBar from './NavBar'
import Filter from './Filter'
import Slider from 'react-slick'
import * as auth from '../models/auth'
import * as art from '../models/art'
import AMap from './googleMapTrial'




var trashClass = "displayInline";


const KEYS_TO_FILTERS = ['Artist Full Name', 'Art Title', 'Art Location Zip', 'Art Location Name']




export default class ArtGallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showInfo: false,
      searchTerm: [''],
     
    }

  }

  parseImageUrl(imgUrl) {
    imgUrl = imgUrl.split(';')
    return imgUrl.filter((x) => x !== '')
  }
  openInfo(art) {
    this.setState({showInfo: true});
    this.setState({currentArt: art})
  }
  closeInfo() {
    console.log("what")
    this.setState({showInfo: false});
  }
  searchUpdated (term) {
    var words = this.state.searchTerm;
    console.log('what the fuck is this', this) 
    console.log('what is happening', words)
    contacts.unshift(term);
    console.log('is this updated?????', words[0])
  }

  updateCurrent(likeCount) {
    this.setState({currentArt: Object.assign(this.state.currentArt, {likeCount: likeCount.likeCount})})
    console.log("here")
  }
  updateCurrentTrash(trashCount) {
    this.setState({currentArt: Object.assign(this.state.currentArt, {trashCount: trashCount.trashCount})})
    console.log("there")
  }
  updateUserScore(userScore) {
    this.setState({currentArt: Object.assign(this.state.currentArt, {userScore: userScore.userScore})})
    console.log("where")
  }


  addToSearchTerm(contact) {
    var contacts = this.searchTerm;
    console.log(this) 
    console.log(contacts)
    contacts.unshift(contact);
    console.log(contacts[0])

  }

  render() {

    const filteredArt = this.props.gallery.filter(createFilter(this.state.searchTerm[0], KEYS_TO_FILTERS))
    {console.log('DA FUCK IS THIS', this.props)}


    return (
      <div>
    {/*If the gallery state is not populated, show the loading div. Else diaplay gallery*/}
      {!this.props.gallery[0] 
        ?
        <div className="loadingDiv">
          <p><br/>Finding your 'art'</p>
          <img className='loadingImg' src='http://66.media.tumblr.com/7d59cf9b9ad66fdbb4d1da458d8ed3ad/tumblr_o88twrq6el1v3aao4o1_500.gif' />
        </div>
        :
        <div>
        <br></br>
        <SearchInput className="search-input" onChange={this.searchUpdated.bind(this)} />
          <div className="artGallery">
            <NavBar />
            {this.state.showInfo ?
              <Info onClose={this.closeInfo.bind(this)} loggedIn={this.props.loggedIn} updateUserScore={this.updateUserScore.bind(this)} 
                    updateCurrentTrash={this.updateCurrentTrash.bind(this)} updateCurrent={this.updateCurrent.bind(this)} 
                    parseImageUrl={this.parseImageUrl.bind(this)} currentArt={this.state.currentArt}
              />
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


        {<NavBar gallery={this.props.gallery} searchTerm={ this.state.searchTerm }  addToSearchTerm={ this.addToSearchTerm } />}
      

      </div>
    )
  }
}
//Create the info modal  
class Info extends React.Component {

  constructor() {
    super()
    this.state = {
      userFavs: [],
      userId: null,
      // numRed:this.props..userScore
    }
  }
  componentWillMount() {
    if(document.cookie) {
      this.findFavs()
      this.getUserId()
    }
  }
  findFavs() {
    auth.fetchFavs()
    .then((res) => {
      this.setState({userFavs : res.map((obj) => obj.artId)})
    })
  }
  getUserId() {
    auth.fetchUser()
    .then((res) => {
      this.setState({userId: res})
    })
  }

  buttonClick (event){
    var userScore = event.target.value;
    this.setState({numRed:userScore})
    console.log('buttonClick', this.props.currentArt.userScore) 

    // () => auth.hipsterScore(this.props.currentArt._id)
    //   .then((x) => {
    //     return art.getHipster(this.props.currentArt._id)
    //   })
    //   .then((userScore) => {
    //     this.props.updateUserScore(userScore)
    //   })  
  }
  makeRed(userScore){
    for(var i=1;i<=userScore;i++){
      var redButton = 'button'+i
      this.setState({[redButton]:'btn btn-danger'})
    }
    for(var j = Number(userScore)+1 ;j<=5; j++){
      var redButton = 'button'+j
      this.setState({[redButton]:'btn'})
    }
  }
  //The info modal that pops up with the props currentArt set as the object of the work of art you clicked on
  render() {
    let images = this.props.parseImageUrl(this.props.currentArt.Images);
    let settings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true
    };
    if(images.length === 1) settings.arrows = false
    return (

      <ModalContainer onClose={this.props.onClose}>
        <ModalDialog onClose={this.props.onClose} className="info">


            <div className='tester'><h2>{this.props.currentArt['Art Title']}</h2>

            <p>By: {this.props.currentArt['Artist Full Name']}</p>
            <p>Location: {this.props.currentArt['Art Location Name']}</p>

            <p> Likes: {this.props.currentArt.likeCount.length}</p>

            <p> Not Art: {this.props.currentArt.trashCount.length}</p>
            <p> Hipster Scale: {this.props.currentArt.userScore.length}</p>
            </div>


            <div className="slideContainer" >
              <Slider {...settings}>
                {images.map((x) => <div key={images.indexOf(x)}><img className="slideshowPicture" src={x} /></div>)}
              </Slider>
            </div>
            <AMap location = {this.props.currentArt['Location'].split('(')[1].split(')')[0].split(',')}/>
          {/* Check if logged in (document.cookie?), if true display Like and Favorite button */}
            {document.cookie ?
              <div className="userFeatures">

                {(this.props.currentArt.trashCount.includes(this.state.userId)) ? '' :
                  <button className="btn btn-primary btn-sm" onClick={() => auth.likePhoto(this.props.currentArt._id)
                    .then((x) => {
                      return art.getLikes(this.props.currentArt._id)
                    })
                    .then((likeCount) => {
                      this.props.updateCurrent(likeCount)
                    })
                  }>
                  {/*Change button text based upon if the user has already liked an image*/}
                    {this.props.currentArt.likeCount.includes(this.state.userId) ? "Unlike" : "Like"} 
                  </button>
                }

                <button className="btn btn-secondary btn-sm" onClick={() => auth.favoritePhoto(this.props.currentArt._id)
                  .then((x) => {
                    this.findFavs()
                  })
                }>{this.state.userFavs.includes(this.props.currentArt._id) ? "Unfav!" : "Fav!"}
                </button>

                {(this.props.currentArt.likeCount.includes(this.state.userId)) ? '' :
                  <button className="btn btn-tertiary btn-sm" 
                  onClick={() => auth.trashPhoto(this.props.currentArt._id)
                    .then((x) => {
                      return art.getTrash(this.props.currentArt._id)
                    })
                    .then((trashCount) => {
                      this.props.updateCurrentTrash(trashCount)
                    })
                  }>
                    {this.props.currentArt.trashCount.includes(this.state.userId) ? "Still Trash" : "Trash it!"}
                  </button>
                }
                <div>Peace be the Journey:</div>

                <button className={this.state.numRed > 0 ?'btn btn-danger':'btn'} 
                onClick={this.buttonClick.bind(this)} value={1} type='button'>🚲</button>

                <button className={this.state.numRed > 1 ?'btn btn-danger':'btn'} 
                onClick={this.buttonClick.bind(this)} value={2} type='button'>🚲</button>

                <button className={this.state.numRed > 2 ?'btn btn-danger':'btn'} 
                onClick={this.buttonClick.bind(this)} value={3} type='button'>🚲</button>

                <button className={this.state.numRed > 3 ?'btn btn-danger':'btn'} 
                onClick={this.buttonClick.bind(this)} value={4} type='button'>🚲</button>

                <button className={this.state.numRed > 4 ?'btn btn-danger':'btn'} 
                onClick={this.buttonClick.bind(this)} value={5} type='button'>🚲</button>



              </div>
              : ''}

        </ModalDialog>
      </ModalContainer>
    )
  }
}
