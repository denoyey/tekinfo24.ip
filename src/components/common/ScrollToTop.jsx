import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    const [isVisible, setIsVisible] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }

            if (pathname === '/gallery') {
                const scrollPosition = window.scrollY + window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const threshold = 100;
                if (documentHeight - scrollPosition < threshold) {
                    setIsFilterVisible(false);
                } else {
                    setIsFilterVisible(true);
                }
            } else {
                setIsFilterVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.3 }}
                    onClick={scrollToTop}
                    className={`fixed ${pathname === '/gallery' && isFilterVisible ? 'bottom-25 md:bottom-8' : 'bottom-8'} right-8 z-50 p-3 rounded-full bg-white/80 backdrop-blur-md border border-zinc-200/50 shadow-lg text-zinc-900 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 group`}
                    aria-label="Back to Top"
                >
                    <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

export default ScrollToTop;
