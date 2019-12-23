"use strict";

import BaseDTO from '../../BaseObjects/baseDTO';
import Validator from 'better-validator';
export default class UserRegisterInternalDTO extends BaseDTO {
  constructor() {
    super();
    this.name = '';
    this.surname = '';
    this.email = '';
    this.phone = '';
    this.birthDate = '';
    this.password = '';
    this.passwordRepeat = '';
    this.longitude = '';
    this.latitude = '';
    this.uuid = '';
    this.language = '';
    this.blob_id = null;
  }

  validation(state) {
    // @ts-ignore
    const validator = new Validator();
    validator(state.name).display("name").required().isString().notEmpty(); //validator(state.surname).display("surname").required().isString().notEmpty();

    validator(state.password).display("password").required().isString().notEmpty().isEqual(state.passwordRepeat);
    validator(state.passwordRepeat).display("passwordRepeat").required().isString().notEmpty().isEqual(state.password);
    validator(state.email).display("email").required().isString().isEmail().notEmpty();
    validator(state.phone).display("phone").required().isString().notEmpty();
    console.log('dupaaaaa');
    validator(state.birthDate ? state.birthDate.toString() : '').display("birthDate").required().isString().isDate().notEmpty();
    return validator.run();
  }

}