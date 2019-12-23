/*
    ./client/components/App.jsx
*/
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import Autocomplete from 'react-autocomplete';
import { geolocated } from 'react-geolocated';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css'; // sass

import { connect } from 'react-redux';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import CommandList from '../../Shared/CommandList.js';
import { Enums, Translator } from '../../Shared/index.js';
import QueryList from '../../Shared/QueryList.js';
import { BaseService } from './../../App/index.js';
import { ButtonLoader } from './../index.js';
import SET_LATLNG_ACTIONS from '../../Scenes/User/Scenes/SetLatlng/actions.js'; //import { Map } from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

class MapForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 16,
      countryValue: '',
      regionValue: '',
      cityValue: '',
      address: '',
      markers: [],
      zipcode: '',
      countries: [],
      cities: []
    };
    this.step = 1;
    this.state.validation = [];
    this.state.setLonLat = false;
    this.timeout = null;

    var png = require(`./../../assets/markers/${props.icon}.png`);

    let color = '#ff7c7c';
    this.myIcon = L.divIcon({
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
                    .heavyText {font: 500 30px sans-serif; text-align:center }
                
                    /* Note that the color of the text is set with the    *
                    * fill property, the color property is for HTML only */
                    .Rrrrr { font: italic 40px serif; fill: red; }
              </style>
            
                <g>
                <ellipse filter="url(#svg_5_blur)" opacity="0.4" ry="11" rx="27.5" id="svg_5" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#a07d7d"/>
                <ellipse filter="url(#svg_9_blur)" opacity="0.3" ry="8" rx="9" id="svg_9" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#665151"/>
                <rect stroke="${color}" transform="rotate(45 34.75000000000003,52.249999999999986) " id="svg_7" height="38.606601" width="42" y="32.9467" x="13.75" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="${color}"/>
                <ellipse stroke="${color}" ry="33" rx="34" id="svg_2" cy="34.9375" cx="35.5" stroke-width="1.5" fill="${color}"/>
                <ellipse stroke="${color}" ry="25.235295" rx="26" id="svg_3" cy="35.702206" cx="35.5" fill-opacity="null" stroke-width="1.5" fill="#fff"/>
                <image xlink:href="${png}" id="svg_4" height="32" width="32" y="18" x="20"/>
               </g>
            </object>`,
      iconSize: [30, 40],
      iconAnchor: [15, 35],
      // point of the icon which will correspond to marker's location
      popupAnchor: [0, -35],
      className: 'marker-cluster-custom'
    });
    color = '#4DB1CF';
    this.myIconResults = L.divIcon({
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
                    .heavyText {font: 500 30px sans-serif; text-align:center }
                
                    /* Note that the color of the text is set with the    *
                    * fill property, the color property is for HTML only */
                    .Rrrrr { font: italic 40px serif; fill: red; }
              </style>
            
                <g>
                <ellipse filter="url(#svg_5_blur)" opacity="0.4" ry="11" rx="27.5" id="svg_5" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#a07d7d"/>
                <ellipse filter="url(#svg_9_blur)" opacity="0.3" ry="8" rx="9" id="svg_9" cy="83" cx="35.5" stroke-width="1.5" stroke="#8e8e8e" fill="#665151"/>
                <rect stroke="${color}" transform="rotate(45 34.75000000000003,52.249999999999986) " id="svg_7" height="38.606601" width="42" y="32.9467" x="13.75" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="${color}"/>
                <ellipse stroke="${color}" ry="33" rx="34" id="svg_2" cy="34.9375" cx="35.5" stroke-width="1.5" fill="${color}"/>
                <ellipse stroke="${color}" ry="25.235295" rx="26" id="svg_3" cy="35.702206" cx="35.5" fill-opacity="null" stroke-width="1.5" fill="#fff"/>
                <image xlink:href="${png}" id="svg_4" height="32" width="32" y="18" x="20"/>
               </g>
            </object>`,
      iconSize: [30, 40],
      iconAnchor: [15, 35],
      // point of the icon which will correspond to marker's location
      popupAnchor: [0, -35],
      className: 'marker-cluster-custom'
    });
  }

  refreshValidation() {
    if (this.state.toRefresh) {
      setTimeout(() => {
        this.validation();
      });
    }
  }

  componentDidMount() {
    if (this.props.readOnly == true) {
      this.setState({
        longitude: this.props.coords.longitude,
        latitude: this.props.coords.latitude
      });
      return;
    }

    this.props.getCountries().then(succ => {
      this.setState({
        countries: succ.data
      });
    });

    if (this.props.auth.user && this.props.auth.user.longitude != 0 && this.props.auth.user.latitude != 0) {
      this.setState({
        longitude: this.props.auth.user.longitude,
        latitude: this.props.auth.user.latitude
      });
      this.props.getUserCountry({
        id: this.props.auth.user.country_id
      }).then(succ => {
        this.setState({
          countryValue: succ.data.name,
          address: this.props.auth.user.address,
          zipcode: this.props.auth.user.zipcode,
          cityValue: this.props.auth.user.city,
          cityId: this.props.auth.user.city_id,
          countryId: this.props.auth.user.country_id,
          markers: []
        });
        this.props.onChange ? this.props.onChange(this.state) : null;
      });
      return;
    } else {
      if (this.props.coords && this.longitude == 0 && this.latitude == 0) {
        this.setState({
          longitude: this.props.coords.longitude,
          latitude: this.props.coords.latitude
        });
      } else {
        this.setState({
          longitude: 0,
          latitude: 0
        });
      }
    }
  }

  countryHander(event) {
    this.setState({
      countryValue: event.target.value,
      regionValue: '',
      cityValue: '',
      regionId: '',
      cityId: '',
      address: '',
      markers: [],
      zipcode: ''
    });
    let name = event.target.value;
    clearTimeout(this.timeout ? this.timeout : 0);

    if (name.length > 2) {
      this.timeout = setTimeout(() => {
        console.log('request');
        this.props.getCountries({
          name: name
        }).then(succ => {
          if (succ.data.length == 1) {
            this.setState({
              countryValue: succ.data[0].name,
              countryId: succ.data[0].id,
              countries: [],
              cities: []
            });
          } else {
            this.setState({
              countries: succ.data,
              cities: []
            });
          }
        });
      }, 500);
    }
  }

  cityHander(event) {
    this.setState({
      cityValue: event.target.value,
      countries: []
    });
    let name = event.target.value;
    clearTimeout(this.timeout ? this.timeout : 0);

    if (name.length > 2) {
      this.timeout = setTimeout(() => {
        console.log('request');
        this.props.getCities({
          country_id: this.state.countryId,
          name: name
        }).then(succ => {
          if (succ.data.length == 1) {
            this.setState({
              cityValue: succ.data[0].name,
              cities: [],
              cityId: succ.data[0].id
            });
          } else {
            this.setState({
              cities: succ.data
            });
          }
        });
        ;
      }, 500);
    }
  }

  citySelect(val) {
    this.state.cities.forEach(item => {
      console.log(val);

      if (item.name == val) {
        this.setState({
          cityValue: val,
          cityId: item.id,
          setLonLat: true,
          latitude: item.latitude,
          longitude: item.longitude,
          zoom: 9,
          address: '',
          zipcode: '',
          markers: []
        });
      }
    }); //this.props.getCountries({name:event.target.value});
  }

  countrySelect(val) {
    this.state.countries.forEach(item => {
      console.log(val);

      if (item.name == val) {
        console.log(val);
        this.setState({
          countryValue: val,
          countryId: item.id,
          setLonLat: true,
          latitude: item.latitude,
          longitude: item.longitude,
          regionValue: '',
          regionId: '',
          cityValue: '',
          cityId: '',
          zoom: 3,
          address: '',
          zipcode: '',
          markers: []
        }); //   this.props.getCities({ country_id: item.id, name: name });

        return;
      }
    }); //this.props.getCountries({name:event.target.value});
  } //setLanguga()


  onZoom(event) {
    if (this.map) {
      this.setState({
        zoom: this.map.viewport.zoom
      });
    }
  }

  addMarker(event) {
    if (this.props.readOnly == true) {
      return;
    }

    this.setState({
      longitude: event.latlng.lng,
      latitude: event.latlng.lat,
      setLonLat: true
    });
    this.props.getReverseByLatLng({
      longitude: event.latlng.lng,
      latitude: event.latlng.lat
    }).then(succ => {
      this.setState({
        cityValue: succ.data[0].city,
        countryValue: succ.data[0].country,
        countryId: succ.data[0].country_id,
        cityId: succ.data[0].city_id,
        address: (succ.data[0].streetName ? succ.data[0].streetName : '') + " " + (succ.data[0].streetNumber ? " " + succ.data[0].streetNumber : ""),
        zipcode: succ.data[0].zipcode ? succ.data[0].zipcode : ''
      });
      this.props.onChange ? this.props.onChange(this.state) : null;
    });
  }

  submitHandler(event) {
    if (this.props.coords && this.state.longitude == 0 && this.state.latitude == 0) {
      this.state.longitude = this.props.coords.longitude, this.state.latitude = this.props.coords.latitude;
    }

    this.state.city_id = this.state.cityId;
    this.state.country_id = this.state.countryId;
    this.state.city = this.state.cityValue;
    this.props.onSubmit(this.state);
    /*  this.props.setLatLng(this.state).then(succ => {
          this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
              Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('SET_LANG_SAVE_SUCCESS')
          );
      })*/
  }

  setCoordinate(event) {
    let json = JSON.parse(event.target.getAttribute('data-tag'));
    this.setState({
      markers: [],
      longitude: json.longitude,
      latitude: json.latitude,
      address: (json.streetName ? json.streetName : '') + " " + (json.streetNumber ? " " + json.streetNumber : ""),
      zipcode: json.zipcode ? json.zipcode : ''
    });
    this.props.onChange ? this.props.onChange(this.state) : null;
  }

  refreshGeolocation(event) {
    this.setState({
      markers: [],
      longitude: this.props.coords.longitude,
      latitude: this.props.coords.latitude
    });
    this.props.getReverseByLatLng({
      longitude: this.props.coords.longitude,
      latitude: this.props.coords.latitude
    }).then(succ => {
      this.setState({
        cityValue: succ.data[0].city,
        countryValue: succ.data[0].country,
        countryId: succ.data[0].country_id,
        cityId: succ.data[0].city_id,
        address: (succ.data[0].streetName ? succ.data[0].streetName : '') + " " + (succ.data[0].streetNumber ? " " + succ.data[0].streetNumber : ""),
        zipcode: succ.data[0].zipcode ? succ.data[0].zipcode : ''
      });
      this.props.onChange ? this.props.onChange(this.state) : null;
      ;
    });
  }

  getAddress(event) {
    this.setState({
      address: event.target.value
    });
    let address = event.target.value;
    clearTimeout(this.timeout ? this.timeout : 0);

    if (address.length > 2) {
      this.timeout = setTimeout(() => {
        console.log('request');
        this.props.getAddress({
          city: this.state.cityValue,
          address: address,
          country: this.state.countryValue
        }).then(succ => {
          if (succ.data.length == 1) {
            this.setState({
              longitude: succ.data[0].longitude,
              latitude: succ.data[0].latitude,
              address: (succ.data[0].streetName ? succ.data[0].streetName : '') + " " + (succ.data[0].streetNumber ? " " + succ.data[0].streetNumber : ""),
              zipcode: succ.data[0].zipcode ? succ.data[0].zipcode : '',
              markers: []
            });
            this.props.onChange ? this.props.onChange(this.state) : null;
          } else {
            this.setState({
              markers: succ.data.length > 0 ? succ.data : []
            });
          }
        });
      }, 500);
    }
  }

  getUsersCoordinate() {
    this.props.getUserCountry({
      id: this.props.auth.user.country_id
    }).then(succ => {
      this.setState({
        countryValue: succ.data.name,
        longitude: this.props.auth.user.longitude,
        latitude: this.props.auth.user.latitude,
        address: this.props.auth.user.address,
        zipcode: this.props.auth.user.zipcode,
        cityValue: this.props.auth.user.city,
        cityId: this.props.auth.user.city_id,
        countryId: this.props.auth.user.country_id,
        markers: []
      });
      this.props.onChange ? this.props.onChange(this.state) : null;
    });
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    this.refreshValidation();
    let latlng = [0, 0];

    if (this.props.coords) {
      if (this.state.setLonLat == 1) {
        latlng = [this.state.latitude, this.state.longitude];
      } else if (this.state.latitude != undefined && this.state.longitude != undefined && this.state.latitude != 0 && this.state.longitude != 0) {
        latlng = [this.state.latitude, this.state.longitude];
      } else {
        latlng = [this.props.coords.latitude, this.props.coords.longitude];
      }
    } else if (this.state.latitude && this.state.longitude) {
      latlng = [this.state.latitude, this.state.longitude];
    }

    console.log(latlng); //let latlng = this.props.coords ? this.state.setLonLat == 1 ? [this.state.latitude, this.state.longitude] : [this.props.coords.latitude, this.props.coords.longitude] : [this.state.latitude, this.state.longitude]

    let map = React.createElement(Map, {
      className: this.props.size ? this.props.size : "size-map-300px",
      center: latlng,
      zoom: this.state.zoom,
      onzoomend: this.onZoom.bind(this),
      onclick: this.addMarker.bind(this),
      ref: ref => {
        this.map = ref;
      }
    }, React.createElement(TileLayer, {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    }), this.state.markers ? this.state.markers.filter(item => {
      return item.streetName != undefined;
    }).map(item => {
      return React.createElement(Marker, {
        position: [item.latitude, item.longitude],
        icon: this.myIconResults
      }, React.createElement(Popup, null, React.createElement(Row, null, item.city + ", " + item.zipcode, React.createElement("br", null), (item.streetName ? item.streetName : "") + " " + (item.streetNumber ? item.streetNumber : ""), React.createElement("br", null), React.createElement(Button, {
        "data-tag": JSON.stringify(item),
        value: tran.translate('SET_COORDINATE_QUERY_LINK'),
        onClick: this.setCoordinate.bind(this),
        size: "sm",
        className: "g-mt-10 btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase"
      }, tran.translate('SET_COORDINATE_QUERY_LINK')))));
    }) : React.createElement("span", null), React.createElement(Marker, {
      position: latlng,
      icon: this.myIcon
    }));
    let value = "";
    let countryForm = React.createElement(Autocomplete, {
      getItemValue: item => item.label,
      items: this.state.countries.map(item => {
        return {
          label: item.name
        };
      }),
      renderItem: (item, isHighlighted) => React.createElement("div", {
        className: "menuAutocompleteElement",
        style: {
          background: isHighlighted ? 'lightgray' : 'white'
        }
      }, item.label),
      menuStyle: Object.assign({
        borderRadius: '3px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '2px 0',
        fontSize: '90%',
        position: 'fixed',
        overflow: 'auto',
        maxHeight: '50%',
        // TODO: don't cheat, let it flow to the bottom
        zIndex: '2000'
      }, this.props.menuStyle),
      inputProps: {
        className: ' form-control',
        style: {
          width: '100%'
        },
        autoComplete: false,
        placeholder: phTrans.translate('SETLATLNG_COUNTRY_PLACEHOLDER')
      },
      wrapperStyle: {
        width: '100%'
      },
      value: this.state.countryValue,
      onChange: this.countryHander.bind(this),
      onSelect: this.countrySelect.bind(this)
    });
    let cityForm = React.createElement(Autocomplete, {
      getItemValue: item => item.label,
      items: this.state.cities.map(item => {
        return {
          label: item.name,
          population: item.population,
          rank: item.RANK
        };
      }),
      renderItem: (item, isHighlighted) => React.createElement("div", {
        className: "menuAutocompleteElement",
        style: {
          background: isHighlighted ? 'lightgray' : 'white'
        }
      }, item.label),
      menuStyle: Object.assign({
        borderRadius: '3px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '2px 0',
        fontSize: '90%',
        position: 'fixed',
        overflow: 'auto',
        maxHeight: '50%',
        // TODO: don't cheat, let it flow to the bottom
        zIndex: '2000'
      }, this.props.menuStyle),
      sortItems: (objA, objB) => {
        console.log(objA);
        console.log(objB);
        return Number(objB.population) > Number(objA.population) ? 1 : -1;
      },
      inputProps: {
        className: ' form-control',
        style: {
          width: '100%'
        },
        autoComplete: false,
        placeholder: phTrans.translate('SETLATLNG_CITY_PLACEHOLDER')
      },
      wrapperStyle: {
        width: '100%'
      },
      value: this.state.cityValue,
      onChange: this.cityHander.bind(this),
      onSelect: this.citySelect.bind(this)
    }); // g-brd-around g-brd-gray-light-v3 g-pa-30 g-mb-10 

    let body = React.createElement(Form, {
      className: " g-pa-20"
    }, React.createElement(Col, {
      className: "text-center mx-auto g-mb-10"
    }, this.props.form_header ? React.createElement("h5", {
      className: "h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-15"
    }, this.props.form_header) : React.createElement("span", null), this.props.form_text ? React.createElement(Label, {
      className: "g-line-height-1_8 g-letter-spacing-1  g-mb-10"
    }, this.props.form_text) : React.createElement("span", null)), React.createElement(FormGroup, null, React.createElement(Row, null, React.createElement(Col, {
      className: "col-3"
    }, React.createElement(Label, {
      htmlFor: this.state.guid
    }, tran.translate('SETLATLNG_COUNTRY_LABEL'))), React.createElement(Col, {
      className: "col-6"
    }, countryForm))), React.createElement(FormGroup, null, React.createElement(Row, null, React.createElement(Col, {
      className: "col-3"
    }, React.createElement(Label, {
      htmlFor: this.state.guid
    }, tran.translate('SETLATLNG_CITY_LABEL'))), React.createElement(Col, {
      className: "col-6"
    }, this.state.countryId != undefined && this.state.countryId != '' ? cityForm : React.createElement("span", null)))), React.createElement(FormGroup, null, React.createElement(Row, null, React.createElement(Col, {
      className: "col-3"
    }, React.createElement(Label, null, tran.translate('SETLATLNG_ADDRESS_LABEL'))), React.createElement(Col, {
      className: "col-6"
    }, this.state.cityValue != undefined && this.state.cityValue != '' ? React.createElement(Input, {
      className: "form-control rounded-0",
      type: "search",
      value: this.state.address,
      id: this.state.guid,
      onChange: this.getAddress.bind(this),
      placeholder: phTrans.translate('SETLATLNG_ADDRESS_PLACEHOLDER')
    }) : React.createElement("span", null)))), React.createElement(FormGroup, null, React.createElement(Row, null, map)), React.createElement("br", null), this.props.coords ? React.createElement(ButtonLoader, {
      onClick: this.refreshGeolocation.bind(this),
      size: "md",
      className: "btn rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase g-mr-10 ",
      value: tran.translate('REFRESH_GEO_BUTTON_LABEL')
    }) : React.createElement("span", null), this.props.onSubmit ? React.createElement(ButtonLoader, {
      disabled: this.state.zipcode == '' || this.state.zipcode == undefined,
      onClick: this.submitHandler.bind(this),
      size: "md",
      className: "btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase",
      value: tran.translate('SET_COORDINATES_BUTTON_LABEL'),
      isLoading: this.props.latlng.isLoading
    }) : React.createElement("span", null), this.props.onChange ? React.createElement(ButtonLoader, {
      onClick: this.getUsersCoordinate.bind(this),
      size: "md",
      className: "btn rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase ",
      value: tran.translate('SET_FROM_USER_COORIDNATE'),
      isLoading: this.props.latlng.isLoading
    }) : React.createElement("span", null));

    if (this.props.readOnly == true) {
      return map;
    } else {
      return body;
    }
  }

}

const mapStateToProps = state => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    latlng: state.SetLatlngReducer,
    auth: state.AuthReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCountries: dto => {
      return dispatch(new BaseService().queryThunt(QueryList.Country.GET_COUNTRY, dto, null, Enums.LOADER.SET_CONTAINER_ACTION));
    },
    getCities: dto => {
      return dispatch(new BaseService().queryThunt(QueryList.City.GET_CITY, dto, null, Enums.LOADER.SET_CONTAINER_ACTION));
    },
    getAddress: dto => {
      return dispatch(new BaseService().queryThunt(QueryList.City.REVERSE_GEO, dto));
    },
    getReverseByLatLng: dto => {
      return dispatch(new BaseService().queryThunt(QueryList.City.REVERSE_LATLNG_GEO, dto));
    },
    getUserCountry: dto => {
      return dispatch(new BaseService().queryThunt(QueryList.Country.GET_COUNTRY_BY_ID, dto));
    },
    setLatLng: dto => {
      return dispatch(new BaseService().queryThunt(CommandList.User.SET_COORDIATES, dto, null, Enums.LOADER.SET_CONTAINER_ACTION)).then(succ => {
        return dispatch(new BaseService().queryThunt(QueryList.User.USER_INFO, {}, localStorage.token));
      });
    }
  };
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(connect(mapStateToProps, mapDispatchToProps)(MapForm));
//# sourceMappingURL=index.js.map