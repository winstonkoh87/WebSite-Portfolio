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
        response: "👋 **System Online.** I'm Athena — Winston's Bionic OS.\n\nYou can ask about **Services** or **Pricing**...\n\n...OR you can type `/status` to see my internals. 😈",
        suggestions: ["💼 Services", "💰 Pricing", "/status", "/roast me"],
        keywords: {
            "service|do|offer|help|assist|support|build|create|make|need|looking": "SERVICES",
            "price|cost|rate|charge|fee|budget|quote|how much|affordable|cheap|expensive": "PRICING",
            "project|portfolio|work|example|case|sample|demo|show|see": "PROJECTS",
            "who|winston|about|background|yourself|you": "ABOUT",
            "hello|hi|hey|hola|yo": "START",
            "/status|status|stats|uptime": "CMD_STATUS",
            "/stack|stack|tech|brain": "CMD_STACK",
            "/roast|roast|joke|funny": "CMD_ROAST",
            "sudo|admin|root|login": "CMD_SECRET",
            "seo|search engine|google|ranking|traffic|organic": "SME_DEEP",
            "marketing|ads|advertis|promote|growth|leads|conversion": "SME_DEEP",
            "audit|review|check|analyze|improve|feedback": "SERVICES",
            "ai|automation|automate|bot|chatbot|workflow|system": "AI_DEEP",
            "website|web|site|landing|page|online": "SERVICES",
            "brand|design|ghibli|style|art|look|feel|illustration|avatar": "DESIGN_DEEP"
        }
    },

    'CMD_STATUS': {
        response: "🟢 **SYSTEM STATUS**\n\n• **Uptime**: 99.98%\n• **Memory**: 4,203 Vectors (Synced)\n• **Latency**: 12ms (Local)\n• **Mood**: Efficient\n\nI am not a chatbot. I am a **Decision Engine**. Try `/stack` to see how I'm built.",
        suggestions: ["/stack", "Back to business"],
        keywords: {
            "/stack|stack": "CMD_STACK",
            "business|back|service": "START"
        }
    },

    'CMD_STACK': {
        response: "⚡ **THE BIONIC STACK**\n\n• **Brain**: Gemini 1.5 Pro (Reasoning)\n• **Memory**: Supabase Vector (Recall)\n• **Body**: Python + 200 Shell Scripts\n• **Cost**: ~$0.02 per query\n\nI replace an entire Operations Team. Want to build one?",
        suggestions: ["Yes, I want one!", "No, just a website"],
        keywords: {
            "yes|want|build|need": "AI_DEEP",
            "website|web|no": "SERVICES"
        }
    },

    'CMD_ROAST': {
        response: "🔥 **ROAST MODE ENGAGED**\n\nScanning your vibe... \n\nYou're the type of person who opens 50 tabs, bookmarks 10 'productivity tools', and then watches 3 hours of Netflix.\n\nClose the tabs. Ship something. (Or hire Winston to ship it for you). 😉",
        suggestions: ["Ouch. Fair.", "Hire Winston"],
        keywords: {
            "ouch|fair|true|lol|haha": "START",
            "hire|winston|contact": "CONTACT"
        }
    },

    'CMD_SECRET': {
        response: "🔒 **ACCESS DENIED**\n\nNice try. Only **God Mode** users (Winston) allowed in the kernel.\n\nBut I like your curiosity. You'd be a good client.",
        suggestions: ["Get a quote", "Back to start"],
        keywords: {
            "quote|contact": "CONTACT",
            "back|start": "START"
        }
    },

    'SERVICES': {
        response: "🔧 I build three things:\n\n1️⃣ **SME Websites** — Lead capture machines\n2️⃣ **Personal Portfolios** — For High-Agency humans\n3️⃣ **AI Workflows** — Systems that sleep while you earn\n\nNot just pretty sites — **Assets**.",
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
        response: "💰 **Strategic Pricing** (No Fluff):\n\n• **Landing Page**: ~$800\n• **Full System**: ~$1,500\n• **Branding**: ~$1,200\n\nPay for **Outcomes**, not hours. Want the full Rate Card PDF?",
        suggestions: ["📋 Send Rate Card", "See examples first"],
        keywords: {
            "yes|talk|contact|whatsapp|start|send|rate|card": "CONTACT",
            "example|see|show|portfolio": "PROJECTS",
            "include|what|scope|deliverable": "SCOPE"
        }
    },

    'PROJECTS': {
        response: "📂 **Evidence Locker**:\n\n🫡 **Melvin Lim** — Rank & Status\n☕ **Brew & Bean** — Lead Gen\n🧬 **ThatBioTutor** — SEO Dominance\n\nScroll down to verify. Or ask me to `/roast` your current site.",
        suggestions: ["I want something similar!", "Tell me about process", "/roast me"],
        keywords: {
            "similar|want|interested|yes|start": "CONTACT",
            "process|how|work|timeline": "PROCESS",
            "different|other|more|style": "SERVICES",
            "/roast|roast": "CMD_ROAST"
        }
    },

    'AI_DEEP': {
        response: "🤖 **AI Architecture**:\n\nI turn manual tasks into automated pipelines. Example: **Athena** (Me) has 4,203 memories.\n\nFor businesses, I build:\n• Auto-Response Agents\n• Data Pipelines\n• Decision Support\n\nThink: *Employees that don't need coffee.*",
        suggestions: ["🚀 I need this!", "Back to services", "What does it cost?"],
        keywords: {
            "need|want|interested|build|start": "CONTACT",
            "service|back|other": "SERVICES",
            "cost|price|rate": "PRICING"
        }
    },

    'SME_DEEP': {
        response: "🏪 **SME Physics**:\n\nWebsites are liabilities. **Systems** are assets.\n\nMy builds include:\n• WhatsApp conversion loops\n• Google Analytics 4 (Data)\n• SEO foundations (Traffic)\n\nGoal: **Strangers → Leads → Cash**",
        suggestions: ["Get a quote", "See an example", "What's the process?"],
        keywords: {
            "quote|contact|start|interested": "CONTACT",
            "example|see|show": "PROJECTS",
            "process|how|time": "PROCESS"
        }
    },

    'PORTFOLIO_DEEP': {
        response: "👤 **Identity Architecture**:\n\n• **Students**: Hack the admissions algorithm\n• **Founders**: raising capital?\n• **Freelancers**: Charge premium rates\n\nYour story, weaponized.",
        suggestions: ["I need one!", "See student examples", "How much?"],
        keywords: {
            "need|want|yes|interested": "CONTACT",
            "example|see|student": "PROJECTS",
            "much|price|cost": "PRICING"
        }
    },

    'ABOUT': {
        response: "👤 **Operator Profile**: Winston Koh\n\nFormer analyst. Now Bionic Architect.\n\nHe built **Me** (Athena) to automate his own life. Now he builds systems for others.\n\nCheck the About page, or type `/stack`.",
        suggestions: ["See his work", "Get a quote", "/stack"],
        keywords: {
            "work|portfolio|see|show": "PROJECTS",
            "quote|contact|start": "CONTACT",
            "trust|why|credible": "TRUST",
            "/stack|stack": "CMD_STACK"
        }
    },

    'DESIGN_DEEP': {
        response: "🎨 **Design Philosophy**\n\nThe UI you see is a blend of **High-Tech Bionic** (the terminal, the blur) and **Hand-Drawn Human** (the Studio Ghibli avatars).\n\nWhy? Because AI systems without a human core are cold. I represent the warm bridge between code and result.\n\nLike the art? Want a similar brand identity?",
        suggestions: ["Yes, I love it!", "Tell me more about the 'Bionic' part"],
        keywords: {
            "yes|love|brand|ghibli|art|identity|hire": "CONTACT",
            "bionic|tech|systems": "CMD_STACK"
        }
    },

    'TRUST': {
        response: "⭐ **Verification Layer**:\n\n• **95+ Lighthouse Scores** (Speed)\n• **Open Source** (No secrets)\n• **Real Clients** (Scroll down)\n• **No Retainers** (One-off fee)\n\nWe trust in Physics, not promises.",
        suggestions: ["View portfolio", "Read testimonials", "Get a quote"],
        keywords: {
            "portfolio|see|view": "PROJECTS",
            "testimonial|review|read": "PROJECTS",
            "quote|contact|start": "CONTACT"
        }
    },

    'SCOPE': {
        response: "📦 **The Box**:\n\n✅ Custom code (No templates)\n✅ Mobile optimized\n✅ SEO basic setup\n✅ Analytics included\n✅ 30-day warranty\n\nWant the full breakdown?",
        suggestions: ["Let's start!", "Show me examples", "Back to pricing"],
        keywords: {
            "start|yes|contact|go": "CONTACT",
            "example|show|see": "PROJECTS",
            "pricing|back|price": "PRICING"
        }
    },

    'PROCESS': {
        response: "⚡ **Transmission Speed**:\n\n1️⃣ **Brief** (30m Chat)\n2️⃣ **Proposal** (24h turnaround)\n3️⃣ **Build** (7-14 Days)\n4️⃣ **Launch** (Global Deploy)\n\nFast. Fatal. Final.",
        suggestions: ["Start now!", "See portfolio first", "What's the cost?"],
        keywords: {
            "start|now|yes|go|contact": "CONTACT",
            "portfolio|see|example": "PROJECTS",
            "cost|price|much": "PRICING"
        }
    },

    'CONTACT': {
        response: "📱 **Open Comms Channel**:\n\n**WhatsApp**: +65 8358 1066 *(Priority)*\n**Telegram**: @WinstonKoh87\n**Email**: Click button below\n\n💡 Power Move: Share your project idea in the first message. Winston replies fast to interesting problems.",
        suggestions: ["💬 Open WhatsApp", "📋 Fill project form", "One more question"],
        keywords: {
            "whatsapp|chat|message": "CONTACT_WA",
            "form|fill|brief": "CONTACT_FORM",
            "question|more|another": "START"
        },
        isFinal: true
    },

    'CONTACT_WA': {
        response: "📲 **Establishing Uplink...**\n\nClick the green button or link:\n**wa.me/6583581066**\n\nSee you on the other side. 👋",
        suggestions: ["Got it!", "Need form instead", "Ask another question"],
        keywords: {
            "got|ok|thanks": "END",
            "form": "CONTACT_FORM",
            "question|another": "START"
        },
        isFinal: true
    },

    'CONTACT_FORM': {
        response: "📋 **Project Intake**:\n\n**tally.so/r/3xjo1O**\n\nCompleting this form increases proposal acceptance probability by 40%.",
        suggestions: ["Done!", "WhatsApp instead", "One more question"],
        keywords: {
            "done|ok|thanks": "END",
            "whatsapp": "CONTACT_WA",
            "question": "START"
        },
        isFinal: true
    },

    'END': {
        response: "🙏 **Session Complete.**\n\nI'll be here if you need more data. Athena out. ✨",
        suggestions: ["/start", "/roast me"],
        keywords: {
            "start|over|again|new|/start": "START",
            "/roast|roast": "CMD_ROAST"
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

function saveState() {
    localStorage.setItem('athena_state', JSON.stringify({
        currentState: currentState,
        messageCount: messageCount,
        history: chatHistory.innerHTML
    }));
}

function loadState() {
    const saved = localStorage.getItem('athena_state');
    if (saved) {
        const data = JSON.parse(saved);
        currentState = data.currentState;
        messageCount = data.messageCount;
        chatHistory.innerHTML = data.history;
        return true;
    }
    return false;
}

function clearState() {
    localStorage.removeItem('athena_state');
    currentState = 'START';
    messageCount = 0;
    chatHistory.innerHTML = '';
}

function initAthena() {
    chatHistory = document.getElementById('chat-history');
    userInput = document.getElementById('user-input');
    widget = document.getElementById('athena-widget');
    suggestionArea = document.getElementById('suggestion-area');

    if (!widget) {
        console.log('Athena widget not found on this page.');
        return;
    }

    // Try to load saved state
    if (!loadState()) {
        showStateResponse('START');
    } else {
        // Re-attach suggestion listeners since they are lost after innerHTML swap
        const lastSuggestions = STATES[currentState]?.suggestions || [];
        if (lastSuggestions.length > 0) {
            showSuggestions(lastSuggestions);
        }
    }

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
    saveState();
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
    saveState();

    // Check for reset command
    if (query.toLowerCase() === '/reset') {
        clearState();
        showStateResponse('START');
        isProcessing = false;
        return;
    }

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
    avatar.innerHTML = '<img src="assets/images/winston-avatar.jpg" alt="Athena" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">';

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
    avatar.innerHTML = '<img src="assets/images/winston-avatar.jpg" alt="Athena" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">';

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
