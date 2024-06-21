import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    trim: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  images: [
    {
      type: String,
    },
  ],
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
