const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

orderSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });
  
  orderSchema.set("toJSON", {
    virtuals: true,
  });
  
exports.OrderItem = mongoose.model("OrderItem", orderSchema);
