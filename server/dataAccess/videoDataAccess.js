import fs from 'fs';
import Video from '../models/Video';
import { ErrorHandler } from '../error';

class VideoDataAccess {
  findVideoDataByName = (name) => Video.findOne({ name });

  saveVideoData = async (videoData) => {
    const { name, url } = videoData;

    const existingRecord = await this.findVideoDataByName(name);

    if (existingRecord) {
      fs.unlinkSync(url);
      throw new ErrorHandler(404, 'Video with this name already exists.');
    }

    return Video.create(videoData);
  };

  findVideosDataByUserId = (userId) => Video.find({ userId });

  findVideoData = (id) => Video.findOne({ _id: id });

  deleteVideoData = (id) => Video.deleteOne({ _id: id });
}


export default VideoDataAccess;
