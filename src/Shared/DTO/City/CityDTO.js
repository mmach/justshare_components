// @ts-nocheck
"use strict";
import BaseDTO from '../../BaseObjects/baseDTO';
import Validator from 'better-validator';

export default class CityDTO extends BaseDTO {
    constructor() {
        super();
        this.id = '';
        this.name = '';
        this.status = '';
        this.region_id = '';
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

