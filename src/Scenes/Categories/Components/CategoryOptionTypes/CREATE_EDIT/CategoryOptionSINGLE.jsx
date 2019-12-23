import React from 'react';
import Collapsible from 'react-collapsible';
import { connect } from 'react-redux';
import { Col, Container, Form, FormGroup, ListGroup, Row } from 'reactstrap';
import translate from 'translate';
import uuidv4 from "uuid/v4";
import CommandList from '../../../../../Shared/CommandList';
import CategoryOptionsDTO from '../../../../../Shared/DTO/CategoryOptions/CategoryOptionsDTO';
import { BaseService } from '../../../../../App/Architecture/baseServices.js';
import ButtonLoader from '../../../../../Components/FormComponent/Components/ButtonLoader/index.jsx';
import Checkbox from '../../../../../Components/FormComponent/Components/Checkbox/index.jsx';
import TextBox from '../../../../../Components/FormComponent/Components/TextBox/index.jsx';
import { Translator } from './../../../../../Shared/index.js';
import CATEGORY_EDIT_ACTIONS from './../../../Scenes/EditCategory/actions.js';
import CategoryOptionSINGLE_SINGLE from './CategoryOptionSINGLE_SINGLE.jsx';


class CategoryOptionSINGLE extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state.validation = [];
        this.state.toRefresh = false;
        this.state.type = {};
        this.state.catOption = Object.assign(new CategoryOptionsDTO(), this.props.catOption);
        this.state.catOption.cot_id = this.props.catOptionsTemp.id;
        this.state.catOption.category_id = this.state.catOption.category_id ? this.state.catOption.category_id : this.props.category_id
        this.state.catOption.order = this.state.catOption.order ? this.state.catOption.order : 1
        if (this.props.catOption.cat_opt_temp == undefined || this.props.catOption.cat_opt_temp.length == 0) {
            this.props.addEmptyElementOption(uuidv4(), this.state.catOption.id, 1, "VALUE");

        }
        this.state.catOption.cat_opt = this.state.catOption.cat_opt ? this.state.catOption.cat_opt : {}
        this.state.isSubmitLoading = false;
        this.state.isDeleteLoadingg = false;
        this.state.cott_id = this.props.catOptionsTemp.cat_options_type_temp[0].id;
        this.state.cott_type = this.props.catOptionsTemp.cat_options_type_temp[0].type

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
        let langFrom = this.state.catOption.lang ? this.state.catOption.lang : this.props.lang
        if (langFrom == 'zh_cn') {
            langFrom = 'zh';
        } else if (langFrom == 'us') {
            langFrom = 'en';
        }
        translate(this.state.catOption.name, { engine: 'yandex', key: 'trnsl.1.1.20190525T222610Z.47a7d82b340b189e.59764ef074ae84f21bed0836d101d4743a754577', from: langFrom, to: lang }).then(text => {
            console.log(text);  // Hola mundo
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
        validation = validation.map((item) => {
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
        })
        this.state.catOption.type = this.props.catOptionsTemp.type;
        this.state.catOption.cat_opt.name = this.props.catOptionsTemp.name;
        let validator = this.validation();
        let id = this.state.catOption.id ? this.state.catOption.id : uuidv4();
        if (validator.length == 0) {
            this.state.catOption.status = 1;
            this.state.catOption.id = id
            if (this.state.catOption.cat_opt_temp == undefined) {
                this.state.catOption.cat_opt_temp = this.props.catOption.cat_opt_temp;

            }
            this.props.upsertCategoryOptions(this.state.catOption).then(succ => {

                console.log('succ');
                //window.location.reload();
                this.setState({
                    isSubmitLoading: false
                })
            })
        } else {
            this.setState({
                isSubmitLoading: false
            })
        }

        //   }
    }


    removeHanlder(event) {

        this.setState({
            isDeleteLoadingg: true
        })
        this.props.deleteCategoryOptions(this.state.catOption).then(succ => {
            console.log('succ');
            this.setState({
                isDeleteLoadingg: false
            })
        })


        //   }
    }

    typeHandler(event) {
        let catOption = this.state.catOption
        catOption.type = event.target.value
        this.setState({
            catOption: catOption
        });

        this.refreshValidation();
    }
    addNewOption(event) {
        this.props.addEmptyElementOption(uuidv4(), this.state.catOption.id)
    }

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        return (<Container className="g-ma-10">
            <Form className="text-center">
                <Col className="text-center mx-auto g-max-width-600 g-mb-10">
                    <h2 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{this.state.catOption.id}</h2>

                </Col>
                <Checkbox placeholder={phTrans.translate('OPTION_IS_SEARCHABLE_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_IS_SEARCHABLE_LABEL')} value={this.state.catOption.is_searchable} onChange={(event) => { this.state.catOption.is_searchable = event.target.checked; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="is_searchable" validation={this.state.validation} />
                <Checkbox placeholder={phTrans.translate('OPTION_IS_REQUIRE_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_IS_REQUIRE_LABEL')} value={this.state.catOption.is_require} onChange={(event) => { this.state.catOption.is_require = event.target.checked; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="is_require" validation={this.state.validation} />
                <Checkbox placeholder={phTrans.translate('OPTION_IS_ON_MAP_RESULT_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_IS_ON_MAP_RESULT_LABEL')} value={this.state.catOption.is_on_map} onChange={(event) => { this.state.catOption.is_on_map = event.target.checked; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="is_on_map" validation={this.state.validation} />
                <Checkbox placeholder={phTrans.translate('OPTION_IS_ON_MAP_TOOLTIP_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_IS_ON_MAP_TOOLTIP_LABEL')} value={this.state.catOption.is_on_pin_map} onChange={(event) => { this.state.catOption.is_on_pin_map = event.target.checked; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="is_on_pin_map" validation={this.state.validation} />
                <Checkbox placeholder={phTrans.translate('OPTION_HIDE_IN_FORM_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_HIDE_IN_FORM_LABEL')} value={this.state.catOption.is_form_hidden} onChange={(event) => { this.state.catOption.is_form_hidden = event.target.checked; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="is_form_hidden" validation={this.state.validation} />
                <Checkbox placeholder={phTrans.translate('OPTION_IS_VISIBLE_VIEW_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_IS_VISIBLE_VIEW_LABEL')} value={this.state.catOption.is_visible_view} onChange={(event) => { this.state.catOption.is_visible_view = event.target.checked; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="is_visible_view" validation={this.state.validation} />

                <TextBox placeholder={phTrans.translate('OPTION_LIMIT_OF_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_LIMIT_OF_LABEL')} value={this.state.catOption.limit_of} onChange={(event) => { this.state.catOption.limit_of = event.target.value; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="name" validation={this.state.validation} />
                <TextBox placeholder={phTrans.translate('OPTION_ORDER_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_ORDER_LABEL')} value={this.state.catOption.order} onChange={(event) => { this.state.catOption.order = event.target.value; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="order" validation={this.state.validation} />

                <TextBox placeholder={phTrans.translate('OPTION_NAME_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_NAME_LABEL')} value={this.state.catOption.name} onChange={(event) => { this.state.catOption.name = event.target.value; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="name" validation={this.state.validation} />

                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('OPTION_NAME_PL_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_NAME_PL_LABEL')} value={this.state.catOption.name_pl} onChange={(event) => { this.state.catOption.name_pl = event.target.value; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="name_pl" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="pl" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('OPTION_NAME_US_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_NAME_US_LABEL')} value={this.state.catOption.name_us} onChange={(event) => { this.state.catOption.name_us = event.target.value; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="name_us" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="en" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('OPTION_NAME_DE_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_NAME_DE_LABEL')} value={this.state.catOption.name_de} onChange={(event) => { this.state.catOption.name_de = event.target.value; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="name_de" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="de" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('OPTION_NAME_RU_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_NAME_RU_LABEL')} value={this.state.catOption.name_ru} onChange={(event) => { this.state.catOption.name_ru = event.target.value; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="name_ru" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="ru" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('OPTION_NAME_FR_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_NAME_FR_LABEL')} value={this.state.catOption.name_fr} onChange={(event) => { this.state.catOption.name_fr = event.target.value; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="name_fr" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="fr" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('OPTION_NAME_ES_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_NAME_ES_LABEL')} value={this.state.catOption.name_es} onChange={(event) => { this.state.catOption.name_es = event.target.value; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="name_es" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="es" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('OPTION_NAME_NO_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_NAME_NO_LABEL')} value={this.state.catOption.name_no} onChange={(event) => { this.state.catOption.name_no = event.target.value; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="name_no" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="no" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('OPTION_NAME_ZH_CN_PLACEHOLDER')} isRequired={true} label={tran.translate('OPTION_NAME_ZH_CN_LABEL')} value={this.state.catOption.name_zh_cn} onChange={(event) => { this.state.catOption.name_zh_cn = event.target.value; this.refreshValidation(); this.setState({ catOption: this.state.catOption }) }} field="name_zh_cn" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="zh" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} />
                    </Col>
                </Row>
                <ButtonLoader disabled={this.state.catOption.category_id != undefined && this.state.catOption.category_id != this.props.category_id} onClick={this.submitHanlder.bind(this)} size={"md"} className={"btn g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase u-btn-primary rounded-0"} value={"Submit"} isLoading={this.state.isSubmitLoading} />

                <hr class="g-brd-gray-light-v4 g-my-50" />
                {this.state.catOption.status == 1 ? (<FormGroup>
                    <ListGroup>
                        {this.props.catOption.cat_opt_temp ? this.props.catOption.cat_opt_temp.map(item => {
                            return <Collapsible triggerDisabled={this.state.catOption.category_id != undefined && this.state.catOption.category_id != this.props.category_id} triggerClassName="Collapsible__trigger_options" triggerOpenedClassName="Collapsible__trigger_options" lazyRender={true} trigger={item.placeholder}>
                                <CategoryOptionSINGLE_SINGLE catSingleOption={item} coId={this.state.catOption.id} cottId={this.state.cott_id} type={this.state.cott_type} catOptId={this.state.catOption.id}></CategoryOptionSINGLE_SINGLE>
                            </Collapsible>
                        }) : <span></span>}


                    </ListGroup>
                </FormGroup>) : <span></span>}
            </Form>
        </Container>)
    }
}


const mapStateToProps = (state) => {

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        catOptions: state.EditCategoryReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {

        upsertCategoryOptions: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS, dto));

        },
        deleteCategoryOptions: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Category_Options.DELETE_CATEGORY_OPTIONS, dto));

        },
        addEmptyElementOption: (id, co_id, order, name) => {
            dispatch({
                type: CATEGORY_EDIT_ACTIONS.ADD_EMPTY_OPTION_ELEMENT, dto: {
                    id: id,
                    co_id: co_id,
                    order: order,
                    placeholder: name
                }
            });

        }




    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryOptionSINGLE);

