import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, FormFeedback } from 'reactstrap';
import FormComponent from './../../index.js';
export default class IconTextbox extends FormComponent {
  constructor(props) {
    super(props);
  }

  render() {
    this.init();
    let formValidation = this.FormValidation.bind(this)();
    let result = React.createElement(FormGroup, {
      color: formValidation.isDanger,
      className: formValidation.classError
    }, React.createElement(Label, {
      htmlFor: this.state.guid,
      className: "col-3 "
    }, this.state.label), React.createElement(Col, {
      xs: "3"
    }, React.createElement(Input, {
      className: "form-control rounded-0",
      type: this.props.type ? this.props.type : "search",
      value: this.props.value,
      id: this.state.guid,
      onChange: this.props.onChange,
      placeholder: this.props.placeholder
    }), formValidation.FormValidation), React.createElement(Col, {
      xs: "6"
    }, React.createElement("span", null, React.createElement("i", {
      className: this.props.value
    }))));
    return result;
  }

}