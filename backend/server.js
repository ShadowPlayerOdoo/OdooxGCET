require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// IMPORT ROUTES
const productRoutes = require('./routes/productRoutes'); 
const userRoutes = require('./routes/userRoutes'); 

const app = express();

// MIDDLEWARE
app.use(express.json()); // Allows parsing JSON body data
app.use(cors());         // Enable CORS for all origins (Crucial for frontend connection)

// CONNECT TO DB
// Ensure your connectDB function handles errors internally or use .catch() here if it returns a promise
connectDB();

// USE ROUTES
app.use('/api/products', productRoutes); 
app.use('/api/users', userRoutes); 

// DEFAULT ROUTE
// This is important for Render to know your app is healthy
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

// START SERVER
// Render sets process.env.PORT automatically. 5000 is the fallback for localhost.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
