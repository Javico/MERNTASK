// Rutas para crear autenticar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('./middleware/auth');
//const {check} = require('express-validator');

// Iniciar sesion
// api/auth
// Obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAuthenticado
)

router.post('/',
    // [
    //     check('email', 'Agrega un email valido').isEmail(),
    //     check('password','El password debe ser minimo de 6 caracteres').isLength({ min: 6})
    // ]
    // ,
    authController.autenticarUsuario
)

module.exports = router;