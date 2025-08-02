// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Global variables
let cart = [];
let currentDealIndex = 0;
const deals = document.querySelectorAll('.deal-card');

// Menu data for cart functionality
const menuItems = {
    1: { name: "Golden French Fries", price: 20.99, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=150&h=150&fit=crop&crop=center" },
    2: { name: "McDonald's - Dubai", price: 31.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&h=150&fit=crop&crop=center" },
    3: { name: "Burger French Fries", price: 30.69, image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=150&h=150&fit=crop&crop=center" },
    4: { name: "Spicy Chicken Burger", price: 28.99, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=150&h=150&fit=crop&crop=center" },
    5: { name: "Combo Package v1", price: 37.99, image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=150&h=150&fit=crop&crop=center" },
    6: { name: "McDonald's Deals", price: 33.99, image: "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=150&h=150&fit=crop&crop=center" },
    7: { name: "Fresh Orange Juice", price: 8.99, image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=150&h=150&fit=crop&crop=center" },
    8: { name: "Iced Coffee", price: 5.99, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=150&h=150&fit=crop&crop=center" },
    9: { name: "Vanilla Milkshake", price: 7.99, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=150&h=150&fit=crop&crop=center" }
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeCart();
    initializeDealsCarousel();
    initializeCategoryFilters();
    initializeScrollEffects();
    
    // Add loading effect to images
    addImageLoadingEffects();
    
    // Add floating animation to hero food items
    addFloatingAnimations();
});

// Initialize GSAP Animations
function initializeAnimations() {
    // Hero animations
    const heroTl = gsap.timeline();
    
    heroTl.from('.hero-title', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power3.out'
    })
    .from('.hero-subtitle', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    }, '-=0.8')
    .from('.hero-buttons .btn', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    }, '-=0.5')
    .from('.food-item', {
        duration: 1.5,
        scale: 0,
        rotation: 180,
        opacity: 0,
        stagger: 0.3,
        ease: 'elastic.out(1, 0.5)'
    }, '-=1');

    // Category items animation
    gsap.from('.category-item', {
        scrollTrigger: {
            trigger: '.categories',
            start: 'top 80%',
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out'
    });

    // Menu items animation
    gsap.from('.menu-item', {
        scrollTrigger: {
            trigger: '.menu',
            start: 'top 80%',
        },
        duration: 1,
        y: 80,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out'
    });

    // Services animation
    gsap.from('.service-item', {
        scrollTrigger: {
            trigger: '.services',
            start: 'top 80%',
        },
        duration: 1,
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });

    // Section titles animation
    gsap.from('.section-title', {
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 90%',
        },
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    // Navbar animation on scroll
    ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        toggleClass: {className: "scrolled", targets: ".navbar"}
    });

    // Footer animation
    gsap.from('.footer-section', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%',
        },
        duration: 0.8,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power2.out'
    });
}

// Initialize Navigation
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                gsap.to(bars[0], {rotation: 45, y: 6, duration: 0.3});
                gsap.to(bars[1], {opacity: 0, duration: 0.3});
                gsap.to(bars[2], {rotation: -45, y: -6, duration: 0.3});
            } else {
                gsap.to(bars[0], {rotation: 0, y: 0, duration: 0.3});
                gsap.to(bars[1], {opacity: 1, duration: 0.3});
                gsap.to(bars[2], {rotation: 0, y: 0, duration: 0.3});
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: targetSection,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            }
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                const bars = hamburger.querySelectorAll('.bar');
                gsap.to(bars[0], {rotation: 0, y: 0, duration: 0.3});
                gsap.to(bars[1], {opacity: 1, duration: 0.3});
                gsap.to(bars[2], {rotation: 0, y: 0, duration: 0.3});
            }
        });
    });

    // Highlight active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
}

// Initialize Cart Functionality
function initializeCart() {
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.querySelector('#cartSidebar');
    const cartOverlay = document.querySelector('#cartOverlay');
    const closeCartBtn = document.querySelector('#closeCart');
    const cartItemsContainer = document.querySelector('#cartItems');
    const cartTotal = document.querySelector('#cartTotal');
    const cartCount = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    // Open cart
    cartBtn.addEventListener('click', openCart);
    
    // Close cart
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // Add to cart functionality
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = parseInt(btn.getAttribute('data-id'));
            addToCart(itemId);
            
            // Add feedback animation
            gsap.fromTo(btn, 
                { scale: 1 },
                { 
                    scale: 1.2,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                }
            );
        });
    });

    function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
        
        // Animate cart entrance
        gsap.fromTo(cartSidebar, 
            { x: 400 },
            { x: 0, duration: 0.4, ease: 'power3.out' }
        );
    }

    function closeCart() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
    }

    function addToCart(itemId) {
        const item = menuItems[itemId];
        if (!item) return;

        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: itemId,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1
            });
        }
        
        updateCartDisplay();
        updateCartCount();
        
        // Show success notification
        showNotification(`${item.name} added to cart!`);
    }

    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        updateCartDisplay();
        updateCartCount();
    }

    function updateQuantity(itemId, newQuantity) {
        const item = cart.find(cartItem => cartItem.id === itemId);
        if (item) {
            if (newQuantity <= 0) {
                removeFromCart(itemId);
            } else {
                item.quantity = newQuantity;
                updateCartDisplay();
                updateCartCount();
            }
        }
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666; margin-top: 50px;">Your cart is empty</p>';
            cartTotal.textContent = '0.00';
            return;
        }

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.style.cssText = `
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 15px;
                border-bottom: 1px solid #eee;
                margin-bottom: 15px;
            `;
            
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; border-radius: 10px; object-fit: cover;">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 5px 0; font-size: 14px;">${item.name}</h4>
                    <p style="margin: 0; color: #ff6b35; font-weight: 600;">$${item.price.toFixed(2)}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" style="width: 30px; height: 30px; border: 1px solid #ddd; background: white; border-radius: 50%; cursor: pointer;">-</button>
                    <span style="min-width: 20px; text-align: center;">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" style="width: 30px; height: 30px; border: 1px solid #ddd; background: white; border-radius: 50%; cursor: pointer;">+</button>
                    <button onclick="removeFromCart(${item.id})" style="width: 30px; height: 30px; border: none; background: #ff6b35; color: white; border-radius: 50%; cursor: pointer; margin-left: 10px;">×</button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });

        updateCartTotal();
        
        // Make functions global for onclick handlers
        window.updateQuantity = updateQuantity;
        window.removeFromCart = removeFromCart;
    }

    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        if (totalItems > 0) {
            gsap.fromTo(cartCount, 
                { scale: 1 },
                { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1 }
            );
        }
    }
}

// Initialize Deals Carousel
function initializeDealsCarousel() {
    const prevBtn = document.querySelector('#prevDeal');
    const nextBtn = document.querySelector('#nextDeal');
    const pageNumbers = document.querySelectorAll('.page-number');
    
    if (!deals.length) return;

    function showDeal(index) {
        deals.forEach((deal, i) => {
            deal.classList.toggle('active', i === index);
        });
        
        pageNumbers.forEach((page, i) => {
            page.classList.toggle('active', i === index);
        });
        
        // Animate deal content
        const activeCard = deals[index];
        if (activeCard) {
            gsap.fromTo(activeCard.querySelector('.deal-content'), 
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
            );
        }
    }

    function nextDeal() {
        currentDealIndex = (currentDealIndex + 1) % deals.length;
        showDeal(currentDealIndex);
    }

    function prevDeal() {
        currentDealIndex = (currentDealIndex - 1 + deals.length) % deals.length;
        showDeal(currentDealIndex);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextDeal);
    if (prevBtn) prevBtn.addEventListener('click', prevDeal);
    
    pageNumbers.forEach((page, index) => {
        page.addEventListener('click', () => {
            currentDealIndex = index;
            showDeal(currentDealIndex);
        });
    });

    // Auto-advance deals every 5 seconds
    setInterval(nextDeal, 5000);
}

// Initialize Category Filters
function initializeCategoryFilters() {
    const categoryItems = document.querySelectorAll('.category-item');
    const menuItems = document.querySelectorAll('.menu-item');

    categoryItems.forEach(category => {
        category.addEventListener('click', () => {
            const targetCategory = category.getAttribute('data-category');
            
            // Remove active class from all categories
            categoryItems.forEach(item => item.classList.remove('active'));
            category.classList.add('active');
            
            // Filter menu items
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (targetCategory === 'all' || itemCategory === targetCategory) {
                    gsap.to(item, {
                        duration: 0.5,
                        scale: 1,
                        opacity: 1,
                        display: 'block',
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(item, {
                        duration: 0.3,
                        scale: 0.8,
                        opacity: 0,
                        ease: 'power2.in',
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
            
            // Animate category selection
            gsap.fromTo(category, 
                { scale: 1 },
                { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 }
            );
        });
    });
}

// Initialize Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for hero section
    gsap.to('.hero-image', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -100,
        ease: 'none'
    });

    // Scale effect for menu items on scroll
    menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        gsap.fromTo(item, 
            { scale: 0.9, opacity: 0.7 },
            {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    end: 'top 50%',
                    scrub: 1
                },
                scale: 1,
                opacity: 1,
                ease: 'power2.out'
            }
        );
    });
}

// Add loading effects to images
function addImageLoadingEffects() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
                gsap.fromTo(img, 
                    { opacity: 0, scale: 1.1 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
                );
            });
        }
    });
}

// Add floating animations to hero food items
function addFloatingAnimations() {
    const foodItems = document.querySelectorAll('.food-item');
    
    foodItems.forEach((item, index) => {
        gsap.to(item, {
            y: -20,
            duration: 2 + (index * 0.5),
            repeat: -1,
            yoyo: true,
            ease: 'power2.inOut',
            delay: index * 0.3
        });
        
        gsap.to(item, {
            rotation: 5,
            duration: 3 + (index * 0.3),
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: index * 0.2
        });
    });
}

// Show notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #ff6b35;
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        z-index: 2100;
        font-weight: 600;
        box-shadow: 0 5px 20px rgba(255, 107, 53, 0.3);
        transform: translateX(400px);
    `;
    
    document.body.appendChild(notification);
    
    // Animate notification
    gsap.to(notification, {
        x: -420,
        duration: 0.5,
        ease: 'back.out(1.7)',
        onComplete: () => {
            setTimeout(() => {
                gsap.to(notification, {
                    x: 400,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        document.body.removeChild(notification);
                    }
                });
            }, 2000);
        }
    });
}

// Add scroll-triggered animations for better performance
function addScrollAnimations() {
    // Animate on scroll with Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements
    document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in, .rotate-in')
        .forEach(el => observer.observe(el));
}

// Add mouse follow effect for cursor
function addCursorEffect() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255, 107, 53, 0.8);
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1
        });
    });

    // Scale cursor on hover over interactive elements
    document.querySelectorAll('button, a, .menu-item, .category-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 2, duration: 0.2 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
        });
    });
}

// Initialize everything after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimations();
    addCursorEffect();
});

// Add CSS for loaded images
const style = document.createElement('style');
style.textContent = `
    img {
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    img:not(.loaded) {
        opacity: 0.7;
    }
    
    .animate.fade-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .animate.slide-left {
        animation: slideInLeft 0.8s ease forwards;
    }
    
    .animate.slide-right {
        animation: slideInRight 0.8s ease forwards;
    }
    
    .animate.scale-in {
        animation: scaleIn 0.8s ease forwards;
    }
    
    .animate.rotate-in {
        animation: rotateIn 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes scaleIn {
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes rotateIn {
        to {
            opacity: 1;
            transform: rotate(0) scale(1);
        }
    }
`;
document.head.appendChild(style);