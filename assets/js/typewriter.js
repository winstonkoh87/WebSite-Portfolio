document.addEventListener('DOMContentLoaded', function () {
    const text = "Initializing System... Loaded: Strategic Architect Protocol v7.6";
    const speed = 40; // typing speed in ms
    const element = document.getElementById('typewriter');

    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);
});
