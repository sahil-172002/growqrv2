import * as React from "react"
import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

interface NavbarProps {
    onOpenWaitlist: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = useCallback(() => setIsOpen(prev => !prev), [])

    const navLinks = [
        { label: "Vision", to: "/vision" },
        { label: "About Us", to: "/about" },
        { label: "Contact Us", to: "/contact" }
    ];

    return (
        <>
            {/* Minimal Overlay Navigation */}
            <div className="absolute top-0 left-0 right-0 w-full px-4 sm:px-6 pt-6 z-50">
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        className="flex items-center justify-between"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        {/* Logo - Left Side */}
                        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <motion.div
                                className="flex items-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <img
                                    src="/logo.webp"
                                    alt="GrowQR"
                                    className="h-6 md:h-7 transition-all duration-300 cursor-pointer drop-shadow-sm"
                                />
                            </motion.div>
                        </Link>

                        {/* Right Side - Menu Button + Early Access Button */}
                        <div className="flex items-center gap-3">
                            {/* Menu Toggle Button - Hamburger/Cross with smooth transition */}
                            <motion.button
                                className="relative p-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-lg shadow-black/5 hover:bg-white transition-all duration-300"
                                onClick={toggleMenu}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={isOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isOpen}
                                aria-controls="main-navigation"
                            >
                                <div className="relative w-5 h-5 flex items-center justify-center">
                                    {/* Animated Icon Container */}
                                    <motion.div
                                        className="absolute"
                                        initial={false}
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <AnimatePresence mode="wait" initial={false}>
                                            {!isOpen ? (
                                                <motion.div
                                                    key="menu"
                                                    initial={{ opacity: 0, rotate: -90 }}
                                                    animate={{ opacity: 1, rotate: 0 }}
                                                    exit={{ opacity: 0, rotate: 90 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Menu className="w-5 h-5 text-gray-700" />
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="close"
                                                    initial={{ opacity: 0, rotate: -90 }}
                                                    animate={{ opacity: 1, rotate: 0 }}
                                                    exit={{ opacity: 0, rotate: 90 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <X className="w-5 h-5 text-gray-700" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                            </motion.button>

                            {/* Early Access Button - Hidden on mobile, shown on desktop */}
                            <motion.button
                                onClick={onOpenWaitlist}
                                className="hidden md:flex relative group px-5 py-2.5 bg-gradient-to-r from-orange to-orange/90 text-white text-sm font-medium rounded-xl overflow-hidden shadow-lg shadow-orange/25 transition-all duration-300 items-center"
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 106, 47, 0.35)" }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                {/* Shine effect on hover */}
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                                <span className="relative font-semibold">Early Access</span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Dropdown Menu - Elegant slide down from top */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop */}
                        <motion.div
                            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                            onClick={toggleMenu}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        ></motion.div>

                        {/* Dropdown Panel - Full screen elegant overlay */}
                        <motion.div
                            className="absolute inset-x-0 top-0 bg-white shadow-2xl"
                            initial={{ y: "-100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "-100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        >
                            <div className="container mx-auto max-w-7xl px-4 pt-20 pb-6">
                                {/* Menu Links - Full width rows */}
                                <nav id="main-navigation" className="flex flex-col" aria-label="Main navigation">
                                    {navLinks.map((item, i) => (
                                        <motion.div
                                            key={item.label}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.08 + 0.1, duration: 0.3 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <Link
                                                to={item.to}
                                                className="group flex items-center justify-center w-full py-4 px-4 text-xl font-medium text-gray-800 hover:text-orange hover:bg-orange/5 rounded-xl transition-all duration-300 border-b border-gray-100 last:border-b-0"
                                                onClick={toggleMenu}
                                            >
                                                <span className="relative">
                                                    {item.label}
                                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange rounded-full group-hover:w-full transition-all duration-300"></span>
                                                </span>
                                            </Link>
                                        </motion.div>
                                    ))}

                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: navLinks.length * 0.08 + 0.2, duration: 0.3 }}
                                        className="mt-6 px-4 md:hidden"
                                    >
                                        <button
                                            onClick={() => {
                                                onOpenWaitlist();
                                                toggleMenu();
                                            }}
                                            className="w-full py-4 bg-gray-900 text-white text-lg font-semibold rounded-2xl shadow-lg shadow-gray-200 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            Early Access
                                        </button>
                                    </motion.div>
                                </nav>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export { Navbar }

