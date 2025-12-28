document.addEventListener('DOMContentLoaded', function () {
    const lines = [
        "> INITIALIZING SYSTEM ARCHITECTURE...",
        "> OPTIMIZING DECISION PROTOCOLS...",
        "> LOADING: STRATEGIC ARCHITECT V8.0",
        "> SYSTEM READY."
    ];
    const speed = 30; // typing speed in ms
    const lineDelay = 400; // delay between lines
    const element = document.getElementById('typewriter');

    let lineIndex = 0;
    let charIndex = 0;

    function typeWriter() {
        if (lineIndex < lines.length) {
            const currentLine = lines[lineIndex];

            if (charIndex < currentLine.length) {
                // If starting a new line, ensure we have a break or clear logic
                // But here we are appending to the same span "typewriter".
                // Simple hack: We won't clear, we just append. 
                // However, for multiple lines, we need <br>.
                // Better approach: We append text. If charIndex is 0 and lineIndex > 0, append <br> first.

                if (charIndex === 0 && lineIndex > 0) {
                    element.innerHTML += "<br>";
                }

                element.innerHTML += currentLine.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, speed);
            } else {
                // End of line
                lineIndex++;
                charIndex = 0;
                setTimeout(typeWriter, lineDelay);
            }
        }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);
});
