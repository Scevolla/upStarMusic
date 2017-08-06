import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Paginator from './Paginator';
import * as actions from '../../actions/actions.js';

class ArtistIndex extends Component {
  // componentDidMount() {
  //   this.props.searchArtists();
  // }

  onChangeSelection(_id) {
    if (this.props.selection.indexOf(_id) !== -1) {
      this.props.deselectArtist(_id);
    } else {
      this.props.selectArtist(_id);
    }
  }

  renderList(artist) {
    const { _id } = artist;
    const classes = `collection-item avatar ${artist.retired && 'retired'}`;
    const bSelected = this.props.selection.indexOf(_id) !== -1 ? 1 : 0;

    return (
      <li className={classes} key={_id}>
        <div>
          <input
            id={_id}
            style={{left: 0}}
            type="checkbox"
            checked={bSelected}
            onChange={() => this.onChangeSelection(_id)}
          />
          <label htmlFor={_id} />
        </div>
        <img src={artist.image} className="circle" />
        <div>
          <span className="title">
            <strong>{artist.name}</strong>
          </span>
          <p>
            <b>{artist.age}</b> years old
            <br />
            {artist.albums ? artist.albums.length : 0} albums released
          </p>
        </div>
        <Link to={`artists/${artist._id}`} className="secondary-content">
           <i className="material-icons">play_arrow</i>
         </Link>
      </li>
    );
  }

  renderPaginator() {
    if (this.props.artists.all.length) {
      return <Paginator />;
    }
  }

  renderEmptyCollection() {
    if (this.props.artists.all.length) { return; }

    return (
      <div className="center-align">
        <h5>No records found!</h5>
        <div>Try searching again</div>
      </div>
    );
  }

  renderRetire() {
    const className = 'btn' + (this.props.selection.length ? '' : ' disabled');

    return (
      <div>
        <button
          className={className}
          onClick={() => this.props.setRetired(this.props.selection)}
        >
          Retire
        </button>
        {' '}
        <button
          className={className}
          onClick={() => this.props.setNotRetired(this.props.selection)}
        >
          Unretire
        </button>
      </div>
    );
  }

  render() {
    const { offset, displayCount } = this.props.artists;
    return (
      <div>
        {this.renderRetire()}
        <ul className="collection">
          {
            this.props.artists.all
              .filter((a, i) => i >= offset && i < (offset + displayCount))
              .map(this.renderList, this)
          }
          {this.renderEmptyCollection()}
        </ul>

        {this.renderPaginator()}
      </div>
    );
  }
}

const mapStateToProps = ({ artists, selection }) => ({ artists, selection });

export default connect(mapStateToProps, actions)(ArtistIndex);