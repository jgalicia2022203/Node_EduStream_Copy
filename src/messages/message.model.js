import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  stream: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stream",
    required: [true, "stream is required"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user is required"],
  },
  message: {
    type: String,
    required: [true, "message is required"],
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Message", MessageSchema);
