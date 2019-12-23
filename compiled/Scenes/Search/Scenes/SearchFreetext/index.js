/*
    ./client/components/App.jsx
*/
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input } from 'reactstrap';
import { Translator } from './../../../../Shared/index.js';

class SearchFreetext extends React.Component {
  constructor() {
    super();
    this.state = {
      category_id: "",
      query: "",
      tag: ""
    };
    this.state.validation = [];
  }

  refreshValidation() {
    if (this.state.toRefresh) {
      setTimeout(() => {
        this.validation();
      });
    }
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    this.refreshValidation();
    return React.createElement("div", {
      className: "container  g-flex-centered  g-z-index-1 g-py-40"
    }, React.createElement("div", {
      className: "row  g-flex-centered align-self-center"
    }, React.createElement("div", {
      className: " g-width-780 align-self-center g-pa-5"
    }, React.createElement("div", {
      className: "g-bg-white-opacity-0_8 g-rounded-0   g-pa-10 g-pa-10--md  "
    }, React.createElement("div", {
      className: "g-brd-around g-brd-gray-light-v1  g-pa-50 g-pa-30--md text-center"
    }, React.createElement("h3", {
      className: "h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5"
    }, tran.translate('SEARCH_HOMEPAGE_HEADER')), React.createElement("p", {
      className: "g-line-height-1_8 g-letter-spacing-1  g-mb-20"
    }, tran.translate('SEARCH_HOMEPAGE_TEXT')), React.createElement("form", null, React.createElement("div", {
      className: " g-pa-10 form-group g-ma-20 g-mb-20--md"
    }, React.createElement(Input, {
      className: "form-control h-100 g-pa-15  form-control rounded-0 form-control",
      type: "search",
      value: this.props.value,
      onChange: event => {
        this.state.query = event.target.value;
        this.setState({
          query: this.state.query
        });
      },
      placeholder: phTrans.translate('SEARCH_HOMEPAGE_INPUT_PLACEHOLDER')
    })), React.createElement(Link, {
      to: `/search?type=type&tag=${this.state.tag}&category_id=${this.state.category_id}&q=${encodeURI(this.state.query)}&rad=3km`,
      className: "g-letter-spacing-1 btn btn-md  text-uppercase u-btn-primary g-font-weight-700 g-font-size-12 g-brd-none rounded-0 g-py-12 g-px-15"
    }, tran.translate('SEARCH_BUTTON_LABEL'))))))));
  }

}

const mapStateToProps = state => {
  //console.log(state);
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer
  };
};

const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFreetext);
//# sourceMappingURL=index.js.map