// === CONFIGURATION ===
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

let supabase = null;
try {
    if (SUPABASE_URL !== 'YOUR_SUPABASE_URL' && window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
} catch (e) {
    console.error("Failed to initialize Supabase:", e);
}

// === I18N DICTIONARY ===
const dict = {
    th: {
        nav_home: "หน้าแรก", nav_menu: "เมนู", nav_track: "ติดตาม", nav_rewards: "สะสมแต้ม",
        hero_title: "ศิลปะแห่งกาแฟ", hero_subtitle: "สัมผัสรสชาติความพรีเมียมในทุกหยด คัดสรรจากเมล็ดพันธุ์ที่ดีที่สุด สู่มือคุณ",
        btn_order_now: "สั่งเลย", featured_title: "เมนูแนะนำ", btn_view_all_menu: "ดูเมนูทั้งหมด",
        menu_title: "เมนูของเรา", cart_title: "ตะกร้าสินค้า", cart_empty: "ตะกร้าของคุณยังว่างเปล่า",
        total_amount: "ราคารวม", btn_checkout: "ดำเนินการสั่งซื้อ", checkout_title: "ชำระเงิน / ยืนยันการสั่งซื้อ",
        checkout_info: "ข้อมูลติดต่อ", checkout_name: "ชื่อ-นามสกุล *", checkout_phone: "เบอร์โทรศัพท์ *",
        checkout_method: "รูปแบบการรับสินค้า", checkout_pickup: "รับเองที่ร้าน", checkout_delivery: "จัดส่งเดลิเวอรี่",
        checkout_pickup_time: "เวลารับสินค้า", time_asap: "เร็วที่สุด (15-20 นาที)", checkout_address: "ที่อยู่จัดส่ง *",
        checkout_note: "หมายเหตุเพิ่มเติม", btn_confirm_order: "ยืนยันคำสั่งซื้อ", track_title: "ติดตามออเดอร์",
        track_subtitle: "กรอกหมายเลขออเดอร์เพื่อตรวจสอบสถานะ", btn_track: "ค้นหา", status_pending: "รอดำเนินการ",
        status_preparing: "กำลังเตรียม", status_ready: "พร้อมรับ/จัดส่งแล้ว", status_completed: "เสร็จสิ้น",
        status_cancelled: "ยกเลิก", btn_add_to_cart: "เพิ่มลงตะกร้า", your_points: "แต้มของคุณ:",
        use_points_discount: "ใช้ 100 แต้ม แลกส่วนลด 50 บาท", subtotal: "ยอดรวม:", discount: "ส่วนลด (แต้ม):",
        total_amount_pay: "ยอดสุทธิ:", checkout_earn_msg: "คุณจะได้รับ", points_from_order: "แต้ม",
        points_subtitle: "กรอกเบอร์โทรศัพท์เพื่อตรวจสอบแต้ม", btn_check_points: "ตรวจสอบ",
        points_balance: "แต้มสะสมปัจจุบัน", points_history: "ประวัติการรับ/ใช้แต้ม", point_earn: "ได้รับแต้ม",
        point_redeem: "แลกแต้ม", no_history: "ยังไม่มีประวัติ", reward_ready: "พร้อมแลกแล้ว",
        reward_locked: "ยังไม่ถึงเป้าหมาย", reward_tier1: "ส่วนลด 50 บาท", reward_tier2: "ฟรีเครื่องดื่ม 1 แก้ว"
    },
    en: {
        nav_home: "Home", nav_menu: "Menu", nav_track: "Track", nav_rewards: "Rewards",
        hero_title: "The Art of Coffee", hero_subtitle: "Experience premium taste in every drop.",
        btn_order_now: "Order Now", featured_title: "Featured", btn_view_all_menu: "View All Menu",
        menu_title: "Our Menu", cart_title: "Your Cart", cart_empty: "Your cart is empty",
        total_amount: "Total", btn_checkout: "Proceed to Checkout", checkout_title: "Checkout",
        checkout_info: "Contact Info", checkout_name: "Full Name *", checkout_phone: "Phone Number *",
        checkout_method: "Method", checkout_pickup: "Store Pickup", checkout_delivery: "Delivery",
        checkout_pickup_time: "Pickup Time", time_asap: "ASAP (15-20 mins)", checkout_address: "Delivery Address *",
        checkout_note: "Additional Note", btn_confirm_order: "Confirm Order", track_title: "Track Order",
        track_subtitle: "Enter your order number to check status", btn_track: "Track", status_pending: "Pending",
        status_preparing: "Preparing", status_ready: "Ready", status_completed: "Completed",
        status_cancelled: "Cancelled", btn_add_to_cart: "Add to Cart", your_points: "Your Pts:",
        use_points_discount: "Use 100 pts for 50฿ off", subtotal: "Subtotal:", discount: "Discount (Pts):",
        total_amount_pay: "Net Total:", checkout_earn_msg: "You will earn", points_from_order: "pts",
        points_subtitle: "Enter phone number to check rewards", btn_check_points: "Check Rewards",
        points_balance: "Current Points", points_history: "Transaction History", point_earn: "Earned",
        point_redeem: "Redeemed", no_history: "No history yet", reward_ready: "Available",
        reward_locked: "Locked", reward_tier1: "50฿ Off", reward_tier2: "1 Free Drink"
    }
};

// === APPLICATION STATE ===
const app = {
    lang: 'th',
    cart: [],
    currentView: 'home',
    categories: [],
    products: [],
    user: null,
    currentCustomerPoints: 0,
    customerId: null,
    usePointsDiscount: false,
    debounceTimer: null,

    // SAFE LOADERS
    loadSafe() {
        try {
            this.lang = localStorage.getItem('lumiere_lang') || 'th';
            const cartData = localStorage.getItem('lumiere_cart');
            this.cart = cartData ? JSON.parse(cartData) : [];
            if (!Array.isArray(this.cart)) this.cart = [];
        } catch (e) {
            console.error("Storage access blocked:", e);
            this.lang = 'th';
            this.cart = [];
        }
    },

    init() {
        try {
            this.loadSafe();
            this.initTheme();
            this.applyLanguage();
            this.updateCartUI();
            this.navigate(this.currentView);
            this.fetchData();
            this.initAuthListener();
        } catch (e) {
            console.error("Fatal Error during initialization:", e);
            // Ensure UI doesn't completely freeze
            try { this.applyLanguage(); } catch(e){}
        }
    },

    // --- THEME ---
    initTheme() {
        try {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } catch (e) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            }
        }
    },

    toggleTheme() {
        document.documentElement.classList.toggle('dark');
        try {
            localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        } catch (e) {}
    },

    // --- I18N ---
    toggleLanguage() {
        this.lang = this.lang === 'th' ? 'en' : 'th';
        try { localStorage.setItem('lumiere_lang', this.lang); } catch (e) {}
        document.getElementById('lang-toggle-desktop').innerText = this.lang.toUpperCase();
        this.applyLanguage();
        this.renderMenu(); 
        if(this.currentView === 'cart') this.renderCart();
    },

    applyLanguage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[this.lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.placeholder) el.placeholder = dict[this.lang][key];
                } else {
                    el.innerText = dict[this.lang][key];
                }
            }
        });
        document.getElementById('lang-toggle-desktop').innerText = this.lang.toUpperCase();
    },

    // --- NAVIGATION ---
    navigate(viewId) {
        document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('text-primary-600', 'dark:text-primary-400', 'bg-white/50', 'dark:bg-white/5'));
        
        const viewEl = document.getElementById(`view-${viewId}`);
        if(viewEl) viewEl.classList.add('active');
        
        // Highlight active nav
        const activeNavs = document.querySelectorAll(`[onclick="app.navigate('${viewId}'); return false;"]`);
        activeNavs.forEach(el => el.classList.add('text-primary-600', 'dark:text-primary-400', 'bg-white/50', 'dark:bg-white/5'));

        this.currentView = viewId;
        window.scrollTo(0, 0);
        
        if(viewId === 'cart') this.renderCart();
        if(viewId === 'checkout') this.initCheckout();
    },

    openAuth() {
        document.getElementById('auth-overlay').classList.remove('hidden');
        document.getElementById('auth-panel').classList.add('open');
    },

    closeAuth() {
        document.getElementById('auth-overlay').classList.add('hidden');
        document.getElementById('auth-panel').classList.remove('open');
    },

    // --- AUTHENTICATION ---
    async initAuthListener() {
        if (!supabase) return;
        try {
            const { data: { session } } = await supabase.auth.getSession();
            this.updateUserSession(session?.user || null);

            supabase.auth.onAuthStateChange((_event, session) => {
                this.updateUserSession(session?.user || null);
            });
        } catch (e) {
            console.error("Auth init error:", e);
        }
    },

    async updateUserSession(user) {
        this.user = user;
        const loginBtnDesktop = document.getElementById('nav-login-btn');
        const loginBtnMobile = document.getElementById('mobile-login-btn');
        const userInfoPanel = document.getElementById('nav-user-info');
        const userEmailTxt = document.getElementById('nav-user-email');
        const checkoutBanner = document.getElementById('checkout-guest-banner');

        if (this.user) {
            if(loginBtnDesktop) loginBtnDesktop.classList.add('hidden');
            if(loginBtnMobile) loginBtnMobile.classList.add('hidden');
            if(userInfoPanel) userInfoPanel.classList.remove('hidden', 'flex-col');
            if(userInfoPanel) userInfoPanel.classList.add('flex', 'flex-col'); // Reset flex
            if(userEmailTxt) userEmailTxt.innerText = this.user.email;
            if(checkoutBanner) checkoutBanner.classList.add('hidden');
            
            if (this.currentView === 'checkout') {
                try {
                    const { data } = await supabase.from('customers').select('*').eq('user_id', this.user.id).single();
                    if (data) {
                        document.getElementById('checkout-name').value = data.name || '';
                        document.getElementById('checkout-phone').value = data.phone || '';
                        this.checkCustomerPoints();
                    }
                } catch(e){}
            }
        } else {
            if(loginBtnDesktop) loginBtnDesktop.classList.remove('hidden');
            if(loginBtnMobile) loginBtnMobile.classList.remove('hidden');
            if(userInfoPanel) userInfoPanel.classList.add('hidden');
            if(userInfoPanel) userInfoPanel.classList.remove('flex');
            if(checkoutBanner) checkoutBanner.classList.remove('hidden');
        }
    },

    async login() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errDiv = document.getElementById('login-error');
        errDiv.classList.add('hidden');

        try {
            if(!supabase) throw new Error("Database not connected.");
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            this.closeAuth();
            alert(this.lang === 'th' ? "เข้าสู่ระบบสำเร็จ" : "Login successful");
        } catch (e) {
            errDiv.innerText = e.message;
            errDiv.classList.remove('hidden');
        }
    },

    async register() {
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const name = document.getElementById('reg-name').value;
        const phone = document.getElementById('reg-phone').value;
        const errDiv = document.getElementById('reg-error');
        errDiv.classList.add('hidden');

        try {
            if(!supabase) throw new Error("Database not connected.");
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            
            if (data.user) {
                const { error: custErr } = await supabase.from('customers').upsert([{ 
                    user_id: data.user.id, phone: phone, name: name, points_balance: 0 
                }], { onConflict: 'phone' });
                if (custErr) throw custErr;
            }
            this.closeAuth();
            alert(this.lang === 'th' ? "สมัครสมาชิกสำเร็จ" : "Registration successful");
        } catch (e) {
            errDiv.innerText = e.message;
            errDiv.classList.remove('hidden');
        }
    },

    async logout() {
        if (!supabase) return;
        await supabase.auth.signOut();
        alert(this.lang === 'th' ? "ออกจากระบบสำเร็จ" : "Logged out");
        this.navigate('home');
    },

    // --- DATA ---
    async fetchData() {
        try {
            if (!supabase) {
                const errHtml = `<div class="col-span-full text-center py-20 text-red-500 glass rounded-xl border border-red-200">
                    <ion-icon name="warning-outline" class="text-4xl block mx-auto mb-2"></ion-icon>
                    Database not connected. Please check configuration.
                </div>`;
                document.getElementById('menu-grid').innerHTML = errHtml;
                document.getElementById('featured-menu-grid').innerHTML = errHtml;
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
        }
    },

    renderFeatured() {
        if(this.products.length === 0) return;
        const featured = this.products.filter(p => p.is_featured).slice(0, 3);
        const container = document.getElementById('featured-menu-grid');
        container.innerHTML = featured.map(p => this.createProductCard(p)).join('');
    },

    renderMenu(categoryId = null) {
        if(this.categories.length === 0 || this.products.length === 0) return;
        
        const filterContainer = document.getElementById('categories-filter');
        let catsHtml = `<button onclick="app.renderMenu(null)" class="px-5 py-2 rounded-full border-2 ${categoryId === null ? 'border-primary-500 bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 font-bold' : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 font-medium'} transition-all text-sm whitespace-nowrap">${this.lang === 'th' ? 'ทั้งหมด' : 'All'}</button>`;
        catsHtml += this.categories.map(c => `
            <button onclick="app.renderMenu(${c.id})" class="px-5 py-2 rounded-full border-2 ${categoryId === c.id ? 'border-primary-500 bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 font-bold' : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 font-medium'} transition-all text-sm whitespace-nowrap">${this.lang === 'th' ? c.name_th : c.name_en}</button>
        `).join('');
        filterContainer.innerHTML = catsHtml;

        const gridContainer = document.getElementById('menu-grid');
        const displayProducts = categoryId ? this.products.filter(p => p.category_id === categoryId) : this.products;
        gridContainer.innerHTML = displayProducts.map(p => this.createProductCard(p)).join('');
    },

    createProductCard(p) {
        const name = this.lang === 'th' ? p.name_th : p.name_en;
        return `
        <div class="glass rounded-2xl overflow-hidden hover-lift flex flex-col group relative">
            <div class="h-48 overflow-hidden relative">
                <img src="${p.image_url}" alt="${name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div class="p-5 flex flex-col flex-1 justify-between bg-white/80 dark:bg-gray-900/80">
                <div class="mb-4">
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="font-serif font-bold text-gray-900 dark:text-white line-clamp-2 text-lg">${name}</h3>
                    </div>
                    <span class="text-primary-600 dark:text-primary-400 font-black text-xl tracking-tight">฿${p.price}</span>
                </div>
                <button onclick="app.openProductModal(${p.id})" class="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-3 rounded-xl hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-colors text-sm font-bold flex items-center justify-center gap-2">
                    <ion-icon name="add-circle-outline" class="text-xl"></ion-icon> ${dict[this.lang].btn_add_to_cart}
                </button>
            </div>
        </div>`;
    },

    // --- MODAL & CART ---
    openProductModal(id) {
        const p = this.products.find(x => x.id === id);
        if(!p) return;
        const name = this.lang === 'th' ? p.name_th : p.name_en;
        const desc = this.lang === 'th' ? p.description_th : p.description_en;
        
        const content = document.getElementById('modal-content');
        content.innerHTML = `
            <img src="${p.image_url}" alt="${name}" class="w-full h-64 object-cover rounded-2xl mb-6 shadow-md">
            <h2 class="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-2">${name}</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">${desc || ''}</p>
            <div class="flex justify-between items-center mb-8">
                <span class="text-3xl font-black text-primary-600 dark:text-primary-400 tracking-tight">฿${p.price}</span>
                <div class="flex items-center space-x-3 bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-2 py-1">
                    <button onclick="app.updateModalQty(-1)" class="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-xl transition-all">-</button>
                    <span id="modal-qty" class="w-8 text-center font-bold text-lg dark:text-white">1</span>
                    <button onclick="app.updateModalQty(1)" class="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 rounded-lg text-xl transition-all">+</button>
                </div>
            </div>
            <button onclick="app.addToCart(${p.id})" class="w-full bg-gradient-to-r from-primary-500 to-indigo-500 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all flex justify-center items-center gap-2">
                <ion-icon name="bag-add-outline" class="text-xl"></ion-icon> ${dict[this.lang].btn_add_to_cart}
            </button>
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
        try { localStorage.setItem('lumiere_cart', JSON.stringify(this.cart)); } catch (e) {}
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
            container.innerHTML = `<div class="text-center py-16 text-gray-400 font-medium">${dict[this.lang].cart_empty}</div>`;
            summary.classList.add('hidden');
            return;
        }

        let total = 0;
        container.innerHTML = this.cart.map((item, index) => {
            const name = this.lang === 'th' ? item.name_th : item.name_en;
            const subtotal = item.price * item.quantity;
            total += subtotal;
            return `
            <div class="flex flex-col sm:flex-row items-center justify-between p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 gap-4 hover-lift">
                <div class="flex items-center space-x-4 w-full sm:w-auto">
                    <img src="${item.image_url}" class="w-20 h-20 object-cover rounded-xl shadow-sm">
                    <div>
                        <h4 class="font-bold text-gray-900 dark:text-white text-lg">${name}</h4>
                        <p class="text-primary-600 dark:text-primary-400 font-black">฿${item.price}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div class="flex items-center space-x-1 bg-gray-100 dark:bg-gray-900 px-1 py-1 rounded-xl">
                        <button onclick="app.updateCartQty(${index}, -1)" class="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 rounded-lg font-bold">-</button>
                        <span class="w-8 text-center text-sm font-bold dark:text-white">${item.quantity}</span>
                        <button onclick="app.updateCartQty(${index}, 1)" class="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 rounded-lg font-bold">+</button>
                    </div>
                    <span class="font-black text-gray-900 dark:text-white text-xl min-w-[80px] text-right">฿${subtotal}</span>
                </div>
            </div>`;
        }).join('');

        summary.classList.remove('hidden');
        document.getElementById('cart-total-price').innerText = `฿${total}`;
    },

    // --- CHECKOUT & LOYALTY ---
    initCheckout() {
        this.usePointsDiscount = false;
        const cb = document.getElementById('use-points-checkbox');
        if(cb) cb.checked = false;
        const lb = document.getElementById('loyalty-box');
        if(lb) lb.classList.add('hidden');
        this.updateUserSession(this.user); // Re-trigger auto-fill
        this.updateCheckoutSummary();
    },

    updateCheckoutSummary() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let discount = 0;
        if (this.usePointsDiscount && this.currentCustomerPoints >= 100) {
            discount = 50;
        }
        const total = Math.max(0, subtotal - discount);
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
            alert("Database connection required.");
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
        const originalText = btn.innerHTML;
        btn.innerHTML = `<div class="spinner border-2 w-6 h-6 mx-auto"></div>`;
        btn.disabled = true;

        try {
            let activeCustomerId = this.customerId;
            let currentDbPoints = 0;

            if (!activeCustomerId) {
                const insertData = { phone, name, points_balance: 0 };
                if (this.user) insertData.user_id = this.user.id;

                const { data: newCust, error: errCust } = await supabase.from('customers').insert([insertData]).select().single();
                if(errCust) throw errCust;
                activeCustomerId = newCust.id;
            } else {
                const { data: cData } = await supabase.from('customers').select('points_balance').eq('id', activeCustomerId).single();
                if(cData) currentDbPoints = cData.points_balance;
            }

            const { data: orderData, error: orderErr } = await supabase.from('orders').insert([{
                order_number, customer_id: activeCustomerId, customer_name: name, customer_phone: phone,
                fulfillment_type: fulfillment, delivery_address: address, pickup_time: pickup_time,
                total_price: finalPrice, discount_amount: discountAmount, points_earned: pointsEarned,
                points_redeemed: pointsRedeemed, note
            }]).select().single();
            if (orderErr) throw orderErr;

            const orderItems = this.cart.map(item => ({
                order_id: orderData.id, product_id: item.product_id,
                product_name_snapshot: this.lang === 'th' ? item.name_th : item.name_en,
                quantity: item.quantity, unit_price: item.price, subtotal: item.price * item.quantity
            }));
            await supabase.from('order_items').insert(orderItems);

            const newBalance = currentDbPoints - pointsRedeemed + pointsEarned;
            if (pointsRedeemed > 0) await supabase.from('point_transactions').insert([{ customer_id: activeCustomerId, order_id: orderData.id, points_change: -pointsRedeemed, type: 'redeem' }]);
            if (pointsEarned > 0) await supabase.from('point_transactions').insert([{ customer_id: activeCustomerId, order_id: orderData.id, points_change: pointsEarned, type: 'earn' }]);
            await supabase.from('customers').update({points_balance: newBalance}).eq('id', activeCustomerId);
            
            setTimeout(() => {
                this.cart = [];
                this.saveCart();
                alert(this.lang === 'th' ? `สั่งซื้อสำเร็จ! หมายเลขออเดอร์: ${order_number}\nได้รับ ${pointsEarned} แต้ม` : `Success! Order: ${order_number}\nEarned ${pointsEarned} pts`);
                this.navigate('track');
                document.getElementById('track-order-number').value = order_number;
                this.trackOrder();
                btn.innerHTML = originalText;
                btn.disabled = false;
                document.getElementById('checkout-form').reset();
            }, 1000);

        } catch (e) {
            console.error("Order failed:", e);
            alert("Failed to process order.");
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    },

    // --- TRACK ORDER ---
    async trackOrder() {
        const orderNum = document.getElementById('track-order-number').value.trim();
        const resDiv = document.getElementById('track-result');
        if (!orderNum) return;

        resDiv.classList.remove('hidden');
        resDiv.innerHTML = `<div class="spinner mx-auto my-8 border-primary-500"></div>`;

        try {
            if (!supabase) throw new Error("No DB");
            const { data: order, error } = await supabase.from('orders').select('*').eq('order_number', orderNum).single();
            
            if (order && !error) {
                const statusKey = `status_${order.status}`;
                const statusText = dict[this.lang][statusKey] || order.status;
                
                let sColor = 'bg-gray-100 text-gray-600 border-gray-200';
                if(order.status === 'ready' || order.status === 'completed') sColor = 'bg-green-100 text-green-700 border-green-200';
                if(order.status === 'preparing') sColor = 'bg-blue-100 text-blue-700 border-blue-200';
                if(order.status === 'cancelled') sColor = 'bg-red-100 text-red-700 border-red-200';
                
                resDiv.innerHTML = `
                    <div class="flex justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Order #</p>
                            <h3 class="font-serif font-bold text-2xl text-gray-900 dark:text-white">${order.order_number}</h3>
                        </div>
                        <div class="text-right">
                            <span class="px-4 py-2 rounded-xl border text-sm font-bold tracking-wide ${sColor}">${statusText}</span>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <p class="text-sm dark:text-gray-300">Name: <span class="font-bold text-gray-900 dark:text-white">${order.customer_name}</span></p>
                        <p class="text-sm dark:text-gray-300">Total: <span class="font-black text-primary-600 dark:text-primary-400 text-lg">฿${order.total_price}</span></p>
                    </div>
                `;
            } else {
                resDiv.innerHTML = `<p class="text-red-500 text-center py-4 font-medium">Order not found</p>`;
            }
        } catch (e) {
            resDiv.innerHTML = `<p class="text-red-500 text-center py-4 font-medium">Error tracking order</p>`;
        }
    },

    // --- REWARDS VIEW ---
    async checkMyRewards() {
        const phone = document.getElementById('points-phone').value.trim();
        const resDiv = document.getElementById('points-result');
        if (!phone) return;

        resDiv.classList.remove('hidden');
        resDiv.innerHTML = `<div class="spinner mx-auto my-8 border-amber-500"></div>`;

        try {
            if(!supabase) throw new Error("No DB");

            const { data: cData, error: cErr } = await supabase.from('customers').select('id, name, points_balance').eq('phone', phone).single();
            if (cErr || !cData) throw new Error("Not found");

            const pts = cData.points_balance;
            const percentage = Math.min((pts / 200) * 100, 100);
            const t1Ready = pts >= 100;
            const t2Ready = pts >= 200;

            const { data: txData } = await supabase.from('point_transactions').select('*').eq('customer_id', cData.id).order('created_at', { ascending: false }).limit(5);
            const history = txData || [];

            let historyHtml = history.length > 0 ? history.map(tx => {
                const isEarn = tx.type === 'earn';
                return `
                    <div class="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <div>
                            <p class="font-bold text-gray-900 dark:text-white text-sm">${isEarn ? dict[this.lang].point_earn : dict[this.lang].point_redeem}</p>
                            <p class="text-xs text-gray-500">${new Date(tx.created_at).toLocaleDateString()}</p>
                        </div>
                        <span class="font-black ${isEarn ? 'text-green-500' : 'text-red-500'}">${isEarn ? '+' : ''}${tx.points_change}</span>
                    </div>`;
            }).join('') : `<p class="text-center text-gray-400 py-4">${dict[this.lang].no_history}</p>`;

            resDiv.innerHTML = `
                <div class="glass rounded-3xl p-8 mb-8 relative overflow-hidden">
                    <div class="absolute -top-10 -right-10 w-40 h-40 bg-amber-300/30 rounded-full blur-2xl"></div>
                    <div class="relative z-10">
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${cData.name}</h2>
                        <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">${dict[this.lang].points_balance}</p>
                        <div class="text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-amber-400 to-orange-600 mb-8">${pts}</div>
                        
                        <div class="relative w-full h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mb-6">
                            <div class="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000" style="width: ${percentage}%;"></div>
                        </div>
                        
                        <div class="flex gap-4">
                            <div class="flex-1 p-4 rounded-xl border-2 ${t1Ready ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-200 dark:border-gray-700'} text-center">
                                <div class="text-lg font-black ${t1Ready ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400'}">100 Pts</div>
                                <div class="text-xs font-medium dark:text-gray-300 mt-1 mb-2">${dict[this.lang].reward_tier1}</div>
                                <span class="text-[10px] px-2 py-1 rounded-md font-bold uppercase ${t1Ready ? 'bg-amber-200 text-amber-800' : 'bg-gray-200 text-gray-500'}">${t1Ready ? dict[this.lang].reward_ready : dict[this.lang].reward_locked}</span>
                            </div>
                            <div class="flex-1 p-4 rounded-xl border-2 ${t2Ready ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-200 dark:border-gray-700'} text-center">
                                <div class="text-lg font-black ${t2Ready ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400'}">200 Pts</div>
                                <div class="text-xs font-medium dark:text-gray-300 mt-1 mb-2">${dict[this.lang].reward_tier2}</div>
                                <span class="text-[10px] px-2 py-1 rounded-md font-bold uppercase ${t2Ready ? 'bg-amber-200 text-amber-800' : 'bg-gray-200 text-gray-500'}">${t2Ready ? dict[this.lang].reward_ready : dict[this.lang].reward_locked}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="glass rounded-2xl p-6 text-left">
                    <h3 class="font-bold text-gray-900 dark:text-white mb-4 text-lg">${dict[this.lang].points_history}</h3>
                    ${historyHtml}
                </div>
            `;
        } catch (e) {
            resDiv.innerHTML = `<p class="text-gray-500 dark:text-gray-400 text-center py-4 font-medium">ไม่พบข้อมูล หรือ Database มีปัญหา</p>`;
        }
    }
};

// Start App securely
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
