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
        nav_rewards: "สะสมแต้ม",
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
        checkout_earn_msg: "คุณจะได้รับ",
        points_from_order: "แต้มจากออเดอร์นี้",
        points_subtitle: "กรอกเบอร์โทรศัพท์ของคุณเพื่อตรวจสอบแต้มสะสมและของรางวัล",
        btn_check_points: "ตรวจสอบแต้ม",
        points_balance: "แต้มสะสมปัจจุบัน",
        points_history: "ประวัติการรับ/ใช้แต้ม",
        point_earn: "ได้รับแต้ม",
        point_redeem: "แลกแต้ม",
        no_history: "ยังไม่มีประวัติ",
        reward_ready: "พร้อมแลกแล้ว",
        reward_locked: "ยังไม่ถึงเป้าหมาย",
        reward_tier1: "ส่วนลด 50 บาท",
        reward_tier2: "ฟรีเครื่องดื่ม 1 แก้ว"
    },
    en: {
        nav_home: "Home",
        nav_menu: "Menu",
        nav_track: "Track Order",
        nav_rewards: "Rewards",
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
        use_points_discount: "Use 100 pts for 50฿ discount",
        subtotal: "Subtotal:",
        discount: "Discount (Pts):",
        total_amount_pay: "Net Total:",
        checkout_earn_msg: "You will earn",
        points_from_order: "pts from this order",
        points_subtitle: "Enter your phone number to check rewards",
        btn_check_points: "Check Rewards",
        points_balance: "Current Points",
        points_history: "Transaction History",
        point_earn: "Earned",
        point_redeem: "Redeemed",
        no_history: "No history yet",
        reward_ready: "Available",
        reward_locked: "Locked",
        reward_tier1: "50฿ Discount",
        reward_tier2: "1 Free Drink"
    }
};

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
            if (!supabase) {
                console.warn("Supabase not connected. Please add your URL and Key.");
                document.getElementById('menu-grid').innerHTML = '<div class="col-span-full text-center py-20 text-red-400">Database not connected. Please check configuration.</div>';
                document.getElementById('featured-menu-grid').innerHTML = '<div class="col-span-full text-center py-10 text-red-400">Database not connected.</div>';
                return;
            }

            const [cats, prods] = await Promise.all([
                supabase.from('categories').select('*').order('sort_order'),
                supabase.from('products').select('*').eq('is_available', true).order('id')
            ]);
            
            this.categories = cats.data || [];
            this.products = prods.data || [];
            
            this.renderMenu();
            this.renderFeatured();
        } catch (e) {
            console.error("Error fetching data:", e);
            document.getElementById('menu-grid').innerHTML = '<div class="col-span-full text-center py-20 text-red-400">Failed to load menu.</div>';
            document.getElementById('featured-menu-grid').innerHTML = '<div class="col-span-full text-center py-10 text-red-400">Failed to load menu.</div>';
        }
    },

    renderFeatured() {
        if(this.products.length === 0) return;
        const featured = this.products.filter(p => p.is_featured).slice(0, 6);
        const container = document.getElementById('featured-menu-grid');
        container.innerHTML = featured.map(p => this.createProductCard(p)).join('');
    },

    renderMenu(categoryId = null) {
        if(this.categories.length === 0 || this.products.length === 0) return;
        
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
            <div class="p-6 flex flex-col justify-between h-40">
                <div>
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-serif text-xl text-brand-gold line-clamp-2">${name}</h3>
                        <span class="text-brand-cream font-medium whitespace-nowrap ml-2">฿${p.price}</span>
                    </div>
                </div>
                <button class="w-full border border-brand-gold text-brand-gold py-2 rounded-sm hover:bg-brand-gold hover:text-brand-dark transition-colors text-sm font-semibold mt-auto">${dict[this.lang].btn_add_to_cart}</button>
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
                <span class="text-2xl font-bold">฿${p.price}</span>
                <div class="flex items-center space-x-4 border border-brand-gold/30 rounded-sm px-4 py-2">
                    <button onclick="app.updateModalQty(-1)" class="text-brand-gold text-xl hover:text-brand-cream">-</button>
                    <span id="modal-qty" class="w-8 text-center text-lg">1</span>
                    <button onclick="app.updateModalQty(1)" class="text-brand-gold text-xl hover:text-brand-cream">+</button>
                </div>
            </div>
            <button onclick="app.addToCart(${p.id})" class="w-full bg-brand-gold text-brand-dark py-4 rounded-sm font-bold text-lg hover:bg-brand-goldHover transition-colors shadow-lg">${dict[this.lang].btn_add_to_cart}</button>
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
        if(this.currentView === 'checkout') this.updateCheckoutSummary();
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
            <div class="flex flex-col sm:flex-row items-center justify-between py-4 border-b border-brand-gold/10 last:border-0 gap-4">
                <div class="flex items-center space-x-4 w-full sm:w-auto">
                    <img src="${item.image_url}" class="w-16 h-16 object-cover rounded-sm border border-brand-gold/20">
                    <div>
                        <h4 class="font-serif text-lg text-brand-gold">${name}</h4>
                        <p class="text-brand-cream/70">฿${item.price}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div class="flex items-center space-x-3 bg-brand-dark px-3 py-1 rounded-sm border border-brand-gold/30">
                        <button onclick="app.updateCartQty(${index}, -1)" class="text-brand-gold hover:text-brand-cream px-2 py-1">-</button>
                        <span class="w-6 text-center">${item.quantity}</span>
                        <button onclick="app.updateCartQty(${index}, 1)" class="text-brand-gold hover:text-brand-cream px-2 py-1">+</button>
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
        const total = Math.max(0, subtotal - discount);
        
        // Calculate points earned (25 THB = 1 Pt)
        const earned = Math.floor(total / 25);

        document.getElementById('summary-subtotal').innerText = `฿${subtotal}`;
        const discountRow = document.getElementById('summary-discount-row');
        if (discount > 0) {
            discountRow.classList.remove('hidden');
            document.getElementById('summary-discount').innerText = `-฿${discount}`;
        } else {
            discountRow.classList.add('hidden');
        }
        document.getElementById('summary-total').innerText = `฿${total}`;
        document.getElementById('summary-earn-points').innerText = earned;
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
                const { data, error } = await supabase.from('customers').select('id, points_balance').eq('phone', phone).single();
                if (data && !error) {
                    pts = data.points_balance;
                    cId = data.id;
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
        if(!supabase) {
            alert("Database connection required to submit orders.");
            return;
        }

        const name = document.getElementById('checkout-name').value;
        const phone = document.getElementById('checkout-phone').value;
        const fulfillment = document.querySelector('input[name="fulfillment"]:checked').value;
        const note = document.getElementById('checkout-note').value;
        
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const pointsRedeemed = (this.usePointsDiscount && this.currentCustomerPoints >= 100) ? 100 : 0;
        const discountAmount = pointsRedeemed > 0 ? 50 : 0;
        const finalPrice = Math.max(0, subtotal - discountAmount);
        
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
            // 1. Get or Create Customer
            let activeCustomerId = this.customerId;
            let currentDbPoints = 0;

            if (!activeCustomerId) {
                const { data: newCust, error: errCust } = await supabase.from('customers').insert([{ phone, name, points_balance: 0 }]).select().single();
                if(errCust) throw errCust;
                activeCustomerId = newCust.id;
            } else {
                const { data: cData } = await supabase.from('customers').select('points_balance').eq('id', activeCustomerId).single();
                if(cData) currentDbPoints = cData.points_balance;
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

            // 4. Log Transactions & Update Points
            const newBalance = currentDbPoints - pointsRedeemed + pointsEarned;
            
            if (pointsRedeemed > 0) {
                await supabase.from('point_transactions').insert([{
                    customer_id: activeCustomerId, order_id: orderData.id, points_change: -pointsRedeemed, type: 'redeem'
                }]);
            }
            if (pointsEarned > 0) {
                await supabase.from('point_transactions').insert([{
                    customer_id: activeCustomerId, order_id: orderData.id, points_change: pointsEarned, type: 'earn'
                }]);
            }
            // Update final points balance
            await supabase.from('customers').update({points_balance: newBalance}).eq('id', activeCustomerId);
            
            // Success Flow
            setTimeout(() => {
                this.cart = [];
                this.saveCart();
                
                const langTxt = this.lang === 'th' ? 
                    `สั่งซื้อสำเร็จ!\nหมายเลขออเดอร์ของคุณคือ ${order_number}\n\nคุณได้รับ ${pointsEarned} แต้มจากออเดอร์นี้!` : 
                    `Success!\nYour order number is ${order_number}\n\nYou earned ${pointsEarned} points!`;
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
            alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง / Failed to process order.");
            btn.innerText = dict[this.lang].btn_confirm_order;
            btn.disabled = false;
        }
    },

    // --- TRACK ORDER ---
    async trackOrder() {
        const orderNum = document.getElementById('track-order-number').value.trim();
        const resDiv = document.getElementById('track-result');
        if (!orderNum) return;

        resDiv.classList.remove('hidden');
        resDiv.innerHTML = `<div class="spinner mx-auto my-4"></div>`;

        try {
            if (!supabase) throw new Error("No DB");
            
            const { data: order, error } = await supabase.from('orders').select('*').eq('order_number', orderNum).single();
            
            if (order && !error) {
                const statusKey = `status_${order.status}`;
                const statusText = dict[this.lang][statusKey] || order.status;
                
                let statusColor = 'text-brand-cream';
                if(order.status === 'ready' || order.status === 'completed') statusColor = 'text-green-400';
                if(order.status === 'preparing') statusColor = 'text-brand-gold';
                if(order.status === 'cancelled') statusColor = 'text-red-400';
                
                resDiv.innerHTML = `
                    <div class="flex justify-between items-start border-b border-brand-gold/20 pb-4 mb-4">
                        <div>
                            <p class="text-sm text-brand-cream/70 mb-1">Order #</p>
                            <h3 class="font-serif text-2xl text-brand-gold">${order.order_number}</h3>
                        </div>
                        <div class="text-right">
                            <p class="text-sm text-brand-cream/70 mb-1">Status</p>
                            <span class="px-4 py-1 rounded-full border border-brand-gold/30 bg-brand-dark ${statusColor} font-bold tracking-wide">${statusText}</span>
                        </div>
                    </div>
                    <p class="mb-2">Name: <span class="text-brand-gold">${order.customer_name}</span></p>
                    <p>Total: <span class="text-brand-gold">฿${order.total_price}</span></p>
                `;

                // Real-time subscription (only subscribe once per order)
                supabase.channel(`room_${order.id}`)
                .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${order.id}` }, payload => {
                    this.trackOrder();
                }).subscribe();

            } else {
                resDiv.innerHTML = `<p class="text-red-400 text-center py-4">ไม่พบหมายเลขออเดอร์นี้ / Order not found</p>`;
            }
        } catch (e) {
            resDiv.innerHTML = `<p class="text-red-400 text-center py-4">เกิดข้อผิดพลาดในการดึงข้อมูล</p>`;
        }
    },

    // --- REWARDS VIEW ---
    async checkMyRewards() {
        const phone = document.getElementById('points-phone').value.trim();
        const resDiv = document.getElementById('points-result');
        if (!phone) return;

        resDiv.classList.remove('hidden');
        resDiv.innerHTML = `<div class="spinner mx-auto my-4"></div>`;

        try {
            if(!supabase) throw new Error("No DB");

            const { data: cData, error: cErr } = await supabase.from('customers').select('id, name, points_balance').eq('phone', phone).single();
            if (cErr || !cData) throw new Error("Not found");

            const pts = cData.points_balance;
            const name = cData.name;
            
            const { data: txData } = await supabase.from('point_transactions').select('*').eq('customer_id', cData.id).order('created_at', { ascending: false }).limit(10);
            const history = txData || [];

            // History rendering
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

            // Progress bar logic
            const maxPoints = 200;
            const percentage = Math.min((pts / maxPoints) * 100, 100);
            const t1Ready = pts >= 100;
            const t2Ready = pts >= 200;

            resDiv.innerHTML = `
                <div class="text-center mb-10">
                    <h2 class="text-2xl font-serif text-brand-gold mb-2">${name}</h2>
                    <p class="text-brand-cream/70 mb-4">${dict[this.lang].points_balance}</p>
                    <div class="text-6xl font-bold text-brand-cream tracking-tight">${pts}</div>
                </div>
                
                <!-- Progress Bar -->
                <div class="mb-12 bg-brand-dark p-6 rounded-sm border border-brand-gold/20 shadow-inner">
                    <div class="relative w-full h-3 bg-brand-brown rounded-full mb-6 overflow-hidden border border-brand-gold/10">
                        <div class="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-gold/50 to-brand-gold transition-all duration-1000 ease-out rounded-full" style="width: ${percentage}%;"></div>
                    </div>
                    
                    <div class="flex flex-col md:flex-row justify-between gap-4 mt-4">
                        <!-- Tier 1 -->
                        <div class="flex-1 p-4 rounded-sm border ${t1Ready ? 'border-brand-gold bg-brand-gold/10' : 'border-brand-gold/20 bg-brand-brown'} text-center transition-colors">
                            <div class="text-xl font-bold ${t1Ready ? 'text-brand-gold' : 'text-brand-cream/50'} mb-1">100 Pts</div>
                            <div class="text-sm text-brand-cream mb-3">${dict[this.lang].reward_tier1}</div>
                            <span class="text-xs px-3 py-1 rounded-full ${t1Ready ? 'bg-brand-gold text-brand-dark font-bold' : 'bg-brand-dark text-brand-cream/50 border border-brand-gold/20'}">${t1Ready ? dict[this.lang].reward_ready : dict[this.lang].reward_locked}</span>
                        </div>
                        
                        <!-- Tier 2 -->
                        <div class="flex-1 p-4 rounded-sm border ${t2Ready ? 'border-brand-gold bg-brand-gold/10' : 'border-brand-gold/20 bg-brand-brown'} text-center transition-colors">
                            <div class="text-xl font-bold ${t2Ready ? 'text-brand-gold' : 'text-brand-cream/50'} mb-1">200 Pts</div>
                            <div class="text-sm text-brand-cream mb-3">${dict[this.lang].reward_tier2}</div>
                            <span class="text-xs px-3 py-1 rounded-full ${t2Ready ? 'bg-brand-gold text-brand-dark font-bold' : 'bg-brand-dark text-brand-cream/50 border border-brand-gold/20'}">${t2Ready ? dict[this.lang].reward_ready : dict[this.lang].reward_locked}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-lg font-serif text-brand-gold mb-4">${dict[this.lang].points_history}</h3>
                    <div class="bg-brand-dark rounded-sm p-4 border border-brand-gold/10 max-h-64 overflow-y-auto">
                        ${historyHtml}
                    </div>
                </div>
            `;

        } catch (e) {
            resDiv.innerHTML = `<p class="text-brand-cream/70 text-center py-4">ไม่พบข้อมูลเบอร์โทรศัพท์นี้ (ตรวจสอบการเชื่อมต่อ Database)</p>`;
        }
    }
};

// Start App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
