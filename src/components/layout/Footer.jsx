import { Link } from 'react-router-dom';
import { Instagram, ArrowUpRight, Heart } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about-us' },
        { name: 'Gallery', path: '/gallery' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <footer className="relative bg-[#111111] text-white overflow-hidden mt-auto">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -bottom-[40%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-zinc-800/30 rounded-full blur-[120px]" />
            </div>
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
                <motion.div
                    className="pt-16 md:pt-24 pb-12 md:pb-16 border-b border-zinc-800/80"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.p
                        variants={itemVariants}
                        className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4 md:mb-6"
                    >
                        Teknologi Informasi 2024
                    </motion.p>

                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-6 md:mb-8"
                    >
                        Satu Kelas,<br />
                        <span className="text-zinc-600">Sejuta Cerita.</span>
                    </motion.h2>

                    <motion.a
                        variants={itemVariants}
                        href="https://instagram.com/tekinfo24.ip"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 group"
                    >
                        <span className="text-base md:text-lg font-semibold text-zinc-400 group-hover:text-white transition-colors duration-300">
                            Follow Kami
                        </span>
                        <span className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-zinc-700 group-hover:border-white group-hover:bg-white flex items-center justify-center transition-all duration-300">
                            <Instagram size={16} className="text-zinc-400 group-hover:text-black transition-colors duration-300 md:w-[18px] md:h-[18px]" />
                        </span>
                    </motion.a>
                </motion.div>
                <motion.div
                    className="py-8 md:py-10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <Link to="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 10, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700/50 flex items-center justify-center group-hover:border-zinc-500 transition-colors duration-300"
                        >
                            <img
                                src="/assets/favicon/logo_ti.png"
                                alt="Logo TI"
                                className="w-full h-full object-contain p-0.5 grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </motion.div>
                        <span className="text-lg font-bold tracking-tight text-zinc-300 group-hover:text-white transition-colors duration-300">
                            Tekinfo24
                        </span>
                    </Link>

                    <nav className="flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="relative px-4 py-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors duration-300 group"
                            >
                                {link.name}
                                <span className="absolute bottom-1 left-4 right-4 h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </Link>
                        ))}
                    </nav>
                    <p className="text-zinc-600 text-[10px] md:text-xs tracking-wider flex items-center gap-1.5">
                        © {currentYear} Tekinfo24
                        <Heart size={10} className="text-zinc-700 inline" />
                        <span className="md:hidden">UNIPI</span>
                        <span className="hidden md:inline">Universitas Insan Pembangunan Indonesia</span>
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;