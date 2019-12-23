// @ts-nocheck
"use strict";
import BaseDTO from '../../BaseObjects/baseDTO';
import Validator from 'better-validator';

export default class ReverseGeoDTO extends BaseDTO {
    constructor() {
        super();
        this.id = '';
        this.city = '';
        this.country = '';
        this.address = '';
        this.longitude = '';
        this.latitude = '';



    };
    validation(state) {

    };
}

