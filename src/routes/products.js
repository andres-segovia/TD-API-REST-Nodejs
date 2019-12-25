const path = require('path');
const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

router.get('/', productController.getProducts); // Get all products
router.get('/search', productController.getSearchProducts);
//router.get('/:productTitle', productController.getProductParamTitle); // Genera conflicto con los siguientes
router.get('/types-products', productController.getTypeProducts);
router.get('/most-expensive', productController.getMostExpensiveProduct); // Para obtener el producto más caro
router.get('/most-cheapest', productController.getFiveCheapestProducts); // Paral los 5 productos más baratos
router.post('/buyProduct', productController.postBuyProduct);
router.post('/addProduct', productController.postAddProduct);


module.exports = router;
