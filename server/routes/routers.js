const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/place-order', controller.placeOrder);
router.get('/get-orders', controller.getOrders); // Use GET request for fetching orders

module.exports = router;
