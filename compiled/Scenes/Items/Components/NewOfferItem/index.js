/*
    ./client/components/App.jsx
*/
import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import

import { connect } from 'react-redux';
import { Col, Container, Label, Row } from 'reactstrap';
import uuidv4 from "uuid/v4";
import CommandList from '../../../../Shared/CommandList.js';
import { Translator } from '../../../../Shared/index.js';
import QueryList from '../../../../Shared/QueryList.js';
import { BaseService } from '../../../../App/index.js';
import TagComponent from '../../../../Components/FormComponent/Components/TagComponent/index.jsx';
import { TextArea, TextBox } from '../../../../Components/index.js';
import BodyLoader from '../../../../Components/Loader/BodyLoader/index.jsx';
import CategoryOptionTempFormMapper from '../../../Categories/Components/CategoryOptionTempMapper/CategoryOptionTempFormMapper.jsx';
import CategoryTreePreview from '../../../Categories/Scenes/CategoryTreePreview/index.jsx';
import ItemDTO from './../../../../Shared/DTO/Item/ItemDTO.js';

class NewOfferItem extends React.Component {
  constructor() {
    super();
    this.state = new ItemDTO();
    this.state.tags = [];
    this.state.validation = [];
    this.state.categoryId = 0;
    this.state.categoryIcon = '';
    this.state.categoryOptionValues = [];
  }

  componentDidMount() {}

  init() {
    this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
  }

  onTagChange(tags) {
    this.setState({
      tags: tags
    });
  }

  nameHandler(event) {
    this.setState({
      name: event.target.value
    });
    this.refreshValidation();
  }

  descriptionHandler(event) {
    this.setState({
      description: event.target.value
    });
    this.refreshValidation();
  }

  openImage(event) {
    this.props.openLightbox(this.props.auth.user.blob_profile, this.props.userAccount.images);
  }

  submitHandler(event) {
    let item = {
      id: uuidv4(),
      name: this.state.name,
      description: this.state.description,
      category_id: this.state.categoryId,
      catOptions: this.state.categoryOptionValues,
      tags: this.state.tags
    };
    console.log(item);
    this.props.createNewItem(item).then(succ => {
      console.log(succ);
    });
  }

  onClickTree(event) {
    console.log(event.currentTarget.getAttribute('data-name'));

    if (this.state.categoryId == 0) {
      this.props.getCategoryOptions(event.currentTarget.getAttribute('data-key')).then(succ => {
        console.log(succ);
      });
      this.setState({
        categoryId: event.currentTarget.getAttribute('data-key'),
        categoryName: event.currentTarget.getAttribute('data-name'),
        categoryIcon: event.currentTarget.getAttribute('data-icon')
      });
    } else {
      let categoryId = event.currentTarget.getAttribute('data-key');
      let categoryName = event.currentTarget.getAttribute('data-name');
      let categoryIcon = event.currentTarget.getAttribute('data-icon');
      confirmAlert({
        onClickOutside: () => {
          this.setState({
            loading: false
          });
        },
        onKeypressEscape: () => {
          this.setState({
            loading: false
          });
        },
        customUI: ({
          onClose
        }) => {
          return React.createElement("div", {
            className: "g-py-40 g-brd-around rounded-0 g-brd-gray-light-v3 g-bg-white-opacity-0_8 g-px-50 text-center"
          }, React.createElement("h1", {
            className: "h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5"
          }, Translator(this.props.codeDict.data.LABEL, this.props.lang).translate('CATEGORY_NEW_CHANGE_CATEGORY_CONFIRM_HEADER')), React.createElement("p", {
            className: "g-line-height-1_8 g-letter-spacing-1  g-mb-20 form-control-label"
          }, Translator(this.props.codeDict.data.LABEL, this.props.lang).translate('CATEGORY_NEW_CHANGE_CATEGORY_TEXT_CONFIRM', ...[this.state.categoryName, categoryName]) + " ", " "), React.createElement("button", {
            className: "btn g-mr-5 g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md",
            onClick: () => {
              this.setState({
                categoryId: categoryId,
                categoryName: categoryName,
                categoryIcon: categoryIcon
              });
              this.props.getCategoryOptions(categoryId);
              onClose();
            }
          }, Translator(this.props.codeDict.data.LABEL, this.props.lang).translate('YES_LABEL')), React.createElement("button", {
            className: "g-ml-5 btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md",
            onClick: () => {
              onClose();
            }
          }, Translator(this.props.codeDict.data.LABEL, this.props.lang).translate('NO_LABEL')));
        }
      });
    }
  }

  render() {
    this.init();
    const _this$state = this.state,
          tags = _this$state.tags,
          suggestions = _this$state.suggestions;
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);

    if (this.props.loader.BODY_PROGRESS < 100) {
      return React.createElement(BodyLoader, {
        zIndex: 3,
        height: "800px",
        size: "100px",
        progress: this.props.loader.BODY_PROGRESS
      });
    } //  if (this.props.userAccount.getImagesIsLoading == true) {
    //      return (<BodyLoader zIndex={3} height="800px" size="100px" progress={this.props.loader.BODY_PROGRESS} />);
    //  }


    let body = React.createElement(Container, {
      className: "g-pa-30 g-mb-30"
    }, React.createElement(Col, {
      className: "text-center mx-auto g-max-width-600 g-mb-10"
    }, React.createElement("h5", {
      className: "h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5"
    }, this.tran.translate('NEW_ITEM_HEADER')), this.state.categoryId != 0 ? React.createElement(Label, {
      className: "g-line-height-1_8 g-letter-spacing-1  g-mb-20"
    }, this.tran.translate('NEW_ITEM_SELL_CATEGORY_SET_HEADER', ...[this.state.categoryName])) : React.createElement("span", null)), React.createElement(Row, null, React.createElement(Col, {
      xs: "12"
    }, this.props.offerItem.catOptions.filter(item => {
      return Number(item.order) <= -10;
    }).sort((a, b) => {
      return Number(a.order) > Number(b.order) ? 1 : -1;
    }).map(item => {
      return React.createElement(CategoryOptionTempFormMapper, {
        catOption: item,
        categoryIcon: this.state.categoryIcon,
        onChange: (catOption, values) => {
          //    console.log(event.currentTarget.value);
          //  console.log(item.id);
          let res = values.map(el => {
            el.co_id = item.id;
            return el;
          });
          this.state.categoryOptionValues = this.state.categoryOptionValues.filter(el => {
            return el.co_id != item.id;
          });
          this.state.categoryOptionValues.push(...res);
          console.log(this.state.categoryOptionValues);
        }
      });
    })), !this.state.categoryId ? React.createElement(Col, {
      xs: "5"
    }, React.createElement(CategoryTreePreview, {
      setOnlyLeaf: true,
      categoryId: this.state.categoryId,
      onClick: this.onClickTree.bind(this)
    })) : React.createElement(Col, {
      xs: "6"
    }, this.props.offerItem.catOptions.filter(item => {
      return Number(item.order) < 0 && Number(item.order) > -10;
    }).sort((a, b) => {
      return Number(a.order) > Number(b.order) ? 1 : -1;
    }).map(item => {
      return React.createElement(CategoryOptionTempFormMapper, {
        catOption: item,
        categoryIcon: this.state.categoryIcon,
        onChange: (catOption, values) => {
          let res = values.map(el => {
            el.co_id = item.id;
            return el;
          });
          this.state.categoryOptionValues = this.state.categoryOptionValues.filter(el => {
            return el.co_id != item.id;
          });
          this.state.categoryOptionValues.push(...res);
          console.log(this.state.categoryOptionValues);
        }
      });
    })), React.createElement(Col, {
      xs: "6",
      className: "g-pt-20"
    }, React.createElement(TextBox, {
      placeholder: phTrans.translate('ITEM_NAME_PLACEHOLDER'),
      isRequired: true,
      label: this.tran.translate('ITEM_NAME_LABEL'),
      value: this.state.name,
      onChange: this.nameHandler.bind(this),
      field: "name",
      validation: this.state.validation
    }), React.createElement(TextArea, {
      placeholder: phTrans.translate('ITEM_DESCRIPTION_PLACEHOLDER'),
      isRequired: true,
      label: this.tran.translate('ITEM_DESCRIPTION_LABEL'),
      value: this.state.description,
      onChange: this.descriptionHandler.bind(this),
      field: "name",
      validation: this.state.validation
    }), React.createElement(TagComponent, {
      onChange: this.onTagChange.bind(this),
      label: this.tran.translate('ITEM_TAGS_LABEL'),
      tags: this.state.tags,
      field: "tag",
      validation: this.state.validation
    }), this.props.offerItem.catOptions.filter(item => {
      return Number(item.order) >= 0;
    }).sort((a, b) => {
      return Number(a.category_link[0].order ? a.category_link[0].order : a.order) > Number(b.category_link[0].order ? b.category_link[0].order : b.order) ? 1 : -1;
    }).map(item => {
      return React.createElement(CategoryOptionTempFormMapper, {
        catOption: item,
        categoryIcon: this.state.categoryIcon,
        onChange: (catOption, values) => {
          let res = values.map(el => {
            el.co_id = item.id;
            return el;
          });
          this.state.categoryOptionValues = this.state.categoryOptionValues.filter(el => {
            return el.co_id != item.id;
          });
          this.state.categoryOptionValues.push(...res);
          console.log(this.state.categoryOptionValues);
        }
      });
    }))), this.state.categoryId != 0 ? React.createElement("center", {
      className: "text-center"
    }, React.createElement("button", {
      onClick: this.submitHandler.bind(this),
      type: "button",
      className: "btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md"
    }, this.tran.translate('SAVE_NEW_ITEM_LINK'), " ")) : React.createElement("span", null));
    return body;
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
        type: USER_ACCOUNTS_ACTION.OPEN_LIGHTBOX,
        dto: {
          images: images,
          activeImage: activeImage
        }
      });
    },
    getCategoryOptions: category_id => {
      return dispatch(new BaseService().queryThunt(QueryList.CategoryOptions.GET_CATEGORY_OPTION, {
        id: category_id
      }));
    },
    createNewItem: dto => {
      return dispatch(new BaseService().commandThunt(CommandList.Item.NEW_ITEM, dto));
    },
    getUserImages: dto => {
      return dispatch(new BaseService().queryThunt(QueryList.Blob.GET_USER_IMAGES, dto, null));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOfferItem);
//# sourceMappingURL=index.js.map