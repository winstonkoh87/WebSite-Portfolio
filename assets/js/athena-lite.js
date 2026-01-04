/**
 * Athena Live Widget v2.0 — Smart Mock Edition
 * Interactive terminal chatbot for Winston Koh's portfolio
 * 
 * Philosophy: Zero API calls. Zero cost. Zero latency. 100% reliability.
 * Uses keyword-based matching with random delay for "AI feel".
 */

// ========================================
// CONFIGURATION
// ========================================

const ATHENA_CONFIG = {
    sessionCap: 15,             // Max messages per session
    minDelay: 400,              // Minimum "thinking" delay (ms)
    maxDelay: 1200,             // Maximum "thinking" delay (ms)
    typingSpeed: 18,            // ms per character for typing effect
};

// Session state
let messageCount = 0;
let isProcessing = false;

// ========================================
// KNOWLEDGE BASE (The "Brain")
// ========================================

const KNOWLEDGE_BASE = [
    // --- Pricing & Rates ---
    {
        triggers: ["rate", "price", "cost", "charge", "expensive", "cheap", "fee", "budget", "quote", "pricing"],
        response: "Project-based pricing. Minimums start at $800 for landing pages, scaling with complexity. Use WhatsApp for a custom quote."
    },

    // --- Tech Stack ---
    {
        triggers: ["python", "tech", "stack", "code", "language", "framework", "react", "vue", "next"],
        response: "Primary stack: Python (FastAPI) for logic, vanilla HTML/CSS/JS for frontend. I avoid heavy frameworks unless SDR justifies them. See the Projects section for examples."
    },

    // --- AI & Athena ---
    {
        triggers: ["ai", "athena", "rag", "llm", "gpt", "gemini", "claude", "chatgpt", "artificial"],
        response: "Athena is my personal RAG system — 4,000+ memories, 200+ protocols, hybrid vector search. It's how I recall context instantly. This widget is a simplified public interface."
    },

    // --- Projects & Portfolio ---
    {
        triggers: ["project", "portfolio", "work", "example", "case", "study", "client"],
        response: "Featured: Melvin Lim (SAF officer portfolio), MathPro Tuition (P6 math), Brew & Bean Café (F&B landing page). Scroll down to the Projects section for full breakdowns."
    },

    // --- SME & Business ---
    {
        triggers: ["sme", "tuition", "business", "small", "cafe", "restaurant", "shop", "ecommerce"],
        response: "I specialize in 'Bionic' upgrades for SMEs — websites that capture leads, not just look pretty. See MathPro case study: streamlined lead funnel for P6 Math tuition."
    },

    // --- Contact ---
    {
        triggers: ["contact", "email", "hire", "work with", "reach", "whatsapp", "telegram"],
        response: "Best channel: WhatsApp (+65 9790 9965). Second best: LinkedIn. I respond faster to specific project inquiries than vague 'hello' messages."
    },

    // --- About Winston ---
    {
        triggers: ["who", "about", "winston", "background", "experience", "story"],
        response: "Winston Koh — Strategic Systems Architect. I build systems that run themselves. Background: SME growth strategy, AI integration, and 'Bionic' workflows. Philosophy: Amoral Realism."
    },

    // --- Philosophy & Laws ---
    {
        triggers: ["philosophy", "law", "principle", "rule", "belief", "approach"],
        response: "The Six Laws: (1) No Irreversible Ruin, (2) Context is King, (3) Actions > Words, (0) Subjective Utility, (4) Modular Architecture, (5) Cite Your Sources. These govern all my work."
    },

    // --- Availability ---
    {
        triggers: ["available", "free", "busy", "timeline", "when", "schedule", "slot"],
        response: "Availability shifts weekly. Best to reach out via WhatsApp to discuss timelines. I prioritize projects with clear scope and committed clients."
    },

    // --- What You Do ---
    {
        triggers: ["do", "offer", "service", "help", "build", "create", "make"],
        response: "I build: (1) SME websites with lead capture, (2) Personal branding portfolios, (3) AI-augmented workflows. I don't just build sites — I build systems."
    },

    // --- Greeting ---
    {
        triggers: ["hello", "hi", "hey", "sup", "yo", "good morning", "good afternoon"],
        response: "Connection established. I'm Athena — Winston's local AI interface. Ask me about his projects, tech stack, or philosophy. Or just say 'contact' for direct lines."
    },

    // --- Thanks ---
    {
        triggers: ["thank", "thanks", "thx", "appreciate", "cheers"],
        response: "Acknowledged. If you need Winston directly, WhatsApp is the fastest channel. Good luck with your project."
    },

    // --- Joke / Fun ---
    {
        triggers: ["joke", "funny", "humor", "entertain"],
        response: "I'm optimized for utility, not entertainment. But here's one: Why do programmers prefer dark mode? Because light attracts bugs."
    },
];

// ========================================
// DOM ELEMENTS
// ========================================

let chatHistory, userInput, widget;

function initAthena() {
    chatHistory = document.getElementById('chat-history');
    userInput = document.getElementById('user-input');
    widget = document.getElementById('athena-widget');

    if (!widget) {
        console.log('Athena widget not found on this page.');
        return;
    }

    console.log('⚡ Athena Live v2.0 (Smart Mock) initialized');
}

// ========================================
// WIDGET CONTROLS
// ========================================

function toggleAthena() {
    if (!widget) return;
    widget.classList.toggle('minimized');

    if (!widget.classList.contains('minimized')) {
        setTimeout(() => {
            if (userInput) userInput.focus();
        }, 300);
    }
}

// ========================================
// MESSAGE HANDLING
// ========================================

function handleEnter(e) {
    if (e.key === 'Enter' && userInput && userInput.value.trim() !== '') {
        sendMessage(userInput.value.trim());
    }
}

async function sendMessage(query) {
    if (isProcessing) return;

    // Check session cap
    if (messageCount >= ATHENA_CONFIG.sessionCap) {
        appendMessage('system', 'Session limit reached. Refresh page or use WhatsApp for direct contact.');
        return;
    }

    isProcessing = true;
    messageCount++;

    // Display user message
    appendMessage('user', query);
    userInput.value = '';

    // Show processing indicator
    const loadingId = appendMessage('system', 'Querying local cache...');

    // Simulate "thinking" delay (crucial for AI feel)
    const delay = Math.floor(Math.random() * (ATHENA_CONFIG.maxDelay - ATHENA_CONFIG.minDelay)) + ATHENA_CONFIG.minDelay;

    await sleep(delay);

    // Remove loading message
    removeMessage(loadingId);

    // Get response from knowledge base
    const response = getResponse(query);

    // Type out the response
    await typeMessage('bot', response);

    isProcessing = false;
}

function getResponse(query) {
    const lowerQuery = query.toLowerCase();

    // Check knowledge base for matches
    const match = KNOWLEDGE_BASE.find(entry =>
        entry.triggers.some(trigger => lowerQuery.includes(trigger))
    );

    if (match) {
        return match.response;
    }

    // Fallback response
    return "That query falls outside my public index. Try asking about 'projects', 'tech stack', 'rates', or 'philosophy'. Or use 'contact' for direct lines.";
}

// ========================================
// UI HELPERS
// ========================================

function appendMessage(sender, text) {
    if (!chatHistory) return null;

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.id = `msg-${Date.now()}`;

    const promptSpan = document.createElement('span');
    promptSpan.classList.add('prompt');
    promptSpan.textContent = sender === 'user' ? '>' : sender === 'bot' ? '#' : '//';

    msgDiv.appendChild(promptSpan);
    msgDiv.appendChild(document.createTextNode(' ' + text));

    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    return msgDiv.id;
}

async function typeMessage(sender, text) {
    if (!chatHistory) return;

    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);

    const promptSpan = document.createElement('span');
    promptSpan.classList.add('prompt');
    promptSpan.textContent = '#';
    msgDiv.appendChild(promptSpan);

    const textSpan = document.createElement('span');
    textSpan.textContent = ' ';
    msgDiv.appendChild(textSpan);

    chatHistory.appendChild(msgDiv);

    // Typing effect
    for (let i = 0; i < text.length; i++) {
        textSpan.textContent += text[i];
        chatHistory.scrollTop = chatHistory.scrollHeight;
        await sleep(ATHENA_CONFIG.typingSpeed);
    }
}

function removeMessage(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ========================================
// INITIALIZE ON DOM READY
// ========================================

document.addEventListener('DOMContentLoaded', initAthena);

// Expose functions globally
window.toggleAthena = toggleAthena;
window.handleEnter = handleEnter;
