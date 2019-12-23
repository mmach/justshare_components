/*
    ./client/components/App.jsx
*/
import React from 'react';
import { Col, FormGroup, Input, Label } from 'reactstrap';
import FormComponent from './../../index.jsx';
import Autocomplete from '@celebryts/react-autocomplete-tags';
import uuidv4 from "uuid/v4";
const KeyCodes = {
  comma: 188,
  enter: 13
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

class TagComponent extends FormComponent {
  constructor(props) {
    super(props);
    this.state.suggestions = [];
    this.state.tags = this.props.tags ? this.props.tags : [];
  }

  onAdd(value) {
    this.state.tags.push(value);
    const result = [];
    const map = new Map();

    for (const item of this.state.tags) {
      if (!map.has(item.label)) {
        map.set(item.label, true); // set any value to Map

        result.push({
          id: item.id,
          value: item.value,
          label: item.label.trim()
        });
      }
    }

    console.log(result);
    this.setState({
      tags: result
    });
    this.props.onChange(this.state.tags); // console.log('Value received from onChange: ' + value)
  }

  onDelete(value) {
    this.state.tags = this.state.tags.filter(item => {
      return item.label != value.trim(label);
    }); //console.log(this.state.tags);

    this.setState({
      tags: this.state.tags
    });
    this.props.onChange(this.state.tags); //   console.log('Value received from onChange: ' + value)
  }

  render() {
    this.init();
    let formValidation = this.FormValidation.bind(this)();
    return React.createElement(FormGroup, {
      color: formValidation.isDanger,
      className: formValidation.classError
    }, React.createElement(Label, {
      htmlFor: this.state.guid,
      className: "col-3 "
    }, this.state.label), React.createElement(Col, null, React.createElement(Autocomplete, {
      className: "form-control g-pa-0 tag-type",
      delay: 300,
      suggestions: this.state.suggestions,
      onAdd: this.onAdd.bind(this),
      onDelete: this.onDelete.bind(this),
      tags: this.state.tags
    })));
  }

}

export default TagComponent;
//# sourceMappingURL=index.js.map