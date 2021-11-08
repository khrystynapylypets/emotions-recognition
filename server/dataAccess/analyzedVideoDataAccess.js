import AnalyzedVideoMetadata from '../models/AnalyzedVideoMetadata';

class AnalyzedVideoMetadataAccess {
  findMetadataByVideoId = (videoId) =>
    AnalyzedVideoMetadata.findById({ videoId }).catch(() => []);
}

export default AnalyzedVideoMetadataAccess;
