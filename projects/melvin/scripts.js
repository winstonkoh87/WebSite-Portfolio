document.addEventListener("DOMContentLoaded", () => {
    /* --- Mobile Menu Toggle --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navLinks.classList.remove('active');
            });
        });
    }

    /* --- Scroll Reveal Animation --- */
    // Targets all major content cards for consistent reveal
    const revealElements = document.querySelectorAll('.experience-card, .award-card, .timeline-item, .bento-card, .bio-pillar, .position-card, .now-item, .masonry-item, .essay-item');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        el.classList.add('reveal-hidden'); // Initial state
        revealObserver.observe(el);
    });
});
