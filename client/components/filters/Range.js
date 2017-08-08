import React, { Component, PropTypes } from 'react';
import Slider from 'react-input-range';

class Range extends Component {
  onRangeChange(component, values) {
    const { onChange } = this.props;
    onChange(values);
  }

  render() {
    const { value, range, label } = this.props;
    //const minValue = parseInt(this.props.range.min);
    //const maxValue = parseInt(this.props.range.max);
    //value.min = Math.max(parseInt(value.min), minValue);

    return (
      <div className="range-slider">
        <label>{label}</label>
        <Slider
          onChange={this.onRangeChange.bind(this)}
          minValue={parseInt(range.min)}
          maxValue={parseInt(range.max)}
          value={value || range}
        />
      </div>
    );
  }
};

Range.defaultProps = {
  range: { min: 0, max: 100 }
};

Range.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }).isRequired,
  range: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }).isRequired
};

export { Range };