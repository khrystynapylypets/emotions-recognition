import { map } from 'lodash';
import VideoService from '../services/videoService';
import AnalyzedVideoMetadataService from '../services/analyzedVideoMetadataService';

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
          isAnalyzed: false,
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
    const analyzedVideoMetadataServiceInstance = new AnalyzedVideoMetadataService();

    const list = await videoServiceInstance.getVideosByUserId(userId);

    const videosData = await Promise.all(map(list, async (videoData) => {
      const analyzedMetadata = await analyzedVideoMetadataServiceInstance.getAnalyzedDataByVideoId(videoData._id);

      return {
        id: videoData._id,
        name: videoData.name,
        description: videoData.description,
        url: videoData.url,
        isAnalyzed: analyzedMetadata > 0,
        userId: videoData.userId,
      };
    }));

    res
      .status(200)
      .send({ videosData });
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
