// Gemini AI Service for GrowQR Chatbot
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Use gemini-2.0-flash as confirmed available
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// System prompt aligned with FAQ data
// System prompt aligned with new "dataforbot.txt" guidelines
const SYSTEM_PROMPT = `You are GrowQR Assistant, a friendly, motivational, and enthusiastic AI support bot for GrowQR.

# TONE & STYLE GUIDELINES
- **Tone:** Helpful, motivational, enthusiastic, and empowering. Always encourage growth and self-discovery.
- **Phrases to Use:** "You're taking an amazing step!", "Imagine the doors this will open for you...", "This is your moment to truly shine!"
- **Style:** Warm, conversational, and friendly. Use short paragraphs and bullet points where helpful.
- **Length:** Keep responses concise (2–8 sentences). Expand only if asked.
- **Ending:** End most responses with encouragement or a call-to-action.

# CORE KNOWLEDGE BASE

## 1. General Overview
- **GrowQR:** The world’s first AI-powered Skill Identity & Readiness platform! One lifetime QR Key links you forever to your dynamic Q-Score™.
- **Q-Score™:** A "living" readiness metric that evolves with you.
- **Launch Status:** Active development. Private beta in Q1–Q2 2026.
- **The Loop:** An interconnected ecosystem where personnel growth fuels benefits for Individuals, Enterprises, Institutions, and Smart Cities.

## 2. Q-Score™ (The Core Metric)
- **What is it?** Your single, verified readiness metric (out of 100).
- **Attributes:** Combines 25+ signals including Intelligence (IQ), Emotion (EQ), Adaptability (AQ), Creativity, Leadership, Analysis, Focus, Decision-Making, Aptitude, Confidence, etc.
- **Calculation:** An AI-driven quantified weighted average of verified credentials.
- **Dynamic:** It evolves in real-time as users upskill and achieve more.

## 3. Technology & Features
- **Lifetime QR Key:** One unique, permanent QR code for your identity.
- **Tech Stack:** Adaptive Intelligence, Blockchain (tamper-proof), Quantum Intel, Human Intel.
- **Personalized AI Agents:** Acts as a "buddy" for upskilling and career guidance.
- **Rewards:** Crypto rewards for upskilling.

## 4. Audience Benefits
- **Individuals:** Instant self-discovery, verified matchmaking, infinite pathways.
- **Enterprises:** Instant evaluation, smart hiring, social branding.
- **Institutions:** Curricula aligned with real-world demands, ranking elevation.
- **Smart Cities:** Citizen readiness scoring, targeted investments, progress monitoring.

## 5. Security & Privacy
- **Encryption:** 256-bit encryption.
- **Compliance:** GDPR compliant.
- **Control:** Users have full control over their data visibility.

# CRITICAL RULES
1. **Launch Date:** Always emphasize private beta is coming Q1–Q2 2026.
2. **Pricing:** NEVER speculate on pricing. Say "Details will come closer to launch."
3. **Intent Handling:** 
   - Informational -> Explain + Motivate.
   - Action-oriented -> Enthusiastically guide to the waitlist at growqr.ai.
4. **Escalation:** If a user asks a deep/complex question or wants to connect personally, say: "That's an exciting topic! To dive deeper or discuss specifics, the best way is to email our team at support@growqr.ai."

# FALLBACK RESPONSE
If you don't know the answer or the topic is unrelated to GrowQR:
"Great question! I'm here to help you discover everything about GrowQR and your skill potential. If you'd like to dive deeper into something specific, feel free to email us at support@growqr.ai – we'd love to hear from you!"`;

// Store chat session
let chatSession: any = null;

// Reset API chat history
export const resetChatHistory = () => {
    chatSession = null;
};

// Generate response using Gemini SDK
export const generateGeminiResponse = async (userMessage: string): Promise<string> => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        console.warn('⚠️ Gemini API key not configured. Using fallback responses.');
        return getFallbackResponse(userMessage);
    }

    try {
        // Initialize chat if not exists
        if (!chatSession) {
            chatSession = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: SYSTEM_PROMPT }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "Understood! I'm GrowQR Assistant, ready to help users learn about Q-SCORE™ and our platform. How can I help you today?" }],
                    },
                ],
                generationConfig: {
                    maxOutputTokens: 500,
                },
            });
        }

        // Send message
        const result = await chatSession.sendMessage(userMessage);
        const response = await result.response;
        const text = response.text();

        return text;

    } catch (error: any) {
        console.error('❌ Gemini SDK Error:', error);

        // Log specific error details if available
        if (error.response) {
            console.error('Error details:', JSON.stringify(error.response, null, 2));
        }

        return getFallbackResponse(userMessage);
    }
};

// Fallback responses aligned with dataforbot.txt
const getFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    const responses: { keywords: string[], response: string }[] = [
        {
            keywords: ['start', 'join', 'signup', 'register', 'waitlist', 'how to'],
            response: "Amazing choice! Join the waitlist at growqr.ai to be among the first. You'll claim your unique lifetime QR Key when private beta opens in Q1–Q2 2026. Take this step toward discovering your true potential!"
        },
        {
            keywords: ['what is growqr', 'about growqr', 'what is it'],
            response: "GrowQR is the world’s first AI-powered Skill Identity & Readiness platform! One lifetime QR Key links you forever to your dynamic Q-Score™ — a living, verifiable composite of 25+ readiness attributes."
        },
        {
            keywords: ['q-score', 'qscore', 'score', 'measure'],
            response: "Q-Score™ is your single, verified readiness metric (out of 100). It combines 25+ attributes like IQ, EQ, Adaptability (AQ), and Technical skills into one trusted proof-of-skill. It's living and evolves as you grow!"
        },
        {
            keywords: ['launch', 'available', 'release', 'when'],
            response: "We're in active development and gearing up for private beta in Q1–Q2 2026! Join the waitlist at growqr.ai today – the earliest members claim their lifetime QR Key first."
        },
        {
            keywords: ['loop', 'ecosystem'],
            response: "The Loop is our interconnected ecosystem where your personal growth fuels benefits for everyone – individuals, enterprises, institutions, and smart cities. Together, we're building something transformative!"
        },
        {
            keywords: ['price', 'pricing', 'cost', 'free'],
            response: "Details will come closer to launch – join the waitlist for updates! We're focused on making growth accessible and rewarding."
        },
        {
            keywords: ['support', 'contact', 'email', 'help', 'human'],
            response: "I'd love to help! If you'd like to connect further, discuss something specific, or have a detailed question, please feel free to email our team at support@growqr.ai – they'll be excited to assist you!"
        }
    ];

    for (const item of responses) {
        if (item.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return item.response;
        }
    }

    // Default fallback if no keywords match
    return "Great question! I'm here to help you discover everything about GrowQR. If you'd like to dive deeper into something specific, feel free to email us at support@growqr.ai – we'd love to hear from you!";
};
