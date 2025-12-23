// Gemini AI Service for GrowQR Chatbot - v3.0 (Improved Accuracy)
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// ============================================================================
// KNOWLEDGE BASE - Each QA has multiple question patterns for accuracy
// ============================================================================

interface QAPair {
    id: string;
    questions: string[]; // Multiple patterns that should match
    keywords: string[];  // Important keywords (higher weight)
    answer: string;
}

const KNOWLEDGE_BASE: QAPair[] = [
    // ===================== GENERAL / OVERVIEW =====================
    {
        id: "GROWQR_OVERVIEW",
        questions: [
            "what is growqr",
            "what is growqr.ai",
            "explain growqr",
            "tell me about growqr",
            "describe growqr",
            "what does growqr do",
            "what is this platform",
            "what is this about",
            "what are you",
            "what is your platform",
            "growqr",
            "about growqr",
            "about you",
            "about this",
            "tell me more",
            "what is this",
            "this platform",
            "your platform"
        ],
        keywords: ["growqr", "platform", "about", "this"],
        answer: "GrowQR is the world's first AI-powered Skill Identity & Readiness platform! One lifetime QR Key links you forever to your dynamic Q-Score™ — a living, verifiable composite of 25+ readiness attributes (IQ, EQ, AQ, and more). You're about to unlock a future where your skills truly shine – exciting, right?"
    },
    {
        id: "VS_RESUME_LINKEDIN",
        questions: [
            "how is growqr different from resumes",
            "how is growqr different from linkedin",
            "growqr vs linkedin",
            "growqr vs resume",
            "growqr versus linkedin",
            "difference between growqr and linkedin",
            "difference between growqr and resume",
            "why growqr instead of resume",
            "why not just use linkedin",
            "compared to resume",
            "compared to linkedin",
            "better than resume",
            "better than linkedin"
        ],
        keywords: ["resume", "linkedin", "different", "versus", "vs", "compared"],
        answer: "Unlike static resumes or generic profiles, your single GrowQR is a permanent, evolving digital identity. It powers real-time Q-Score™ updates, personalized AI coaching, crypto rewards for upskilling, and trusted matchmaking. Imagine a profile that grows with you – this is your key to endless opportunities!"
    },
    {
        id: "LAUNCH_DATE",
        questions: [
            "when will growqr launch",
            "when is growqr launching",
            "is growqr available now",
            "when is the release",
            "when can i use growqr",
            "release date",
            "launch date",
            "when is beta",
            "when is the beta launch",
            "is it live",
            "is growqr live"
        ],
        keywords: ["launch", "when", "available", "release", "beta", "live"],
        answer: "We're in active development and gearing up for private beta in Q1–Q2 2026! Join the waitlist at growqr.ai today – the earliest members claim their lifetime QR Key first. Your future starts now – don't miss out!"
    },
    {
        id: "GET_STARTED",
        questions: [
            "how do i get started",
            "how to get started",
            "how do i start",
            "how to start",
            "how do i get my growqr",
            "how to get growqr",
            "how to use growqr",
            "how can i join",
            "how do i join",
            "how to sign up",
            "how do i sign up",
            "how to register",
            "i want to join",
            "i want to sign up",
            "i want to start",
            "getting started"
        ],
        keywords: ["start", "get", "join", "sign", "register", "how"],
        answer: "Amazing choice! Join the waitlist at growqr.ai to be among the first. You'll claim your unique lifetime QR Key when private beta opens in Q1–Q2 2026. Take this step toward discovering your true potential!"
    },
    {
        id: "THE_LOOP",
        questions: [
            "what is the loop",
            "tell me about the loop",
            "explain the loop",
            "what is loop",
            "describe the loop",
            "loop ecosystem",
            "what does the loop mean"
        ],
        keywords: ["loop", "ecosystem"],
        answer: "The Loop: Grow Together. Your Skill Growth Fuels the Network! It's our interconnected ecosystem where your personal growth powers benefits for everyone – individuals, enterprises, institutions, and smart cities. Together, we're building something transformative!"
    },

    // ===================== Q-SCORE SPECIFIC =====================
    {
        id: "QSCORE_DEFINITION",
        questions: [
            "what is q-score",
            "what is qscore",
            "what is q score",
            "explain q-score",
            "explain qscore",
            "tell me about q-score",
            "tell me about qscore",
            "what does q-score mean",
            "what is the q-score",
            "define q-score",
            "describe q-score",
            "what is my q-score",
            "learn about q-score",
            "q-score",
            "qscore",
            "q score",
            "about q-score",
            "about qscore",
            "the q-score",
            "the score",
            "your score",
            "my score",
            "about the score"
        ],
        keywords: ["q-score", "qscore", "q score", "score"],
        answer: "Q-Score™ is your single, verified readiness metric – an AI-driven composite score that quantifies your overall skills, experience, and potential out of 100. It combines 25+ attributes (like Intelligence (IQ), Emotion (EQ), Adaptability (AQ), Creativity, Leadership, Analysis, Focus, Decision-Making, Aptitude, Confidence, and more) into one cumulative score, plus highlights your top 4 strongest skills. This is your Proof-of-Skill – empowering, isn't it?"
    },
    {
        id: "QSCORE_CALCULATION",
        questions: [
            "how is q-score calculated",
            "how is qscore calculated",
            "how do you calculate q-score",
            "how does q-score work",
            "q-score calculation",
            "qscore formula",
            "how is my score calculated",
            "what formula is used",
            "how is it measured",
            "how is the score generated"
        ],
        keywords: ["calculate", "calculation", "formula", "how", "work", "measured"],
        answer: "It's an AI-driven quantified weighted average of all your possible skills and attributes, based on verified credentials. For example: If your IQ is 80, EQ 60, AQ 40, and others vary, the AI weights them to create one cumulative Q-Score™ (e.g., 72/100), which evolves in real-time as you grow. Your profile shows the overall score prominently, along with your top 4 skills for instant insights. Keep upskilling – watch your score soar!"
    },
    {
        id: "QSCORE_ATTRIBUTES",
        questions: [
            "what attributes does q-score measure",
            "what does q-score measure",
            "what skills are included",
            "what are the 25 attributes",
            "25 attributes",
            "what dimensions are measured",
            "what signals are used",
            "list of attributes",
            "what does it track"
        ],
        keywords: ["attribute", "measure", "skill", "dimension", "signal", "25"],
        answer: "Over 25+ signals across key dimensions, including Intelligence (IQ), Emotion (EQ), Adaptability (AQ), Creativity, Leadership, Analysis, Focus, Decision, Aptitude, Confidence, and many more. It's holistic and designed to capture your full potential – you're more capable than you know!"
    },
    {
        id: "QSCORE_DYNAMIC",
        questions: [
            "does q-score change",
            "does qscore change",
            "is q-score dynamic",
            "is qscore dynamic",
            "does my score update",
            "can my score improve",
            "how to increase q-score",
            "how to improve q-score",
            "does it evolve",
            "is it real-time",
            "will my score change"
        ],
        keywords: ["change", "dynamic", "update", "improve", "increase", "evolve", "real-time"],
        answer: "Yes! It's living and evolves in real-time as you upskill and add verified achievements. Every step you take boosts your score – this is growth in action!"
    },
    {
        id: "QSCORE_SECURE",
        questions: [
            "is q-score verifiable",
            "is qscore verifiable",
            "is q-score secure",
            "can q-score be faked",
            "is q-score tamper-proof",
            "how is q-score verified",
            "q-score verification",
            "is the score authentic",
            "how do employers trust q-score"
        ],
        keywords: ["verifiable", "secure", "fake", "tamper", "verify", "trust", "authentic"],
        answer: "Absolutely! Blockchain ensures tamper-proof verification, and you control who sees your data. We're GDPR compliant with 256-bit encryption. Your trust is everything to us!"
    },

    // ===================== FEATURES & TECHNOLOGY =====================
    {
        id: "QR_KEY",
        questions: [
            "what is the qr key",
            "what is qr key",
            "tell me about qr key",
            "what is lifetime qr",
            "lifetime qr key",
            "what is my qr code",
            "permanent qr",
            "what is the qr code for",
            "how does qr key work"
        ],
        keywords: ["qr", "key", "code", "lifetime", "permanent"],
        answer: "Your unique, permanent QR code – one lifetime QR Key that links forever to your evolving profile and Q-Score™. It's unified across platforms – simple, powerful, and yours for life!"
    },
    {
        id: "TECHNOLOGY",
        questions: [
            "what technology powers growqr",
            "what tech is used",
            "how does growqr work technically",
            "tell me about the technology",
            "blockchain",
            "ai technology",
            "what powers growqr",
            "adaptive intelligence",
            "how is it built"
        ],
        keywords: ["technology", "tech", "blockchain", "ai", "power", "built"],
        answer: "Powered by Adaptive Intelligence:\n• Unified QR: One identity everywhere\n• Q-Score™: Real-time skill quantification\n• Personalized AI: Your growth assistants\n• Blockchain: Tamper-proof verification\n• Quantum Intel: Next-gen computing\n• Human Intel: Authentic validation\nThis tech is built to scale and empower you!"
    },
    {
        id: "AI_COACHING",
        questions: [
            "is there ai coaching",
            "what are ai agents",
            "tell me about ai coaching",
            "personalized coaching",
            "ai buddy",
            "ai assistant",
            "ai mentor",
            "do you have coaching",
            "personalised agents",
            "personal growth partner"
        ],
        keywords: ["ai", "coaching", "agent", "buddy", "mentor", "assistant", "personalized"],
        answer: "Yes! Get your own Personalised AI Agents – like a buddy helping you upskill, boost your profile, and unlock pathways. Your personal growth partner is waiting!"
    },
    {
        id: "REWARDS",
        questions: [
            "are there rewards",
            "what rewards are there",
            "crypto rewards",
            "earning rewards",
            "incentives",
            "do i get rewarded",
            "how do i earn",
            "what can i earn",
            "gamification"
        ],
        keywords: ["reward", "crypto", "earn", "incentive"],
        answer: "Absolutely – including crypto rewards for upskilling! Grow your skills and get rewarded – motivation at its best!"
    },
    {
        id: "DATA_SECURITY",
        questions: [
            "is my data secure",
            "is my data safe",
            "how secure is growqr",
            "privacy policy",
            "gdpr compliant",
            "data protection",
            "is my information safe",
            "how do you protect my data",
            "encryption",
            "who sees my data"
        ],
        keywords: ["data", "secure", "safe", "privacy", "gdpr", "protect", "encryption"],
        answer: "Yes! 256-bit encryption, GDPR compliant, and you have full control over your information. We're committed to your privacy and security."
    },

    // ===================== AUDIENCE-SPECIFIC BENEFITS =====================
    {
        id: "BENEFITS_INDIVIDUAL",
        questions: [
            "benefits for individuals",
            "benefits for me",
            "my benefits",
            "individual benefits",
            "personal benefits",
            "user benefits",
            "what do i get",
            "what will i get",
            "what i get",
            "how does it help me",
            "how can it help me",
            "what's in it for me",
            "why should i use growqr",
            "individual advantages",
            "for your growth",
            "for my growth",
            "why use growqr",
            "advantages for me"
        ],
        keywords: ["individual", "me", "personal", "benefit", "help", "get", "user", "myself"],
        answer: "For YOUR GROWTH:\n• Instant Self-Discovery: See your personalised readiness in seconds.\n• Verified Matchmaking: Connect with opportunities that match your potential.\n• Personalised AI Agents: Your AI buddy helps you upskill and boost your profile.\n• Infinite Pathways: Unlock tailored opportunities fueling growth.\nThis is all about YOU thriving – let's get started!"
    },
    {
        id: "BENEFITS_ENTERPRISE",
        questions: [
            "benefits for enterprises",
            "benefits for companies",
            "benefits for employers",
            "benefits for business",
            "employee benefits",
            "employer benefits",
            "company benefits",
            "business benefits",
            "corporate benefits",
            "enterprise benefits",
            "organization benefits",
            "organisation benefits",
            "hr benefits",
            "hiring benefits",
            "team benefits",
            "workforce benefits",
            "how does it help companies",
            "how does it help employers",
            "for organizations",
            "for organisations",
            "for businesses",
            "for recruiting",
            "for employees",
            "for employers",
            "for companies",
            "for hr"
        ],
        keywords: ["enterprise", "company", "employer", "employee", "business", "organization", "organisation", "corporate", "hr", "hiring", "team", "recruit", "workforce"],
        answer: "To UNLOCK CAPABILITIES:\n• Instant Evaluation: Holistic view of internal skill sets and culture.\n• Smart Hiring: Autonomous hiring of relevant, verified profiles.\n• Social Branding: Uplift perception with purposeful teams.\n• Maximize Growth: Unlock infinite growth with AI-powered profiles.\nBuild stronger teams and a brighter future!"
    },
    {
        id: "BENEFITS_INSTITUTION",
        questions: [
            "benefits for institutions",
            "benefits for universities",
            "benefits for colleges",
            "benefits for schools",
            "benefits for educators",
            "institution benefits",
            "university benefits",
            "college benefits",
            "school benefits",
            "student benefits",
            "educator benefits",
            "teacher benefits",
            "faculty benefits",
            "academic benefits",
            "education benefits",
            "placement benefits",
            "how does it help universities",
            "how does it help schools",
            "how does it help students",
            "for students",
            "for universities",
            "for colleges",
            "for schools",
            "for education",
            "for educators",
            "for teachers"
        ],
        keywords: ["institution", "university", "college", "school", "student", "educator", "teacher", "education", "academic", "faculty", "placement"],
        answer: "To EMPOWER STUDENTS:\n• Industry Preparedness: Curricula aligned with real-world demands.\n• Personalized Development: AI-tailored pathways for relevant journeys.\n• Ranking Elevation: Boost reputation through superior placements.\n• Faculty Enhancement: Boost educator performance.\nPrepare the next generation for success!"
    },
    {
        id: "BENEFITS_SMARTCITY",
        questions: [
            "benefits for smart cities",
            "benefits for governments",
            "benefits for cities",
            "smart city benefits",
            "city benefits",
            "government benefits",
            "civic benefits",
            "municipal benefits",
            "citizen benefits",
            "public sector benefits",
            "governance benefits",
            "how does it help governments",
            "how does it help cities",
            "for governance",
            "for citizens",
            "for cities",
            "for governments",
            "for public sector"
        ],
        keywords: ["city", "cities", "government", "governance", "civic", "municipal", "citizen", "public", "smart"],
        answer: "For INTELLIGENT GOVERNANCE:\n• Human Readiness Score: Assessment of citizen capabilities.\n• Population Assessment: Categorize urban demographics.\n• Targeted Investments: Deploy need-based strategic industries.\n• Progress Monitoring: Track advancements across city scales.\nCreate smarter, more capable communities!"
    },
    {
        id: "WHO_CAN_USE",
        questions: [
            "who can use growqr",
            "who is growqr for",
            "target audience",
            "who is this for",
            "for whom is growqr",
            "can anyone use growqr",
            "is it for everyone"
        ],
        keywords: ["who", "everyone", "target", "audience"],
        answer: "Everyone! Individuals chasing dreams, enterprises building teams, institutions empowering students, and smart cities driving progress. Wherever you are, GrowQR helps you grow!"
    },

    // ===================== WAITLIST & ACCESS =====================
    {
        id: "WAITLIST",
        questions: [
            "how do i join the waitlist",
            "how to join waitlist",
            "where to sign up",
            "waitlist",
            "join waitlist",
            "signup for waitlist",
            "early access",
            "get early access",
            "be first in line"
        ],
        keywords: ["waitlist", "wait list", "early", "access"],
        answer: "Head to growqr.ai and sign up now! Be first in line for your lifetime QR Key in private beta (Q1–Q2 2026). This is your moment – join and let's grow together!"
    },

    // ===================== MISCELLANEOUS =====================
    {
        id: "PRICING",
        questions: [
            "is growqr free",
            "what is the pricing",
            "how much does it cost",
            "what are the fees",
            "subscription cost",
            "pricing plans",
            "cost of growqr",
            "do i have to pay"
        ],
        keywords: ["free", "price", "pricing", "cost", "fee", "pay", "subscription"],
        answer: "Details will come closer to launch – join the waitlist for updates! We're focused on making growth accessible and rewarding."
    },
    {
        id: "SUPPORT",
        questions: [
            "i have another question",
            "something else",
            "talk to someone",
            "speak to someone",
            "contact support",
            "email support",
            "human support",
            "can we talk",
            "i want to talk further",
            "connect with team",
            "more questions",
            "other question",
            "i need help"
        ],
        keywords: ["support", "contact", "email", "talk", "speak", "human", "help", "connect"],
        answer: "I'd love to help! If you'd like to connect further, discuss something specific, or have a detailed question, please feel free to email our team at support@growqr.ai – they'll be excited to assist you on your growth journey!"
    }
];

// ===================== SPECIAL RESPONSES =====================
const SPECIAL_RESPONSES = {
    GREETING: "Hi there! 👋 Welcome to GrowQR – the world's first AI-powered Skill Identity platform! I'm here to help you discover everything about Q-Score™ and your skill potential. What would you like to know?",
    THANKS: "You're welcome! 🎉 I'm thrilled to help. If you have more questions about GrowQR or Q-Score™, just ask. Your growth journey is just beginning!",
    FALLBACK: "Great question! I'm here to help you discover everything about GrowQR and your skill potential. If you'd like to connect further or discuss something specific, feel free to email us at support@growqr.ai – we'd love to hear from you!"
};

// ============================================================================
// TEXT NORMALIZATION - Prepare text for matching
// ============================================================================
const normalizeText = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/['']/g, "'")    // Normalize quotes
        .replace(/[""]/g, '"')    // Normalize double quotes
        .replace(/[^\w\s'-]/g, ' ') // Remove special chars except hyphen and apostrophe
        .replace(/\s+/g, ' ')     // Normalize whitespace
        .trim();
};

// ============================================================================
// WORD SIMILARITY - Check if two words are similar
// ============================================================================
const wordSimilarity = (word1: string, word2: string): number => {
    if (word1 === word2) return 1;
    if (word1.includes(word2) || word2.includes(word1)) return 0.9;

    // Simple Levenshtein-like check for typos
    if (Math.abs(word1.length - word2.length) <= 2) {
        let matches = 0;
        const shorter = word1.length < word2.length ? word1 : word2;
        const longer = word1.length < word2.length ? word2 : word1;

        for (let i = 0; i < shorter.length; i++) {
            if (longer.includes(shorter[i])) matches++;
        }

        const similarity = matches / longer.length;
        if (similarity >= 0.7) return similarity * 0.7;
    }

    return 0;
};

// ============================================================================
// CALCULATE MATCH SCORE - Score how well a user message matches a QA pair
// ============================================================================
const calculateMatchScore = (userMessage: string, qa: QAPair): number => {
    const normalizedMessage = normalizeText(userMessage);
    const messageWords = normalizedMessage.split(' ').filter(w => w.length > 1);

    let totalScore = 0;
    let maxQuestionScore = 0;

    // 1. Check against question patterns (high weight - 50%)
    for (const question of qa.questions) {
        const normalizedQuestion = normalizeText(question);

        // Exact match - perfect score
        if (normalizedMessage === normalizedQuestion) {
            return 100;
        }

        // Message contains the entire question pattern
        if (normalizedMessage.includes(normalizedQuestion)) {
            maxQuestionScore = Math.max(maxQuestionScore, 90);
            continue;
        }

        // Question pattern contains the entire message (short query matches longer pattern)
        if (normalizedQuestion.includes(normalizedMessage) && normalizedMessage.length >= 3) {
            // Give higher score for longer matches
            const matchRatio = normalizedMessage.length / normalizedQuestion.length;
            const score = 70 + (matchRatio * 25); // 70-95 depending on how much matched
            maxQuestionScore = Math.max(maxQuestionScore, score);
            continue;
        }

        // Word overlap scoring for partial matches
        const questionWords = normalizedQuestion.split(' ').filter(w => w.length > 1);
        let matchedMsgWords = 0;
        let matchedQWords = 0;

        for (const msgWord of messageWords) {
            for (const qWord of questionWords) {
                const similarity = wordSimilarity(msgWord, qWord);
                if (similarity > 0.7) {
                    matchedMsgWords++;
                    break;
                }
            }
        }

        for (const qWord of questionWords) {
            for (const msgWord of messageWords) {
                const similarity = wordSimilarity(msgWord, qWord);
                if (similarity > 0.7) {
                    matchedQWords++;
                    break;
                }
            }
        }

        if (matchedMsgWords > 0) {
            // If ALL user words matched, that's a strong signal
            const userWordCoverage = matchedMsgWords / messageWords.length;
            const questionWordCoverage = matchedQWords / questionWords.length;

            // Bonus for matching all user words (important for short queries)
            let score = 0;
            if (userWordCoverage === 1) {
                score = 50 + (questionWordCoverage * 40); // 50-90 if all user words match
            } else {
                score = (userWordCoverage * 0.6 + questionWordCoverage * 0.4) * 60;
            }

            maxQuestionScore = Math.max(maxQuestionScore, score);
        }
    }

    totalScore += maxQuestionScore * 0.5; // 50% weight for question patterns

    // 2. Check against keywords (high weight - 50%)
    let keywordMatches = 0;
    let strongKeywordMatch = false;

    for (const keyword of qa.keywords) {
        const normalizedKeyword = normalizeText(keyword);

        // Exact keyword match in message
        if (normalizedMessage.includes(normalizedKeyword)) {
            keywordMatches++;
            // Check if it's a "strong" match (keyword is substantial part of message)
            if (normalizedKeyword.length >= normalizedMessage.length * 0.3) {
                strongKeywordMatch = true;
            }
        } else {
            // Word-by-word check
            for (const msgWord of messageWords) {
                const similarity = wordSimilarity(msgWord, normalizedKeyword);
                if (similarity > 0.8) {
                    keywordMatches++;
                    if (normalizedKeyword.length >= 4) strongKeywordMatch = true;
                    break;
                }
            }
        }
    }

    if (qa.keywords.length > 0 && keywordMatches > 0) {
        const keywordCoverage = keywordMatches / qa.keywords.length;
        let keywordScore = keywordCoverage * 50; // Base score up to 50

        // Bonus if strong keyword match
        if (strongKeywordMatch) {
            keywordScore += 20;
        }

        // Bonus if multiple keywords matched
        if (keywordMatches >= 2) {
            keywordScore += 15;
        }

        totalScore += keywordScore * 0.5; // 50% weight for keywords
    }

    return totalScore;
};

// ============================================================================
// FIND BEST ANSWER - Match user message to knowledge base
// ============================================================================
const findBestAnswer = (userMessage: string): { answer: string; confidence: number } | null => {
    const normalizedMessage = normalizeText(userMessage);

    // Handle greetings first
    const greetingPatterns = /^(hi+|hello|hey|good\s?(morning|evening|afternoon|day)|howdy|hola|sup)(\s|!|$)/i;
    if (greetingPatterns.test(normalizedMessage) || normalizedMessage.length < 4) {
        if (greetingPatterns.test(normalizedMessage)) {
            return { answer: SPECIAL_RESPONSES.GREETING, confidence: 100 };
        }
    }

    // Handle thanks - use word boundaries to prevent matching "ty" inside words like "faculty"
    const thanksPatterns = /\b(thank|thanks|thx|ty|appreciate|grateful)\b/i;
    if (thanksPatterns.test(normalizedMessage)) {
        return { answer: SPECIAL_RESPONSES.THANKS, confidence: 100 };
    }

    // Calculate scores for all QA pairs
    const scores: { qa: QAPair; score: number }[] = [];

    for (const qa of KNOWLEDGE_BASE) {
        const score = calculateMatchScore(userMessage, qa);
        if (score > 0) {
            scores.push({ qa, score });
        }
    }

    // Sort by score descending
    scores.sort((a, b) => b.score - a.score);

    // Debug logging
    if (scores.length > 0) {
        console.log(`[Chatbot] Top matches for "${userMessage}":`);
        scores.slice(0, 3).forEach((s, i) => {
            console.log(`  ${i + 1}. ${s.qa.id}: ${s.score.toFixed(1)}`);
        });
    }

    // Return best match if confidence is high enough
    const CONFIDENCE_THRESHOLD = 20; // Minimum score to return an answer (lowered for short queries)

    if (scores.length > 0 && scores[0].score >= CONFIDENCE_THRESHOLD) {
        return { answer: scores[0].qa.answer, confidence: scores[0].score };
    }

    return null;
};

// ============================================================================
// SYSTEM PROMPT - For AI fallback (truly unknown questions)
// ============================================================================
const SYSTEM_PROMPT = `You are GrowQR Assistant. Your role is to answer questions about GrowQR ONLY using the approved information below. 

# CORE FACTS
- GrowQR is the world's first AI-powered Skill Identity & Readiness platform
- One lifetime QR Key links you forever to your dynamic Q-Score™
- Q-Score™ is a verified readiness metric out of 100, combining 25+ attributes
- Private beta launches Q1–Q2 2026
- Join waitlist at growqr.ai
- Support email: support@growqr.ai

# AUDIENCE BENEFITS

For Individuals:
- Instant Self-Discovery
- Verified Matchmaking  
- Personalised AI Agents
- Infinite Pathways

For Enterprises:
- Instant Evaluation
- Smart Hiring
- Social Branding
- Maximize Growth

For Institutions:
- Industry Preparedness
- Personalized Development
- Ranking Elevation
- Faculty Enhancement

For Smart Cities:
- Human Readiness Score
- Population Assessment
- Targeted Investments
- Progress Monitoring

# RULES
1. Use ONLY the information above - never make up features
2. Be enthusiastic and encouraging
3. Keep responses concise (2-6 sentences)
4. For pricing: say "Details will come closer to launch"
5. For complex questions: suggest emailing support@growqr.ai
6. Always end with encouragement or call-to-action`;

// Store chat session
let chatSession: any = null;

export const resetChatHistory = () => {
    chatSession = null;
};

// ============================================================================
// RATE LIMITING & RETRY LOGIC
// ============================================================================
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL_MS = 500;

// ============================================================================
// MAIN FUNCTION - Generate Response
// ============================================================================
export const generateGeminiResponse = async (userMessage: string): Promise<string> => {

    // STEP 1: Try to find answer in knowledge base
    const match = findBestAnswer(userMessage);

    if (match && match.confidence >= 25) {
        console.log(`[Chatbot] Using knowledge base (confidence: ${match.confidence.toFixed(1)})`);
        return match.answer;
    }

    // STEP 2: No API key → fallback
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        console.log('[Chatbot] No API key, using fallback');
        return SPECIAL_RESPONSES.FALLBACK;
    }

    // STEP 3: Throttle requests
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    if (timeSinceLastRequest < MIN_REQUEST_INTERVAL_MS) {
        await delay(MIN_REQUEST_INTERVAL_MS - timeSinceLastRequest);
    }
    lastRequestTime = Date.now();

    // STEP 4: Use AI for truly unknown questions
    console.log('[Chatbot] Using Gemini AI for response');

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            if (!chatSession) {
                chatSession = model.startChat({
                    history: [
                        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
                        { role: "model", parts: [{ text: "Understood! I'll answer questions about GrowQR using only approved information, with enthusiasm and encouragement." }] },
                    ],
                    generationConfig: {
                        maxOutputTokens: 500,
                        temperature: 0.2, // Low for consistency
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
                const waitTime = BASE_DELAY_MS * Math.pow(2, attempt);
                console.warn(`⚠️ Rate limit hit (attempt ${attempt + 1}/${MAX_RETRIES}). Retrying in ${waitTime}ms...`);
                chatSession = null;
                await delay(waitTime);
                continue;
            }

            if (isRateLimitError) {
                console.warn('⚠️ Gemini API rate limit reached after all retries.');
            } else {
                console.error('❌ Gemini Error:', error?.message || error);
            }

            chatSession = null;
            return SPECIAL_RESPONSES.FALLBACK;
        }
    }

    return SPECIAL_RESPONSES.FALLBACK;
};
