# Lumière Coffee - Luxury Online Ordering Web App

This is a premium coffee shop online ordering application built with **Vanilla HTML, CSS, JavaScript, Tailwind CSS (via CDN), and Supabase (via CDN)**.
It does not require Node.js, `npm`, or any build tools to run.

## 🚀 How to Run Locally

Since this app is built with pure web technologies, running it locally is incredibly simple:

1. **Option 1 (Easiest)**: Just double-click the `index.html` file to open it in your web browser (Chrome, Safari, Edge).
2. **Option 2 (Live Server)**: If you use VS Code, install the "Live Server" extension, right-click `index.html`, and select "Open with Live Server". This will auto-refresh the page when you make changes.

## 🗄️ Supabase Setup & Connection

By default, the app uses **Dummy Data** so you can test the UI immediately. To connect it to your real database:

1. Create a free account at [Supabase](https://supabase.com/).
2. Create a new project.
3. Go to **SQL Editor** in your Supabase dashboard.
4. Copy the entire contents of `supabase-schema.sql` and run it in the SQL Editor. This will create all necessary tables, Row Level Security (RLS) policies, and insert some sample data.
5. Go to **Project Settings -> API**.
6. Copy your **Project URL** and **anon public key**.
7. Open `app.js` and replace the placeholders at the very top:
   ```javascript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```
8. The app will automatically switch from dummy data to fetching from your Supabase database!

## 🛒 Admin & Managing Menus

Because this app focuses on the client-facing experience without an Admin Dashboard, you can manage your menus and orders directly via the **Supabase Table Editor**:
- **To add a menu item**: Go to `products` table in Supabase, click "Insert row", fill in the details (`name_th`, `price`, `image_url`, etc.).
- **To update order status**: Go to `orders` table, find the order, and change the `status` column from `pending` to `preparing` or `ready`. Because the app uses Supabase Realtime, the customer's tracking page will update automatically!

## 🌐 How to Deploy (Make it live on the internet)

Since this app has no build step, you can host it for free on **GitHub Pages** or **Vercel**:

### Deploy via GitHub Pages (Recommended)
1. Create a new repository on GitHub.
2. Upload these files (`index.html`, `style.css`, `app.js`) to the repository.
3. Go to the repository's **Settings** > **Pages**.
4. Under "Build and deployment", set the **Source** to "Deploy from a branch".
5. Select the `main` branch and `/root` folder, then click **Save**.
6. Wait a few minutes, and your site will be live at `https://your-username.github.io/your-repo-name/`!

### Deploy via Vercel
1. Push your code to GitHub.
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. In "Framework Preset", leave it as "Other".
5. Click **Deploy**. Vercel will instantly host your HTML/JS files.

---
*Built with ❤️ using Antigravity*
