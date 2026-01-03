import { useState, useMemo, useRef, useEffect } from "react";
import { galleryData } from "../data";
import { ArrowDown, Loader2, Eye, Download, X, ZoomIn, ZoomOut, RotateCcw, Image } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
    const [isIntroLoading, setIsIntroLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("Semua");
    const [visibleCount, setVisibleCount] = useState(20);
    const [loadedImages, setLoadedImages] = useState(new Set());
    const [selectedImage, setSelectedImage] = useState(null);

    const [isFilterVisible, setIsFilterVisible] = useState(true);

    useEffect(() => {
        if (isIntroLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isIntroLoading]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const threshold = 100;

            if (documentHeight - scrollPosition < threshold) {
                setIsFilterVisible(false);
            } else {
                setIsFilterVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isIntroLoading) return;

        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage, isIntroLoading]);

    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const imageRef = useRef(null);

    const semesters = ["Semua", ...galleryData.map(d => d.semester)];

    const filteredImages = useMemo(() => {
        if (activeFilter === "Semua") {
            return galleryData.flatMap(data =>
                data.images.map(img => ({ ...img, semester: data.semester }))
            );
        } else {
            const selectedData = galleryData.find(d => d.semester === activeFilter);
            return selectedData ? selectedData.images.map(img => ({ ...img, semester: selectedData.semester })) : [];
        }
    }, [activeFilter]);

    const visibleImages = filteredImages.slice(0, visibleCount);
    const hasMore = visibleCount < filteredImages.length;

    const isLoading = useMemo(() => {
        if (visibleImages.length === 0) return false;
        return !visibleImages.every(img => loadedImages.has(img.id));
    }, [visibleImages, loadedImages]);

    const resetZoomState = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const openModal = (img) => {
        setSelectedImage(img);
        resetZoomState();
    };

    const closeModal = () => {
        setSelectedImage(null);
        resetZoomState();
    };

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 20);
    };

    const handleImageLoad = (id) => {
        setLoadedImages(prev => {
            const newSet = new Set(prev);
            newSet.add(id);
            return newSet;
        });
    };

    const handleDownload = async (e, img) => {
        e.stopPropagation();
        try {
            const response = await fetch(img.src);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `tekfo24-gallery-${img.id}.webp`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    const handleZoomIn = (e) => {
        e.stopPropagation();
        setScale(prev => Math.min(prev + 0.5, 4));
    };

    const handleZoomOut = (e) => {
        e.stopPropagation();
        setScale(prev => {
            const newScale = Math.max(prev - 0.5, 1);
            if (newScale === 1) setPosition({ x: 0, y: 0 });
            return newScale;
        });
    };

    const handleResetZoom = (e) => {
        e.stopPropagation();
        resetZoomState();
    };

    const onMouseDown = (e) => {
        if (scale > 1) {
            e.preventDefault();
            setIsDragging(true);
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
        }
    };

    const onMouseMove = (e) => {
        if (isDragging && scale > 1) {
            e.preventDefault();
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onTouchStart = (e) => {
        if (scale > 1 && e.touches.length === 1) {
            setIsDragging(true);
            const touch = e.touches[0];
            setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
        }
    };

    const onTouchMove = (e) => {
        if (isDragging && scale > 1 && e.touches.length === 1) {
            // Prevent scrolling on mobile when dragging the zoomed image
            // Note: touch-action: none in style also helps
            const touch = e.touches[0];
            setPosition({
                x: touch.clientX - dragStart.x,
                y: touch.clientY - dragStart.y
            });
        }
    };

    const onTouchEnd = () => {
        setIsDragging(false);
    };

    const [columnsCount, setColumnsCount] = useState(2);

    useEffect(() => {
        const calculateColumns = () => {
            const width = window.innerWidth;
            if (width >= 1280) return 6;
            if (width >= 1024) return 5;
            if (width >= 768) return 4;
            if (width >= 640) return 3;
            return 2;
        };

        const handleResize = () => setColumnsCount(calculateColumns());
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const masonryColumns = useMemo(() => {
        const cols = Array.from({ length: columnsCount }, () => []);
        visibleImages.forEach((img, i) => {
            cols[i % columnsCount].push(img);
        });
        return cols;
    }, [visibleImages, columnsCount]);

    return (
        <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
            <AnimatePresence mode="wait">
                {isIntroLoading && (
                    <LoadingScreen onComplete={() => setIsIntroLoading(false)} />
                )}
            </AnimatePresence>

            <section className="relative pt-28 pb-10 md:pt-48 md:pb-15 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-50"></div>

                <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-center mb-6 leading-[0.9]"
                    >
                        Gallery.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg sm:text-xl md:text-2xl text-zinc-500 text-center max-w-2xl mx-auto leading-relaxed"
                    >
                        Arsip digital perjalanan kami.<br />
                        <span className="text-zinc-400">Dari pusing sampai healing bareng.</span>
                    </motion.p>
                </div>
            </section>

            <AnimatePresence>
                {isFilterVisible && (
                    <motion.section
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-8 left-0 right-0 z-40 pointer-events-none"
                    >
                        <div className="max-w-fit mx-auto px-2 pointer-events-auto">
                            <div className="bg-white/80 backdrop-blur-md border border-zinc-200/50 shadow-xl rounded-full p-1.5 flex gap-1 md:gap-2 overflow-x-auto no-scrollbar max-w-[95vw]">
                                {semesters.map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => {
                                            setActiveFilter(filter);
                                            setVisibleCount(20);
                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                        }}
                                        className={`
                                    px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 whitespace-nowrap
                                    ${activeFilter === filter
                                                ? "bg-black text-white shadow-md"
                                                : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                                            }
                                `}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            <section className="px-4 pb-24 min-h-[50vh] relative">
                <div className="max-w-[1400px] mx-auto relative">
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
                                                viewport={{ once: false, amount: 0.1 }}
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
                                <Image size={18} />
                            </div>
                            <h3 className="text-sm font-medium text-zinc-500 mb-2">maaf, belum ada foto.</h3>
                        </motion.div>
                    )}
                </div>
            </section >

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center overflow-hidden"
                        onClick={closeModal}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-zinc-800/80 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors z-50 backdrop-blur-md border border-white/10 cursor-pointer"
                        >
                            <X size={24} />
                        </button>

                        <div
                            className="relative w-full h-full flex items-center justify-center p-4"
                            onMouseDown={onMouseDown}
                            onMouseMove={onMouseMove}
                            onMouseUp={onMouseUp}
                            onMouseLeave={onMouseUp}
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                            onClick={(e) => e.stopPropagation()}
                            onContextMenu={(e) => e.preventDefault()}
                            style={{
                                cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                                touchAction: 'none'
                            }}
                        >
                            <motion.img
                                ref={imageRef}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{
                                    scale: scale,
                                    x: position.x,
                                    y: position.y,
                                    opacity: 1
                                }}
                                transition={{
                                    type: "tween",
                                    duration: isDragging ? 0 : 0.2
                                }}
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="max-h-[85vh] md:max-h-[80vh] w-auto max-w-[95vw] select-none shadow-2xl"
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </div>

                        <div
                            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-2 py-2 bg-zinc-900/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="px-4 text-white/90 font-medium text-sm whitespace-nowrap hidden sm:block">
                                {selectedImage.semester}
                            </div>

                            <div className="w-px h-6 bg-white/20 hidden sm:block"></div>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handleZoomOut}
                                    className="p-3 hover:bg-white/10 rounded-xl text-white transition-colors"
                                    title="Zoom Out"
                                >
                                    <ZoomOut size={20} />
                                </button>
                                <span className="text-white/60 text-xs w-8 text-center tabular-nums hidden sm:block">
                                    {Math.round(scale * 100)}%
                                </span>
                                <button
                                    onClick={handleZoomIn}
                                    className="p-3 hover:bg-white/10 rounded-xl text-white transition-colors"
                                    title="Zoom In"
                                >
                                    <ZoomIn size={20} />
                                </button>
                                <button
                                    onClick={handleResetZoom}
                                    className="p-3 hover:bg-white/10 rounded-xl text-white transition-colors"
                                    title="Reset Zoom"
                                >
                                    <RotateCcw size={18} />
                                </button>
                            </div>

                            <div className="w-px h-6 bg-white/20"></div>

                            <button
                                onClick={(e) => handleDownload(e, selectedImage)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-xl hover:bg-zinc-200 transition-colors font-medium text-sm ml-1 cursor-pointer"
                            >
                                <Download size={18} />
                                <span className="hidden sm:inline">Unduh</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default Gallery;

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
                <span className="text-[15vw] sm:text-[12vw] md:text-[10vw] font-bold tracking-tighter block text-center">
                    Gallery.
                </span>
            </motion.div>
        </motion.div>
    );
};