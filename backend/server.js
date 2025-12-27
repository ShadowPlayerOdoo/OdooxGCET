require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// IMPORT ROUTES
const productRoutes = require('./routes/productRoutes'); 
const userRoutes = require('./routes/userRoutes'); // <--- ADD THIS


const app = express();

app.use(express.json());
app.use(cors());

// CONNECT TO DB
connectDB();

// USE ROUTES
app.use('/api/products', productRoutes);  // <--- THIS LINE IS CRITICAL
app.use('/api/users', userRoutes); // <--- ADD THIS


// Default Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
