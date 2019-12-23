import React from 'react';
import Img from 'react-image';
import { Translator } from '../../Shared/index.js';
import { connect } from 'react-redux';
import WEB_CONFIG from '../../config.js';

class ImageProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    let img = this.props.default;
    let uid = 0;
    let hasImg = false;
    let isVerified = 1;

    if (this.props.blob_profile != null) {
      img = WEB_CONFIG.BLOB_URL[NODE_ENV] + '/blob/' + this.props.blob_profile.blob_thumbmail_id; // img = `data:${this.props.blob_profile.blob_thumbmail.type};base64,${this.props.blob_profile.blob_thumbmail.blob}`

      uid = this.props.blob_profile.blob_item.uid;
      hasImg = true;
      isVerified = this.props.blob_profile.status;
    } // <div id="loading-text">LOADING <br />{this.props.progress + "%"}</div>


    return React.createElement("div", {
      className: "u-block-hover g-pos-rel",
      style: {
        minHeight: "280px"
      }
    }, React.createElement("figure", null, React.createElement(Img, {
      "data-tag": uid,
      src: img,
      className: "img-fluid w-100   " + (isVerified == 1 ? hasImg == true ? "u-block-hover__main--zoom-v1" : "" : "g-blur-10"),
      alt: "Image Description"
    })), hasImg == true && isVerified == 1 ? React.createElement("figcaption", {
      onClick: this.props.openImage,
      className: "u-block-hover__additional--fade g-cursor-pointer g-bg-white-opacity-0_5 g-pa-30"
    }, React.createElement("div", {
      className: "u-block-hover__additional--fade u-block-hover__additional--fade-up g-flex-middle"
    })) : undefined, hasImg == true ? React.createElement("span", {
      className: "g-pos-abs g-bottom-0 g-right-0"
    }, React.createElement("a", {
      className: "hidden btn btn-sm u-btn-primary rounded-0",
      href: "#"
    }, "U\u017Cytkownik"), React.createElement("small", {
      className: "d-block g-bg-black-opacity-0_5 g-color-white g-pa-5"
    }, isVerified == 1 ? React.createElement("span", null, this.props.title) : React.createElement("span", {
      className: "h6 text-uppercase  g-color-white g-letter-spacing-2 g-font-weight-600 text-uppercase text-center"
    }, this.tran.translate('IMAGE_NOT_VERIFIED')))) : React.createElement("span", null));
  }

}

const mapStateToProps = state => {
  //console.log(state);
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageProfile);
//# sourceMappingURL=index.js.map