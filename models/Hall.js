// models/Hall.js
import mongoose from "mongoose";

const hallSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, "Please provide a capacity"],
    },
    location: {
      type: String,
      required: [true, "Please provide a location"],
      trim: true,
    },
    availability: {
      type: Boolean,
      required: [true, "Please provide availability status"],
      default: true,
    },
    picture: {
      type: String, // Assuming storing the filename of the picture
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Hall = mongoose.model("Hall", hallSchema);

export default Hall;
