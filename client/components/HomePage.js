import React, {PropTypes} from 'react';
import {Link} from 'react-router' 
import NavBar from './NavBar'

export default class HomePage extends React.Component {

  render() {
    return (
        <section id="home" className="parallax-section">
          <div className="container">
            <div className="row">

              <div className="col-md-12 col-sm-12">
                <h3 className="wow fadeInDown" data-wow-delay="0.2s">AUSTIN ART</h3>
                <h1 className="wow fadeInDown">AUSTIN ART</h1>
                <Link to={`/gallery`}  className="btn btn-danger wow fadeInUp" data-wow-delay="0.4s">GALLERY</Link>
                <Link to={`/artists`} className="btn btn-default smoothScroll wow fadeInUp" data-wow-delay="0.6s">ARTISTS</Link>
              </div>

            </div>
          </div>    
        </section>
    )
  }
}



