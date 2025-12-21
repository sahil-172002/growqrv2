import React, { useState, useRef, useEffect } from 'react';
import { Headphones, X, Send, Bot, User, Minus, HelpCircle, Zap, Shield, Users, MessageSquare, ChevronRight, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { generateGeminiResponse, resetChatHistory } from '../lib/gemini';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

// FAQ Data with icons
const FAQ_ITEMS = [
    {
        id: 1,
        icon: HelpCircle,
        question: "What is Q-SCORE™?",
        answer: "Q-SCORE™ is your verified readiness metric that showcases your skills, experience, and potential to employers. It's calculated using AI-driven analysis of your verified credentials."
    },
    {
        id: 2,
        icon: Zap,
        question: "How do I get started?",
        answer: "Getting started is easy! Simply click 'Get My Q-SCORE™' to begin your verification journey. You'll be guided through a quick onboarding process."
    },
    {
        id: 3,
        icon: Shield,
        question: "Is my data secure?",
        answer: "Absolutely! We use 256-bit encryption and are GDPR compliant. You have full control over who sees your Q-SCORE™ and profile information."
    },
    {
        id: 4,
        icon: Users,
        question: "Who uses GrowQR?",
        answer: "GrowQR is used by individuals seeking opportunities, educational institutions, employers, and organizations looking for verified talent."
    },
];

// Chat category options
const CHAT_CATEGORIES = [
    { id: 1, icon: HelpCircle, label: "Learn about Q-SCORE™" },
    { id: 2, icon: Users, label: "For Organizations" },
    { id: 3, icon: Zap, label: "Getting Started" },
    { id: 4, icon: Shield, label: "Privacy & Security" },
    { id: 5, icon: MessageSquare, label: "Other Questions" },
];

type ViewState = 'closed' | 'faq' | 'chat';

// Function to save query to Supabase
const saveQueryToSupabase = async (query: string, response: string) => {
    try {
        await supabase.from('support_queries').insert({
            query: query,
            response: response,
            created_at: new Date().toISOString(),
        });
    } catch (error) {
        console.log('Note: Support queries table may not exist yet. Query logged locally.');
    }
};

export const Chatbot: React.FC = () => {
    const [viewState, setViewState] = useState<ViewState>('closed');
    const [isHovered, setIsHovered] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
    const [messages, setMessages] = useState<Message[]>(() => {
        // Load messages from localStorage on mount
        const saved = localStorage.getItem('growqr_chat_messages');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
            } catch { return []; }
        }
        return [];
    });
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showCategories, setShowCategories] = useState(() => {
        // Hide categories if there are existing messages
        const saved = localStorage.getItem('growqr_chat_messages');
        return !saved || JSON.parse(saved).length === 0;
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
        // Save messages to localStorage whenever they change
        if (messages.length > 0) {
            localStorage.setItem('growqr_chat_messages', JSON.stringify(messages));
        }
    }, [messages]);

    useEffect(() => {
        if (viewState === 'chat' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [viewState]);

    // Handle hover - simple state toggle
    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        if (viewState === 'closed') {
            setIsHovered(true);
        }
    };

    const handleMouseLeave = () => {
        // Delay before closing to prevent flicker
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovered(false);
            setSelectedFaq(null);
        }, 150);
    };

    const handleFaqClick = (faqId: number) => {
        setSelectedFaq(selectedFaq === faqId ? null : faqId);
    };

    const handleOpenChat = () => {
        setIsHovered(false);
        setViewState('chat');

        // Only show welcome message if no existing conversation
        if (messages.length === 0) {
            setMessages([
                {
                    id: 1,
                    text: "Hi, welcome to GrowQR! 👋\nI'm your AI assistant powered by GrowQR. Ask me anything about Q-SCORE™, our platform, or how to get started!",
                    sender: 'bot',
                    timestamp: new Date(),
                }
            ]);
            setShowCategories(true);
        }
        // Don't reset Gemini history if we have existing messages
    };

    const handleCategoryClick = async (category: string) => {
        setShowCategories(false);
        const userMessage: Message = {
            id: Date.now(),
            text: category,
            sender: 'user',
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        try {
            // Use Gemini AI for response
            const response = await generateGeminiResponse(category);

            const botMessage: Message = {
                id: Date.now() + 1,
                text: response,
                sender: 'bot',
                timestamp: new Date(),
            };
            setIsTyping(false);
            setMessages(prev => [...prev, botMessage]);

            // Save to Supabase
            saveQueryToSupabase(category, response);
        } catch (error) {
            setIsTyping(false);
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "I encountered an issue. Please try again or email us at support@growqr.ai for help!",
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        setShowCategories(false);
        const userMessage: Message = {
            id: Date.now(),
            text: text.trim(),
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            // Use Gemini AI for intelligent response
            const aiResponse = await generateGeminiResponse(text);

            const botMessage: Message = {
                id: Date.now() + 1,
                text: aiResponse,
                sender: 'bot',
                timestamp: new Date(),
            };
            setIsTyping(false);
            setMessages(prev => [...prev, botMessage]);

            // Save to Supabase
            saveQueryToSupabase(text, aiResponse);
        } catch (error) {
            setIsTyping(false);
            const errorMessage: Message = {
                id: Date.now() + 1,
                text: "Sorry, I'm having trouble connecting. Please try again or email support@growqr.ai for assistance!",
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(inputValue);
        }
    };

    const handleClose = () => {
        setViewState('closed');
        setIsHovered(false);
        setSelectedFaq(null);
        // Don't clear messages - they persist for when user reopens
    };

    const handleClearChat = () => {
        setMessages([]);
        setShowCategories(true);
        resetChatHistory();
        localStorage.removeItem('growqr_chat_messages');
    };

    return (
        <>
            {/* Hover Container - wraps both popup and button */}
            <div
                className="fixed bottom-6 right-6 z-50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* FAQ Popup on Hover */}
                <div
                    className={`absolute bottom-16 right-0 
                        w-[calc(100vw-48px)] sm:w-[320px] bg-white rounded-2xl
                        shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                        border border-gray-100
                        transition-all duration-300 ease-out origin-bottom-right
                        ${isHovered && viewState === 'closed'
                            ? 'opacity-100 scale-100 translate-y-0'
                            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                        }`}
                >
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden">
                                <img src="/support-agent.png" alt="Support" className="w-8 h-8 object-contain" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-sm">GrowQR Assistant</h3>
                                <p className="text-xs text-gray-500">How can I help you?</p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ List */}
                    <div className="p-2">
                        {FAQ_ITEMS.map((faq) => (
                            <div key={faq.id}>
                                <button
                                    onClick={() => handleFaqClick(faq.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl
                                    text-left text-sm text-gray-700
                                    hover:bg-gray-50 transition-all duration-200
                                    ${selectedFaq === faq.id ? 'bg-orange/5' : ''}`}
                                >
                                    <faq.icon className={`w-4 h-4 flex-shrink-0 ${selectedFaq === faq.id ? 'text-orange' : 'text-gray-400'}`} />
                                    <span className="flex-1">{faq.question}</span>
                                    <ChevronRight className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${selectedFaq === faq.id ? 'rotate-90' : ''}`} />
                                </button>

                                {/* Answer Expand */}
                                <div className={`overflow-hidden transition-all duration-300 ${selectedFaq === faq.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-4 py-3 mx-2 mb-2 bg-gray-50 rounded-lg text-xs text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Something Else - Opens Chat */}
                        <button
                            onClick={handleOpenChat}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                            text-left text-sm text-orange font-medium
                            hover:bg-orange/5 transition-all duration-200 mt-1"
                        >
                            <MessageSquare className="w-4 h-4 flex-shrink-0" />
                            <span className="flex-1">Something else?</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Footer CTA */}
                    <div className="px-4 py-3 border-t border-gray-100">
                        <button
                            onClick={handleOpenChat}
                            className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl
                            transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <MessageSquare className="w-4 h-4" />
                            Start a Conversation
                        </button>
                    </div>
                </div>

                {/* Floating Button inside hover container */}
                <button
                    onClick={handleOpenChat}
                    aria-label="Open chat assistant"
                    className={`
                        flex items-center justify-center
                        transition-all duration-500 ease-out
                        ${viewState === 'chat'
                            ? 'w-12 h-12 rounded-full bg-gray-900 hover:bg-gray-800'
                            : 'w-14 h-14 rounded-2xl bg-gray-900 hover:bg-gray-800'
                        }
                        shadow-[0_8px_32px_rgba(0,0,0,0.25)]
                        hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]
                        hover:scale-105 active:scale-95
                        group`}
                >
                    {viewState === 'chat' ? (
                        <X
                            onClick={(e) => { e.stopPropagation(); handleClose(); }}
                            className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-90"
                        />
                    ) : (
                        <div className="relative">
                            <Headphones className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-orange rounded-full border-2 border-gray-900" />
                        </div>
                    )}
                </button>
            </div>

            {/* Full Chat Panel */}
            <div
                className={`fixed z-50 flex flex-col
                    transition-all duration-400 ease-out origin-bottom-right
                    
                    /* Mobile: Bottom Sheet */
                    bottom-0 right-0 left-0
                    w-full h-[85dvh] sm:h-auto
                    rounded-t-3xl sm:rounded-3xl
                    border-t border-gray-100 sm:border
                    shadow-[0_-10px_40px_rgba(0,0,0,0.1)] sm:shadow-[0_25px_80px_rgba(0,0,0,0.15)]

                    /* Desktop: Floating Bubble */
                    sm:fixed sm:bottom-24 sm:right-6 sm:left-auto
                    sm:w-[380px] sm:max-w-[calc(100vw-48px)]

                    bg-white backdrop-blur-xl
                    overflow-hidden
                    
                    ${viewState === 'chat'
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-full sm:translate-y-8 sm:scale-90 pointer-events-none'
                    }`}
            >
                {/* Header */}
                <div className="bg-gray-900 px-5 py-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-transparent to-transparent" />

                    <div className="relative flex items-center gap-3">
                        <div className="relative">
                            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-lg overflow-hidden">
                                <img src="/support-agent.png" alt="GrowQR Assistant" className="w-9 h-9 object-contain" />
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-gray-900 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-white font-semibold text-sm tracking-tight">GrowQR Assistant</h3>
                            <span className="text-gray-400 text-xs">Typically replies instantly</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleClearChat}
                                className="text-gray-500 hover:text-red-400 hover:bg-white/10 transition-all p-2 rounded-lg"
                                title="Clear conversation"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleClose}
                                className="text-gray-500 hover:text-white hover:bg-white/10 transition-all p-2 rounded-lg"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white sm:h-[340px]">
                    {messages.map((message, index) => (
                        <div
                            key={message.id}
                            className={`flex items-end gap-2.5 animate-fade-in-up
                                ${message.sender === 'user' ? 'flex-row-reverse' : ''}
                                group`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110
                                ${message.sender === 'bot'
                                    ? 'bg-gray-100'
                                    : 'bg-gradient-to-br from-orange to-[#FF8F5C] shadow-sm'}`}
                            >
                                {message.sender === 'bot'
                                    ? <Bot className="w-3.5 h-3.5 text-gray-500" />
                                    : <User className="w-3 h-3 text-white" />
                                }
                            </div>

                            <div className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed whitespace-pre-line
                                ${message.sender === 'bot'
                                    ? 'bg-white border border-gray-100 text-gray-700 rounded-2xl rounded-bl-lg shadow-sm'
                                    : 'bg-gradient-to-br from-orange to-[#FF8F5C] text-white rounded-2xl rounded-br-lg shadow-md'
                                }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}

                    {/* Category Options */}
                    {showCategories && messages.length > 0 && (
                        <div className="space-y-2 mt-4 animate-fade-in-up">
                            {CHAT_CATEGORIES.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category.label)}
                                    className="w-full flex items-center gap-3 px-4 py-3 
                                        bg-white border border-gray-200 rounded-xl
                                        text-sm text-gray-700 text-left
                                        hover:border-orange/40 hover:bg-orange/5
                                        transition-all duration-200"
                                >
                                    <category.icon className="w-4 h-4 text-gray-400" />
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex items-end gap-2.5 animate-fade-in-up">
                            <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                                <Bot className="w-3.5 h-3.5 text-gray-500" />
                            </div>
                            <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-lg shadow-sm">
                                <div className="flex gap-1.5">
                                    <span className="w-2 h-2 bg-orange/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-orange/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-orange/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="px-4 py-4 border-t border-gray-100 bg-white">
                    <div className="flex items-center gap-3">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your question here..."
                            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl
                                text-sm text-gray-700 placeholder-gray-400
                                focus:outline-none focus:border-orange/50 focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,106,47,0.1)]
                                transition-all duration-200"
                        />
                        <button
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim()}
                            className="w-11 h-11 rounded-xl bg-gray-900
                                text-white flex items-center justify-center
                                shadow-[0_4px_12px_rgba(0,0,0,0.15)]
                                hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]
                                disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none
                                hover:scale-105 active:scale-95
                                transition-all duration-200 group"
                        >
                            <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                    </div>
                    <p className="text-[10px] text-gray-400 text-center mt-3">
                        All responses are generated by AI
                    </p>
                </div>
            </div>
        </>
    );
};
