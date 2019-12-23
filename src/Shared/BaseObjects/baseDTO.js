"use strict";
import uuidv4 from "uuid/v4";

export default class BaseDTO {
    constructor() {
        this.id = uuidv4()
        this.uid=''
    };
    validation(state) {
        return [];
    }
    log() {
        return this;
    }
};
