import React from 'react';
import { connect } from 'react-redux';
import { Translator } from './../../../../../Shared/index.js';

class CategoryOptionSearchMULTISELECT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.validation = [];
    this.state.optionFilter = this.props.optionFilter;
  }

  onChange(event) {
    this.setState({
      id: event.target.value
    });
  }

  onClick(event) {
    let optionId = event.currentTarget.getAttribute('data-tag');

    if (this.state.optionFilter.filter(item => {
      return item.id == optionId;
    }).length > 0) {
      let items = this.state.optionFilter.filter(item => {
        return item.id != optionId;
      });
      this.props.onChange(this.props.catOptionId + "_MULTI_SELECT", items);
    } else {
      this.state.optionFilter.push({
        id: optionId
      });
      this.props.onChange(this.props.catOptionId + "_MULTI_SELECT", this.state.optionFilter);
    }
  }

  getDropDownValues() {//     return [{ id: '', value: '', type: "" }, ...this.props.catOption.cat_opt_temp.map(item => {
    //       return { id: item.id, value: item["value_" + this.props.lang], type: item["value_" + this.props.lang] }
    //    })];
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang); //     const link = this.props.catOption.category_link[0];

    let catOption = this.props.catOptions.filter(item => {
      return item.id == this.props.catOptionId;
    })[0];
    return React.createElement("div", {
      className: "list-group list-group-border-0"
    }, catOption.cat_opt_temp.map(item => {
      let bucket = this.props.aggs.select.buckets.filter(buck => {
        return buck.key == item.id;
      })[0] ? this.props.aggs.select.buckets.filter(buck => {
        return buck.key == item.id;
      })[0].doc_count : 0;

      if (this.state.optionFilter.filter(filt => {
        return filt.id == item.id;
      }).length > 0) {
        return React.createElement("span", {
          "data-tag": item.id,
          onClick: this.onClick.bind(this),
          className: "list-group-item  g-cursor-pointer list-group-item-action justify-content-between u-link-v5 g-py-2  g-bg-gray-light-v2 g-color-gray-dark-v3  g-pl-7--hover"
        }, React.createElement("span", {
          className: "g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-10 g-pl-20  text-uppercase"
        }, React.createElement("div", {
          className: "g-absolute-centered--y g-left-10 g-font-size-14 g-font-weight-100 g-color-gray-dark-v3"
        }, React.createElement("i", {
          className: "fa fa-check-square"
        })), item["value_" + this.props.lang]), React.createElement("span", {
          className: "u-label g-rounded-20 g-px-15 g-bg-bluegray g-mr-10  g-font-size-10 "
        }, bucket));
      }

      return bucket > 0 ? React.createElement("span", {
        "data-tag": item.id,
        onClick: this.onClick.bind(this),
        className: "list-group-item  g-cursor-pointer list-group-item-action justify-content-between u-link-v5 g-py-2   g-pl-7--hover"
      }, React.createElement("span", {
        className: "g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-10 g-pl-20  text-uppercase"
      }, React.createElement("div", {
        className: "g-absolute-centered--y g-left-10 g-font-size-14 g-font-weight-100 g-color-gray-light-v2"
      }, React.createElement("i", {
        className: "fa fa-square-o"
      })), item["value_" + this.props.lang]), React.createElement("span", {
        className: "u-label g-rounded-20 g-px-15 g-bg-bluegray g-mr-10  g-font-size-10 "
      }, bucket)) : React.createElement("span", null);
    }));
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionSearchMULTISELECT);