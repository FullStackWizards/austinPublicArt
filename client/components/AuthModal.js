import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactSpinner from 'react-spinjs';

export default class AuthModal extends React.Component {
  constructor() {
    super()
    this.state = {
      showModal: false
    }
  } 
  
  openModal () {
    this.setState({showModal: true});
  }
  closeModal() {
    this.setState({showModal: false});
  }

  render() {
    return <button onClick={this.openModal.bind(this)}>
      Login
      {this.state.showModal ?
        <FirstModal onClose={this.closeModal.bind(this)}/>
      : null}
    </button>;
  }
}

class FirstModal extends React.Component {
  constructor() {
    super()

    this.state = {
      isLoading: false
    }

  }

  load (){
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
          {this.state.showSecondModal ?
            <SecondModal onClose={this.closeModal}/>
          : null}
          <form name="loginForm" onSubmit={(e) => {console.log('send to server'); e.preventDefault(); this.load.call(this)}}>
            <h1>Best Modal ever!</h1>
            <p>Username:</p>
            <input type="text" name="username" />
            <p>Password:</p>
            <input type="password" name="password"/>
            <p><button type="submit">Submit</button></p>
          </form>
        </ModalDialog>
      }
    </ModalContainer>;
  }
}