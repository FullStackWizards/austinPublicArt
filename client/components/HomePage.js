import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import NavBar from './NavBar'

export default class HomePage extends React.Component {

  //The homepage component with links to gallery and artists page on the two buttons.
  render() {
    return (
        <div id="home" className="parallax-section">
          <NavBar />
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                {/* <p className="wow fadeInDown"><span>AUSTIN </span>ART</p> 
                <Link to={`/gallery`} className="btn btn-danger wow fadeInUp" data-wow-delay="0.4s">GALLERY</Link>
                <Link to={`/artists`} className="btn btn-default smoothScroll wow fadeInUp" data-wow-delay="0.6s">ARTISTS</Link>       
                */}
              </div>
            </div>
          </div>    
        </div>
    )
  }
}



