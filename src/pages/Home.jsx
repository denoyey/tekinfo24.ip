import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useVelocity, useAnimationFrame, useMotionValue } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Terminal, Cpu, Globe, Database, Wifi, Code2, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { galleryData } from '../data';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isLoading]);

    return (
        <div className="bg-[#FAFAFA] text-[#1a1a1a] font-sans selection:bg-black selection:text-white overflow-x-hidden">
            <AnimatePresence mode="wait">
                {isLoading && (
                    <LoadingScreen onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            <HomeHero />
            <HomeMiniAbout />
            <HomeMiniGallery />
            <HomeInteractiveCTA />
        </div>
    );
};

const LoadingScreen = ({ onComplete }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const steps = 100;
        const intervalTime = duration / steps;

        let current = 0;
        const timer = setInterval(() => {
            current += 1;
            setCount(current);
            if (current >= 100) {
                clearInterval(timer);
                setTimeout(onComplete, 1000);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-999 flex items-center justify-center bg-[#1a1a1a] text-white"
            initial={{ y: 0 }}
            exit={{
                y: "-100%",
                transition: {
                    duration: 0.8,
                    ease: [0.76, 0, 0.24, 1]
                }
            }}
        >
            <div className="relative">
                <span className="text-[15vw] sm:text-[12vw] md:text-[10vw] font-bold font-mono tracking-tighter block">
                    {count}%
                </span>
            </div>
        </motion.div>
    );
};

const HomeHero = () => {
    const techPills = [
        { icon: <Terminal size={14} />, text: "DevOps", className: "top-[22%] left-[5%] md:top-[20%] md:left-[10%]" },
        { icon: <Globe size={14} />, text: "Network", className: "top-[22%] right-[5%] md:top-[18%] md:right-[15%]" },
        { icon: <Database size={14} />, text: "Data Science", className: "hidden md:flex bottom-[65%] left-[5%]" },
        { icon: <Cpu size={14} />, text: "IoT", className: "hidden md:flex top-[30%] right-[10%]" },
        { icon: <Wifi size={14} />, text: "CyberSec", className: "top-[28%] left-[40%] md:hidden" },
    ];

    return (
        <section className="relative min-h-[60vh] md:min-h-[85vh] flex flex-col justify-end pb-10 md:pb-20 px-4 md:px-10 pt-24 md:pt-32 overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px]">
            <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-linear-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
            {techPills.map((pill, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                    transition={{
                        opacity: { duration: 0.5, delay: 0.5 + (i * 0.1) },
                        scale: { duration: 0.5, delay: 0.5 + (i * 0.1) },
                        y: { repeat: Infinity, duration: 3 + (i * 0.5), ease: "easeInOut" }
                    }}
                    className={`absolute flex items-center gap-1.5 px-3 py-1.5 bg-white/60 backdrop-blur-sm border border-white/50 rounded-full shadow-sm text-[10px] md:text-xs font-semibold text-zinc-600 z-0 ${pill.className}`}
                >
                    {pill.icon}
                    <span>{pill.text}</span>
                </motion.div>
            ))}

            <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end relative z-10">
                <div className="lg:col-span-9">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-[10vw] md:text-[8vw] leading-[0.85] font-black tracking-tighter uppercase mt-25 mb-0 md:mb-8 relative">
                            Tekinfo<br />
                            <span className="text-zinc-400">Twenty</span>Four. --

                            <motion.span
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 }}
                                className="absolute -top-2 right-0 md:-top-4 md:right-20 text-[10px] md:text-sm bg-black text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full font-medium tracking-wide rotate-12"
                            >
                                Est. 2024
                            </motion.span>
                        </h1>
                    </motion.div>
                </div>

                <div className="lg:col-span-3 flex flex-col justify-end gap-6 md:gap-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="hidden md:flex flex-col gap-1 font-mono text-xs text-zinc-400 mb-4"
                    >
                        <p>&gt; System.init(UNIPI_TI_24)</p>
                        <p>&gt; Status: <span className="text-green-500">Connected</span></p>
                        <p>&gt; Ready to Innovate<span className="animate-pulse">_</span></p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex md:hidden font-mono text-[10px] text-zinc-400 mb-1 gap-2 border-l-2 border-zinc-300 pl-2"
                    >
                        <span>&gt; Sys.Init(24)</span>
                        <span className="text-green-600">● Active</span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-base md:text-xl font-medium leading-relaxed"
                    >
                        Universitas Insan Pembangunan Indonesia.
                        <br />
                        <span className="text-zinc-500">Teknologi Informasi 24.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex gap-4 items-center"
                    >
                        <div className="h-px w-8 md:w-12 bg-black"></div>
                        <span className="uppercase text-[10px] md:text-xs font-bold tracking-widest">Scroll Down</span>
                    </motion.div>
                </div>
            </div>

            <div className="absolute top-0 right-0 p-4 opacity-[0.03] select-none pointer-events-none -z-10">
                <span className="text-[30vw] md:text-[40vw] font-black leading-none">24</span>
            </div>
        </section>
    );
};

const HomeMiniAbout = () => {
    return (
        <section className="py-16 md:py-24 px-4 md:px-10 border-t border-zinc-200">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-start"
                >
                    <span className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 md:mb-6">01 — About Us</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 md:mb-8">
                        Bukan Sekedar<br />Teman Sekelas.
                    </h2>
                    <Link to="/about-us" className="inline-flex items-center gap-2 text-base md:text-lg font-semibold border-b border-black pb-1 hover:opacity-70 transition-opacity group">
                        Lebih Lengkap <ArrowUpRight size={18} className="md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </Link>
                </motion.div>
                <div className="flex flex-col justify-between gap-6 md:gap-4">
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-2xl leading-relaxed text-zinc-700"
                    >
                        Kami anak-anak <b>Teknologi Informasi 24</b>. Di sini kita belajar kalau teknologi itu luas. Gak cuma sekedar nulis kode, tapi juga paham soal jaringan, data, dan gimana sistem itu bekerja.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="text-zinc-500 text-base md:text-lg"
                    >
                        Tapi yang paling penting itu kebersamaannya. Kita biasa saling bantu kalau ada tugas susah atau ada yang error. Prinsipnya satu: kita masuk bareng, belajar bareng, dan sukses juga harus bareng.
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

const HomeMiniGallery = () => {
    const [images] = useState(() => {
        const smt1 = galleryData.find(d => d.id === 1)?.images || [];
        const smt2 = galleryData.find(d => d.id === 2)?.images || [];
        return {
            smt1Images: smt1.length > 0 ? [...smt1].sort(() => 0.5 - Math.random()).slice(0, 12).map(i => i.src) : [],
            smt2Images: smt2.length > 0 ? [...smt2].sort(() => 0.5 - Math.random()).slice(0, 12).map(i => i.src) : []
        };
    });
    const [activeImage, setActiveImage] = useState(null);

    const baseX1 = useMotionValue(0);
    const baseX2 = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const wrap = (min, max, v) => {
        const rangeSize = max - min;
        return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
    };

    const x1 = useTransform(baseX1, (v) => `${wrap(-25, 0, v)}%`);
    const x2 = useTransform(baseX2, (v) => `${wrap(-25, 0, v)}%`);

    useAnimationFrame((t, delta) => {
        const moveByBase = delta / 1000;

        let moveBy1 = -0.5 * moveByBase;
        if (velocityFactor.get() !== 0) {
            moveBy1 += (-1) * Math.abs(velocityFactor.get()) * moveByBase * 2;
        }
        baseX1.set(baseX1.get() + moveBy1);

        let moveBy2 = 0.5 * moveByBase;
        if (velocityFactor.get() !== 0) {
            moveBy2 += (1) * Math.abs(velocityFactor.get()) * moveByBase * 2;
        }
        baseX2.set(baseX2.get() + moveBy2);
    });

    const { smt1Images, smt2Images } = images;
    const displayImages1 = [...smt1Images, ...smt1Images, ...smt1Images, ...smt1Images];
    const displayImages2 = [...smt2Images, ...smt2Images, ...smt2Images, ...smt2Images];

    const handleImageClick = (id, e) => {
        if (window.innerWidth < 768) {
            e.stopPropagation();
            setActiveImage(prev => prev === id ? null : id);
        }
    };

    const handleBackgroundClick = () => {
        if (window.innerWidth < 768) {
            setActiveImage(null);
        }
    };

    const renderMarqueeRow = (displayImages, xMotion, prefix) => (
        <div
            className="overflow-hidden group"
        >
            <motion.div
                className="flex gap-4 md:gap-8 pl-4 min-w-max will-change-transform"
                style={{ x: xMotion }}
            >
                {displayImages.map((src, idx) => {
                    const uniqueId = `${prefix}-${idx}`;
                    const isActive = activeImage === uniqueId;
                    return (
                        <div
                            key={uniqueId}
                            onClick={(e) => handleImageClick(uniqueId, e)}
                            className={`w-[200px] sm:w-[280px] md:w-[350px] aspect-4/3 bg-zinc-200 overflow-hidden transition-all duration-500 rounded-2xl relative group/item ${isActive ? 'grayscale-0' : 'grayscale hover:grayscale-0'}`}
                        >
                            <img
                                src={src}
                                alt={`${prefix === 'smt1' ? 'Semester 1' : 'Semester 2'} - ${idx}`}
                                className="w-full h-full object-cover object-center transition-transform duration-700 select-none"
                                loading="lazy"
                                decoding="async"
                                onContextMenu={(e) => e.preventDefault()}
                                draggable={false}
                                fetchPriority="low"
                            />
                            <div className={`absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full transition-opacity select-none pointer-events-none ${isActive ? 'opacity-100' : 'md:opacity-0 group-hover/item:opacity-100'}`}>
                                {prefix === 'smt1' ? 'Smt 1' : 'Smt 2'}
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );

    return (
        <section className="py-16 md:py-24 border-t border-zinc-200 overflow-hidden" onClick={handleBackgroundClick}>
            <div className="px-4 md:px-10 max-w-[1400px] mx-auto mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 md:mb-4">02 — Documentation</span>
                    <h2 className="text-3xl md:text-4xl font-bold">Moment yang Terdokumentasi</h2>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                    <Link to="/gallery" className="hidden md:flex items-center gap-2 group text-sm md:text-base">
                        <span className="font-medium group-hover:mr-2 transition-all">Lihat Semua</span>
                        <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </div>

            <motion.div
                className="flex flex-col gap-4 md:gap-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                {renderMarqueeRow(displayImages1, x1, 'smt1')}
                {renderMarqueeRow(displayImages2, x2, 'smt2')}
            </motion.div>

            <motion.div
                className="mt-8 px-4 text-center md:hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <Link to="/gallery" className="inline-flex items-center gap-2 font-medium text-sm">
                    View All Gallery <ArrowRight size={16} />
                </Link>
            </motion.div>
        </section>
    );
};

const HomeInteractiveCTA = () => {
    return (
        <section className="py-16 md:py-24 px-4 md:px-10 border-t border-zinc-200 bg-[#FAFAFA]">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="block text-[10px] md:text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2 md:mb-4">03 — Connect</span>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 md:mb-8 leading-tight">
                        Punya Ide Liar?<br />
                        <span className="text-zinc-400">Let's make it happen.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-zinc-600 max-w-xl leading-relaxed mb-8">
                        Anak Teknologi Informasi gak cuma soal ngoding, tapi juga soal koneksi. Yuk sharing bareng, belajar bareng, siapa tau bisa bikin project keren bareng!
                    </p>

                    <a
                        href="https://instagram.com/tekinfo24.ip"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-lg md:text-xl font-bold border-b-2 border-black pb-1 hover:opacity-70 transition-opacity group"
                    >
                        Gas Ngobrol
                        <ArrowUpRight size={24} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 45 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative hidden md:block"
                >
                    <div className="w-64 h-64 rounded-full overflow-hidden relative flex items-center justify-center rotate-45 hover:rotate-0 transition-transform duration-500">
                        <img src="/assets/favicon/logo_ti.png" alt="Logo" className="w-full h-full object-contain object-center" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Home;