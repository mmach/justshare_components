import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, FormFeedback } from 'reactstrap';

import FormComponent from './../../index.jsx';
export default class Checkbox extends FormComponent {

    constructor(props) {
        super(props);

    }

    render() {

        this.init();
        let formValidation = this.FormValidation.bind(this)();


        let result = (
            <FormGroup color={formValidation.isDanger} className={formValidation.classError}>
                {this.state.label!=undefined?(<Label for={this.state.guid} class="col-5 ">{this.state.label}</Label>):<span></span>}
                <Col >
                    <Label>
                        <Input data-key={this.props["data-key"]} className="form-check-input mr-1" type={this.props.type ? this.props.type : "checkbox"} disabled={this.props.disabled} checked={this.props.value} id={this.state.guid} onChange={this.props.onChange} placeholder={this.props.placeholder} />
                        {this.props.labelInline}
                        {formValidation.FormValidation}
                    </Label>
                </Col>
            </FormGroup>
        );
        return result;
    }


}
