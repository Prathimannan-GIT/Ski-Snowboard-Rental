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
            mobileMenu.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });

        const closeMenu = () => {
            mobileMenu.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
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
    const brand = nav.querySelector('span');
    const burger = document.getElementById('burger-btn');
    
    const applyScrollStyles = () => {
        if (window.scrollY > 50) {
            nav.classList.add('bg-white/95', 'dark:bg-slate-900/95', 'backdrop-blur-md', 'shadow-lg');
            nav.classList.remove('text-white');
            nav.style.height = '70px';
            if (brand) brand.classList.replace('text-white', 'text-[var(--primary)]');
            if (burger) burger.classList.remove('text-white');
        } else {
            nav.classList.remove('bg-white/95', 'dark:bg-slate-900/95', 'backdrop-blur-md', 'shadow-lg');
            // If we are on a page with a hero (like index or home2), we might want white text at top
            const hasHero = document.querySelector('header.relative.h-\\[90vh\\], header.relative.h-screen');
            if (hasHero) {
                nav.classList.add('text-white');
                if (brand) brand.classList.add('text-white');
                if (burger) burger.classList.add('text-white');
            } else {
                nav.classList.remove('text-white');
            }
            nav.style.height = '80px';
        }
    };

    window.addEventListener('scroll', applyScrollStyles);
    applyScrollStyles(); // Run on load
}

// Highlight Active Navigation Link
function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link, .sidebar-link');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === 'index.html' && href === '#')) {
            link.classList.add('active');
            if (link.classList.contains('sidebar-link')) {
                link.classList.add('bg-sky-500', 'text-white');
            }
        }
    });
}

// Helper for Footer/Header injection (optional if using static HTML, but good for consistency)
// For this project, we'll keep it static in each file but use consistent templates.
