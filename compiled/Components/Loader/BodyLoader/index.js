import React from 'react';
import logo from './../../../assets/img/logo/logo-2.png';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';

class BodyLoader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // <div id="loading-text">LOADING <br />{this.props.progress + "%"}</div>
    return React.createElement(Container, {
      onClick: this.props.onClick,
      className: "loader" + (this.props.className ? this.props.className : ""),
      style: {
        height: this.props.height,
        display: 'flex',
        zIndex: this.props.zIndex > 0 ? this.props.zIndex : 7001,
        width: '100%',
        height: '100%'
      }
    }, React.createElement("div", {
      style: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        display: 'flex',
        height: this.props.height
      }
    }, this.props.withImg ? React.createElement("img", {
      src: logo,
      className: "position-absolute"
    }) : React.createElement("span", null), React.createElement("div", {
      id: this.props.white == "true" ? "loading-content-white" : "loading-content",
      style: {
        display: 'block',
        height: this.props.size,
        width: this.props.size
      }
    }), React.createElement("div", {
      id: "loading-text",
      style: {
        color: this.props.white == "true" ? "#fff" : "#333"
      }
    }, "LOADING...")));
  }

}

export default BodyLoader;