const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getUsers } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Rutas públicas
router.post('/login', loginUser);
router.post('/register', registerUser);

// Ruta para obtener todos los usuarios (protegida, solo admin)
router.get('/', protect, authorize('admin'), getUsers);

module.exports = router;
