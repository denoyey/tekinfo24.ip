// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FolderOpen, Play } from "lucide-react";

const GalleryLinks = ({ activeDriveLink, activeVideoLink, activeFilter }) => {
    return (
        <AnimatePresence>
            {(activeDriveLink || activeVideoLink) && (
                <motion.div
                    initial={{ opacity: 0, y: -10, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto", marginBottom: 16 }}
                    exit={{ opacity: 0, y: -10, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className={`grid gap-3 overflow-hidden ${activeDriveLink && activeVideoLink ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}
                >
                    {activeDriveLink && (
                        <a
                            href={activeDriveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            <div className="relative rounded-2xl border border-zinc-200/80 bg-zinc-50 hover:border-zinc-300 transition-all duration-300 overflow-hidden hover:shadow-lg h-full">
                                <div className="absolute inset-0 bg-linear-to-r from-blue-50/80 via-transparent to-green-50/60 transition-opacity duration-500" />
                                <div className="relative flex items-center gap-4 px-5 py-4 md:px-6 md:py-5">
                                    <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-linear-to-br from-zinc-100 to-zinc-50 border border-zinc-200/50 flex items-center justify-center group-hover:from-blue-100 group-hover:to-green-50 group-hover:border-blue-200/50 transition-all duration-300">
                                        <FolderOpen size={20} className="text-zinc-500 group-hover:text-zinc-900 transition-colors duration-300 md:w-6 md:h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm md:text-base font-semibold text-zinc-900 leading-tight">
                                            Foto {activeFilter}
                                        </p>
                                        <p className="text-xs md:text-sm text-zinc-400 mt-0.5 truncate">
                                            Google Drive
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        <div className="w-8 h-8 rounded-lg bg-black group-hover:bg-zinc-200 flex items-center justify-center transition-all duration-300">
                                            <ExternalLink size={14} className="text-white group-hover:text-zinc-900 transition-colors duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    )}

                    {activeVideoLink && (
                        <a
                            href={activeVideoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-zinc-600 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-zinc-900/20 h-full">
                                <div className="absolute inset-0 bg-linear-to-r from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative flex items-center gap-4 px-5 py-4 md:px-6 md:py-5">
                                    <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-white/15 group-hover:border-white/20 transition-all duration-300">
                                        <Play size={18} className="text-white/70 group-hover:text-white transition-colors duration-300 md:w-5 md:h-5 fill-current" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm md:text-base font-semibold text-white leading-tight">
                                            Video {activeFilter}
                                        </p>
                                        <p className="text-xs md:text-sm text-zinc-500 mt-0.5 truncate">
                                            Google Drive
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        <div className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-white flex items-center justify-center transition-all duration-300">
                                            <ExternalLink size={14} className="text-zinc-400 group-hover:text-zinc-900 transition-colors duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GalleryLinks;
