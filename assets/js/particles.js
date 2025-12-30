// Particle Constellation Background
// Interactive particle system with mouse following

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 150 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}

function initParticles() {
    particles = [];
    const isMobile = window.innerWidth < 768;
    const numberOfParticles = isMobile
        ? Math.min((canvas.width * canvas.height) / 25000, 30)  // Fewer particles on mobile
        : Math.min((canvas.width * canvas.height) / 12000, 100);

    for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
            x: x,
            y: y,
            size: Math.random() * 2 + 0.5,
            baseX: x,
            baseY: y,
            density: Math.random() * 30 + 1,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const force = (mouse.radius - distance) / mouse.radius;

            if (distance < mouse.radius) {
                const directionX = (dx / distance) * force * p.density * 0.5;
                const directionY = (dy / distance) * force * p.density * 0.5;
                p.x -= directionX;
                p.y -= directionY;
            } else {
                // Return to base position
                p.x += (p.baseX - p.x) / 20;
                p.y += (p.baseY - p.y) / 20;
            }
        } else {
            // Gentle floating motion
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            p.baseX = p.x;
            p.baseY = p.y;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
    });

    // Draw connections
    for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(59, 130, 246, ${(1 - distance / 100) * 0.3})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

// Event listeners
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Initialize
resizeCanvas();
animate();
