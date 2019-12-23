// @ts-nocheck
"use strict";

import BaseDTO from "../../BaseObjects/baseDTO";
import Validator from "better-validator";
export default class ItemDTO extends BaseDTO {
  constructor() {
    super();
    this.name = "";
    this.description = "";
    this.user_id = "";
    this.clobSearch = "";
    this.clobSearch_pl = '';
    this.clobSearch_us = '';
    this.clobSearch_de = '';
    this.clobSearch_fr = '';
    this.clobSearch_ru = '';
    this.clobSearch_no = '';
    this.clobSearch_es = '';
    this.clobSearch_zh_cn = '';
    this.longitude = '';
    this.latitude = '';
    this.blob_id = '';
    this.category_id = '';
    this.category_type = 0;
    this.is_elastic_sync = false;
  }

  validation(state) {}

}