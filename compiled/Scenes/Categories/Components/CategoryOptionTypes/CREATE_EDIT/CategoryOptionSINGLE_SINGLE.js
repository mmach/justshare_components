/*
    ./client/components/App.jsx
*/
import React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Container, Form, Row } from 'reactstrap';
import translate from 'translate';
import uuidv4 from "uuid/v4";
import CommandList from '../../../../../Shared/CommandList';
import CategoryOptionsTemplateDTO from '../../../../../Shared/DTO/CategoryOptions/CategoryOptionsTemplateDTO';
import BaseService from '../../../../../App/Architecture/baseServices.js';
import ButtonLoader from '../../../../../Components/FormComponent/Components/ButtonLoader/index.jsx';
import Checkbox from '../../../../../Components/FormComponent/Components/Checkbox/index.jsx';
import TextBox from '../../../../../Components/FormComponent/Components/TextBox/index.jsx';
import { Translator } from './../../../../../Shared/index.js';

class CategoryOptionSINGLE_SINGLE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.getCategoryOptionsTypeQuery = [];
    this.state.validation = [];
    this.state.type = {};
    this.state.catOption = Object.assign(new CategoryOptionsTemplateDTO(), this.props.catSingleOption);
    this.state.isSubmitLoading = false;
    this.state.toRefresh = false;
    this.state.isDeleteLoading = false;
  }

  componentDidMount() {}

  refreshValidation() {
    if (this.state.toRefresh) {
      setTimeout(() => {
        this.validation();
      });
    }
  }

  translateSubmit(event) {
    let lang = event.target.value;
    let langFrom = this.state.catOption.lang ? this.state.catOption.lang : this.props.lang;

    if (langFrom == 'zh_cn') {
      langFrom = 'zh';
    } else if (langFrom == 'us') {
      langFrom = 'en';
    }

    translate(this.state.catOption.placeholder, {
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
      de["placeholder_" + lang] = text;
      console.log(de);
      this.setState({
        catOption: de
      });
      this.refreshValidation();
    });
  }

  validation() {
    let validation = CategoryOptionsTemplateDTO.prototype.validation(this.state.catOption);
    console.log(validation);
    this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
    validation = validation.map(item => {
      item.msg = this.tran.translate(item.failed, [item]);
      return item;
    });
    this.setState({
      validation: validation
    });
    return validation;
  }

  submitHanlder(event) {
    //this.state.catOption.id=uuidv4();
    this.state.catOption.co_id = this.props.coId;
    this.state.catOption.cott_id = this.props.cottId;
    this.state.catOption.type = this.props.type; //this.state.catOption.co_id = ;
    //this.cott_id = '';

    this.setState({
      toRefresh: true,
      isSubmitLoading: true
    });
    let validator = this.validation();
    let id = this.state.catOption.id ? this.state.catOption.id : uuidv4();

    if (validator.length == 0) {
      this.state.catOption.id = id;
      this.state.catOption.status = 1;
      this.props.upsertCatOption(this.state.catOption).then(succ => {
        this.setState({
          catOption: this.state.catOption,
          isSubmitLoading: false
        });
      });
    } else {
      this.setState({
        isSubmitLoading: false
      });
    } //   }

  }

  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    return React.createElement(Container, {
      className: "g-ma-10"
    }, React.createElement(Form, {
      className: "text-center"
    }, React.createElement(Col, {
      className: "text-center mx-auto g-max-width-600 g-mb-20"
    }, React.createElement("label", {
      className: "g-line-height-1_8 g-letter-spacing-1  g-mb-20 form-control-label"
    }, tran.translate('CATEGORY_OPTION_DETAILS_HEADER')), React.createElement("br", null), React.createElement("h2", {
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
      value: this.state.catOption.placeholder,
      onChange: event => {
        this.state.catOption.placeholder = event.target.value;
        this.refreshValidation.bind(this)();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "placeholder",
      validation: this.state.validation
    }), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_PL_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_PL_LABEL'),
      value: this.state.catOption.placeholder_pl,
      onChange: event => {
        this.state.catOption.placeholder_pl = event.target.value;
        this.refreshValidation.bind(this)();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "placeholder_pl",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(Button, {
      value: "pl",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0",
      isLoading: this.state.isLoading
    }, "pl"))), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_US_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_US_LABEL'),
      value: this.state.catOption.placeholder_us,
      onChange: event => {
        this.state.catOption.placeholder_us = event.target.value;
        this.refreshValidation.bind(this)();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "placeholder_us",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(Button, {
      value: "en",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0",
      isLoading: this.state.isLoading
    }, "en"))), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_DE_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_DE_LABEL'),
      value: this.state.catOption.placeholder_de,
      onChange: event => {
        this.state.catOption.placeholder_de = event.target.value;
        this.refreshValidation.bind(this)();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "placeholder_de",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(Button, {
      value: "de",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0",
      isLoading: this.state.isLoading
    }, "de"))), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_RU_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_RU_LABEL'),
      value: this.state.catOption.placeholder_ru,
      onChange: event => {
        this.state.catOption.placeholder_ru = event.target.value;
        this.refreshValidation.bind(this)();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "placeholder_ru",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(Button, {
      value: "ru",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0",
      isLoading: this.state.isLoading
    }, "ru"))), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_FR_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_FR_LABEL'),
      value: this.state.catOption.placeholder_fr,
      onChange: event => {
        this.state.catOption.placeholder_fr = event.target.value;
        this.refreshValidation.bind(this)();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "placeholder_fr",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(Button, {
      value: "fr",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0",
      isLoading: this.state.isLoading
    }, "fr"))), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_ES_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_ES_LABEL'),
      value: this.state.catOption.placeholder_es,
      onChange: event => {
        this.state.catOption.placeholder_es = event.target.value;
        this.refreshValidation.bind(this)();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "placeholder_es",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(Button, {
      value: "es",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0",
      isLoading: this.state.isLoading
    }, "es"))), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_NO_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_NO_LABEL'),
      value: this.state.catOption.placeholder_no,
      onChange: event => {
        this.state.catOption.placeholder_no = event.target.value;
        this.refreshValidation.bind(this)();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "placeholder_no",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(Button, {
      value: "no",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0",
      isLoading: this.state.isLoading
    }, "no"))), React.createElement(Row, null, React.createElement(Col, null, React.createElement(TextBox, {
      placeholder: phTrans.translate('OPTION_NAME_ZH_CN_PLACEHOLDER'),
      isRequired: true,
      label: tran.translate('OPTION_NAME_ZH_CN_LABEL'),
      value: this.state.catOption.placeholder_zh_cn,
      onChange: event => {
        this.state.catOption.placeholder_zh_cn = event.target.value;
        this.refreshValidation.bind(this)();
        this.setState({
          catOption: this.state.catOption
        });
      },
      field: "placeholder_zh_cn",
      validation: this.state.validation
    })), React.createElement(Col, {
      xs: "3"
    }, React.createElement(Button, {
      value: "zh",
      onClick: this.translateSubmit.bind(this),
      size: "md",
      className: "btn  rounded-0",
      isLoading: this.state.isLoading
    }, "zh"))), React.createElement(ButtonLoader, {
      onClick: this.submitHanlder.bind(this),
      size: "md",
      className: "btn g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase u-btn-primary rounded-0",
      value: "Submit",
      isLoading: this.state.isSubmitLoading
    })));
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
    upsertCatOption: dto => {
      return dispatch(new BaseService().commandThunt(CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS_TEMPLATE, dto));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryOptionSINGLE_SINGLE);
//# sourceMappingURL=CategoryOptionSINGLE_SINGLE.js.map