"use strict";

import Validator from 'better-validator';
import BaseDTO from '../../BaseObjects/baseDTO';

export default class BlobMapperDTO  extends BaseDTO {
  constructor() {
    super();
    this.id=0;
    this.stream_guid='';
  };

}