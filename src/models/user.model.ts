import { role, userModelI } from "../interfaces/user.interface";
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    role: { type: String, default: role.DEFAULT },
  },
  { timestamps: true }
);

export const UserModel = model<userModelI>("User", UserSchema);
