import { CommandList, QueryList, Enums } from './../../../Shared/index.js';
import ActionsGen from '../../actions.js';
export const USER_ACTIONS = {
  LOG_IN_INTERNAL_FETCH: ActionsGen(QueryList.User.LOG_IN_INTERNAL),
  USER_INFO_FETCH: ActionsGen(QueryList.User.USER_INFO),
  LOG_IN_BY_REFRESH_TOKEN_FETCH: ActionsGen(QueryList.User.LOG_IN_BY_REFRESH_TOKEN),
  GET_REFRESH_TOKEN_FETCH: ActionsGen(QueryList.User.GET_REFRESH_TOKEN),
  CREATE_USER_FETCH: ActionsGen(CommandList.User.CREATE_USER),
  AUTHORIZE_USER_FETCH: ActionsGen(CommandList.User.AUTHORIZE_USER),
  GEN_REFRESH_TOKEN_FETCH: ActionsGen(CommandList.User.GEN_REFRESH_TOKEN),
  LOG_OUT_FETCH: ActionsGen(CommandList.User.LOG_OUT),
  CHANGE_PASSWORD_FETCH: ActionsGen(CommandList.User.CHANGE_PASSWORD),
  REMOVE_USER_FETCH: ActionsGen(CommandList.User.REMOVE_USER),
  FORGOT_PASSWORD_FETCH: ActionsGen(CommandList.User.FORGOT_PASSWORD),
  SET_LANGUAGE_FETCH: ActionsGen(CommandList.User.SET_LANGUAGE),
  SET_COORDIATES_FETCH: ActionsGen(CommandList.User.SET_COORDIATES) // OPEN_WINDOW: 'OPEN_WINDOW',
  //CLOSE_MODAL:'CLOSE_MODAL'

};