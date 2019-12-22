// @ts-nocheck
"use strict";
import BaseDTO from '../../BaseObjects/baseDTO';
import Validator from 'better-validator';

export default class UserDTO extends BaseDTO {
  constructor() {
    super();
    this.id = '';
    this.name = '';
    this.surname = '';
    this.email = '';
    this.salt = '';
    this.phone = '';
    this.birthDate = '';
    this.uid = ''
    this.is_authorized = '';
    this.passwordHash = '';
    this.city = '';
    this.city_id = '';
    this.adress = '';
    this.country = '';
    this.country_id = '';
    this.longitude = '';
    this.latitude = '';
    this.relogin_require = '';
    this.refresh_token = '';
    this.language='',
    this.blob_id='';
    this.is_admin='';
    this.is_root='';
    this.address='';
    this.city_id='';
    this.country_id='';
    this.zipcode='';
    this.city='';
  };
  validation(state) {
    const validator = new Validator();
    validator(state.name).display("name").required().isString().notEmpty();

    //validator(state.surname).display("surname").required().isString().notEmpty();

    validator(state.email).display("email").required();
    return validator.run();
  };
}

