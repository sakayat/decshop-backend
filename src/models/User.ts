import { IUser } from "../types/interface";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "buyer",
    },
    status: {
      type: String,
      default: "active",
    },
    image: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    storeInfo: {
      name: {
        type: String,
        unique: true,
      },
      description: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
