import { trim } from 'lodash';
import fs from 'fs';
import VideoDataAccess from '../dataAccess/videoDataAccess';
import { ErrorHandler } from '../error';

class VideoService {
  constructor() {
    this.videoDataAccessInstance = new VideoDataAccess();
  }

  isEmpty = (value) => !value || !trim(value);

  validateFileName = (fileName, fileURl) => {
    if (!this.isEmpty(fileName)) {
      return;
    }

    fs.unlinkSync(fileURl);
    throw new ErrorHandler(404, 'File name is required.');
  };

  saveVideoData = (video, additionalData, userId) => {
    const { name } = additionalData;

    this.validateFileName(name);

    return this.videoDataAccessInstance.saveVideoData({
      url: video.path,
      userId,
      ...additionalData,
    });
  };

  getAllVideosByUserId = (userId) => this.videoDataAccessInstance.findVideosDataByUserId(userId);

  deleteVideo = async (id) => this.videoDataAccessInstance.deleteVideoData(id);
}

export default VideoService;
