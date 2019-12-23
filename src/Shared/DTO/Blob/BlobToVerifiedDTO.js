"use strict";
import Validator from 'better-validator';
import BaseDTO from '../../BaseObjects/baseDTO';

export default class BlobToVerifiedDTO extends BaseDTO {
  constructor() {
    super();

    this.page = 0;//: DataTypes.INTEGER,
    this.size = 0;//: DataTypes.INTEGER,
   
  };

}

