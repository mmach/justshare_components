import * as React from 'react';
import Histogram from './Histogram/Histogram.jsx';
import Rheostat from 'rheostat'


export default class HistogramSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: [this.props.value[0], this.props.value[1]]
    }
    this.timeout = 0
  };


  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (value !== this.props.value) {
      this.setState({ value });
    }
  }

  reset(e) {
    e.preventDefault();
    this.setState({ value: [this.props.min, this.props.max] }, () => {
      if (typeof this.props.onApply === 'function') {
        this.props.onApply(this.state.value);
      } else if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.value);
      }
    });
  };

  isDisabled() {
    return (
      this.state.value[0] === this.props.min &&
      this.state.value[1] === this.props.max
    );
  };

  handleSliderChange(value) {
    this.setState({ value: value.values });
    this.props.onChange(value.values)
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
  };

  handleApply(e) {
    e.preventDefault();
    if (typeof this.props.onApply === 'function') {
      this.props.onApply(this.state.value);
    }
  };

  render() {
    if (this.props.min >= this.props.max) {
      console.error(
        `The prop "min" should not be greater than the props "max".`,
      );
      return null;
    }

    if (this.props.value[0] >= this.props.value[1]) {
      console.error(
        `The [0] of the prop "value" should not be greater than the [1].`,
      );
      return null;
    }

    const isDisabled = this.isDisabled();
    const { data, ...rangeSliderProps } = this.props;
    let dataCube = []
    let dataMean = []
    //let divVal = Math.round(this.props.data.length / (this.props.cubeSize > 0 ? this.props.cubeSize : 50))
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
      return Math.round(item)
    })
    return (
      <div
        style={{
          maxWidth: '100%',
          minWidth: '100%',
          boxSizing: 'border-box',
          heigth: '30px',
    
        }}
      >
        <Histogram
          maxHeightPx="40"
          colors={this.props.colors}
          data={dataCube}
          value={this.state.value}
          min={this.props.min}
          max={this.props.max}

        />
        <div style={{ marginTop: '-5px' }}>
          <Rheostat
            min={this.props.min}
            max={this.props.max}
            onValuesUpdated={this.handleSliderChange.bind(this)}
            values={[this.state.value[0], this.state.value[1]]} />

        </div>
        <div className={{ marginTop: '20px' }}>
          <div
            style={{
              marginBottom: '10px',
              fontSize: '12px',
              color: '#666666',
            }}
          >
            {this.props.label}
          </div>

          {typeof this.props.onApply === 'function' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: isDisabled ? 'flex-end' : 'space-between',
              }}
            >
              {!isDisabled && (
                <button onClick={this.reset} disabled={isDisabled}>
                  Reset
                    </button>
              )}
              <button onClick={this.handleApply.bind(this)}>Apply</button>
            </div>
          )}
        </div>
      </div>

    );
  }
}
