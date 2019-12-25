const path = require('path');
const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

router.get('/', productController.getProducts); // Get all products
router.get('/search', productController.getSearchProducts);
router.get('/:productId', productController.getProduct);
router.get('/types-products', productController.getTypeProducts);
router.get('/more-expensive', productController.getMoreExpensiveProduct); // Para obtener el producto más caro

module.exports = router;
