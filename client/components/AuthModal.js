import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactSpinner from 'react-spinjs';

export default class AuthModal extends React.Component {
  constructor() {
    super()
    this.state = {
      showLogin: false,
      showSignup: false
    }
  } 
  
  openLogin() {
    this.setState({showLogin: true});
  }
  closeLogin() {
    this.setState({showLogin: false});
  }

  openSignup() {
    this.setState({showSignup: true});
  }
  closeSignup() {
    this.setState({showSignup: false});
  }

  render() {
    return ( 
    <div>
    <button onClick={this.openSignup.bind(this)}>
      SignUp
      {this.state.showSignup ?
        <SignUpModal onClose={this.closeSignup.bind(this)} signUp={this.props.signUp.bind(this)}/>
      : null}
    </button>
    <button onClick={this.openLogin.bind(this)}>
      Login
      {this.state.showLogin ?
        <LoginModal onClose={this.closeLogin.bind(this)} login={this.props.login.bind(this)}/>
      : null}
    </button>
    <button onClick={this.props.logout}>
    Logout
    </button>
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
      password: null
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
          <form name="loginForm" onSubmit={(e) => {
            e.preventDefault(); 
            this.load.call(this); 
            this.props.login({username: this.state.username, password: this.state.password})
          }}>
            <h1>Login</h1>
            <p>Username:</p>
            <input type="text" name="username" onChange={(e) => this.setState({username: e.target.value})}/>
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
      password: null
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
          <form name="loginForm" onSubmit={(e) => {
            e.preventDefault(); 
            this.load.call(this); 
            this.props.signUp({username: this.state.username, password: this.state.password})
          }}>
            <h1>SignUp</h1>
            <p>Username:</p>
            <input type="text" name="username" onChange={(e) => this.setState({username: e.target.value})}/>
            <p>Password:</p>
            <input type="password" name="password" onChange={(e) => this.setState({password: e.target.value})}/>
            <p><button type="submit">Submit</button></p>
          </form>
        </ModalDialog>
      }
    </ModalContainer>;
  }
}