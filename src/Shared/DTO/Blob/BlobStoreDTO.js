"use strict";
import Validator from 'better-validator';
import BaseDTO from '../../BaseObjects/baseDTO';

export default class BlobStoreDTO  extends BaseDTO {
  constructor() {
    super();
    this.stream_id=''
    this.file_stream=''
    this.name=''
    this.path_locator=''
    this.parent_path_locator=''
    this.file_type=''
  };

}

