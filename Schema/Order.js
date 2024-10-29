const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const OrderSchema = new Schema(
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
      
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);