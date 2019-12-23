import React from 'react';
import Collapsible from 'react-collapsible';
import { connect } from 'react-redux';
import { Button, Col, Container, Form, FormGroup, ListGroup, Row } from 'reactstrap';
import translate from 'translate';
import uuidv4 from "uuid/v4";
import CommandList from '../../../../../../../Shared/CommandList';
import CategoryOptionsDTO from '../../../../../../../Shared/DTO/CategoryOptions/CategoryOptionsDTO';
import QueryList from '../../../../../../../Shared/QueryList';
import { BaseService } from '../../../../../../App/Architecture/baseServices.js';
import ButtonLoader from '../../../../../Components/FormComponent/Components/ButtonLoader/index.js';
import TextBox from '../../../../../Components/FormComponent/Components/TextBox/index.jsx';
import { Translator } from './../../../../../../../Shared/index.js';
import CATEGORY_EDIT_ACTIONS from './../../../Scenes/EditCategory/actions.js';
import CategoryOptionSINGLE_SINGLE from './CategoryOptionSINGLE_SINGLE.jsx';
import Checkbox from '../../../../../Components/FormComponent/Components/Checkbox/index.jsx';

class CategoryOptionBETWEEN extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.validation = [];
    this.state.toRefresh = false;
    this.state.type = {};
    this.state.catOption = Object.assign(new CategoryOptionsDTO(), this.props.catOption);
    this.state.catOption.cot_id = this.props.catOptionsTemp.id;
    this.state.catOption.category_id = this.state.catOption.category_id ? this.state.catOption.category_id : this.props.category_id;
    this.state.catOption.order = 1;

    if (this.state.catOption.status == 1 && this.props.catOption.cat_opt_temp == undefined && this.props.catOption.cat_opt_temp.length == 0) {
      props.addEmptyElementOption(uuidv4(), this.state.catOption.id);
      props.addEmptyElementOption(uuidv4(), this.state.catOption.id);
    }

    this.state.catOption.cat_opt = this.state.catOption.cat_opt ? this.state.catOption.cat_opt : {};
    this.state.isSubmitLoading = false;
    this.state.isDeleteLoadingg = false;
    this.state.cott_id = this.props.catOptionsTemp.cat_options_type_temp[0].id;
    this.state.cott_type = this.props.catOptionsTemp.cat_options_type_temp[0].type;
  }

  refreshValidation() {
    if (this.state.toRefresh) {
      setTimeout(() => {
        this.validation();
      });
    }
  }

  translateSubmit(event) {
    let lang = event.target.innerText;
    let langFrom = this.state.catOption.lang ? this.state.catOption.lang : this.props.lang;

    if (langFrom == 'zh_cn') {
      langFrom = 'zh';
    } else if (langFrom == 'us') {
      langFrom = 'en';
    }

    translate(this.state.catOption.name, {
      engine: 'yandex',
      key: 'trnsl.1.1.20190525T222610Z.47a7d82b340b189e.59764ef074ae84f21bed0836d101d4743a754577',
      from: langFrom,
      to: lang
    }).then(text => {
      console.log(text); // Hola mundo

      if (lang == 'zh') {
        lang = 'zh_cn';
      } else if (lang == 'en') {
        lang = 'us';
      }

      const de = this.state.catOption;
      de["name_" + lang] = text;
      console.log(de);
      this.setState({
        category: de
      });
      this.refreshValidation();
    });
  }

  validation() {
    let validation = CategoryOptionsDTO.prototype.validation(this.state.catOption);
    console.log(validation);
    this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
    validation = validation.map(item => {
      item.msg = this.tran.translate(item.failed, ...item.value);
      return item;
    });
    this.setState({
      validation: validation
    });
    return validation;
  }

  submitHanlder(event) {
    this.setState({
      isSubmitLoading: true,
      toRefresh: true
    });
    this.state.catOption.type = this.props.catOptionsTemp.type;
    this.state.catOption.cat_opt.name = this.props.catOptionsTemp.name;
    let validator = this.validation();
    let id = this.state.catOption.id ? this.state.catOption.id : uuidv4();

    if (validator.length == 0) {
      this.state.catOption.status = 1;
      this.state.catOption.id = id;

      if (this.state.catOption.cat_opt_temp == undefined) {
        this.state.catOption.cat_opt_temp = [];
        this.state.catOption.cat_opt_temp.push({
          id: uuidv4(),
          co_id: this.state.catOption.id,
          placeholder: 'NEW ELEMENT',
          order: 1
        });
        this.state.catOption.cat_opt_temp.push({
          id: uuidv4(),
          co_id: this.state.catOption.id,
          placeholder: 'NEW ELEMENT',
          order: 2
        });
      }

      this.props.upsertCategoryOptions(this.state.catOption).then(succ => {
        console.log('succ'); //window.location.reload();

        this.setState({
          isSubmitLoading: false
        });
      });
    } else {
      this.setState({
        isSubmitLoading: false
      });
    } //   }

  }

  removeHanlder(event) {
    this.setState({
      isDeleteLoadingg: true
    });
    this.props.deleteCategoryOptions(this.state.catOption).then(succ => {
      console.log('succ');
      this.setState({
        isDeleteLoadingg: false
      });
    }); //   }
  }

  typeHandler(event) {
    let catOption = this.state.catOption;
    catOption.type = event.target.value;
    this.setState({
      catOption: catOption
    });
    this.refreshValidation();
  }

  addNewOption(event) {
    this.props.addEmptyElementOption(uuidv4(), this.state.catOption.id);
  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    return React.createElement(Container, {
      className: "g-ma-10"
    }, React.createElement(Form, {
      className: "text-center"
    }, React.createElement(Col, {
      className: "text-center mx-auto g-max-width-600 g-mb-10"
    }, React.createElement("h2", {
      className: "h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5"
    }, tran.translate('CATEGORY_OPTION_ADD_HEADER')), React.createElement("h2", {
      className: "h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5"
    }, this.state.catOption.id)), React.createElement(Checkbox, {
      placeholder: phTrans.translate('OPTION_IS_CLOB_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_IS_CLOB_LABEL'),
      value: this.state.catOption.is_not_in_clob,
      onChange: event => {
        this.state.catOption.is_not_in_clob = event.target.checked;
        this.refreshValidation();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "is_in_clob",
      validation: this.state.validation
    }), React.createElement(Checkbox, {
      placeholder: phTrans.translate('OPTION_IS_VISIBLE_VIEW_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_IS_VISIBLE_VIEW_LABEL'),
      value: this.state.catOption.is_visible_view,
      onChange: event => {
        this.state.catOption.is_visible_view = event.target.checked;
        this.refreshValidation();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "is_visible_view",
      validation: this.state.validation
    }), React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_LABEL'),
      value: this.state.catOption.name,
      onChange: event => {
        this.state.catOption.name = event.target.value;
        this.refreshValidation();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "name",
      validation: this.state.validation
    }), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_PL_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_PL_LABEL'),
      value: this.state.catOption.name_pl,
      onChange: event => {
        this.state.catOption.name_pl = event.target.value;
        this.refreshValidation();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "name_pl",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(ButtonLoader, {
      value: "pl",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0"
    }))), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_US_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_US_LABEL'),
      value: this.state.catOption.name_us,
      onChange: event => {
        this.state.catOption.name_us = event.target.value;
        this.refreshValidation();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "name_us",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(ButtonLoader, {
      value: "en",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0"
    }))), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_DE_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_DE_LABEL'),
      value: this.state.catOption.name_de,
      onChange: event => {
        this.state.catOption.name_de = event.target.value;
        this.refreshValidation();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "name_de",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(ButtonLoader, {
      value: "de",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0"
    }))), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_RU_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_RU_LABEL'),
      value: this.state.catOption.name_ru,
      onChange: event => {
        this.state.catOption.name_ru = event.target.value;
        this.refreshValidation();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "name_ru",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(ButtonLoader, {
      value: "ru",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0"
    }))), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_FR_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_FR_LABEL'),
      value: this.state.catOption.name_fr,
      onChange: event => {
        this.state.catOption.name_fr = event.target.value;
        this.refreshValidation();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "name_fr",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(ButtonLoader, {
      value: "fr",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0"
    }))), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_ES_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_ES_LABEL'),
      value: this.state.catOption.name_es,
      onChange: event => {
        this.state.catOption.name_es = event.target.value;
        this.refreshValidation();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "name_es",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(ButtonLoader, {
      value: "es",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0"
    }))), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_NO_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_NO_LABEL'),
      value: this.state.catOption.name_no,
      onChange: event => {
        this.state.catOption.name_no = event.target.value;
        this.refreshValidation();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "name_no",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(ButtonLoader, {
      value: "no",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0"
    }))), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_ZH_CN_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_ZH_CN_LABEL'),
      value: this.state.catOption.name_zh_cn,
      onChange: event => {
        this.state.catOption.name_zh_cn = event.target.value;
        this.refreshValidation();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "name_zh_cn",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(ButtonLoader, {
      value: "zh",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0"
    }))), React.createElement(ButtonLoader, {
      disabled: this.state.catOption.category_id != undefined && this.state.catOption.category_id != this.props.category_id,
      onClick: this.submitHanlder.bind(this),
      size: "md",
      className: "btn g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase u-btn-primary rounded-0",
      value: "Submit",
      isLoading: this.state.isSubmitLoading
    }), this.state.catOption.status == 1 ? React.createElement(ButtonLoader, {
      disabled: this.state.catOption.category_id != undefined && this.state.catOption.category_id != this.props.category_id,
      onClick: this.removeHanlder.bind(this),
      size: "md",
      className: "btn g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase u-btn-primary rounded-0",
      value: "Delete",
      isLoading: this.state.isDeleteLoadingg
    }) : React.createElement("span", null), React.createElement("hr", {
      className: "g-brd-gray-light-v4 g-my-50"
    }), this.state.catOption.status == 1 ? React.createElement(FormGroup, null, React.createElement(ListGroup, null, this.props.catOption.cat_opt_temp.map(item => {
      return React.createElement(Collapsible, {
        triggerDisabled: this.state.catOption.category_id != undefined && this.state.catOption.category_id != this.props.category_id,
        triggerClassName: "Collapsible__trigger_options",
        triggerOpenedClassName: "Collapsible__trigger_options",
        lazyRender: true,
        trigger: item.placeholder
      }, React.createElement(CategoryOptionSINGLE_SINGLE, {
        catSingleOption: item,
        coId: this.state.catOption.id,
        cottId: this.state.cott_id,
        type: this.state.cott_type,
        catOptId: this.state.catOption.id
      }));
    }))) : React.createElement("span", null)));
  }

}

const mapStateToProps = state => {
  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,
    catOptions: state.EditCategoryReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    upsertCategoryOptions: dto => {
      return dispatch(new BaseService().commandThunt(CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS, dto));
    },
    deleteCategoryOptions: dto => {
      return dispatch(new BaseService().commandThunt(CommandList.Category_Options.DELETE_CATEGORY_OPTIONS, dto));
    },
    addEmptyElementOption: (id, co_id) => {
      dispatch({
        type: CATEGORY_EDIT_ACTIONS.ADD_EMPTY_OPTION_ELEMENT,
        dto: {
          id: id,
          co_id: co_id
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionBETWEEN);