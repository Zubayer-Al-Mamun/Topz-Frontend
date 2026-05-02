# YAQEEN e-Commerce Frontend

A modern e-commerce frontend application built with **React 19**, **Vite 7**, and **TailwindCSS 4**.  
It features a responsive design with an **admin panel** for product, order, and banner management.

## Tech Stack

- **Frontend:** React 19 + Vite 7
- **Styling:** TailwindCSS 4
- **Routing:** React Router DOM 7
- **Forms:** React Hook Form
- **Animations:** Framer Motion
- **Image Cropping:** React Image Crop

## Features

### Customer Features
- Product browsing and search
- Shopping cart management
- Order placement with shipping address
- Order history tracking
- Student combo offers

### Admin Panel Features
- Dashboard with analytics
- Product management (CRUD)
- Order management
- Color management
- Banner/Setup management with 16:9 image cropping

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Zubayer-Al-Mamun/YAQEEN_e-Commerce_Frontend.git

# Navigate to project directory
cd YAQEEN_e-Commerce_Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Now open: http://localhost:5173/

## Available Scripts

| Command           | Description                |
|-------------------|----------------------------|
| `npm run dev`     | Start development server   |
| `npm run build`   | Build for production       |
| `npm run preview` | Preview production build   |
| `npm run lint`    | Run ESLint                 |

## Project Structure

```
YAQEEN_e-Commerce_Frontend/
├── public/                          # Static assets
├── src/
│   ├── actions/
│   │   └── action.js                # API actions and data fetching
│   │
│   ├── components/
│   │   ├── adminPanel/              # Admin dashboard components
│   │   │   ├── compo/
│   │   │   │   ├── addProductComponents/
│   │   │   │   │   ├── GeneralInfoForm.jsx
│   │   │   │   │   ├── Preview.jsx
│   │   │   │   │   ├── Pricing.jsx
│   │   │   │   │   └── SizeAndColor.jsx
│   │   │   │   ├── AdminProducts.jsx
│   │   │   │   ├── Analytics.jsx
│   │   │   │   ├── Carousel2.jsx
│   │   │   │   ├── ProductColorInpu.jsx
│   │   │   │   ├── Products.jsx
│   │   │   │   └── SeeColor.jsx
│   │   │   ├── orders/
│   │   │   │   ├── CopyableId.jsx
│   │   │   │   ├── ItemCard.jsx
│   │   │   │   └── OrdersAdmin.jsx
│   │   │   ├── setup/
│   │   │   │   └── Setup.jsx        # Banner management with 16:9 cropping
│   │   │   ├── AddColor.jsx
│   │   │   ├── AddProduct.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DashboardSidebar.jsx
│   │   │   ├── login.jsx
│   │   │   └── ProductEdit.jsx
│   │   │
│   │   ├── buy/                     # Product purchase flow
│   │   │   ├── Buy.jsx
│   │   │   ├── ColorFamily.jsx
│   │   │   ├── ImageCarousel.jsx
│   │   │   ├── ShippingAddress.jsx
│   │   │   ├── ShippingAddress2.jsx
│   │   │   ├── SizeAndQty.jsx
│   │   │   ├── Subtotal.jsx
│   │   │   └── TitleAndPrice.jsx
│   │   │
│   │   ├── cart/
│   │   │   └── Cart.jsx             # Shopping cart
│   │   │
│   │   ├── category/
│   │   │   └── Bar.jsx              # Category navigation bar
│   │   │
│   │   ├── contacts/
│   │   │   └── ContactUs.jsx        # Contact page
│   │   │
│   │   ├── home/                    # Homepage components
│   │   │   ├── bottom_nav/
│   │   │   │   └── BottomNavbar.jsx
│   │   │   ├── header/
│   │   │   │   ├── CartIcon.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Logo.jsx
│   │   │   │   ├── Menu.jsx
│   │   │   │   └── NavItems.jsx
│   │   │   ├── Carousel.jsx
│   │   │   ├── FullWidthCarousel.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── home.css
│   │   │   └── SideNavbar.jsx
│   │   │
│   │   ├── orders/
│   │   │   └── Order.jsx            # Customer orders view
│   │   │
│   │   ├── shop/
│   │   │   └── Shop.jsx             # Shop/products listing
│   │   │
│   │   ├── studentComb/
│   │   │   └── StudentComb.jsx      # Student combo offers
│   │   │
│   │   ├── Error.jsx                # Error boundary/page
│   │   ├── Footer.jsx               # Site footer
│   │   ├── ImagePreview.jsx         # Image preview modal
│   │   ├── Loading.jsx              # Loading spinner
│   │   ├── Page.jsx                 # Page wrapper/layout
│   │   ├── Popup.jsx                # Popup/modal component
│   │   ├── PrivateRoute.jsx         # Auth protected route
│   │   ├── Product.jsx              # Product card
│   │   └── SingleProduct.jsx        # Single product detail
│   │
│   ├── context/
│   │   └── CartProvider.jsx         # Cart context provider
│   │
│   ├── loader/
│   │   └── loader.js                # Route loaders
│   │
│   ├── testComponents/
│   │   └── AddProduct.jsx           # Test/dev components
│   │
│   ├── utils/
│   │   ├── datalayer.js             # Analytics data layer
│   │   └── saveAddress.js           # Address storage utility
│   │
│   ├── index.css                    # Global styles
│   └── main.jsx                     # App entry point
│
├── .vercel/                         # Vercel configuration
├── eslint.config.js                 # ESLint configuration
├── package.json                     # Dependencies and scripts
├── vercel.json                      # Vercel deployment config
├── vite.config.js                   # Vite configuration
└── README.md
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_backend_api_url
```

## Deployment

This project is configured for deployment on Vercel. Push to the main branch to trigger automatic deployment.

## License

Private - All rights reserved.