import BaseDTO from "../../BaseObjects/baseDTO";
import Validator from 'better-validator';


export default class CategoryOptionsLinkDTO extends BaseDTO {
    constructor() {
        super();
        this.id = '';
        this.co_id = '';
        this.category_id = '';
        this.order = '';
        this.is_searchable = ''
        this.is_require = ''
        this.limit_of = ''
        this.is_on_pin_map = false
        this.is_on_map = false
        this.is_form_hidden=false;
        this.search_label = undefined
        this.search_type = undefined
        this.show_value = undefined
        this.can_above_pin = undefined;
        this.is_visible_view= undefined;

    }
    validation(state) {

     


        //validator(state.surname).display("surname").isString()

        return validator.run();
    };
}
