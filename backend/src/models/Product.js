const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  images: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['prendas', 'pantalones', 'zapatos', 'traje', 'accesorios']
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
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 