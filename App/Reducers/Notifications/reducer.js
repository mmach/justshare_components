import { combineReducers } from 'redux';
import uuidv4 from 'uuid/v4';

import {
    NOTIFICATIONS_ACTIONS
} from './actions';

export default function NotificationReducer(state = [], action) {
    switch (action.type) {
        case NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL:
            {
                const result = [...state];
                let notif = action.notification;
                notif.guid = uuidv4();
                const exist = result.filter(item => {
                    return item.message == notif.message
                })
                if (exist.length == 0) {
                    result.push(notif);
                }
                return result;
            }
        case NOTIFICATIONS_ACTIONS.REMOVE_NOTIFICATION_GLOBAL:
            {
                const _result = [...state];
                let i = 0;
                const result = _result.filter((item, index) => {
                    console.log(i);
                    console.log(action.notification);
                    return item.guid != action.notification;

                });
                return result;
                //       result.edit.isLoading = false;

            }
        default:
            {
                return state;
            }
    }

}