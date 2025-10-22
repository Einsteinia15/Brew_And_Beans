# BrewAndBean - Coffee Shop Website

A modern, responsive coffee shop website built with React, featuring a complete e-commerce experience with product catalog, shopping cart, and transaction capabilities.

## Features

- **Single Page Application (SPA)** with React Router DOM
- **Product Database** with 12 different coffee items across multiple categories
- **Shopping Cart** with add/remove items and quantity management
- **Transaction System** with order summary and checkout functionality
- **Responsive Design** using Bootstrap 5
- **Modern UI/UX** with coffee-themed styling

## Pages

1. **Home** - Hero section with featured products
2. **About** - Company story and values
3. **Menu** - Complete product catalog with category filtering
4. **Gallery** - Visual showcase of coffee moments
5. **Contact** - Contact information and message form
6. **Cart** - Shopping cart with order management

## Product Categories

- **Espresso** - Classic espresso drinks
- **Cold Coffee** - Iced and cold brew options
- **Brewed Coffee** - Traditional brewing methods

## Technologies Used

- React 18
- React Router DOM 6
- Bootstrap 5
- Font Awesome Icons
- CSS3 with custom variables

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── Header.js
│   └── Footer.js
├── context/
│   └── CartContext.js
├── data/
│   └── products.js
├── pages/
│   ├── Home.js
│   ├── About.js
│   ├── Menu.js
│   ├── Gallery.js
│   ├── Contact.js
│   └── Cart.js
├── App.js
├── App.css
├── index.js
└── index.css
```

## Key Features Implemented

### Navigation
- Responsive navigation bar with cart badge
- React Router DOM for seamless page navigation
- Active cart item counter

### Product Management
- Comprehensive product database with 12 items
- Category-based filtering
- Product images, descriptions, and pricing
- Add to cart functionality

### Shopping Cart
- Add/remove items
- Quantity management
- Order summary with tax calculation
- Persistent cart state using React Context

### Design
- Coffee-themed color palette
- Responsive Bootstrap grid system
- Custom CSS with CSS variables
- Hover effects and animations
- Mobile-friendly design

## Future Enhancements

- User authentication
- Order history
- Payment integration
- Admin panel for product management
- Customer reviews and ratings
