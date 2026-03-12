/* ============================================
   MUHURTHAM STORIES
   JavaScript — Interactivity & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar && !navbar.classList.contains('scrolled')) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // ===========================
    // HERO CAROUSEL
    // ===========================
    (function() {
        const slides = document.querySelectorAll('.hero-slide');
        const indicators = document.querySelectorAll('.hero-indicators .indicator');
        let currentSlide = 0;
        let autoSlideInterval;

        if (slides.length === 0) return;

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % slides.length);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5500);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        indicators.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                if (i !== currentSlide) {
                    goToSlide(i);
                    resetAutoSlide();
                }
            });
        });

        startAutoSlide();
    })();

    // --- Scroll Reveal Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // --- Category Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card, .jewellery-card');
    const categoryHeaders = document.querySelectorAll('.category-header');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            let visibleCount = 0;

            productCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide category headers based on filter
            categoryHeaders.forEach(header => {
                const headerId = header.id;
                if (filter === 'all') {
                    header.style.display = '';
                } else if (headerId && headerId.includes(filter)) {
                    header.style.display = '';
                } else {
                    header.style.display = 'none';
                }
            });

            // Update product count
            const countEl = document.getElementById('productCount') || document.getElementById('rentalCount');
            if (countEl) {
                countEl.textContent = visibleCount + (visibleCount === 1 ? ' Product' : ' Products');
            }
        });
    });

    // --- Occasion Filter (Muhurtham page) ---
    const occasionSelect = document.getElementById('occasionSelect');
    if (occasionSelect) {
        occasionSelect.addEventListener('change', () => {
            const occasion = occasionSelect.value;
            let visibleCount = 0;

            productCards.forEach(card => {
                const cardOccasion = card.dataset.occasion || '';
                if (occasion === 'all' || cardOccasion.includes(occasion)) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            const countEl = document.getElementById('rentalCount');
            if (countEl) {
                countEl.textContent = visibleCount + ' Sets Available';
            }
        });
    }

    // --- Wishlist Toggle ---
    document.addEventListener('click', (e) => {
        const wishBtn = e.target.closest('.wishlist-btn');
        if (wishBtn) {
            wishBtn.classList.toggle('active');
            const icon = wishBtn.querySelector('i');
            if (icon) {
                if (wishBtn.classList.contains('active')) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                }
            }
        }
    });

    // --- Contact Form ---
    window.handleContactForm = function(e) {
        e.preventDefault();
        showNotification('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    };

    // --- Notification Toast ---
    function showNotification(message) {
        const existing = document.querySelector('.notification-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'notification-toast';
        toast.innerHTML = `<i class="fas fa-check-circle"></i> ${escapeHtml(message)}`;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: linear-gradient(135deg, #3d2e1f, #2a1f14);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            font-family: 'Poppins', sans-serif;
            font-size: 0.88rem;
            box-shadow: 0 8px 30px rgba(61, 46, 31, 0.3);
            z-index: 3000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.4s ease;
            max-width: 350px;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(20px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Add notification animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
        }
    `;
    document.head.appendChild(style);

    // --- Sort Products ---
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const value = sortSelect.value;
            const grids = document.querySelectorAll('.products-grid');

            grids.forEach(grid => {
                const cards = Array.from(grid.children);

                cards.sort((a, b) => {
                    const priceA = parseInt(a.dataset.price) || 0;
                    const priceB = parseInt(b.dataset.price) || 0;

                    if (value === 'price-low') return priceA - priceB;
                    if (value === 'price-high') return priceB - priceA;
                    return 0;
                });

                cards.forEach(card => grid.appendChild(card));
            });
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            }
        });
    });

    // ===========================
    // SHOWCASE GRID SCROLL ANIMATION
    // ===========================
    (function () {
        const showcaseItems = document.querySelectorAll('.showcase-photo, .showcase-text');

        if (showcaseItems.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.15
        };

        const showcaseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                    showcaseObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        showcaseItems.forEach(item => {
            showcaseObserver.observe(item);
        });
    })();

});
