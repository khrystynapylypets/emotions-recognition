import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  isAnalyzed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model('Video', VideoSchema);
