import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, FormFeedback } from 'reactstrap';
import FormComponent from './../../index.jsx';
export default class DropDownList extends FormComponent {
  constructor(props) {
    super(props);
  }

  render() {
    this.init();
    let formValidation = this.FormValidation.bind(this)();
    let optionValue = [];
    let i = 0;
    this.props.valueOptions.map(item => {
      optionValue[i] = React.createElement("option", {
        key: i++,
        value: item.id
      }, item.value);
    });
    let result = React.createElement(FormGroup, {
      color: formValidation.isDanger,
      className: formValidation.classError
    }, React.createElement(Label, {
      htmlFor: this.state.guid,
      className: "col-3 "
    }, this.state.label, " "), React.createElement(Col, null, React.createElement(Input, {
      type: "select",
      className: "form-control rounded-0",
      value: this.props.value,
      id: this.state.guid,
      onChange: this.props.onChange,
      disabled: this.props.disabled
    }, optionValue), formValidation.FormValidation));
    return result;
  }

}
//# sourceMappingURL=index.js.map