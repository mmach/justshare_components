"use strict";

import Validator from 'better-validator';
import BaseDTO from '../../BaseObjects/baseDTO';
export default class BlobDTO extends BaseDTO {
  constructor() {
    super();
    this.blob_id = 0; //: DataTypes.INTEGER,

    this.item_id = 0; //: DataTypes.INTEGER,

    this.blob_thumbmail_id = 0; //: DataTypes.INTEGER,

    this.blob_min_id = 0; //: DataTypes.INTEGER,

    this.user_id = 0; //{type: DataTypes.INTEGER}

    this.order = '1', this.status = 'V';
  }

}