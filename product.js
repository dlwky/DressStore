// Yza Castro - 301272405
// product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  published: { type: Boolean, default: false },
  category: { type: String },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
