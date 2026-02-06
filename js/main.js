document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initScrollNavbar();
    highlightActiveLink();
});

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') document.documentElement.classList.add('dark');
}

window.toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
};

// Mobile Menu Logic
function initMobileMenu() {
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-menu');
    const overlay = document.getElementById('menu-overlay');

    if (burgerBtn && mobileMenu) {
        burgerBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeMenu = () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        if (overlay) overlay.addEventListener('click', closeMenu);
    }
}

// Navbar Scroll Effect
function initScrollNavbar() {
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const brand = nav.querySelector('.nav-title');
    const burger = document.getElementById('burger-btn');
    
    const applyScrollStyles = () => {
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(12px)';
            nav.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            nav.style.color = 'var(--text-main)';
            nav.style.height = '70px';
            if (brand) brand.style.color = 'var(--primary)';
            if (burger) burger.style.color = 'var(--text-main)';
        } else {
            nav.style.backgroundColor = 'var(--bg-card)';
            nav.style.backdropFilter = 'none';
            nav.style.boxShadow = 'none';
            // If we are on a page with a hero, we might want white text at top
            const hasHero = document.querySelector('.hero-section');
            if (hasHero) {
                nav.style.color = 'white';
                if (brand) brand.style.color = 'white';
                if (burger) burger.style.color = 'white';
            } else {
                nav.style.color = 'var(--text-main)';
            }
            nav.style.height = 'var(--nav-height)';
        }
    };

    window.addEventListener('scroll', applyScrollStyles);
    applyScrollStyles(); // Run on load
}

// Highlight Active Navigation Link
function highlightActiveLink() {
    // Get current page filename
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Clear all active states first
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and highlight only the exact matching link
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Only highlight if exact match
        if (href === currentPath) {
            link.classList.add('active');
        }
        // Special case: if we're on index.html, highlight the "Home" link
        else if (currentPath === 'index.html' && href === 'index.html') {
            link.classList.add('active');
        }
    });
}

// Helper for Footer/Header injection (optional if using static HTML, but good for consistency)
// For this project, we'll keep it static in each file but use consistent templates.
