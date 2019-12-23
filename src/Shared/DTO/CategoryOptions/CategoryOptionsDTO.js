import BaseDTO from "../../BaseObjects/baseDTO";
import Validator from 'better-validator';


export default class CategoryOptionsDTO extends BaseDTO {
    constructor() {
        super();

        this.cot_id = '';
        this.type = '';
        this.name = '';
        this.name_pl = '';
        this.name_us = '';
        this.name_de = '';
        this.name_ru = '';
        this.name_fr = '';
        this.name_es = '';
        this.name_no = '';
        this.name_zh_cn = '';
        this.status = '';
        this.order = '';
        this.is_searchable = ''
        this.is_require = ''
        this.limit_of = ''
        this.is_on_pin_map = false
        this.is_on_map = false
        this.is_form_hidden = false;
        this.search_label = undefined
        this.search_type = undefined
        this.show_value = undefined
        this.can_above_pin = undefined;
        this.is_visible_view= undefined;
    }
    validation(state) {
        const validator = new Validator();
        validator(state.name).display("name").isString().notEmpty();
        ["pl", "us", "de", "ru", "fr", "es", "no", "zh_cn"].map(item => {
            validator(state["name_" + item]).display("name_" + item).isString().notEmpty();

        })
        /*
        validator(state.name_pl).display("name_pl").isString().notEmpty();
        validator(state.name_us).display("name_us").isString().notEmpty();
        validator(state.name_de).display("name_de").isString().notEmpty();
        validator(state.name_ru).display("name_ru").isString().notEmpty();
        validator(state.name_fr).display("name_fr").isString().notEmpty();
        validator(state.name_es).display("name_es").isString().notEmpty();
        validator(state.name_no).display("name_no").isString().notEmpty();
        validator(state.name_zh_cn).display("name_zh_cn").isString().notEmpty();
        */
        validator(state.type).display("type").isString().notEmpty();
        validator(state.cot_id).display("cot_id").isString().notEmpty();

        //validator(state.surname).display("surname").isString().notEmpty();

        return validator.run();
    };
}
