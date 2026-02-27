// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Loader2, Eye, Download, Image as ImageIcon } from "lucide-react";

const GalleryGrid = ({
    visibleImages,
    isLoading,
    masonryColumns,
    handleImageLoad,
    openModal,
    handleDownload,
    hasMore,
    handleLoadMore,
    visibleCount
}) => {
    return (
        <div className="relative">
            <AnimatePresence mode="wait">
                {(isLoading && visibleCount <= 20) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 z-50 bg-white/50 backdrop-blur-sm rounded-xl overflow-hidden"
                    >
                        <div className="sticky top-1/2 -translate-y-1/2 flex flex-col items-center justify-center py-32">
                            <Loader2 size={48} className="text-black animate-spin mb-4" />
                            <span className="text-zinc-500 font-medium animate-pulse tracking-wider">Memuat Gallery...</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {visibleImages.length > 0 ? (
                <>
                    <div className="flex gap-4 items-start">
                        {masonryColumns.map((colImages, colIndex) => (
                            <div key={colIndex} className="flex-1 flex flex-col gap-4">
                                {colImages.map((img, index) => (
                                    <motion.div
                                        key={img.id || `${colIndex}-${index}`}
                                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.1 }}
                                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative group rounded-xl overflow-hidden bg-zinc-200 border border-zinc-100"
                                    >
                                        <img
                                            src={img.src}
                                            alt={img.alt || "Gallery Image"}
                                            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110 block"
                                            loading={index < 2 ? "eager" : "lazy"}
                                            fetchPriority={index < 2 ? "high" : "auto"}
                                            decoding="async"
                                            onLoad={() => handleImageLoad(img.id)}
                                            onError={() => handleImageLoad(img.id)}
                                            onContextMenu={(e) => e.preventDefault()}
                                            draggable={false}
                                        />

                                        <div className="absolute inset-0 bg-linear-gradient-to-t from-black/50 via-transparent to-transparent md:from-transparent md:via-transparent md:to-transparent md:group-hover:bg-black/20 transition-all duration-300 flex items-end justify-end p-1 md:p-2 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                                            <div className="flex gap-2 scale-100 md:scale-90 md:group-hover:scale-100 transition-transform duration-300">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openModal(img);
                                                    }}
                                                    className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-900 flex items-center justify-center hover:bg-zinc-200 cursor-pointer shadow-md"
                                                    title="Lihat Foto"
                                                >
                                                    <Eye size={16} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={(e) => handleDownload(e, img)}
                                                    className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-900 flex items-center justify-center hover:bg-zinc-200 cursor-pointer shadow-md"
                                                    title="Unduh Foto"
                                                >
                                                    <Download size={16} />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {!isLoading && hasMore && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mt-16 flex justify-center w-full"
                        >
                            <button
                                onClick={handleLoadMore}
                                className="flex items-center text-xs gap-2 px-6 py-4 bg-white border border-zinc-200 rounded-full font-semibold hover:bg-zinc-50 hover:border-zinc-300 transition-all active:scale-95 group shadow-sm z-10 relative"
                            >
                                Muat Lebih Banyak
                                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                            </button>
                        </motion.div>
                    )}
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                >
                    <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                        <ImageIcon size={18} />
                    </div>
                    <h3 className="text-sm font-medium text-zinc-500 mb-2">maaf, belum ada foto.</h3>
                </motion.div>
            )}
        </div>
    );
};

export default GalleryGrid;
