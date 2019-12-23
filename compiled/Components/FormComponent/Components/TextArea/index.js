import React from 'react';
import { Button, Form, FormGroup, Label, FormText, Col, Container, Row, FormFeedback } from 'reactstrap';
import FormComponent from './../../index.jsx';
export default class TextArea extends FormComponent {
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
    }, this.state.label), React.createElement(Col, null, React.createElement("textarea", {
      rows: "5",
      className: "form-control rounded-0",
      value: this.props.value,
      id: this.state.guid,
      onChange: this.props.onChange,
      placeholder: this.props.placeholder
    }), formValidation.FormValidation));
    return result;
  }

}
//# sourceMappingURL=index.js.map