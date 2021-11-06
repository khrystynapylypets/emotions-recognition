import { map } from 'lodash';
import VideoService from '../services/videoService';

export const uploadVideo = async (req, res, next) => {
  try {
    const file = req.file;
    const additionalData = req.body;
    const userId = req.userId;

    const videoServiceInstance = new VideoService();
    const videoData = await videoServiceInstance.saveVideoData(file, additionalData, userId);

    res
      .status(200)
      .send({
        videoData: {
          id: videoData._id,
          name: videoData.name,
          description: videoData.description,
          url: videoData.url,
          isAnalyzed: videoData.isAnalyzed,
          userId: videoData.userId,
        },
      });
  } catch (error) {
    next(error);
  }
};

export const getAllVideos = async (req, res, next) => {
  try {
    const userId = req.userId;

    const videoServiceInstance = new VideoService();
    const list = await videoServiceInstance.getAllVideosByUserId(userId);

    res
      .status(200)
      .send({
        videosData: map(list, (videoData) => ({
          id: videoData._id,
          name: videoData.name,
          description: videoData.description,
          url: videoData.url,
          isAnalyzed: videoData.isAnalyzed,
          userId: videoData.userId,
        })),
      });
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const videoServiceInstance = new VideoService();

    await videoServiceInstance.deleteVideo(id);

    res.status(200).send();
  } catch (error) {
    next(error);
  }
};
