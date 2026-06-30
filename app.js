// === CONFIGURATION ===
// TODO: Replace with your Supabase URL and Anon Key
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase Client
let supabase = null;
if (SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// === I18N DICTIONARY ===
const dict = {
    th: {
        nav_home: "หน้าแรก",
        nav_menu: "เมนู",
        nav_track: "ติดตามออเดอร์",
        nav_points: "แต้มสะสม",
        nav_about: "เกี่ยวกับเรา",
        hero_title: "ศิลปะแห่งกาแฟ",
        hero_subtitle: "สัมผัสรสชาติความพรีเมียมในทุกหยด คัดสรรจากเมล็ดพันธุ์ที่ดีที่สุด สู่มือคุณ",
        btn_order_now: "สั่งเลย",
        featured_title: "เมนูแนะนำ",
        btn_view_all_menu: "ดูเมนูทั้งหมด",
        menu_title: "เมนูของเรา",
        cart_title: "ตะกร้าสินค้า",
        cart_empty: "ตะกร้าของคุณยังว่างเปล่า",
        total_amount: "ราคารวม",
        btn_checkout: "ดำเนินการสั่งซื้อ",
        checkout_title: "ชำระเงิน / ยืนยันการสั่งซื้อ",
        checkout_info: "ข้อมูลติดต่อ",
        checkout_name: "ชื่อ-นามสกุล *",
        checkout_phone: "เบอร์โทรศัพท์ *",
        checkout_method: "รูปแบบการรับสินค้า",
        checkout_pickup: "รับเองที่ร้าน",
        checkout_delivery: "จัดส่งเดลิเวอรี่",
        checkout_pickup_time: "เวลารับสินค้า (โดยประมาณ)",
        time_asap: "เร็วที่สุด (15-20 นาที)",
        checkout_address: "ที่อยู่จัดส่ง *",
        checkout_note: "หมายเหตุเพิ่มเติม",
        btn_confirm_order: "ยืนยันคำสั่งซื้อ",
        track_title: "ติดตามออเดอร์",
        track_subtitle: "กรอกหมายเลขออเดอร์ของคุณเพื่อตรวจสอบสถานะ",
        btn_track: "ค้นหา",
        status_pending: "รอดำเนินการ",
        status_preparing: "กำลังเตรียม",
        status_ready: "พร้อมรับ/จัดส่งแล้ว",
        status_completed: "เสร็จสิ้น",
        status_cancelled: "ยกเลิก",
        btn_add_to_cart: "เพิ่มลงตะกร้า",
        currency: "฿",
        your_points: "แต้มสะสมของคุณ:",
        use_points_discount: "ใช้ 100 แต้ม แลกส่วนลด 50 บาท",
        subtotal: "ยอดรวม:",
        discount: "ส่วนลด (แลกแต้ม):",
        total_amount_pay: "ยอดสุทธิ:",
        points_subtitle: "กรอกเบอร์โทรศัพท์ของคุณเพื่อตรวจสอบแต้มสะสมและประวัติ",
        btn_check_points: "ตรวจสอบแต้ม",
        points_balance: "แต้มคงเหลือ",
        points_history: "ประวัติการใช้งาน",
        point_earn: "ได้รับแต้ม",
        point_redeem: "ใช้แต้ม",
        no_history: "ยังไม่มีประวัติการใช้งาน"
    },
    en: {
        nav_home: "Home",
        nav_menu: "Menu",
        nav_track: "Track Order",
        nav_points: "My Points",
        nav_about: "About Us",
        hero_title: "The Art of Coffee",
        hero_subtitle: "Experience premium taste in every drop, crafted from the finest beans.",
        btn_order_now: "Order Now",
        featured_title: "Featured",
        btn_view_all_menu: "View All Menu",
        menu_title: "Our Menu",
        cart_title: "Your Cart",
        cart_empty: "Your cart is empty",
        total_amount: "Total",
        btn_checkout: "Proceed to Checkout",
        checkout_title: "Checkout",
        checkout_info: "Contact Information",
        checkout_name: "Full Name *",
        checkout_phone: "Phone Number *",
        checkout_method: "Fulfillment Method",
        checkout_pickup: "Pickup at store",
        checkout_delivery: "Delivery",
        checkout_pickup_time: "Estimated Pickup Time",
        time_asap: "ASAP (15-20 mins)",
        checkout_address: "Delivery Address *",
        checkout_note: "Additional Note",
        btn_confirm_order: "Confirm Order",
        track_title: "Track Order",
        track_subtitle: "Enter your order number to check status",
        btn_track: "Track",
        status_pending: "Pending",
        status_preparing: "Preparing",
        status_ready: "Ready",
        status_completed: "Completed",
        status_cancelled: "Cancelled",
        btn_add_to_cart: "Add to Cart",
        currency: "฿",
        your_points: "Your Points:",
        use_points_discount: "Use 100 points for 50฿ discount",
        subtotal: "Subtotal:",
        discount: "Discount (Points):",
        total_amount_pay: "Net Total:",
        points_subtitle: "Enter your phone number to check points and history",
        btn_check_points: "Check Points",
        points_balance: "Points Balance",
        points_history: "Transaction History",
        point_earn: "Earned",
        point_redeem: "Redeemed",
        no_history: "No transaction history yet"
    }
};

// === DUMMY DATA FALLBACK ===
const dummyCategories = [
    { id: 1, name_th: "กาแฟร้อน", name_en: "Hot Coffee", slug: "hot-coffee" },
    { id: 2, name_th: "กาแฟเย็น", name_en: "Iced Coffee", slug: "iced-coffee" },
    { id: 3, name_th: "เครื่องดื่มพิเศษ", name_en: "Special Drinks", slug: "special-drinks" },
    { id: 4, name_th: "เบเกอรี่", name_en: "Bakery", slug: "bakery" }
];
const dummyProducts = [
    { id: 1, category_id: 1, name_th: "ลูมิแยร์ เอสเพรสโซ่", name_en: "Lumière Espresso", price: 90, image_url: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800", is_featured: false },
    { id: 2, category_id: 1, name_th: "ฮอท คาปูชิโน่", name_en: "Hot Cappuccino", price: 110, image_url: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800", is_featured: true },
    { id: 3, category_id: 2, name_th: "อเมริกาโน่เย็น", name_en: "Iced Americano", price: 100, image_url: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800", is_featured: true },
    { id: 4, category_id: 2, name_th: "ลาเต้เย็น", name_en: "Iced Latte", price: 120, image_url: "https://images.unsplash.com/photo-1461023058943-07cb1ce8912d?auto=format&fit=crop&q=80&w=800", is_featured: false },
    { id: 5, category_id: 2, name_th: "มอคค่าเย็น", name_en: "Iced Mocha", price: 130, image_url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800", is_featured: false },
    { id: 6, category_id: 3, name_th: "เดอร์ตี้ คอฟฟี่", name_en: "Dirty Coffee", price: 140, image_url: "https://images.unsplash.com/photo-1599395714085-714041b6ecbc?auto=format&fit=crop&q=80&w=800", is_featured: true },
    { id: 7, category_id: 3, name_th: "มัทฉะลาเต้", name_en: "Matcha Latte", price: 135, image_url: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80&w=800", is_featured: false },
    { id: 8, category_id: 3, name_th: "ยูซุ โคลด์บรูว์", name_en: "Yuzu Cold Brew", price: 150, image_url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800", is_featured: true },
    { id: 9, category_id: 4, name_th: "ครัวซองต์เนยสด", name_en: "Butter Croissant", price: 85, image_url: "https://images.unsplash.com/photo-1555507036-ab1f40ce88ca?auto=format&fit=crop&q=80&w=800", is_featured: false },
    { id: 10, category_id: 4, name_th: "ชีสเค้กหน้าไหม้", name_en: "Basque Cheesecake", price: 160, image_url: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800", is_featured: true }
];

// In-memory dummy DB for points (if Supabase not connected)
const dummyCustomers = {}; // phone -> { name, total_points, history: [] }

// === APPLICATION STATE ===
const app = {
    lang: localStorage.getItem('lumiere_lang') || 'th',
    cart: JSON.parse(localStorage.getItem('lumiere_cart')) || [],
    currentView: 'home',
    categories: [],
    products: [],
    
    // Checkout State
    currentCustomerPoints: 0,
    customerId: null,
    usePointsDiscount: false,
    debounceTimer: null,

    init() {
        this.applyLanguage();
        this.updateCartUI();
        this.navigate(this.currentView);
        this.fetchData();
    },

    toggleLanguage() {
        this.lang = this.lang === 'th' ? 'en' : 'th';
        localStorage.setItem('lumiere_lang', this.lang);
        document.getElementById('lang-toggle').innerText = this.lang.toUpperCase();
        this.applyLanguage();
        this.renderMenu(); 
        if(this.currentView === 'cart') this.renderCart();
    },

    applyLanguage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[this.lang][key]) {
                if (el.tagName === 'INPUT' && (el.type === 'text' || el.type === 'tel') && el.placeholder) {
                    el.placeholder = dict[this.lang][key];
                } else {
                    el.innerText = dict[this.lang][key];
                }
            }
        });
        document.getElementById('lang-toggle').innerText = this.lang === 'th' ? 'EN' : 'TH';
    },

    navigate(viewId) {
        document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
        this.currentView = viewId;
        window.scrollTo(0, 0);
        
        if(viewId === 'cart') this.renderCart();
        if(viewId === 'checkout') this.initCheckout();
    },

    async fetchData() {
        try {
            if (supabase) {
                const [cats, prods] = await Promise.all([
                    supabase.from('categories').select('*').order('sort_order'),
                    supabase.from('products').select('*').eq('is_available', true).order('id')
                ]);
                this.categories = cats.data || dummyCategories;
                this.products = prods.data || dummyProducts;
            } else {
                this.categories = dummyCategories;
                this.products = dummyProducts;
            }
            this.renderMenu();
            this.renderFeatured();
        } catch (e) {
            console.error("Error fetching data:", e);
            this.categories = dummyCategories;
            this.products = dummyProducts;
            this.renderMenu();
            this.renderFeatured();
        }
    },

    renderFeatured() {
        const featured = this.products.filter(p => p.is_featured).slice(0, 3);
        const container = document.getElementById('featured-menu-grid');
        container.innerHTML = featured.map(p => this.createProductCard(p)).join('');
    },

    renderMenu(categoryId = null) {
        const filterContainer = document.getElementById('categories-filter');
        let catsHtml = `<button onclick="app.renderMenu(null)" class="px-6 py-2 rounded-full border border-brand-gold ${categoryId === null ? 'bg-brand-gold text-brand-dark' : 'text-brand-gold hover:bg-brand-gold/10'} transition-colors">${this.lang === 'th' ? 'ทั้งหมด' : 'All'}</button>`;
        catsHtml += this.categories.map(c => `
            <button onclick="app.renderMenu(${c.id})" class="px-6 py-2 rounded-full border border-brand-gold ${categoryId === c.id ? 'bg-brand-gold text-brand-dark' : 'text-brand-gold hover:bg-brand-gold/10'} transition-colors">${this.lang === 'th' ? c.name_th : c.name_en}</button>
        `).join('');
        filterContainer.innerHTML = catsHtml;

        const gridContainer = document.getElementById('menu-grid');
        const displayProducts = categoryId ? this.products.filter(p => p.category_id === categoryId) : this.products;
        gridContainer.innerHTML = displayProducts.map(p => this.createProductCard(p)).join('');
    },

    createProductCard(p) {
        const name = this.lang === 'th' ? p.name_th : p.name_en;
        return `
        <div class="menu-card bg-brand-brown border border-brand-gold/10 rounded-sm overflow-hidden cursor-pointer" onclick="app.openProductModal(${p.id})">
            <div class="h-48 overflow-hidden bg-brand-dark">
                <img src="${p.image_url}" alt="${name}" class="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity">
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="font-serif text-xl text-brand-gold">${name}</h3>
                    <span class="text-brand-cream font-medium">฿${p.price}</span>
                </div>
                <button class="w-full border border-brand-gold text-brand-gold py-2 rounded-sm hover:bg-brand-gold hover:text-brand-dark transition-colors text-sm font-semibold">${dict[this.lang].btn_add_to_cart}</button>
            </div>
        </div>`;
    },

    openProductModal(id) {
        const p = this.products.find(x => x.id === id);
        if(!p) return;
        const name = this.lang === 'th' ? p.name_th : p.name_en;
        const desc = this.lang === 'th' ? p.description_th : p.description_en;
        
        const content = document.getElementById('modal-content');
        content.innerHTML = `
            <img src="${p.image_url}" alt="${name}" class="w-full h-64 object-cover rounded-sm mb-6">
            <h2 class="text-3xl font-serif text-brand-gold mb-2">${name}</h2>
            <p class="text-brand-cream/70 mb-6">${desc || ''}</p>
            <div class="flex justify-between items-center mb-8">
                <span class="text-2xl">฿${p.price}</span>
                <div class="flex items-center space-x-4 border border-brand-gold/30 rounded-sm px-4 py-2">
                    <button onclick="app.updateModalQty(-1)" class="text-brand-gold text-xl hover:text-brand-cream">-</button>
                    <span id="modal-qty" class="w-8 text-center text-lg">1</span>
                    <button onclick="app.updateModalQty(1)" class="text-brand-gold text-xl hover:text-brand-cream">+</button>
                </div>
            </div>
            <button onclick="app.addToCart(${p.id})" class="w-full bg-brand-gold text-brand-dark py-4 rounded-sm font-bold text-lg hover:bg-brand-goldHover transition-colors">${dict[this.lang].btn_add_to_cart}</button>
        `;
        document.getElementById('product-modal').classList.remove('hidden');
    },

    updateModalQty(delta) {
        const el = document.getElementById('modal-qty');
        let qty = parseInt(el.innerText) + delta;
        if(qty < 1) qty = 1;
        el.innerText = qty;
    },

    closeProductModal() {
        document.getElementById('product-modal').classList.add('hidden');
    },

    addToCart(productId) {
        const p = this.products.find(x => x.id === productId);
        const qty = parseInt(document.getElementById('modal-qty').innerText);
        
        const existing = this.cart.find(item => item.product_id === productId);
        if (existing) {
            existing.quantity += qty;
        } else {
            this.cart.push({
                product_id: p.id,
                name_th: p.name_th,
                name_en: p.name_en,
                price: p.price,
                quantity: qty,
                image_url: p.image_url
            });
        }
        
        this.saveCart();
        this.closeProductModal();
        
        // Wiggle cart icon
        const cartIcon = document.getElementById('cart-count');
        cartIcon.parentElement.classList.add('animate-bounce');
        setTimeout(() => cartIcon.parentElement.classList.remove('animate-bounce'), 1000);
    },

    updateCartQty(index, delta) {
        this.cart[index].quantity += delta;
        if(this.cart[index].quantity <= 0) {
            this.cart.splice(index, 1);
        }
        this.saveCart();
        this.renderCart();
    },

    saveCart() {
        localStorage.setItem('lumiere_cart', JSON.stringify(this.cart));
        this.updateCartUI();
    },

    updateCartUI() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const el = document.getElementById('cart-count');
        el.innerText = count;
        el.style.opacity = count > 0 ? 1 : 0;
    },

    renderCart() {
        const container = document.getElementById('cart-content');
        const summary = document.getElementById('cart-summary');
        
        if (this.cart.length === 0) {
            container.innerHTML = `<div class="text-center py-10 text-brand-cream/50">${dict[this.lang].cart_empty}</div>`;
            summary.classList.add('hidden');
            return;
        }

        let total = 0;
        container.innerHTML = this.cart.map((item, index) => {
            const name = this.lang === 'th' ? item.name_th : item.name_en;
            const subtotal = item.price * item.quantity;
            total += subtotal;
            return `
            <div class="flex items-center justify-between py-4 border-b border-brand-gold/10 last:border-0">
                <div class="flex items-center space-x-4">
                    <img src="${item.image_url}" class="w-16 h-16 object-cover rounded-sm border border-brand-gold/20">
                    <div>
                        <h4 class="font-serif text-lg text-brand-gold">${name}</h4>
                        <p class="text-brand-cream/70">฿${item.price}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-6">
                    <div class="flex items-center space-x-3 bg-brand-dark px-3 py-1 rounded-sm border border-brand-gold/30">
                        <button onclick="app.updateCartQty(${index}, -1)" class="text-brand-gold hover:text-brand-cream">-</button>
                        <span class="w-6 text-center">${item.quantity}</span>
                        <button onclick="app.updateCartQty(${index}, 1)" class="text-brand-gold hover:text-brand-cream">+</button>
                    </div>
                    <span class="font-medium text-lg min-w-[60px] text-right">฿${subtotal}</span>
                </div>
            </div>`;
        }).join('');

        summary.classList.remove('hidden');
        document.getElementById('cart-total-price').innerText = `฿${total}`;
    },

    // --- CHECKOUT & LOYALTY ---

    initCheckout() {
        this.usePointsDiscount = false;
        document.getElementById('use-points-checkbox').checked = false;
        document.getElementById('loyalty-box').classList.add('hidden');
        this.updateCheckoutSummary();
    },

    updateCheckoutSummary() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let discount = 0;
        if (this.usePointsDiscount && this.currentCustomerPoints >= 100) {
            discount = 50;
        }
        const total = subtotal - discount;

        document.getElementById('summary-subtotal').innerText = `฿${subtotal}`;
        const discountRow = document.getElementById('summary-discount-row');
        if (discount > 0) {
            discountRow.classList.remove('hidden');
            document.getElementById('summary-discount').innerText = `-฿${discount}`;
        } else {
            discountRow.classList.add('hidden');
        }
        document.getElementById('summary-total').innerText = `฿${Math.max(0, total)}`;
    },

    debounceCheckPoints() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.checkCustomerPoints();
        }, 500);
    },

    async checkCustomerPoints() {
        const phone = document.getElementById('checkout-phone').value.trim();
        if (phone.length < 9) {
            document.getElementById('loyalty-box').classList.add('hidden');
            this.currentCustomerPoints = 0;
            this.customerId = null;
            this.usePointsDiscount = false;
            this.updateCheckoutSummary();
            return;
        }

        try {
            let pts = 0;
            let cId = null;

            if (supabase) {
                const { data } = await supabase.from('customers').select('id, total_points').eq('phone', phone).single();
                if (data) {
                    pts = data.total_points;
                    cId = data.id;
                }
            } else {
                // Dummy logic
                if (dummyCustomers[phone]) {
                    pts = dummyCustomers[phone].total_points;
                    cId = 'dummy-id';
                }
            }

            this.currentCustomerPoints = pts;
            this.customerId = cId;
            
            const box = document.getElementById('loyalty-box');
            const ptSpan = document.getElementById('checkout-current-points');
            const chk = document.getElementById('use-points-checkbox');
            const lbl = document.getElementById('discount-label');

            box.classList.remove('hidden');
            ptSpan.innerText = pts;

            if (pts >= 100) {
                chk.disabled = false;
                lbl.classList.remove('opacity-50');
            } else {
                chk.disabled = true;
                chk.checked = false;
                this.usePointsDiscount = false;
                lbl.classList.add('opacity-50');
            }
            this.updateCheckoutSummary();

        } catch (e) {
            console.error("Error checking points", e);
        }
    },

    toggleDiscount() {
        this.usePointsDiscount = document.getElementById('use-points-checkbox').checked;
        this.updateCheckoutSummary();
    },

    toggleFulfillment() {
        const type = document.querySelector('input[name="fulfillment"]:checked').value;
        if (type === 'pickup') {
            document.getElementById('pickup-options').classList.remove('hidden');
            document.getElementById('delivery-options').classList.add('hidden');
            document.getElementById('checkout-address').required = false;
        } else {
            document.getElementById('pickup-options').classList.add('hidden');
            document.getElementById('delivery-options').classList.remove('hidden');
            document.getElementById('checkout-address').required = true;
        }
    },

    async submitOrder() {
        if(this.cart.length === 0) return;

        const name = document.getElementById('checkout-name').value;
        const phone = document.getElementById('checkout-phone').value;
        const fulfillment = document.querySelector('input[name="fulfillment"]:checked').value;
        const note = document.getElementById('checkout-note').value;
        
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const pointsRedeemed = (this.usePointsDiscount && this.currentCustomerPoints >= 100) ? 100 : 0;
        const discountAmount = pointsRedeemed > 0 ? 50 : 0;
        const finalPrice = Math.max(0, subtotal - discountAmount);
        
        // 25 THB = 1 Point (calculated from final price)
        const pointsEarned = Math.floor(finalPrice / 25);
        
        let address = null;
        let pickup_time = null;
        if (fulfillment === 'delivery') {
            address = document.getElementById('checkout-address').value;
        } else {
            pickup_time = new Date();
            pickup_time.setMinutes(pickup_time.getMinutes() + 30);
        }

        const order_number = 'ORD-' + Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        const btn = document.getElementById('submit-order-btn');
        btn.innerText = "กำลังประมวลผล...";
        btn.disabled = true;

        try {
            if (supabase) {
                // 1. Get or Create Customer
                let activeCustomerId = this.customerId;
                if (!activeCustomerId) {
                    const { data: newCust, error: errCust } = await supabase.from('customers').insert([{ phone, name, total_points: 0 }]).select().single();
                    if(errCust) throw errCust;
                    activeCustomerId = newCust.id;
                }

                // 2. Insert Order
                const { data: orderData, error: orderErr } = await supabase.from('orders').insert([{
                    order_number,
                    customer_id: activeCustomerId,
                    customer_name: name,
                    customer_phone: phone,
                    fulfillment_type: fulfillment,
                    delivery_address: address,
                    pickup_time: pickup_time,
                    total_price: finalPrice,
                    discount_amount: discountAmount,
                    points_earned: pointsEarned,
                    points_redeemed: pointsRedeemed,
                    note
                }]).select().single();
                if (orderErr) throw orderErr;

                // 3. Insert Items
                const orderItems = this.cart.map(item => ({
                    order_id: orderData.id,
                    product_id: item.product_id,
                    product_name_snapshot: this.lang === 'th' ? item.name_th : item.name_en,
                    quantity: item.quantity,
                    unit_price: item.price,
                    subtotal: item.price * item.quantity
                }));
                await supabase.from('order_items').insert(orderItems);

                // 4. Update Points & Log Transactions
                if (pointsRedeemed > 0) {
                    await supabase.from('point_transactions').insert([{
                        customer_id: activeCustomerId, order_id: orderData.id, points_change: -pointsRedeemed, type: 'redeem'
                    }]);
                    // Subtract points (Using raw update for simplicity in client side, assumes RLS allows)
                    const {data: cData} = await supabase.from('customers').select('total_points').eq('id', activeCustomerId).single();
                    await supabase.from('customers').update({total_points: cData.total_points - pointsRedeemed}).eq('id', activeCustomerId);
                }
                if (pointsEarned > 0) {
                    await supabase.from('point_transactions').insert([{
                        customer_id: activeCustomerId, order_id: orderData.id, points_change: pointsEarned, type: 'earn'
                    }]);
                    const {data: cData} = await supabase.from('customers').select('total_points').eq('id', activeCustomerId).single();
                    await supabase.from('customers').update({total_points: cData.total_points + pointsEarned}).eq('id', activeCustomerId);
                }

            } else {
                // Dummy Data Logic
                if (!dummyCustomers[phone]) {
                    dummyCustomers[phone] = { name, total_points: 0, history: [] };
                }
                const c = dummyCustomers[phone];
                if (pointsRedeemed > 0) {
                    c.total_points -= pointsRedeemed;
                    c.history.unshift({ type: 'redeem', points: -pointsRedeemed, date: new Date() });
                }
                if (pointsEarned > 0) {
                    c.total_points += pointsEarned;
                    c.history.unshift({ type: 'earn', points: pointsEarned, date: new Date() });
                }
            }
            
            // Success
            setTimeout(() => {
                this.cart = [];
                this.saveCart();
                
                const langTxt = this.lang === 'th' ? 
                    `สั่งซื้อสำเร็จ!\nหมายเลขออเดอร์ของคุณคือ ${order_number}\n\nคุณได้รับแต้มสะสมจากออเดอร์นี้ ${pointsEarned} แต้ม!` : 
                    `Success!\nYour order number is ${order_number}\n\nYou earned ${pointsEarned} points from this order!`;
                alert(langTxt);

                this.navigate('track');
                document.getElementById('track-order-number').value = order_number;
                this.trackOrder();
                btn.innerText = dict[this.lang].btn_confirm_order;
                btn.disabled = false;
                document.getElementById('checkout-form').reset();
            }, 1000);

        } catch (e) {
            console.error("Order submission failed:", e);
            alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
            btn.innerText = dict[this.lang].btn_confirm_order;
            btn.disabled = false;
        }
    },

    async trackOrder() {
        const orderNum = document.getElementById('track-order-number').value.trim();
        const resDiv = document.getElementById('track-result');
        if (!orderNum) return;

        resDiv.classList.remove('hidden');
        resDiv.innerHTML = `<div class="spinner mx-auto my-4"></div>`;

        try {
            let order = null;
            if (supabase) {
                const { data } = await supabase.from('orders').select('*').eq('order_number', orderNum).single();
                if (data) order = data;
            } else {
                order = { order_number: orderNum, status: 'preparing', customer_name: 'Customer', total_price: 380 };
            }

            if (order) {
                const statusKey = `status_${order.status}`;
                const statusText = dict[this.lang][statusKey] || order.status;
                
                let statusColor = 'text-brand-cream';
                if(order.status === 'ready') statusColor = 'text-green-400';
                if(order.status === 'preparing') statusColor = 'text-brand-gold';
                
                resDiv.innerHTML = `
                    <div class="flex justify-between items-start border-b border-brand-gold/20 pb-4 mb-4">
                        <div>
                            <p class="text-sm text-brand-cream/70 mb-1">Order #</p>
                            <h3 class="font-serif text-2xl text-brand-gold">${order.order_number}</h3>
                        </div>
                        <div class="text-right">
                            <p class="text-sm text-brand-cream/70 mb-1">Status</p>
                            <span class="px-4 py-1 rounded-full border border-brand-gold/30 bg-brand-dark ${statusColor} font-bold">${statusText}</span>
                        </div>
                    </div>
                    <p>Name: <span class="text-brand-gold">${order.customer_name}</span></p>
                    <p>Total: <span class="text-brand-gold">฿${order.total_price}</span></p>
                `;

                if (supabase) {
                    supabase.channel('custom-all-channel')
                    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${order.id}` }, payload => {
                        this.trackOrder();
                    }).subscribe();
                }

            } else {
                resDiv.innerHTML = `<p class="text-red-400">ไม่พบหมายเลขออเดอร์นี้ / Order not found</p>`;
            }
        } catch (e) {
            resDiv.innerHTML = `<p class="text-red-400">เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</p>`;
        }
    },

    // --- MY POINTS VIEW ---
    async checkMyPoints() {
        const phone = document.getElementById('points-phone').value.trim();
        const resDiv = document.getElementById('points-result');
        if (!phone) return;

        resDiv.classList.remove('hidden');
        resDiv.innerHTML = `<div class="spinner mx-auto my-4"></div>`;

        try {
            let pts = 0;
            let history = [];
            let name = "";

            if (supabase) {
                const { data: cData } = await supabase.from('customers').select('id, name, total_points').eq('phone', phone).single();
                if (cData) {
                    pts = cData.total_points;
                    name = cData.name;
                    const { data: txData } = await supabase.from('point_transactions').select('*').eq('customer_id', cData.id).order('created_at', { ascending: false });
                    if(txData) history = txData;
                } else {
                    throw new Error("Not found");
                }
            } else {
                if (dummyCustomers[phone]) {
                    pts = dummyCustomers[phone].total_points;
                    name = dummyCustomers[phone].name;
                    history = dummyCustomers[phone].history.map(h => ({
                        type: h.type,
                        points_change: h.points,
                        created_at: h.date.toISOString()
                    }));
                } else {
                    throw new Error("Not found");
                }
            }

            let historyHtml = history.length > 0 ? history.map(tx => {
                const isEarn = tx.type === 'earn';
                const sign = isEarn ? '+' : '';
                const colorClass = isEarn ? 'text-green-400' : 'text-red-400';
                const label = isEarn ? dict[this.lang].point_earn : dict[this.lang].point_redeem;
                const dateStr = new Date(tx.created_at).toLocaleDateString();
                return `
                    <div class="flex justify-between items-center py-3 border-b border-brand-gold/10 last:border-0">
                        <div>
                            <p class="font-medium text-brand-cream">${label}</p>
                            <p class="text-xs text-brand-cream/50">${dateStr}</p>
                        </div>
                        <span class="${colorClass} font-bold text-lg">${sign}${tx.points_change}</span>
                    </div>
                `;
            }).join('') : `<p class="text-center text-brand-cream/50 py-4">${dict[this.lang].no_history}</p>`;

            resDiv.innerHTML = `
                <div class="text-center mb-8 pb-8 border-b border-brand-gold/20">
                    <h2 class="text-2xl font-serif text-brand-gold mb-2">${name}</h2>
                    <p class="text-brand-cream/70 mb-4">${dict[this.lang].points_balance}</p>
                    <div class="text-6xl font-bold text-brand-cream">${pts}</div>
                </div>
                <div>
                    <h3 class="text-lg font-serif text-brand-gold mb-4">${dict[this.lang].points_history}</h3>
                    <div class="bg-brand-dark rounded-sm p-4 border border-brand-gold/10 max-h-64 overflow-y-auto">
                        ${historyHtml}
                    </div>
                </div>
            `;

        } catch (e) {
            resDiv.innerHTML = `<p class="text-brand-cream/70 text-center py-4">ไม่พบข้อมูลเบอร์โทรศัพท์นี้ / No record found</p>`;
        }
    }
};

// Start App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
