import React from 'react';
import { Button } from 'reactstrap';
export default class ButtonLoader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let loader;
    let isDisable = false;

    if (this.props.isLoading == true) {
      loader = React.createElement("span", null, ' ', React.createElement("i", {
        className: "fa fa-spinner fa-spin"
      }));
      isDisable = true;
    }

    let result = React.createElement(Button, {
      onClick: this.props.onClick,
      size: this.props.size,
      disabled: this.props.disabled ? this.props.disabled : isDisable,
      className: this.props.className
    }, this.props.value, " ", loader);
    return result;
  }

}
//# sourceMappingURL=index.js.map