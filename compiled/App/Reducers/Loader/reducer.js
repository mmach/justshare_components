import { combineReducers } from 'redux';
import { LOADER_ACTIONS } from './actions';
export default function LoaderReducer(state = {
  INITIAL_ACTION_LOADING: false
}, action) {
  switch (action.type) {
    case LOADER_ACTIONS.SET_INITIAL_ACTION:
      {
        let _state = Object.assign({}, state);

        _state.INITIAL_ACTION_LOADING = true;
        return _state;
      }

    case LOADER_ACTIONS.FINISH_INITIAL_ACTION:
      {
        let _state = Object.assign({}, state);

        _state.INITIAL_ACTION_LOADING = false;
        return _state;
      }

    default:
      {
        return state;
      }
  }
}