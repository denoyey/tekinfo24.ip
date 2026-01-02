import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(() => localStorage.getItem('isMobileMenuOpen') === 'true');
    const location = useLocation();

    useEffect(() => {
        localStorage.setItem('isMobileMenuOpen', isMobileMenuOpen);
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about-us' },
        { name: 'Gallery', path: '/gallery' },
    ];

    return (
        <>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
                className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
            >
                <nav className={`
                    pointer-events-auto
                    flex items-center justify-between 
                    backdrop-blur-2xl 
                    border border-slate-200/60 shadow-md shadow-slate-200/20
                    rounded-full px-4 md:px-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
                    w-full max-w-[95%] md:max-w-2xl lg:max-w-3xl
                    py-3 bg-white/90
                `}>
                    <Link to="/" className="flex items-center gap-2 group shrink-0">
                        <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden flex items-center justify-center bg-slate-50 border border-slate-100"
                        >
                            <img
                                src="/assets/favicon/logo_ti.png"
                                alt="Logo Tekinfo24"
                                className="w-full h-full object-contain p-0.5"
                            />
                        </motion.div>
                        <span className="text-base md:text-lg font-bold tracking-tight text-slate-800 group-hover:text-black transition-colors">
                            Tekinfo24
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        <LayoutGroup>
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        className={`relative px-4 lg:px-5 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${isActive ? 'text-black bg-slate-200/90' : 'text-slate-500 hover:text-black'}`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                initial={false}
                                                style={{ originY: "0px" }}
                                                className="absolute inset-0 bg-slate-100 rounded-full -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </LayoutGroup>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden p-2 text-slate-800 hover:bg-slate-100 rounded-full transition-colors focus:outline-none touch-manipulation"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isMobileMenuOpen ? "close" : "open"}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </nav>
            </motion.div>

            <AnimatePresence mode="wait">
                {isMobileMenuOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.95, y: -20, filter: "blur(10px)" }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="fixed inset-x-4 top-22 z-99 bg-white/90 backdrop-blur-2xl rounded-xl shadow-md md:hidden overflow-hidden mx-auto"
                    >
                        <ul className="flex flex-col p-2 space-y-1">
                            {navLinks.map((link, i) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <motion.li
                                        key={`${link.name}-${isMobileMenuOpen}`}
                                        initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                        transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 15 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`block p-4 rounded-2xl font-medium text-center transition-all ${isActive
                                                ? 'bg-slate-200/90 text-black font-bold'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-black'
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;