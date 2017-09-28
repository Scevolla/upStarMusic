import React, { Component } from 'react';
import { Link } from 'react-router';
import { randomInt } from '../../helpers/utils';
import store from '../store';

class Header extends Component {
  redirectToRandomArtist() {
    this.props.router.push('/artists/' + 
      randomInt(0, store.getState().artists.totalCount));
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <nav>
            <div className="nav-wrapper">
              <a href="#" className="brand-logo" style={{paddingLeft: '0.75rem'}}>UpStar Music</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a onClick={this.redirectToRandomArtist.bind(this)}>
                    Random Artist
                  </a>
                </li>
                <li>
                  <Link to={'/artists/new'}>
                    Create Artist
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
};

export default Header;