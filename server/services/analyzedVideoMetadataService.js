import AnalyzedVideoDataAccess from '../dataAccess/analyzedVideoDataAccess';

class AnalyzedVideoMetadataService {
  constructor() {
    this.analyzedVideoDataAccessInstance = new AnalyzedVideoDataAccess();
  }

  getAnalyzedDataByVideoId = (videoId) => this.analyzedVideoDataAccessInstance.findMetadataByVideoId(videoId);
}

export default AnalyzedVideoMetadataService;
