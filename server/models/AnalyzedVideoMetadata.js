import mongoose from 'mongoose';

const AnalyzedVideoMetadataSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
    unique: true,
  },
  emotion: {
    type: String,
    required: true,
  },
  precision: {
    type: String,
    required: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model('AnalyzedVideoMetadata', AnalyzedVideoMetadataSchema);
