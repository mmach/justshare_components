// @ts-nocheck
"use strict";
import BaseDTO from "../../BaseObjects/baseDTO";
import Validator from "better-validator";

export default class UserForgotPasswordDTO extends BaseDTO {
  constructor() {
    super();
    this.email='';
  }
  validation(state) {
    const validator = new Validator();

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

