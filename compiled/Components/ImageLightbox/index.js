/*
    ./client/components/App.js
*/
import React from 'react';
import Img from 'react-image';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';
import WEB_CONFIG from '../../config.js';
import LIGHTBOX_ACTIONS from './actions.js';

class ImageLightbox extends React.Component {
  constructor() {
    super();
    this.open = false;
    this.isLoading = false;
  }

  thumbmailClickHandler(event) {
    this.props.getImage({
      id: event.currentTarget.getAttribute('data-tag')
    });
  }

  onOpenModal() {
    this.setState({
      open: true
    });
  }

  onCloseModal() {
    this.props.closeWindow();
  }

  init() {
    this.open = false;
  }

  closeLightboxHandler(event) {
    this.props.closeLightbox(false);
  }

  render() {
    if (this.props.lightbox.open == false) {
      return React.createElement("span", null);
    }

    let img = this.props.lightbox.activeImage ? `${WEB_CONFIG.BLOB_URL[NODE_ENV]}/blob/${this.props.lightbox.activeImage.blob_item.id}` : '';
    let imgReact = img != null ? React.createElement("img", {
      style: {
        maxWidth: '80vw',
        maxHeight: '90vh'
      },
      src: img
    }) : React.createElement("span", null);
    let lightboxBody = React.createElement(Col, {
      onClick: this.closeLightboxHandler.bind(this),
      style: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        display: 'flex'
      },
      xs: "12"
    }, img != null ? React.createElement("img", {
      style: {
        maxWidth: '80vw',
        maxHeight: '90vh'
      },
      src: img
    }) : React.createElement("span", null));

    if (this.props.lightbox.imageList.length > 1) {
      lightboxBody = React.createElement(Row, {
        className: "ligbboxBody"
      }, React.createElement(Col, {
        onClick: this.closeLightboxHandler.bind(this),
        style: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          alignContent: 'center',
          display: 'flex',
          minHeight: '100vh'
        },
        xs: "10"
      }, imgReact), React.createElement(Col, {
        xs: "2",
        className: "lighboxRight g-pa-10"
      }, React.createElement(Row, null, this.props.lightbox.imageList.map(item => {
        let actualId = this.props.lightbox.activeImage ? this.props.lightbox.activeImage.id : 0;
        return React.createElement("div", {
          key: item.blob_thumbmail.id,
          className: "col-md-6  g-ma-0 g-pa-0 g-pl-10 "
        }, React.createElement("div", {
          className: "g-brd-around g-brd-gray-light-v4--hover"
        }, React.createElement("span", {
          "data-tag": item.blob_item.id,
          className: "js-fancybox d-block u-block-hover u-block-hover--scale-down ",
          href: "#",
          onClick: this.thumbmailClickHandler.bind(this),
          "data-fancybox": "lightbox-gallery--17",
          "data-src": "../../assets/img-temp/400x270/img1.jpg",
          "data-animate-in": "bounceInDown",
          "data-animate-out": "bounceOutDown",
          "data-speed": "1000",
          "data-overlay-blur-bg": "true",
          "data-caption": "Lightbox Gallery"
        }, React.createElement(Img, {
          src: `${WEB_CONFIG.BLOB_URL[NODE_ENV]}/blob/${item.blob_min_id}`,
          className: "img-fluid  u-block-hover__img " + (actualId == item.id ? "" : "u-block-hover__main--grayscale")
        }))));
      }))));
    }

    let body = React.createElement("div", null, React.createElement("div", {
      className: "lightboxContainer",
      onClick: this.closeLightboxHandler.bind(this)
    }), React.createElement(Container, {
      className: "ligbboxBody"
    }, lightboxBody));
    return body;
  }

}

const mapStateToProps = state => {
  return {
    lightbox: state.ImageLightboxReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    /*   openLightbox: (open, action) => {
           dispatch({
               type: LIGHTBOX_ACTIONS.OPEN_MODAL,
               dto: {
                   open: open,
                   action: action
               }
           });
       },*/
    getImage: id => {
      dispatch({
        type: LIGHTBOX_ACTIONS.SET_ACTIVE_IMG_LIGHTBOX,
        dto: id
      });
    },
    closeLightbox: () => {
      dispatch({
        type: LIGHTBOX_ACTIONS.CLOSE_LIGHTBOX,
        dto: {
          open: false
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageLightbox);