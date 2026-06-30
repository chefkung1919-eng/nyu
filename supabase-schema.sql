-- ==========================================
-- LUMIÈRE COFFEE - SUPABASE SCHEMA (UPDATE)
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
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  phone VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255),
  points_balance INTEGER DEFAULT 0, -- Renamed from total_points to points_balance
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
  total_price DECIMAL(10,2) NOT NULL,
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

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Access for Menus
DROP POLICY IF EXISTS "Public read access for categories" ON categories;
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read access for products" ON products;
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (is_available = true);

-- 2. Customer Table Access
DROP POLICY IF EXISTS "Public read customers" ON customers;
CREATE POLICY "Public read customers" ON customers FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public insert customers" ON customers;
CREATE POLICY "Public insert customers" ON customers FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public update customers" ON customers;
CREATE POLICY "Public update customers" ON customers FOR UPDATE USING (true);

-- 3. Order & Transactions Access
DROP POLICY IF EXISTS "Public insert orders" ON orders;
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public insert order_items" ON order_items;
CREATE POLICY "Public insert order_items" ON order_items FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public insert point_tx" ON point_transactions;
CREATE POLICY "Public insert point_tx" ON point_transactions FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public read orders" ON orders;
CREATE POLICY "Public read orders" ON orders FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public read point_tx" ON point_transactions;
CREATE POLICY "Public read point_tx" ON point_transactions FOR SELECT USING (true);


-- ==========================================
-- SEED DATA (16 Products)
-- ==========================================

TRUNCATE TABLE categories, products CASCADE;

INSERT INTO categories (id, name_th, name_en, slug, sort_order) VALUES
(1, 'กาแฟร้อน', 'Hot Coffee', 'hot-coffee', 1),
(2, 'กาแฟเย็น', 'Iced Coffee', 'iced-coffee', 2),
(3, 'เครื่องดื่มพิเศษ', 'Special Drinks', 'special-drinks', 3),
(4, 'เบเกอรี่', 'Bakery', 'bakery', 4);

SELECT setval('categories_id_seq', 4, true);

-- 16 Products (4 items per category)
INSERT INTO products (id, category_id, name_th, name_en, description_th, description_en, price, is_featured, image_url) VALUES
-- Hot Coffee
(1, 1, 'เอสเพรสโซ่ช็อต', 'Espresso Shot', 'เอสเพรสโซ่สกัดเข้มข้น หอมกรุ่น', 'Rich and aromatic espresso shot', 80, false, 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800'),
(2, 1, 'ฮอท คาปูชิโน่', 'Hot Cappuccino', 'กาแฟนมร้อนพร้อมฟองนมหนานุ่ม', 'Hot espresso with velvety milk foam', 100, true, 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800'),
(3, 1, 'ฮอท ลาเต้', 'Hot Latte', 'กาแฟนมร้อนรสนุ่มละมุน', 'Smooth and mild hot milk coffee', 100, false, 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=800'),
(4, 1, 'ฮอท อเมริกาโน่', 'Hot Americano', 'กาแฟดำร้อน รสชาติแท้จากเมล็ดกาแฟ', 'Hot black coffee, pure and simple', 90, false, 'https://images.unsplash.com/photo-1554372562-835698b671a5?auto=format&fit=crop&q=80&w=800'),

-- Iced Coffee
(5, 2, 'อเมริกาโน่เย็น', 'Iced Americano', 'กาแฟดำเย็น สดชื่น ดื่มง่าย', 'Refreshing iced black coffee', 100, true, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800'),
(6, 2, 'ลาเต้เย็น', 'Iced Latte', 'กาแฟนมเย็น รสชาติกลมกล่อมลงตัว', 'Perfectly balanced iced milk coffee', 120, false, 'https://images.unsplash.com/photo-1461023058943-07cb1ce8912d?auto=format&fit=crop&q=80&w=800'),
(7, 2, 'มอคค่าเย็น', 'Iced Mocha', 'กาแฟผสมช็อกโกแลตพรีเมียมเย็น', 'Iced coffee blended with premium chocolate', 130, false, 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800'),
(8, 2, 'คาราเมลมัคคิอาโต้เย็น', 'Iced Caramel Macchiato', 'กาแฟนมเย็นราดซอสคาราเมลหอมหวาน', 'Iced milk coffee drizzled with sweet caramel', 140, true, 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=800'),

-- Special Drinks
(9, 3, 'เดอร์ตี้ คอฟฟี่', 'Dirty Coffee', 'นมสดเย็นจัดราดด้วยเอสเพรสโซ่ร้อน', 'Cold milk topped with hot espresso shot', 140, true, 'https://images.unsplash.com/photo-1599395714085-714041b6ecbc?auto=format&fit=crop&q=80&w=800'),
(10, 3, 'มัทฉะลาเต้เย็น', 'Iced Matcha Latte', 'ชาเขียวมัทฉะพรีเมียมนำเข้าจากญี่ปุ่น', 'Premium Japanese iced matcha green tea', 135, false, 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80&w=800'),
(11, 3, 'ยูซุ โคลด์บรูว์', 'Yuzu Cold Brew', 'กาแฟสกัดเย็นผสมน้ำส้มยูซุ หอมสดชื่น', 'Cold brew coffee with refreshing yuzu juice', 150, true, 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800'),
(12, 3, 'โฮจิฉะลาเต้เย็น', 'Iced Hojicha Latte', 'ชาเขียวคั่วญี่ปุ่น รสชาตินุ่มลึก', 'Roasted Japanese green tea latte', 135, false, 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800'),

-- Bakery
(13, 4, 'ครัวซองต์เนยสด', 'Butter Croissant', 'ครัวซองต์อบกรอบ หอมเนยฝรั่งเศส', 'Crispy croissant with French butter', 85, false, 'https://images.unsplash.com/photo-1555507036-ab1f40ce88ca?auto=format&fit=crop&q=80&w=800'),
(14, 4, 'ชีสเค้กหน้าไหม้', 'Basque Cheesecake', 'ชีสเค้กหน้าไหม้สไตล์สเปน เนื้อเนียนนุ่ม', 'Creamy and smooth Spanish basque cheesecake', 160, true, 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800'),
(15, 4, 'ช็อกโกแลตบราวนี่', 'Chocolate Brownie', 'บราวนี่เนื้อหนึบ ช็อกโกแลตเข้มข้น', 'Fudgy brownie with intense chocolate', 95, false, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800'),
(16, 4, 'เลมอนทาร์ต', 'Lemon Tart', 'ทาร์ตเลมอนเปรี้ยวอมหวาน สดชื่น', 'Sweet and sour refreshing lemon tart', 140, false, 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800');

SELECT setval('products_id_seq', 16, true);
