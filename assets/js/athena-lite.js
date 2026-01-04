/**
 * Athena Live Widget v4.0 — Guided Conversation Edition
 * Adventure-game style conversation with state machine
 * 
 * Features:
 * - State machine for conversation flow
 * - Context-aware suggestions based on current state
 * - All paths lead to conversion within 4 exchanges
 * - Typing indicator and chat bubbles
 */

// ========================================
// CONFIGURATION
// ========================================

const ATHENA_CONFIG = {
    sessionCap: 20,
    minDelay: 500,
    maxDelay: 1200,
    typingSpeed: 10,
};

let messageCount = 0;
let isProcessing = false;
let currentState = 'START';

// ========================================
// CONVERSATION STATE MACHINE
// ========================================

const STATES = {
    'START': {
        response: "👋 Hey! I'm Athena — Winston's AI assistant. How can I help you today?",
        suggestions: ["💼 What do you do?", "💰 Pricing info", "📂 See projects"],
        keywords: {
            "service|do|offer|help|build": "SERVICES",
            "price|cost|rate|charge|fee|budget|quote": "PRICING",
            "project|portfolio|work|example|case": "PROJECTS",
            "who|winston|about|background": "ABOUT",
            "trust|review|testimonial|credible|legit": "TRUST",
            "hello|hi|hey": "START"
        }
    },

    'SERVICES': {
        response: "🔧 I build three things:\n\n1️⃣ **SME Websites** — Lead capture machines for small businesses\n2️⃣ **Personal Portfolios** — For professionals & students\n3️⃣ **AI Workflows** — Automation systems that run themselves\n\nNot just pretty sites — complete business systems!",
        suggestions: ["See examples", "🌟 Get a quote", "Tell me more about AI"],
        keywords: {
            "example|portfolio|show|see": "PROJECTS",
            "quote|contact|start|interested|hire": "CONTACT",
            "ai|automation|workflow|system": "AI_DEEP",
            "sme|business|website": "SME_DEEP",
            "personal|portfolio|student": "PORTFOLIO_DEEP"
        }
    },

    'PRICING': {
        response: "💰 Project-based pricing:\n\n• **Landing Page**: from $800\n• **Full Website**: from $1,500\n• **Portfolio + Branding**: from $1,200\n\nComplexity scales the price. Best to chat directly for a custom quote!",
        suggestions: ["✅ Yes, let's talk", "See examples first", "What's included?"],
        keywords: {
            "yes|talk|contact|whatsapp|start": "CONTACT",
            "example|see|show|portfolio": "PROJECTS",
            "include|what|scope|deliverable": "SCOPE"
        }
    },

    'PROJECTS': {
        response: "📂 Featured work:\n\n🫡 **Melvin Lim** — SAF Officer portfolio (personal branding)\n☕ **Brew & Bean** — F&B landing page (lead capture)\n🧬 **ThatBioTutor** — Tuition centre (SEO + conversion)\n\nScroll down to see live demos, or...",
        suggestions: ["I want something similar!", "Tell me about your process", "Different style?"],
        keywords: {
            "similar|want|interested|yes|start": "CONTACT",
            "process|how|work|timeline": "PROCESS",
            "different|other|more|style": "SERVICES"
        }
    },

    'AI_DEEP': {
        response: "🤖 AI Workflows explained:\n\nI turn manual tasks into automated pipelines. Example: **Athena** (the system running this chat) has 4,000+ memories and 200+ protocols.\n\nFor businesses, I build:\n• Auto-response systems\n• Data processing pipelines\n• Decision support tools\n\nThink: *things that run while you sleep.*",
        suggestions: ["🚀 I need this!", "Back to services", "What does it cost?"],
        keywords: {
            "need|want|interested|build|start": "CONTACT",
            "service|back|other": "SERVICES",
            "cost|price|rate": "PRICING"
        }
    },

    'SME_DEEP': {
        response: "🏪 SME Websites aren't just websites — they're lead machines.\n\nEvery build includes:\n• Mobile-first design\n• WhatsApp integration\n• Analytics tracking\n• SEO foundation\n\nGoal: **Visitors → Leads → Customers**",
        suggestions: ["Get a quote", "See an example", "What's the process?"],
        keywords: {
            "quote|contact|start|interested": "CONTACT",
            "example|see|show": "PROJECTS",
            "process|how|time": "PROCESS"
        }
    },

    'PORTFOLIO_DEEP': {
        response: "👤 Personal Portfolios for:\n\n• **Students** — DSA/ABA applications, university admissions\n• **Professionals** — LinkedIn upgrade, personal branding\n• **Freelancers** — Showcase your work, attract clients\n\nYour story, presented beautifully.",
        suggestions: ["I need one!", "See student examples", "How much?"],
        keywords: {
            "need|want|yes|interested": "CONTACT",
            "example|see|student": "PROJECTS",
            "much|price|cost": "PRICING"
        }
    },

    'ABOUT': {
        response: "👤 About Winston:\n\nFormer analyst, now bionic operator. Built **Athena** (this AI) with 4,000+ memories and 200+ protocols.\n\nPhilosophy: *Build systems that run themselves.*\n\nCheck the About page for the full story, or...",
        suggestions: ["See his work", "Get a quote", "Why trust him?"],
        keywords: {
            "work|portfolio|see|show": "PROJECTS",
            "quote|contact|start": "CONTACT",
            "trust|why|credible": "TRUST"
        }
    },

    'TRUST': {
        response: "⭐ Trust signals:\n\n• **95+ Lighthouse scores** on all builds\n• **Open-source Athena** — 200+ protocols, public repo\n• **3 testimonials** on homepage (real clients)\n• **No retainers** — project-based, pay on delivery\n\nSee for yourself:",
        suggestions: ["View portfolio", "Read testimonials", "Get a quote"],
        keywords: {
            "portfolio|see|view": "PROJECTS",
            "testimonial|review|read": "PROJECTS",
            "quote|contact|start": "CONTACT"
        }
    },

    'SCOPE': {
        response: "📦 What's included in every project:\n\n✅ Custom design (no templates)\n✅ Mobile responsive\n✅ Basic SEO setup\n✅ Analytics integration\n✅ 2 rounds of revisions\n✅ 30-day support post-launch\n\nWant the full breakdown?",
        suggestions: ["Let's start!", "Show me examples", "Back to pricing"],
        keywords: {
            "start|yes|contact|go": "CONTACT",
            "example|show|see": "PROJECTS",
            "pricing|back|price": "PRICING"
        }
    },

    'PROCESS': {
        response: "⚡ How we work:\n\n1️⃣ **Brief** — We chat about goals (30 min)\n2️⃣ **Proposal** — Scope + pricing in 24h\n3️⃣ **Build** — 1-2 weeks depending on complexity\n4️⃣ **Review** — 2 rounds of feedback\n5️⃣ **Launch** — You go live! 🚀\n\nSimple. Fast. No BS.",
        suggestions: ["Start now!", "See portfolio first", "What's the cost?"],
        keywords: {
            "start|now|yes|go|contact": "CONTACT",
            "portfolio|see|example": "PROJECTS",
            "cost|price|much": "PRICING"
        }
    },

    'CONTACT': {
        response: "📱 Perfect! Here's how to reach Winston:\n\n**WhatsApp**: +65 9790 9965 *(fastest)*\n**Email**: Click the green button below\n\n💡 Pro tip: Share your project idea in the first message — you'll get a faster response!\n\nLooking forward to building something amazing together! 🚀",
        suggestions: ["💬 Open WhatsApp", "📋 Fill project form", "One more question"],
        keywords: {
            "whatsapp|chat|message": "CONTACT_WA",
            "form|fill|brief": "CONTACT_FORM",
            "question|more|another": "START"
        },
        isFinal: true
    },

    'CONTACT_WA': {
        response: "📲 Opening WhatsApp...\n\nJust click the green button in the corner, or hit this link:\n**wa.me/6597909965**\n\nSee you there! 👋",
        suggestions: ["Got it!", "Need form instead", "Ask another question"],
        keywords: {
            "got|ok|thanks": "END",
            "form": "CONTACT_FORM",
            "question|another": "START"
        },
        isFinal: true
    },

    'CONTACT_FORM': {
        response: "📋 Project brief form:\n\n**tally.so/r/3xjo1O**\n\nTakes 2 minutes. Winston reviews within 24h and sends a proposal!\n\nGood luck with your project! 🎯",
        suggestions: ["Done!", "WhatsApp instead", "One more question"],
        keywords: {
            "done|ok|thanks": "END",
            "whatsapp": "CONTACT_WA",
            "question": "START"
        },
        isFinal: true
    },

    'END': {
        response: "🙏 Thanks for chatting! Good luck with your project.\n\nFeel free to come back anytime. Athena out! ✨",
        suggestions: ["Start over"],
        keywords: {
            "start|over|again|new": "START"
        }
    }
};

// Fallback for unknown inputs
const FALLBACK = {
    response: "🤔 I didn't quite catch that. Let me help you find what you need:",
    suggestions: ["💼 Services", "💰 Pricing", "📂 Projects"]
};

// ========================================
// DOM ELEMENTS
// ========================================

let chatHistory, userInput, widget, suggestionArea;

function initAthena() {
    chatHistory = document.getElementById('chat-history');
    userInput = document.getElementById('user-input');
    widget = document.getElementById('athena-widget');
    suggestionArea = document.getElementById('suggestion-area');

    if (!widget) {
        console.log('Athena widget not found on this page.');
        return;
    }

    // Show welcome message
    showStateResponse('START');

    console.log('⚡ Athena Live v4.0 (Guided Conversation) initialized');
}

// ========================================
// STATE MACHINE LOGIC
// ========================================

function getNextState(input) {
    const currentStateObj = STATES[currentState];
    if (!currentStateObj || !currentStateObj.keywords) {
        return null;
    }

    const lowerInput = input.toLowerCase();

    for (const [pattern, nextState] of Object.entries(currentStateObj.keywords)) {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(lowerInput)) {
            return nextState;
        }
    }

    return null;
}

function showStateResponse(state) {
    const stateObj = STATES[state];
    if (!stateObj) {
        appendBotMessage(FALLBACK.response, FALLBACK.suggestions);
        return;
    }

    currentState = state;
    appendBotMessage(stateObj.response, stateObj.suggestions);
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

function sendFromButton() {
    if (userInput && userInput.value.trim() !== '') {
        sendMessage(userInput.value.trim());
    }
}

async function sendMessage(query) {
    if (isProcessing) return;

    if (messageCount >= ATHENA_CONFIG.sessionCap) {
        appendBotMessage('Session limit reached. Please use WhatsApp for more questions!', ['Open WhatsApp']);
        return;
    }

    isProcessing = true;
    messageCount++;

    // Clear suggestions
    clearSuggestions();

    // Display user message
    appendUserMessage(query);
    userInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Simulate thinking delay
    const delay = Math.floor(Math.random() * (ATHENA_CONFIG.maxDelay - ATHENA_CONFIG.minDelay)) + ATHENA_CONFIG.minDelay;
    await sleep(delay);

    // Remove typing indicator
    hideTypingIndicator();

    // Determine next state
    const nextState = getNextState(query);

    if (nextState) {
        showStateResponse(nextState);
    } else {
        // Fallback: stay in current state but show helpful options
        appendBotMessage(FALLBACK.response, STATES[currentState]?.suggestions || FALLBACK.suggestions);
    }

    isProcessing = false;
}

// ========================================
// UI COMPONENTS
// ========================================

function appendUserMessage(text) {
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper user';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;

    wrapper.appendChild(bubble);
    chatHistory.appendChild(wrapper);
    scrollToBottom();
}

function appendBotMessage(text, suggestions = []) {
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper bot';

    const avatar = document.createElement('div');
    avatar.className = 'bot-avatar';
    avatar.textContent = '🤖';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = formatMessage(text);

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    chatHistory.appendChild(wrapper);
    scrollToBottom();

    // Show suggestions after bot message
    if (suggestions.length > 0) {
        showSuggestions(suggestions);
    }
}

function formatMessage(text) {
    // Convert **bold** to <strong>
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
}

function showSuggestions(suggestions) {
    clearSuggestions();

    suggestions.forEach(text => {
        const btn = document.createElement('button');
        btn.className = 'suggestion-btn';
        btn.textContent = text;
        btn.addEventListener('click', () => {
            sendMessage(text);
        });
        suggestionArea.appendChild(btn);
    });
}

function clearSuggestions() {
    if (suggestionArea) {
        suggestionArea.innerHTML = '';
    }
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'message-wrapper bot';
    indicator.id = 'typing-indicator';

    const avatar = document.createElement('div');
    avatar.className = 'bot-avatar';
    avatar.textContent = '🤖';

    const typing = document.createElement('div');
    typing.className = 'message-bubble typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';

    indicator.appendChild(avatar);
    indicator.appendChild(typing);
    chatHistory.appendChild(indicator);
    scrollToBottom();
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

function scrollToBottom() {
    if (chatHistory) {
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
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
window.sendFromButton = sendFromButton;
