# Lumière Coffee

Lumière Coffee is a luxury-themed, minimalist single-page application (SPA) built for a premium coffee shop. It features an elegant user interface, an end-to-end ordering flow, and a built-in Loyalty Points system using phone numbers.

## Architecture & Tech Stack

This project is built using:
- **HTML5 & Vanilla JavaScript**: Pure client-side logic managed by the `app` object in `app.js`.
- **Tailwind CSS (via CDN)**: For rapid, utility-first styling with custom theme colors (brand-dark, brand-gold, etc.).
- **Supabase (via CDN)**: For database storage, real-time updates (Order Tracking), and user persistence.

*Note: No build tools (like Node.js, Webpack, or Vite) are required. You can simply open `index.html` in a browser to run the app.*

## Features

1. **Bilingual UI (TH / EN)**: Fully localized interface with a simple toggle switch.
2. **Product Catalog**: Fetching live data from Supabase. Products are categorized into Hot Coffee, Iced Coffee, Special Drinks, and Bakery.
3. **Shopping Cart & Checkout**: 
   - Add items, adjust quantities.
   - Choose fulfillment type (Pickup / Delivery).
   - Dynamic subtotal and total calculation.
4. **Loyalty System (Rewards)**:
   - Earn points on every order (25 THB = 1 Point).
   - Use 100 points for a 50 THB discount during checkout.
   - `/rewards` page to check current points and view progress towards rewards (50 THB discount, Free Drink) using a phone number.
5. **Real-time Order Tracking**: Enter your order number to see live status updates.

---

## Getting Started

### 1. Supabase Setup
1. Create a new project at [Supabase](https://supabase.com/).
2. Go to the SQL Editor in your Supabase dashboard.
3. Copy the entire contents of `supabase-schema.sql` and run it. This will:
   - Create tables: `categories`, `products`, `product_options`, `customers`, `orders`, `order_items`, and `point_transactions`.
   - Setup Row Level Security (RLS) policies allowing public inserts for orders and public reads for menus.
   - Insert 16 dummy products to get you started.
4. Navigate to **Project Settings -> API** in Supabase.
5. Copy your **Project URL** and **anon public key**.

### 2. Connect the App
1. Open `app.js` in a text editor.
2. At the very top, locate the configuration section:
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```
3. Replace the placeholder strings with your actual Supabase URL and Key.
4. Save the file.

### 3. Run Locally
Because the app relies entirely on CDN links and Vanilla JS, you do not need a server to run it locally.
- Simply double-click `index.html` to open it in your browser.
- *Alternatively*, you can run it via a local live server extension in VSCode for auto-reloading.

---

## Managing Data in Supabase

Since this app does not have a dedicated Admin Dashboard, you will manage everything directly via the **Supabase Table Editor**.

### Managing Customers and Points
1. Log into your Supabase Dashboard and go to the **Table Editor**.
2. Select the `customers` table.
3. Here you can see all registered customers by their phone numbers.
4. To manually adjust points, simply edit the `points_balance` column for the desired customer. The customer will immediately see their updated balance on the Rewards page.

### Managing Products and Images
1. In the Table Editor, select the `products` table.
2. You can add, edit, or delete items. 
3. To update a product's image, upload your desired image to Supabase **Storage** (or any image hosting service), get the public URL, and paste it into the `image_url` column of the specific product.

### Managing Orders
1. Select the `orders` table.
2. When a new order arrives, its status will be `pending`.
3. To update the customer's tracking status, edit the `status` column to one of the following:
   - `preparing`: Order is being made.
   - `ready`: Order is ready for pickup or out for delivery.
   - `completed`: Order has been picked up/delivered.
   - `cancelled`: Order is cancelled.
4. Because real-time updates are enabled, the customer's tracking page will automatically refresh when you change the status.

---

## Deployment

The project is static, meaning it can be hosted on any static file hosting service for free.

### Vercel / Netlify
1. Create a new project.
2. Connect your GitHub repository containing these files.
3. Leave the build command empty.
4. Deploy!

### GitHub Pages
1. Push this repository to GitHub.
2. Go to repository Settings -> Pages.
3. Select the `main` branch as the source and click Save.
4. Your site will be live at `https://yourusername.github.io/your-repo-name`.
