// @ts-nocheck
"use strict";
import BaseDTO from '../../BaseObjects/baseDTO';
import Validator from 'better-validator';

export default class RegionDTO extends BaseDTO {
    constructor() {
        super();
        this.id = '';
        this.name = '';
        this.status = '';
        this.country_id = '';
        this.uid = '';
        this.name = '';
        this.name_clear = '';
        this.longitude = ''
        this.latitude = '';
    };
    validation(state) {

    };
}

