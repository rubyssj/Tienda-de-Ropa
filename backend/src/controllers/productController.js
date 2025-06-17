const Product = require('../models/Product');
const products = require('../../data/products');

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const { category, gender, search } = req.query;
    let query = {};
    
    // Filtrar por categoría si se proporciona
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Filtrar por género si se proporciona
    if (gender) {
      query.gender = gender;
    }
    
    // Buscar por nombre si se proporciona un término de búsqueda
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    const products = await Product.find(query);
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (product) {
      res.status(200).json({
        success: true,
        data: product
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
};

// @desc    Crear un producto
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      images,
      availableSizes,
      colors,
      material,
      gender,
      category,
      rating,
      stock
    } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      images,
      availableSizes,
      colors,
      material,
      gender,
      category,
      rating: rating || 0,
      stock: stock || 0
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
};

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      images,
      availableSizes,
      colors,
      material,
      gender,
      category,
      rating,
      stock
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.images = images || product.images;
      product.availableSizes = availableSizes || product.availableSizes;
      product.colors = colors || product.colors;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.category = category || product.category;
      product.rating = rating || product.rating;
      product.stock = stock || product.stock;

      const updatedProduct = await product.save();
      
      res.status(200).json({
        success: true,
        data: updatedProduct
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
};

// @desc    Eliminar un producto
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      
      res.status(200).json({
        success: true,
        message: 'Producto eliminado'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
};

// @desc    Cargar datos iniciales
// @route   GET /api/products/seed
// @access  Public
exports.seedProducts = async (req, res) => {
  try {
    // Eliminar todos los productos existentes
    await Product.deleteMany({});
    
    // Transformar los datos de productos del frontend
    const productsToSeed = [];
    
    // Agregar productos de prendas
    products.prendas.forEach(item => {
      productsToSeed.push({
        ...item,
        images: [item.image], // Convertir la imagen a un array
        category: 'prendas',
        stock: 10
      });
    });
    
    // Agregar productos de pantalones
    products.pantalones.forEach(item => {
      productsToSeed.push({
        ...item,
        images: [item.image], // Convertir la imagen a un array
        category: 'pantalones',
        stock: 10
      });
    });
    
    // Agregar productos de zapatos
    products.zapatos.forEach(item => {
      productsToSeed.push({
        ...item,
        images: [item.image], // Convertir la imagen a un array
        category: 'zapatos',
        stock: 10
      });
    });
    
    // Agregar productos de traje
    products.traje.forEach(item => {
      productsToSeed.push({
        ...item,
        images: [item.image], // Convertir la imagen a un array
        category: 'traje',
        stock: 10
      });
    });
    
    // Insertar los productos en la base de datos
    const createdProducts = await Product.insertMany(productsToSeed);
    
    console.log(`Se han cargado ${createdProducts.length} productos: prendas, pantalones, zapatos, trajes`);
    
    res.status(200).json({
      success: true,
      count: createdProducts.length,
      message: 'Productos cargados correctamente'
    });
  } catch (error) {
    console.error('Error al cargar productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al cargar productos iniciales'
    });
  }
};
