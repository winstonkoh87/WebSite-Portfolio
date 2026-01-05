// Typewriter effect for homepage terminal
// Uses system commands for "builder" aesthetic

document.addEventListener('DOMContentLoaded', function () {
    const textElement = document.getElementById('typewriter');

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        if (textElement) textElement.textContent = 'system_ready.';
        return;
    }

    const phrases = [
        "initializing_core_logic...",
        "optimizing_workflows...",
        "eliminating_redundancy...",
        "system_ready."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 25 : 42; // 1.2x faster

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 1650; // Pause at end of phrase (1.2x faster)
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // 1.2x faster
        }

        setTimeout(type, typeSpeed);
    }

    // Start only if element exists
    if (textElement) {
        setTimeout(type, 300);
    }
});
