import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, FormFeedback } from 'reactstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import FormComponent from './../../index.jsx';
import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";
import "./../../../../assets/css/react-datepicker-cssmodules.css"

export default class DayPickerInputComponent extends FormComponent {

    constructor(props) {
        super(props);

    }

    onChange(event)
    {
        console.log(event);
    }
    render() {

        this.init();
        let formValidation = this.FormValidation.bind(this)();

//"dd-MM-yyyy"
        let result = (
            <FormGroup color={formValidation.isDanger} className={formValidation.classError}>
                <Label for={this.state.guid} class="col-3 ">{this.state.label}</Label>
                <Col >
                    <DatePicker
                        selected={this.props.value}
                        onChange={this.props.onChange}
                        className="form-control rounded-0 g-width-100p"
                        showTimeSelect={this.props.showTime?this.props.showTime:false}
                        timeFormat="HH:mm"
                        dateFormat={this.props.dateFormat}
                        timeIntervals={15}
                        minDate={this.props.minDate}
                        showDisabledMonthNavigation ={true}
                        placeholderText={this.props.placeholder}
                        id={this.state.guid}
                        value={this.props.value}
                        showYearDropdown={this.props.showYearDropdown}
                        scrollableYearDropdown={this.props.scrollableYearDropdown}
                        yearDropdownItemNumber={this.props.yearDropdownItemNumber}
                        maxDate={this.props.maxDate}



                    />
                   
                    {formValidation.FormValidation}
                </Col>
            </FormGroup>
        );
        return result;
    }


}