// Gemini AI Service for GrowQR Chatbot
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Use gemini-2.0-flash
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// ============================================================================
// EXACT ANSWERS from latestchatbot.txt v2.2
// ============================================================================
const ANSWERS = {
    GROWQR_OVERVIEW: "GrowQR is the world's first AI-powered Skill Identity & Readiness platform! One lifetime QR Key links you forever to your dynamic Q-Score™ — a living, verifiable composite of 25+ readiness attributes (IQ, EQ, AQ, and more). You're about to unlock a future where your skills truly shine – exciting, right?",

    VS_RESUME_LINKEDIN: "Unlike static resumes or generic profiles, your single GrowQR is a permanent, evolving digital identity. It powers real-time Q-Score™ updates, personalized AI coaching, crypto rewards for upskilling, and trusted matchmaking. Imagine a profile that grows with you – this is your key to endless opportunities!",

    LAUNCH_DATE: "We're in active development and gearing up for private beta in Q1–Q2 2026! Join the waitlist at growqr.ai today – the earliest members claim their lifetime QR Key first. Your future starts now – don't miss out!",

    GET_STARTED: "Amazing choice! Join the waitlist at growqr.ai to be among the first. You'll claim your unique lifetime QR Key when private beta opens in Q1–Q2 2026. Take this step toward discovering your true potential!",

    THE_LOOP: "The Loop: Grow Together. Your Skill Growth Fuels the Network! It's our interconnected ecosystem where your personal growth powers benefits for everyone – individuals, enterprises, institutions, and smart cities. Together, we're building something transformative!",

    QSCORE_DEFINITION: "Q-Score™ is your single, verified readiness metric – an AI-driven composite score that quantifies your overall skills, experience, and potential out of 100. It combines 25+ attributes (like Intelligence (IQ), Emotion (EQ), Adaptability (AQ), Creativity, Leadership, Analysis, Focus, Decision-Making, Aptitude, Confidence, and more) into one cumulative score, plus highlights your top 4 strongest skills. This is your Proof-of-Skill – empowering, isn't it?",

    QSCORE_CALCULATION: "It's an AI-driven quantified weighted average of all your possible skills and attributes, based on verified credentials. For example: If your IQ is 80, EQ 60, AQ 40, and others vary, the AI weights them to create one cumulative Q-Score™ (e.g., 72/100), which evolves in real-time as you grow. Your profile shows the overall score prominently, along with your top 4 skills for instant insights. Keep upskilling – watch your score soar!",

    QSCORE_ATTRIBUTES: "Over 25+ signals across key dimensions, including Intelligence (IQ), Emotion (EQ), Adaptability (AQ), Creativity, Leadership, Analysis, Focus, Decision, Aptitude, Confidence, and many more. It's holistic and designed to capture your full potential – you're more capable than you know!",

    QSCORE_DYNAMIC: "Yes! It's living and evolves in real-time as you upskill and add verified achievements. Every step you take boosts your score – this is growth in action!",

    QSCORE_SECURE: "Absolutely! Blockchain ensures tamper-proof verification, and you control who sees your data. We're GDPR compliant with 256-bit encryption. Your trust is everything to us!",

    QR_KEY: "Your unique, permanent QR code – one lifetime QR Key that links forever to your evolving profile and Q-Score™. It's unified across platforms – simple, powerful, and yours for life!",

    TECHNOLOGY: "Powered by Adaptive Intelligence:\n• Unified QR: One identity everywhere\n• Q-Score™: Real-time skill quantification\n• Personalized AI: Your growth assistants\n• Blockchain: Tamper-proof verification\n• Quantum Intel: Next-gen computing\n• Human Intel: Authentic validation\nThis tech is built to scale and empower you!",

    AI_COACHING: "Yes! Get your own Personalised AI Agents – like a buddy helping you upskill, boost your profile, and unlock pathways. Your personal growth partner is waiting!",

    REWARDS: "Absolutely – including crypto rewards for upskilling! Grow your skills and get rewarded – motivation at its best!",

    DATA_SECURITY: "Yes! 256-bit encryption, GDPR compliant, and you have full control over your information. We're committed to your privacy and security.",

    BENEFITS_INDIVIDUAL: "For YOUR GROWTH:\n• Instant Self-Discovery: See your personalised readiness in seconds.\n• Verified Matchmaking: Connect with opportunities that match your potential.\n• Personalised AI Agents: Your AI buddy helps you upskill and boost your profile.\n• Infinite Pathways: Unlock tailored opportunities fueling growth.\nThis is all about YOU thriving – let's get started!",

    BENEFITS_ENTERPRISE: "To UNLOCK CAPABILITIES:\n• Instant Evaluation: Holistic view of internal skill sets and culture.\n• Smart Hiring: Autonomous hiring of relevant, verified profiles.\n• Social Branding: Uplift perception with purposeful teams.\n• Maximize Growth: Unlock infinite growth with AI-powered profiles.\nBuild stronger teams and a brighter future!",

    BENEFITS_INSTITUTION: "To EMPOWER STUDENTS:\n• Industry Preparedness: Curricula aligned with real-world demands.\n• Personalized Development: AI-tailored pathways for relevant journeys.\n• Ranking Elevation: Boost reputation through superior placements.\n• Faculty Enhancement: Boost educator performance.\nPrepare the next generation for success!",

    BENEFITS_SMARTCITY: "For INTELLIGENT GOVERNANCE:\n• Human Readiness Score: Assessment of citizen capabilities.\n• Population Assessment: Categorize urban demographics.\n• Targeted Investments: Deploy need-based strategic industries.\n• Progress Monitoring: Track advancements across city scales.\nCreate smarter, more capable communities!",

    WHO_CAN_USE: "Everyone! Individuals chasing dreams, enterprises building teams, institutions empowering students, and smart cities driving progress. Wherever you are, GrowQR helps you grow!",

    WAITLIST: "Head to growqr.ai and sign up now! Be first in line for your lifetime QR Key in private beta (Q1–Q2 2026). This is your moment – join and let's grow together!",

    PRICING: "Details will come closer to launch – join the waitlist for updates! We're focused on making growth accessible and rewarding.",

    SUPPORT: "I'd love to help! If you'd like to connect further, discuss something specific, or have a detailed question, please feel free to email our team at support@growqr.ai – they'll be excited to assist you on your growth journey!",

    GREETING: "Hi there! 👋 Welcome to GrowQR – the world's first AI-powered Skill Identity platform! I'm here to help you discover everything about Q-Score™ and your skill potential. What would you like to know?",

    THANKS: "You're welcome! 🎉 I'm thrilled to help. If you have more questions about GrowQR or Q-Score™, just ask. Your growth journey is just beginning!",

    FALLBACK: "Great question! I'm here to help you discover everything about GrowQR and your skill potential. If you'd like to connect further or discuss something specific, feel free to email us at support@growqr.ai – we'd love to hear from you!"
};

// ============================================================================
// INTENT DETECTION - Checks what the user is ASKING about
// ============================================================================
const detectIntent = (msg: string): string => {

    // Check for BENEFIT/VALUE intent
    const isBenefitIntent = msg.includes('benefit') || msg.includes('advantage') ||
        msg.includes('what will i get') || msg.includes('what do i get') ||
        msg.includes('what i will get') || msg.includes('what i get') ||
        msg.includes('what can i get') || msg.includes('help me') ||
        msg.includes('for me') || msg.includes('for us') ||
        msg.includes('how does it help') || msg.includes('how it helps') ||
        msg.includes('what\'s in it') || msg.includes('why should') ||
        msg.includes('use for') || msg.includes('value for');

    // Check for DEFINITION intent (what is X)
    const isDefinitionIntent = msg.includes('what is') || msg.includes('what\'s') ||
        msg.includes('explain') || msg.includes('define') || msg.includes('meaning') ||
        msg.includes('tell me about');

    // Check for HOW intent (calculation, process)
    const isHowIntent = msg.includes('how is') || msg.includes('how does') ||
        msg.includes('how do') || msg.includes('calculated') || msg.includes('formula') ||
        msg.includes('process');

    // Check for CHANGE/DYNAMIC intent
    const isChangeIntent = msg.includes('change') || msg.includes('dynamic') ||
        msg.includes('update') || msg.includes('evolve') || msg.includes('improve') ||
        msg.includes('increase');

    // Check for START/JOIN intent
    const isStartIntent = msg.includes('start') || msg.includes('join') ||
        msg.includes('sign up') || msg.includes('signup') || msg.includes('register') ||
        msg.includes('get started') || msg.includes('how to use');

    // Check for PRICE intent
    const isPriceIntent = msg.includes('price') || msg.includes('cost') ||
        msg.includes('pricing') || msg.includes('how much') || msg.includes('free') ||
        msg.includes('pay') || msg.includes('subscription') || msg.includes('fee');

    // Check for SECURITY intent
    const isSecurityIntent = msg.includes('secure') || msg.includes('security') ||
        msg.includes('safe') || msg.includes('privacy') || msg.includes('gdpr') ||
        msg.includes('encrypt') || msg.includes('data protect') || msg.includes('verifiable');

    // Check for LAUNCH/AVAILABILITY intent
    const isLaunchIntent = msg.includes('launch') || msg.includes('available') ||
        msg.includes('release') || msg.includes('when') || msg.includes('beta') ||
        msg.includes('live');

    // Check for COMPARISON intent
    const isCompareIntent = msg.includes('different') || msg.includes('vs') ||
        msg.includes('versus') || msg.includes('compared') || msg.includes('better than') ||
        msg.includes('resume') || msg.includes('linkedin');

    // Check for SUPPORT intent
    const isSupportIntent = msg.includes('support') || msg.includes('contact') ||
        msg.includes('email') || msg.includes('talk to') || msg.includes('speak to') ||
        msg.includes('human') || msg.includes('help me');

    if (isBenefitIntent) return 'BENEFIT';
    if (isPriceIntent) return 'PRICE';
    if (isSecurityIntent) return 'SECURITY';
    if (isLaunchIntent) return 'LAUNCH';
    if (isStartIntent) return 'START';
    if (isCompareIntent) return 'COMPARE';
    if (isChangeIntent) return 'CHANGE';
    if (isHowIntent) return 'HOW';
    if (isDefinitionIntent) return 'DEFINITION';
    if (isSupportIntent) return 'SUPPORT';

    return 'UNKNOWN';
};

// ============================================================================
// CONTEXT DETECTION - Checks WHO/WHAT the question is about
// ============================================================================
const detectContext = (msg: string): string => {

    // Enterprise/Business context
    const isEnterpriseContext = msg.includes('employee') || msg.includes('employer') ||
        msg.includes('enterprise') || msg.includes('company') || msg.includes('companies') ||
        msg.includes('business') || msg.includes('corporate') || msg.includes('organization') ||
        msg.includes('organisation') || msg.includes('hr') || msg.includes('hiring') ||
        msg.includes('recruit') || msg.includes('workforce') || msg.includes('team');

    // Institution/Education context
    const isInstitutionContext = msg.includes('university') || msg.includes('universities') ||
        msg.includes('college') || msg.includes('school') || msg.includes('institution') ||
        msg.includes('educator') || msg.includes('teacher') || msg.includes('professor') ||
        msg.includes('faculty') || msg.includes('academic') || msg.includes('campus') ||
        msg.includes('student') || msg.includes('placement');

    // Smart City/Government context
    const isCityContext = msg.includes('city') || msg.includes('cities') ||
        msg.includes('government') || msg.includes('civic') || msg.includes('municipal') ||
        msg.includes('governance') || msg.includes('citizen') || msg.includes('public sector');

    // Individual/Personal context
    const isIndividualContext = msg.includes('individual') || msg.includes('myself') ||
        msg.includes('personal') || msg.includes('i ') || msg.includes(' me ') ||
        msg.includes('for me') || msg.includes('my ');

    // Q-Score context
    const isQScoreContext = msg.includes('q-score') || msg.includes('qscore') ||
        msg.includes('q score') || msg.includes('score');

    // Loop context
    const isLoopContext = msg.includes('loop') || msg.includes('ecosystem');

    // QR Key context
    const isQRKeyContext = msg.includes('qr key') || msg.includes('qr code') ||
        msg.includes('lifetime qr') || msg.includes('permanent qr');

    // Technology context
    const isTechContext = msg.includes('technology') || msg.includes('tech') ||
        msg.includes('blockchain') || msg.includes('ai ') || msg.includes('powered');

    // Rewards context
    const isRewardsContext = msg.includes('reward') || msg.includes('crypto') ||
        msg.includes('earn') || msg.includes('incentive');

    // AI Coaching context
    const isCoachContext = msg.includes('coach') || msg.includes('agent') ||
        msg.includes('mentor') || msg.includes('buddy') || msg.includes('assistant');

    // GrowQR general context
    const isGrowQRContext = msg.includes('growqr');

    if (isEnterpriseContext) return 'ENTERPRISE';
    if (isInstitutionContext) return 'INSTITUTION';
    if (isCityContext) return 'CITY';
    if (isQScoreContext) return 'QSCORE';
    if (isLoopContext) return 'LOOP';
    if (isQRKeyContext) return 'QRKEY';
    if (isTechContext) return 'TECH';
    if (isRewardsContext) return 'REWARDS';
    if (isCoachContext) return 'COACHING';
    if (isGrowQRContext) return 'GROWQR';
    if (isIndividualContext) return 'INDIVIDUAL';

    return 'GENERAL';
};

// ============================================================================
// ANSWER SELECTION - Combines Intent + Context for accurate response
// ============================================================================
const findAnswer = (userMessage: string): string => {
    const msg = userMessage.toLowerCase().trim();

    // Handle greetings first
    if (/^(hi|hello|hey|hii|hiii|good morning|good evening|good afternoon)$/i.test(msg) ||
        msg.startsWith('hi ') || msg.startsWith('hello ') || msg.startsWith('hey ')) {
        return ANSWERS.GREETING;
    }

    // Handle thanks
    if (msg.includes('thank') || msg === 'ty' || msg === 'thx') {
        return ANSWERS.THANKS;
    }

    const intent = detectIntent(msg);
    const context = detectContext(msg);

    console.log(`[Chatbot] Intent: ${intent}, Context: ${context}`); // Debug

    // ========== BENEFIT Intent + Context ==========
    if (intent === 'BENEFIT') {
        if (context === 'ENTERPRISE') return ANSWERS.BENEFITS_ENTERPRISE;
        if (context === 'INSTITUTION') return ANSWERS.BENEFITS_INSTITUTION;
        if (context === 'CITY') return ANSWERS.BENEFITS_SMARTCITY;
        if (context === 'INDIVIDUAL' || context === 'GENERAL') return ANSWERS.BENEFITS_INDIVIDUAL;
        // Default for benefit questions without clear context
        return ANSWERS.BENEFITS_INDIVIDUAL;
    }

    // ========== DEFINITION Intent + Context ==========
    if (intent === 'DEFINITION') {
        if (context === 'QSCORE') return ANSWERS.QSCORE_DEFINITION;
        if (context === 'LOOP') return ANSWERS.THE_LOOP;
        if (context === 'QRKEY') return ANSWERS.QR_KEY;
        if (context === 'GROWQR' || context === 'GENERAL') return ANSWERS.GROWQR_OVERVIEW;
        return ANSWERS.GROWQR_OVERVIEW;
    }

    // ========== HOW Intent + Context ==========
    if (intent === 'HOW') {
        if (context === 'QSCORE') return ANSWERS.QSCORE_CALCULATION;
        if (context === 'TECH') return ANSWERS.TECHNOLOGY;
        return ANSWERS.TECHNOLOGY;
    }

    // ========== CHANGE Intent + Context ==========
    if (intent === 'CHANGE') {
        if (context === 'QSCORE') return ANSWERS.QSCORE_DYNAMIC;
        return ANSWERS.QSCORE_DYNAMIC;
    }

    // ========== Other Intents ==========
    if (intent === 'PRICE') return ANSWERS.PRICING;
    if (intent === 'SECURITY') return ANSWERS.DATA_SECURITY;
    if (intent === 'LAUNCH') return ANSWERS.LAUNCH_DATE;
    if (intent === 'START') return ANSWERS.GET_STARTED;
    if (intent === 'COMPARE') return ANSWERS.VS_RESUME_LINKEDIN;
    if (intent === 'SUPPORT') return ANSWERS.SUPPORT;

    // ========== Context-only matches (for simple one-word questions) ==========
    if (context === 'REWARDS') return ANSWERS.REWARDS;
    if (context === 'COACHING') return ANSWERS.AI_COACHING;
    if (context === 'LOOP') return ANSWERS.THE_LOOP;
    if (context === 'QRKEY') return ANSWERS.QR_KEY;
    if (context === 'TECH') return ANSWERS.TECHNOLOGY;

    // ========== Special patterns ==========

    // "Who can use"
    if (msg.includes('who can') || msg.includes('for whom') || msg.includes('target audience')) {
        return ANSWERS.WHO_CAN_USE;
    }

    // Waitlist
    if (msg.includes('waitlist') || msg.includes('wait list') || msg.includes('early access')) {
        return ANSWERS.WAITLIST;
    }

    // Q-Score attributes
    if ((context === 'QSCORE') && (msg.includes('attribute') || msg.includes('25') || msg.includes('dimension'))) {
        return ANSWERS.QSCORE_ATTRIBUTES;
    }

    // Q-Score secure/verifiable
    if ((context === 'QSCORE') && (msg.includes('secure') || msg.includes('verif') || msg.includes('fake') || msg.includes('tamper'))) {
        return ANSWERS.QSCORE_SECURE;
    }

    // No match - return empty to trigger AI
    return "";
};

// ============================================================================
// SYSTEM PROMPT - For AI fallback (truly unknown questions)
// ============================================================================
const SYSTEM_PROMPT = `You are GrowQR Assistant. Your job is to understand the user's question and respond with the most relevant approved answer.

# UNDERSTANDING USER INTENT

First, identify WHAT the user is asking about:
- BENEFITS: "what will I get", "advantages", "help me", "for me"
- DEFINITION: "what is", "explain", "define"
- HOW: "how does", "calculated", "process"
- CHANGE: "does it change", "dynamic", "evolve"
- PRICE: "cost", "pricing", "free"
- LAUNCH: "when available", "release date", "beta"
- START: "how to join", "sign up", "register"

Then, identify WHO/WHAT context:
- ENTERPRISE: employee, employer, company, business, HR, hiring
- INSTITUTION: university, school, student, educator
- CITY: government, city, civic, citizen
- INDIVIDUAL: for me, personal, myself
- Q-SCORE: qscore, q-score, score
- GROWQR: growqr platform

# APPROVED ANSWERS

## Benefits + Enterprise Context:
"To UNLOCK CAPABILITIES:
• Instant Evaluation: Holistic view of internal skill sets and culture.
• Smart Hiring: Autonomous hiring of relevant, verified profiles.
• Social Branding: Uplift perception with purposeful teams.
• Maximize Growth: Unlock infinite growth with AI-powered profiles.
Build stronger teams and a brighter future!"

## Benefits + Institution Context:
"To EMPOWER STUDENTS:
• Industry Preparedness: Curricula aligned with real-world demands.
• Personalized Development: AI-tailored pathways for relevant journeys.
• Ranking Elevation: Boost reputation through superior placements.
• Faculty Enhancement: Boost educator performance.
Prepare the next generation for success!"

## Benefits + City Context:
"For INTELLIGENT GOVERNANCE:
• Human Readiness Score: Assessment of citizen capabilities.
• Population Assessment: Categorize urban demographics.
• Targeted Investments: Deploy need-based strategic industries.
• Progress Monitoring: Track advancements across city scales.
Create smarter, more capable communities!"

## Benefits + Individual/General Context:
"For YOUR GROWTH:
• Instant Self-Discovery: See your personalised readiness in seconds.
• Verified Matchmaking: Connect with opportunities that match your potential.
• Personalised AI Agents: Your AI buddy helps you upskill and boost your profile.
• Infinite Pathways: Unlock tailored opportunities fueling growth.
This is all about YOU thriving – let's get started!"

## Definition + Q-Score Context:
"Q-Score™ is your single, verified readiness metric – an AI-driven composite score that quantifies your overall skills, experience, and potential out of 100. It combines 25+ attributes into one cumulative score, plus highlights your top 4 strongest skills. This is your Proof-of-Skill!"

## Definition + GrowQR Context:
"GrowQR is the world's first AI-powered Skill Identity & Readiness platform! One lifetime QR Key links you forever to your dynamic Q-Score™ — a living, verifiable composite of 25+ readiness attributes."

## Change + Q-Score Context:
"Yes! It's living and evolves in real-time as you upskill and add verified achievements. Every step you take boosts your score – this is growth in action!"

## Launch/Availability:
"We're in active development and gearing up for private beta in Q1–Q2 2026! Join the waitlist at growqr.ai today."

## Getting Started:
"Amazing choice! Join the waitlist at growqr.ai to be among the first. You'll claim your unique lifetime QR Key when private beta opens in Q1–Q2 2026."

## Pricing:
"Details will come closer to launch – join the waitlist for updates! We're focused on making growth accessible and rewarding."

## Support/Contact:
"I'd love to help! Please feel free to email our team at support@growqr.ai – they'll be excited to assist you!"

## Fallback (Unknown):
"Great question! I'm here to help you discover everything about GrowQR. Feel free to email us at support@growqr.ai for more details!"

# RULES
1. Match user intent AND context to select the right answer
2. Use exact approved answers - don't paraphrase
3. Be enthusiastic and encouraging
4. If unclear, use the fallback response`;

// Store chat session
let chatSession: any = null;

export const resetChatHistory = () => {
    chatSession = null;
};

// ============================================================================
// RATE LIMITING & RETRY LOGIC
// ============================================================================
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000; // 1 second base delay

// Helper to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Track last request time to throttle requests
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL_MS = 500; // Minimum 500ms between requests

// ============================================================================
// MAIN FUNCTION
// ============================================================================
export const generateGeminiResponse = async (userMessage: string): Promise<string> => {

    // STEP 1: Rule-based matching (Intent + Context)
    const answer = findAnswer(userMessage);
    if (answer) {
        return answer;
    }

    // STEP 2: No API key → fallback
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        return ANSWERS.FALLBACK;
    }

    // STEP 3: Throttle requests to prevent rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL_MS) {
        await delay(MIN_REQUEST_INTERVAL_MS - timeSinceLastRequest);
    }
    lastRequestTime = Date.now();

    // STEP 4: Use AI for truly unknown questions with retry logic
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            if (!chatSession) {
                chatSession = model.startChat({
                    history: [
                        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
                        { role: "model", parts: [{ text: "Understood! I will identify intent AND context to select the correct approved answer." }] },
                    ],
                    generationConfig: {
                        maxOutputTokens: 600,
                        temperature: 0.1,
                    },
                });
            }

            const result = await chatSession.sendMessage(userMessage);
            const response = await result.response;
            return response.text();

        } catch (error: any) {
            const isRateLimitError = error?.message?.includes('429') ||
                error?.message?.includes('quota') ||
                error?.status === 429;

            if (isRateLimitError && attempt < MAX_RETRIES - 1) {
                // Exponential backoff: 1s, 2s, 4s
                const waitTime = BASE_DELAY_MS * Math.pow(2, attempt);
                console.warn(`⚠️ Rate limit hit (attempt ${attempt + 1}/${MAX_RETRIES}). Retrying in ${waitTime}ms...`);
                // Reset chat session before retry
                chatSession = null;
                await delay(waitTime);
                continue;
            }

            // Final attempt failed or non-retryable error
            if (isRateLimitError) {
                console.warn('⚠️ Gemini API rate limit reached after all retries. Using fallback response.');
            } else {
                console.error('❌ Gemini Error:', error?.message || error);
            }

            // Reset chat session on error to allow fresh start
            chatSession = null;
            return ANSWERS.FALLBACK;
        }
    }

    // Should never reach here, but just in case
    return ANSWERS.FALLBACK;
};
