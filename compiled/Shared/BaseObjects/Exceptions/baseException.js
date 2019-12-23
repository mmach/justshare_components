"use strict";

export default class BaseException {
  constructor({}) {
    this.error = {
      status: '',
      message: {
        pl: '',
        us: ''
      },
      code: '',
      type: '',
      validations: [],
      field: ''
    };
  }

}
;
//# sourceMappingURL=baseException.js.map