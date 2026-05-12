# MallHub - Project Structure

## Overview
MallHub is a comprehensive e-commerce platform that allows users to explore malls, shops, and products across different countries. The platform features a public-facing website for customers and a separate admin portal for management.

## Project Architecture

### Public Website Flow
1. **Homepage** (`/`) - Country-wise mall listings with featured malls
2. **Mall Detail Page** (`/malls/:id`) - Shows all shops in a specific mall
3. **Shop Detail Page** (`/shops/:id`) - Displays shop info with sales carousel and product grid
4. **Product Detail Page** (`/products/:id`) - Product details with add to cart functionality

### Admin Portal Flow
- **Admin Login** (`/sign-in`) - Redirects to `/admin/dashboard`
- **Admin Dashboard** (`/admin/*`) - Full admin functionality with existing INSPINIA features

## Directory Structure

```
src/app/
├── public/                          # Public-facing website
│   ├── home/                        # Homepage component
│   ├── mall-detail/                 # Mall detail page
│   ├── shop-detail/                 # Shop detail page with carousel
│   ├── product-detail/              # Product detail with cart
│   ├── layout/                      # Public layout (navbar + footer)
│   └── public.routes.ts             # Public routes with lazy loading
│
├── shared/                          # Shared models and utilities
│   └── models/                      # Data models
│       ├── country.model.ts
│       ├── mall.model.ts
│       ├── shop.model.ts
│       ├── product.model.ts
│       └── index.ts
│
├── views/                           # Admin portal views
│   ├── auth/                        # Authentication (sign-in)
│   ├── dashboards/                  # Admin dashboards
│   └── [other admin modules]
│
├── layouts/                         # Admin layouts
│   ├── main-layout/                 # Admin main layout
│   ├── horizontal-layout/
│   └── vertical-layout/
│
├── core/                            # Core services
│   └── services/
│       └── layout-store.service.ts
│
└── app.routes.ts                    # Main routing configuration
```

## Key Features

### Public Website
- **Responsive Design** - Mobile-first approach with Bootstrap 5
- **Modern UI** - Blue gradient theme matching MallHub branding
- **Lazy Loading** - All routes use lazy loading for optimal performance
- **Sales Carousel** - Automatic rotating carousel for featured products
- **Product Filtering** - Category-based filtering on shop pages
- **Search Functionality** - Search shops and products
- **Add to Cart** - Product cart functionality (ready for implementation)

### Admin Portal
- **Separate Access** - Admin portal accessible at `/admin/*`
- **Full Dashboard** - Complete INSPINIA admin features
- **Layout Customization** - Multiple themes and layout options
- **Secure Login** - Admin authentication system

## Technology Stack

### Frontend
- **Angular 20.1.6** - Latest Angular framework
- **TypeScript 5.8.3** - Type-safe development
- **Bootstrap 5.3.7** - Responsive UI framework
- **SCSS** - Advanced styling with variables

### UI Components
- **Tabler Icons** - Modern icon library
- **Lucide Angular** - Additional icon set
- **Standalone Components** - Modern Angular architecture

### Features
- **Lazy Loading** - Route-level code splitting
- **Signals** - Modern Angular state management
- **Reactive Forms** - Form handling
- **Router** - Advanced routing with guards

## Theme Configuration

### Color Scheme
- **Primary**: Blue (#1c84c6)
- **Secondary**: Teal (#1ab394)
- **Gradient**: Blue (#4169E1) to Light Blue (#1E90FF)

### Available Themes
1. Classic (default)
2. Material
3. Modern
4. SaaS
5. Flat
6. Minimal

## Routing Structure

### Public Routes
```
/ → Homepage
/malls/:id → Mall Detail
/shops/:id → Shop Detail
/products/:id → Product Detail
```

### Admin Routes
```
/sign-in → Admin Login
/admin/dashboard → Admin Dashboard
/admin/* → Other admin features
```

## Data Models

### Country
- id, name, code, flag, mallCount

### Mall
- id, name, country, city, address, shopCount, brandCount, rating

### Shop
- id, name, mall, brand, category, logo, coverImage, rating

### Product
- id, shop, name, price, images, stock, rating, specifications

## Next Steps for Development

1. **API Integration** - Connect to backend services
2. **Cart Service** - Implement shopping cart functionality
3. **User Authentication** - Add user login/registration
4. **Payment Gateway** - Integrate payment processing
5. **Search Service** - Implement global search
6. **Wishlist** - Add product wishlist feature
7. **Reviews** - Product and shop review system
8. **Admin CRUD** - Complete admin management features

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Build for production
ng build --configuration production
```

## Access Points

- **Public Website**: http://localhost:4200/
- **Admin Portal**: http://localhost:4200/admin/dashboard
- **Admin Login**: http://localhost:4200/sign-in

## Notes

- All public pages use lazy loading for better performance
- Admin portal maintains existing INSPINIA functionality
- Theme colors updated to blue gradient matching MallHub design
- Project structure supports high traffic with modular architecture
- Ready for API integration and backend services
