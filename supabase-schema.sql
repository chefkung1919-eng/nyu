-- 1. Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name_th VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- 2. Create products table
CREATE TABLE products (
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
CREATE TABLE product_options (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  option_group VARCHAR(255) NOT NULL, -- e.g., "Size", "Sweetness"
  option_name_th VARCHAR(255) NOT NULL,
  option_name_en VARCHAR(255) NOT NULL,
  price_modifier DECIMAL(10,2) DEFAULT 0
);

-- 4. Create orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  fulfillment_type VARCHAR(20) NOT NULL CHECK (fulfillment_type IN ('pickup', 'delivery')),
  delivery_address TEXT,
  pickup_time TIMESTAMPTZ,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'ready', 'completed', 'cancelled')),
  total_price DECIMAL(10,2) NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create order_items table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
  product_name_snapshot VARCHAR(255) NOT NULL,
  selected_options JSONB,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Public read access for menu items
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (is_available = true);
CREATE POLICY "Public read access for product_options" ON product_options FOR SELECT USING (true);

-- Allow public to insert orders and order_items (since there is no auth)
CREATE POLICY "Public insert access for orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for order_items" ON order_items FOR INSERT WITH CHECK (true);

-- Allow public to read their own order by knowing the ID or order_number
CREATE POLICY "Public read access for orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Public read access for order_items" ON order_items FOR SELECT USING (true);

-- Insert dummy data
INSERT INTO categories (name_th, name_en, slug, sort_order) VALUES
('กาแฟร้อน', 'Hot Coffee', 'hot-coffee', 1),
('กาแฟเย็น', 'Iced Coffee', 'iced-coffee', 2),
('เบเกอรี่', 'Bakery', 'bakery', 3);

INSERT INTO products (category_id, name_th, name_en, description_th, description_en, price, is_featured, image_url) VALUES
(1, 'เอสเพรสโซ่', 'Espresso', 'เอสเพรสโซ่เข้มข้น สกัดจากเมล็ดกาแฟอาราบิก้า 100%', 'Rich espresso extracted from 100% Arabica beans', 90, true, 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800'),
(2, 'อเมริกาโน่เย็น', 'Iced Americano', 'อเมริกาโน่เย็นชื่นใจ ดื่มง่าย', 'Refreshing iced americano', 100, true, 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800'),
(3, 'ครัวซองต์เนยสด', 'Butter Croissant', 'ครัวซองต์อบกรอบ หอมเนยฝรั่งเศส', 'Crispy croissant with French butter', 85, false, 'https://images.unsplash.com/photo-1555507036-ab1f40ce88ca?auto=format&fit=crop&q=80&w=800');
