import mongoose from "mongoose";

const StreamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: [true, "channel is required"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "category is required"],
  },
  viewers: {
    type: Number,
    default: 0,
  },
  isLive: {
    type: Boolean,
    default: false,
  },
  startedAt: {
    type: Date,
  },
  endedAt: {
    type: Date,
  },
  chat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatMessage",
    },
  ],
});

export default mongoose.model("Stream", StreamSchema);
