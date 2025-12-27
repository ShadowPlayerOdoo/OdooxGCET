const express = require('express');
const router = express.Router();

// CRITICAL: Import must match the export name
const { getProducts } = require('../controllers/productController');

// Check if function exists (Debugging)
if (!getProducts) {
    console.log("CRITICAL ERROR: getProducts function is missing in controller!");
}

router.get('/', getProducts);

module.exports = router;
