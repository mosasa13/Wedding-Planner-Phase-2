import User from "../../models/User.js";
import mongoose from "mongoose";

const addToCart_put = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId, productQuantity, serviceId, serviceQuantity } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(productId) &&
      !mongoose.Types.ObjectId.isValid(serviceId)
    ) {
      return res.status(400).json({ errMsg: "Invalid product or service ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ errMsg: "User not found" });
    }

    let itemIndex = -1;

    if (productId) {
      itemIndex = user.cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex !== -1) {
        user.cart.products[itemIndex].productQuantity += productQuantity;
      } else {
        user.cart.products.push({ productId, productQuantity });
      }
    } else if (serviceId) {
      itemIndex = user.cart.services.findIndex(
        (item) => item.serviceId.toString() === serviceId
      );

      if (itemIndex !== -1) {
        user.cart.services[itemIndex].serviceQuantity += serviceQuantity;
      } else {
        user.cart.services.push({ serviceId, serviceQuantity });
      }
    }

    await user.save();

    return res
      .status(200)
      .json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errMsg: "Internal server error" });
  }
};


export default { addToCart_put };
