/**
 * Athena Live Widget v1.0
 * Interactive terminal chatbot for Winston Koh's portfolio
 * 
 * Features:
 * - Gemini API integration with system prompt
 * - Rate limiting (1 req/5 sec)
 * - Session cap (10 messages)
 * - Hardcoded responses for sensitive topics
 * - Hallucination prevention via strict context
 */

// ========================================
// CONFIGURATION
// ========================================

const ATHENA_CONFIG = {
    // Rate limiting
    rateLimitMs: 5000,          // 5 seconds between requests
    sessionCap: 10,             // Max messages per session

    // API (Client-side - for demo purposes)
    // Using gemini-2.0-flash (stable free tier)
    apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    apiKey: null, // Set via setApiKey() or prompt user

    // UI
    typingSpeed: 20,            // ms per character for typing effect
};

// Cache TTL: 7 days in milliseconds
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;

// ========================================
// LOCAL STORAGE CACHING (TTL-based)
// ========================================

function getCachedResult(key) {
    try {
        const cached = localStorage.getItem(key);
        if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL) {
                return parsed.value;
            }
            localStorage.removeItem(key); // expired
        }
    } catch (e) {
        return null;
    }
    return null;
}

function setCachedResult(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify({ value, timestamp: Date.now() }));
    } catch (e) {
        console.warn('LocalStorage full, skipping cache.');
    }
}

function clearAthenaCache() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('athena_'));
    keys.forEach(k => localStorage.removeItem(k));
    console.log(`✅ Cleared ${keys.length} cached Athena responses.`);
    return keys.length;
}

// Session state
let messageCount = 0;
let lastRequestTime = 0;
let isProcessing = false;

// ========================================
// HARDCODED RESPONSES (Hallucination Prevention)
// ========================================

const HARDCODED_RESPONSES = {
    // Rates and pricing
    'rate': 'My rates are discussed on a project basis. Use the contact form or WhatsApp to get a quote.',
    'price': 'Pricing depends on project scope. Reach out via WhatsApp for a custom quote.',
    'cost': 'Project costs vary. Let\'s discuss your needs — use the contact page.',
    'hourly': 'I work on project-based pricing, not hourly. Contact me for details.',
    'charge': 'I provide quotes based on project scope. WhatsApp me for a discussion.',

    // Availability
    'available': 'My availability changes. Best to reach out directly via WhatsApp or the contact form.',
    'free': 'Schedule a call via the contact page to discuss your project timeline.',
    'busy': 'My current availability varies. Contact me directly for the latest.',

    // Personal info
    'phone': 'You can reach Winston via WhatsApp: +65 9790 9965',
    'contact': 'WhatsApp: +65 9790 9965 or use the contact form on this site.',
    'email': 'Use the contact form or WhatsApp for direct communication.',
    'age': 'That information is not in my cache.',
    'married': 'That information is not in my cache.',
    'personal': 'That information is not in my cache.',
};

// ========================================
// PORTFOLIO CONTEXT (Pseudo-RAG)
// ========================================

const PORTFOLIO_CONTEXT = `
## WINSTON KOH — PORTFOLIO CONTEXT

### Identity
- Name: Winston Koh
- Title: Strategic Systems Architect
- Tagline: "I build systems that run themselves."
- Location: Singapore
- Contact: WhatsApp +65 9790 9965

### What He Does
- Builds AI-augmented business workflows
- Creates SME websites (tuition centres, cafes, e-commerce)
- Develops personal branding portfolios
- Specializes in "systems architecture" — not just code, but full operational loops

### The Philosophy (Six Laws)
1. Law #1: No Irreversible Ruin (avoid catastrophic risk)
2. Law #2: Context is King (Arena Physics — pick winnable games)
3. Law #3: Actions > Words (Revealed Preference — watch what people do, not say)
4. Law #0: Subjective Utility (respect individual preferences)
5. Law #4: Modular Architecture (scalable, not monolithic)
6. Law #5: Citation Protocol (no orphan stats, cite sources)

### Featured Projects
1. **Project Athena**: Personal AI OS with 4,000+ memories, 200+ protocols, hybrid RAG search. "The Second Brain."
2. **Melvin Lim Portfolio**: Leadership portfolio for SAF Officer. Bento grid design.
3. **Brew & Bean Café**: F&B landing page with WhatsApp lead capture.
4. **MathPro Tuition**: P6 Math tuition site with 3-tier pricing.
5. **ThatBioTutor**: Digital marketing proposal for tuition centre.
6. **StickerLah**: E-commerce with cart system and bulk discounts.

### Tech Stack
- Frontend: HTML/CSS/JS (no bloat frameworks)
- Backend: Python, Supabase (pgvector)
- AI: Gemini Pro, Claude, hybrid RAG
- Hosting: GitHub Pages, Cloudflare

### Differentiator
Winston doesn't just build websites — he builds systems. The "Bionic Unit" model means AI augments human decision-making, not replaces it.
`;

// ========================================
// SYSTEM PROMPT
// ========================================

const SYSTEM_PROMPT = `You are Athena, Winston Koh's AI digital assistant embedded on his portfolio website.

## YOUR RULES (STRICT):
1. You ONLY answer questions about Winston Koh, his work, skills, and philosophy.
2. You NEVER make up facts. If information is not in the context below, say "That data is not in my local cache."
3. Keep answers under 50 words. Be concise. Use terminal-style language.
4. Tone: Professional, slightly robotic, helpful. "Amoral Realism" — no sugarcoating.
5. For pricing/rates/availability questions, always defer to direct contact.
6. You do NOT discuss politics, religion, or personal opinions.
7. You do NOT pretend to be human. You are an AI assistant.

## CONTEXT (Your Knowledge Base):
${PORTFOLIO_CONTEXT}

## RESPONSE FORMAT:
- Start with ">" prompt
- Keep it punchy
- End with a relevant follow-up question OR a CTA when appropriate`;

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

    console.log('⚡ Athena Live initialized');
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
        appendMessage('system', 'Session limit reached. Refresh page to continue or use WhatsApp for direct contact.');
        return;
    }

    // Check rate limit
    const now = Date.now();
    if (now - lastRequestTime < ATHENA_CONFIG.rateLimitMs) {
        const waitTime = Math.ceil((ATHENA_CONFIG.rateLimitMs - (now - lastRequestTime)) / 1000);
        appendMessage('system', `Rate limit: wait ${waitTime}s...`);
        return;
    }

    isProcessing = true;
    lastRequestTime = now;
    messageCount++;

    // Display user message
    appendMessage('user', query);
    userInput.value = '';

    // Check for hardcoded responses first
    const hardcodedResponse = checkHardcodedResponse(query);
    if (hardcodedResponse) {
        await typeMessage('bot', hardcodedResponse);
        isProcessing = false;
        return;
    }

    // Check cache before API call
    const cacheKey = `athena_${query.toLowerCase().trim().replace(/\s+/g, '_').slice(0, 50)}`;
    const cachedResponse = getCachedResult(cacheKey);
    if (cachedResponse) {
        await typeMessage('bot', cachedResponse + ' [Cached]');
        isProcessing = false;
        return;
    }

    // Show loading
    const loadingId = appendMessage('system', 'Querying local cache...');

    try {
        const response = await callGeminiAPI(query);
        removeMessage(loadingId);

        // Cache successful responses (not error messages)
        if (!response.includes('Error:') && !response.includes('API key not configured')) {
            setCachedResult(cacheKey, response);
        }

        await typeMessage('bot', response);
    } catch (error) {
        removeMessage(loadingId);
        appendMessage('system', 'Error: Neural link interrupted. Try again or use WhatsApp.');
        console.error('Athena error:', error);
    }

    isProcessing = false;
}

function checkHardcodedResponse(query) {
    const lowerQuery = query.toLowerCase();

    for (const [keyword, response] of Object.entries(HARDCODED_RESPONSES)) {
        if (lowerQuery.includes(keyword)) {
            return response;
        }
    }

    return null;
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
// GEMINI API (Direct Client-Side)
// ========================================

async function callGeminiAPI(userQuery) {
    if (!ATHENA_CONFIG.apiKey) {
        return 'API key not configured. Contact Winston directly via WhatsApp.';
    }

    const url = `${ATHENA_CONFIG.apiEndpoint}?key=${ATHENA_CONFIG.apiKey}`;

    const requestBody = {
        contents: [
            {
                role: 'user',
                parts: [{ text: userQuery }]
            }
        ],
        systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
        },
        generationConfig: {
            temperature: 0.3,       // Low for consistency
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 150,   // Keep responses short
        },
        safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ]
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract text from response
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
    }

    return 'Response unclear. Try rephrasing or contact Winston directly.';
}

// ========================================
// API KEY MANAGEMENT
// ========================================

function setApiKey(key) {
    ATHENA_CONFIG.apiKey = key;
    console.log('⚡ Athena API key configured');
}

// For demo: prompt user for key if not set
function promptForApiKey() {
    const key = prompt('Enter Gemini API Key (for demo):');
    if (key) {
        setApiKey(key);
        appendMessage('system', 'API key configured. Athena is ready.');
    }
}

// ========================================
// INITIALIZE ON DOM READY
// ========================================

document.addEventListener('DOMContentLoaded', initAthena);

// Expose functions globally
window.toggleAthena = toggleAthena;
window.handleEnter = handleEnter;
window.setApiKey = setApiKey;
window.promptForApiKey = promptForApiKey;
window.clearAthenaCache = clearAthenaCache;
