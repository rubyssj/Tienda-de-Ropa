const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['clothes', 'pants', 'shoes', 'traje']
  },
  gender: {
    type: String,
    required: true,
    enum: ['mujer', 'hombre', 'niños']
  },
  availableSizes: {
    type: [String],
    required: true
  },
  colors: {
    type: [String],
    required: true
  },
  material: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product; 