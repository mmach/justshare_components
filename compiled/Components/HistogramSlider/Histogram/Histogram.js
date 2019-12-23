function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import * as React from 'react';
export default class Histogram extends React.Component {
  constructor(props) {
    super(props);
    let _this$props = this.props,
        data = _this$props.data,
        maxHeightPx = _this$props.maxHeightPx;
    const max = Math.max(...data);
    maxHeightPx = maxHeightPx != undefined ? maxHeightPx : 20;
    const heightPxPerUnit = maxHeightPx / max;
    const heightData = data.map(v => Math.round(heightPxPerUnit * v));
    this.state = {
      data: heightData
    };
    this.mask1 = Date.now() + '';
    this.mask2 = Date.now() + 1 + '';
    this.numOfColumn = this.props.data.length;
    this.maxHeightPx = 20;
  }

  componentWillReceiveProps({
    data
  }) {
    if (data !== this.props.data) {
      const max = Math.max(...data);
      const heightPxPerUnit = this.props.maxHeightPx / max;
      const heightData = data.map(v => Math.round(heightPxPerUnit * v));
      this.numOfColumn = data.length;
      this.setState({
        data: heightData
      });
    }
  }

  render() {
    let _this$props2 = this.props,
        min = _this$props2.min,
        max = _this$props2.max,
        value = _this$props2.value,
        colors = _this$props2.colors,
        maxHeightPx = _this$props2.maxHeightPx; //  maxHeightPx = maxHeightPx != undefined ? maxHeightPx : 20

    console.log(min);

    const _value = _slicedToArray(value, 2),
          vMin = _value[0],
          vMax = _value[1];

    const range = max - min;
    const start = (vMin - min) * this.numOfColumn / range;
    const end = start + (vMax - vMin) * this.numOfColumn / range;
    maxHeightPx = Math.max(...this.state.data);
    return React.createElement("svg", {
      width: "100%",
      height: "5vh",
      preserveAspectRatio: "none",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: `0 0 ${this.numOfColumn} ${maxHeightPx}`
    }, React.createElement("defs", null, React.createElement("mask", {
      id: this.mask1,
      x: "0",
      y: "0",
      width: this.numOfColumn,
      height: maxHeightPx
    }, ">", React.createElement("rect", {
      x: start,
      y: "0",
      fill: "white",
      width: end - start,
      height: maxHeightPx
    })), React.createElement("mask", {
      id: this.mask2,
      x: "0",
      y: "0",
      width: this.numOfColumn,
      height: maxHeightPx
    }, React.createElement("rect", {
      x: "0",
      y: "0",
      fill: "white",
      width: start,
      height: maxHeightPx
    }), React.createElement("rect", {
      x: start,
      y: "0",
      fill: "black",
      width: end - start,
      height: maxHeightPx
    }), React.createElement("rect", {
      x: end,
      y: "0",
      fill: "white",
      width: this.numOfColumn - end,
      height: maxHeightPx
    }))), this.state.data.map((height, index) => {
      return React.createElement("g", null, React.createElement("rect", {
        mask: `url(#${this.mask2})`,
        x: index,
        y: maxHeightPx - height,
        width: "1.0",
        strokeWidth: "0.1",
        height: height,
        fill: colors.out
      }), React.createElement("rect", {
        mask: `url(#${this.mask1})`,
        x: index,
        y: maxHeightPx - height,
        width: "1.0",
        strokeWidth: "0.1",
        fill: colors.in,
        height: height
      }));
    }));
  }

}