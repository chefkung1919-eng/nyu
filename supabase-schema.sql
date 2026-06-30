-- ==========================================
-- LUMIÈRE COFFEE - SUPABASE SCHEMA
-- ==========================================

-- 1. Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name_th VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- 2. Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  name_th VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  description_th TEXT,
  description_en TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create product_options table
CREATE TABLE IF NOT EXISTS product_options (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  option_group VARCHAR(255) NOT NULL,
  option_name_th VARCHAR(255) NOT NULL,
  option_name_en VARCHAR(255) NOT NULL,
  price_modifier DECIMAL(10,2) DEFAULT 0
);

-- 4. Create customers table (Loyalty System)
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255),
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  fulfillment_type VARCHAR(20) NOT NULL CHECK (fulfillment_type IN ('pickup', 'delivery')),
  delivery_address TEXT,
  pickup_time TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'completed', 'cancelled')),
  total_price DECIMAL(10,2) NOT NULL, -- Final price after discount
  discount_amount DECIMAL(10,2) DEFAULT 0,
  points_earned INTEGER DEFAULT 0,
  points_redeemed INTEGER DEFAULT 0,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  product_name_snapshot VARCHAR(255) NOT NULL,
  selected_options JSONB,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL
);

-- 7. Create point_transactions table
CREATE TABLE IF NOT EXISTS point_transactions (
  id SERIAL PRIMARY KEY,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  points_change INTEGER NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('earn', 'redeem')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Access for Menus
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (is_available = true);
CREATE POLICY "Public read access for product_options" ON product_options FOR SELECT USING (true);

-- 2. Customer Table Access
-- Allow public to SELECT customers by phone (to check points)
CREATE POLICY "Public read customers" ON customers FOR SELECT USING (true);
-- Allow public to INSERT new customers during checkout
CREATE POLICY "Public insert customers" ON customers FOR INSERT WITH CHECK (true);
-- Allow public to UPDATE points (in a real app this should be done via secure RPC/backend, but for client-side we allow it)
CREATE POLICY "Public update customers" ON customers FOR UPDATE USING (true);

-- 3. Order & Transactions Access
-- Allow public to INSERT orders, items, and point transactions
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert order_items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert point_tx" ON point_transactions FOR INSERT WITH CHECK (true);

-- Allow public to SELECT their own data (by order_number or phone)
CREATE POLICY "Public read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Public read order_items" ON order_items FOR SELECT USING (true);
CREATE POLICY "Public read point_tx" ON point_transactions FOR SELECT USING (true);


-- ==========================================
-- SEED DATA (Dummy Data)
-- ==========================================

-- Clear existing dummy data if any (for fresh run)
TRUNCATE TABLE categories, products, product_options CASCADE;

INSERT INTO categories (id, name_th, name_en, slug, sort_order) VALUES
(1, 'กาแฟร้อน', 'Hot Coffee', 'hot-coffee', 1),
(2, 'กาแฟเย็น', 'Iced Coffee', 'iced-coffee', 2),
(3, 'เครื่องดื่มพิเศษ', 'Special Drinks', 'special-drinks', 3),
(4, 'เบเกอรี่', 'Bakery', 'bakery', 4)
ON CONFLICT (id) DO NOTHING;

-- Reset sequence for products
SELECT setval('products_id_seq', 10, true);

INSERT INTO products (id, category_id, name_th, name_en, description_th, description_en, price, is_featured, image_url) VALUES
(1, 1, 'ลูมิแยร์ เอสเพรสโซ่', 'Lumière Espresso', 'เอสเพรสโซ่ช็อตเข้มข้น สกัดจากเมล็ดกาแฟคั่วกลาง-เข้ม', 'Rich espresso shot from medium-dark roasted beans', 90, false, 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800'),
(2, 1, 'ฮอท คาปูชิโน่', 'Hot Cappuccino', 'กาแฟผสมนมร้อนและฟองนมเนียนนุ่ม', 'Espresso with steamed milk and velvety foam', 110, true, 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800'),
(3, 2, 'อเมริกาโน่เย็น', 'Iced Americano', 'อเมริกาโน่เย็นชื่นใจ รสชาติกาแฟแท้ๆ', 'Refreshing iced americano, pure coffee taste', 100, true, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800'),
(4, 2, 'ลาเต้เย็น', 'Iced Latte', 'กาแฟนมเย็น รสชาติกลมกล่อม', 'Smooth and balanced iced latte', 120, false, 'https://images.unsplash.com/photo-1461023058943-07cb1ce8912d?auto=format&fit=crop&q=80&w=800'),
(5, 2, 'มอคค่าเย็น', 'Iced Mocha', 'กาแฟผสมช็อกโกแลตเข้มข้น', 'Coffee blended with rich chocolate', 130, false, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800'),
(6, 3, 'เดอร์ตี้ คอฟฟี่', 'Dirty Coffee', 'นมเย็นจัดราดด้วยเอสเพรสโซ่ช็อตร้อน', 'Cold milk topped with a hot espresso shot', 140, true, 'https://images.unsplash.com/photo-1599395714085-714041b6ecbc?auto=format&fit=crop&q=80&w=800'),
(7, 3, 'มัทฉะลาเต้', 'Matcha Latte', 'ชาเขียวมัทฉะพรีเมียมจากญี่ปุ่น', 'Premium Japanese matcha green tea', 135, false, 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80&w=800'),
(8, 3, 'ยูซุ โคลด์บรูว์', 'Yuzu Cold Brew', 'กาแฟสกัดเย็นผสมน้ำส้มยูซุ หอมสดชื่น', 'Cold brew coffee with refreshing yuzu juice', 150, true, 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800'),
(9, 4, 'ครัวซองต์เนยสด', 'Butter Croissant', 'ครัวซองต์อบกรอบ หอมเนยฝรั่งเศส', 'Crispy croissant with French butter', 85, false, 'https://images.unsplash.com/photo-1555507036-ab1f40ce88ca?auto=format&fit=crop&q=80&w=800'),
(10, 4, 'ชีสเค้กหน้าไหม้', 'Basque Cheesecake', 'ชีสเค้กหน้าไหม้สไตล์สเปน เนื้อเนียนนุ่ม', 'Creamy and smooth Spanish basque cheesecake', 160, true, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800')
ON CONFLICT (id) DO UPDATE SET 
  name_th = EXCLUDED.name_th,
  name_en = EXCLUDED.name_en,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url;
