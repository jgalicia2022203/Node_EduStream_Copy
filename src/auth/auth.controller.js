import bcrypt from "bcryptjs";
import Channel from "../channels/channel.model.js";
import { generateJWT } from "../common/helpers/generate-jwt.js";
import User from "../users/user.model.js";

export const register = async (req, res) => {
  try {
    const { username, password, email, birthday, phone } = req.body;
    const user = new User({ username, password, email, birthday, phone });
    await user.save();

    const channel = new Channel({
      name: "My Channel",
      description: "Say something about you",
      owner: user._id,
    });
    await channel.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = await generateJWT(user.id);
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
