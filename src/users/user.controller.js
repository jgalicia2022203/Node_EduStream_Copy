import Channel from "../channels/channel.model.js";
import User from "./user.model.js";

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFollowedChannels = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("followedChannels");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followedChannels = await Channel.find({
      _id: { $in: user.followedChannels },
    });

    res.json({ channels: followedChannels });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
