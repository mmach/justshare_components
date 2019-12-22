// @ts-nocheck
"use strict";
import BaseDTO from "../../BaseObjects/baseDTO";
import Validator from "better-validator";

export default class UserAuthsDTO extends BaseDTO {
  constructor() {
    super();
    this.user_id='';
    this.socialUser_id='';
    this.socialType='';
  }
  validation(state) {
    
  }
  log() {
    return {
     
    };
  }
}

