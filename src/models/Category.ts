import mongoose from "mongoose";
import { ICategory } from "../types/interface";
import slugify from "slugify";

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

CategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
