"use strict";
import Validator from "better-validator";
import BaseDTO from "../../BaseObjects/baseDTO";

export default class BlobBase64DTO extends BaseDTO {
  constructor() {
    super();

    this.blob = 0; //: DataTypes.INTEGER,
    this.type = 0; //: DataTypes.INTEGER,
    this.uid = '';
  }
  decode(bas64) {
    // @ts-ignore
    let decodedBase = decodeBase64Image(bas64);
    this.blob = decodedBase.data;
    this.type = decodedBase.type;
  }

  /**
   * RETURN in kB
   * @param  {UploadBlobDTO} blob
   * @return
   * @memberof UploadBlobDTO
   */
  getSize(blob) {
    // @ts-ignore
    return stringToBytesFaster(blob.blob).length / 1000;
  }
}
