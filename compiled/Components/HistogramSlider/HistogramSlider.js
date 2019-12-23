function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import * as React from 'react';
import Histogram from './Histogram/Histogram.jsx';
import Rheostat from 'rheostat';
export default class HistogramSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [this.props.value[0], this.props.value[1]]
    };
    this.timeout = 0;
  }

  componentWillReceiveProps(nextProps) {
    const value = nextProps.value;

    if (value !== this.props.value) {
      this.setState({
        value
      });
    }
  }

  reset(e) {
    e.preventDefault();
    this.setState({
      value: [this.props.min, this.props.max]
    }, () => {
      if (typeof this.props.onApply === 'function') {
        this.props.onApply(this.state.value);
      } else if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.value);
      }
    });
  }

  isDisabled() {
    return this.state.value[0] === this.props.min && this.state.value[1] === this.props.max;
  }

  handleSliderChange(value) {
    this.setState({
      value: value.values
    });
    this.props.onChange(value.values);
    /*
        if (typeof this.props.onChange === 'function') {
          if (this.timeout) {
            window.clearTimeout(this.timeout);
          }
          this.timeout = window.setTimeout(() => {
            //@ts-ignore: has been checked outsite
            this.props.onChange(value);
          }, this.props.debounceDelay || 500);
        }*/
  }

  handleApply(e) {
    e.preventDefault();

    if (typeof this.props.onApply === 'function') {
      this.props.onApply(this.state.value);
    }
  }

  render() {
    if (this.props.min >= this.props.max) {
      console.error(`The prop "min" should not be greater than the props "max".`);
      return null;
    }

    if (this.props.value[0] >= this.props.value[1]) {
      console.error(`The [0] of the prop "value" should not be greater than the [1].`);
      return null;
    }

    const isDisabled = this.isDisabled();

    const _this$props = this.props,
          data = _this$props.data,
          rangeSliderProps = _objectWithoutProperties(_this$props, ["data"]);

    let dataCube = [];
    let dataMean = []; //let divVal = Math.round(this.props.data.length / (this.props.cubeSize > 0 ? this.props.cubeSize : 50))
    //this.props.data.forEach((element, index) => {

    /* if (index % divVal == 0) {
       let val = 0;
       dataMean.forEach(item => {
         val += item
       })
       dataCube.push(parseFloat(val) * parseFloat(divVal) / 100.0)
       dataMean = []
     } else {
       dataMean.push(element);
     }
    })*/

    dataCube = this.props.data.map(item => {
      return Math.round(item);
    });
    return React.createElement("div", {
      style: {
        maxWidth: '100%',
        minWidth: '100%',
        boxSizing: 'border-box',
        heigth: '30px'
      }
    }, React.createElement(Histogram, {
      maxHeightPx: "40",
      colors: this.props.colors,
      data: dataCube,
      value: this.state.value,
      min: this.props.min,
      max: this.props.max
    }), React.createElement("div", {
      style: {
        marginTop: '-5px'
      }
    }, React.createElement(Rheostat, {
      min: this.props.min,
      max: this.props.max,
      onValuesUpdated: this.handleSliderChange.bind(this),
      values: [this.state.value[0], this.state.value[1]]
    })), React.createElement("div", {
      className: {
        marginTop: '20px'
      }
    }, React.createElement("div", {
      style: {
        marginBottom: '10px',
        fontSize: '12px',
        color: '#666666'
      }
    }, this.props.label), typeof this.props.onApply === 'function' && React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: isDisabled ? 'flex-end' : 'space-between'
      }
    }, !isDisabled && React.createElement("button", {
      onClick: this.reset,
      disabled: isDisabled
    }, "Reset"), React.createElement("button", {
      onClick: this.handleApply.bind(this)
    }, "Apply"))));
  }

}
//# sourceMappingURL=HistogramSlider.js.map