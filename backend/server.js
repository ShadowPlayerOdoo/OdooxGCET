require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// IMPORT ROUTES
const productRoutes = require('./routes/productRoutes'); 
const userRoutes = require('./routes/userRoutes'); 
const orderRoutes = require('./routes/orderRoutes'); // <--- NEW IMPORT

const app = express();

// MIDDLEWARE
app.use(express.json()); 
app.use(cors()); 

// CONNECT TO DB
connectDB();

// USE ROUTES
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/orders', orderRoutes); // <--- NEW ROUTE

// DEFAULT ROUTE
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
