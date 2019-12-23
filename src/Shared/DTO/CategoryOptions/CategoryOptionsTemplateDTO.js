import BaseDTO from "../../BaseObjects/baseDTO";
import Validator from 'better-validator';


export default class CategoryOptionsTemplateDTO extends BaseDTO {
    constructor() {
        super();
        this.id = '';
        this.co_id = '';
        this.cott_id = '';
        this.type = '';
        this.placeholder = '';
        this.placeholder_pl = '';
        this.placeholder_us = '';
        this.placeholder_de = '';
        this.placeholder_ru = '';
        this.placeholder_fr = '';
        this.placeholder_es = '';
        this.placeholder_no = '';
        this.placeholder_zh_cn = '';
        this.value = '';
        this.value_pl = '';
        this.value_us = '';
        this.value_de = '';
        this.value_ru = '';
        this.value_fr = '';
        this.value_es = '';
        this.value_no = '';
        this.value_zh_cn = '';
        this.status = '';
        this.order = '';
        this.is_not_in_clob = false
        this.func = undefined;
        this.is_visible_view= undefined;

    }
    validation(state) {

        const validator = new Validator();
        console.log(state);
        if (state.value == '' && state.placeholder == '') {
            validator(state.value).display("value").isString().notEmpty()
            validator(state.placeholder).display("placeholder").isString().notEmpty()
            return validator.run();

        }
        if (state.placeholder) {
            return validator.run();
        }
        validator(state.name).display("type").isString().notEmpty()
        if (state.value != '') {
            validator(state.value).display("value").isString().notEmpty()
            validator(state.value_pl).display("value_pl").isString().notEmpty()
            validator(state.value_us).display("value_us").isString().notEmpty()
            validator(state.value_de).display("value_de").isString().notEmpty()
            validator(state.value_ru).display("value_ru").isString().notEmpty()
            validator(state.value_fr).display("value_fr").isString().notEmpty()
            validator(state.value_es).display("value_es").isString().notEmpty()
            validator(state.value_no).display("value_no").isString().notEmpty()
            validator(state.value_zh_cn).display("value_zh_cn").isString().notEmpty()
        }
        if (['float', 'long'].includes(state.type)) {
            validator(Number(state.value)).display("value").isNumber()
            validator(Number(state.value_pl)).display("value_pl").isNumber()
            validator(Number(state.value_us)).display("value_us").isNumber()
            validator(Number(state.value_de)).display("value_de").isNumber()
            validator(Number(state.value_ru)).display("value_ru").isNumber()
            validator(Number(state.value_fr)).display("value_fr").isNumber()
            validator(Number(state.value_es)).display("value_es").isNumber()
            validator(Number(state.value_no)).display("value_no").isNumber()
            validator(Number(state.value_zh_cn)).display("value_zh_cn").isNumber()

        }


        //validator(state.surname).display("surname").isString()

        return validator.run();
    };
}
