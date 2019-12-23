import CommandList from "../../../../Shared/CommandList";
import QueryList from "../../../../Shared/QueryList";
import ActionsGen from "../../../../App/actions";
import { NOTIFICATIONS_ACTIONS } from "../../../../App/Reducers/Notifications/actions";

const CATEGORY_TREE_ACTIONS = {
  
    
    EDIT_CATEGORY_FETCH :ActionsGen(CommandList.Category.EDIT_CATEGORY),
    DELETE_CATEGORY_FETCH:ActionsGen(CommandList.Category.DELETE_CATEGORY),
    ADD_CATEGORY_FETCH:ActionsGen(CommandList.Category.ADD_CATEGORY),
    SET_PARENT_FETCH:ActionsGen(CommandList.Category.SET_PARENT),
    SET_AS_VERIFIED_FETCH:ActionsGen(CommandList.Category.SET_AS_VERIFIED),
    GET_ALL_CATEGORIES_FETCH:ActionsGen(QueryList.Category.GET_CATEGORIES_ALL_TREE),
    SET_NOTIFICATION_GLOBAL:NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL

    }




export default  CATEGORY_TREE_ACTIONS
