"use strict";

import BaseDTO from '../../BaseObjects/baseDTO';
import Validator from 'better-validator';
import CategoryDTO from './CategoryDTO';
export default class CategoryHierarchyDTO extends BaseDTO {
  constructor() {
    super();
    this.id=0;
    this.category_child_id=0;
    this.category_parent_id=0;
  };

}
