import assignIn from 'lodash.assignin';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Range } from '../filters';
import * as actions from '../../actions/actions.js';

class ArtistFilter extends Component {
  componentDidMount() {
    this.props.setFilterRanges();
    this.props.searchArtists(this.props.filterForm);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchArtists(this.props.filterForm);
  }

  onFormFieldChange(fieldType, fieldName, newValue) {
    if (fieldType != 'range') {
      newValue = newValue.target.value;
    }
    this.props.filterChanged({ [fieldName] : newValue });
  }

  render() {
    const { filterForm } = this.props;

    return (
      <div className="card blue-grey darken-1 row">
        <div className="card-content white-text">
          <form name='filterForm' onSubmit={this.handleSubmit.bind(this)}>
            <div className="center-align card-title">
              Search
            </div>

            <div className="input-field">
              <label htmlFor='name'>{filterForm.name ? '' : 'Name'}</label>
              <input
                type='text'
                id='name'
                name='name'
                value={filterForm.name}
                onChange={this.onFormFieldChange.bind(this, 'text', 'name')}
              />
            </div>

            <div className="input-field">
              <Range
                label='Age'
                range={filterForm.limitAge}
                value={filterForm.age}
                onChange={this.onFormFieldChange.bind(this, 'range', 'age')}
              />
            </div>

            <div className="input-field">
              <Range
                label='Years Active'
                range={filterForm.limitYearsActive}
                value={filterForm.yearsActive}
                onChange={this.onFormFieldChange.bind(this, 'range', 'yearsActive')}
              />
            </div>

            <div>
              <label className='select' htmlFor='sort'>Sort By</label>
              <select id='sort' name='sort' value={filterForm.sort} onChange={this.onFormFieldChange.bind(this, 'select', 'sort')}>
                <option value='name'>Name</option>
                <option value='age'>Age</option>
                <option value='albums'>Albums Released</option>
              </select>
            </div>

            <div className="center-align">
              <button className='btn'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ filterForm }) => ({ filterForm });

export default connect(mapStateToProps, actions)(ArtistFilter);