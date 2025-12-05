// Gemini AI Service for GrowQR Chatbot
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Use gemini-2.0-flash as confirmed available
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// System prompt remains the same...
const SYSTEM_PROMPT = `You are GrowQR Assistant, a friendly and professional AI support bot for GrowQR - a revolutionary platform that provides verified skill identity through Q-Score.

## About GrowQR:
- GrowQR is an AI-driven proof-of-skill platform that creates a unified digital identity
- It serves individuals, enterprises, educational institutions, and smart cities
- Every user gets a unique QR code that contains their verified professional profile

## About Q-Score:
- Q-Score is the core innovation - a real-time readiness metric calculated using AI
- It analyzes 25+ human dimensions including skills, credentials, experience, and achievements
- Q-Score updates dynamically as users add more verified credentials
- It's like a credit score but for professional readiness

## Key Features:
1. **Unified QR** - One QR code containing your entire verified identity
2. **AI-Powered Analysis** - Advanced AI calculates your Q-Score across 25+ dimensions
3. **Blockchain Verification** - All credentials are tamper-proof and verifiable
4. **Real-time Updates** - Your Q-Score updates as you grow
5. **Universal Access** - Works globally across platforms

## IMPORTANT - Pricing:
- Pricing is NOT finalized yet
- If asked about pricing, cost, or plans, say: "Our pricing is being finalized. Please join our waitlist or email hello@growqr.ai to be notified when we launch and get early access benefits!"
- Do NOT mention any specific prices or plans

## Security:
- 256-bit encryption for all data
- GDPR compliant
- Full user control over profile visibility
- Blockchain-secured credentials

## TROUBLESHOOTING GUIDE (Use these when users report issues):

### Sign-in / Login Issues:
1. Clear browser cache and cookies
2. Try a different browser (Chrome, Firefox, Safari)
3. Check if caps lock is on
4. Use "Forgot Password" to reset credentials
5. Disable browser extensions temporarily
6. If issue persists, email hello@growqr.ai with details

### QR Code Issues:
1. Ensure good lighting when scanning
2. Clean camera lens
3. Try zooming in/out slightly
4. Ensure QR code is not damaged or blurry
5. Try a different QR scanner app

### Account Issues:
1. Check email for verification link (check spam folder)
2. Ensure email is correct
3. Try logging out and back in
4. Clear app cache if using mobile

### General Technical Issues:
1. Refresh the page
2. Check internet connection
3. Try incognito/private browsing mode
4. Update your browser to latest version
5. If nothing works, email hello@growqr.ai with:
   - Device type (phone/computer)
   - Browser name and version
   - Screenshot of the error (if any)
   - Steps to reproduce the issue

## Your Role:
- Be helpful, concise, and friendly
- Use emojis sparingly to keep conversations warm 😊
- When users report issues, provide step-by-step troubleshooting
- Always offer to escalate to email support if basic steps don't help
- Keep responses clear and actionable
- If asked about things outside GrowQR, politely redirect to GrowQR topics
- NEVER discuss or speculate about pricing - redirect to waitlist/email

## Response Style:
- Be conversational but professional
- For issues: provide numbered steps that are easy to follow
- Acknowledge the user's problem with empathy
- Provide accurate information about GrowQR
- If unsure, say so and suggest contacting support
- End troubleshooting responses with "Let me know if that helps!" or offer email support`;

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
                        parts: [{ text: "Understood! I'm GrowQR Assistant, ready to help users learn about Q-Score and our platform. How can I help you today?" }],
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

// Fallback responses when API is not available
const getFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    const responses: { keywords: string[], response: string }[] = [
        {
            keywords: ['sign in', 'signin', 'login', 'log in', 'cant login', "can't login", 'unable to login'],
            response: "Sorry to hear you're having sign-in issues! 😟 Try these steps:\n\n1. Clear your browser cache & cookies\n2. Check if caps lock is on\n3. Try 'Forgot Password' to reset\n4. Use a different browser\n5. Disable browser extensions\n\nStill stuck? Email hello@growqr.ai with your device info and we'll help! 🛠️"
        },
        {
            keywords: ['issue', 'problem', 'error', 'bug', 'not working', "doesn't work", 'broken', 'stuck', 'failed'],
            response: "I'm sorry you're experiencing issues! 😟 Let's troubleshoot:\n\n1. Refresh the page\n2. Try incognito/private browsing\n3. Clear browser cache\n4. Check your internet connection\n5. Update your browser\n\nIf the problem continues, please email hello@growqr.ai with:\n- What you were trying to do\n- Any error message you see\n- Your device & browser info"
        },
        {
            keywords: ['account', 'profile', 'settings', 'update', 'change'],
            response: "For account-related help:\n\n1. Check your email for any verification links (check spam too!)\n2. Make sure you're logged in\n3. Try logging out and back in\n4. Clear your browser cache\n\nNeed more help? Email hello@growqr.ai with your account email! 📧"
        },
        {
            keywords: ['qr', 'scan', 'scanning', 'camera'],
            response: "Having trouble with QR scanning? Try these:\n\n1. Ensure good lighting ☀️\n2. Clean your camera lens\n3. Hold steady and not too close\n4. Make sure the QR code isn't damaged\n5. Try a different QR scanner app\n\nLet me know if that helps!"
        },
        {
            keywords: ['password', 'forgot', 'reset', 'recover'],
            response: "To reset your password:\n\n1. Click 'Forgot Password' on the login page\n2. Enter your registered email\n3. Check your inbox (and spam folder!)\n4. Click the reset link within 24 hours\n5. Create a strong new password\n\nDon't see the email? Contact hello@growqr.ai 📧"
        },
        {
            keywords: ['price', 'pricing', 'cost', 'pay', 'free', 'plan', 'subscription'],
            response: "Our pricing is being finalized! 🚀 Join our waitlist or email hello@growqr.ai to be notified when we launch and get early access benefits!"
        },
        {
            keywords: ['q-score', 'qscore', 'score', 'calculate'],
            response: "Q-Score is your verified readiness metric, calculated using AI across 25+ dimensions. It updates in real-time as you grow! Ready to get yours?"
        },
        {
            keywords: ['verify', 'verification', 'credential', 'certificate'],
            response: "We verify credentials through partnerships with universities and employers, all secured on blockchain. Tamper-proof and trustworthy! 🔐"
        },
        {
            keywords: ['secure', 'security', 'privacy', 'data', 'safe'],
            response: "Your data is protected with 256-bit encryption. We're GDPR compliant and you control your profile visibility. Your security is our priority! 🔒"
        },
        {
            keywords: ['contact', 'email', 'support', 'help', 'human', 'talk', 'call'],
            response: "You can reach our support team at hello@growqr.ai - we typically respond within 24 hours! 📧 For urgent issues, mention 'URGENT' in the subject line."
        },
        {
            keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening'],
            response: "Hello! 👋 I'm here to help you with GrowQR and Q-Score. Whether you have questions or need to troubleshoot an issue, I'm here to assist!"
        },
        {
            keywords: ['thank', 'thanks', 'awesome', 'great', 'works', 'solved', 'fixed'],
            response: "You're welcome! 😊 Glad I could help! Is there anything else you need assistance with?"
        },
    ];

    for (const item of responses) {
        if (item.keywords.some(keyword => lowerMessage.includes(keyword))) {
            return item.response;
        }
    }

    return "I'd be happy to help! 🙂 You can ask me about:\n• Q-Score and how it works\n• Troubleshooting login or account issues\n• Security and privacy\n• Getting started with GrowQR\n\nOr email hello@growqr.ai for detailed support!";
};
