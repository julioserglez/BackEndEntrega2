const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/productsManager');

// Home (lista de productos)
router.get('/', (req, res) => {
    res.render('home', {
        title: 'Bienvenido',
        productos: ProductManager.getAll()
    });
});

// Vista realtime con socket.io
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        title: 'Productos en Tiempo Real',
        productos: ProductManager.getAll()
    });
});

module.exports = router;
