import { AuthAPI } from '../../api';

const uploadVideo = (videoData) => {
  const formData = new FormData();

  formData.append('name', videoData.name);
  formData.append('videoFile', videoData.videoFile);
  if (videoData.description) {
    formData.append('description', videoData.description);
  }

  return AuthAPI.post('/video', formData);
};

const getVideos = () => AuthAPI.get('/video');

const deleteVideo = (id) => AuthAPI.delete(`/video/${id}`);

export default {
  uploadVideo,
  getVideos,
  deleteVideo,
};
