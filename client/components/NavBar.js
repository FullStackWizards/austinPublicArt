import React from 'react'
import {Link} from 'react-router' 
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactSpinner from 'react-spinjs';
import ArtWindow from './ArtWindow'
import Filter from './Filter'

import * as auth from '../models/auth'

export default class NavBar extends React.Component {
  constructor() {
    super()
    this.state = {
      showLogin: false,
      showSignup: false,
      showFilter: false,
      showError: false,
      loggedIn: document.cookie,
      username: null
    }
  } 
  componentWillMount() {
    if (document.cookie) {
      this.setState({loggedin: true})
      this.fetchUser();
    }
    else {
      this.setState({loggedIn: false})
    }
  }
  openLogin() {
    this.setState({showLogin: true});
  }
  closeLogin(bool) {
    this.setState({loggedIn: bool})
    this.setState({showLogin: false});
  }
  openSignup() {
    this.setState({showSignup: true});
  }
  closeSignup(bool) {
    this.setState({loggedIn: bool})
    this.setState({showSignup: false});
  }
  openFilter() {
    this.setState({showFilter: true});
  }
  closeFilter(bool) {
    this.setState({showFilter: false});
  }
  logout(name) {
    document.cookie = 'sessionId' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.setState({loggedIn: false})
    this.setState({username: null})
  }
  drawUsername() {
    if(this.state.username) return ( <span className="usernameSpan">Welcome {this.state.username}</span> );
      else return ( <span className="usernameSpan">Welcome Guest</span> )
  }
  fetchUser() {
    auth.fetchUsername()
      .then((res) => {
        console.log("Fetch:", res)
        this.setState({ username: res })
      })
  }

  //Render the navbar 
  render() {


    return(
      <div className="w3-top">
        <ul className="w3-navbar w3-white w3-card-2 w3-left-align">
          <li className="w3-hide-medium w3-hide-large w3-opennav w3-right">
            <a className="w3-padding-large" href="javascript:void(0)" title="Toggle Navigation Menu"><i className="fa fa-bars"></i></a>
          </li>
          {/* Populate the navbar items. Use <Link /> from react router to add links to different views. */}
          <li><Link to={'/'} className="w3-hover-none w3-hover-text-grey w3-text-black w3-padding-large">AUSTIN PUBLIC ART</Link></li>
          <li className="w3-hide-small"><Link to={`artists`} className="w3-padding-large w3-text-black" >ARTISTS</Link></li>
          <li className="w3-hide-small"><Link to={`gallery`} className="w3-padding-large w3-text-black">GALLERY</Link></li>
          {this.state.loggedIn ? <li className="w3-hide-small"><Link to={`favorites`} className=" w3-padding-large w3-text-black">FAVORITES</Link></li> : null}
          
          {this.props.gallery ? <li><a href="javascript:void(0)" className="w3-hover-none w3-padding-large w3-text-black" onClick={this.openFilter.bind(this)}>FILTER</a></li> : null }

          <li className="w3-hide-small w3-dropdown-hover w3-text-black">
            <a className="w3-hover-none w3-padding-large w3-text-black" title="More">ACCOUNT <i className="fa fa-caret-down"></i></a>
            <div className="w3-dropdown-content w3-white w3-card-4" w3-text-black>
              {!this.state.loggedIn ? <div><a href="javascript:void(0)" onClick={this.openLogin.bind(this)}>Login</a>
              <a href="javascript:void(0)" onClick={this.openSignup.bind(this)}>Signup</a></div> :
              <a href="javascript:void(0)" onClick={this.logout.bind(this)}>Logout</a>}
              <a href = '/facebookLogin'>Facebook</a> 
            </div>
          </li>
          {this.state.loggedIn ? <li className="w3-hide-small w3-right">{this.drawUsername()}</li> : null}
        </ul>
        {this.state.showSignup ?
          <SignUpModal onClose={this.closeSignup.bind(this)} fetchUser={this.fetchUser.bind(this)}/>
        : null}
        {this.state.showLogin ?
          <LoginModal onClose={this.closeLogin.bind(this)} fetchUser={this.fetchUser.bind(this)}/>
        : null}
        {this.state.showFilter ?


          <Filter onClose={this.closeFilter.bind(this)} fetchUser={this.fetchUser.bind(this)} gallery={this.props.gallery} searchTerm={ this.props.searchTerm }  addToSearchTerm={ this.props.addToSearchTerm} />
       

        : null}
      </div>
    ) 
  }
}

class LoginModal extends React.Component {
  constructor() {
    super()

    this.state = {
      isLoading: false,
      username: null,
      password: null,
      showError: false
    }

  }
  showError() {
    this.setState({showError: true})
  }
  load() {
    this.setState({isLoading: true});
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 1500);
  }

  render() {
    return <ModalContainer onClose={this.props.onClose}>
      {this.state.isLoading ?
        <ReactSpinner color="white"/>
        :
        <ModalDialog onClose={this.props.onClose} className="example-dialog">
          <form name="loginForm" onSubmit={(e) => {
            e.preventDefault(); 
            auth.login({username: this.state.username, password: this.state.password})
             .then((x) => {
              if(x === 'Success') {
                this.setState({showError: false})
                this.props.onClose(true)
                this.props.fetchUser()
              } else {
                this.setState({showError: x.statusText})
              }
          }) 
            this.load.call(this); 
          }}>
            <h1>Login</h1>
            <p>Username:</p>
            <input type="text" name="username" onChange={(e) => this.setState({username: e.target.value})}/>
            {this.state.showError ? <p className="errorMessage">{this.state.showError}</p> : ''}
            <p>Password:</p>
            <input type="password" name="password" onChange={(e) => this.setState({password: e.target.value})}/>
            <p><button type="submit">Submit</button></p>
          </form>
        </ModalDialog>
      }
    </ModalContainer>;
  }
}

class SignUpModal extends React.Component {
  constructor() {
    super()

    this.state = {
      isLoading: false,
      username: null,
      password: null,
      showError: false
    }
  }

  load() {
    this.setState({isLoading: true});
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 1500);
  }

  render() {
    return <ModalContainer onClose={this.props.onClose}>
      {this.state.isLoading ?
        <ReactSpinner color="white"/>
        :
        <ModalDialog onClose={this.props.onClose} className="example-dialog">
          <form name="signUpForm" onSubmit={(e) => {
            e.preventDefault(); 
            auth.signUp({username: this.state.username, password: this.state.password})
            .then((x) => {
              console.log("xxxxxxxx", x)
              if(x === 'Success') {
                this.setState({showError: false})
                this.props.onClose(true)
                this.props.fetchUser()
              } else {
                this.setState({showError: x.statusText})
              }
          })
            // .catch(err => {
            //   console.log("ERRRRRR", err)
            //   this.setState({showError: err})
            // })
            this.load.call(this); 
          }}>
            <h1>SignUp</h1>
            <p>Username:</p>
            <input type="text" name="username" onChange={(e) => this.setState({username: e.target.value})}/>
            {this.state.showError ? <p className="errorMessage">{this.state.showError}</p> : ''}
            <p>Password:</p>
            <input type="password" name="password" onChange={(e) => this.setState({password: e.target.value})}/>
            <p><button type="submit">Submit</button></p>
          </form>
        </ModalDialog>
      }
    </ModalContainer>;
  }
}
