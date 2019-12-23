/*
    ./client/components/App.jsx
*/
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { geolocated } from 'react-geolocated';
import { Circle, Map, Marker, TileLayer, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css'; // sass

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row } from 'reactstrap';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ellipsis from 'text-ellipsis';
import CommandList from '../../../../Shared/CommandList.js';
import { Translator } from '../../../../Shared/index.js';
import QueryList from '../../../../Shared/QueryList.js';
import { BaseService } from '../../../../App/index.js';
import WEB_CONFIG from '../../../../config.js';
import LIGHTBOX_ACTIONS from '../../../../Components/ImageLightbox/actions.js';
import MODAL_ACTIONS from '../../../../Components/WrapperAuth/actions.js';
import SearchItemDTO from './../../../../Shared/DTO/Item/SearchItemDTO.js';
import radiusIcon from './../../../../assets/img/radius.png';

const queryString = require('query-string'); //import { Map } from 'react-leaflet';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class SearchMap extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.state.search = new SearchItemDTO();
    this.state.zoom = 13;
    this.state.validation = [];
    this.state.positionOn = false;
    this.refSlider = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentElement != undefined && this.props.currentElement == undefined) {
      this.setState({
        zoom: 16
      });
    }

    if (this.props.currentElement != undefined && this.props.currentElement.id != nextProps.currentElement.id) {
      this.setState({
        zoom: 16
      });
    }
  }

  init() {
    this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
  }

  showValue(item) {
    console.log(item);

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

  singleValue(item) {
    return item.value;
  }

  selectValue(item) {
    return item.cat_opt_temp["value_" + this.props.lang];
  }

  zoomIn() {
    const parsed = queryString.parse(location.search);
    let rad = '';

    if (parsed.rad.indexOf('m') > 0 && parsed.rad.indexOf('km') < 1) {
      rad = Number(this.props.distance.split('m')[0]) + 100;
      rad = rad + 'm';
    }

    if (parsed.rad.indexOf('km') > 0) {
      rad = Number(this.props.distance.split('km')[0]) + 1;
      rad = rad + 'km';
    }

    parsed.rad = rad;
    const stringified = queryString.stringify(parsed, {
      sort: false
    });
    this.props.history.push('/search?' + stringified);
  }

  zoomOut() {
    const parsed = queryString.parse(location.search);
    let rad = '';

    if (parsed.rad.indexOf('m') > 0 && parsed.rad.indexOf('km') < 1) {
      rad = Number(this.props.distance.split('m')[0]) - 100;

      if (rad == 0) {
        rad = 100;
      }

      rad = rad + 'm';
    }

    if (parsed.rad.indexOf('km') > 0) {
      rad = Number(this.props.distance.split('km')[0]) - 1;

      if (rad == 0) {
        rad = '900m';
      } else {
        rad = rad + 'km';
      }
    }

    parsed.rad = rad;
    const stringified = queryString.stringify(parsed, {
      sort: false
    });
    this.props.history.push('/search?' + stringified);
  }

  setPositionOn() {
    this.setState({
      positionOn: !this.state.positionOn
    });
  }

  pinClick(event) {
    let id = event;
    let result = this.props.items.forEach((element, index) => {
      if (element.id == id) {
        this.props.setCurrentElement(element);
        this.refSlider.slickGoTo(index);
      }
    });
  }

  setPosition(event) {
    if (this.state.positionOn == false) {
      return;
    }

    const parsed = queryString.parse(location.search);
    parsed.lon = event.latlng.lng;
    parsed.lat = event.latlng.lat;
    const stringified = queryString.stringify(parsed, {
      sort: false
    });
    this.setState({
      positionOn: false
    });
    this.props.history.push('/search?' + stringified);
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    let radius = 0;

    if (this.props.distance.indexOf('m') > 0) {
      radius = Number(this.props.distance.split('m')[0]);
    }

    if (this.props.distance.indexOf('km') > 0) {
      radius = Number(this.props.distance.split('km')[0]) * 1000;
    }

    let latlng = [0, 0];

    if (this.props.auth && this.props.auth.user) {
      if (this.state.setLonLat == 1) {
        latlng = [this.state.latitude, this.state.longitude];
      } else if (this.props.positionCenter[0] != undefined && this.props.positionCenter[1] != undefined) {
        latlng = this.props.positionCenter;
      } else {
        latlng = [this.props.auth.user.latitude, this.props.auth.user.longitude];
      }
    } else if (this.state.latitude && this.state.longitude) {
      latlng = [this.state.latitude, this.state.longitude];
    }

    const createClusterCustomIcon = function (cluster) {
      return L.divIcon({
        html: `
                <svg viewBox="0 0 80 80" width="40" height="70" style="overflow: visible;">
                    <defs>
                        <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_5_blur">
                            <feGaussianBlur stdDeviation="4.7" in="SourceGraphic"/>
                        </filter>
                        <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_9_blur">
                            <feGaussianBlur stdDeviation="3.9" in="SourceGraphic"/>
                        </filter>
                    </defs>
                    <style>
                        .small { font: italic 13px sans-serif; }
                        .heavy { font: bold 30px sans-serif; text-align:center }
                    
                        /* Note that the color of the text is set with the    *
                        * fill property, the color property is for HTML only */
                        .Rrrrr { font: italic 40px serif; fill: red; }
                  </style>
                
                    <g>
               
                    <ellipse filter="url(#svg_5_blur)" opacity="0.5" ry="11" rx="27.5" id="svg_5" cy="74" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#a07d7d"/>
                    <ellipse filter="url(#svg_9_blur)" opacity="0.3" ry="8" rx="9" id="svg_9" cy="74" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#665151"/>
                    <ellipse stroke="${'#666'}" ry="33" rx="34" id="svg_2" cy="34.9375" cx="35.5" stroke-width="1.5" fill="${'#666'}"/>
                    <ellipse stroke="${'#666'}" ry="25.235295" rx="26" id="svg_3" cy="35.702206" cx="35.5" fill-opacity="null" stroke-width="1.5" fill="#fff"/>
                    <text font-size="11" stroke-width="0" stroke="#000" alignment-baseline="middle" text-anchor="middle" class="heavy" x="35" y="38">${cluster.getChildCount()}</text>
                    </g>
                </svg>`,
        className: 'marker-cluster-custom',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        // point of the icon which will correspond to marker's location
        popupAnchor: [0, -35],
        shadowUrl: null,
        shadowSize: null,
        shadowAnchor: null
      });
    };

    let currentItem = React.createElement("span", null);

    if (this.props.currentElement) {
      var png = require(`./../../../../assets/markers/${this.props.currentElement.category.icon}.png`);

      let currentIcon = L.divIcon({
        html: `<div class=" text-center" style="z-index:10000">
                            
                            
                        <svg class=" pin_hover" viewBox="0 0 55 55" width="40" height="40" style="overflow: visible;margin-bottom:-45px">
                            <defs>
                                <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_5_blur">
                                    <feGaussianBlur stdDeviation="4.7" in="SourceGraphic"/>
                                </filter>
                                <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_9_blur">
                                    <feGaussianBlur stdDeviation="3.9" in="SourceGraphic"/>
                                </filter>
                            </defs>
                            <style>
                                .small { font: italic 13px sans-serif; }
                                .heavyText {font: 500 30px sans-serif; text-align:center }
                            
                                /* Note that the color of the text is set with the    *
                                * fill property, the color property is for HTML only */
                                .Rrrrr { font: italic 40px serif; fill: red; }
                          </style>
                        
                            <g>
                            <rect stroke="" transform="rotate(45 34.75000000000003,52.249999999999986) " id="svg_7" height="38.606601" width="42" y="32.9467" x="13.75" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill=""/>
                            <ellipse stroke="" ry="33" rx="34" id="svg_2" cy="34.9375" cx="35.5" stroke-width="1.5" fill=""/>
                            <ellipse stroke="" ry="25.235295" rx="26" id="svg_3" cy="35.702206" cx="35.5" fill-opacity="null" stroke-width="1.5" fill="#fff"/>
                            <image xlink:href="${png}" id="svg_4" height="32" width="32" y="18" x="20"/>
                           </g>
                        </svg>
                        <svg class="" viewBox="0 0 55 55" width="40" height="40" style="overflow: visible;">
                            <defs>
                                <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_5_blur">
                                    <feGaussianBlur stdDeviation="4.7" in="SourceGraphic"/>
                                </filter>
                                <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_9_blur">
                                    <feGaussianBlur stdDeviation="3.9" in="SourceGraphic"/>
                                </filter>
                            </defs>
                            <style>
                                .small { font: italic 13px sans-serif; }
                                .heavyText {font: 500 30px sans-serif; text-align:center }
                            
                                /* Note that the color of the text is set with the    *
                                * fill property, the color property is for HTML only */
                                .Rrrrr { font: italic 40px serif; fill: red; }
                          </style>
                        
                            <g>
                             <ellipse filter="url(#svg_5_blur)" opacity="0.4" ry="11" rx="27.5" id="svg_5" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#a07d7d"/>
                            <ellipse filter="url(#svg_9_blur)" opacity="0.3" ry="8" rx="9" id="svg_9" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#665151"/>
                        
                           </g>
                        </svg>
                        </div>`,
        iconSize: [10, 18],
        iconAnchor: [24, 78],
        // point of the icon which will correspond to marker's location
        popupAnchor: [-5, -12],
        className: 'marker-cluster-custom'
      });
      currentItem = React.createElement(Marker, {
        openPopup: true,
        position: [this.props.currentElement.latitude, this.props.currentElement.longitude],
        icon: currentIcon
      });
    } //</Marker>


    let map = React.createElement(Map, {
      zoomControl: false,
      onclick: this.setPosition.bind(this),
      minZoom: 6,
      className: "size-map-60vh",
      center: this.props.currentPosition != undefined ? this.props.currentPosition : latlng,
      zoom: this.state.zoom,
      ref: ref => {
        this.map = ref;
      }
    }, React.createElement(Circle, {
      opacity: 0.5,
      center: latlng,
      fillColor: "#666",
      color: "#e74c3c",
      fillOpacity: 0.1,
      radius: radius,
      strokeWidth: 1
    }), React.createElement(TileLayer, {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }), React.createElement(MarkerClusterGroup, {
      iconCreateFunction: createClusterCustomIcon
    }, this.props.categories.filter(item => {
      return this.props.items.filter(items => {
        return items.categories.filter(cat => {
          return item.id == cat.id;
        }).length > 0;
      }).length > 0;
    }).map(category => {
      let result = this.props.items ? this.props.items.filter(item => {
        if (this.props.currentElement && item.id == this.props.currentElement.id) {
          return false;
        }

        let result = item.categories.filter(cat => {
          return category.id == cat.id;
        });

        if (result.length > 0) {}

        return result.length > 0;
      }).map(item => {
        //  console.log(item);
        let color = category.color;
        let cat = item.itemCategoryOption.filter(category => {
          return category.category_link.is_on_pin_map == null ? category.category_link.catOption.is_on_pin_map : category.category_link.is_on_pin_map;
        })[0];

        var png = require(`./../../../../assets/markers/${item.category.icon}.png`);

        console.log(this.props.catAbovePin);
        let myIcon = L.divIcon({
          html: `<div class=" text-center">
                            
                            
                        <svg class=" pin_hover" viewBox="0 0 80 80" width="40" height="40" style="overflow: visible;margin-bottom:-45px">
                            <defs>
                                <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_5_blur">
                                    <feGaussianBlur stdDeviation="4.7" in="SourceGraphic"/>
                                </filter>
                                <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_9_blur">
                                    <feGaussianBlur stdDeviation="3.9" in="SourceGraphic"/>
                                </filter>
                            </defs>
                            <style>
                                .small { font: italic 13px sans-serif; }
                                .heavyText {font: 500 30px sans-serif; text-align:center }
                            
                                /* Note that the color of the text is set with the    *
                                * fill property, the color property is for HTML only */
                                .Rrrrr { font: italic 40px serif; fill: red; }
                          </style>
                        
                            <g>
                            <rect stroke="${category.color}" transform="rotate(45 34.75000000000003,52.249999999999986) " id="svg_7" height="38.606601" width="42" y="32.9467" x="13.75" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="${color}"/>
                            <ellipse stroke="${category.color}" ry="33" rx="34" id="svg_2" cy="34.9375" cx="35.5" stroke-width="1.5" fill="${category.color}"/>
                            <ellipse stroke="${category.color}" ry="25.235295" rx="26" id="svg_3" cy="35.702206" cx="35.5" fill-opacity="null" stroke-width="1.5" fill="#fff"/>
                            <image xlink:href="${png}" id="svg_4" height="32" width="32" y="18" x="20"/>
                           </g>
                        </svg>
                        <svg class="" viewBox="0 0 80 80" width="40" height="40" style="overflow: visible;">
                            <defs>
                                <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_5_blur">
                                    <feGaussianBlur stdDeviation="4.7" in="SourceGraphic"/>
                                </filter>
                                <filter height="200%" width="200%" y="-50%" x="-50%" id="svg_9_blur">
                                    <feGaussianBlur stdDeviation="3.9" in="SourceGraphic"/>
                                </filter>
                            </defs>
                            <style>
                                .small { font: italic 13px sans-serif; }
                                .heavyText {font: 500 30px sans-serif; text-align:center }
                            
                                /* Note that the color of the text is set with the    *
                                * fill property, the color property is for HTML only */
                                .Rrrrr { font: italic 40px serif; fill: red; }
                          </style>
                        
                            <g>
                             <ellipse filter="url(#svg_5_blur)" opacity="0.4" ry="11" rx="27.5" id="svg_5" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#a07d7d"/>
                            <ellipse filter="url(#svg_9_blur)" opacity="0.3" ry="8" rx="9" id="svg_9" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#665151"/>
                        
                           </g>
                        </svg>
                        </div>`,
          iconSize: [10, 18],
          iconAnchor: [16, 60],
          // point of the icon which will correspond to marker's location
          popupAnchor: [-5, -12],
          className: 'marker-cluster-custom'
        }); // let img = item.blobs[0] ? `data:${item.blobs[0].blob_min.type};base64,${item.blobs[0].blob_min.blob}` : ''

        let img = item.blobs[0] ? WEB_CONFIG.BLOB_URL[NODE_ENV] + '/blob/' + item.blobs[0].blob_min_id : ''; //console.log('aksdhbjkasdbkjasdasbdbhhjbdsahbjbhsadhjsadjhbsb')

        return React.createElement(Marker, {
          openPopup: true,
          position: [item.latitude, item.longitude],
          icon: myIcon,
          "data-key": item.id,
          onClick: () => {
            this.pinClick.bind(this)(item.id);
          }
        }, React.createElement(Tooltip, {
          offset: [2, -47],
          direction: "top"
        }, React.createElement("div", {
          className: "text-center"
        }, React.createElement("h5", {
          className: "h6 g-font-size-8 text-uppercase g-letter-spacing-1 g-font-weight-600 text-uppercase   g-mb-1",
          title: item.name
        }, ellipsis(item.name, 25)), this.props.catAbovePin.length > 0 ? React.createElement("div", {
          className: "text-center"
        }, " ", this.props.catAbovePin.map(cap => {
          let res = item.itemCategoryOption.filter(el => {
            return el.category_link.co_id == cap;
          });

          if (res.length > 0) {
            return React.createElement("span", {
              className: "g-bg-white g-px-5 g-py-2 "
            }, " ", this.showValue(res[0]), React.createElement("br", null));
          } else {
            return React.createElement("span", null);
          }
        }), " ") : React.createElement("div", null), cat != undefined ? React.createElement("span", {
          className: "g-bg-white g-px-5 g-py-2 "
        }, " ", this.showValue(cat), " ") : React.createElement("span", null))));
      }) : React.createElement("span", null);
      return result;
    })), this.props.currentElement ? currentItem : React.createElement("span", null));
    return React.createElement("div", null, React.createElement("div", null, React.createElement("div", null, map)), React.createElement("div", {
      onClick: this.setPositionOn.bind(this),
      className: "map-button-user g-cursor-pointer  " + (this.state.positionOn == true ? "g-bg-black" : ""),
      style: {
        zIndex: 900,
        position: "absolute"
      }
    }, React.createElement("div", {
      className: "map-button-user-icon",
      style: {
        width: '100%',
        height: '100%'
      }
    })), React.createElement("div", {
      className: "map-distance-btns"
    }, React.createElement(Row, {
      style: {
        position: 'relative'
      }
    }, React.createElement("div", {
      onClick: this.zoomOut.bind(this),
      className: "col-xs-4 map-distance-left-btn"
    }, React.createElement("span", {
      className: "bm-icon",
      style: {
        width: '100%',
        height: '100%'
      }
    }, React.createElement("i", {
      className: "fa fa-minus",
      style: {
        fontSize: '20px'
      }
    })), " "), React.createElement("div", {
      className: "col-xs-4 map-distance-label"
    }, React.createElement("span", {
      className: "bm-icon",
      style: {
        width: '100%',
        height: '100%'
      }
    }, React.createElement("img", {
      style: {
        maxWidth: '50px'
      },
      src: radiusIcon
    }), React.createElement("br", null), React.createElement("span", {
      className: "g-line-height-1_0 g-font-size-14 text-center"
    }, this.props.distance))), React.createElement("div", {
      onClick: this.zoomIn.bind(this),
      className: "col-xs-4 map-distance-right-btn"
    }, React.createElement("span", {
      className: "bm-icon",
      style: {
        width: '100%',
        height: '100%'
      }
    }, React.createElement("i", {
      className: "fa fa-plus",
      style: {
        fontSize: '20px'
      }
    }))))));
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

export default withRouter(geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(connect(mapStateToProps, mapDispatchToProps)(SearchMap)));
/*


<div onClick={this.setPositionOn.bind(this)} class={"map-button-group g-cursor-pointer"} style={{ zIndex: 1000, position: "absolute" }}>
<div className="map-button-group-icon" style={{ width: '48px', height: '48px' }}>
</div>
</div >

                <Menu width={'20%'} styles={{
                    bmBurgerButton: {
                        position: 'absolute',

                        right: '18px',
                        top: '5%',
                        fontSize: '17px',
                        textAlign: 'center'
                    }

                }} right customBurgerIcon={<span  ><i class="fa fa-bar-chart" style={{ fontSize: '20px' }}></i><br /><span className="g-line-height-1_0">{0}</span></span>}>
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/about">About</a>
                    <a id="contact" className="menu-item" href="/contact">Contact</a>
                    <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
                </Menu >*/

/*


   <Popup>

                <div xs="9" class="media g-brd-around g-brd-gray-light-v4 g-brd-left-3 g-brd-blue-left g-pa-5 rounded-0  g-mb-2">

                    <div class="media-body g-pl-5">
                        <Row>
                            <Col xs="8" >
                                <h5 class="h6 g-font-size-11 text-uppercase g-letter-spacing-1 g-font-weight-600 text-uppercase  g-color-gray-dark-v4 g-mb-1">{item.name}</h5>
                                <label class="g-line-height-1_5 g-letter-spacing-1 g-mb-1 g-font-weight-500 g-font-size-9 form-control-label">{item.category["category_" + this.props.lang]}</label>
                                <br />
                                <span data-tag={item.user.id} onClick={this.goToUser.bind(this)} className="g-letter-spacing-1 text-nowrap g-color-blue g-cursor-pointer" >
                                    {item.user.name}
                                </span>
                            </Col>
                            <Col xs="3" className="g-pa-0 g-ma-0" >
                                {item.blobs[0] ?

                                    <div class="js-fancybox d-block u-block-hover " target="_blank">


                                        <span onClick={this.openImage.bind(this)} data-item={item.id} data-tag={item.blobs[0].blob_id} class={" js-fancybox d-block u-block-hover u-block-hover--scale-down g-cursor-pointer"} href="smooth-parallax-scroll/index.html" >
                                            <Img src={img} className={"img-fluid u-block-hover__main u-block-hover__img "} />

                                        </span>
                                    </div>
                                    : <span></span>}
                            </Col>
                        </Row>
                        <div className="g-pb-10">
                            <div class="d-flex justify-content-center text-center g-mb-8 g-mt-8"><div class="d-inline-block align-self-center g-width-100 g-height-1  g-bg-gray-light-v3"></div><span class="align-self-center text-uppercase  g-color-gray-dark-v2  g-color-gray-dark-v4 g-letter-spacing-2  g-mx-5  g-font-weight-600 g-font-size-9">{tran.translate('MAP_PIN_DESCRIPTION_LABEL')}</span><div class="d-inline-block align-self-center g-width-100 g-height-1 g-bg-gray-light-v3"></div></div>
                            <Row>
                                <PreviewItemOptions item={item} on_map={true} lang={this.props.lang} col_size="6" />


                            </Row>
                        </div>
                        {item.tags.slice(0, 6).map(item => {
                            return <span class="u-label u-label--sm tag-map   g-px-10 g-mx-1 g-my-1 g-cursor-pointer">{item.tag}</span>

                        })}{
                            item.tags.length > 6 ? <span className="g-pl-10">{"+" + (item.tags.length - 6) + " " + tran.translate('MAP_MORE_TAGS_LABEL')}</span> : <span></span>
                        } <span></span>
                    </div>

                </div>
            </Popup>*/
//# sourceMappingURL=index.js.map