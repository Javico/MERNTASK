// Rutas para crear autenticar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('./middleware/auth');

// Iniciar sesion
// api/auth
// Obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAuthenticado
)

router.post('/',
    authController.autenticarUsuario
)

module.exports = router;