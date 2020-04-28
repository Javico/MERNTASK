// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');
const auth = require('./middleware/auth');
const {check} = require('express-validator');

// Inciar session
// api/usuarios
router.post('/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password','El password debe ser minimo de 6 caracteres').isLength({ min: 6})
    ]
    ,
    usuarioController.crearUsuario
);

// Obtiene el usuario authenticado
router.get('/',
    auth,
    authController.usuarioAuthenticado
)

module.exports = router;