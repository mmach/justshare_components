import { combineReducers } from 'redux';
import MODAL_ACTIONS from './actions';
let emptyState = {
  open: false,
  action: "login"
};
export default function ModalComponentReducer(state = Object.assign({}, emptyState), action) {
  switch (action.type) {
    case MODAL_ACTIONS.OPEN_MODAL:
      {
        const result = Object.assign({}, state);
        result.open = action.dto.open;
        result.action = action.dto.action;
        result.param = action.dto.param;
        return result;
      }

    case MODAL_ACTIONS.CLOSE_MODAL:
      {
        const result = Object.assign({}, state);
        result.open = false;
        return result;
      }

    default:
      {
        return state;
      }
  }
}
//# sourceMappingURL=reducer.js.map