import User from "../users/user.model.js";
import Channel from "./channel.model.js";

export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }
    res.json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const channel = await Channel.findByIdAndUpdate(id, updates, { new: true });
    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    res.json(channel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const followChannel = async (req, res) => {
  try {
    const { channelId, userId } = req.body;

    const channel = await Channel.findById(channelId);
    const user = await User.findById(userId);

    if (!channel || !user) {
      return res.status(404).json({ error: "Channel or user not found" });
    }

    channel.followers.push(userId);
    await channel.save();

    user.followedChannels.push(channelId);
    await user.save();

    res.json({ message: "Channel followed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const unfollowChannel = async (req, res) => {
  try {
    const { channelId, userId } = req.body;

    const channel = await Channel.findById(channelId);
    const user = await User.findById(userId);

    if (!channel || !user) {
      return res.status(404).json({ error: "Channel or user not found" });
    }

    channel.followers = channel.followers.filter(
      (id) => id.toString() !== userId
    );
    await channel.save();

    user.followedChannels = user.followedChannels.filter(
      (id) => id.toString() !== channelId
    );
    await user.save();

    res.json({ message: "Channel unfollowed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addCategoryToChannel = async (req, res) => {
  try {
    const { channelId, categoryId } = req.body;

    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    channel.category = categoryId;
    await channel.save();

    res.json({ message: "Category added to channel" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
