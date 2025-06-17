const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// Rutas protegidas (usuario autenticado)
router.post('/', protect, orderController.createOrder);
router.get('/myorders', protect, orderController.getMyOrders);
router.get('/:id', protect, orderController.getOrderById);
router.put('/:id/pay', protect, orderController.updateOrderToPaid);

// Rutas protegidas (solo admin)
router.get('/', protect, admin, orderController.getOrders);
router.put('/:id/status', protect, admin, orderController.updateOrderStatus);

module.exports = router; 