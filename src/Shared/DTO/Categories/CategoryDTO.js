"use strict";

import BaseDTO from '../../BaseObjects/baseDTO';
import Validator from 'better-validator';

export default class CategoryDTO extends BaseDTO {
  constructor() {
    super();
    this.id = '';
    this.category = '';
    this.category_pl = '';
    this.category_us = '';
    this.category_de = '';
    this.category_ru = '';
    this.category_fr = '';
    this.category_es = '';
    this.category_no = '';
    this.category_zh_cn = '';
    this.forThing = 0;
    this.forEvent = 0;
    this.forSell = 0;
    this.icon = '';
    this.category_children = [];
    this.category_parent = '';
    this.status = 0;
    this.expired_day = '';
    this.CategoryHierarchy = {
      category_parent_id: ''
    };
  };

}
