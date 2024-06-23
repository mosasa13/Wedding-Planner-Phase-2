import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: String,
      unique: true,
    },
    city: String,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    cart: {
      products: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          productQuantity: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],
      services: [
        {
          serviceId: {
            type: Schema.Types.ObjectId,
            ref: "Service",
            required: true,
          },
          serviceQuantity: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
