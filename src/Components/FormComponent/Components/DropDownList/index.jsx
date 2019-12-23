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
        this.props.valueOptions.map((item) => {

            optionValue[i] = <option key={i++} value={item.id}>{item.value}</option>

        })

        let result = (
            <FormGroup color={formValidation.isDanger} className={formValidation.classError}>
                <Label for={this.state.guid} class="col-3 ">{this.state.label} </Label>
                <Col>
                    <Input type="select" className="form-control rounded-0" value={this.props.value} id={this.state.guid} onChange={this.props.onChange} disabled={this.props.disabled}>
                        {optionValue}

                    </Input>
                    {formValidation.FormValidation}
                </Col>
            </FormGroup>

        );
        return result;
    }


}
