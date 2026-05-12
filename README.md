To run the full E-Commerce application:

1. Backend (SERVER folder):
   - Ensure MongoDB is running locally
   - Update .env with your MongoDB URI if needed
   - Run: npm install && npm run dev

2. Frontend (CLIENT folder):
   - Run: npm install && npm run dev

3. Access the app at http://localhost:5173 (frontend) and backend at http://localhost:5000

Features implemented:
- User registration and login with JWT
- Product listing and details
- Shopping cart with persistence
- Checkout and order placement
- Category filtering

Note: Add some products to the database via POST /api/products for testing.