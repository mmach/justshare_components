/*
    ./client/components/App.js
*/
import React from 'react';
import { connect } from 'react-redux';
import QueryList from '../../../../Shared/QueryList.js';
import CategoryOptionFormGEO from '../CategoryOptionTypes/FORM/CategoryOptionFormGEO.jsx';
import CategoryOptionFormIMAGE from '../CategoryOptionTypes/FORM/CategoryOptionFormIMAGE.jsx';
import CategoryOptionSearchMULTISELECT from '../CategoryOptionTypes/SEARCH/CategoryOptionSearchMULTISELECT.jsx';
import CategoryOptionSearchSELECT from '../CategoryOptionTypes/SEARCH/CategoryOptionSearchSELECT.jsx';
import CategoryOptionSearchSINGLE from '../CategoryOptionTypes/SEARCH/CategoryOptionSearchSINGLE.jsx';
import { Translator } from './../../../../Shared/index.js';
import { BaseService } from './../../../../App/index.js';

class CategoryOptionSearchMapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.getCategoryOptionsTypeQuery = this.props.getCategoryOptionsTypeQuery;
  }

  getDropDownValues() {
    return this.state.getCategoryOptionsTypeQuery.map(item => {
      return {
        id: item.id,
        value: item.name,
        type: item.type
      };
    });
  }

  checkType(catType) {
    return this.state.getCategoryOptionsTypeQuery.filter(item => {
      return item.type == catType && item.id == this.props.catOption.cot_id;
    });
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    return React.createElement("div", null, this.checkType('SELECT').length > 0 ? React.createElement("div", null, React.createElement(CategoryOptionSearchSELECT, {
      aggs: this.props.aggs,
      optionFilter: this.props.optionFilter,
      catOptionId: this.props.cat_option_id,
      onChange: this.props.onChange,
      catOptions: this.props.catOptions,
      catOptionsTemp: this.checkType('SELECT')[0]
    })) : this.checkType('MULTI_SELECT').length > 0 ? React.createElement("div", null, React.createElement(CategoryOptionSearchMULTISELECT, {
      aggs: this.props.aggs,
      optionFilter: this.props.optionFilter,
      catOptionId: this.props.cat_option_id,
      onChange: this.props.onChange,
      catOptions: this.props.catOptions,
      catOptionsTemp: this.checkType('MULTI_SELECT')[0]
    })) : this.checkType('SINGLE').length > 0 ? React.createElement("div", null, React.createElement(CategoryOptionSearchSINGLE, {
      onReset: this.props.onReset,
      aggs: this.props.aggs,
      optionFilter: this.props.optionFilter,
      catOptionId: this.props.cat_option_id,
      onChange: this.props.onChange,
      catOptions: this.props.catOptions,
      catOptionsTemp: this.checkType('SINGLE')[0]
    })) : this.checkType('IMAGES').length > 0 ? React.createElement("div", null, React.createElement(CategoryOptionFormIMAGE, {
      optionValue: this.props.optionValue,
      onChange: this.props.onChange,
      catOptionsTemp: this.checkType('IMAGES')[0],
      category_id: this.props.category_id,
      catOption: this.props.catOption
    })) : this.checkType('GEOCOORDINATE').length > 0 ? React.createElement("div", null, React.createElement(CategoryOptionFormGEO, {
      optionValue: this.props.optionValue,
      categoryIcon: this.props.categoryIcon,
      onChange: this.props.onChange,
      catOptionsTemp: this.checkType('GEOCOORDINATE')[0],
      category_id: this.props.category_id,
      catOption: this.props.catOption
    })) : //        this.checkType('SINGLE').length > 0 ? <span><CategoryOptionSINGLE catOptionsTemp={this.checkType('SINGLE')[0]} category_id={this.props.category_id} catOption={this.props.catOptions}></CategoryOptionSINGLE></span> :
    //           this.checkType('BETWEEN').length > 0 ? <span><CategoryOptionBETWEEN catOptionsTemp={this.checkType('BETWEEN')[0]} category_id={this.props.category_id} catOption={this.props.catOptions}></CategoryOptionBETWEEN></span> :
    React.createElement("span", null));
  }

}

const mapStateToProps = state => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer // catOptions: state.EditCategoryReducer

  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategoryOptionsType: id => {
      return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, {}));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionSearchMapper);