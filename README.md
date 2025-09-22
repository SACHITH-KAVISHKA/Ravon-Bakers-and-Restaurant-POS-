# Ravon Bakers - Restaurant POS System

A modern, touch-friendly Point of Sale (POS) system built with React, Vite, and TailwindCSS for restaurant use.

## Features

- **Touch-Optimized Interface**: Designed for touchscreen terminals with large, responsive buttons
- **Category-Based Menu**: Organized menu with categories like Savoury, Desserts, Drinks, etc.
- **Order Management**: Add items, adjust quantities, remove items from order list
- **Multiple Payment Methods**: Support for Cash, Card, and Card+Cash payments
- **Receipt Printing**: Thermal printer compatible receipt generation using `window.print()`
- **Real-time Calculations**: Automatic subtotal, discount, and balance calculations

## System Layout

### Left Panel - Order List
- Displays selected items with quantities and prices
- Quantity controls (+/- buttons)
- Item removal functionality
- Real-time subtotal calculation
- "Proceed to Payment" button

### Middle Panel - Item Grid
- Product buttons with names and prices
- Category-filtered item display
- Click-to-add functionality
- Responsive grid layout

### Right Panel - Categories
- Category filter buttons
- Visual feedback for active category
- Easy navigation between product categories

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

## Usage Workflow

1. **Select Category**: Click on category buttons (Savoury, Desserts, etc.) to filter items
2. **Add Items**: Click on item buttons to add them to the order list
3. **Manage Order**: 
   - Use +/- buttons to adjust quantities
   - Click × to remove items
   - View real-time subtotal
4. **Payment**: 
   - Click "Proceed to Payment" 
   - Select payment method (Cash/Card/Card+Cash)
   - Enter amounts and discounts
   - Process payment
5. **Receipt**: 
   - Review receipt details
   - Click "Print Receipt" to print
   - Receipt is formatted for thermal printers

## Payment Methods

### Cash Payment
- Enter cash amount given
- System calculates balance automatically
- Shows change to give customer

### Card Payment
- Mark order as paid by card
- No additional input required

### Card + Cash Payment
- Enter both card and cash amounts
- Split payment between methods

## Receipt Features

- Restaurant branding and location info
- Order details with quantities and prices
- Payment method and amounts
- Date, time, and receipt number
- Thermal printer compatible formatting
- Print using browser's print function

## Technical Details

### Built With
- **React 19.1.1** - UI framework
- **Vite 7.1.7** - Build tool and dev server
- **TailwindCSS 4.1.13** - Styling framework
- **React Context** - State management

### Key Components
- `OrderContext` - Global state management for orders and payments
- `CategoryPanel` - Category filtering sidebar
- `ItemGrid` - Product selection grid
- `OrderList` - Shopping cart functionality
- `PaymentModal` - Payment processing interface
- `ReceiptPrinter` - Receipt generation and printing

### Data Structure
- Menu items with categories, prices, and metadata
- Restaurant configuration (name, branch, terminal)
- Payment method definitions
- Order state management

## Customization

### Adding New Items
Edit `src/data/menuData.js` to add new menu items:

```javascript
{
  id: 'new-item',
  name: 'New Item Name',
  price: 150.00,
  category: 'savoury',
  image: null
}
```

### Adding New Categories
Add categories to the `categories` array in `menuData.js`:

```javascript
{
  id: 'new-category',
  name: 'NEW CATEGORY',
  color: 'bg-teal-500'
}
```

### Restaurant Configuration
Update restaurant details in `restaurantConfig` object in `menuData.js`.

## Browser Compatibility

- Chrome/Chromium (recommended for POS terminals)
- Firefox
- Safari
- Edge

## Print Setup

For thermal printer integration:
1. Ensure printer drivers are installed
2. Set printer as default in browser print settings
3. Use browser print dialog or integrate with specific printer APIs
4. Receipt format is optimized for 80mm thermal paper

## Responsive Design

The system adapts to different screen sizes:
- Desktop: Full three-panel layout
- Tablet: Stacked panels with scrolling
- Mobile: Optimized touch controls

## License

This project is built for Ravon Bakers restaurant chain.

## Support

For technical support or customization requests, please contact the development team.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
