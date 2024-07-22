import Stream from "../streams/stream.model.js";
import User from "../users/user.model.js";
import Message from "./message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { streamId, userId, message } = req.body;

    const stream = await Stream.findById(streamId);
    const user = await User.findById(userId);

    if (!stream || !user) {
      return res.status(404).json({ error: "Stream or user not found" });
    }

    const chatMessage = new Message({
      stream: streamId,
      user: userId,
      message,
    });

    await chatMessage.save();

    stream.chat.push(chatMessage._id);
    await stream.save();

    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listMessagesByStream = async (req, res) => {
  try {
    const { streamId } = req.params;

    const stream = await Stream.findById(streamId).populate({
      path: "chat",
      populate: {
        path: "user",
        select: "username",
      },
    });

    if (!stream) {
      return res.status(404).json({ error: "Stream not found" });
    }

    res.json(stream.chat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
