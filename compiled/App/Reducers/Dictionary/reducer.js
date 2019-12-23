import { combineReducers } from 'redux';
import DICTIONARY_ACTIONS from './actions';
export default function DictionaryReducer(state = {
  data: {
    INFO: [],
    ERROR: [],
    INFO_GLOBAL: [],
    ERROR_GLOBAL: [],
    LABEL: [],
    VALIDATION: [],
    WARNING: [],
    SUCCESS: [],
    WARNING_GLOBAL: [],
    SUCCESS_GLOBAL: [],
    PLACEHOLDER: [],
    EMAIL: []
  },
  edit: {
    isLoading: false
  }
}, action) {
  switch (action.type) {
    case DICTIONARY_ACTIONS.ADD_DICTIONARY_FETCH.SUCCESS:
      {
        const result = Object.assign({}, state);
        result.data[action.dto.type][action.dto.code] = action.dto; //       result.edit.isLoading = false;

        return result;
      }

    case DICTIONARY_ACTIONS.GET_DICTIONARY_FETCH.SUCCESS:
      {
        const result = Object.assign({}, state);
        result.data = Object.assign({}, result.data, action.data);
        return result;
      }

    case DICTIONARY_ACTIONS.REMOVE_DICTIONARY_FETCH.SUCCESS:
      {
        const result = Object.assign({}, state);
        delete result.data[action.dto.type][action.dto.code];
        return result;
      }

    case DICTIONARY_ACTIONS.ADD_DICTIONARY_FETCH.LOADING:
      {
        const result = Object.assign({}, state);
        result.edit.isLoading = true;
        return result;
      }

    case DICTIONARY_ACTIONS.ADD_DICTIONARY_FETCH.FINALLY:
      {
        const result = Object.assign({}, state);
        result.edit.isLoading = false;
        return result;
      }

    default:
      {
        return state;
      }
  }
}