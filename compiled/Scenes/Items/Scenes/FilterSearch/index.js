/*
    ./client/components/App.jsx
*/
import React from 'react';
import Collapsible from 'react-collapsible';
import { Scrollbars } from 'react-custom-scrollbars';
import { geolocated } from 'react-geolocated';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'rheostat/initialize';
import CommandList from '../../../../Shared/CommandList.js';
import { Translator } from '../../../../Shared/index.js';
import QueryList from '../../../../Shared/QueryList.js';
import { BaseService } from '../../../../App/index.js';
import CategoryFilter from '../../../../Components/CategoryFilter/index.js';
import HistogramSlider from '../../../../Components/HistogramSlider/HistogramSlider.jsx';
import LIGHTBOX_ACTIONS from '../../../../Components/ImageLightbox/actions.js';
import CategoryOptionSearchMapper from '../../../Categories/Components/CategoryOptionTempMapper/CategoryOptionSearchMapper.jsx';
import SearchItemDTO from './../../../../Shared/DTO/Item/SearchItemDTO.js';
import queryString from 'query-string';

class FilterSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      value: [0, 5],
      showOverlay: false,
      data: {
        data: [],
        min: 0,
        max: 5,
        step: 1,
        distance: 5
      },
      dataDayHist: [],
      dataHistValue: undefined
    };
    this.state.search = new SearchItemDTO();
    this.state.zoom = 13;
    this.state.validation = [];
    this.state.latitude = 0;
    this.state.longitude = 0;
    this.state.result = [];
    this.state.radius = 1000;
    this.state.isLoading = true;
    this.state.categoryIsLoading = true;
    this.state.category = {};
    this.state.catOption = [];
    this.state.getCategoryOptionsTypeQuery = [];
    this.state.showAbovePin = [];
    const parsed = queryString.parse(location.search);
    this.state.category_id = parsed.category_id != undefined ? parsed.category_id : '_ROOT';
  }

  setDateLimitURL(event) {
    this.cleanUnsavedFilters();

    if (this.state.dataHistValue == undefined) {
      return;
    }

    const parsed = queryString.parse(location.search);
    const date = this.props.aggs.data_day_histogram != undefined ? this.props.aggs.data_day_histogram.buckets.length > 0 ? this.props.aggs.data_day_histogram.buckets.map((item, index) => {
      return {
        id: index,
        value: item.key_as_string,
        counter: item.doc_count
      };
    }) : [{
      id: -1,
      value: 0,
      counter: 0
    }] : [{
      id: -1,
      value: 0,
      counter: 0
    }];
    parsed.createdInterval = this.props.aggs.data_day_histogram.interval;
    parsed.startDate = date[this.state.dataHistValue[0]].value;
    parsed.endDate = date[this.state.dataHistValue[1]].value;
    const stringified = queryString.stringify(parsed, {
      sort: false
    });
    this.props.history.push('/search?' + stringified);
    this.cleanUnsavedFilters();
  }

  showSettings(event) {
    event.preventDefault();
  }

  resetDateLimitURL(event) {
    const parsed = queryString.parse(location.search);
    parsed.startDate = '';
    parsed.endDate = '';
    parsed.createdInterval = '';
    const stringified = queryString.stringify(parsed, {
      sort: false
    });
    this.props.history.push('/search?' + stringified);
    this.cleanUnsavedFilters();
  }

  componentDidMount() {
    this.props.getCategoryOptionsType().then(succ => {
      this.setState({
        getCategoryOptionsTypeQuery: succ.data
      });
    });
    const parsed = queryString.parse(location.search);
    this.setState({
      category_id: parsed.category_id != undefined ? parsed.category_id : '_ROOT'
    });

    if (this.state.category_id != '_ROOT') {
      this.props.getCategoryOptions(this.state.category_id).then(succ => {
        this.setState({
          catOptions: succ.data
        });
      });
    }
  }

  setCategory(category) {
    const parsed = queryString.parse(location.search);
    parsed.category_id = category.category.id;
    const stringified = queryString.stringify(parsed, {
      sort: false
    });
    this.setState({
      category_id: parsed.category_id
    });
    this.props.history.push('/search?' + stringified);
    this.props.showAbovePin(this.state.showAbovePin);
    this.setState({
      catOptions: [],
      showAbovePin: []
    });
    this.props.getCategoryOptions(parsed.category_id).then(succ => {
      this.setState({
        catOptions: succ.data
      });
    });
  }

  goToUser(event) {
    this.props.history.push('/user/' + event.target.getAttribute('data-tag'));
  }

  init() {
    this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
  }

  onLoading(isLoading) {
    this.setState({
      categoryIsLoading: isLoading
    });
  }

  showValue(item) {
    if (item.category_link.catOption.cat_opt.type == "SELECT") {
      return this.selectValue(item);
    } else if (item.category_link.catOption.cat_opt.type == "MULTI_SELECT") {
      return this.selectValue(item);
    } else if (item.category_link.catOption.cat_opt.type == "SINGLE") {
      return this.singleValue(item);
    } else if (item.category_link.catOption.cat_opt.type == "GEOCOORDINATE") {
      return "TO_DOOOOO";
    } else if (item.category_link.catOption.cat_opt.type == "BETWEEN") {
      return "TO_DOOOOO";
    } else if (item.category_link.catOption.cat_opt.type == "IMAGE") {
      return "TO_DOOOOO";
    } else {
      ;
      return item.value;
    }
  }

  setCurrentDateLimit(value) {
    this.setState({
      dataHistValue: value
    });
  }

  singleValue(item) {
    return item.value;
  }

  selectValue(item) {
    return item.cat_opt_temp["value_" + this.props.lang];
  }

  setTags(event) {
    this.cleanUnsavedFilters();
    let tag = event.currentTarget.getAttribute('data-tag');
    const parsed = queryString.parse(location.search);
    parsed.tag = parsed.tag == "" ? null : parsed.tag;
    parsed.tag = JSON.parse(parsed.tag);

    if (parsed.tag == null || parsed.tag.length == 0) {
      parsed.tag = [];
    }

    ;

    if (parsed.tag.filter(item => {
      return item == tag;
    }).length > 0) {
      parsed.tag = parsed.tag.filter(item => {
        return item != tag;
      });
    } else {
      parsed.tag.push(tag);
    }

    parsed.tag = JSON.stringify(parsed.tag);
    const stringified = queryString.stringify(parsed, {
      sort: false
    });
    this.props.history.push('/search?' + stringified);
  }

  onReset(catId) {
    const parsed = queryString.parse(location.search);
    parsed.catOptions = JSON.parse(parsed.catOptions);
    parsed.catOptions[catId] = [];
    parsed.catOptions = JSON.stringify(parsed.catOptions);
    const stringified = queryString.stringify(parsed, {
      sort: false
    });
    this.props.history.push('/search?' + stringified);
  }

  getCategories(event) {
    this.cleanUnsavedFilters();
    const parsed = queryString.parse(location.search);
    parsed.category_id = event.currentTarget.getAttribute('data-tag');
    const stringified = queryString.stringify(parsed, {
      sort: false
    });
    parsed.tag = [];
    this.props.history.push('/search?' + stringified);
    /* this.props.getCategories({ parent: event.currentTarget.getAttribute('data-tag') }).then(succ => {
         console.log(succ.data)
         this.setState({
             isLoading: false
         });
         succ.data = succ.data.map(item => {
             item.color = randomColor({
                 luminosity: 'light',
                    });
             this.props.colorSet(succ.data);
                    return item;
         })
                this.setState({
             categoriesList: succ.data
         })
     })*/
  }

  showAboveMap(event) {
    let item = event.target.getAttribute('data-key');
    console.log('click');

    if (this.state.showAbovePin.filter(el => {
      return el == item;
    }).length > 0) {
      this.state.showAbovePin = this.state.showAbovePin.filter(el => {
        return el != item;
      });
    } else {
      this.state.showAbovePin.push(item);
    }

    console.log(this.state.showAbovePin);
    this.setState({
      showAbovePin: this.state.showAbovePin
    });
    this.props.showAbovePin(this.state.showAbovePin);
  }

  onCatChage(id, newParams) {
    const parsed = queryString.parse(location.search);

    if (parsed.catOptions == undefined || parsed.catOptions == '') {
      parsed.catOptions = {};
    } else {
      parsed.catOptions = JSON.parse(parsed.catOptions);
    }

    parsed.catOptions[id] = newParams;
    parsed.catOptions = JSON.stringify(parsed.catOptions);
    const stringified = queryString.stringify(parsed, {
      sort: false
    });
    this.props.history.push('/search?' + stringified);
  }

  cleanUnsavedFilters() {
    this.setState({
      dataHistValue: undefined,
      showAbovePin: []
    });
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    const parsed = queryString.parse(location.search);
    parsed.tag = parsed.tag == "" ? null : parsed.tag;
    parsed.tag = JSON.parse(parsed.tag);
    const date = this.props.aggs.data_day_histogram != undefined ? this.props.aggs.data_day_histogram.buckets.length > 0 ? this.props.aggs.data_day_histogram.buckets.map((item, index) => {
      return {
        id: index,
        value: item.key_as_string,
        counter: item.doc_count
      };
    }) : [{
      id: -1,
      value: 0,
      counter: 0
    }] : [{
      id: -1,
      value: 0,
      counter: 0
    }];
    let value = [0, date.length > 1 ? date.length - 1 : 1];

    if (this.state.dataHistValue != undefined) {
      value = [this.state.dataHistValue[0], this.state.dataHistValue[1]];
    }

    return React.createElement(Scrollbars, {
      style: {
        width: '100%',
        height: '100%'
      }
    }, React.createElement("div", null, React.createElement("div", {
      className: "text-center mx-auto g-max-width-600 g-mb-20 col"
    }, React.createElement("h2", {
      className: "h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 "
    }, tran.translate('FILTER_ITEMS_HEADER'))), React.createElement(Collapsible, {
      open: true,
      trigger: this.state.category.category == undefined ? tran.translate('CATEGORY_CHOOSE_CATEGORY_LABEL') : tran.translate('CATEGORY_FILTER_LABEL') + ": " + this.state.category["category_" + this.props.lang]
    }, React.createElement(CategoryFilter, {
      onLoading: this.onLoading.bind(this),
      category_id: this.state.category_id,
      onClick: this.setCategory.bind(this),
      colorSet: this.props.colorSet,
      isLoading: this.props.isLoading,
      aggs: this.props.aggs
    })), this.state.categoryIsLoading == false ? React.createElement("div", {
      className: "list-group list-group-border-0 g-mt-10"
    }, React.createElement("div", {
      className: "d-flex justify-content-center text-center g-mb-5 g-mt-10"
    }, React.createElement("div", {
      className: "d-inline-block align-self-center g-width-50  g-height-1  g-bg-gray-light-v3"
    }), React.createElement("span", {
      className: "align-self-center text-uppercase  g-color-gray-dark-v2 mx-4 g-color-gray-dark-v4 g-letter-spacing-2   g-font-weight-600 g-font-size-12"
    }, tran.translate('CREATE_DATE_FILTERING')), React.createElement("div", {
      className: "d-inline-block align-self-center g-width-50 g-height-1 g-bg-gray-light-v3"
    })), React.createElement("div", {
      style: {
        display: 'flex'
      }
    }, date.length > 2 ? React.createElement("div", {
      className: "g-px-20 g-py-5",
      style: {
        width: '100%',
        borderRight: '1px solid #d9d9d9'
      }
    }, React.createElement(HistogramSlider, {
      colors: {
        in: '#D7D8D8',
        out: '#EEEEEE'
      },
      label: React.createElement("div", null, "Od : ", Math.round((Date.now() - Date.parse(date[value[0]].value)) / 3600000) + ' godzin temu', React.createElement("br", null), "Do : ", Math.round((Date.now() - Date.parse(date[value[1]].value)) / 3600000) + ' godzin temu'),
      min: date[0].id,
      max: date[date.length - 1].id,
      step: date[date.length - 1] - date[0] / 100,
      value: value,
      distance: date[date.length - 1] - date[0],
      data: date.map(item => {
        return item.counter * 1000;
      }),
      onChange: this.setCurrentDateLimit.bind(this)
    }), parsed.startDate != undefined && parsed.startDate != '' ? React.createElement("button", {
      onClick: this.resetDateLimitURL.bind(this),
      style: {
        float: 'right'
      },
      type: "button",
      className: "g-ml-10 btn btn-xs  g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase  btn-secondary "
    }, "RESET") : React.createElement("span", null), React.createElement("button", {
      style: {
        float: 'right'
      },
      onClick: this.setDateLimitURL.bind(this),
      type: "button",
      className: "btn btn-xs text-right g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn-secondary "
    }, "OK")) : React.createElement("span", null))) : React.createElement("span", null), this.state.categoryIsLoading == false && this.props.isLoading == false && this.state.catOptions != undefined && this.state.catOptions.length > 0 && this.state.getCategoryOptionsTypeQuery.length > 0 && this.props.aggs.data_day_histogram != undefined ? this.state.catOptions.filter(item => {
      return item.category_link[0].is_searchable != undefined ? item.category_link[0].is_searchable : item.is_searchable;
    }).sort((a, b) => {
      return Number(a.order) > Number(b.order) ? 1 : -1;
    }).map(item => {
      console.log(item);
      const parsed = queryString.parse(location.search);
      let filter = [];
      let name = '';
      let catOptionFilter = [];

      if (parsed.catOptions != undefined && parsed.catOptions != '' && JSON.parse(parsed.catOptions) != {}) {
        catOptionFilter = JSON.parse(parsed.catOptions);
      }

      Object.keys(catOptionFilter).forEach(key => {
        if (key.startsWith(item.id)) {
          name = key;
          return;
        }
      });

      if (catOptionFilter[name] != undefined && catOptionFilter[name] != '') {
        filter = catOptionFilter[name];
      }

      if (['SINGLE'].includes(item.cat_opt.type) && this.props.aggs[item.id] == undefined) {
        return React.createElement("span", null);
      }

      if (filter.length == 0 && ['SELECT', 'MULTI_SELECT'].includes(item.cat_opt.type)) {
        if (item.cat_opt_temp.filter(catTemp => {
          return this.props.aggs.select.buckets.filter(buc => {
            return buc.key == catTemp.id;
          }).length > 0;
        }).length < 2) {
          return React.createElement("span", null);
        }
      }

      let isClicked = this.state.showAbovePin.filter(el => {
        return el == item.id;
      }).length > 0 ? 'g-color-primary' : '';
      if (this.props.aggs) return React.createElement("div", {
        className: "g-mb-15"
      }, React.createElement("div", {
        className: "d-flex justify-content-center text-center  g-mb-5 g-mt-10 "
      }, React.createElement("div", {
        className: "d-inline-block align-self-center g-width-50  g-height-1  g-bg-gray-light-v3"
      }), React.createElement("span", {
        className: "align-self-center text-uppercase  g-color-gray-dark-v2 mx-4 g-color-gray-dark-v4 g-letter-spacing-2   g-font-weight-600 g-font-size-12"
      }, (item.category_link[0].can_above_pin != undefined ? item.category_link[0].can_above_pin : item.can_above_pin) == true ? React.createElement("span", {
        "data-key": item.id,
        onClick: this.showAboveMap.bind(this),
        className: " g-color-primary--hover  g-cursor-pointer g-font-weight-800 " + isClicked
      }, React.createElement("i", {
        className: "fa fa-map-marker g-font-size-15 g-pr-5",
        "aria-hidden": "true"
      }), item["name_" + this.props.lang]) : React.createElement("span", null, item["name_" + this.props.lang])), React.createElement("div", {
        className: "d-inline-block align-self-center g-width-50 g-height-1 g-bg-gray-light-v3"
      })), React.createElement(CategoryOptionSearchMapper, {
        onReset: this.onReset.bind(this),
        getCategoryOptionsTypeQuery: this.state.getCategoryOptionsTypeQuery,
        optionFilter: filter,
        onChange: this.onCatChage.bind(this),
        cat_option_id: item.id,
        aggs: this.props.aggs,
        catOption: item,
        catOptions: this.state.catOptions
      }));
    }) : React.createElement("span", null), this.props.aggs.tags && this.state.categoryIsLoading == false && this.props.isLoading == false ? React.createElement("div", {
      className: "list-group list-group-border-0 g-mb-40"
    }, React.createElement("div", {
      className: "d-flex justify-content-center text-center g-mb-5 g-mt-10"
    }, React.createElement("div", {
      className: "d-inline-block align-self-center g-width-50  g-height-1  g-bg-gray-light-v3"
    }), React.createElement("span", {
      className: "align-self-center text-uppercase  g-color-gray-dark-v2 mx-4 g-color-gray-dark-v4 g-letter-spacing-2   g-font-weight-600 g-font-size-12"
    }, tran.translate('TAGS_FILTER_LABEL')), React.createElement("div", {
      className: "d-inline-block align-self-center g-width-50 g-height-1 g-bg-gray-light-v3"
    })), this.props.aggs.tags.buckets.map(item => {
      if (parsed.tag && parsed.tag.filter(tag => {
        return tag == item.key;
      }).length == 1) {
        return React.createElement("span", {
          "data-tag": item.key,
          onClick: this.setTags.bind(this),
          style: {
            cursor: 'pointer !important'
          },
          className: "  list-group-item list-group-item-action  g-bg-gray-light-v2 g-color-gray-dark-v3 g-bg-gray justify-content-between u-link-v5 g-cursor-pointer g-py-2  g-pl-7--hover "
        }, React.createElement("span", {
          className: "g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-10  text-uppercase"
        }, item.key), React.createElement("span", {
          className: "u-label g-rounded-20 g-px-15 g-bg-bluegray g-font-size-10  g-mr-10 "
        }, this.props.isLoading == true ? React.createElement("span", null, React.createElement("i", {
          className: "fa fa-spinner fa-spin"
        })) : item.doc_count));
      }

      return React.createElement("span", {
        "data-tag": item.key,
        onClick: this.setTags.bind(this),
        style: {
          cursor: 'pointer !important'
        },
        className: "  list-group-item list-group-item-action justify-content-between u-link-v5 g-cursor-pointer g-py-2   g-pl-7--hover "
      }, React.createElement("span", {
        className: "g-line-height-1 g-letter-spacing-1 g-font-weight-500 g-font-size-10  text-uppercase"
      }, item.key), React.createElement("span", {
        className: "u-label g-rounded-20 g-px-15 g-bg-bluegray g-font-size-10 g-mr-10 "
      }, this.props.isLoading == true ? React.createElement("span", null, React.createElement("i", {
        className: "fa fa-spinner fa-spin"
      })) : item.doc_count));
    })) : React.createElement("span", null)));
  }

}

const mapStateToProps = state => {
  //console.log(state);
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    auth: state.AuthReducer,
    loader: state.LoaderReducer,
    offerItem: state.NewOfferItemReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openLightbox: (activeImage, images) => {
      return dispatch({
        type: LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
        dto: {
          images: images,
          activeImage: activeImage
        }
      });
    },
    getCategories: dto => {
      return dispatch(new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_HIERARCHY, dto));
    },
    getItems: dto => {
      return dispatch(new BaseService().queryThunt(QueryList.Item.SEARCH_ITEM, dto));
    },
    createNewItem: dto => {
      return dispatch(new BaseService().commandThunt(CommandList.Item.NEW_ITEM, dto));
    },
    getUserImages: dto => {
      return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null));
    },
    getCategoryOptions: category_id => {
      return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_CATEGORY_OPTION, {
        id: category_id
      }));
    },
    getCategoryOptionsType: id => {
      return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_OPTIONS_TYPE, {}));
    }
  };
};

export default withRouter(geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(connect(mapStateToProps, mapDispatchToProps)(FilterSearch)));
//# sourceMappingURL=index.js.map