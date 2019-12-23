function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { connect } from 'react-redux';
import { Translator } from './../../../../../Shared/index.js';
import Slider from "react-slick";
import Img from 'react-image';
import WEB_CONFIG from '../../../../../config.js';
import { Col, Container, Row, Label } from 'reactstrap';
import LIGHTBOX_ACTIONS from '../../../../../Components/ImageLightbox/actions.js';

class CategoryOptionIMAGE_SHOW extends React.Component {
  constructor(props) {
    super(props);
  }

  openImage(event) {
    let imgId = event.currentTarget.getAttribute('data-tag') ? event.currentTarget.getAttribute('data-tag') : event.target.getAttribute('data-tag');
    console.log(imgId);
    let blob = this.props.item.blobs.filter(obj => {
      return obj.id == imgId;
    })[0];
    this.props.openLightbox(blob, this.props.item.blobs);
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    var settings = {
      dots: false,
      slidesToShow: 4,
      lazyLoad: true,
      centerMode: true,
      swipeToSlide: true,
      infinite: false,
      slidesToScroll: 3,
      speed: 300 //  //     slidesToShow:this.state.currentIndex

    };
    return React.createElement("div", {
      className: "g-pa-0 g-ma-0",
      style: {
        backgroundColor: "#eee",
        maxHeight: "175px"
      }
    }, React.createElement(Slider, _extends({}, settings, {
      ref: ref => {
        this.refSlider = ref;
      }
    }), this.props.item.blobs.map((item, index) => {
      console.log(item);
      let img = WEB_CONFIG.BLOB_URL[NODE_ENV] + '/blob/' + item.blob_thumbmail_id;
      return React.createElement(Col, {
        className: " g-brd-gray-light-v4 rounded-0   g-pa-0 g-ma-0 g-brd-around g-brd-gray-light-v3"
      }, React.createElement("span", {
        "data-tag": item.id,
        onClick: this.openImage.bind(this),
        className: " js-fancybox d-block u-block-hover u-block-hover--scale-down",
        style: {
          marginTop: "0px"
        }
      }, React.createElement(Img, {
        src: img,
        className: "img-fluid u-block-hover__main u-block-hover__img",
        style: {
          overflow: 'hidden',
          minHeight: '175px',
          maxHeight: '175px'
        }
      }))); //  console.log(item);
      // let img = item.blobs[0] ? WEB_CONFIG.BLOB_URL[NODE_ENV] + '/blob/' + item.blobs[0].blob_min_id : ''
    })));
  }

} //            <MapForm readOnly coords={{ longitude: this.props.item.longitude, latitude: this.props.item.latitude }} icon={encodeURIComponent(this.props.item.category.icon)} getFromUser={false} form_text={"DUPA"}></MapForm>


const mapStateToProps = state => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    catOptions: state.EditCategoryReducer
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionIMAGE_SHOW);
//# sourceMappingURL=CategoryOptionIMAGE_SHOW.js.map