import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

class ArtistCreate extends Component {
  componentWillUnmount() {
    this.props.clearError();
  }

  onSubmit(e) {
    e.preventDefault();
    const aValues = {
      name: e.target.name.value,
      age: e.target.age.value,
      yearsActive: e.target.yearsActive.value,
      genre: e.target.genre.value
    };
    this.props.createArtist(aValues);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className='input-field'>
          <input
            type='text'
            name='name'
            placeholder='Name'
          />
        </div>
        <div className='input-field'>
          <input
            type='text'
            name='age'
            placeholder='Age'
          />
        </div>
        <div className='input-field'>
          <input
            type='text'
            name='yearsActive'
            placeholder='Years Active'
          />
        </div>
        <div className='input-field'>
          <input
            type='text'
            name='genre'
            placeholder='Genre'
          />
        </div>
        <div className='has-error'>
          {this.props.errorMessage}
        </div>
        <button className="btn">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage
  };
};

export default connect(mapStateToProps, actions)(ArtistCreate);