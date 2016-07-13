import React from 'react'
import {Link} from 'react-router' 


export default class NavBar extends React.Component {
  render() {
    return(
      <div className="w3-top">
        <ul className="w3-navbar w3-black w3-card-2 w3-left-align">
          <li className="w3-hide-medium w3-hide-large w3-opennav w3-right">
            <a className="w3-padding-large" href="javascript:void(0)" title="Toggle Navigation Menu"><i className="fa fa-bars"></i></a>
          </li>
          <li><Link to={'/'} className="w3-hover-none w3-hover-text-grey w3-padding-large">HOME</Link></li>
          <li className="w3-hide-small"><Link className="w3-padding-large" to={`/artists`}>ARTISTS</Link></li>
          <li className="w3-hide-small"><Link to={`/gallery`} className="w3-padding-large">GALLERY</Link></li>
          <li className="w3-hide-small"><a href="#" className=" w3-padding-large">CONTACT</a></li>
          <li className="w3-hide-small w3-dropdown-hover">
            <a href="javascript:void(0)" className="w3-hover-none w3-padding-large" title="More">MORE <i className="fa fa-caret-down"></i></a>
            <div className="w3-dropdown-content w3-white w3-card-4">
              <a href="#">Merchandise</a>
              <a href="#">Extras</a>
              <a href="#">Media</a>
            </div>
          </li>
          <li className="w3-hide-small w3-right"><a href="javascript:void(0)" className="w3-padding-large w3-hover-red"><i className="fa fa-search"></i></a></li>
        </ul>
      </div>
    ) 
  }
}