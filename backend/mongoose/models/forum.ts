import mongoose from 'mongoose';

// schema for discussion forum component
const forumSchema = new mongoose.Schema(
  {
    shgid: {
      type: String,
      immutable: true,
      required: true,
    },
    shgImage: {
      data: Buffer,
      contentType: String,
      required: true,
    },
    description: {
      type: String,
      immutable: true,
      required: true,
    },
    img: {
      data: Buffer,
      contentType: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.auth || mongoose.model('forum', forumSchema);
