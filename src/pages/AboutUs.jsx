import { useState, useEffect } from 'react';
import { Users, Wifi, ShieldCheck, Heart, Code, Terminal, Cpu, ArrowUpRight, Globe } from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const AboutUs = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isLoading]);

    const fadeInUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: false, amount: 0.3 },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    };

    const staggerContainer = {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: false, amount: 0.3 },
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    };

    const staggerItem = {
        initial: { opacity: 0, y: 30, scale: 0.95 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    };

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
            <AnimatePresence mode="wait">
                {isLoading && (
                    <LoadingScreen onComplete={() => setIsLoading(false)} />
                )}
            </AnimatePresence>

            <section className="relative pt-28 pb-16 md:pt-48 md:pb-32 px-4 md:px-10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-50"></div>

                <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-center mb-6 leading-[0.9]"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        About Us.
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl text-zinc-500 text-center max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        Teknologi Informasi 24.<br />
                        <span className="text-zinc-400">Santai, Solid, Siap Lulus Bareng.</span>
                    </motion.p>
                </div>
            </section>

            <section className="py-16 md:py-24 px-4 md:px-10 bg-zinc-50">
                <div className="max-w-[1400px] mx-auto">
                    <div className="mb-12 md:mb-16 max-w-3xl">
                        <motion.span
                            className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3"
                            {...fadeInUp}
                        >
                            Apa yang kita pelajari?
                        </motion.span>
                        <motion.h2
                            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-zinc-900 leading-tight"
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.1 }}
                        >
                            Bukan Cuma<br />
                            <span className="text-zinc-400">Reset Modem.</span>
                        </motion.h2>
                        <motion.p
                            className="text-lg md:text-xl leading-relaxed text-zinc-600"
                            {...fadeInUp}
                            transition={{ ...fadeInUp.transition, delay: 0.2 }}
                        >
                            Kalau anak sebelah sibuk ngoding tampilan web, kita sibuk di belakang layar. Pastiin jaringannya ngebut, datanya aman, dan servernya gak meledak. Ini "mainan" kita sehari-hari di kampus.
                        </motion.p>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <motion.div variants={staggerItem} className="group p-6 md:p-8 rounded-4xl bg-white border border-zinc-200 hover:border-zinc-800 transition-all duration-300 relative overflow-hidden">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Wifi size={28} className="text-blue-600" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 text-zinc-900">Jaringan Anti-Lemot</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                                Belajar ngerakit topologi jaringan biar satu gedung konek semua. Routing, switching, sampai mikrotik jadi makanan sehari-hari.
                            </p>
                        </motion.div>

                        <motion.div variants={staggerItem} className="group p-6 md:p-8 rounded-4xl bg-white border border-zinc-200 hover:border-zinc-800 transition-all duration-300 relative overflow-hidden">
                            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={28} className="text-red-600" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 text-zinc-900">Satpam Digital</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                                Belajar jadi hacker (yang baik). Kita cari celah keamanan, tambal bug, dan pastiin sistem biar gak gampang dibobol orang iseng.
                            </p>
                        </motion.div>

                        <motion.div variants={staggerItem} className="group p-6 md:p-8 rounded-4xl bg-white border border-zinc-200 hover:border-zinc-800 transition-all duration-300 relative overflow-hidden">
                            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Cpu size={28} className="text-purple-600" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold mb-3 text-zinc-900">Ngoprek Hardware</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                                Bongkar pasang PC, mainan sensor, sampai bikin alat IoT. Pokoknya ngehubungin benda mati ke internet biar jadi canggih.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 md:py-24 px-4 md:px-10 bg-zinc-900 text-white rounded-t-[3rem] md:rounded-t-[5rem] -mt-10 relative z-20">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        className="text-center mb-12 md:mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Organization</span>
                        <h2 className="text-3xl md:text-5xl font-bold">Struktur Kelas</h2>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: false, amount: 0.1 }}
                    >
                        {[
                            { role: 'Ketua Kelas', name: 'Muhamad Rafli Ramadhansyah', image: '/assets/struktur-kelas/ketua.webp' },
                            { role: 'Wakil Ketua', name: 'Muhamad Sobirin', image: '/assets/struktur-kelas/wakil-ketua.webp' },
                            { role: 'Bendahara', name: 'Muhammad Alif Al-Abidin', image: '/assets/struktur-kelas/bendahara-1.webp' },
                            { role: 'Bendahara', name: 'Amanda Berliani', image: '/assets/struktur-kelas/bendahara-2.webp' },
                            { role: 'Akademik & Lead Developer', name: 'Deni Setiawan Pratama', image: '/assets/struktur-kelas/akademik.webp' }
                        ].map((item, i) => (
                            <motion.div variants={staggerItem} key={i} className="bg-zinc-800/50 p-6 rounded-3xl border border-white/5 hover:border-white/20 transition-all text-center">
                                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden relative shadow-lg">
                                    <img src={item.image}
                                        alt={item.name}
                                        className="w-32 h-32 rounded-full"
                                        loading="lazy"
                                        decoding="async"
                                        onContextMenu={(e) => e.preventDefault()}
                                        draggable={false}
                                        fetchPriority="low"
                                    />
                                </div>
                                <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                                <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider">{item.role}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="py-16 md:py-24 px-4 md:px-10 bg-zinc-50">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center">
                    <motion.div
                        className="w-full md:w-1/2"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">Our Culture</span>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-zinc-900">Budaya &<br />Kebiasaan.</h2>
                        <p className="text-zinc-500 text-lg leading-relaxed mb-8">
                            Kami percaya bahwa lingkungan yang suportif adalah kunci keberhasilan. Di sini, kami tidak hanya mengejar IPK, tapi juga membangun karakter dan mentalitas problem solver yang tangguh.
                        </p>
                        <Link to="/gallery" className="inline-flex items-center gap-2 font-semibold border-b border-black pb-1 hover:opacity-70 transition-opacity group">
                            Lihat Momen Kebersamaan <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                    <motion.div
                        className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: false, amount: 0.3 }}
                    >
                        {[
                            { icon: Users, label: "Sharing Santai", desc: "Ngobrolin teknologi sambil ngopi." },
                            { icon: Globe, label: "Tech Update", desc: "Gak kudet sama teknologi masa kini." },
                            { icon: Heart, label: "Solidaritas", desc: "Satu susah, semua ikut bantu." },
                            { icon: Wifi, label: "Networking", desc: "Perluas koneksi untuk masa depan." }
                        ].map((item, i) => (
                            <motion.div variants={staggerItem} key={i} className="flex flex-col gap-4 p-6 rounded-3xl bg-white border border-zinc-200 transition-all duration-300 group">
                                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                                    <item.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-zinc-900 text-lg">{item.label}</h4>
                                    <p className="text-zinc-400 text-sm">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

const LoadingScreen = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2000);
        return () => clearTimeout(timer);
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
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
            >
                <span className="text-[12vw] md:text-[10vw] font-bold tracking-tighter block text-center">
                    About Us.
                </span>
            </motion.div>
        </motion.div>
    );
};

export default AboutUs;