// backend/seeder.js
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

const products = [
  {
    name: "Wireless Noise Cancelling Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description: "Experience world-class noise cancellation and premium sound quality.",
    category: "Electronics"
  },
  {
    name: "Smart Fitness Watch",
    price: 149.50,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    description: "Track your workouts, heart rate, and sleep with this advanced smartwatch.",
    category: "Wearables"
  },
  {
    name: "Ergonomic Office Chair",
    price: 199.00,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80",
    description: "Work in comfort with adjustable lumbar support and breathable mesh.",
    category: "Furniture"
  },
  {
    name: "Mechanical Gaming Keyboard",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b91a05c?w=500&q=80",
    description: "RGB backlit mechanical keyboard with blue switches for tactile feedback.",
    category: "Electronics"
  },
   {
    name: "4K Action Camera",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
    description: "Capture your adventures in stunning 4K resolution.",
    category: "Electronics"
  },
  {
    name: "Minimalist Backpack",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
    description: "Stylish and functional backpack for daily commute.",
    category: "Fashion"
  }
];

const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany(); // Clear existing data
    await Product.insertMany(products); // Insert new data

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
