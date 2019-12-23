import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import uuidv4 from "uuid/v4";
import Checkbox from '../../../../../Components/FormComponent/Components/Checkbox/index.js';
import { Translator } from './../../../../../Shared/index.js';

class CategoryOptionFormMULTISELECT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.checked = [];
    this.state.validation = [];
    this.state.id = this.props.values ? this.props.values : {};
  }

  onChange(event) {
    // let checked = event.target.checked;
    let checked = this.state.checked;
    checked = checked.filter(item => {
      return item.cat_opt_id != event.currentTarget.getAttribute('data-key');
    });
    checked.push({
      id: uuidv4(),
      cat_opt_id: event.currentTarget.getAttribute('data-key'),
      val: event.target.checked,
      element: this.props.catOption.id,
      select: this.props.catOption.cat_opt_temp.filter(item => {
        return item.id == event.currentTarget.getAttribute('data-key');
      })[0],
      type: 'MULTISELECT',
      col_id: this.props.catOption.category_link[0].id
    });
    console.log(event.currentTarget.getAttribute('data-key'));
    this.setState({
      checked: checked
    });
    this.props.onChange(this.props.event, checked.filter(item => {
      return item.val == true;
    }));
  }

  getDropDownValues() {
    return [{
      id: '',
      value: '',
      type: ""
    }, ...this.props.catOption.cat_opt_temp.map(item => {
      return {
        id: item.id,
        value: item["value_" + this.props.lang],
        type: item["value_" + this.props.lang]
      };
    })];
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    const link = this.props.catOption.category_link[0];
    return React.createElement("div", {
      className: "g-mb-10"
    }, React.createElement("div", null, this.props.catOption["name_" + this.props.lang]), React.createElement(Row, {
      className: "g-pa-10"
    }, this.props.catOption.cat_opt_temp.map(item => {
      return React.createElement(Col, {
        xs: "4"
      }, React.createElement(Checkbox, {
        "data-key": item.id,
        validation: [],
        value: this.state.checked.filter(el => {
          return el.cat_opt_id == item.id;
        }).length > 0 ? this.state.checked.filter(el => {
          return el.cat_opt_id == item.id;
        })[0].value : false,
        onChange: this.onChange.bind(this),
        labelInline: item["value_" + this.props.lang]
      }));
    })));
  }

}

const mapStateToProps = state => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer //  catOptions: state.EditCategoryReducer

  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionFormMULTISELECT);