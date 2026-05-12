const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    title: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    price: 99.99,
    image: 'https://via.placeholder.com/300x300?text=Headphones',
    category: 'Electronics',
    rating: { rate: 4.5, count: 120 }
  },
  {
    title: 'Smartphone Case',
    description: 'Protective case for smartphones.',
    price: 19.99,
    image: 'https://via.placeholder.com/300x300?text=Case',
    category: 'Accessories',
    rating: { rate: 4.0, count: 80 }
  },
  {
    title: 'Laptop',
    description: 'Powerful laptop for work and gaming.',
    price: 1299.99,
    image: 'https://via.placeholder.com/300x300?text=Laptop',
    category: 'Electronics',
    rating: { rate: 4.8, count: 200 }
  },
  {
    title: 'T-Shirt',
    description: 'Comfortable cotton t-shirt.',
    price: 14.99,
    image: 'https://via.placeholder.com/300x300?text=T-Shirt',
    category: 'Clothing',
    rating: { rate: 4.2, count: 150 }
  },
  {
    title: 'Book: JavaScript Guide',
    description: 'Comprehensive guide to JavaScript.',
    price: 29.99,
    image: 'https://via.placeholder.com/300x300?text=Book',
    category: 'Books',
    rating: { rate: 4.7, count: 90 }
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();