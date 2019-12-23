/*
    ./client/components/App.jsx
*/
import randomColor from 'randomcolor'; // import the script

import React from 'react';
import { connect } from 'react-redux';
import QueryList from '../../Shared/QueryList.js';
import BodyLoader from '../Loader/BodyLoader/index.jsx';
import { Translator } from './../../Shared/index.js';
import BaseService from './../../App/Architecture/baseServices.js';

class CategoryFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.categoriesList = [];
    this.state.isLoading = true;

    if (this.props.onLoading != undefined) {
      this.props.onLoading(true);
    }
  }

  showSettings(event) {
    event.preventDefault();
  }

  componentDidMount() {
    this.props.getCategories({
      parent: this.props.category_id ? this.props.category_id : '_ROOT'
    }).then(succ => {
      succ.data = succ.data.map(item => {
        item.color = randomColor({
          luminosity: 'light'
        });
        return item;
      });
      this.props.colorSet(succ.data);
      this.setState({
        isLoading: false,
        categoriesList: succ.data
      });

      if (this.props.onLoading != undefined) {
        this.props.onLoading(false);
      }
    });
  }

  goToUser(event) {
    this.props.history.push('/user/' + event.target.getAttribute('data-tag'));
  }

  init() {
    this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
  }

  getCategories(event) {
    this.setState({
      isLoading: true
    });

    if (this.props.onLoading != undefined) {
      this.props.onLoading(true);
    }

    let cat_id = event.currentTarget.getAttribute('data-tag');
    this.props.getCategories({
      parent: cat_id
    }).then(succ => {
      this.setState({
        isLoading: false
      });

      if (this.props.onLoading != undefined) {
        this.props.onLoading(false);
      }

      succ.data = succ.data.map(item => {
        item.color = randomColor({
          luminosity: 'light'
        });
        this.props.colorSet(succ.data);
        return item;
      });
      let category = succ.data[0].category_parent[0];

      if (cat_id != category.id) {
        this.props.onClick({
          category: succ.data[0]
        });
      } else {
        this.props.onClick({
          category: category
        });
      }

      this.setState({
        categoriesList: succ.data
      });
    });
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);

    if (this.state.isLoading) {
      return React.createElement(BodyLoader, {
        zIndex: 3,
        height: "600px",
        size: "100px",
        progress: this.props.loader.BODY_PROGRESS
      });
    }

    return React.createElement("div", {
      className: "list-group list-group-border-0 g-mb-10"
    }, this.state.categoriesList[0].category_parent.map(item => {
      if (item.category == '_ROOT') {
        return React.createElement("span", null);
      }

      return React.createElement("span", {
        "data-tag": (item.category_parent != undefined ? item.category_parent.length : 0) > 0 ? item.category_parent[0].id : '_ROOT',
        onClick: this.getCategories.bind(this),
        className: " list-group-item list-group-item-action justify-content-between u-link-v5 g-cursor-pointer    g-pl-7--hover "
      }, React.createElement("span", {
        className: "g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"
      }, React.createElement("span", {
        className: "  g-font-size-15 g-font-weight-600 g-pr-10 ",
        "aria-hidden": "true"
      }, "..."), item.category_parent[0]["category_" + this.props.lang]));
    }), this.state.categoriesList[0].category_parent.map(item => {
      if (item.category == '_ROOT') {
        return React.createElement("span", null);
      }

      return React.createElement("span", {
        "data-tag": item.id,
        onClick: this.getCategories.bind(this),
        className: " list-group-item list-group-item-action justify-content-between u-link-v5 g-cursor-pointer    g-pl-7--hover "
      }, React.createElement("span", {
        className: "g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"
      }, React.createElement("span", {
        className: "  g-font-size-15 g-font-weight-600 g-pr-10 ",
        "aria-hidden": "true"
      }, "."), item["category_" + this.props.lang]));
    }), this.state.categoriesList.filter(item => {
      return item.category_children.length > 0;
    }).map(item => {
      let counter = 0;

      if (this.props.aggs.categories != undefined) {
        let result = this.props.aggs.categories.buckets.filter(cat => {
          return cat.key == item.id;
        });

        if (result.length == 1) {
          counter = result[0].doc_count;
        }
      }

      return React.createElement("span", {
        "data-tag": item.id,
        onClick: this.getCategories.bind(this),
        className: " list-group-item list-group-item-action justify-content-between u-link-v5 g-cursor-pointer    g-pl-7--hover "
      }, React.createElement("span", {
        className: "g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase"
      }, " ", React.createElement("i", {
        className: "fa fa-plus g-font-size-8 g-font-weight-100 g-pr-10 ",
        "aria-hidden": "true"
      }), item["category_" + this.props.lang]), counter > -1 ? React.createElement("span", {
        className: "u-label g-rounded-20 g-px-15  g-mr-10 ",
        style: {
          backgroundColor: item.color
        }
      }, this.props.isLoading == true ? React.createElement("span", null, React.createElement("i", {
        className: "fa fa-spinner fa-spin"
      })) : React.createElement("span", null, counter)) : React.createElement("span", null));
    }), this.state.categoriesList.filter(item => {
      return item.category_children.length == 0;
    }).map(item => {
      let counter = 0;

      if (this.props.aggs.categories != undefined) {
        let result = this.props.aggs.categories.buckets.filter(cat => {
          return cat.key == item.id;
        });

        if (result.length == 1) {
          counter = result[0].doc_count;
        }
      }

      return React.createElement("span", {
        "data-tag": item.id,
        style: {
          color: '#333'
        },
        onClick: this.getCategories.bind(this),
        className: " list-group-item list-group-item-action justify-content-between u-link-v5 g-cursor-pointer    g-pl-7--hover "
      }, React.createElement("span", {
        className: "g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-12  text-uppercase g-pr-5"
      }, item["category_" + this.props.lang]), counter > -1 ? React.createElement("span", {
        className: "u-label g-rounded-20 g-px-15  g-mr-10 ",
        style: {
          backgroundColor: item.color
        }
      }, this.props.isLoading == true ? React.createElement("span", null, React.createElement("i", {
        className: "fa fa-spinner fa-spin"
      })) : React.createElement("span", null, counter)) : React.createElement("span", null));
    }));
  }

}

const mapStateToProps = state => {
  //console.log(state);
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    auth: state.AuthReducer,
    loader: state.LoaderReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: dto => {
      return dispatch(new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_HIERARCHY, dto));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);
//# sourceMappingURL=index.js.map