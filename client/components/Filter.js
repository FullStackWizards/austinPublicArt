import React from 'react'
import {Link} from 'react-router' 
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import ReactSpinner from 'react-spinjs';
import ArtWindow from './ArtWindow';

import * as auth from '../models/auth'

export default class Filter extends React.Component {

  constructor() {
    super()

    this.state = {
      isLoading: false,
      showError: false,
      artists: null,
      locations: null,
      zip: null,      
    }

  }

  load() {
    this.setState({isLoading: true});
    setTimeout(() => {
      this.setState({isLoading: false});
    }, 1500);
  }

  render() {

    var artList;
    if(this.props.gallery){
        artList = this.props.gallery;
    }

    return <ModalContainer onClose={this.props.onClose}>
      {this.state.isLoading ?
        <ReactSpinner color="white"/>
        :
        <ModalDialog onClose={this.props.onClose} className="example-dialog">
          <form name="filterForm" onSubmit={(e) => {
            e.preventDefault(); 
              this.props.onClose(true);
              this.load.call(this); 
          }}>
            <h1>Filter</h1>
              <select name="Artists" onChange={(e) => this.props.addToSearchTerm(e.target.value)}>
                <option value="first">Filter By Artist</option>

                {artList.map(piece=>{
                  return piece['Artist Full Name']
                })
                  .filter(function(item,index,array){ 
                    return array.indexOf(item)===index })
                  .map(artists =>{
                    return <option key={artists}>{artists}</option>
                })}

              </select>
              <p><br/></p>
              <select name="Locations" onChange={(e) => this.props.addToSearchTerm(e.target.value)}>
                <option value="first">Filter By District</option>
                {artList.map(piece=>{
                  return piece['Art Location Name']
                })
                  .filter(function(item,index,array){ 
                    return array.indexOf(item)===index })
                  .map(locations =>{
                    return <option key={locations}>{locations}</option>
                })}
              </select>  
              <p><br/></p>
              <select name="zip" onChange={(e) => this.props.addToSearchTerm(e.target.value)}>
                <option value="first">Filter By Zip Code</option>

                {artList.map(piece=>{
                  return piece['Art Location Zip']
                })
                  .filter(function(item,index,array){ 
                    return array.indexOf(item)===index })
                  .map(area =>{
                    return <option key={area}>{area}</option>
                })}
              </select>  
              <p><br/></p>
            <p><button type="submit">Submit</button></p>
          </form>
        </ModalDialog>
      }

    </ModalContainer>;
  }
}

