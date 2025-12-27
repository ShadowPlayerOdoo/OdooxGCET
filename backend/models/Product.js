// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

// IMPORTANT: Check this line carefully
module.exports = mongoose.model('Product', productSchema);
