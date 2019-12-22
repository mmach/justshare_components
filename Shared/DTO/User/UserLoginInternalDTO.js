// @ts-nocheck
"use strict";
import BaseDTO from "../../BaseObjects/baseDTO";
import Validator from "better-validator";

export default class UserLoginInternalDTO extends BaseDTO {
  constructor() {
    super();
    this.password='';
    this.email='';
  }
  validation(state) {
    const validator = new Validator();
    validator(state.password)
      .display("password")
      .required()
      .isString()
      .notEmpty();
    validator(state.email)
      .display("email")
      .required()
      .isString()
      .isEmail()
      .notEmpty();
    return validator.run();
  }
  log() {
    return {
      email: this.email,
      password: ""
    };
  }
}

