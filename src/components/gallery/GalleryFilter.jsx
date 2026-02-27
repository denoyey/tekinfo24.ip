// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, Filter } from "lucide-react";

const GalleryFilter = ({
    isFilterVisible,
    isFilterOpen,
    setIsFilterOpen,
    semesters,
    activeFilter,
    setActiveFilter,
    setVisibleCount
}) => {
    return (
        <AnimatePresence>
            {isFilterVisible && (
                <motion.section
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-8 left-0 right-0 z-40 pointer-events-none"
                >
                    <div className="max-w-fit mx-auto px-4 pointer-events-auto relative">
                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-[-1]"
                                    onClick={() => setIsFilterOpen(false)}
                                />
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-zinc-200/50 shadow-2xl rounded-2xl p-1.5 min-w-[180px] max-h-[50vh] overflow-y-auto no-scrollbar"
                                >
                                    {semesters.map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => {
                                                setActiveFilter(filter);
                                                setVisibleCount(20);
                                                setIsFilterOpen(false);
                                                setTimeout(() => {
                                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                                }, 50);
                                            }}
                                            className={`
                                                w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left flex items-center justify-between gap-3
                                                ${activeFilter === filter
                                                    ? "bg-black text-white"
                                                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                                                }
                                            `}
                                        >
                                            {filter}
                                            {activeFilter === filter && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                            )}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => setIsFilterOpen(prev => !prev)}
                            className="flex items-center gap-2.5 bg-white/80 backdrop-blur-md border border-zinc-200/50 shadow-xl rounded-full px-5 py-3 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                        >
                            <Filter size={14} className="text-zinc-400" />
                            <span className="text-sm font-semibold text-zinc-900">
                                {activeFilter}
                            </span>
                            <motion.div
                                animate={{ rotate: isFilterOpen ? 180 : 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <ChevronUp size={14} className="text-zinc-400" />
                            </motion.div>
                        </button>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default GalleryFilter;
