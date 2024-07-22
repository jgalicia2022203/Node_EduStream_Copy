import Channel from "../channels/channel.model.js";
import Stream from "./stream.model.js";

export const startStream = async (req, res) => {
  try {
    const { title, description, channelId, categoryId } = req.body;

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const stream = new Stream({
      title,
      description,
      channel: channelId,
      category: categoryId,
      isLive: true,
      startedAt: new Date(),
    });

    await stream.save();

    res.status(201).json(stream);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const endStream = async (req, res) => {
  try {
    const { id } = req.params;

    const stream = await Stream.findById(id);
    if (!stream) {
      return res.status(404).json({ error: "Stream not found" });
    }

    stream.isLive = false;
    stream.endedAt = new Date();

    await stream.save();

    res.json(stream);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getStreamById = async (req, res) => {
  try {
    const { id } = req.params;

    const stream = await Stream.findById(id).populate("channel category");
    if (!stream) {
      return res.status(404).json({ error: "Stream not found" });
    }

    res.json(stream);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listStreamsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const streams = await Stream.find({
      category: categoryId,
      isLive: true,
    }).populate("channel");
    res.json(streams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
