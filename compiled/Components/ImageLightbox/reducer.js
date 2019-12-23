import { combineReducers } from 'redux';
import LIGHTBOX_ACTIONS from './actions';
let emptyState = {
  open: false,
  activeImage: null,
  isLoading: false,
  imageList: []
};
export default function ImageLightboxReducer(state = Object.assign({}, emptyState), action) {
  switch (action.type) {
    case LIGHTBOX_ACTIONS.CLOSE_LIGHTBOX:
      {
        const result = Object.assign({}, state);
        result.open = false;
        result.imageList = [];
        result.isLoading = true;
        result.activeImage = null;
        return result;
      }

    case LIGHTBOX_ACTIONS.OPEN_LIGHTBOX:
      {
        console.log(action);
        const result = Object.assign({}, state);
        result.open = true;
        result.imageList = action.dto.images;
        result.isLoading = true;
        result.activeImage = action.dto.activeImage;
        return result;
      }

    case LIGHTBOX_ACTIONS.SET_ACTIVE_IMG_LIGHTBOX:
      {
        const result = Object.assign({}, state);
        result.imageList.forEach(item => {
          if (item.blob_item.id == action.dto.id) {
            result.activeImage = item;
          }
        });
        return result;
      }

    default:
      {
        return state;
      }
  }
}
//# sourceMappingURL=reducer.js.map