# DecShop Backend

A robust backend server for the DecShop e-commerce platform built with Node.js, Express, and TypeScript.

## Features

- User authentication and authorization
- Seller management
- Product management
- Order processing
- Category organization
- Admin dashboard functionality
- File uploads

## Tech Stack

- Node.js & Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Zod for validation

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB

### Installation

1. Clone the repository
```bash
git clone https://github.com/sakayat/decshop-backend.git
cd decshop-backend
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Run the development server
```bash
npm run dev
```

### API Routes

- `/api/users` - User authentication and management
- `/api/seller` - Seller dashboard and operations
- `/api/orders` - Order processing and management
- `/api/admin` - Admin dashboard operations
- `/api/category` - Category management
- `/api/products` - Product CRUD operations

## Build

```bash
npm run build
```
