// @ts-nocheck
"use strict";
import BaseDTO from "../../BaseObjects/baseDTO";
import Validator from "better-validator";

export default class ChangePasswordDTO extends BaseDTO {
  constructor() {
    super();
    this.password='';
    this.repeatPassword='';
  }
  validation(state) {
    const validator = new Validator();
    validator(state.password)
      .display("password")
      .required()
      .isString()
      .notEmpty()
      .isEqual(state.repeatPassword);
    validator(state.repeatPassword)
      .display("repeatPassword")
      .required()
      .isString()
      .notEmpty()
      .isEqual(state.password);

    return validator.run();
  }
  log() {
    return {
     
    };
  }
}

