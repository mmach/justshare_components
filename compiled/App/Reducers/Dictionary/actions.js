import { CommandList, QueryList, Enums } from './../../../Shared/index.js';
import ActionsGen from '../../actions.js';
/*
 * action types
 */

let DICTIONARY_ACTIONS = {
  GET_DICTIONARY_FETCH: ActionsGen(QueryList.Dictionary.GET_DICTIONARY),
  ADD_DICTIONARY_FETCH: ActionsGen(CommandList.Dictionary.ADD_DICTIONARY),
  REMOVE_DICTIONARY_FETCH: ActionsGen(CommandList.Dictionary.REMOVE_DICTIONARY)
};
export default DICTIONARY_ACTIONS;