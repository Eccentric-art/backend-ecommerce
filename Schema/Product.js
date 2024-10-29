const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: true,
      min: 10,
      max: 100,
    },
    img: [
      {
        url:{
          type:String
        }
      }
    ],
    contactNumber: {
      type: Number,
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
    },
    variety: {
      color: {
        type: String,
      },
      size: {
        type: Number,
      },
      gender: {
        type: String,
      },
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    comment: {
      text: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    rating: {
      stars: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
