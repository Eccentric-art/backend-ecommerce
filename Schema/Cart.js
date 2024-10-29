const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const CartSchema = new Schema(
  {
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // name: {
    //   type: String,
    //   required: true,
    // },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);
