import { combineReducers } from 'redux';
import { LOADER_ACTIONS } from './actions';
export default function LoaderReducer(state = {
  BODY_ACTION: [],
  CONTAINER_ACTION: [],
  INITIAL_ACTION: [],
  INITIAL_PROGRESS: 0,
  BODY_PROGRESS: 0,
  CONTAINER_PROGRESS: 0
}, action) {
  switch (action.type) {
    case LOADER_ACTIONS.SET_INITIAL_ACTION:
      {
        let _state = Object.assign({}, state);

        let counter = 0;

        _state.INITIAL_ACTION.push({
          action: action.actionName,
          result: false
        });

        _state.INITIAL_ACTION = state.INITIAL_ACTION.map(item => {
          if (item.result == false) {
            counter++;
          }

          return item;
        });
        _state.INITIAL_PROGRESS = counter / _state.INITIAL_ACTION.length;
        return _state;
      }

    case LOADER_ACTIONS.SET_CONTAINER_ACTION:
      {
        let _state = Object.assign({}, state);

        let counter = 0;

        _state.CONTAINER_ACTION.push({
          action: action.actionName,
          result: false
        });

        _state.CONTAINER_ACTION = state.CONTAINER_ACTION.map(item => {
          if (item.result == false) {
            counter++;
          }

          return item;
        });
        _state.BODY_PROGRESS = counter / _state.CONTAINER_ACTION.length;
        return _state;
      }

    case LOADER_ACTIONS.SET_BODY_ACTION:
      {
        let _state = Object.assign({}, state);

        let counter = 0;

        _state.BODY_ACTION.push({
          action: action.actionName,
          result: false
        });

        _state.BODY_ACTION = state.BODY_ACTION.map(item => {
          if (item.result == false) {
            counter++;
          }

          return item;
        });
        _state.BODY_PROGRESS = counter / _state.BODY_ACTION.length;
        return _state;
      }

    case LOADER_ACTIONS.FINISH_BODY_ACTION:
      {
        let _state = Object.assign({}, state);

        let isFinish = true;
        let counter = 0;
        _state.BODY_ACTION = state.BODY_ACTION.map(item => {
          if (item.action == action.actionName) {
            item.result = true;
          }

          if (item.result == false) {
            isFinish = false;
          }

          if (item.result == true) {
            counter++;
          }

          return item;
        });

        if (isFinish == true) {
          _state.BODY_ACTION = [];
        }

        _state.BODY_PROGRESS = Math.round(counter / _state.BODY_ACTION.length * 100);
        ;
        return _state;
      }

    case LOADER_ACTIONS.FINISH_CONTAINER_ACTION:
      {
        let _state = Object.assign({}, state);

        let isFinish = true;
        let counter = 0;
        _state.CONTAINER_ACTION = state.CONTAINER_ACTION.map(item => {
          if (item.action == action.actionName) {
            item.result = true;
          }

          if (item.result == false) {
            isFinish = false;
          }

          if (item.result == true) {
            counter++;
          }

          return item;
        });

        if (isFinish == true) {
          _state.CONTAINER_ACTION = [];
        }

        _state.CONTAINER_PROGRESS = Math.round(counter / _state.CONTAINER_ACTION.length * 100);
        ;
        return _state;
      }

    case LOADER_ACTIONS.FINISH_INITIAL_ACTION:
      {
        let _state = Object.assign({}, state);

        let isFinish = true;
        let counter = 0;
        _state.INITIAL_ACTION = state.INITIAL_ACTION.map(item => {
          if (item.action == action.actionName) {
            item.result = true;
          }

          if (item.result == false) {
            isFinish = false;
          }

          if (item.result == true) {
            counter++;
          }

          return item;
        });

        if (isFinish == true) {
          _state.INITIAL_ACTION = [];
        }

        _state.INITIAL_PROGRESS = Math.round(counter / _state.INITIAL_ACTION.length * 100);
        ;
        return _state;
      }

    default:
      {
        return state;
      }
  }
}
//# sourceMappingURL=reducer.1.js.map