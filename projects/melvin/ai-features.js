/**
 * AI Features for Melvin Lim's Portfolio — Smart Mock Edition
 * Zero API calls. Zero cost. 100% reliability.
 * 
 * Uses pre-written responses that sound AI-generated.
 */

// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
    minDelay: 600,    // Minimum "thinking" delay (ms)
    maxDelay: 1500,   // Maximum "thinking" delay (ms)
};

// ========================================
// ESSAY SYNTHESIS (Pre-written Aphorisms)
// ========================================

const ESSAY_INSIGHTS = {
    // Default insights keyed by essay title (or partial match)
    "default": {
        aphorism: "Leadership is not about rank — it's about the space you create for others to grow.",
        advice: "Practice active listening in your next meeting. Notice who speaks least, and invite their perspective."
    },
    "leadership": {
        aphorism: "The best leaders are thermostats, not thermometers — they set the temperature, not just read it.",
        advice: "Before reacting to team dynamics, ask: 'What climate am I creating here?'"
    },
    "failure": {
        aphorism: "Failure is data. Shame is noise. Separate them ruthlessly.",
        advice: "Document your next setback clinically, as if observing someone else. The lessons become clearer."
    },
    "team": {
        aphorism: "A team's strength isn't in its stars, but in its ability to orbit around a shared mission.",
        advice: "Revisit your team's 'why' quarterly. Alignment decays faster than you think."
    },
    "resilience": {
        aphorism: "Resilience isn't bouncing back — it's integrating forward with new wisdom.",
        advice: "After hardship, ask: 'What capability did this build?' Name it explicitly."
    },
    "decision": {
        aphorism: "In uncertainty, the cost of inaction compounds faster than the cost of imperfect action.",
        advice: "Set a decision deadline. Any decision made within it beats a 'perfect' decision made too late."
    },
    "growth": {
        aphorism: "Growth happens at the edge of competence, not in the center of comfort.",
        advice: "Identify one skill where you're 'good enough' and deliberately push into discomfort."
    },
    "mentorship": {
        aphorism: "The mentor's gift is not answers, but better questions.",
        advice: "Replace 'Here's what I'd do' with 'What options have you considered?' Wait for depth."
    },
    "saf": {
        aphorism: "Discipline without purpose is tyranny. Purpose without discipline is chaos. Leadership is the synthesis.",
        advice: "Audit your routines: which serve purpose, and which are mere habit? Cut the latter."
    },
    "reflection": {
        aphorism: "Reflection is not retreat — it's reconnaissance for the next advance.",
        advice: "Schedule 15 minutes weekly for unstructured thinking. Protect it like a VIP meeting."
    }
};

// ========================================
// BOOK INSIGHTS (Pre-written Recommendations)
// ========================================

const BOOK_INSIGHTS = {
    "default": "This book offers frameworks for systems thinking and deliberate practice — essential for leaders navigating complexity with intention.",

    // Specific books (add more as needed)
    "thinking, fast and slow": "Kahneman's dual-system model is foundational. Understanding System 1 vs System 2 prevents decision fatigue and cognitive bias in high-stakes leadership.",
    "atomic habits": "Clear's 1% improvement framework compounds leadership growth. Identity-based habits ('I am a leader who...') outperform goal-based ones.",
    "extreme ownership": "Willink and Babin distill combat leadership into civilian truth: own everything, blame nothing. The ultimate accountability framework.",
    "good to great": "Collins' 'Level 5 Leadership' — humility plus fierce resolve — still benchmarks executive maturity two decades later.",
    "principles": "Dalio's radical transparency and idea meritocracy provide an operating system for teams that value truth over ego.",
    "the art of war": "Sun Tzu's 2,500-year-old strategy remains relevant: win without fighting, know your terrain, and victory is decided before battle.",
    "meditations": "Marcus Aurelius wrote the original leadership journal. Stoic principles for maintaining composure when everything is chaos.",
    "high output management": "Grove's Intel playbook: leverage, meetings as work, and the manager as coach. Silicon Valley's management bible.",
    "start with why": "Sinek's Golden Circle — Why before How before What — remains the simplest model for inspiring teams and customers.",
    "the hard thing about hard things": "Horowitz on the messy reality of leadership: there's no playbook for the truly hard decisions. You're alone, and that's okay.",
    "deep work": "Newport's case for focused work in a distracted age. Block time ruthlessly. Shallow work expands to fill available space.",
    "range": "Epstein's antidote to early specialization. Broad experience creates transfer learning. Generalists win in complex domains.",
    "antifragile": "Taleb's concept of gaining from disorder. Don't just withstand shocks; get stronger from them. Avoid the Fragile, be Antifragile.",
    "thinking in systems": "Meadows' primer on stocks, flows, and feedback loops. Stop looking at events and start looking at the structures that cause them.",
    "team of teams": "McChrystal's shift from hierarchical command to networked adaptability. In complex environments, shared consciousness beats efficiency.",
    "zero to one": "Thiel's treatise on vertical progress. Competition is for losers; build a monopoly by solving a unique problem."
};

// ========================================
// HELPER FUNCTIONS
// ========================================

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomDelay() {
    return Math.floor(Math.random() * (CONFIG.maxDelay - CONFIG.minDelay)) + CONFIG.minDelay;
}

function findInsight(title, insights) {
    const lowerTitle = title.toLowerCase();

    // Look for keyword matches in the title
    for (const [key, value] of Object.entries(insights)) {
        if (key !== "default" && lowerTitle.includes(key)) {
            return value;
        }
    }

    // Fallback to default
    return insights["default"];
}

// ========================================
// FEATURE 1: Scholar's Synthesis (Essays)
// ========================================

async function synthesizeEssay(buttonEl) {
    const article = buttonEl.closest('.essay-item');
    const resultArea = article.querySelector('.ai-result-area');
    const essayTitle = article.querySelector('.essay-title')?.innerText || "reflection";

    // Disable button and show loading
    buttonEl.disabled = true;
    resultArea.innerHTML = `<div class="ai-result-box">Synthesizing wisdom<span class="loading-dots"></span></div>`;

    // Simulate "thinking"
    await sleep(getRandomDelay());

    // Get insight based on essay title keywords
    const insight = findInsight(essayTitle, ESSAY_INSIGHTS);

    // Format response
    const response = `<strong>Leadership Aphorism:</strong> "${insight.aphorism}"<br><br><strong>Actionable Advice:</strong> ${insight.advice}`;

    resultArea.innerHTML = `<div class="ai-result-box"></div>`;
    const box = resultArea.querySelector('.ai-result-box');

    // Typewriter effect
    let i = 0;
    const speed = 15; // ms per character
    function typeWriter() {
        if (i < response.length) {
            // Check for HTML tags
            if (response.substring(i, i + 1) === '<') {
                const endTag = response.indexOf('>', i);
                box.innerHTML += response.substring(i, endTag + 1);
                i = endTag + 1;
            } else {
                box.innerHTML += response.charAt(i);
                i++;
            }
            setTimeout(typeWriter, speed);
        } else {
            buttonEl.innerText = "Synthesized";
        }
    }

    typeWriter();
}


// ========================================
// FEATURE 2: AI Librarian (Books)
// ========================================

async function askBookAI(btnElement, title, author) {
    let resultBox = btnElement.parentElement.querySelector('.ai-result-box');
    if (!resultBox) {
        resultBox = document.createElement('div');
        resultBox.className = 'ai-result-box';
        btnElement.parentElement.appendChild(resultBox);
    }

    // Disable button and show loading
    btnElement.disabled = true;
    resultBox.innerHTML = `Consulting the archives<span class="loading-dots"></span>`;

    // Simulate "thinking"
    await sleep(getRandomDelay());

    // Get insight based on book title
    const insight = findInsight(title, BOOK_INSIGHTS);

    resultBox.innerHTML = "";

    // Typewriter effect
    let i = 0;
    const speed = 15;
    function typeWriterLibrary() {
        if (i < insight.length) {
            resultBox.innerHTML += insight.charAt(i);
            i++;
            setTimeout(typeWriterLibrary, speed);
        } else {
            btnElement.innerHTML = `<i data-lucide="check" width="14" height="14"></i> Insight Loaded`;
            if (window.lucide) lucide.createIcons();
        }
    }

    typeWriterLibrary();
}


// ========================================
// FEATURE 3: Autonomic Stats (Reading Time)
// ========================================

function initEssayStats() {
    const essays = document.querySelectorAll('.essay-item');
    essays.forEach(essay => {
        const text = essay.innerText;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 wpm avg

        const dateEl = essay.querySelector('.essay-date');
        if (dateEl) {
            const stats = document.createElement('span');
            stats.className = 'essay-stats';
            stats.innerHTML = ` • ${readingTime} min read`;
            dateEl.appendChild(stats);
        }
    });
}

// ========================================
// INITIALIZE
// ========================================

document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) lucide.createIcons();
    initEssayStats();
    console.log("⚡ Melvin AI Features v2.1 (Bionic Polish) initialized");
});

