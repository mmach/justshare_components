// @ts-nocheck
"use strict";
import BaseDTO from '../../BaseObjects/baseDTO';
import  Validator from 'better-validator';
import  ConstValues from './../../BaseObjects/EnumsValues.js';

export default class DictionaryDTO extends BaseDTO {
    constructor() {
        super();
        this.code = '';
        this.status = "200";
        this.type = "INFO";
        this.message = {
            "pl": "",
            "us": "",
            "de": "",
            "ru": "",
            "fr": "",
            "es": "",
            "no": "",
            "zh_cn": ""

        };
        this.field = "";
    };
    validation(state) {
        const validator = new Validator();
        validator(Number(state.status)).display("status").required().isNumber().isInRange(100, 999);
        validator(state.type).display("type").required().isString().isIn(
            [
            ConstValues.CODE.INFO,
            ConstValues.CODE.VALIDATION,
            ConstValues.CODE.WARNING,
            ConstValues.CODE.LABEL,
            ConstValues.CODE.SUCCESS,
            ConstValues.CODE.PLACEHOLDER,
            ConstValues.CODE.ERROR_GLOBAL,
            ConstValues.CODE.INFO_GLOBAL,
            ConstValues.CODE.SUCCESS_GLOBAL,
            ConstValues.CODE.WARNING_GLOBAL,
            ConstValues.CODE.EMAIL]);
        validator(state.code).display("code").required().isString().notEmpty();
        validator(state.message.pl).display("message.pl").required().isString().notEmpty();
        validator(state.message.us).display("message.us").required().isString().notEmpty();
        return validator.run();
    };


};
