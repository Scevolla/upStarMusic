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
        <nav>
          <div className="nav-wrapper">
            <div className="col s12">
              <a href="#" className="brand-logo">UpStar Music</a>
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
          </div>
        </nav>
      </div>
    );
  }
};

export default Header;