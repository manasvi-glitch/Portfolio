document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate hamburger icon (optional toggle class for icon change)
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    // Select all elements to be animated. 
    // We'll target sections, cards, and headers.
    const revealElements = document.querySelectorAll('.section-title, .timeline-item, .edu-card, .project-card, .hero-content, .contact-container');

    // Add 'reveal' class to them initially via JS so they are visible if JS fails/is disabled
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 17, 23, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(13, 17, 23, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Smooth Scrolling for Anchor Links (Polyfill-like behavior) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed header offset
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
