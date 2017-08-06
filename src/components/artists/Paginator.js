import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions.js';

class Paginator extends Component {
  back() {
    if (this.props.offset === 0 ) { 
      return; 
    }
    this.props.showArtistsPrevPage();
  }

  advance() {
    const { offset, displayCount, totalCount } = this.props;
    if ((offset + displayCount) >= totalCount) { 
      return; 
    }
    this.props.showArtistsNextPage();
  }

  left() {
    return (
      <li className={this.props.offset === 0 ? 'disabled' : ''}>
        <a onClick={this.back.bind(this)}>
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
    );
  }

  right() {
    const { offset, displayCount, totalCount } = this.props;
    const end = ((offset + displayCount) >= totalCount) ? true : false;

    return (
      <li className={end ? 'disabled' : ''}>
        <a onClick={this.advance.bind(this)}>
          <i className='material-icons'>chevron_right</i>
        </a>
      </li>
    );
  }

  render() {
    const { offset, displayCount, totalCount } = this.props;
    const lastDisplayedIndex = Math.min(offset + displayCount, totalCount)
    return (
      <div className='center-align'>
        <ul className='pagination'>
          {this.left()}
          <li><a>Page {Math.floor(offset / displayCount) + 1} of {Math.ceil(totalCount / displayCount)}</a></li>
          {this.right()}
        </ul>
        {totalCount} Found ({offset + 1} - {lastDisplayedIndex} Displayed)
      </div>
    );
  }
}

const mapStateToProps = ({ artists }) => {
  const { offset, displayCount, totalCount } = artists;
  return { offset, displayCount, totalCount };
};

export default connect(mapStateToProps, actions)(Paginator);