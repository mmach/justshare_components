import React from 'react';

import { Button } from 'reactstrap';



export default class ButtonLoader extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        let loader;
        let isDisable=false;
        if (this.props.isLoading == true) {
            loader = <span>{' '}<i class="fa fa-spinner fa-spin" /></span>
            isDisable=true;
        }
        let result = (

            <Button onClick={this.props.onClick} size={this.props.size} disabled={this.props.disabled?this.props.disabled:isDisable} className={this.props.className}>{this.props.value} {loader}</Button>

        );
        return result;
    }


}