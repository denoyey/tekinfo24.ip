// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const GalleryHeader = () => {
    return (
        <section className="relative pt-28 pb-10 md:pt-48 md:pb-15 px-4 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-50"></div>

            <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-center mb-6 leading-[0.9]"
                >
                    Gallery.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg sm:text-xl md:text-2xl text-zinc-500 text-center max-w-2xl mx-auto leading-relaxed"
                >
                    Arsip digital perjalanan kami.<br />
                    <span className="text-zinc-400">Dari pusing sampai healing bareng.</span>
                </motion.p>
            </div>
        </section>
    );
};

export default GalleryHeader;
