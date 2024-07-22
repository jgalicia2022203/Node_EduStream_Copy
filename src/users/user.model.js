import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  birthday: {
    type: Date,
    required: [true, "birthday is required"],
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
  },
  followedChannels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
  ],
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model("User", UserSchema);
