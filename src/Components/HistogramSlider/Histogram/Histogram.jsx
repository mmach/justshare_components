import * as React from 'react';


export default class Histogram extends React.Component {


  constructor(props) {
    super(props);

    let { data, maxHeightPx } = this.props;
    const max = Math.max(...data);
    maxHeightPx = maxHeightPx != undefined ? maxHeightPx : 20

    const heightPxPerUnit = maxHeightPx / max;
    const heightData = data.map(v => Math.round(heightPxPerUnit * v));
    this.state = {
      data: heightData,
    }; this.mask1 = Date.now() + '';
    this.mask2 = Date.now() + 1 + '';
    this.numOfColumn = this.props.data.length;
    this.maxHeightPx = 20

  }


  componentWillReceiveProps({ data }) {
    if (data !== this.props.data) {
      const max = Math.max(...data);
      const heightPxPerUnit = this.props.maxHeightPx / max;
      const heightData = data.map(v => Math.round(heightPxPerUnit * v));

      this.numOfColumn = data.length;

      this.setState({
        data: heightData,
      });
    }
  }

  render() {
    let { min, max, value, colors, maxHeightPx } = this.props;
  //  maxHeightPx = maxHeightPx != undefined ? maxHeightPx : 20
    console.log(min)
    const [vMin, vMax] = value;
    const range = max - min;
    const start = ((vMin - min) * this.numOfColumn) / range;
    const end = start + ((vMax - vMin) * this.numOfColumn) / range;
    maxHeightPx=Math.max(...this.state.data);
    return (
      <svg
        width="100%"
        height="5vh"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${this.numOfColumn} ${maxHeightPx}`}
      >
        <defs>
          <mask
            id={this.mask1}
            x="0"
            y="0"
            width={this.numOfColumn}
            height={maxHeightPx}
          >
            >
                  <rect
              x={start}
              y="0"
              fill="white"
              width={end - start}
              height={maxHeightPx}
            />
          </mask>
          <mask
            id={this.mask2}
            x="0"
            y="0"
            width={this.numOfColumn}
            height={maxHeightPx}
          >

            <rect
              x="0"
              y="0"
              fill="white"
              width={start}
              height={maxHeightPx}
            />
            <rect
              x={start}
              y="0"
              fill="black"
              width={end - start}
              height={maxHeightPx}
            />
            <rect
              x={end}
              y="0"
              fill="white"
              width={this.numOfColumn - end}
              height={maxHeightPx}
            />
          </mask>
        </defs>
        {this.state.data.map((height, index) => {
          return (<g>
            <rect
              mask={`url(#${this.mask2})`}
              x={index}
              y={maxHeightPx - height}
              width="1.0"
              strokeWidth="0.1"
              height={height}
              fill={colors.out}
            />
            <rect
              mask={`url(#${this.mask1})`}
              x={index}
              y={maxHeightPx - height}
              width="1.0"
              strokeWidth="0.1"
              fill={colors.in}
              height={height}
            />
          </g>
          );
        })}
      </svg>

    );
  }
}
