import React from 'react';
import './../../Shared/BaseObjects/Helper/commonFunctions.js';
export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.validation = [];
    let label = props.label;

    if (this.props.isRequired == true) {
      label += ' *';
    }

    this.state.field = props.field;
    this.state.validation = props.validation ? props.validation : [];
    this.state.guid = global.guid();
    this.state.label = label;
  }

  init() {}

  FormValidation() {
    let FormValidation = [];
    let i = 0;
    let isDanger = "";
    let classError = "row g-mb-25 text-left";
    this.state.validation.map(item => {
      if (item.path[0] == this.props.field) {
        FormValidation[i] = React.createElement("small", {
          className: "form-control-feedback",
          key: i
        }, item.msg, React.createElement("br", null));
        i++;

        if (i === 1) {
          isDanger = "danger";
          classError += " u-has-error-v1";
        }
      }
    });
    return {
      FormValidation: FormValidation,
      isDanger: isDanger,
      classError: classError
    };
  }

}