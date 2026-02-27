import { useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react";

const ImageViewer = ({ selectedImage, onClose, onDownload }) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const imageRef = useRef(null);

    const [prevImage, setPrevImage] = useState(selectedImage);

    if (selectedImage !== prevImage) {
        setPrevImage(selectedImage);
        setScale(1);
        setPosition({ x: 0, y: 0 });
        setIsDragging(false);
    }

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
        setScale(1);
        setPosition({ x: 0, y: 0 });
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

    return (
        <AnimatePresence>
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center overflow-hidden"
                    onClick={onClose}
                >
                    <button
                        onClick={onClose}
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
                            onClick={(e) => onDownload(e, selectedImage)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white text-black rounded-xl hover:bg-zinc-200 transition-colors font-medium text-sm ml-1 cursor-pointer"
                        >
                            <Download size={18} />
                            <span className="hidden sm:inline">Unduh</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImageViewer;
