/*
    ./client/components/App.jsx
*/
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import 'react-leaflet-markercluster/dist/styles.min.css'; // sass

import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CommandList from '../../../../Shared/CommandList.js';
import { Translator } from '../../../../Shared/index.js';
import QueryList from '../../../../Shared/QueryList.js';
import { BaseService } from '../../../../App/index.js';
import LIGHTBOX_ACTIONS from '../../../../Components/ImageLightbox/actions.js';
import BodyLoader from '../../../../Components/Loader/BodyLoader/index.jsx';
import MODAL_ACTIONS from '../../../../Components/WrapperAuth/actions.js';
import SearchItemDTO from './../../../../Shared/DTO/Item/SearchItemDTO.js';

const queryString = require('query-string');

const SearchMap = Loadable({
  loader: () => import('./../SearchMap/index.jsx'),

  loading() {
    return React.createElement(BodyLoader, {
      zIndex: 3,
      height: "60vh",
      size: "100px"
    });
  }

});
const FilterSearch = Loadable({
  loader: () => import('./../FilterSearch/index.jsx'),

  loading() {
    return React.createElement(BodyLoader, {
      zIndex: 3,
      height: "85vh",
      size: "100px"
    });
  }

});
const ItemsSlider = Loadable({
  loader: () => import('../../Components/ItemsSlider/index.jsx'),

  loading() {
    return React.createElement(BodyLoader, {
      zIndex: 3,
      height: "25vh",
      size: "100px"
    });
  }

});

class ItemSearch extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.state.search = new SearchItemDTO();
    this.state.zoom = 13;
    this.state.validation = [];
    this.state.latitude = 0;
    this.state.longitude = 0;
    this.state.result = [];
    this.state.radius = 1000;
    this.state.aggs = {};
    this.state.categories = [];
    this.state.isLoading = true;
    this.state.positionOn = false;
    this.state.catAbovePin = [];
    this.state.currentElement = undefined;
    this.state.currentPosition = undefined;
    this.state.positionCenter = [];
    this.state.currentIndex = undefined;
    this.refSlider = {};
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search != nextProps.location.search) {
      this.loadFunc(this.nextProps);
    }
  }

  componentDidMount() {
    this.loadFunc(this.props);
  }

  showAbovePin(catOptions) {
    this.setState({
      catAbovePin: catOptions
    });
  }

  loadFunc(props) {
    this.setState({
      isLoading: true
    });
    const parsed = queryString.parse(location.search);
    this.state.search.distance = parsed.rad ? parsed.rad : '1km';

    if (this.state.search.distance.indexOf('m') > 0) {
      this.state.radius = Number(this.state.search.distance.split('m')[0]);
    }

    if (this.state.search.distance.indexOf('km') > 0) {
      this.state.radius = Number(this.state.search.distance.split('km')[0]) * 1000;
    }

    this.setState({
      radius: this.state.radius
    });

    if (this.state.radius > 6000) {
      this.state.zoom = 12;
    }

    if (this.state.radius > 9000) {
      this.state.zoom = 11;
    }

    if (this.state.radius > 20000) {
      this.state.zoom = 10;
    }

    this.setState({
      zoom: this.state.zoom
    });
    this.state.search.lat = parsed.lat ? parsed.lat : this.props.auth.user.latitude;
    this.state.search.lon = parsed.lon ? parsed.lon : this.props.auth.user.longitude;
    this.state.search.freetext = parsed.q;
    this.state.search.category_id = parsed.category_id;
    this.state.search.tag = parsed.tag != "" ? JSON.parse(parsed.tag) : undefined;
    this.state.search.startDate = parsed.startDate != undefined && parsed.startDate != '' ? parsed.startDate : undefined;
    this.state.search.endDate = parsed.endDate != undefined && parsed.endDate != '' ? parsed.endDate : undefined;
    this.state.search.createdInterval = parsed.createdInterval != undefined && parsed.createdInterval != '' ? parsed.createdInterval : undefined;
    this.state.search.catOptions = parsed.catOptions != undefined && parsed.catOptions != '' && JSON.parse(parsed.catOptions) != {} ? JSON.parse(parsed.catOptions) : undefined;
    this.setState({
      search: this.state.search,
      currentPosition: [this.state.search.lat, this.state.search.lon],
      positionCenter: [this.state.search.lat, this.state.search.lon]
    });
    this.props.getItems(this.state.search).then(succ => {
      this.setState({
        isLoading: false
      });
      console.log(succ.data.items);
      let result = JSON.parse(succ.data.items);
      console.log(result);
      this.setState({
        aggs: succ.data.aggs,
        result: result
      });
    });
  }

  setColor(categories) {
    this.setState({
      categories: categories
    });
  }

  init() {
    this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
  }

  setCurrentElement(element) {
    this.setState({
      currentElement: element,
      currentPosition: [element.latitude, element.longitude],
      zoom: 18
    });
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang); //</Marker>

    return React.createElement("div", {
      id: "outer-container",
      style: {
        position: "relative",
        overflowX: 'hidden'
      }
    }, " ", React.createElement(Menu, {
      isOpen: true,
      styles: {
        bmBurgerButton: {
          fontSize: '17px',
          left: '18px'
        }
      },
      width: '25%',
      customBurgerIcon: React.createElement("span", null, React.createElement("i", {
        className: "fa fa-filter",
        style: {
          fontSize: '20px'
        }
      }), React.createElement("br", null), React.createElement("span", {
        className: "g-line-height-1_0"
      }, this.state.result.length))
    }, React.createElement(FilterSearch, {
      aggs: this.state.aggs,
      colorSet: this.setColor.bind(this),
      isLoading: this.state.isLoading,
      showAbovePin: this.showAbovePin.bind(this)
    })), React.createElement("div", {
      id: "page-wrap"
    }, this.props.loader.BODY_PROGRESS < 100 || this.state.isLoading ? React.createElement(BodyLoader, {
      zIndex: 3,
      height: "85vh",
      size: "100px",
      progress: this.props.loader.BODY_PROGRESS
    }) : React.createElement("div", null, React.createElement(SearchMap, {
      distance: this.state.search.distance,
      items: this.state.result,
      setCurrentElement: this.setCurrentElement.bind(this),
      currentPosition: this.state.currentPosition,
      positionCenter: this.state.positionCenter,
      currentElement: this.state.currentElement,
      catAbovePin: this.state.catAbovePin,
      categories: this.state.categories
    }), React.createElement(ItemsSlider, {
      elementsNumber: 5,
      items: this.state.result,
      currentElement: this.state.currentElement,
      setCurrentElement: this.setCurrentElement.bind(this)
    }))));
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
    openLightbox: (activeImage, images) => {
      return dispatch({
        type: LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
        dto: {
          images: images,
          activeImage: activeImage
        }
      });
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
    openUserModal: (open, action, item) => {
      dispatch({
        type: MODAL_ACTIONS.OPEN_MODAL,
        dto: {
          open: open,
          action: action,
          param: item
        }
      });
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemSearch));
//# sourceMappingURL=index.js.map