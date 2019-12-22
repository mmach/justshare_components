import { DICTIONARY_ACTIONS, DictionaryReducer } from './Reducers/Dictionary/index.js';

import { LOADER_ACTIONS, LoaderReducer } from './Reducers/Loader/index.js';

import  BaseService  from './Architecture/baseServices';
import {UserReducer,USER_ACTIONS} from './Reducers/User/index.js'
import ClientException from './Architecture/Exceptions/clientExceptions.js';
import NotificationReducer from './Reducers/Notifications/reducer.js';
import { NOTIFICATIONS_ACTIONS } from './Reducers/Notifications/actions.js';

export  {
//ACTIONS AND REDUSCERS
    DictionaryReducer,
    DICTIONARY_ACTIONS,
    
    NotificationReducer,
    NOTIFICATIONS_ACTIONS,


    LOADER_ACTIONS,
    LoaderReducer,


    BaseService,
    ClientException,

    UserReducer,
    USER_ACTIONS

}