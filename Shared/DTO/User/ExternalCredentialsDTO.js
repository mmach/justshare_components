// @ts-nocheck
"use strict";
import BaseDTO from '../../BaseObjects/baseDTO';
import Validator from 'better-validator';

export default class ExternalCredentialsDTO extends BaseDTO {
  constructor() {
    super();
    this.token = '';
    this.userId = '';
    this.email = '';
    this.provider = '';

  };
  validation(state) {

  };
}

