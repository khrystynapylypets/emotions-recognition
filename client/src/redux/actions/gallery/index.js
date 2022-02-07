import { get } from 'lodash';
import types from './types';
import api from './api';
import authTypes from '../auth/types';
import { message } from '../../../helpers';
import { toaster as addMessage } from 'evergreen-ui';
import { ERROR_MESSAGE_DISPLAYING_DURATION, statusCodes } from '../../../utils/constants';

const uploadVideo = () => ({
  type: types.UPLOAD_VIDEO,
});

const uploadVideoSuccess = (videoData) => ({
  type: types.UPLOAD_VIDEO_SUCCESS,
  payload: {
    videoData,
  },
});

const uploadVideoFail = () => ({
  type: types.UPLOAD_VIDEO_FAIL,
});

const getVideos = () => ({
  type: types.GET_VIDEOS,
});

const getVideosSuccess = (list) => ({
  type: types.GET_VIDEOS_SUCCESS,
  payload: {
    list,
    queriedAt: Date.now(),
  },
});

const getVideosFail = () => ({
  type: types.GET_VIDEOS_FAIL,
});

const deleteVideo = () => ({
  type: types.DELETE_VIDEO,
});

const deleteVideosSuccess = (id) => ({
  type: types.DELETE_VIDEO_SUCCESS,
  payload: {
    id,
  },
});

const deleteVideoFail = () => ({
  type: types.DELETE_VIDEO_FAIL,
});

const uploadVideoAction = (videoData) => (dispatch) =>
{
  dispatch(uploadVideo());

  return api.uploadVideo(videoData)
    .then((result) => {
      const { data } = result;

      dispatch(uploadVideoSuccess(data.videoData));
      addMessage.success(message(
        'uploadVideoPanel.request.messages.uploadingSuccess',
        { name: data.videoData.name },
      ));

      return result;
    })
    .catch((error) => {
      dispatch(uploadVideoFail());
      const errorMessage = get(error, 'response.data.message',
        message('generalErrors.unexpected'));

      if (error.response.status === statusCodes.UNAUTHORIZED ) {
        dispatch(authTypes.signOutAction());
        addMessage.danger(errorMessage, { duration: ERROR_MESSAGE_DISPLAYING_DURATION });

        return Promise.reject(error);
      }

      addMessage.danger(errorMessage, { duration: ERROR_MESSAGE_DISPLAYING_DURATION });

      return Promise.reject(error);
    });
};

const getVideosAction = () => (dispatch) =>
{
  dispatch(getVideos());

  return api.getVideos()
    .then((result) => {
      const { data: { videosData } } = result;

      dispatch(getVideosSuccess(videosData));
    })
    .catch((error) => {
      dispatch(getVideosFail());
      const errorMessage = get(error, 'response.data.message',
        message('generalErrors.unexpected'));

      if (error.response.status === statusCodes.UNAUTHORIZED ) {
        dispatch(authTypes.signOutAction());
        addMessage.danger(errorMessage, { duration: ERROR_MESSAGE_DISPLAYING_DURATION });

        return Promise.reject(error);
      }

      addMessage.danger(errorMessage, { duration: ERROR_MESSAGE_DISPLAYING_DURATION });
    });
};

const deleteVideoAction = (id, name) => (dispatch) =>
{
  dispatch(deleteVideo());

  return api.deleteVideo(id)
    .then(() => {
      dispatch(deleteVideosSuccess(id));
      addMessage.success(message('uploadVideoPanel.request.messages.deletingSuccess', { name }));
    })
    .catch((error) => {
      dispatch(deleteVideoFail());
      const errorMessage = get(error, 'response.data.message',
        message('generalErrors.unexpected'));


      if (error.response.status === statusCodes.UNAUTHORIZED ) {
        dispatch(authTypes.signOutAction());
        addMessage.danger(errorMessage, { duration: ERROR_MESSAGE_DISPLAYING_DURATION });

        return Promise.reject(error);
      }

      addMessage.danger(errorMessage, { duration: ERROR_MESSAGE_DISPLAYING_DURATION });
    });
};

export default {
  uploadVideoAction,
  getVideosAction,
  deleteVideoAction,
};
