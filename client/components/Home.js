import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class Home extends React.Component {
  //The homepage component with links to gallery and artists page on the two buttons.
  render() {
    return (
        <section id="home" className="parallax-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <h1 className="wow fadeInDown title">AUSTIN ART</h1>
                <Link 
                  to={`/gallery`} 
                  className="button"
                  data-wow-delay="0.4s"
                >
                  <span aria-hidden="true">
                    <span className="line left"></span>
                    <span className="line top"></span>
                    <span className="line right"></span>
                    <span className="line bottom"></span>
                  </span>
                  ENTER GALLERY
                </Link>
              </div>
            </div>
          </div>    
        </section>
    )
  }
}
