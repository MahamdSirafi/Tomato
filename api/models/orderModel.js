const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
    cart: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
          required: [true, 'A cart must have a Product'],
        },
        quantity: { type: Number, default: 1 },
        price: {
          type: Number,
          required: [true, 'A cart must have a price'],
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A order must have a user'],
    },
    location: {
      street: {
        type: String,
        required: [true, ' location  must have a street.'],
      },
      zip_code: {
        type: String,
        required: [true, ' location  must have a  zipcode.'],
      },
      region: {
        type: String,
        required: [true, ' location  must have a   region.'],
      },
    },
    phone: {
      type: String,
      required: [true, ' order  must have a   number phone.'],
    },
    total: {
      type: Number,
      required: [true, 'A order must have a total'],
    },
    dilivary_price: {
      type: Number,
      required: [true, 'A order must have a  dilivary price'],
    },
    status: {
      type: String,
      required: [true, ' location  must have a    status.'],
     // enum:["","",""]
     default :"perparing"
    },
  },
  { timestamps: true }
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
