/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./hooks/**/*.{js,ts,jsx,tsx}",
        "./utils/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                orange: {
                    DEFAULT: '#FF6A2F',
                    hover: '#FF8C5F',
                    dim: 'rgba(255, 106, 47, 0.1)'
                },
                black: {
                    DEFAULT: '#000000',
                    rich: '#0a0a0a',
                    card: '#111111'
                },
                gray: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    800: '#1F2937',
                    900: '#111827',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                poppins: ['Poppins', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 12s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'fade-in-up': 'fade-in-up 1s ease-out forwards',
                'fade-in': 'fade-in 0.8s ease-out 0.15s forwards',
                'fade-up': 'fade-up 1s ease-out 0.3s forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
                    '50%': { transform: 'translate3d(0, -20px, 0)' },
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translate3d(0, 20px, 0)' },
                    '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(-16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-up': {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        }
    },
    plugins: [],
}
