import { cloneDeep, filter } from 'lodash';
import authTypes from '../../actions/auth/types';
import galleryTypes from '../../actions/gallery/types';

const initialState = {
  list: [],
  queriedAt: null,
  isLoading: false,
  isDeleting: false,
  isUploadingVideo: false,
};

export const galleryReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case galleryTypes.UPLOAD_VIDEO:
      return {
        ...prevState,
        isUploadingVideo: true,
      };
    case galleryTypes.UPLOAD_VIDEO_SUCCESS: {
      const { payload } = action;

      return {
        ...prevState,
        list: [ ...cloneDeep(prevState.list), payload.videoData ],
        isUploadingVideo: false,
      };
    }
    case galleryTypes.UPLOAD_VIDEO_FAIL:
      return {
        ...prevState,
        isUploadingVideo: false,
      };
    case galleryTypes.GET_VIDEOS:
      return {
        ...prevState,
        isLoading: true,
      };
    case galleryTypes.GET_VIDEOS_SUCCESS: {
      const { payload } = action;

      return {
        ...prevState,
        list: cloneDeep(payload.list),
        queriedAt: payload.queriedAt,
        isLoading: false,
      };
    }
    case galleryTypes.GET_VIDEOS_FAIL:
      return {
        ...prevState,
        isLoading: false,
      };
    case galleryTypes.DELETE_VIDEO:
      return {
        ...prevState,
        isDeleting: true,
      };
    case galleryTypes.DELETE_VIDEO_SUCCESS: {
      const { payload } = action;

      return {
        ...prevState,
        list: filter(prevState.list, ({ id }) => payload.id !== id),
        isDeleting: false,
      };
    }
    case galleryTypes.DELETE_VIDEO_FAIL:
      return {
        ...prevState,
        isDeleting: false,
      };
    case authTypes.SIGN_OUT:
      return {
        ...initialState,
      };
    default:
      return prevState;
  }
};
