import React from 'react';
import { connect } from 'react-redux';
import uuidv4 from "uuid/v4";
import TextBox from '../../../../../Components/FormComponent/Components/TextBox/index.jsx';
import { Translator } from './../../../../../Shared/index.js';
import DayPickerInputComponent from './../../../../../Components/FormComponent/Components/DayPickerInputComponent/index.jsx';

class CategoryOptionFormSINGLE extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state.validation = [];
        this.state.dataValue = null;
        this.state.id = this.props.values ? this.props.values : {};
        this.state.catOption = this.props.optionValue != undefined ? this.props.optionValue.map(item => {

            item.val = item.value;
            return item;
        }) : [{
            id: uuidv4(),
            cat_opt_id: this.props.catOption.cat_opt_temp[0].id,
            val: '',
            element: this.props.catOption.id,
            type: 'SINGLE'
            , col_id: this.props.catOption.category_link[0].id
            , catOption: this.props.catOption.cat_opt_temp[0]
        }]

    }


    onChange(event) {

        this.state.catOption[0].val = event.target.value;
        this.setState({
            catOption: this.state.catOption
        })
        this.props.onChange(this.props.catOption,
            this.state.catOption)


    }
    dateHandler(event) {
        this.setState({
            dataValue: event
        });

        this.props.onChange(this.props.catOption, [{ id: uuidv4(), cat_opt_id: this.props.catOption.cat_opt_temp[0].id, val: event, element: this.props.catOption.id, type: 'SINGLE' }])



    }
    getDropDownValues() {
        return [{ id: '', value: '', type: "" }, ...this.props.catOption.cat_opt_temp.map(item => {
            return { id: item.id, value: item["value_" + this.props.lang], type: item["value_" + this.props.lang] }
        })];
    }




    render() {
         const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
         const link = this.props.catOption.category_link[0];
        return (
            <div class="g-mb-10">
                {['FLOAT', 'STRING', 'NUMBER'].includes(this.props.catOption.cat_opt.name) ?
                    <TextBox placeholder={this.props.catOption.cat_opt_temp[0]["placeholder_" + this.props.lang]} onChange={this.onChange.bind(this)} isRequired={link.is_require ? link.is_require : this.props.catOption.is_require} label={this.props.catOption["name_" + this.props.lang]} value={this.state.catOption[0].val} field="email" validation={[]} />
                    : <span></span>}
                {['DATE'].includes(this.props.catOption.cat_opt.name) ?
                    <DayPickerInputComponent
                        dateFormat="dd-MM-yyyy"
                        showTimeSelect={false}
                        minDate={null}
                        value={this.state.dataValue} placeholder={this.props.catOption.cat_opt_temp[0]["placeholder_" + this.props.lang]} onChange={this.dateHandler.bind(this)} isRequired={true} label={this.props.catOption["name_" + this.props.lang]} field="birthDate" validation={[]} />
                    : <span></span>}

            </div >

        )
    }
}


const mapStateToProps = (state) => {

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        //  catOptions: state.EditCategoryReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {







    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryOptionFormSINGLE);

