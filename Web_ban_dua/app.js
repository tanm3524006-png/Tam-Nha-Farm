/* =====================================================
   ĐỆ DỪA - Main Application JavaScript
   ===================================================== */

// Configuration - Thay đổi số điện thoại và Zalo tại đây
const CONFIG = {
    phone: '0123456789',
    zalo: '0123456789',
    email: 'contact@dedua.vn'
};

// Storage Keys (sync với admin)
const STORAGE = {
    posts: 'dedua_posts',
    products: 'dedua_products',
    gallery: 'dedua_gallery'
};

// Default Gallery Images (khi chưa có trong admin)
const DEFAULT_GALLERY = [
    'image/z7370063883780_3724636e787dbb257bb2090381beabcc.jpg',
    'image/z7370063894803_9324b958b4ba6bb90e9ec6f8169035cf.jpg',
    'image/z7370063905022_bc36f5be0b1b3eb17fcbe6c4da41277d.jpg',
    'image/z7370063909959_c7172620bb668fc6c644e4d710c557c3.jpg',
    'image/z7370063936866_7ec7ff92c569639afcc7fa87f00dac87.jpg',
    'image/z7370063942618_9a2f3e775a6dac173223f3ebfe0e3bd3.jpg',
    'image/z7370063950415_a51cfb31c7a2728263eb323cb5cf313e.jpg',
    'image/z7370063955048_bf39a8329fedc540d6c64655abe41652.jpg'
];

// Default Products
const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: 'Dừa Tươi Nguyên Quả',
        description: 'Dừa tươi nguyên quả, nước ngọt thanh mát, cơm dừa dày giòn.',
        price: 'Liên hệ',
        badge: 'Bán Chạy',
        image: 'image/z7370063817511_6d0075cc62ab03d75a54caaa3adf58cf.jpg'
    },
    {
        id: 2,
        name: 'Dừa Xiêm Xanh',
        description: 'Dừa xiêm nước ngọt đậm đà, thích hợp cho giải khát mùa hè.',
        price: 'Liên hệ',
        badge: 'Hot',
        image: 'image/z7370063840693_3c008e1991bfb45808a6936939c9e2f3.jpg'
    },
    {
        id: 3,
        name: 'Dừa Sáp Bến Tre',
        description: 'Dừa sáp đặc sản, cơm dày béo ngậy, thích hợp làm kem và sinh tố.',
        price: 'Liên hệ',
        badge: 'Đặc Biệt',
        image: 'image/z7370063862620_57cbd5286d4a4ba09abb7e8077b12081.jpg'
    }
];

// Default Blog Posts
const DEFAULT_POSTS = [
    {
        id: 1,
        title: '10 Lợi Ích Tuyệt Vời Của Nước Dừa Tươi',
        content: 'Nước dừa không chỉ giải khát mà còn mang lại nhiều lợi ích sức khỏe đáng kinh ngạc. Từ việc cung cấp điện giải tự nhiên, hỗ trợ tiêu hóa, đến làm đẹp da...',
        image: 'image/z7370063873854_3693243de426be4c0f4d09228f722e6d.jpg',
        published: true,
        createdAt: '2026-01-22'
    },
    {
        id: 2,
        title: 'Khám Phá Vườn Dừa Bến Tre - Xứ Sở Dừa Xanh',
        content: 'Hành trình khám phá vùng đất Bến Tre - nơi sản sinh ra những trái dừa ngon nhất. Với khí hậu và thổ nhưỡng đặc biệt, Bến Tre được mệnh danh là xứ sở dừa xanh của Việt Nam...',
        image: 'image/z7370063880146_0f8e3107e0932798eddc906470de484c.jpg',
        published: true,
        createdAt: '2026-01-20'
    }
];

// =====================================================
// INITIALIZATION
// =====================================================
document.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initScrollAnimations();
    loadProducts();
    loadGallery();
    loadBlogPosts();
    initContactForm();
    initLightbox();
    updateContactInfo();
});

// =====================================================
// NAVIGATION
// =====================================================
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// =====================================================
// SCROLL ANIMATIONS
// =====================================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// =====================================================
// PRODUCTS
// =====================================================
function loadProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;

    // Get from admin or use defaults
    let products = JSON.parse(localStorage.getItem(STORAGE.products) || '[]');
    if (products.length === 0) {
        products = DEFAULT_PRODUCTS;
    }

    container.innerHTML = products.map(product => `
        <div class="product-card fade-in">
            <div class="product-image">
                <img src="${product.image || 'logo/hinhanhchudevalogo.png'}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description || ''}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price || 'Liên hệ'}</span>
                    <button class="btn-order" onclick="contactZalo()">Đặt Ngay</button>
                </div>
            </div>
        </div>
    `).join('');

    setTimeout(initScrollAnimations, 100);
}

// =====================================================
// GALLERY
// =====================================================
function loadGallery() {
    const container = document.getElementById('galleryGrid');
    if (!container) return;

    // Get from admin or use defaults
    let gallery = JSON.parse(localStorage.getItem(STORAGE.gallery) || '[]');

    if (gallery.length === 0) {
        // Use default images
        container.innerHTML = DEFAULT_GALLERY.map((src, i) => `
            <div class="product-card fade-in" style="cursor:pointer" onclick="openLightbox('${src}')">
                <div class="product-image" style="height:200px">
                    <img src="${src}" alt="Hình ảnh ${i + 1}">
                </div>
            </div>
        `).join('');
    } else {
        container.innerHTML = gallery.map(img => `
            <div class="product-card fade-in" style="cursor:pointer" onclick="openLightbox('${img.src}')">
                <div class="product-image" style="height:200px">
                    <img src="${img.src}" alt="${img.title || 'Hình ảnh'}">
                </div>
            </div>
        `).join('');
    }

    setTimeout(initScrollAnimations, 100);
}

// =====================================================
// BLOG POSTS
// =====================================================
function loadBlogPosts() {
    const container = document.getElementById('blogGrid');
    if (!container) return;

    let posts = JSON.parse(localStorage.getItem(STORAGE.posts) || '[]');

    // Filter published and sort by date
    posts = posts.filter(p => p.published).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Use defaults if empty
    if (posts.length === 0) {
        posts = DEFAULT_POSTS;
    }

    container.innerHTML = posts.slice(0, 4).map(post => `
        <div class="blog-card fade-in">
            <div class="blog-image">
                <img src="${post.image || 'logo/hinhanhchudevalogo.png'}" alt="${post.title}">
            </div>
            <div class="blog-content">
                <span class="blog-date">${formatDate(post.createdAt)}</span>
                <h3>${post.title}</h3>
                <p>${truncateText(post.content, 100)}</p>
                <a href="#" class="read-more" onclick="showPostDetail(${post.id}); return false;">
                    Đọc thêm 
                    <svg width="16" height="16" fill="currentColor" style="vertical-align:middle"><use href="#icon-arrow"/></svg>
                </a>
            </div>
        </div>
    `).join('');

    setTimeout(initScrollAnimations, 100);
}

function showPostDetail(postId) {
    let posts = JSON.parse(localStorage.getItem(STORAGE.posts) || '[]');
    if (posts.length === 0) posts = DEFAULT_POSTS;

    const post = posts.find(p => p.id === postId);
    if (post) {
        alert(`${post.title}\n\n${post.content}`);
    }
}

// =====================================================
// LIGHTBOX
// =====================================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (lightbox && img) {
        img.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// =====================================================
// CONTACT
// =====================================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;

        window.open(`https://zalo.me/${CONFIG.zalo}`, '_blank');
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.');
        form.reset();
    });
}

function contactZalo() {
    window.open(`https://zalo.me/${CONFIG.zalo}`, '_blank');
}

function updateContactInfo() {
    const phoneBtn = document.getElementById('phoneBtn');
    const zaloBtn = document.getElementById('zaloBtn');

    if (phoneBtn) phoneBtn.href = `tel:${CONFIG.phone}`;
    if (zaloBtn) zaloBtn.href = `https://zalo.me/${CONFIG.zalo}`;
}

// =====================================================
// UTILITIES
// =====================================================
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('vi-VN', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });
}

function truncateText(text, maxLength) {
    return text.length <= maxLength ? text : text.substring(0, maxLength).trim() + '...';
}

// Global exports
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.contactZalo = contactZalo;
window.showPostDetail = showPostDetail;
