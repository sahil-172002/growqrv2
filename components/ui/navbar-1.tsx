import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

interface Navbar1Props {
    onOpenWaitlist: () => void;
}

const Navbar1: React.FC<Navbar1Props> = ({ onOpenWaitlist }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    const navLinks = [
        { label: "About", to: "/about" },
        { label: "Vision", to: "/vision" },
        { label: "Contact", to: "/contact" }
    ];

    return (
        <>
            {/* Clean Glassmorphism Navbar */}
            <div className="absolute top-6 left-0 right-0 w-full px-4 z-50">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        className="flex items-center justify-between px-6 py-3.5 backdrop-blur-md bg-white/80 border border-white/40 shadow-lg shadow-black/5 rounded-full"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >

                        {/* Logo - Left Corner */}
                        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <motion.div
                                className="flex items-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <img
                                    src="/logo.webp"
                                    alt="GrowQR"
                                    className="h-5 md:h-6 transition-all duration-300 cursor-pointer"
                                />
                            </motion.div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {navLinks.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Link
                                        to={item.to}
                                        className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange transition-colors duration-200 group"
                                    >
                                        {item.label}
                                        {/* Hover underline effect */}
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-orange rounded-full group-hover:w-3/4 transition-all duration-300"></span>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Desktop CTA Button */}
                        <motion.div
                            className="hidden md:block"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <motion.button
                                onClick={onOpenWaitlist}
                                className="relative group px-6 py-2.5 bg-gradient-to-r from-orange to-orange/90 text-white text-sm font-medium rounded-full overflow-hidden shadow-lg shadow-orange/25 transition-all duration-300"
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 106, 47, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {/* Shine effect on hover */}
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                                <span className="relative">Early Access</span>
                            </motion.button>
                        </motion.div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100/50 transition-colors"
                            onClick={toggleMenu}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Menu className="h-5 w-5 text-gray-700" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Backdrop blur */}
                        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={toggleMenu}></div>

                        {/* Menu content */}
                        <motion.div
                            className="absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            {/* Close button */}
                            <motion.button
                                className="absolute top-6 right-6 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                onClick={toggleMenu}
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <X className="h-6 w-6 text-gray-700" />
                            </motion.button>

                            {/* Menu items */}
                            <div className="flex flex-col pt-24 px-8 space-y-2">
                                {navLinks.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 + 0.1 }}
                                        exit={{ opacity: 0, x: 20 }}
                                    >
                                        <Link
                                            to={item.to}
                                            className="block py-3 px-4 text-base font-medium text-gray-700 hover:text-orange hover:bg-orange/5 rounded-lg transition-all duration-200"
                                            onClick={toggleMenu}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="pt-6"
                                >
                                    <button
                                        onClick={() => {
                                            toggleMenu();
                                            onOpenWaitlist();
                                        }}
                                        className="w-full py-3 px-6 bg-gradient-to-r from-orange to-orange/90 text-white text-base font-medium rounded-full shadow-lg shadow-orange/25 hover:shadow-orange/40 transition-all duration-300"
                                    >
                                        Get Early Access
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export { Navbar1 }
