/**
 * AI Features for Melvin Lim's Portfolio
 * Powered by Google Gemini API
 */

// ⚠️ SECURITY WARNING: 
// This API key is exposed in client-side code.
// Restrict it in Google Cloud Console to only accept requests from your domain.
const API_KEY = "AIzaSyAAtRT0ujrn4zZHmKwyJVUrGO5zSiV19qE";

// Cache TTL: 7 days in milliseconds
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000;

async function callGemini(prompt) {
    if (!API_KEY || API_KEY.includes("PASTE_YOUR")) {
        console.error("Please configure the API Key in ai-features.js");
        return "System Error: API Key not configured. Check console.";
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.status === 429) return "I'm overwhelmed with requests. Please try again in a minute.";
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No insights found.";
    } catch (e) {
        console.error("AI Error:", e);
        return "I'm currently resting. Please try asking again later.";
    }
}

// --- HELPER: Local Storage Caching with TTL ---
function getCachedResult(key) {
    try {
        const cached = localStorage.getItem(key);
        if (cached) {
            const parsed = JSON.parse(cached);
            // Check if cache has expired
            if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL) {
                return parsed.value;
            } else {
                // Cache expired, remove it
                localStorage.removeItem(key);
                return null;
            }
        }
    } catch (e) {
        return null;
    }
    return null;
}

function setCachedResult(key, value) {
    try {
        const cacheEntry = {
            value: value,
            timestamp: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(cacheEntry));
    } catch (e) {
        console.warn("Local Storage full or disabled, skipping cache.");
    }
}

// --- Feature 1: Scholar's Synthesis (Essays) ---
async function synthesizeEssay(buttonEl) {
    const article = buttonEl.closest('.essay-item');
    const contentElement = article.querySelector('.essay-excerpt') || article.querySelector('p');
    const content = contentElement ? contentElement.innerText : "Leadership reflection";
    const resultArea = article.querySelector('.ai-result-area');

    const essayTitle = article.querySelector('.essay-title')?.innerText || "unknown_essay";
    const cacheKey = `melvin_essay_${essayTitle.replace(/\s/g, '_')}`;

    // 1. Check Cache First
    const cachedResponse = getCachedResult(cacheKey);
    if (cachedResponse) {
        resultArea.innerHTML = `<div class="ai-result-box">${cachedResponse}</div>`;
        buttonEl.innerHTML = `<i data-lucide="check" width="14" height="14"></i> Cached Insight`;
        buttonEl.disabled = true;
        if (window.lucide) lucide.createIcons();
        return;
    }

    // 2. If not cached, Call API
    resultArea.innerHTML = `<div class="ai-result-box">Synthesizing wisdom<span class="loading-dots"></span></div>`;
    buttonEl.disabled = true;

    const prompt = `
        You are a wise mentor and leadership coach. 
        Read this reflection from a young officer: "${content}".
        Generate a single, bold "Leadership Aphorism" (one sentence) that captures the core lesson. 
        Then, provide one sentence of "Actionable Advice" derived from it.
        Format as plain text.
    `;

    const response = await callGemini(prompt);

    // Format bold text for display
    const formattedResponse = response.replace(/(Leadership Aphorism:|Actionable Advice:)/g, '<strong>$1</strong>');

    // 3. Save to Cache
    if (!response.includes("I'm currently resting") && !response.includes("System Error")) {
        setCachedResult(cacheKey, formattedResponse);
    }

    resultArea.innerHTML = `<div class="ai-result-box">${formattedResponse}</div>`;
    buttonEl.innerText = "Synthesized";
}

// --- Feature 2: AI Librarian (Library) ---
async function askBookAI(btnElement, title, author) {
    let resultBox = btnElement.parentElement.querySelector('.ai-result-box');
    if (!resultBox) {
        resultBox = document.createElement('div');
        resultBox.className = 'ai-result-box';
        btnElement.parentElement.appendChild(resultBox);
    }

    const cacheKey = `melvin_book_${title.replace(/\s/g, '_')}`;

    // 1. Check Cache First
    const cachedResponse = getCachedResult(cacheKey);
    if (cachedResponse) {
        resultBox.innerText = cachedResponse;
        btnElement.innerHTML = `<i data-lucide="check" width="14" height="14"></i> Insight Loaded`;
        btnElement.disabled = true;
        if (window.lucide) lucide.createIcons();
        return;
    }

    // 2. If not cached, Call API
    resultBox.innerHTML = `Consulting the archives<span class="loading-dots"></span>`;
    btnElement.disabled = true;

    const prompt = `
        Explain why the book "${title}" by ${author} is essential reading for a leader interested in Systems Thinking, Stoicism, or High-Performance Teams.
        Keep the answer under 40 words. Be sophisticated but accessible.
    `;

    const response = await callGemini(prompt);

    // 3. Save to Cache
    if (!response.includes("I'm currently resting") && !response.includes("System Error")) {
        setCachedResult(cacheKey, response);
    }

    resultBox.innerText = response;
    btnElement.innerHTML = `<i data-lucide="check" width="14" height="14"></i> Insight Loaded`;
    if (window.lucide) lucide.createIcons();
}

// --- Utility: Clear AI Cache ---
function clearAICache() {
    const keys = Object.keys(localStorage);
    let cleared = 0;
    keys.forEach(key => {
        if (key.startsWith('melvin_')) {
            localStorage.removeItem(key);
            cleared++;
        }
    });
    console.log(`Cleared ${cleared} cached AI responses.`);
    alert(`Cleared ${cleared} cached AI responses. Refresh to regenerate.`);
}

// Initialize Lucide icons if loaded
document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) lucide.createIcons();
});
