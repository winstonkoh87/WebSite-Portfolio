/**
 * Counter Animation Script
 * Animates numbers from 0 to target value when in viewport
 */

function animateCounters() {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseFloat(target.innerText.replace(/,/g, ''));
                const duration = 2000;
                const startValue = 0;
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease out expo
                    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                    const currentValue = Math.floor(easeProgress * endValue);

                    // Format with commas if needed
                    if (endValue > 1000) {
                        target.innerText = currentValue.toLocaleString();
                    } else {
                        target.innerText = currentValue + (target.innerText.includes('+') ? '+' : '');
                    }

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        // Ensure final value is exact
                        target.innerText = target.getAttribute('data-target');
                    }
                }

                requestAnimationFrame(update);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.metric-value').forEach(el => {
        el.setAttribute('data-target', el.innerText);
        el.innerText = '0';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', animateCounters);
